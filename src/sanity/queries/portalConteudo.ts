import { sanityFetch } from '@/sanity/lib/live'
import { groq } from 'next-sanity'

export const portalConteudoQuery = groq`*[_type == "portalConteudo" && language == $language][0]{
  hero { eyebrow, titleStart, titleHighlight, desc }
}`

export type PortalConteudoHero = {
  eyebrow?: string
  titleStart?: string
  titleHighlight?: string
  desc?: string
}

export type PortalConteudoData = {
  hero?: PortalConteudoHero
} | null

export async function getPortalConteudo({ locale }: { locale: string }) {
  return sanityFetch<PortalConteudoData>({
    query: portalConteudoQuery,
    params: { language: locale },
    tags: ['portalConteudo'],
  })
}
