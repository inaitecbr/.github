/**
 * Extrai os textos traduzíveis dos posts PT em formato compacto.
 * Saída: scripts/.noticias-translations/texts-pt.json
 *
 * Uso: npx tsx scripts/extract-translation-texts.ts
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

type SpanEntry = { key: string; text: string }

async function main() {
  const posts = await client.fetch<Array<{
    _id: string; legacyId: number; title: string; excerpt: string; body: Array<{ _type: string; children?: Array<{ _type?: string; _key: string; text?: string }> }>
  }>>(
    '*[_type == "post" && language == "pt"] | order(legacyId asc) { _id, legacyId, title, excerpt, body }'
  )

  const out = posts.map((p) => {
    const spans: SpanEntry[] = []
    for (const block of p.body ?? []) {
      if (block._type !== 'block') continue
      for (const child of block.children ?? []) {
        if (child._type === 'span' && typeof child.text === 'string') {
          spans.push({ key: child._key, text: child.text })
        }
      }
    }
    return { id: p._id, legacyId: p.legacyId, title: p.title, excerpt: p.excerpt ?? '', spans }
  })

  const dir = path.resolve(process.cwd(), 'scripts/.noticias-translations')
  fs.mkdirSync(dir, { recursive: true })
  const file = path.join(dir, 'texts-pt.json')
  fs.writeFileSync(file, JSON.stringify(out, null, 2))
  console.log(`✓ ${out.length} artigos extraídos → ${path.relative(process.cwd(), file)}`)
  console.log(`  Total de spans: ${out.reduce((s, p) => s + p.spans.length, 0)}`)
}

main().catch(console.error)
