import { sanityFetch } from "@/sanity/lib/live";
import { groq } from "next-sanity";
import type { ProgramaCard } from "./programa";

export const homeQuery = groq`
  *[_type == "home" && language == $language][0]{
    language,
    hero {
      "videoUrl": video.asset->url,
      titleStart,
      titleHighlight,
      subtitle,
      ctaPrimary,
      ctaSecondary,
      metrics
    },
    parceiros {
      title,
      titleHighlight,
      groups[]{
        _key,
        label,
        logos[]{
          _key,
          alt,
          "imageUrl": image.asset->url
        }
      }
    },
    ecossistema {
      eyebrow,
      titleStart,
      titleHighlight,
      p1,
      p2,
      ctaLabel,
      ctaHref
    },
    pilares {
      eyebrow,
      titleStart,
      titleHighlight,
      desc,
      pillars[]{ _key, label, subtitle, metric, metricLabel, desc, tags, ctaLabel }
    },
    timeline {
      marcoLabel,
      imageAlt,
      events[]{ _key, year, title, desc, metrics[]{ _key, value, label } }
    },
    programas {
      eyebrow,
      titleStart,
      titleHighlight,
      desc,
      verTodosLabel,
      destaques[]->{
        _id,
        "slug": slug.current,
        name,
        desc,
        publicoKey,
        statusKey,
        "imageUrl": image.asset->url
      }
    },
    chamadas {
      eyebrow,
      titleStart,
      titleHighlight,
      desc,
      "items": *[_type == "programa" && language == $language && statusKey in ["aberta", "em-breve"]] | order(
        select(statusKey == "aberta" => 0, 1) asc,
        deadline asc
      ){
        _id,
        "slug": slug.current,
        name,
        desc,
        publicoKey,
        statusKey,
        deadline,
        "imageUrl": image.asset->url
      }
    },
    resultados {
      eyebrow,
      titleStart,
      titleHighlight,
      ctaInstalacaoLabel,
      yearRange,
      ctaPartnersStart,
      ctaPartnersHighlight,
      items[]{
        _key,
        company,
        sector,
        quote,
        person,
        role,
        "logoUrl": logo.asset->url,
        "photoUrl": photo.asset->url,
        metrics[]{ _key, label, value }
      },
      parceiros[]{
        _key,
        alt,
        "imageUrl": image.asset->url
      }
    },
    faq {
      eyebrow,
      titleStart,
      titleHighlight,
      desc,
      items[]{ _key, q, a }
    }
  }
`;

export type HomeCta = {
  label?: string;
  href?: string;
};

export type HomeMetric = {
  value?: string;
  label?: string;
};

export type HomeHero = {
  videoUrl?: string;
  titleStart?: string;
  titleHighlight?: string;
  subtitle?: string;
  ctaPrimary?: HomeCta;
  ctaSecondary?: HomeCta;
  metrics?: HomeMetric[];
};

export type HomeParceiroLogo = {
  _key?: string;
  alt?: string;
  imageUrl?: string;
};

export type HomeParceiroGroup = {
  _key?: string;
  label?: string;
  logos?: HomeParceiroLogo[];
};

export type HomeParceiros = {
  title?: string;
  titleHighlight?: string;
  groups?: HomeParceiroGroup[];
};

export type HomePilarItem = {
  _key?: string;
  label?: string;
  subtitle?: string;
  metric?: string;
  metricLabel?: string;
  desc?: string;
  tags?: string[];
  ctaLabel?: string;
};

export type HomePilares = {
  eyebrow?: string;
  titleStart?: string;
  titleHighlight?: string;
  desc?: string;
  pillars?: HomePilarItem[];
};

export type HomeTimelineMetric = {
  _key?: string;
  value?: string;
  label?: string;
};

export type HomeTimelineEvent = {
  _key?: string;
  year?: string;
  title?: string;
  desc?: string;
  metrics?: HomeTimelineMetric[];
};

export type HomeTimeline = {
  marcoLabel?: string;
  imageAlt?: string;
  events?: HomeTimelineEvent[];
};

export type HomeEcossistema = {
  eyebrow?: string;
  titleStart?: string;
  titleHighlight?: string;
  p1?: string;
  p2?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export type HomeProgramas = {
  eyebrow?: string;
  titleStart?: string;
  titleHighlight?: string;
  desc?: string;
  verTodosLabel?: string;
  destaques?: ProgramaCard[];
};

export type HomeChamadas = {
  eyebrow?: string;
  titleStart?: string;
  titleHighlight?: string;
  desc?: string;
  items?: ProgramaCard[];
};

export type HomeResultadosCaseMetric = {
  _key?: string;
  label?: string;
  value?: string;
};

export type HomeResultadosCase = {
  _key?: string;
  company?: string;
  sector?: string;
  quote?: string;
  person?: string;
  role?: string;
  logoUrl?: string;
  photoUrl?: string;
  metrics?: HomeResultadosCaseMetric[];
};

export type HomeResultadosParceiro = {
  _key?: string;
  alt?: string;
  imageUrl?: string;
};

export type HomeResultados = {
  eyebrow?: string;
  titleStart?: string;
  titleHighlight?: string;
  ctaInstalacaoLabel?: string;
  yearRange?: string;
  ctaPartnersStart?: string;
  ctaPartnersHighlight?: string;
  items?: HomeResultadosCase[];
  parceiros?: HomeResultadosParceiro[];
};

export type HomeFaqItem = {
  _key?: string;
  q?: string;
  a?: string;
};

export type HomeFaq = {
  eyebrow?: string;
  titleStart?: string;
  titleHighlight?: string;
  desc?: string;
  items?: HomeFaqItem[];
};

export type HomeData = {
  language?: string;
  hero?: HomeHero;
  parceiros?: HomeParceiros;
  ecossistema?: HomeEcossistema;
  pilares?: HomePilares;
  timeline?: HomeTimeline;
  programas?: HomeProgramas;
  chamadas?: HomeChamadas;
  resultados?: HomeResultados;
  faq?: HomeFaq;
} | null;

export async function getHome({ locale }: { locale: string }) {
  return sanityFetch<HomeData>({
    query: homeQuery,
    params: { language: locale },
    tags: ["home"],
  });
}
