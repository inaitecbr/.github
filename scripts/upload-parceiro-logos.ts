/**
 * Upload dos logos de parceiros para o Sanity Assets e patch nos 3 docs home.
 * Executar: npx tsx scripts/upload-parceiro-logos.ts
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

// Mapeamento key → arquivo em public/logos/
const LOGOS: Array<{ key: string; alt: string; file: string }> = [
  { key: "p-hubspot", alt: "HubSpot", file: "logo-hubspot.png" },
  { key: "p-ibm", alt: "IBM", file: "logo-ibm.png" },
  { key: "p-influxdb", alt: "InfluxDB", file: "logo-influx 1.png" },
  { key: "p-miro", alt: "Miro", file: "logo-miro 1.png" },
  { key: "p-notion", alt: "Notion", file: "logo-notion 1.png" },
  { key: "p-pipedrive", alt: "Pipedrive", file: "logo-pipedrive 1.png" },
  { key: "p-tally", alt: "Tally", file: "logo-tally 1.png" },
  { key: "p-zendesk", alt: "Zendesk", file: "logo-zendesk 1.png" },
];

async function main() {
  const logosDir = path.resolve(process.cwd(), "public/logos");

  // 1. Upload de cada PNG → obtém assetId
  console.log("Fazendo upload dos logos...\n");
  const assetMap: Record<string, string> = {}; // key → sanity asset _id

  for (const logo of LOGOS) {
    const filePath = path.join(logosDir, logo.file);
    if (!fs.existsSync(filePath)) {
      console.warn(`  ⚠ Arquivo não encontrado: ${logo.file}`);
      continue;
    }
    const stream = fs.createReadStream(filePath);
    const asset = await client.assets.upload("image", stream, {
      filename: logo.file,
      contentType: "image/png",
    });
    assetMap[logo.key] = asset._id;
    console.log(`  ✓ ${logo.alt} → ${asset._id}`);
  }

  // 2. Patch nos 3 documentos home — atualiza cada parceiro com a image ref
  console.log("\nAtualizando documentos home...\n");
  for (const docId of HOME_IDS) {
    const patch = client.patch(docId);

    for (const logo of LOGOS) {
      const assetId = assetMap[logo.key];
      if (!assetId) continue;
      patch.set({
        [`resultados.parceiros[_key=="${logo.key}"].image`]: {
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
