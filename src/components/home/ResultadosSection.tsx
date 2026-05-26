"use client";

import { Section } from "@/components/Section";
import type { HomeResultados } from "@/sanity/queries/home";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
  resultados?: HomeResultados;
};

export default function ResultadosSection({ resultados }: Props) {
  const t = useTranslations("ResultadosSection");
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(true);

  const cases = resultados?.items ?? [];

  const goTo = (resolver: (current: number) => number) => {
    setVisible(false);
    setTimeout(() => {
      setActive((i) => resolver(i));
      setVisible(true);
    }, 400);
  };

  useEffect(() => {
    if (cases.length < 2) return;
    const interval = setInterval(() => {
      goTo((i) => (i + 1) % cases.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [cases.length]);

  if (!resultados || cases.length === 0) return null;

  const c = cases[active]!;

  return (
    <Section padding="md" className="overflow-hidden bg-[#F5F4EF]" containerClassName="relative">
      {/* Header */}
      <div className="flex flex-col gap-6 mb-10 md:flex-row md:items-end md:justify-between md:gap-8">
        <div className="max-w-2xl">
          <div className="mb-5 inline-flex items-center gap-2">
            <span className="block h-px w-8 bg-brand-orange" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-orange">
              {resultados.eyebrow}
            </span>
          </div>
          <h2 className="font-extrabold text-brand-navy text-display-2xl leading-[1.2] tracking-tight">
            {resultados.titleStart}{" "}
            <span className="text-brand-orange italic font-medium">
              {resultados.titleHighlight}
            </span>
          </h2>
        </div>
        <Link
          href="/traga-sua-empresa"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-orange text-white text-sm font-semibold px-7 py-4 hover:shadow-xl hover:shadow-brand-orange/40 transition-all duration-300 shadow-lg shadow-brand-orange/25 shrink-0"
        >
          {resultados.ctaInstalacaoLabel}
        </Link>
      </div>

      {/* Mobile: 1 card consolidado por empresa em scroll horizontal */}
      <div className="md:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {cases.map((caseItem) => (
          <article
            key={caseItem._key ?? caseItem.company}
            className="snap-start shrink-0 w-[88%] sm:w-[420px] rounded-2xl bg-brand-navy p-7 flex flex-col gap-6"
          >
            <div className="flex items-center gap-4">
              <img
                src={caseItem.photoUrl ?? ""}
                alt={caseItem.person ?? ""}
                className="w-14 h-14 rounded-full object-cover object-top shrink-0"
              />
              <div className="min-w-0">
                <div className="text-white font-bold text-base leading-tight truncate">
                  {caseItem.person}
                </div>
                <div className="text-white/55 text-sm mt-0.5 truncate">{caseItem.role}</div>
              </div>
            </div>

            <img
              src={caseItem.logoUrl ?? ""}
              alt={caseItem.company ?? ""}
              className="h-7 w-auto object-contain object-left brightness-0 invert opacity-90"
            />

            <p className="text-white/80 text-[14px] leading-relaxed">
              &ldquo;{caseItem.quote}&rdquo;
            </p>

            <div className="divide-y divide-white/10 border-t border-white/10 -mx-1">
              {caseItem.metrics?.map((m) => (
                <div key={m._key ?? m.label} className="px-1 py-4">
                  <div className="text-white font-bold text-[14px] leading-snug">{m.label}</div>
                  <div className="text-white/50 text-[12px] mt-0.5">{resultados.yearRange}</div>
                  <div className="text-white text-[1.75rem] font-extrabold leading-none tracking-tight mt-3 whitespace-nowrap">
                    {m.value}
                  </div>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>

      {/* Desktop (md+): grid de 4 colunas — exibe apenas o case ativo */}
      <div
        className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch transition-opacity duration-400"
        style={{ opacity: visible ? 1 : 0 }}
      >
        {/* Card foto */}
        <div className="relative rounded-2xl overflow-hidden bg-white min-h-[380px]">
          <img
            src={c.photoUrl ?? ""}
            alt={c.person ?? ""}
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
        </div>

        {/* Card quote escuro */}
        <div className="rounded-2xl bg-brand-navy p-7 flex flex-col gap-5 min-h-[380px]">
          <img
            src={c.logoUrl ?? ""}
            alt={c.company ?? ""}
            className="h-7 w-auto object-contain object-left brightness-0 invert opacity-90"
          />
          <p className="text-white/80 text-[14px] leading-relaxed flex-1">
            &ldquo;{c.quote}&rdquo;
          </p>
          <div className="pt-5 border-t border-white/10">
            <div className="text-white font-bold text-sm">{c.person}</div>
            <div className="text-white/50 text-[12px] mt-0.5">{c.role}</div>
          </div>
        </div>

        {/* Cards de métricas */}
        {c.metrics?.map((m) => (
          <div
            key={m._key ?? m.label}
            className="rounded-2xl bg-white p-7 flex flex-col justify-between min-h-[380px]"
          >
            <div>
              <div className="text-brand-navy font-bold text-[15px] leading-snug">{m.label}</div>
              <div className="text-brand-navy/50 text-[13px] mt-1">{resultados.yearRange}</div>
            </div>
            <div className="text-brand-orange text-[3.5rem] font-extrabold leading-none tracking-tight">
              {m.value}
            </div>
          </div>
        ))}
      </div>

      {/* Indicadores + navegação — só desktop */}
      <div className="hidden md:flex items-center justify-between mt-5">
        <div className="flex gap-2">
          {cases.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(() => i)}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === active ? "w-8 bg-brand-orange" : "w-4 bg-brand-navy/20 hover:bg-brand-navy/40"
              }`}
              aria-label={cases[i]?.company ?? ""}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => goTo((i) => (i - 1 + cases.length) % cases.length)}
            aria-label={t("prevAria")}
            className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-brand-dark hover:border-brand-orange hover:text-brand-orange hover:bg-brand-orange/5 transition-all"
          >
            <ChevronLeft strokeWidth={2.5} className="w-4 h-4" />
          </button>
          <button
            onClick={() => goTo((i) => (i + 1) % cases.length)}
            aria-label={t("nextAria")}
            className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-brand-dark hover:border-brand-orange hover:text-brand-orange hover:bg-brand-orange/5 transition-all"
          >
            <ChevronRight strokeWidth={2.5} className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Logos parceiros */}
      <div className="mt-12 flex flex-col gap-6 md:flex-row md:items-center md:gap-0 md:overflow-hidden">
        <div className="md:shrink-0 md:w-[38%] md:pr-8">
          <p className="text-brand-navy font-extrabold text-[1.4rem] md:text-[1.6rem] leading-tight tracking-tight">
            {resultados.ctaPartnersStart}{" "}
            <span className="text-brand-orange italic font-medium">
              {resultados.ctaPartnersHighlight}
            </span>
          </p>
        </div>

        <div
          className="overflow-hidden md:flex-1"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          }}
        >
          <div className="flex animate-marquee gap-10 items-center w-max">
            {[...(resultados.parceiros ?? []), ...(resultados.parceiros ?? [])].map((l, i) => (
              <img
                key={i}
                src={l.imageUrl ?? ""}
                alt={l.alt ?? ""}
                className="h-6 w-auto object-contain grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all shrink-0"
              />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
