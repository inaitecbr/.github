import { groq } from 'next-sanity'
import { sanityFetch } from '@/sanity/lib/live'

export const homeQuery = groq`
  *[_type == "home" && language == $language][0]{
    language,
    hero {
      "videoUrl": video.asset->url,
      titleStart,
      titleHighlight,
      subtitle,
      ctaPrimary,
      ctaSecondary,
      metrics
    },
    parceiros {
      title,
      titleHighlight,
      groups[]{
        _key,
        label,
        logos[]{
          _key,
          alt,
          "imageUrl": image.asset->url
        }
      }
    }
  }
`

export type HomeCta = {
  label?: string
  href?: string
}

export type HomeMetric = {
  value?: string
  label?: string
}

export type HomeHero = {
  videoUrl?: string
  titleStart?: string
  titleHighlight?: string
  subtitle?: string
  ctaPrimary?: HomeCta
  ctaSecondary?: HomeCta
  metrics?: HomeMetric[]
}

export type HomeParceiroLogo = {
  _key?: string
  alt?: string
  imageUrl?: string
}

export type HomeParceiroGroup = {
  _key?: string
  label?: string
  logos?: HomeParceiroLogo[]
}

export type HomeParceiros = {
  title?: string
  titleHighlight?: string
  groups?: HomeParceiroGroup[]
}

export type HomeData = {
  language?: string
  hero?: HomeHero
  parceiros?: HomeParceiros
} | null

export async function getHome({ locale }: { locale: string }) {
  return sanityFetch<HomeData>({
    query: homeQuery,
    params: { language: locale },
    tags: ['home'],
  })
}
