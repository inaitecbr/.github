import { sanityFetch } from '@/sanity/lib/live'
import { groq } from 'next-sanity'

// ── Query GROQ ───────────────────────────────────────────────────────────────

export const faleConoscoQuery = groq`
  *[_type == "faleConosco" && language == $language][0]{
    language,
    hero {
      eyebrow,
      titleStart,
      titleHighlight,
      desc,
      emailContato
    },
    canais {
      eyebrow,
      titleStart,
      titleHighlight,
      titleEnd,
      desc,
      items[]{ _key, titulo, desc, email, whatsapp, horario, iconName }
    },
    endereco {
      eyebrow,
      titleStart,
      titleHighlight,
      desc,
      logradouro,
      complemento,
      mapaEmbedUrl,
      mapaTitle
    },
    faq {
      eyebrow,
      titleStart,
      titleHighlight,
      desc,
      items[]{ _key, q, a }
    }
  }
`

// ── TypeScript types ─────────────────────────────────────────────────────────

export type FaleConoscoHero = {
  eyebrow?: string
  titleStart?: string
  titleHighlight?: string
  desc?: string
  emailContato?: string
}

export type FaleConoscoCanaisItem = {
  _key?: string
  titulo?: string
  desc?: string
  email?: string
  whatsapp?: string
  horario?: string
  iconName?: string
}

export type FaleConoscoCanais = {
  eyebrow?: string
  titleStart?: string
  titleHighlight?: string
  titleEnd?: string
  desc?: string
  items?: FaleConoscoCanaisItem[]
}

export type FaleConoscoEndereco = {
  eyebrow?: string
  titleStart?: string
  titleHighlight?: string
  desc?: string
  logradouro?: string
  complemento?: string
  mapaEmbedUrl?: string
  mapaTitle?: string
}

export type FaleConoscoFaqItem = {
  _key?: string
  q?: string
  a?: string
}

export type FaleConoscoFaq = {
  eyebrow?: string
  titleStart?: string
  titleHighlight?: string
  desc?: string
  items?: FaleConoscoFaqItem[]
}

export type FaleConoscoData = {
  language?: string
  hero?: FaleConoscoHero
  canais?: FaleConoscoCanais
  endereco?: FaleConoscoEndereco
  faq?: FaleConoscoFaq
} | null

// ── Fetch helper ─────────────────────────────────────────────────────────────

export async function getFaleConosco({ locale }: { locale: string }) {
  return sanityFetch<FaleConoscoData>({
    query: faleConoscoQuery,
    params: { language: locale },
    tags: ['faleConosco'],
  })
}
