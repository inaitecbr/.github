import { groq } from 'next-sanity'
import { sanityFetch } from '@/sanity/lib/live'

// ─── Projeções reutilizáveis ───────────────────────────────────────

/** Card mínimo — usado no catálogo, home, chamadas em destaque. */
const programaCardFields = groq`
  _id,
  "slug": slug.current,
  name,
  desc,
  publicoKey,
  estagioKey,
  entradaKey,
  statusKey,
  deadline,
  "imageUrl": image.asset->url
`

/** Programa completo — usado na página /programas/[slug]. */
const programaFullFields = groq`
  _id,
  "slug": slug.current,
  name,
  desc,
  publicoKey,
  estagioKey,
  entradaKey,
  statusKey,
  deadline,
  "imageUrl": image.asset->url,
  longDesc,
  quickFacts[]{ _key, label, value },
  oQueE,
  highlight,
  paraQuem,
  beneficios[]{ _key, titulo, desc },
  etapas[]{ _key, titulo, desc, duracao },
  stats[]{ _key, value, label },
  cases[]{
    _key,
    nome,
    setor,
    "logoUrl": logo.asset->url,
    "fotoUrl": foto.asset->url,
    quote,
    pessoa,
    cargo,
    metricas[]{ _key, label, value }
  },
  faq[]{ _key, q, a }
`

// ─── Queries ───────────────────────────────────────────────────────

export const programasListQuery = groq`
  *[_type == "programa" && language == $language]{
    ${programaCardFields}
  } | order(name asc)
`

export const programaBySlugQuery = groq`
  *[_type == "programa" && language == $language && slug.current == $slug][0]{
    ${programaFullFields}
  }
`

export const chamadasAbertasQuery = groq`
  *[_type == "programa" && language == $language && statusKey in ["aberta", "em-breve"]]{
    ${programaCardFields}
  } | order(
    select(statusKey == "aberta" => 0, 1) asc,
    deadline asc
  )
`

// ─── Tipos ─────────────────────────────────────────────────────────

export type PublicoKey = 'startups' | 'empresas' | 'universidades' | 'investidores'
export type EstagioKey =
  | 'ideacao'
  | 'pre-aceleracao'
  | 'aceleracao'
  | 'crescimento'
  | 'internacionalizacao'
  | 'pesquisa'
  | 'operacao'
export type EntradaKey = 'edital' | 'inscricao-continua' | 'convite' | 'parceria'
export type StatusKey = 'aberta' | 'em-breve' | 'fechada' | 'fluxo-continuo'

export type ProgramaCard = {
  _id: string
  slug?: string
  name?: string
  desc?: string
  publicoKey?: PublicoKey
  estagioKey?: EstagioKey
  entradaKey?: EntradaKey
  statusKey?: StatusKey
  deadline?: string
  imageUrl?: string
}

export type ProgramaQuickFact = { _key?: string; label?: string; value?: string }
export type ProgramaBeneficio = { _key?: string; titulo?: string; desc?: string }
export type ProgramaEtapa = { _key?: string; titulo?: string; desc?: string; duracao?: string }
export type ProgramaStat = { _key?: string; value?: string; label?: string }
export type ProgramaCaseMetrica = { _key?: string; label?: string; value?: string }
export type ProgramaCase = {
  _key?: string
  nome?: string
  setor?: string
  logoUrl?: string
  fotoUrl?: string
  quote?: string
  pessoa?: string
  cargo?: string
  metricas?: ProgramaCaseMetrica[]
}
export type ProgramaFaq = { _key?: string; q?: string; a?: string }

export type ProgramaFull = ProgramaCard & {
  longDesc?: string
  quickFacts?: ProgramaQuickFact[]
  oQueE?: string[]
  highlight?: string
  paraQuem?: string[]
  beneficios?: ProgramaBeneficio[]
  etapas?: ProgramaEtapa[]
  stats?: ProgramaStat[]
  cases?: ProgramaCase[]
  faq?: ProgramaFaq[]
}

// ─── Fetchers ──────────────────────────────────────────────────────

export async function getProgramas({ locale }: { locale: string }) {
  return sanityFetch<ProgramaCard[]>({
    query: programasListQuery,
    params: { language: locale },
    tags: ['programa'],
  })
}

export async function getProgramaBySlug({ slug, locale }: { slug: string; locale: string }) {
  return sanityFetch<ProgramaFull | null>({
    query: programaBySlugQuery,
    params: { language: locale, slug },
    tags: ['programa', `programa:${slug}`],
  })
}

export async function getChamadasAbertas({ locale }: { locale: string }) {
  return sanityFetch<ProgramaCard[]>({
    query: chamadasAbertasQuery,
    params: { language: locale },
    tags: ['programa'],
  })
}
