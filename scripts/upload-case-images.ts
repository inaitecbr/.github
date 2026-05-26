/**
 * Upload das imagens dos cases (logos de empresa + fotos de pessoa)
 * para o Sanity Assets e patch nos 3 docs home.
 * Executar: npx tsx scripts/upload-case-images.ts
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

// Mesma ordem dos cases no Sanity
const CASE_IMAGES: Array<{ caseKey: string; logoFile: string; photoFile: string }> = [
  {
    caseKey: "case-nexushealth",
    logoFile: "public/logo1.png",
    photoFile: "public/imagens-pessoas/close-up-labor-union-member 1.png",
  },
  {
    caseKey: "case-agrosmart",
    logoFile: "public/logo2.png",
    photoFile: "public/imagens-pessoas/low-angle-businessman 1.png",
  },
  {
    caseKey: "case-cityflow",
    logoFile: "public/logo3.png",
    photoFile:
      "public/imagens-pessoas/portrait-smiling-man-sitting-cafe-bar-with-his-laptop-computer 1.png",
  },
  {
    caseKey: "case-edutech",
    logoFile: "public/logo1.png",
    photoFile:
      "public/imagens-pessoas/portrait-smiling-businesswoman-with-arms-crossed-smiling-looking-away-office 1.png",
  },
];

async function uploadFile(filePath: string): Promise<string> {
  const stream = fs.createReadStream(path.resolve(process.cwd(), filePath));
  const ext = path.extname(filePath).slice(1).toLowerCase();
  const contentType = ext === "png" ? "image/png" : ext === "svg" ? "image/svg+xml" : "image/jpeg";
  const asset = await client.assets.upload("image", stream, {
    filename: path.basename(filePath),
    contentType,
  });
  return asset._id;
}

async function main() {
  console.log("Fazendo upload dos logos e fotos dos cases...\n");

  const logoMap: Record<string, string> = {};
  const photoMap: Record<string, string> = {};

  // Upload único por arquivo (logo1.png é compartilhado por 2 cases)
  const uploadedFiles: Record<string, string> = {};

  for (const item of CASE_IMAGES) {
    // Logo
    if (!uploadedFiles[item.logoFile]) {
      uploadedFiles[item.logoFile] = await uploadFile(item.logoFile);
      console.log(`  ✓ Logo ${item.logoFile} → ${uploadedFiles[item.logoFile]}`);
    }
    logoMap[item.caseKey] = uploadedFiles[item.logoFile]!;

    // Foto
    if (!uploadedFiles[item.photoFile]) {
      uploadedFiles[item.photoFile] = await uploadFile(item.photoFile);
      console.log(`  ✓ Foto ${path.basename(item.photoFile)} → ${uploadedFiles[item.photoFile]}`);
    }
    photoMap[item.caseKey] = uploadedFiles[item.photoFile]!;
  }

  console.log("\nAtualizando documentos home...\n");

  for (const docId of HOME_IDS) {
    const patch = client.patch(docId);

    for (const item of CASE_IMAGES) {
      const logoId = logoMap[item.caseKey]!;
      const photoId = photoMap[item.caseKey]!;

      patch.set({
        [`resultados.items[_key=="${item.caseKey}"].logo`]: {
          _type: "image",
          asset: { _type: "reference", _ref: logoId },
        },
        [`resultados.items[_key=="${item.caseKey}"].photo`]: {
          _type: "image",
          asset: { _type: "reference", _ref: photoId },
        },
      });
    }

    await patch.commit();
    console.log(`  ✓ Patched ${docId}`);
  }

  console.log("\nConcluído.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
