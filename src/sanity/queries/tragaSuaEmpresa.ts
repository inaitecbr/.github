import { sanityFetch } from '@/sanity/lib/live'
import { groq } from 'next-sanity'

export const tragaSuaEmpresaQuery = groq`
  *[_type == "tragaSuaEmpresa" && language == $language][0]{
    language,
    hero {
      titleStart,
      titleHighlight,
      titleEnd,
      subtitle,
      ctaPrimary  { label, href },
      ctaSecondary { label, href },
      "heroImageUrl": heroImage.asset->url,
      heroBadgeLabel
    },
    perks {
      eyebrow,
      titleStart,
      titleHighlight,
      titleEnd,
      desc,
      items[]{ _key, nome, "logoUrl": logo.asset->url, desc }
    },
    beneficios {
      eyebrow,
      titleStart,
      titleHighlight,
      titleEnd,
      items[]{ _key, titulo, desc }
    },
    infraestrutura {
      eyebrow,
      titleStart,
      titleHighlight,
      titleEnd,
      desc,
      tourCtaLabel,
      tourCtaHref,
      espacos[]{ _key, nome, metragem, desc, "fotoUrl": foto.asset->url },
      localizacao { eyebrow, endereco, distancias, ctaLabel, ctaHref }
    },
    porQue {
      eyebrow,
      titleStart,
      titleHighlight,
      titleEnd,
      "porQueImageUrl": porQueImage.asset->url,
      testimonial { quote, nome, cargo, empresa },
      razoes[]{ _key, titulo, desc }
    },
    ctaFinal {
      titleStart,
      titleHighlight,
      titleEnd,
      desc,
      ctaPrimary  { label, href },
      ctaSecondary { label, href }
    }
  }
`

// ── Types ─────────────────────────────────────────────────────────────────────

export type TragaCtaItem = { label?: string; href?: string }

export type TragaHero = {
  titleStart?: string
  titleHighlight?: string
  titleEnd?: string
  subtitle?: string
  ctaPrimary?: TragaCtaItem
  ctaSecondary?: TragaCtaItem
  heroImageUrl?: string | null
  heroBadgeLabel?: string
}

export type TragaPerkItem = {
  _key?: string
  nome?: string
  logoUrl?: string | null
  desc?: string
}

export type TragaPerks = {
  eyebrow?: string
  titleStart?: string
  titleHighlight?: string
  titleEnd?: string
  desc?: string
  items?: TragaPerkItem[]
}

export type TragaBeneficioItem = {
  _key?: string
  titulo?: string
  desc?: string
}

export type TragaBeneficios = {
  eyebrow?: string
  titleStart?: string
  titleHighlight?: string
  titleEnd?: string
  items?: TragaBeneficioItem[]
}

export type TragaEspacoItem = {
  _key?: string
  nome?: string
  metragem?: string
  desc?: string
  fotoUrl?: string | null
}

export type TragaLocalizacao = {
  eyebrow?: string
  endereco?: string
  distancias?: string
  ctaLabel?: string
  ctaHref?: string
}

export type TragaInfraestrutura = {
  eyebrow?: string
  titleStart?: string
  titleHighlight?: string
  titleEnd?: string
  desc?: string
  tourCtaLabel?: string
  tourCtaHref?: string
  espacos?: TragaEspacoItem[]
  localizacao?: TragaLocalizacao
}

export type TragaTestimonial = {
  quote?: string
  nome?: string
  cargo?: string
  empresa?: string
}

export type TragaRazaoItem = {
  _key?: string
  titulo?: string
  desc?: string
}

export type TragaPorQue = {
  eyebrow?: string
  titleStart?: string
  titleHighlight?: string
  titleEnd?: string
  porQueImageUrl?: string | null
  testimonial?: TragaTestimonial
  razoes?: TragaRazaoItem[]
}

export type TragaCtaFinal = {
  titleStart?: string
  titleHighlight?: string
  titleEnd?: string
  desc?: string
  ctaPrimary?: TragaCtaItem
  ctaSecondary?: TragaCtaItem
}

export type TragaSuaEmpresaData = {
  language?: string
  hero?: TragaHero
  perks?: TragaPerks
  beneficios?: TragaBeneficios
  infraestrutura?: TragaInfraestrutura
  porQue?: TragaPorQue
  ctaFinal?: TragaCtaFinal
} | null

export async function getTragaSuaEmpresa({ locale }: { locale: string }) {
  return sanityFetch<TragaSuaEmpresaData>({
    query: tragaSuaEmpresaQuery,
    params: { language: locale },
    tags: ['traga-sua-empresa'],
  })
}
