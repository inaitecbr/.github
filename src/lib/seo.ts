import type { Metadata } from 'next'
import { routing } from '@/i18n/routing'

/**
 * Base do site. Em produção use NEXT_PUBLIC_SITE_URL=https://inaitec.com.br.
 * Sem barra no final.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://inaitec.com.br'
).replace(/\/+$/, '')

/** hreflang por locale (htmlLang usa pt-BR). */
const HREFLANG: Record<string, string> = { pt: 'pt-BR', en: 'en', es: 'es' }

/** og:locale por locale. */
const OG_LOCALE: Record<string, string> = { pt: 'pt_BR', en: 'en_US', es: 'es_ES' }

/** Imagem OpenGraph padrão (logo). */
const DEFAULT_OG_IMAGE = '/logo-fav.png'

/**
 * Caminho real de uma rota num dado locale, respeitando localePrefix:'as-needed'.
 * PT (default) não tem prefixo; EN/ES recebem /en, /es.
 *
 * @param path rota sem locale, ex.: '/sobre' ou '' (home)
 */
export function pathForLocale(locale: string, path: string): string {
  const clean = path.replace(/^\/+|\/+$/g, '')
  const prefix = locale === routing.defaultLocale ? '' : `/${locale}`
  const suffix = clean ? `/${clean}` : ''
  return `${prefix}${suffix}` || '/'
}

/** URL absoluta de uma rota num locale. */
export function urlForLocale(locale: string, path: string): string {
  return `${SITE_URL}${pathForLocale(locale, path)}`
}

type BuildMetadataArgs = {
  locale: string
  /** rota sem locale, ex.: '/sobre' ou '' para a home */
  path: string
  title?: string
  description?: string
  /** caminho ou URL de imagem OG; default = logo */
  image?: string
  /** não indexar (design-system, etc.) */
  noindex?: boolean
}

/**
 * Monta Metadata com canonical + alternates hreflang (pt/en/es + x-default)
 * e OpenGraph/Twitter — tudo locale-aware. Use dentro de generateMetadata.
 */
export function buildMetadata({
  locale,
  path,
  title,
  description,
  image = DEFAULT_OG_IMAGE,
  noindex = false,
}: BuildMetadataArgs): Metadata {
  const canonical = urlForLocale(locale, path)

  const languages: Record<string, string> = {}
  for (const l of routing.locales) {
    languages[HREFLANG[l] ?? l] = urlForLocale(l, path)
  }
  languages['x-default'] = urlForLocale(routing.defaultLocale, path)

  return {
    title,
    description,
    alternates: { canonical, languages },
    openGraph: {
      title: title ?? undefined,
      description: description ?? undefined,
      url: canonical,
      siteName: 'Inaitec',
      locale: OG_LOCALE[locale] ?? 'pt_BR',
      type: 'website',
      images: [{ url: image }],
    },
    twitter: {
      card: 'summary_large_image',
      title: title ?? undefined,
      description: description ?? undefined,
      images: [image],
    },
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
  }
}
