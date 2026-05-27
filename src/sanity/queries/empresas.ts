import { sanityFetch } from '@/sanity/lib/live'
import { groq } from 'next-sanity'

// ── Query ──────────────────────────────────────────────────────────────────

export const empresasQuery = groq`*[_type == "empresa"] | order(nome asc) {
  "slug": slug.current,
  nome,
  setor,
  estagio,
  fundada,
  desc,
  longDesc,
  website,
  status,
  logo { asset { _ref, "_type": _type } },
  foto  { asset { _ref, "_type": _type } },
  fundador { nome, titulo },
  investimento { rodada, ano },
  investidores,
}`

// ── Fetch ──────────────────────────────────────────────────────────────────

export async function getEmpresas() {
  return sanityFetch<EmpresaItem[]>({ query: empresasQuery, tags: ['empresa'] })
}

// ── Types ──────────────────────────────────────────────────────────────────

export type EmpresaItem = {
  slug: string
  nome: string
  setor: string
  estagio: 'Startup' | 'Scale-up' | 'Corporação'
  fundada: number
  desc: string
  longDesc?: string
  website?: string
  status?: string
  logo?: { asset: { _ref: string; _type: 'reference' } }
  foto?: { asset: { _ref: string; _type: 'reference' } }
  fundador?: { nome?: string; titulo?: string }
  investimento?: { rodada?: string; ano?: number }
  investidores?: string[]
}

export type EmpresasData = Awaited<ReturnType<typeof getEmpresas>>
