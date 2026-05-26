/**
 * Lê src/data/programas.ts e produz JSON pronto para criação via MCP.
 * Outputs:
 *   scripts/output/programas-pt-simple.json   (17 programas simples)
 *   scripts/output/programas-pt-acelera.json  (1 programa completo)
 *   ... idem para en, es
 *
 * Rodar: npx tsx scripts/build-programas-json.ts
 *
 * Pode ser deletado após a migração — não é parte do app.
 */
import { writeFileSync, mkdirSync } from 'node:fs'
import { randomUUID } from 'node:crypto'
import { resolve } from 'node:path'
import { PROGRAMAS, type Programa, type Publico, type Estagio, type Entrada } from '../src/data/programas'

const PUBLICO_KEY: Record<Publico, string> = {
  'Startups e Pequenas Empresas': 'startups',
  'Grandes e Médias Empresas': 'empresas',
  'Universidades e Governo': 'universidades',
  Investidores: 'investidores',
}

const ESTAGIO_KEY: Record<Estagio, string> = {
  Ideação: 'ideacao',
  'Pré-aceleração': 'pre-aceleracao',
  Aceleração: 'aceleracao',
  Crescimento: 'crescimento',
  Internacionalização: 'internacionalizacao',
  Pesquisa: 'pesquisa',
  Operação: 'operacao',
}

const ENTRADA_KEY: Record<Entrada, string> = {
  Edital: 'edital',
  'Inscrição contínua': 'inscricao-continua',
  Convite: 'convite',
  Parceria: 'parceria',
}

// ── Traduções dos 4 destaques da Home (vêm dos messages/*.json) ──
type Translation = { name: string; desc: string }
const HOME_TRANSLATIONS: Record<string, { en: Translation; es: Translation }> = {
  'acelera-pedra-branca': {
    en: {
      name: 'Acelera Pedra Branca',
      desc: 'Intensive acceleration program with mentorship and investment.',
    },
    es: {
      name: 'Acelera Pedra Branca',
      desc: 'Programa intensivo de aceleración con mentoría e inversión.',
    },
  },
  'inovacao-aberta': {
    en: { name: 'Open Innovation', desc: 'Connection between corporations and disruptive startups.' },
    es: {
      name: 'Innovación Abierta',
      desc: 'Conexión entre corporaciones y startups disruptivas.',
    },
  },
  'pesquisa-aplicada': {
    en: { name: 'Applied Research', desc: 'R&D and technology transfer with academia.' },
    es: {
      name: 'Investigación Aplicada',
      desc: 'I+D y transferencia tecnológica con la academia.',
    },
  },
  'catalisa-inaitec': {
    en: { name: 'Catalisa Inaitec', desc: 'Curated deal flow and co-investment within the ecosystem.' },
    es: { name: 'Catalisa Inaitec', desc: 'Deal flow curado y co-inversión en el ecosistema.' },
  },
}

function key(): string {
  return randomUUID().replace(/-/g, '').slice(0, 12)
}

function arrToKeyed<T extends object>(arr: T[] | undefined): (T & { _key: string })[] | undefined {
  if (!arr || arr.length === 0) return undefined
  return arr.map((item) => ({ _key: key(), ...item }))
}

function strArr(arr: string[] | undefined): string[] | undefined {
  if (!arr || arr.length === 0) return undefined
  return arr
}

function toDeadlineISO(d?: string): string | undefined {
  if (!d) return undefined
  return new Date(d + 'T23:59:59.000Z').toISOString()
}

function buildDoc(p: Programa, language: 'pt' | 'en' | 'es') {
  const tr = HOME_TRANSLATIONS[p.slug]?.[language as 'en' | 'es']
  const name = language === 'pt' ? p.name : tr?.name ?? p.name
  const desc = language === 'pt' ? p.desc : tr?.desc ?? p.desc

  const doc: Record<string, unknown> = {
    _type: 'programa',
    language,
    slug: { _type: 'slug', current: p.slug },
    name,
    desc,
    publicoKey: PUBLICO_KEY[p.publico],
    estagioKey: ESTAGIO_KEY[p.estagio],
    entradaKey: ENTRADA_KEY[p.entrada],
    statusKey: p.status,
  }

  const deadline = toDeadlineISO(p.deadline)
  if (deadline) doc.deadline = deadline

  // Detalhe — só PT por enquanto, outros idiomas recebem o conteúdo PT como placeholder
  if (p.longDesc) doc.longDesc = p.longDesc
  if (p.highlight) doc.highlight = p.highlight

  const quickFacts = arrToKeyed(p.quickFacts)
  if (quickFacts) doc.quickFacts = quickFacts

  const oQueE = strArr(p.oQueE)
  if (oQueE) doc.oQueE = oQueE

  const paraQuem = strArr(p.paraQuem)
  if (paraQuem) doc.paraQuem = paraQuem

  const beneficios = arrToKeyed(p.beneficios)
  if (beneficios) doc.beneficios = beneficios

  const etapas = arrToKeyed(p.etapas)
  if (etapas) doc.etapas = etapas

  const stats = arrToKeyed(p.stats)
  if (stats) doc.stats = stats

  const cases = p.cases?.map((c) => ({
    _key: key(),
    nome: c.nome,
    setor: c.setor,
    quote: c.quote,
    pessoa: c.pessoa,
    cargo: c.cargo,
    // logo/foto: imagens originais ficam no /public — editor faz upload no Studio depois.
    metricas: arrToKeyed(c.metricas),
  }))
  if (cases && cases.length) doc.cases = cases

  const faq = arrToKeyed(p.faq)
  if (faq) doc.faq = faq

  return doc
}

const outputDir = resolve(__dirname, 'output')
mkdirSync(outputDir, { recursive: true })

const aceleraSlug = 'acelera-pedra-branca'

for (const lang of ['pt', 'en', 'es'] as const) {
  const simples = PROGRAMAS.filter((p) => p.slug !== aceleraSlug).map((p) => buildDoc(p, lang))
  const acelera = PROGRAMAS.filter((p) => p.slug === aceleraSlug).map((p) => buildDoc(p, lang))

  writeFileSync(
    resolve(outputDir, `programas-${lang}-simple.json`),
    JSON.stringify(simples, null, 2),
  )
  writeFileSync(
    resolve(outputDir, `programas-${lang}-acelera.json`),
    JSON.stringify(acelera, null, 2),
  )
  console.log(`✓ ${lang}: ${simples.length} simples + ${acelera.length} acelera`)
}

console.log(`\nArquivos gerados em: ${outputDir}`)
