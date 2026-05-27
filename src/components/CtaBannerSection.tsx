"use client";

import { Section } from "@/components/Section";
import type { CtaBannerData, CtaBannerTitleOverride } from "@/sanity/queries/ctaBanner";
import Link from "next/link";

type Props = {
  /** Dados globais do documento ctaBanner (eyebrow, desc, botões). */
  data?: CtaBannerData;
  /**
   * Override de título por página.
   * Se fornecido, substitui titleStart/titleHighlight/titleEnd do documento global.
   */
  titleOverride?: CtaBannerTitleOverride;
};

export default function CtaBannerSection({ data, titleOverride }: Props) {
  if (!data) return null;

  // Title: usa override se fornecido, senão usa o padrão do documento global
  const titleStart = titleOverride?.titleStart ?? data.titleStart;
  const titleHighlight = titleOverride?.titleHighlight ?? data.titleHighlight;
  const titleEnd = titleOverride?.titleEnd ?? data.titleEnd;

  return (
    <Section padding="md">
      <div
        className="relative rounded-2xl overflow-hidden px-8 py-10 sm:px-12 sm:py-12 md:px-16 md:py-16 flex flex-col md:flex-row items-center justify-between gap-8 ring-1 ring-white/15 shadow-2xl shadow-black/30"
        style={{
          background: "linear-gradient(135deg, #144556 0%, #0F3441 45%, #0D2E38 100%)",
        }}
      >
        {/* Glow laranja principal (bottom-left) */}
        <div className="pointer-events-none absolute -bottom-40 -left-32 w-[500px] h-[500px] rounded-full bg-brand-orange/25 blur-[120px]" />

        {/* Glow secundário teal (top-right) */}
        <div className="pointer-events-none absolute -top-40 -right-32 w-[450px] h-[450px] rounded-full bg-brand-teal/15 blur-[120px]" />

        {/* Highlight superior — dá profundidade ao card */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

        {/* Texto */}
        <div className="relative max-w-xl">
          {data.eyebrow && (
            <div className="mb-4 inline-flex items-center gap-2">
              <span className="block h-px w-8 bg-brand-orange" />
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-orange">
                {data.eyebrow}
              </span>
            </div>
          )}
          <h2 className="font-extrabold text-white text-[1.85rem] md:text-[2.4rem] leading-[1.2] tracking-tight">
            {titleStart && <>{titleStart} </>}
            {titleHighlight && (
              <span className="text-brand-orange italic font-medium">{titleHighlight}</span>
            )}
            {titleEnd && <> {titleEnd}</>}
          </h2>
          {data.desc && (
            <p className="mt-4 text-white/65 text-sm leading-relaxed">{data.desc}</p>
          )}
        </div>

        {/* Botões */}
        {(data.ctaPrimary || data.ctaSecondary) && (
          <div className="relative w-full flex flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:shrink-0">
            {data.ctaPrimary?.label && data.ctaPrimary?.href && (
              <Link
                href={data.ctaPrimary.href}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-orange text-white text-sm font-bold px-7 py-4 hover:shadow-xl hover:shadow-brand-orange/40 transition-all duration-300 shadow-lg shadow-brand-orange/25"
              >
                {data.ctaPrimary.label}
              </Link>
            )}
            {data.ctaSecondary?.label && data.ctaSecondary?.href && (
              <Link
                href={data.ctaSecondary.href}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/[0.06] backdrop-blur-sm text-white text-sm font-semibold px-7 py-4 hover:bg-white/15 hover:border-white/40 transition-all"
              >
                {data.ctaSecondary.label}
              </Link>
            )}
          </div>
        )}
      </div>
    </Section>
  );
}
