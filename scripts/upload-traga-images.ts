/**
 * Upload das imagens da página /traga-sua-empresa para o Sanity Assets.
 * Executar: npx tsx scripts/upload-traga-images.ts
 */
import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
import * as fs from 'fs'
import * as path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2024-01-01',
  token: process.env.SANITY_API_TOKEN!,
  useCdn: false,
})

type ImageEntry = { key: string; file: string; dir: string; mime: string }

const IMAGES: ImageEntry[] = [
  // Hero
  { key: 'inaitec1', file: 'inaitec1.jpg', dir: 'public/imagens-destaques', mime: 'image/jpeg' },

  // Espaços
  { key: 'estrutura1', file: 'estrutura1.png', dir: 'public/estrutura', mime: 'image/png' },
  { key: 'estrutura3-1', file: 'estrutura3-1.png', dir: 'public/estrutura', mime: 'image/png' },
  { key: 'estrutura3', file: 'estrutura3.png', dir: 'public/estrutura', mime: 'image/png' },
  { key: 'estrutura4', file: 'estrutura4.png', dir: 'public/estrutura', mime: 'image/png' },

  // Logos de perks
  { key: 'logo-hubspot', file: 'logo-hubspot.png', dir: 'public/logos', mime: 'image/png' },
  { key: 'logo-ibm', file: 'logo-ibm.png', dir: 'public/logos', mime: 'image/png' },
  { key: 'logo-notion', file: 'logo-notion 1.png', dir: 'public/logos', mime: 'image/png' },
  { key: 'logo-zendesk', file: 'logo-zendesk 1.png', dir: 'public/logos', mime: 'image/png' },
  { key: 'logo-pipedrive', file: 'logo-pipedrive 1.png', dir: 'public/logos', mime: 'image/png' },
  { key: 'logo-miro', file: 'logo-miro 1.png', dir: 'public/logos', mime: 'image/png' },
  { key: 'logo-tally', file: 'logo-tally 1.png', dir: 'public/logos', mime: 'image/png' },
  { key: 'logo-influx', file: 'logo-influx 1.png', dir: 'public/logos', mime: 'image/png' },
]

async function main() {
  console.log('Fazendo upload das imagens da página /traga-sua-empresa...\n')
  const result: Record<string, string> = {}

  for (const img of IMAGES) {
    const filePath = path.resolve(process.cwd(), img.dir, img.file)
    if (!fs.existsSync(filePath)) {
      console.warn(`  ⚠ Não encontrado: ${img.file}`)
      continue
    }
    const stream = fs.createReadStream(filePath)
    const asset = await client.assets.upload('image', stream, {
      filename: img.file,
      contentType: img.mime,
    })
    result[img.key] = asset._id
    console.log(`  ✓ ${img.key} → ${asset._id}`)
  }

  console.log('\n──── Asset IDs ────')
  console.log(JSON.stringify(result, null, 2))
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
