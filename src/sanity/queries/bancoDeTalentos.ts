import { groq } from 'next-sanity'
import { sanityFetch } from '@/sanity/lib/live'

export const bancoDeTalentosQuery = groq`
  *[_type == "bancoDeTalentos" && language == $language][0]{
    hero {
      eyebrow,
      titleStart,
      titleHighlight,
      titleEnd,
      desc,
      ctaLabelCandidato,
      ctaLabelEmpresa
    },
    oQueE {
      eyebrow,
      titleStart,
      titleHighlight,
      titleEnd,
      paragraphs,
      perfisBuscadosLabel,
      perfisBuscados
    },
    paraCandidatos {
      eyebrow,
      titleStart,
      titleHighlight,
      titleEnd,
      desc,
      ctaLabelCurriculo,
      ctaLabelVagas,
      ctaVagasTag,
      passos[]{ _key, titulo, desc }
    },
    paraEmpresas {
      eyebrow,
      titleStart,
      titleHighlight,
      desc,
      ctaLabel,
      passos[]{ _key, titulo, desc },
      vantagens[]{ _key, titulo, desc }
    },
    numeros {
      eyebrow,
      titleStart,
      titleHighlight,
      desc,
      items[]{ _key, valor, label }
    },
    ctaFinal {
      titleStart,
      titleHighlight,
      titleEnd,
      desc,
      labelCandidato,
      labelEmpresa
    }
  }
`

// ─── Tipos ────────────────────────────────────────────────────────

export type BancoPasso = { _key?: string; titulo?: string; desc?: string }
export type BancoVantagem = { _key?: string; titulo?: string; desc?: string }
export type BancoNumero = { _key?: string; valor?: string; label?: string }

export type BancoHero = {
  eyebrow?: string
  titleStart?: string
  titleHighlight?: string
  titleEnd?: string
  desc?: string
  ctaLabelCandidato?: string
  ctaLabelEmpresa?: string
}

export type BancoOQueE = {
  eyebrow?: string
  titleStart?: string
  titleHighlight?: string
  titleEnd?: string
  paragraphs?: string[]
  perfisBuscadosLabel?: string
  perfisBuscados?: string[]
}

export type BancoParaCandidatos = {
  eyebrow?: string
  titleStart?: string
  titleHighlight?: string
  titleEnd?: string
  desc?: string
  ctaLabelCurriculo?: string
  ctaLabelVagas?: string
  ctaVagasTag?: string
  passos?: BancoPasso[]
}

export type BancoParaEmpresas = {
  eyebrow?: string
  titleStart?: string
  titleHighlight?: string
  desc?: string
  ctaLabel?: string
  passos?: BancoPasso[]
  vantagens?: BancoVantagem[]
}

export type BancoNumeros = {
  eyebrow?: string
  titleStart?: string
  titleHighlight?: string
  desc?: string
  items?: BancoNumero[]
}

export type BancoCtaFinal = {
  titleStart?: string
  titleHighlight?: string
  titleEnd?: string
  desc?: string
  labelCandidato?: string
  labelEmpresa?: string
}

export type BancoDeTalentosData = {
  hero?: BancoHero
  oQueE?: BancoOQueE
  paraCandidatos?: BancoParaCandidatos
  paraEmpresas?: BancoParaEmpresas
  numeros?: BancoNumeros
  ctaFinal?: BancoCtaFinal
} | null

// ─── Fetcher ──────────────────────────────────────────────────────

export async function getBancoDeTalentos({ locale }: { locale: string }) {
  return sanityFetch<BancoDeTalentosData>({
    query: bancoDeTalentosQuery,
    params: { language: locale },
    tags: ['bancoDeTalentos'],
  })
}
