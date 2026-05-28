import { groq } from 'next-sanity'
import { sanityFetch } from '@/sanity/lib/live'
import type { CtaFinalData } from '@/components/CtaFinalSection'

export const chamadasPageQuery = groq`
  *[_type == "chamadas" && language == $language][0]{
    hero {
      eyebrow,
      titleStart,
      titleHighlight,
      desc
    },
    ctaFinal {
      eyebrow,
      titleStart,
      titleHighlight,
      titleEnd,
      desc,
      ctaPrimary { label, href },
      ctaSecondary { label, href }
    }
  }
`

export type ChamadasHero = {
  eyebrow?: string
  titleStart?: string
  titleHighlight?: string
  desc?: string
}

export type ChamadasPageData = {
  hero?: ChamadasHero
  ctaFinal?: CtaFinalData
} | null

export async function getChamadasPage({ locale }: { locale: string }) {
  return sanityFetch<ChamadasPageData>({
    query: chamadasPageQuery,
    params: { language: locale },
    tags: ['chamadas'],
  })
}
