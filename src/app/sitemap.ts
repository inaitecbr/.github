import { routing } from "@/i18n/routing";
import { urlForLocale } from "@/lib/seo";
import { getPostSlugs } from "@/sanity/queries/posts";
import { getProgramaSlugs } from "@/sanity/queries/programa";
import type { MetadataRoute } from "next";

/**
 * Rotas estáticas indexáveis por locale.
 * Exclui: /login, /design-system, /studio (e qualquer rota com noindex).
 */
const STATIC_ROUTES = [
  "", // home
  "/sobre",
  "/programas",
  "/chamadas",
  "/conteudo",
  "/traga-sua-empresa",
  "/fale-conosco",
  "/solucoes",
  "/banco-de-talentos",
];

type SitemapEntry = MetadataRoute.Sitemap[number];

/** Gera entradas com alternates para todos os locales. */
function staticEntry(path: string): SitemapEntry {
  const alternates: Record<string, string> = {};
  for (const locale of routing.locales) {
    alternates[locale] = urlForLocale(locale, path);
  }
  return {
    url: urlForLocale(routing.defaultLocale, path),
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.8,
    alternates: { languages: alternates },
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. Rotas estáticas
  const staticEntries: SitemapEntry[] = STATIC_ROUTES.map(staticEntry);

  // 2. Programas dinâmicos — slugs buscados pelo locale PT
  const [programaSlugsResult, postSlugsResult] = await Promise.all([
    getProgramaSlugs(),
    getPostSlugs(),
  ]);

  const programaSlugs: string[] = programaSlugsResult ?? [];
  const postSlugs: string[] = postSlugsResult ?? [];

  const programaEntries: SitemapEntry[] = programaSlugs.map((slug) => {
    const path = `/programas/${slug}`;
    const alternates: Record<string, string> = {};
    for (const locale of routing.locales) {
      alternates[locale] = urlForLocale(locale, path);
    }
    return {
      url: urlForLocale(routing.defaultLocale, path),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: { languages: alternates },
    };
  });

  // 3. Posts de conteúdo — sempre PT para o slug (mesmo slug em todos locales)
  const postEntries: SitemapEntry[] = postSlugs.map((slug) => {
    const path = `/conteudo/${slug}`;
    const alternates: Record<string, string> = {};
    for (const locale of routing.locales) {
      alternates[locale] = urlForLocale(locale, path);
    }
    return {
      url: urlForLocale(routing.defaultLocale, path),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
      alternates: { languages: alternates },
    };
  });

  return [...staticEntries, ...programaEntries, ...postEntries];
}
