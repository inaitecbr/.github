/**
 * Corrige os translation.metadata dos posts que ficaram só com a entrada PT.
 *
 * Causa: inject-noticias-translations.ts usava createIfNotExists no metadata,
 * que pulou os docs pré-existentes (criados PT-only pelo plugin de i18n).
 * Resultado: o Studio mostra "+" em EN/ES porque não há tradução vinculada.
 *
 * Este script reescreve cada noticia-{id}__i18n_meta com as 3 entradas,
 * mas SÓ quando os docs EN/ES realmente existem.
 *
 * Uso: npx tsx scripts/fix-noticias-meta.ts [--dry-run]
 */
import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
import * as path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN!,
  useCdn: false,
})

const DRY = process.argv.includes('--dry-run')

async function main() {
  const ptDocs = await client.fetch<{ _id: string }[]>(
    '*[_type == "post" && language == "pt"]{ _id } | order(_id asc)'
  )
  console.log(`\n🔧 ${ptDocs.length} posts PT encontrados${DRY ? ' (dry-run)' : ''}\n`)

  let fixed = 0
  const skipped: string[] = []

  for (const { _id: ptId } of ptDocs) {
    const enId = `${ptId}__i18n_en`
    const esId = `${ptId}__i18n_es`

    // Confirma que as traduções existem antes de vincular
    const exist = await client.fetch<{ en: boolean; es: boolean }>(
      '{ "en": defined(*[_id == $en][0]._id), "es": defined(*[_id == $es][0]._id) }',
      { en: enId, es: esId }
    )
    if (!exist.en || !exist.es) {
      skipped.push(`${ptId} (en:${exist.en} es:${exist.es})`)
      continue
    }

    const meta = {
      _id: `${ptId}__i18n_meta`,
      _type: 'translation.metadata',
      schemaTypes: ['post'],
      translations: [
        { _key: 'pt', _type: 'internationalizedArrayReferenceValue', language: 'pt', value: { _type: 'reference', _ref: ptId } },
        { _key: 'en', _type: 'internationalizedArrayReferenceValue', language: 'en', value: { _type: 'reference', _ref: enId } },
        { _key: 'es', _type: 'internationalizedArrayReferenceValue', language: 'es', value: { _type: 'reference', _ref: esId } },
      ],
    }

    if (DRY) {
      console.log(`  • would fix ${meta._id}`)
    } else {
      await client.createOrReplace(meta as never)
      process.stdout.write(`  ✓ ${meta._id}\n`)
    }
    fixed++
  }

  console.log(`\n── Resumo ──`)
  console.log(`  ${DRY ? 'A corrigir' : 'Corrigidos'}: ${fixed}`)
  console.log(`  Pulados (sem EN/ES): ${skipped.length}`)
  skipped.forEach((s) => console.log(`    ✗ ${s}`))
}

main().catch((e) => { console.error(e); process.exit(1) })
