import { sanityFetch } from "@/sanity/lib/live";
import { groq } from "next-sanity";

export const ctaBannerQuery = groq`
  *[_type == "ctaBanner" && language == $language][0]{
    eyebrow,
    titleStart,
    titleHighlight,
    titleEnd,
    desc,
    ctaPrimary,
    ctaSecondary
  }
`;

// ── Tipos ────────────────────────────────────────────────────────────────────

export type CtaBannerCta = {
  label?: string;
  href?: string;
};

/** Dados completos do CTA Banner (documento global). */
export type CtaBannerData = {
  eyebrow?: string;
  titleStart?: string;
  titleHighlight?: string;
  titleEnd?: string;
  desc?: string;
  ctaPrimary?: CtaBannerCta;
  ctaSecondary?: CtaBannerCta;
} | null;

/**
 * Override de título por página.
 * Quando presente, substitui titleStart/titleHighlight/titleEnd do documento global.
 */
export type CtaBannerTitleOverride = {
  titleStart?: string;
  titleHighlight?: string;
  titleEnd?: string;
};

// ── Fetch ─────────────────────────────────────────────────────────────────────

export async function getCtaBanner({ locale }: { locale: string }) {
  return sanityFetch<CtaBannerData>({
    query: ctaBannerQuery,
    params: { language: locale },
    tags: ["ctaBanner"],
  });
}
