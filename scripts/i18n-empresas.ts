/**
 * Migração i18n da coleção `empresa` (PT → PT/EN/ES).
 *
 * - Marca os 18 docs existentes como language='pt' (campo oculto — só via API).
 * - Cria as versões EN e ES (IDs determinísticos `<ptId>__i18n_<lang>`),
 *   copiando os campos não-editoriais (nome, setor, estagio, fundada, website,
 *   logo, foto, slug, investidores, ano) e traduzindo desc/longDesc/status/
 *   fundador.titulo/investimento.rodada.
 * - Cria o documento `translation.metadata` ligando as 3 versões.
 *
 * Idempotente (createOrReplace). Uso: npx tsx scripts/i18n-empresas.ts
 *
 * NB: `setor` e `estagio` permanecem idênticos nas 3 línguas — são chaves de
 * filtro comparadas contra listas hardcoded em CatalogoSection.tsx. Traduzi-las
 * quebraria os filtros e o mapa de cores por estágio.
 */

import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!,
  token: process.env.SANITY_API_TOKEN!,
  useCdn: false,
})

const BOILER_EN =
  ' The operation combines proprietary technology and strategic partnerships to deliver measurable results to clients. Today, the company serves more than 350 brands across the country, strengthening long-term relationships through scalable, measurable solutions.'
const BOILER_ES =
  ' La operación combina tecnología propia y alianzas estratégicas para entregar resultados medibles a los clientes. Hoy, la empresa atiende a más de 350 marcas en todo el territorio nacional, fortaleciendo relaciones de largo plazo mediante soluciones escalables y medibles.'

const STATUS_EN: Record<string, string> = {
  Ativa: 'Active',
  'Em expansão': 'Expanding',
  'Recém-investida': 'Recently funded',
}
const STATUS_ES: Record<string, string> = {
  Ativa: 'Activa',
  'Em expansão': 'En expansión',
  'Recém-investida': 'Recién invertida',
}
const RODADA_EN: Record<string, string> = {
  Seed: 'Seed',
  'Pré-seed': 'Pre-seed',
  'Série A': 'Series A',
  'Série B': 'Series B',
}
const RODADA_ES: Record<string, string> = {
  Seed: 'Seed',
  'Pré-seed': 'Pre-seed',
  'Série A': 'Serie A',
  'Série B': 'Serie B',
}
const TITULO_EN: Record<string, string> = {
  'Fundador & CEO': 'Founder & CEO',
  'Fundador & CTO': 'Founder & CTO',
  'Fundadora & CEO': 'Founder & CEO',
  'Co-fundadora & CEO': 'Co-founder & CEO',
  'Co-fundadora & COO': 'Co-founder & COO',
  CEO: 'CEO',
}
const TITULO_ES: Record<string, string> = {
  'Fundador & CEO': 'Fundador y CEO',
  'Fundador & CTO': 'Fundador y CTO',
  'Fundadora & CEO': 'Fundadora y CEO',
  'Co-fundadora & CEO': 'Cofundadora y CEO',
  'Co-fundadora & COO': 'Cofundadora y COO',
  CEO: 'CEO',
}

// desc por slug (longDesc = desc + boilerplate da língua)
const DESC_EN: Record<string, string> = {
  agrosense: 'IoT sensors and analytics for precision agriculture, cutting input use by up to 40%.',
  civicdata: 'Analytics and a BI dashboard for mid-sized city governments to monitor urban KPIs.',
  creditoo: 'Tailored credit for freelancers and micro-entrepreneurs using open finance and alternative data.',
  datafarm: 'A national hub of agronomic data covering 12,000 connected farms.',
  edupath: 'An adaptive technical-education platform with learning paths personalized by generative AI.',
  fiducia: 'Embedded insurance for marketplaces and e-commerce platforms via API.',
  fluxops: 'Modular ERP for industrial SMBs — deployment in days, not months.',
  greenport: 'A carbon-offset platform for exporters with MRV traceability.',
  lexia: 'Legal AI for triaging, classifying and responding to contracts at mid-sized companies.',
  medtrack: 'Clinical journey management for mid-sized hospitals, integrating medical records and scheduling.',
  packify: 'Smart NFC packaging for traceability and post-purchase engagement.',
  routix: 'Last-mile optimization with predictive AI, cutting delivery cost by 28%.',
  shelfiq: 'A dynamic pricing engine for retailers, growing margin without losing volume.',
  shieldlayer: 'A zero-trust platform for regional banks and credit unions.',
  sinfra: 'Management software for civil works and public concessions, present in 14 states.',
  tokedu: 'Corporate training through microlearning — 1,200 client companies in Brazil and LATAM.',
  vitalink: 'Telemedicine and remote monitoring for rural workers and isolated communities.',
  volta: 'Charging infrastructure for electric vehicles in residential buildings and parking lots.',
}
const DESC_ES: Record<string, string> = {
  agrosense: 'Sensores IoT y analytics para agricultura de precisión, reduciendo el uso de insumos hasta en un 40%.',
  civicdata: 'Analytics y panel de BI para que los municipios de mediano porte monitoreen KPIs urbanos.',
  creditoo: 'Crédito a medida para autónomos y microemprendedores usando open finance y datos alternativos.',
  datafarm: 'Hub nacional de datos agronómicos con cobertura de 12 mil granjas conectadas.',
  edupath: 'Plataforma adaptativa de enseñanza técnica con itinerarios personalizados por IA generativa.',
  fiducia: 'Seguros embebidos para marketplaces y plataformas de e-commerce vía API.',
  fluxops: 'ERP modular para pymes industriales — implementación en días, no meses.',
  greenport: 'Plataforma de compensación de carbono para exportadores con trazabilidad MRV.',
  lexia: 'IA jurídica para triaje, clasificación y respuesta de contratos en empresas de mediano porte.',
  medtrack: 'Gestión de la trayectoria clínica en hospitales de mediano porte, integrando historia clínica y agenda.',
  packify: 'Empaques inteligentes con NFC para trazabilidad y engagement poscompra.',
  routix: 'Optimización de última milla con IA predictiva, reduciendo el costo de entrega en un 28%.',
  shelfiq: 'Motor de precios dinámicos para minoristas, aumentando el margen sin perder volumen.',
  shieldlayer: 'Plataforma zero-trust para bancos regionales y cooperativas de crédito.',
  sinfra: 'Software de gestión de obras civiles y concesiones públicas, presente en 14 estados.',
  tokedu: 'Capacitación corporativa en microlearning — 1.200 empresas clientes en Brasil y LATAM.',
  vitalink: 'Telemedicina y monitoreo remoto para trabajadores rurales y comunidades aisladas.',
  volta: 'Infraestructura de recarga para vehículos eléctricos en edificios y estacionamientos.',
}

type Empresa = {
  _id: string
  _type: string
  nome: string
  slug: { _type: 'slug'; current: string }
  setor: string
  estagio: string
  fundada: number
  desc: string
  longDesc?: string
  website?: string
  status?: string
  logo?: unknown
  foto?: unknown
  fundador?: { nome?: string; titulo?: string }
  investimento?: { rodada?: string; ano?: number }
  investidores?: string[]
}

function buildTranslated(
  pt: Empresa,
  lang: 'en' | 'es',
): Empresa {
  const slug = pt.slug.current
  const desc = lang === 'en' ? DESC_EN[slug] : DESC_ES[slug]
  const boiler = lang === 'en' ? BOILER_EN : BOILER_ES
  const statusMap = lang === 'en' ? STATUS_EN : STATUS_ES
  const rodadaMap = lang === 'en' ? RODADA_EN : RODADA_ES
  const tituloMap = lang === 'en' ? TITULO_EN : TITULO_ES

  if (!desc) throw new Error(`Sem tradução de desc (${lang}) para slug "${slug}"`)

  const {
    _rev,
    _createdAt,
    _updatedAt,
    ...rest
  } = pt as Empresa & { _rev?: string; _createdAt?: string; _updatedAt?: string }

  return {
    ...rest,
    _id: `${pt._id}__i18n_${lang}`,
    language: lang,
    desc,
    longDesc: pt.longDesc ? desc + boiler : undefined,
    status: pt.status ? statusMap[pt.status] ?? pt.status : undefined,
    fundador: pt.fundador
      ? { ...pt.fundador, titulo: pt.fundador.titulo ? tituloMap[pt.fundador.titulo] ?? pt.fundador.titulo : pt.fundador.titulo }
      : undefined,
    investimento: pt.investimento
      ? { ...pt.investimento, rodada: pt.investimento.rodada ? rodadaMap[pt.investimento.rodada] ?? pt.investimento.rodada : pt.investimento.rodada }
      : undefined,
  } as unknown as Empresa
}

async function main() {
  const pts = await client.fetch<Empresa[]>(
    `*[_type == "empresa" && !(_id in path("drafts.**"))]{ ..., language } | order(nome asc)`,
  )
  console.log(`Encontradas ${pts.length} empresas PT\n`)

  for (const pt of pts) {
    // 1) language='pt' no doc canônico
    await client.patch(pt._id).set({ language: 'pt' }).commit()

    // 2) versões EN/ES
    const en = buildTranslated(pt, 'en')
    const es = buildTranslated(pt, 'es')
    await client.createOrReplace(en as never)
    await client.createOrReplace(es as never)

    // 3) translation.metadata
    const slug = pt.slug.current
    await client.createOrReplace({
      _id: `${pt._id}__i18n_metadata`,
      _type: 'translation.metadata',
      schemaTypes: ['empresa'],
      translations: [
        { _key: `pt-${slug}`, _type: 'internationalizedArrayReferenceValue', language: 'pt', value: { _ref: pt._id, _type: 'reference' } },
        { _key: `en-${slug}`, _type: 'internationalizedArrayReferenceValue', language: 'en', value: { _ref: en._id, _type: 'reference' } },
        { _key: `es-${slug}`, _type: 'internationalizedArrayReferenceValue', language: 'es', value: { _ref: es._id, _type: 'reference' } },
      ],
    } as never)

    console.log(`✓ ${pt.nome} (${slug}) → pt/en/es + metadata`)
  }

  console.log('\n✅ Concluído.')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
