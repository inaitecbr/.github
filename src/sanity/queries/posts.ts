import { sanityFetch } from '@/sanity/lib/live'
import { groq } from 'next-sanity'
import type { PortableTextBlock } from '@portabletext/types'
import type { Image } from 'sanity'

// ── Tipos ──────────────────────────────────────────────────────────────────

export type PostListItem = {
  slug: string
  title: string
  category?: string
  publishedAt: string
  excerpt?: string
  author?: string
  featured?: boolean
  mainImage?: Image
}

export type PostDetail = PostListItem & {
  body?: PortableTextBlock[]
  legacyUrl?: string
}

// ── Listagem (Portal de Conteúdo) ────────────────────────────────────────────

export const postsQuery = groq`*[_type == "post" && language == $language] | order(publishedAt desc) {
  "slug": slug.current,
  title,
  category,
  publishedAt,
  excerpt,
  author,
  featured,
  mainImage,
}`

export async function getPosts({ locale }: { locale: string }) {
  return sanityFetch<PostListItem[]>({
    query: postsQuery,
    params: { language: locale },
    tags: ['post'],
  })
}

// ── Artigo individual + relacionados (mesma categoria) ───────────────────────

export const postQuery = groq`*[_type == "post" && language == $language && slug.current == $slug][0]{
  "slug": slug.current,
  title,
  category,
  publishedAt,
  excerpt,
  author,
  featured,
  mainImage,
  body,
  legacyUrl,
  "relacionados": *[_type == "post" && language == $language && slug.current != $slug && category == ^.category] | order(publishedAt desc)[0...3]{
    "slug": slug.current,
    title,
    category,
    publishedAt,
    excerpt,
    mainImage,
  }
}`

export async function getPost({ slug, locale }: { slug: string; locale: string }) {
  return sanityFetch<(PostDetail & { relacionados: PostListItem[] }) | null>({
    query: postQuery,
    params: { language: locale, slug },
    tags: ['post'],
  })
}

// ── Slugs para generateStaticParams ──────────────────────────────────────────

export const postSlugsQuery = groq`*[_type == "post" && language == "pt" && defined(slug.current)].slug.current`

export async function getPostSlugs() {
  return sanityFetch<string[]>({ query: postSlugsQuery, tags: ['post'] })
}
