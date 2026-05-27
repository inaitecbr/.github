import { sanityFetch } from '@/sanity/lib/live'
import { groq } from 'next-sanity'
import type { CtaFinalData } from '@/components/CtaFinalSection'

// ── Query ──────────────────────────────────────────────────────────────────

export const empresasInstaladasQuery = groq`
  *[_type == "empresasInstaladas" && language == $language][0]{
    hero {
      eyebrow,
      titleStart,
      titleHighlight,
      subtitle
    },
    ctaFinal {
      eyebrow,
      titleStart,
      titleHighlight,
      titleEnd,
      desc,
      ctaPrimary { label, href },
      ctaSecondary { label, href },
    }
  }
`

// ── Types ──────────────────────────────────────────────────────────────────

export type EmpresasInstaladasHero = {
  eyebrow?: string
  titleStart?: string
  titleHighlight?: string
  subtitle?: string
}

export type EmpresasInstaladasPageData = {
  hero?: EmpresasInstaladasHero
  ctaFinal?: CtaFinalData
} | null

// ── Fetch ──────────────────────────────────────────────────────────────────

export async function getEmpresasInstaladasPage({ locale }: { locale: string }) {
  return sanityFetch<EmpresasInstaladasPageData>({
    query: empresasInstaladasQuery,
    params: { language: locale },
    tags: ['empresasInstaladas'],
  })
}
