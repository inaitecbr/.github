/**
 * Upload de imagens placeholder para empresas instaladas.
 * Sobe logo1.png, logo2.png, logo3.png e imagem-homem.png como assets no Sanity.
 *
 * Uso: npx tsx scripts/upload-empresas-images.ts
 */

import { createClient } from '@sanity/client'
import { createReadStream } from 'fs'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!,
  token: process.env.SANITY_API_TOKEN!,
  useCdn: false,
})

const PUBLIC_DIR = path.join(process.cwd(), 'public')

const files = [
  { name: 'logo1', file: 'logo1.png' },
  { name: 'logo2', file: 'logo2.png' },
  { name: 'logo3', file: 'logo3.png' },
  { name: 'pessoa', file: 'imagem-homem.png' },
]

async function main() {
  console.log('⬆️  Subindo imagens placeholder de empresas...\n')

  const results: Record<string, string> = {}

  for (const { name, file } of files) {
    const filePath = path.join(PUBLIC_DIR, file)
    const ext = path.extname(file).slice(1) as 'png' | 'jpg'
    try {
      const asset = await client.assets.upload('image', createReadStream(filePath), {
        filename: file,
        contentType: `image/${ext}`,
      })
      results[name] = asset._id
      console.log(`✅ ${name}: ${asset._id}`)
    } catch (err) {
      console.error(`❌ ${name}:`, err)
    }
  }

  console.log('\n📋 IDs dos assets:\n')
  for (const [name, id] of Object.entries(results)) {
    console.log(`  ${name}: '${id}'`)
  }
}

main().catch(console.error)
