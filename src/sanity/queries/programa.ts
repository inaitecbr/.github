import { sanityFetch } from "@/sanity/lib/live";
import { groq } from "next-sanity";

// ─── Projeções reutilizáveis ───────────────────────────────────────

/** Card mínimo — usado no catálogo, home, chamadas em destaque. */
const programaCardFields = groq`
  _id,
  "slug": slug.current,
  name,
  desc,
  publicoKey,
  estagioKey,
  entradaKey,
  statusKey,
  deadline,
  "imageUrl": image.asset->url
`;

/** Programa completo — usado na página /programas/[slug]. */
const programaFullFields = groq`
  _id,
  "slug": slug.current,
  name,
  desc,
  publicoKey,
  estagioKey,
  entradaKey,
  statusKey,
  deadline,
  "imageUrl": image.asset->url,
  longDesc,
  quickFacts[]{ _key, label, value },
  oQueE,
  highlight,
  paraQuem,
  beneficios[]{ _key, titulo, desc },
  etapas[]{ _key, titulo, desc, duracao },
  stats[]{ _key, value, label },
  cases[]{
    _key,
    nome,
    setor,
    "logoUrl": logo.asset->url,
    "fotoUrl": foto.asset->url,
    quote,
    pessoa,
    cargo,
    metricas[]{ _key, label, value }
  },
  faq[]{ _key, q, a },
  "empresasVinculadas": empresasVinculadas[defined(@->_id)]->{
    _id,
    nome,
    "setor": coalesce(setor->nome, setor),
    desc,
    "logoUrl": logo.asset->url,
    "fotoUrl": foto.asset->url,
    fundador { nome, titulo }
  }
`;

// ─── Queries ───────────────────────────────────────────────────────

export const programasListQuery = groq`
  *[_type == "programa" && language == $language]{
    ${programaCardFields}
  } | order(name asc)
`;

export const programaBySlugQuery = groq`
  *[_type == "programa" && language == $language && slug.current == $slug][0]{
    ${programaFullFields}
  }
`;

export const chamadasAbertasQuery = groq`
  *[_type == "programa" && language == $language && statusKey in ["aberta", "em-breve"]]{
    ${programaCardFields}
  } | order(
    select(statusKey == "aberta" => 0, 1) asc,
    deadline asc
  )
`;

/** Todos os programas com inscrição aberta OU fluxo contínuo — página /chamadas. */
export const chamadasListaQuery = groq`
  *[_type == "programa" && language == $language && statusKey in ["aberta", "fluxo-continuo"]]{
    ${programaCardFields}
  } | order(
    select(statusKey == "aberta" => 0, 1) asc,
    deadline asc
  )
`;

/** Singleton da página /programas — hero, CTA final e outros campos editoriais. */
export const programasPageQuery = groq`
  *[_type == "programas" && language == $language][0]{
    hero {
      eyebrow,
      titleStart,
      titleHighlight,
      subtitle,
      "heroImageUrl": heroImage.asset->url
    },
    ctaFinal {
      eyebrow,
      titleStart,
      titleHighlight,
      titleEnd,
      desc,
      ctaPrimary { label, href },
      ctaSecondary { label, href }
    }
  }
`;

// ─── Tipos ─────────────────────────────────────────────────────────

export type PublicoKey = "startups" | "empresas" | "universidades" | "investidores";
export type EstagioKey =
  | "ideacao"
  | "pre-aceleracao"
  | "aceleracao"
  | "crescimento"
  | "internacionalizacao"
  | "pesquisa"
  | "operacao";
export type EntradaKey = "edital" | "inscricao-continua" | "convite" | "parceria";
export type StatusKey = "aberta" | "em-breve" | "fechada" | "fluxo-continuo";

export type ProgramaCard = {
  _id: string;
  slug?: string;
  name?: string;
  desc?: string;
  publicoKey?: PublicoKey;
  estagioKey?: EstagioKey;
  entradaKey?: EntradaKey;
  statusKey?: StatusKey;
  deadline?: string;
  imageUrl?: string;
};

export type ProgramaQuickFact = { _key?: string; label?: string; value?: string };
export type ProgramaBeneficio = { _key?: string; titulo?: string; desc?: string };
export type ProgramaEtapa = { _key?: string; titulo?: string; desc?: string; duracao?: string };
export type ProgramaStat = { _key?: string; value?: string; label?: string };
export type ProgramaCaseMetrica = { _key?: string; label?: string; value?: string };
export type ProgramaCase = {
  _key?: string;
  nome?: string;
  setor?: string;
  logoUrl?: string;
  fotoUrl?: string;
  quote?: string;
  pessoa?: string;
  cargo?: string;
  metricas?: ProgramaCaseMetrica[];
};
export type ProgramaFaq = { _key?: string; q?: string; a?: string };

export type EmpresaVinculada = {
  _id: string;
  nome?: string;
  setor?: string;
  desc?: string;
  logoUrl?: string;
  fotoUrl?: string;
  fundador?: { nome?: string; titulo?: string };
};

export type ProgramaFull = ProgramaCard & {
  longDesc?: string;
  quickFacts?: ProgramaQuickFact[];
  oQueE?: string[];
  highlight?: string;
  paraQuem?: string[];
  beneficios?: ProgramaBeneficio[];
  etapas?: ProgramaEtapa[];
  stats?: ProgramaStat[];
  cases?: ProgramaCase[];
  faq?: ProgramaFaq[];
  empresasVinculadas?: EmpresaVinculada[];
};

// ─── Fetchers ──────────────────────────────────────────────────────

export async function getProgramas({ locale }: { locale: string }) {
  return sanityFetch<ProgramaCard[]>({
    query: programasListQuery,
    params: { language: locale },
    tags: ["programa"],
  });
}

export async function getProgramaBySlug({ slug, locale }: { slug: string; locale: string }) {
  return sanityFetch<ProgramaFull | null>({
    query: programaBySlugQuery,
    params: { language: locale, slug },
    tags: ["programa", `programa:${slug}`],
  });
}

export async function getChamadasAbertas({ locale }: { locale: string }) {
  return sanityFetch<ProgramaCard[]>({
    query: chamadasAbertasQuery,
    params: { language: locale },
    tags: ["programa"],
  });
}

export async function getChamadasLista({ locale }: { locale: string }) {
  return sanityFetch<ProgramaCard[]>({
    query: chamadasListaQuery,
    params: { language: locale },
    tags: ["programa"],
  });
}

// ─── Programas page singleton ─────────────────────────────────────

export type ProgramasHero = {
  eyebrow?: string;
  titleStart?: string;
  titleHighlight?: string;
  subtitle?: string;
  heroImageUrl?: string | null;
};

export type ProgramasPageData = {
  hero?: ProgramasHero;
  ctaFinal?: import("@/components/CtaFinalSection").CtaFinalData;
} | null;

export async function getProgramasPage({ locale }: { locale: string }) {
  return sanityFetch<ProgramasPageData>({
    query: programasPageQuery,
    params: { language: locale },
    tags: ["programas"],
  });
}

// ─── Slugs para sitemap ───────────────────────────────────────────

/** Retorna todos os slugs de programas PT (one slug = todas as versões i18n). */
export const programaSlugsQuery = groq`
  *[_type == "programa" && language == "pt" && defined(slug.current)].slug.current
`;

export async function getProgramaSlugs() {
  return sanityFetch<string[]>({ query: programaSlugsQuery, tags: ["programa"] });
}
