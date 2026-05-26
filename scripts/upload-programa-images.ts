/**
 * Faz upload das imagens dos programas para o Sanity e patcha as 3 versões
 * (PT/EN/ES) de cada programa com a asset reference.
 *
 * Rodar:
 *   SANITY_AUTH_TOKEN=$(grep SANITY_API_TOKEN .env.local | cut -d= -f2) npx tsx scripts/upload-programa-images.ts
 *
 * Pode ser deletado após a migração — script one-shot.
 */
import { createClient } from '@sanity/client'
import { readFileSync, existsSync } from 'node:fs'
import { resolve, basename } from 'node:path'
import { PROGRAMAS } from '../src/data/programas'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'e84rjn4d'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_AUTH_TOKEN

if (!token) {
  console.error('❌ Defina SANITY_AUTH_TOKEN no ambiente.')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

async function uploadImage(localPath: string) {
  const fullPath = resolve(__dirname, '..', 'public', localPath.replace(/^\//, ''))
  if (!existsSync(fullPath)) {
    console.warn(`⚠️  Arquivo não existe: ${fullPath}`)
    return null
  }
  const file = readFileSync(fullPath)
  const asset = await client.assets.upload('image', file, {
    filename: basename(fullPath),
  })
  return asset
}

async function getProgramaIds(slug: string): Promise<string[]> {
  const ids = await client.fetch<string[]>(
    `*[_type == "programa" && slug.current == $slug && !(_id in path("drafts.**"))]._id`,
    { slug },
  )
  return ids
}

async function main() {
  let uploaded = 0
  let patched = 0
  let skipped = 0

  for (const programa of PROGRAMAS) {
    if (!programa.image) {
      skipped++
      continue
    }

    console.log(`\n📦 ${programa.slug}`)
    console.log(`   ↳ upload ${programa.image}`)

    const asset = await uploadImage(programa.image)
    if (!asset) {
      skipped++
      continue
    }
    uploaded++
    console.log(`   ✓ asset ${asset._id}`)

    const ids = await getProgramaIds(programa.slug)
    if (ids.length === 0) {
      console.warn(`   ⚠️  Nenhum documento encontrado para slug=${programa.slug}`)
      continue
    }

    // Patch each language version + publish
    for (const id of ids) {
      await client
        .patch(id)
        .set({
          image: {
            _type: 'image',
            asset: { _type: 'reference', _ref: asset._id },
          },
        })
        .commit()
      patched++
      console.log(`   ✓ patched ${id}`)
    }
  }

  console.log(
    `\n✅ Concluído: ${uploaded} imagens uploaded, ${patched} docs atualizados (${skipped} pulados).`,
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
