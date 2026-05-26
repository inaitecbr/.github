/**
 * Upload das fotos dos founders para o Sanity Assets e patch nos 3 docs home.
 * Executar: npx tsx scripts/upload-case-photos.ts
 */
import { createClient } from "@sanity/client";
import * as dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-01-01",
  token: process.env.SANITY_API_TOKEN!,
  useCdn: false,
});

const HOME_IDS = [
  "08a4cb0a-f98b-4dd7-9185-8c5516c39943", // pt
  "ad202267-9908-436b-aa37-c38046597cad", // en
  "08570bb8-97ec-4f49-b755-86b6cbff943a", // es
];

const PHOTOS: Array<{ caseKey: string; person: string; file: string }> = [
  {
    caseKey: "case-nexushealth",
    person: "Rodrigo Maia",
    file: "low-angle-businessman 1.png",
  },
  {
    caseKey: "case-agrosmart",
    person: "Jorge Dias",
    file: "portrait-smiling-man-sitting-cafe-bar-with-his-laptop-computer 1.png",
  },
  {
    caseKey: "case-cityflow",
    person: "André Luz",
    file: "close-up-labor-union-member 1.png",
  },
  {
    caseKey: "case-edutech",
    person: "Carla Mendes",
    file: "portrait-smiling-businesswoman-with-arms-crossed-smiling-looking-away-office 1.png",
  },
];

async function main() {
  const photosDir = path.resolve(process.cwd(), "public/imagens-pessoas");

  // 1. Upload de cada foto → obtém assetId
  console.log("Fazendo upload das fotos...\n");
  const assetMap: Record<string, string> = {}; // caseKey → sanity asset _id

  for (const photo of PHOTOS) {
    const filePath = path.join(photosDir, photo.file);
    if (!fs.existsSync(filePath)) {
      console.warn(`  ⚠ Arquivo não encontrado: ${photo.file}`);
      continue;
    }
    const stream = fs.createReadStream(filePath);
    const asset = await client.assets.upload("image", stream, {
      filename: photo.file,
      contentType: "image/png",
    });
    assetMap[photo.caseKey] = asset._id;
    console.log(`  ✓ ${photo.person} → ${asset._id}`);
  }

  // 2. Patch nos 3 documentos home — atualiza cada case com a photo ref
  console.log("\nAtualizando documentos home...\n");
  for (const docId of HOME_IDS) {
    const patch = client.patch(docId);

    for (const photo of PHOTOS) {
      const assetId = assetMap[photo.caseKey];
      if (!assetId) continue;
      patch.set({
        [`resultados.items[_key=="${photo.caseKey}"].photo`]: {
          _type: "image",
          asset: { _type: "reference", _ref: assetId },
        },
      });
    }

    await patch.commit();
    console.log(`  ✓ Patched ${docId}`);
  }

  console.log("\nUpload e patch concluídos.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
