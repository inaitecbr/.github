/**
 * Lê o arquivo de traduções gerado e gravado por Claude (scripts/.noticias-translations/translated.json)
 * e cria as versões EN e ES no Sanity com IDs determinísticos (noticia-{id}__i18n_en/es).
 *
 * Uso: npx tsx scripts/inject-noticias-translations.ts
 *      npx tsx scripts/inject-noticias-translations.ts --only=88
 */
import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
import * as fs from 'fs'
import * as path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN!,
  useCdn: false,
})

const args = process.argv.slice(2)
const ONLY = args.find((a) => a.startsWith('--only='))?.split('=')[1]

type Translation = { title: string; excerpt: string; spans: Record<string, string> }
type TranslatedEntry = { id: string; legacyId: number; en: Translation; es: Translation }

async function main() {
  const file = path.resolve(process.cwd(), 'scripts/.noticias-translations/translated.json')
  if (!fs.existsSync(file)) {
    console.error('✗ Arquivo não encontrado:', file)
    console.error('  Rode primeiro extract-translation-texts.ts, traduza, e salve como translated.json')
    process.exit(1)
  }

  let entries: TranslatedEntry[] = JSON.parse(fs.readFileSync(file, 'utf-8'))
  if (ONLY) entries = entries.filter((e) => String(e.legacyId) === ONLY)
  console.log(`\n📝 Injetando ${entries.length} artigo(s) traduzidos…\n`)

  let ok = 0
  const failed: string[] = []

  for (const entry of entries) {
    const ptId = entry.id
    const ptDoc = await client.fetch<Record<string, unknown>>(
      '*[_id == $id][0]{ ..., body }',
      { id: ptId }
    )
    if (!ptDoc) { console.warn(`  ✗ PT não encontrado: ${ptId}`); failed.push(ptId); continue }

    for (const lang of ['en', 'es'] as const) {
      const t = entry[lang]
      const docId = `${ptId}__i18n_${lang}`

      // Clona o body do PT e substitui os textos dos spans
      const body = JSON.parse(JSON.stringify(ptDoc.body ?? []))
      for (const block of body) {
        if (block._type !== 'block') continue
        for (const child of block.children ?? []) {
          if (child._type === 'span' && child._key in t.spans) {
            child.text = t.spans[child._key]
          }
        }
      }

      const doc: Record<string, unknown> = {
        _id: docId,
        _type: 'post',
        language: lang,
        title: t.title,
        slug: ptDoc.slug,
        category: ptDoc.category,
        publishedAt: ptDoc.publishedAt,
        featured: ptDoc.featured ?? false,
        body,
        legacyId: ptDoc.legacyId,
        legacyUrl: ptDoc.legacyUrl,
      }
      if (t.excerpt) doc.excerpt = t.excerpt
      if (ptDoc.author) doc.author = ptDoc.author
      if (ptDoc.mainImage) doc.mainImage = ptDoc.mainImage

      await client.createOrReplace(doc as never)
      await client.createIfNotExists({
        _id: `${ptId}__i18n_meta`,
        _type: 'translation.metadata',
        schemaTypes: ['post'],
        translations: [
          { _key: 'pt', _type: 'internationalizedArrayReferenceValue', language: 'pt', value: { _type: 'reference', _ref: ptId } },
          { _key: 'en', _type: 'internationalizedArrayReferenceValue', language: 'en', value: { _type: 'reference', _ref: `${ptId}__i18n_en` } },
          { _key: 'es', _type: 'internationalizedArrayReferenceValue', language: 'es', value: { _type: 'reference', _ref: `${ptId}__i18n_es` } },
        ],
      } as never)
      process.stdout.write(`  ✓ ${docId}\n`)
      ok++
    }
  }

  console.log(`\n── Resumo ──`)
  console.log(`  OK:     ${ok}`)
  console.log(`  Falhas: ${failed.length}`)
  if (failed.length) failed.forEach((f) => console.log(`    ✗ ${f}`))
}

main().catch(console.error)
