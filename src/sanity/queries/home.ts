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
    },
    ecossistema {
      eyebrow,
      titleStart,
      titleHighlight,
      p1,
      p2,
      ctaLabel,
      ctaHref
    },
    pilares {
      eyebrow,
      titleStart,
      titleHighlight,
      desc,
      pillars[]{ _key, label, subtitle, metric, metricLabel, desc, tags, ctaLabel }
    },
    timeline {
      marcoLabel,
      imageAlt,
      events[]{ _key, year, title, desc, metrics[]{ _key, value, label } }
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

export type HomePilarItem = {
  _key?: string
  label?: string
  subtitle?: string
  metric?: string
  metricLabel?: string
  desc?: string
  tags?: string[]
  ctaLabel?: string
}

export type HomePilares = {
  eyebrow?: string
  titleStart?: string
  titleHighlight?: string
  desc?: string
  pillars?: HomePilarItem[]
}

export type HomeTimelineMetric = {
  _key?: string
  value?: string
  label?: string
}

export type HomeTimelineEvent = {
  _key?: string
  year?: string
  title?: string
  desc?: string
  metrics?: HomeTimelineMetric[]
}

export type HomeTimeline = {
  marcoLabel?: string
  imageAlt?: string
  events?: HomeTimelineEvent[]
}

export type HomeEcossistema = {
  eyebrow?: string
  titleStart?: string
  titleHighlight?: string
  p1?: string
  p2?: string
  ctaLabel?: string
  ctaHref?: string
}

export type HomeData = {
  language?: string
  hero?: HomeHero
  parceiros?: HomeParceiros
  ecossistema?: HomeEcossistema
  pilares?: HomePilares
  timeline?: HomeTimeline
} | null

export async function getHome({ locale }: { locale: string }) {
  return sanityFetch<HomeData>({
    query: homeQuery,
    params: { language: locale },
    tags: ['home'],
  })
}
