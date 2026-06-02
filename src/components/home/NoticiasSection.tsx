"use client";

import { Section } from "@/components/Section";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { urlFor } from "@/sanity/image";
import { formatPostDate } from "@/lib/formatPostDate";
import type { PostListItem } from "@/sanity/queries/posts";

export default function NoticiasSection({ posts = [] }: { posts?: PostListItem[] }) {
  const t = useTranslations("Home");

  if (!posts.length) return null;

  const [featured, ...rest] = posts.slice(0, 5);

  return (
    <Section padding="md" className="overflow-hidden" containerClassName="relative">
      <div className="flex flex-wrap items-end justify-between gap-8 mb-14">
        <div>
          <div className="mb-5 inline-flex items-center gap-2">
            <span className="block h-px w-8 bg-brand-orange" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-orange">
              {t("noticias.eyebrow")}
            </span>
          </div>
          <h2 className="font-extrabold text-brand-navy text-display-2xl leading-[1.2] tracking-tight">
            {t("noticias.titleStart")}{" "}
            <span className="text-brand-orange italic font-medium">
              {t("noticias.titleHighlight")}
            </span>
          </h2>
        </div>
        <Link
          href="/conteudo"
          className="text-sm font-semibold text-brand-navy/70 hover:text-brand-orange transition-colors"
        >
          {t("noticias.verTodas")}
        </Link>
      </div>

      <div className="grid lg:grid-cols-2 gap-4 items-stretch">
        {/* Card destaque — grande, imagem de fundo */}
        <Link
          href={`/conteudo/${featured.slug}`}
          className="group relative rounded-2xl overflow-hidden min-h-[520px] flex flex-col justify-end"
        >
          {featured.mainImage && (
            <img
              src={urlFor(featured.mainImage).width(900).height(1040).fit("crop").url()}
              alt={featured.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
          <div className="relative p-8 flex flex-col gap-4">
            {featured.category && (
              <div className="inline-flex self-start items-center rounded-full bg-brand-orange px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white">
                {featured.category}
              </div>
            )}
            <h3 className="text-white text-2xl md:text-3xl font-extrabold leading-tight max-w-md group-hover:text-brand-orange transition-colors">
              {featured.title}
            </h3>
            <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-widest text-white/50">
              <span>{formatPostDate(featured.publishedAt)}</span>
              {featured.author && (
                <>
                  <span className="block w-1 h-1 rounded-full bg-white/30" />
                  <span>{featured.author}</span>
                </>
              )}
            </div>
          </div>
        </Link>

        {/* Grid 2×2 (lg) / scroll horizontal (mobile) */}
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden lg:grid lg:grid-cols-2 lg:overflow-visible lg:snap-none lg:pb-0">
          {rest.map((n) => (
            <Link
              key={n.slug}
              href={`/conteudo/${n.slug}`}
              className="group relative snap-start flex-none w-[260px] sm:w-[300px] lg:w-auto rounded-2xl bg-white overflow-hidden hover:shadow-lg hover:shadow-black/[0.04] transition-all flex flex-col"
            >
              <div className="relative h-36 overflow-hidden shrink-0">
                {n.mainImage && (
                  <img
                    src={urlFor(n.mainImage).width(600).height(288).fit("crop").url()}
                    alt={n.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
                {n.category && (
                  <div className="absolute top-3 left-3 inline-flex items-center rounded-full bg-brand-orange px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-white">
                    {n.category}
                  </div>
                )}
              </div>
              <div className="p-4 flex flex-col gap-2 flex-1">
                <h3 className="text-brand-navy text-sm font-extrabold leading-snug group-hover:text-brand-orange transition-colors flex-1">
                  {n.title}
                </h3>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-brand-navy/50">
                  {formatPostDate(n.publishedAt)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Section>
  );
}
