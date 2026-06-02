/**
 * Migração das notícias do site antigo (inaitec.com.br/noticias) → Sanity (coleção `post`).
 *
 * O site antigo é um CMS PHP custom (SAGUARO) sem API JSON — fazemos scraping da parte pública.
 *
 * Faz:
 *  1. Coleta as URLs de artigo da listagem /noticias/ (≈58 artigos, IDs 88..186, não sequenciais).
 *  2. Para cada artigo: parseia título, capa, data, autor (se houver), resumo e corpo.
 *  3. Converte o corpo HTML → Portable Text (block content) — preserva H2/H3, negrito, itálico, listas, citações, imagens inline.
 *  4. Sobe a capa + imagens inline como assets no Sanity (dedup por URL de origem).
 *  5. Grava com createOrReplace usando _id estável `noticia-{id}` (idempotente).
 *
 * Uso:
 *   npx tsx scripts/migrate-noticias.ts --dry-run            # processa tudo, grava JSON local, NÃO escreve no Sanity
 *   npx tsx scripts/migrate-noticias.ts --dry-run --only=151 # só um artigo (validação)
 *   npx tsx scripts/migrate-noticias.ts --dry-run --limit=3  # primeiros N artigos
 *   npx tsx scripts/migrate-noticias.ts                      # IMPORT REAL no Sanity
 *
 * Env (.env.local): NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET,
 *                   NEXT_PUBLIC_SANITY_API_VERSION, SANITY_API_TOKEN
 */
import { createClient, type SanityClient } from '@sanity/client'
import { htmlToBlocks } from '@sanity/block-tools'
import { Schema } from '@sanity/schema'
import { JSDOM } from 'jsdom'
import * as cheerio from 'cheerio'
import * as dotenv from 'dotenv'
import * as fs from 'fs'
import * as path from 'path'
import { randomUUID } from 'crypto'

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

// ── Config ───────────────────────────────────────────────────────────────────
const BASE = 'https://www.inaitec.com.br'
const LIST_URL = `${BASE}/noticias/`
const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36'
const DELAY_MS = 1000
const OUT_DIR = path.resolve(process.cwd(), 'scripts/.noticias-dump')

const args = process.argv.slice(2)
const DRY_RUN = args.includes('--dry-run')
const ONLY = args.find((a) => a.startsWith('--only='))?.split('=')[1]
const LIMIT = Number(args.find((a) => a.startsWith('--limit='))?.split('=')[1]) || 0

// ── Sanity client (só usado fora do dry-run, e p/ upload de assets) ───────────
const client: SanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2024-01-01',
  token: process.env.SANITY_API_TOKEN!,
  useCdn: false,
})

// ── Block content type compilado (espelha src/sanity/schemas/post.ts) ─────────
const blockContentType = Schema.compile({
  name: 'default',
  types: [
    {
      name: 'post',
      type: 'document',
      fields: [
        {
          name: 'body',
          type: 'array',
          of: [
            {
              type: 'block',
              styles: [
                { title: 'Normal', value: 'normal' },
                { title: 'H1', value: 'h1' },
                { title: 'H2', value: 'h2' },
                { title: 'H3', value: 'h3' },
                { title: 'H4', value: 'h4' },
                { title: 'Quote', value: 'blockquote' },
              ],
              lists: [
                { title: 'Bullet', value: 'bullet' },
                { title: 'Number', value: 'number' },
              ],
              marks: {
                decorators: [
                  { title: 'Strong', value: 'strong' },
                  { title: 'Emphasis', value: 'em' },
                  { title: 'Underline', value: 'underline' },
                ],
                annotations: [
                  {
                    name: 'link',
                    type: 'object',
                    fields: [{ name: 'href', type: 'url' }],
                  },
                ],
              },
            },
            { type: 'image', fields: [{ name: 'alt', type: 'string' }] },
          ],
        },
      ],
    },
  ],
})
  .get('post')
  .fields.find((f: { name: string }) => f.name === 'body').type

// ── Utils ─────────────────────────────────────────────────────────────────────
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

function absolutize(src?: string | null): string | null {
  if (!src) return null
  if (src.startsWith('//')) return 'https:' + src
  if (src.startsWith('http')) return src
  if (src.startsWith('/')) return BASE + src
  return `${BASE}/${src}`
}

/** dd/mm/aaaa → ISO 8601 ao meio-dia UTC (evita virar o dia por fuso). */
function parseDate(br?: string | null): string | null {
  if (!br) return null
  const m = br.trim().match(/(\d{2})\/(\d{2})\/(\d{4})/)
  if (!m) return null
  const [, dd, mm, yyyy] = m
  return `${yyyy}-${mm}-${dd}T12:00:00.000Z`
}

async function fetchHtml(url: string, attempt = 1): Promise<string> {
  try {
    const res = await fetch(url, { headers: { 'User-Agent': UA } })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return await res.text()
  } catch (err) {
    if (attempt >= 4) throw err
    const backoff = DELAY_MS * 2 ** attempt
    console.warn(`  ⚠ falha ${url} (tentativa ${attempt}): ${(err as Error).message} — retry em ${backoff}ms`)
    await sleep(backoff)
    return fetchHtml(url, attempt + 1)
  }
}

// ── Cache de upload de imagens (dedup por URL de origem) ──────────────────────
const assetCache = new Map<string, { _ref: string; _type: 'reference' }>()

async function uploadImage(url: string): Promise<{ _ref: string; _type: 'reference' } | null> {
  if (assetCache.has(url)) return assetCache.get(url)!
  if (DRY_RUN) return null // não sobe nada em dry-run
  try {
    const res = await fetch(url, { headers: { 'User-Agent': UA } })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const buffer = Buffer.from(await res.arrayBuffer())
    const filename = decodeURIComponent(url.split('/').pop() || 'image')
    const asset = await client.assets.upload('image', buffer, { filename })
    const ref = { _ref: asset._id, _type: 'reference' as const }
    assetCache.set(url, ref)
    await sleep(300)
    return ref
  } catch (err) {
    console.warn(`  ⚠ falha upload imagem ${url}: ${(err as Error).message}`)
    return null
  }
}

// ── Scraping ──────────────────────────────────────────────────────────────────
type ArticleRef = { id: number; url: string; excerpt: string; dateBr: string | null }

async function getArticleList(): Promise<ArticleRef[]> {
  const html = await fetchHtml(LIST_URL)
  const $ = cheerio.load(html)
  const seen = new Map<number, ArticleRef>()

  // Cada notícia é um card .blog-post (imagem + título + resumo + data).
  $('.blog-post').each((_, card) => {
    const $card = $(card)
    const href = $card.find('a[href*="/noticias/"]').first().attr('href') || ''
    const m = href.match(/\/noticias\/(\d+)\/([^/"]+)\/?/)
    if (!m) return
    const id = Number(m[1])
    if (seen.has(id)) return
    const excerpt = $card.find('.blog-post-txt p').first().text().trim()
    const dateBr = $card.find('.blog-post-meta').text().match(/\d{2}\/\d{2}\/\d{4}/)?.[0] || null
    seen.set(id, { id, url: absolutize(href)!, excerpt, dateBr })
  })

  // Fallback: se nenhum card casou, varre todos os links no padrão.
  if (seen.size === 0) {
    $('a[href*="/noticias/"]').each((_, el) => {
      const href = $(el).attr('href') || ''
      const m = href.match(/\/noticias\/(\d+)\/([^/"]+)\/?/)
      if (m && !seen.has(Number(m[1]))) {
        const id = Number(m[1])
        seen.set(id, { id, url: absolutize(href)!, excerpt: '', dateBr: null })
      }
    })
  }

  return [...seen.values()].sort((a, b) => a.id - b.id)
}

type ParsedArticle = {
  legacyId: number
  legacyUrl: string
  title: string
  slug: string
  category: string
  publishedAt: string | null
  excerpt: string
  author: string | null
  coverUrl: string | null
  bodyHtml: string
}

function parseArticle(html: string, ref: ArticleRef): ParsedArticle {
  const $ = cheerio.load(html)

  const title =
    ($('meta[property="og:title"]').attr('content') || '')
      .replace(/\s*[-–|]\s*Inaitec\s*$/i, '')
      .trim() ||
    $('h2.s-30.w-700').first().text().trim()

  const slug = ref.url.match(/\/noticias\/\d+\/([^/]+)\/?/)?.[1] || ''

  // Capa = 1ª <img alt="blog-post-image">
  const coverEl = $('img[alt="blog-post-image"]').first()
  const coverUrl = absolutize(coverEl.attr('src'))

  // Recorta o corpo: do tag da capa até a seção de relacionados (.blog-section.division).
  const coverTagMatch = html.match(/<img[^>]*alt="blog-post-image"[^>]*>/i)
  const coverIdx = coverTagMatch ? coverTagMatch.index! : 0
  const relIdx = html.indexOf('blog-section division', coverIdx + 1)
  const fragment = html.slice(coverIdx, relIdx > 0 ? relIdx : undefined)

  const $f = cheerio.load(fragment, null, false)
  // Data = primeiro dd/mm/aaaa do fragmento (h2 logo após a capa); fallback na listagem.
  const publishedAt =
    parseDate($f.root().text().match(/\d{2}\/\d{2}\/\d{4}/)?.[0]) || parseDate(ref.dateBr)

  // Limpeza do fragmento → corpo puro:
  $f('img[alt="blog-post-image"]').first().remove() // remove a capa (1ª img)
  $f('h2').each((_, el) => {
    if (/^\s*\d{2}\/\d{2}\/\d{4}\s*$/.test($f(el).text())) $f(el).remove() // remove a data
  })
  $f('script, style, iframe, .blog-post-meta, .post-share, .post-tags, hr').remove()

  // Autor: assinatura "por <Nome>" (vem como heading/parágrafo curto no topo do corpo).
  // Extrai o nome e REMOVE o elemento do corpo (vira o campo `author`).
  let author: string | null = null
  $f('h1,h2,h3,h4,h5,h6,p').each((_, el) => {
    if (author) return
    const t = $f(el).text().trim().replace(/\s+/g, ' ')
    const m = t.match(/^por\s+([A-Za-zÀ-ú][A-Za-zÀ-ú.\s'-]{1,40})$/i)
    if (m && t.length < 60) {
      author = m[1].trim()
      $f(el).remove()
    }
  })

  // Alguns artigos repetem o título como 1º parágrafo/heading do corpo — remove.
  const normTitle = title.toLowerCase().replace(/\s+/g, ' ').trim()
  let checked = 0
  $f('h1,h2,h3,h4,h5,h6,p').each((_, el) => {
    if (checked >= 3) return
    checked++
    const t = $f(el).text().toLowerCase().replace(/\s+/g, ' ').trim()
    if (normTitle && t === normTitle) {
      $f(el).remove()
      return false // para após remover o duplicado
    }
  })

  const bodyHtml = $f.html() || ''

  // Resumo: prioriza o card da listagem; fallback no 1º parágrafo do corpo.
  let excerpt = ref.excerpt?.trim() || ''
  if (!excerpt) {
    const firstP = $f('p').first().text().trim()
    excerpt = firstP.length > 220 ? firstP.slice(0, 217).trimEnd() + '…' : firstP
  }

  return {
    legacyId: ref.id,
    legacyUrl: ref.url,
    title,
    slug,
    category: 'Notícias',
    publishedAt,
    excerpt,
    author,
    coverUrl,
    bodyHtml,
  }
}

// ── HTML → Portable Text ──────────────────────────────────────────────────────
type PendingImageBlock = { _type: 'image'; _key?: string; _pendingUrl?: string; alt?: string }

function htmlToPortableText(bodyHtml: string): unknown[] {
  const blocks = htmlToBlocks(bodyHtml, blockContentType, {
    parseHtml: (html) => new JSDOM(html).window.document,
    rules: [
      {
        // <img> inline → bloco de imagem com URL pendente (resolvida depois p/ asset ref).
        deserialize(node, _next, block) {
          const el = node as unknown as HTMLElement
          if (el?.tagName?.toLowerCase() !== 'img') return undefined
          const src = absolutize(el.getAttribute('src'))
          if (!src) return undefined
          return block({ _type: 'image', _pendingUrl: src, alt: el.getAttribute('alt') || '' })
        },
      },
    ],
  })
  return blocks as unknown[]
}

/** Sobe imagens inline e troca _pendingUrl por asset ref. Em dry-run, mantém _pendingUrl. */
async function resolveBodyImages(blocks: unknown[]): Promise<unknown[]> {
  const out: unknown[] = []
  for (const b of blocks) {
    const block = b as PendingImageBlock & Record<string, unknown>
    if (block._type === 'image' && block._pendingUrl) {
      const ref = await uploadImage(block._pendingUrl)
      if (ref) {
        out.push({ _type: 'image', _key: block._key || randomUUID().slice(0, 8), asset: ref, alt: block.alt })
      } else if (DRY_RUN) {
        out.push(block) // mantém _pendingUrl para inspeção
      }
      // se falhou upload fora do dry-run, descarta a imagem (não trava o doc)
    } else {
      out.push(b)
    }
  }
  return out
}

// ── Gravação no Sanity (createOrReplace, _id estável) ─────────────────────────
async function writeDoc(art: ParsedArticle, body: unknown[], coverRef: { _ref: string; _type: 'reference' } | null, featured: boolean) {
  const doc: Record<string, unknown> = {
    _id: `noticia-${art.legacyId}`,
    _type: 'post',
    language: 'pt',
    title: art.title,
    slug: { _type: 'slug', current: art.slug },
    category: art.category,
    publishedAt: art.publishedAt,
    excerpt: art.excerpt,
    featured,
    body,
    legacyId: art.legacyId,
    legacyUrl: art.legacyUrl,
  }
  if (art.author) doc.author = art.author
  if (coverRef) doc.mainImage = { _type: 'image', asset: coverRef, alt: art.title }
  await client.createOrReplace(doc as never)

  // translation.metadata para o botão "Translations" do Studio funcionar.
  await client.createIfNotExists({
    _id: `noticia-${art.legacyId}__i18n_meta`,
    _type: 'translation.metadata',
    schemaTypes: ['post'],
    translations: [
      {
        _key: 'pt',
        _type: 'internationalizedArrayReferenceValue',
        language: 'pt',
        value: { _type: 'reference', _ref: `noticia-${art.legacyId}` },
      },
    ],
  } as never)
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  console.log(`\n🗞  Migração de notícias — modo: ${DRY_RUN ? 'DRY-RUN (sem escrita no Sanity)' : 'IMPORT REAL'}\n`)

  let list = await getArticleList()
  console.log(`Listagem: ${list.length} artigos encontrados (IDs ${list[0]?.id}..${list[list.length - 1]?.id})`)
  if (list.length < 50) console.warn(`⚠ Esperava ~58 artigos, encontrei ${list.length}. Verifique o seletor da listagem.`)

  if (ONLY) list = list.filter((a) => String(a.id) === ONLY)
  if (LIMIT) list = list.slice(0, LIMIT)
  console.log(`Processando ${list.length} artigo(s).\n`)

  // Mais recente vira destaque (featured) — só se processarmos a lista inteira.
  const dumped: unknown[] = []
  const failed: { id: number; url: string; error: string }[] = []
  let newestId = -1
  let newestDate = ''

  // pré-cálculo do destaque exige todas as datas; faremos numa 1ª passada leve só no import completo
  const results: { art: ParsedArticle; body: unknown[]; coverRef: { _ref: string; _type: 'reference' } | null }[] = []

  for (const ref of list) {
    try {
      console.log(`→ [${ref.id}] ${ref.url}`)
      const html = await fetchHtml(ref.url)
      const art = parseArticle(html, ref)
      let body = htmlToPortableText(art.bodyHtml)
      body = await resolveBodyImages(body)
      const coverRef = art.coverUrl ? await uploadImage(art.coverUrl) : null

      if (art.publishedAt && art.publishedAt > newestDate) {
        newestDate = art.publishedAt
        newestId = ref.id
      }
      results.push({ art, body, coverRef })

      const summary = {
        _id: `noticia-${art.legacyId}`,
        title: art.title,
        slug: art.slug,
        category: art.category,
        publishedAt: art.publishedAt,
        author: art.author,
        excerpt: art.excerpt,
        coverUrl: art.coverUrl,
        bodyBlocks: body.length,
        body,
      }
      dumped.push(summary)
    } catch (err) {
      console.warn(`  ✗ falhou: ${(err as Error).message}`)
      failed.push({ id: ref.id, url: ref.url, error: (err as Error).message })
    }
    await sleep(DELAY_MS)
  }

  if (DRY_RUN) {
    fs.mkdirSync(OUT_DIR, { recursive: true })
    const outFile = path.join(OUT_DIR, ONLY ? `artigo-${ONLY}.json` : 'noticias-dump.json')
    fs.writeFileSync(outFile, JSON.stringify(dumped, null, 2), 'utf-8')
    console.log(`\n📄 DRY-RUN: ${dumped.length} artigo(s) salvos em ${path.relative(process.cwd(), outFile)}`)
  } else {
    // O destaque (featured) só é recalculado em import COMPLETO. Em runs parciais
    // (--only/--limit) preservamos o featured atual de cada doc pra não bagunçar.
    const isPartial = Boolean(ONLY) || Boolean(LIMIT)
    for (const { art, body, coverRef } of results) {
      let featured = art.legacyId === newestId
      if (isPartial) {
        featured =
          (await client.fetch<boolean>('*[_id == $id][0].featured', { id: `noticia-${art.legacyId}` })) ?? false
      }
      await writeDoc(art, body, coverRef, featured)
      console.log(`  ✓ gravado noticia-${art.legacyId}`)
    }
    console.log(
      `\n✅ Import real: ${results.length} documentos gravados${isPartial ? '' : ` (destaque: noticia-${newestId})`}.`,
    )
  }

  console.log(`\n── Resumo ──`)
  console.log(`  OK:     ${results.length}`)
  console.log(`  Falhas: ${failed.length}`)
  if (failed.length) failed.forEach((f) => console.log(`    ✗ [${f.id}] ${f.url} — ${f.error}`))
}

main().catch((err) => {
  console.error('Erro fatal:', err)
  process.exit(1)
})
