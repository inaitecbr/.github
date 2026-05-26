/**
 * Seed: popula o campo `resultados` nos documentos `home` (PT, EN, ES).
 * Executar: npx tsx scripts/seed-home-resultados.ts
 */
import { createClient } from "@sanity/client";
import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-01-01",
  token: process.env.SANITY_API_TOKEN!,
  useCdn: false,
});

// ─── IDs dos documentos home ───────────────────────────────────────────────
const HOME_IDS: Record<string, string> = {
  pt: "08a4cb0a-f98b-4dd7-9185-8c5516c39943",
  en: "ad202267-9908-436b-aa37-c38046597cad",
  es: "08570bb8-97ec-4f49-b755-86b6cbff943a",
};

// ─── Cases compartilhados (imagens serão adicionadas via Studio) ───────────
function cases(lang: string) {
  const data: Record<string, ReturnType<typeof buildCases>> = {
    pt: buildCases([
      {
        key: "nexushealth",
        company: "NexusHealth",
        sector: "Healthtech",
        quote:
          "O Inaitec nos conectou a investidores e hospitais parceiros em tempo recorde. Instalados no Pedra Branca, escalamos de 3 para 40 funcionários em menos de um ano.",
        person: "Rodrigo Maia",
        role: "CEO · NexusHealth",
        metrics: [
          { key: "m1", label: "Captados em Série A", value: "R$50M" },
          { key: "m2", label: "Crescimento de time em 12 meses", value: "13×" },
        ],
      },
      {
        key: "agrosmart",
        company: "AgroSmart",
        sector: "Agritech",
        quote:
          "Ter nosso escritório no parque nos deu acesso a talentos da UFSC e Unisul. Fechamos nosso primeiro contrato corporativo 3 meses após a instalação.",
        person: "Jorge Dias",
        role: "Fundador · AgroSmart",
        metrics: [
          { key: "m1", label: "Produtores atendidos", value: "+200" },
          { key: "m2", label: "Do MVP ao primeiro contrato", value: "3 meses" },
        ],
      },
      {
        key: "cityflow",
        company: "CityFlow",
        sector: "Smart City",
        quote:
          "A credibilidade do ecossistema Pedra Branca abriu portas em prefeituras que jamais conseguiríamos sozinhos. O parque é nossa maior vitrine.",
        person: "André Luz",
        role: "COO · CityFlow",
        metrics: [
          { key: "m1", label: "Cidades com contratos ativos", value: "3" },
          { key: "m2", label: "Em contratos públicos gerados", value: "R$12M" },
        ],
      },
      {
        key: "edutech",
        company: "EduTech SC",
        sector: "Edtech",
        quote:
          "O ambiente do Inaitec acelerou nossa curva de aprendizado. Encontramos aqui os parceiros certos para levar nossa plataforma a mais de 50 instituições.",
        person: "Carla Mendes",
        role: "CEO · EduTech SC",
        metrics: [
          { key: "m1", label: "Instituições parceiras", value: "50+" },
          { key: "m2", label: "Alunos impactados", value: "120K" },
        ],
      },
    ]),
    en: buildCases([
      {
        key: "nexushealth",
        company: "NexusHealth",
        sector: "Healthtech",
        quote:
          "Inaitec connected us with investors and partner hospitals in record time. Based at Pedra Branca, we scaled from 3 to 40 employees in less than a year.",
        person: "Rodrigo Maia",
        role: "CEO · NexusHealth",
        metrics: [
          { key: "m1", label: "Raised in Series A", value: "R$50M" },
          { key: "m2", label: "Team growth in 12 months", value: "13×" },
        ],
      },
      {
        key: "agrosmart",
        company: "AgroSmart",
        sector: "Agritech",
        quote:
          "Having our office in the park gave us access to talent from UFSC and Unisul. We closed our first corporate contract 3 months after moving in.",
        person: "Jorge Dias",
        role: "Founder · AgroSmart",
        metrics: [
          { key: "m1", label: "Producers served", value: "+200" },
          { key: "m2", label: "From MVP to first contract", value: "3 months" },
        ],
      },
      {
        key: "cityflow",
        company: "CityFlow",
        sector: "Smart City",
        quote:
          "The credibility of the Pedra Branca ecosystem opened doors at city halls we would never reach on our own. The park is our biggest showcase.",
        person: "André Luz",
        role: "COO · CityFlow",
        metrics: [
          { key: "m1", label: "Cities with active contracts", value: "3" },
          { key: "m2", label: "Generated in public contracts", value: "R$12M" },
        ],
      },
      {
        key: "edutech",
        company: "EduTech SC",
        sector: "Edtech",
        quote:
          "The Inaitec environment accelerated our learning curve. We found the right partners here to take our platform to more than 50 institutions.",
        person: "Carla Mendes",
        role: "CEO · EduTech SC",
        metrics: [
          { key: "m1", label: "Partner institutions", value: "50+" },
          { key: "m2", label: "Students impacted", value: "120K" },
        ],
      },
    ]),
    es: buildCases([
      {
        key: "nexushealth",
        company: "NexusHealth",
        sector: "Healthtech",
        quote:
          "Inaitec nos conectó con inversionistas y hospitales aliados en tiempo récord. Instalados en Pedra Branca, escalamos de 3 a 40 colaboradores en menos de un año.",
        person: "Rodrigo Maia",
        role: "CEO · NexusHealth",
        metrics: [
          { key: "m1", label: "Recaudado en Serie A", value: "R$50M" },
          { key: "m2", label: "Crecimiento del equipo en 12 meses", value: "13×" },
        ],
      },
      {
        key: "agrosmart",
        company: "AgroSmart",
        sector: "Agritech",
        quote:
          "Tener nuestra oficina en el parque nos dio acceso a talentos de la UFSC y Unisul. Cerramos nuestro primer contrato corporativo 3 meses después de instalarnos.",
        person: "Jorge Dias",
        role: "Fundador · AgroSmart",
        metrics: [
          { key: "m1", label: "Productores atendidos", value: "+200" },
          { key: "m2", label: "Del MVP al primer contrato", value: "3 meses" },
        ],
      },
      {
        key: "cityflow",
        company: "CityFlow",
        sector: "Smart City",
        quote:
          "La credibilidad del ecosistema Pedra Branca nos abrió puertas en alcaldías que jamás alcanzaríamos por nuestra cuenta. El parque es nuestra mayor vitrina.",
        person: "André Luz",
        role: "COO · CityFlow",
        metrics: [
          { key: "m1", label: "Ciudades con contratos activos", value: "3" },
          { key: "m2", label: "Generados en contratos públicos", value: "R$12M" },
        ],
      },
      {
        key: "edutech",
        company: "EduTech SC",
        sector: "Edtech",
        quote:
          "El ambiente del Inaitec aceleró nuestra curva de aprendizaje. Encontramos aquí los socios adecuados para llevar nuestra plataforma a más de 50 instituciones.",
        person: "Carla Mendes",
        role: "CEO · EduTech SC",
        metrics: [
          { key: "m1", label: "Instituciones asociadas", value: "50+" },
          { key: "m2", label: "Estudiantes impactados", value: "120K" },
        ],
      },
    ]),
  };
  return data[lang]!;
}

function buildCases(
  items: Array<{
    key: string;
    company: string;
    sector: string;
    quote: string;
    person: string;
    role: string;
    metrics: Array<{ key: string; label: string; value: string }>;
  }>,
) {
  return items.map((item) => ({
    _key: `case-${item.key}`,
    _type: "resultadoCase",
    company: item.company,
    sector: item.sector,
    quote: item.quote,
    person: item.person,
    role: item.role,
    metrics: item.metrics.map((m) => ({
      _key: m.key,
      _type: "caseMetric",
      label: m.label,
      value: m.value,
    })),
  }));
}

const PARCEIROS = [
  { _key: "p-hubspot", _type: "parceiroBeneficio", alt: "HubSpot" },
  { _key: "p-ibm", _type: "parceiroBeneficio", alt: "IBM" },
  { _key: "p-influxdb", _type: "parceiroBeneficio", alt: "InfluxDB" },
  { _key: "p-miro", _type: "parceiroBeneficio", alt: "Miro" },
  { _key: "p-notion", _type: "parceiroBeneficio", alt: "Notion" },
  { _key: "p-pipedrive", _type: "parceiroBeneficio", alt: "Pipedrive" },
  { _key: "p-tally", _type: "parceiroBeneficio", alt: "Tally" },
  { _key: "p-zendesk", _type: "parceiroBeneficio", alt: "Zendesk" },
];

const RESULTADOS: Record<string, object> = {
  pt: {
    eyebrow: "Resultados reais — Empresas instaladas",
    titleStart: "Empresas que cresceram",
    titleHighlight: "dentro do parque",
    ctaInstalacaoLabel: "Instalar minha empresa",
    yearRange: "De 2019 a 2025",
    ctaPartnersStart: "Garanta benefícios",
    ctaPartnersHighlight: "exclusivos do ecossistema",
    items: cases("pt"),
    parceiros: PARCEIROS,
  },
  en: {
    eyebrow: "Real results — Resident companies",
    titleStart: "Companies that grew",
    titleHighlight: "inside the park",
    ctaInstalacaoLabel: "Install my company",
    yearRange: "From 2019 to 2025",
    ctaPartnersStart: "Get",
    ctaPartnersHighlight: "exclusive ecosystem benefits",
    items: cases("en"),
    parceiros: PARCEIROS,
  },
  es: {
    eyebrow: "Resultados reales — Empresas residentes",
    titleStart: "Empresas que crecieron",
    titleHighlight: "dentro del parque",
    ctaInstalacaoLabel: "Instalar mi empresa",
    yearRange: "De 2019 a 2025",
    ctaPartnersStart: "Obtén",
    ctaPartnersHighlight: "beneficios exclusivos del ecosistema",
    items: cases("es"),
    parceiros: PARCEIROS,
  },
};

async function main() {
  for (const [lang, docId] of Object.entries(HOME_IDS)) {
    console.log(`\n[${lang.toUpperCase()}] Patching ${docId}...`);
    try {
      await client
        .patch(docId)
        .set({ resultados: RESULTADOS[lang] })
        .commit({ autoGenerateArrayKeys: false });
      console.log(`[${lang.toUpperCase()}] ✓ Draft criado`);

      await client.action({
        actionType: "sanity.action.document.publish",
        draftId: `drafts.${docId}`,
        publishedId: docId,
      });
      console.log(`[${lang.toUpperCase()}] ✓ Publicado`);
    } catch (err) {
      console.error(`[${lang.toUpperCase()}] ✗ Erro:`, err);
    }
  }
  console.log("\nSeed concluído.");
}

main();
