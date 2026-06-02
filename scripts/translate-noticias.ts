/**
 * Tradução das notícias (coleção `post`) PT → EN/ES no Sanity.
 *
 * Lê cada documento PT, traduz APENAS os campos editoriais de texto
 * (title, excerpt e os spans de texto do body Portable Text) via API da Anthropic,
 * preservando 100% da estrutura do Portable Text (estilos, marks, _key, listas, imagens).
 *
 * NÃO traduz / mantém idênticos entre línguas:
 *  - slug      → igual nas 3 línguas (convenção do projeto)
 *  - category  → é chave de filtro comparada contra lista PT hardcoded no ConteudoHub
 *                (traduzi-la quebraria os filtros — mesmo critério das empresas)
 *  - author    → nome próprio / "Inaitec"
 *  - mainImage → reusa o mesmo asset
 *  - publishedAt, featured, legacyId, legacyUrl
 *
 * Cria versões com IDs determinísticos `noticia-{id}__i18n_{lang}` e atualiza o
 * `translation.metadata` ligando PT/EN/ES. Idempotente (createOrReplace).
 *
 * Uso:
 *   npx tsx scripts/translate-noticias.ts --only=151           # 1 artigo (validação)
 *   npx tsx scripts/translate-noticias.ts --limit=3
 *   npx tsx scripts/translate-noticias.ts --lang=en            # só um idioma
 *   npx tsx scripts/translate-noticias.ts                      # tudo (en + es)
 *
 * Env (.env.local): ANTHROPIC_API_KEY (+ as do Sanity). TRANSLATE_MODEL opcional.
 */
import { createClient } from '@sanity/client'
import Anthropic from '@anthropic-ai/sdk'
import * as dotenv from 'dotenv'
import * as path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2024-01-01',
  token: process.env.SANITY_API_TOKEN!,
  useCdn: false,
})

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
const MODEL = process.env.TRANSLATE_MODEL ?? 'claude-sonnet-4-6'

const args = process.argv.slice(2)
const ONLY = args.find((a) => a.startsWith('--only='))?.split('=')[1]
const LIMIT = Number(args.find((a) => a.startsWith('--limit='))?.split('=')[1]) || 0
const LANGS = (args.find((a) => a.startsWith('--lang='))?.split('=')[1]?.split(',') as
  | ('en' | 'es')[]
  | undefined) ?? ['en', 'es']

const LANG_NAME: Record<string, string> = { en: 'English', es: 'Spanish (español)' }

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

// ── Tipos mínimos do Portable Text ────────────────────────────────────────────
type Span = { _type?: string; _key?: string; text?: string; marks?: string[] }
type Block = { _type: string; _key?: string; style?: string; children?: Span[]; [k: string]: unknown }
type PtPost = {
  _id: string
  title: string
  excerpt?: string
  body?: Block[]
  legacyId?: number
}

// ── Coleta de textos traduzíveis (ordem estável) ──────────────────────────────
function collectTexts(post: PtPost): { texts: string[]; spanRefs: Span[] } {
  const texts: string[] = []
  const spanRefs: Span[] = []
  for (const block of post.body ?? []) {
    if (block._type !== 'block' || !Array.isArray(block.children)) continue
    for (const span of block.children) {
      if (span._type === 'span' && typeof span.text === 'string') {
        spanRefs.push(span)
        texts.push(span.text)
      }
    }
  }
  return { texts, spanRefs }
}

// ── Chamada de tradução (JSON estrito) ────────────────────────────────────────
type TranslatePayload = { title: string; excerpt: string; texts: string[] }

async function translatePayload(
  payload: TranslatePayload,
  lang: 'en' | 'es',
  attempt = 1,
): Promise<TranslatePayload> {
  const system =
    `You are a professional translator localizing editorial press content for the Inaitec ` +
    `innovation hub website. Translate from Brazilian Portuguese into ${LANG_NAME[lang]}.\n` +
    `Rules:\n` +
    `- Translate naturally and fluently, journalistic register.\n` +
    `- Keep proper nouns and brand names unchanged: Inaitec, Acelera Pedra Branca, Pedra Branca, ` +
    `Palhoça, Santa Catarina, GITEX, Dubai, people's names, company names, event names.\n` +
    `- Preserve punctuation, quotation marks, casing intent, and any numbers/percentages.\n` +
    `- The "texts" array is an ordered list of inline text fragments from rich text; translate ` +
    `each fragment INDEPENDENTLY and return the array with EXACTLY the same length and order. ` +
    `Never merge, split, reorder, add or drop items. If a fragment is just punctuation or a space, return it unchanged.\n` +
    `Return ONLY minified JSON: {"title":"...","excerpt":"...","texts":[...]}. No markdown, no commentary.`

  const res = await anthropic.messages.create({
    model: MODEL,
    max_tokens: 8000,
    system,
    messages: [{ role: 'user', content: JSON.stringify(payload) }],
  })

  const raw = res.content
    .filter((b): b is Anthropic.TextBlock => b.type === 'text')
    .map((b) => b.text)
    .join('')
    .trim()
    .replace(/^```(?:json)?/i, '')
    .replace(/```$/, '')
    .trim()

  let parsed: TranslatePayload
  try {
    parsed = JSON.parse(raw)
  } catch {
    if (attempt < 3) {
      await sleep(1000 * attempt)
      return translatePayload(payload, lang, attempt + 1)
    }
    throw new Error(`JSON inválido na tradução (${lang}): ${raw.slice(0, 200)}`)
  }

  if (!Array.isArray(parsed.texts) || parsed.texts.length !== payload.texts.length) {
    if (attempt < 3) {
      await sleep(1000 * attempt)
      return translatePayload(payload, lang, attempt + 1)
    }
    throw new Error(
      `Contagem de spans divergente (${lang}): esperado ${payload.texts.length}, veio ${parsed.texts?.length}`,
    )
  }
  return parsed
}

// ── Monta o doc traduzido a partir do PT, trocando só os textos ───────────────
function buildTranslatedDoc(
  pt: Record<string, unknown> & PtPost,
  lang: 'en' | 'es',
  t: TranslatePayload,
  spanRefs: Span[],
) {
  // body: clona o PT e substitui os textos dos spans (mesma ordem do collectTexts)
  const body = JSON.parse(JSON.stringify(pt.body ?? [])) as Block[]
  let i = 0
  for (const block of body) {
    if (block._type !== 'block' || !Array.isArray(block.children)) continue
    for (const span of block.children) {
      if (span._type === 'span' && typeof span.text === 'string') {
        span.text = t.texts[i++]
      }
    }
  }
  void spanRefs

  const doc: Record<string, unknown> = {
    _id: `${pt._id}__i18n_${lang}`,
    _type: 'post',
    language: lang,
    title: t.title,
    slug: (pt as { slug?: unknown }).slug, // igual nas 3 línguas
    category: (pt as { category?: unknown }).category, // chave de filtro — não traduz
    publishedAt: (pt as { publishedAt?: unknown }).publishedAt,
    featured: (pt as { featured?: unknown }).featured ?? false,
    body,
    legacyId: pt.legacyId,
    legacyUrl: (pt as { legacyUrl?: unknown }).legacyUrl,
  }
  if (t.excerpt) doc.excerpt = t.excerpt
  if ((pt as { author?: unknown }).author) doc.author = (pt as { author?: unknown }).author
  if ((pt as { mainImage?: unknown }).mainImage) doc.mainImage = (pt as { mainImage?: unknown }).mainImage
  return doc
}

// ── translation.metadata ligando todas as versões existentes ──────────────────
async function upsertMetadata(ptId: string) {
  const langs = ['pt', 'en', 'es'] as const
  const translations = []
  for (const l of langs) {
    const id = l === 'pt' ? ptId : `${ptId}__i18n_${l}`
    const exists = await client.fetch<boolean>('defined(*[_id == $id][0]._id)', { id })
    if (exists) {
      translations.push({
        _key: l,
        _type: 'internationalizedArrayReferenceValue',
        language: l,
        value: { _type: 'reference', _ref: id },
      })
    }
  }
  await client.createOrReplace({
    _id: `${ptId}__i18n_meta`,
    _type: 'translation.metadata',
    schemaTypes: ['post'],
    translations,
  } as never)
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('✗ Falta ANTHROPIC_API_KEY no .env.local')
    process.exit(1)
  }
  console.log(`\n🌐 Tradução PT → ${LANGS.join(', ')} (modelo: ${MODEL})\n`)

  let filter = '_type == "post" && language == "pt"'
  if (ONLY) filter += ` && legacyId == ${Number(ONLY)}`
  let posts = await client.fetch<(Record<string, unknown> & PtPost)[]>(
    `*[${filter}] | order(publishedAt desc){ _id, title, excerpt, body, slug, category, author, mainImage, publishedAt, featured, legacyId, legacyUrl }`,
  )
  if (LIMIT) posts = posts.slice(0, LIMIT)
  console.log(`${posts.length} artigo(s) PT a traduzir.\n`)

  const failed: { id: string; lang: string; error: string }[] = []
  let ok = 0

  for (const pt of posts) {
    const { texts, spanRefs } = collectTexts(pt)
    for (const lang of LANGS) {
      try {
        process.stdout.write(`→ ${pt._id} [${lang}] (${texts.length} spans) ... `)
        const t = await translatePayload(
          { title: pt.title, excerpt: pt.excerpt ?? '', texts },
          lang,
        )
        const doc = buildTranslatedDoc(pt, lang, t, spanRefs)
        await client.createOrReplace(doc as never)
        console.log('✓')
        ok++
        await sleep(400)
      } catch (err) {
        console.log('✗')
        console.warn(`   ${(err as Error).message}`)
        failed.push({ id: pt._id, lang, error: (err as Error).message })
      }
    }
    await upsertMetadata(pt._id)
  }

  console.log(`\n── Resumo ──`)
  console.log(`  Traduções OK: ${ok}`)
  console.log(`  Falhas:       ${failed.length}`)
  failed.forEach((f) => console.log(`    ✗ ${f.id} [${f.lang}] — ${f.error}`))
}

main().catch((err) => {
  console.error('Erro fatal:', err)
  process.exit(1)
})
