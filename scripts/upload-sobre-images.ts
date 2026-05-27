/**
 * Upload das imagens da página /sobre para o Sanity Assets.
 * Imprime os assetIds para uso posterior no patch dos documentos.
 *
 * Executar: npx tsx scripts/upload-sobre-images.ts
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
  // Imagens de destaque
  { key: 'inaitec8', file: 'inaitec8.jpg', dir: 'public/imagens-destaques', mime: 'image/jpeg' },
  { key: 'inaitec7', file: 'inaitec7.jpg', dir: 'public/imagens-destaques', mime: 'image/jpeg' },

  // Fotos do time
  { key: 'team-diego', file: 'diego.png', dir: 'public/team', mime: 'image/png' },
  { key: 'team-guillermo', file: 'guillermo-arturo.png', dir: 'public/team', mime: 'image/png' },
  { key: 'team-lucas', file: 'lucas-teixeira.png', dir: 'public/team', mime: 'image/png' },
  { key: 'team-marcelo-gomes', file: 'marcelo-gomes.png', dir: 'public/team', mime: 'image/png' },
  { key: 'team-marcelo-hilman', file: 'marcelo-hilman.png', dir: 'public/team', mime: 'image/png' },
  { key: 'team-tamiko', file: 'tamiko.png', dir: 'public/team', mime: 'image/png' },
  { key: 'team-vanio', file: 'vanio.png', dir: 'public/team', mime: 'image/png' },
]

async function main() {
  console.log('Fazendo upload das imagens da página /sobre...\n')
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

  console.log('\n──── Asset IDs (use nos patches MCP) ────')
  console.log(JSON.stringify(result, null, 2))
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
