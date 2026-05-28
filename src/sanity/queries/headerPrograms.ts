import { sanityFetch } from '@/sanity/lib/live'
import { groq } from 'next-sanity'

// ── Query GROQ ───────────────────────────────────────────────────────────────
// Retorna os programas agrupados por pilar (publicoKey) para o dropdown do Header.

const programaProjection = `{ name, "slug": slug.current }`

export const headerProgramsQuery = groq`{
  "startups":      *[_type == "programa" && language == $language && publicoKey == "startups"]      | order(name asc) ${programaProjection},
  "empresas":      *[_type == "programa" && language == $language && publicoKey == "empresas"]      | order(name asc) ${programaProjection},
  "universidades": *[_type == "programa" && language == $language && publicoKey == "universidades"] | order(name asc) ${programaProjection},
  "investidores":  *[_type == "programa" && language == $language && publicoKey == "investidores"]  | order(name asc) ${programaProjection}
}`

// ── TypeScript types ─────────────────────────────────────────────────────────

export type HeaderProgramItem = {
  name?: string
  slug?: string
}

export type HeaderProgramsByPillar = {
  startups: HeaderProgramItem[]
  empresas: HeaderProgramItem[]
  universidades: HeaderProgramItem[]
  investidores: HeaderProgramItem[]
}

// ── Fetch helper ─────────────────────────────────────────────────────────────

export async function getHeaderPrograms({ locale }: { locale: string }) {
  return sanityFetch<HeaderProgramsByPillar>({
    query: headerProgramsQuery,
    params: { language: locale },
    tags: ['programa'],
  })
}
