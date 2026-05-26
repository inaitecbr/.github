"use client";

import { Section } from "@/components/Section";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function CtaBannerSection() {
  const t = useTranslations("Home");

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
          <div className="mb-4 inline-flex items-center gap-2">
            <span className="block h-px w-8 bg-brand-orange" />
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-orange">
              {t("ctaBanner.eyebrow")}
            </span>
          </div>
          <h2 className="font-extrabold text-white text-[1.85rem] md:text-[2.4rem] leading-[1.2] tracking-tight">
            {t("ctaBanner.titleStart")}{" "}
            <span className="text-brand-orange italic font-medium">
              {t("ctaBanner.titleHighlight")}
            </span>{" "}
            {t("ctaBanner.titleEnd")}
          </h2>
          <p className="mt-4 text-white/65 text-sm leading-relaxed">{t("ctaBanner.desc")}</p>
        </div>

        {/* Botões */}
        <div className="relative w-full flex flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:shrink-0">
          <Link
            href="/fale-conosco"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-orange text-white text-sm font-bold px-7 py-4 hover:shadow-xl hover:shadow-brand-orange/40 transition-all duration-300 shadow-lg shadow-brand-orange/25"
          >
            {t("ctaBanner.ctaPrimary")}
          </Link>
          <Link
            href="/programas"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/[0.06] backdrop-blur-sm text-white text-sm font-semibold px-7 py-4 hover:bg-white/15 hover:border-white/40 transition-all"
          >
            {t("ctaBanner.ctaSecondary")}
          </Link>
        </div>
      </div>
    </Section>
  );
}
