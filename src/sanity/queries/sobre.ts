import { sanityFetch } from '@/sanity/lib/live'
import { groq } from 'next-sanity'

// ── Query GROQ ───────────────────────────────────────────────────────────────

const pessoaProjection = `{ _key, nome, cargo, "fotoUrl": foto.asset->url }`

export const sobreQuery = groq`
  *[_type == "sobre" && language == $language][0]{
    language,
    hero {
      eyebrow,
      titleStart,
      titleHighlight,
      subtitle,
      "heroImageUrl": heroImage.asset->url
    },
    quemSomos {
      eyebrow,
      titleStart,
      titleHighlight,
      titleEnd,
      desc,
      missao,
      visao,
      valores[]{ _key, titulo, desc }
    },
    historia {
      eyebrow,
      titleStart,
      titleHighlight,
      titleEnd,
      desc,
      eventos[]{ _key, ano, titulo, desc }
    },
    lideranca {
      eyebrow,
      titleStart,
      titleHighlight,
      desc,
      diretoriaLabel,
      diretoriaTitulo,
      diretoriaDesc,
      conselhosLabel,
      conselhosTitulo,
      conselhosDesc,
      diretoria[]${pessoaProjection},
      conselhoDeliberativo { titulo, desc, membros[]${pessoaProjection} },
      conselhoFiscal      { titulo, desc, membros[]${pessoaProjection} },
      conselhoTecnico     { titulo, desc, membros[]${pessoaProjection} },
      juridico            { titulo, desc, membros[]${pessoaProjection} }
    },
    relatorio {
      eyebrow,
      titleStart,
      titleHighlight,
      desc,
      bigNumbers[]{ _key, value, label },
      relatorios[]{ _key, ano, destaque, resumo, pdfUrl }
    },
    mediaKit {
      eyebrow,
      titleStart,
      titleHighlight,
      desc,
      ctaLabel,
      ctaHref
    },
    estrutura {
      eyebrow,
      titleStart,
      titleHighlight,
      desc,
      badgeLabel,
      "estruturaImageUrl": estruturaImage.asset->url,
      enderecoLabel,
      enderecoLinhas,
      items[]{ _key, area, desc }
    },
    ctaFinal {
      eyebrow,
      titleStart,
      titleHighlight,
      titleEnd,
      desc,
      ctaPrimary  { label, href },
      ctaSecondary { label, href }
    }
  }
`

// ── TypeScript types ─────────────────────────────────────────────────────────

export type SobrePessoa = {
  _key?: string
  nome?: string
  cargo?: string
  fotoUrl?: string | null
}

export type SobreHero = {
  eyebrow?: string
  titleStart?: string
  titleHighlight?: string
  subtitle?: string
  heroImageUrl?: string | null
}

export type SobreValorItem = {
  _key?: string
  titulo?: string
  desc?: string
}

export type SobreQuemSomos = {
  eyebrow?: string
  titleStart?: string
  titleHighlight?: string
  titleEnd?: string
  desc?: string
  missao?: string
  visao?: string
  valores?: SobreValorItem[]
}

export type SobreEventoItem = {
  _key?: string
  ano?: string
  titulo?: string
  desc?: string
}

export type SobreHistoria = {
  eyebrow?: string
  titleStart?: string
  titleHighlight?: string
  titleEnd?: string
  desc?: string
  eventos?: SobreEventoItem[]
}

export type SobreConselho = {
  titulo?: string
  desc?: string
  membros?: SobrePessoa[]
}

export type SobreLideranca = {
  eyebrow?: string
  titleStart?: string
  titleHighlight?: string
  desc?: string
  diretoriaLabel?: string
  diretoriaTitulo?: string
  diretoriaDesc?: string
  conselhosLabel?: string
  conselhosTitulo?: string
  conselhosDesc?: string
  diretoria?: SobrePessoa[]
  conselhoDeliberativo?: SobreConselho
  conselhoFiscal?: SobreConselho
  conselhoTecnico?: SobreConselho
  juridico?: SobreConselho
}

export type SobreBigNumber = {
  _key?: string
  value?: string
  label?: string
}

export type SobreRelatorioItem = {
  _key?: string
  ano?: string
  destaque?: string
  resumo?: string
  pdfUrl?: string
}

export type SobreRelatorio = {
  eyebrow?: string
  titleStart?: string
  titleHighlight?: string
  desc?: string
  bigNumbers?: SobreBigNumber[]
  relatorios?: SobreRelatorioItem[]
}

export type SobreMediaKit = {
  eyebrow?: string
  titleStart?: string
  titleHighlight?: string
  desc?: string
  ctaLabel?: string
  ctaHref?: string
}

export type SobreEstruturaItem = {
  _key?: string
  area?: string
  desc?: string
}

export type SobreEstrutura = {
  eyebrow?: string
  titleStart?: string
  titleHighlight?: string
  desc?: string
  badgeLabel?: string
  estruturaImageUrl?: string | null
  enderecoLabel?: string
  enderecoLinhas?: string
  items?: SobreEstruturaItem[]
}

export type SobreData = {
  language?: string
  hero?: SobreHero
  quemSomos?: SobreQuemSomos
  historia?: SobreHistoria
  lideranca?: SobreLideranca
  relatorio?: SobreRelatorio
  mediaKit?: SobreMediaKit
  estrutura?: SobreEstrutura
  ctaFinal?: import('@/components/CtaFinalSection').CtaFinalData
} | null

// ── Fetch helper ─────────────────────────────────────────────────────────────

export async function getSobre({ locale }: { locale: string }) {
  return sanityFetch<SobreData>({
    query: sobreQuery,
    params: { language: locale },
    tags: ['sobre'],
  })
}
