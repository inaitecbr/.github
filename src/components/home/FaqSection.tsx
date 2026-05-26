"use client";

import { Container } from "@/components/Section";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";

export default function FaqSection() {
  const t = useTranslations("Home");
  const [open, setOpen] = useState<number | null>(0);
  const faqs = t.raw("faq.items") as Array<{ q: string; a: string }>;

  return (
    <section className="relative py-16 overflow-hidden">
      {/* Ambiente de fundo */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 -translate-y-1/2 -right-40 w-[600px] h-[600px] rounded-full bg-[#004E69]/30 blur-[140px]" />
      </div>

      <Container className="relative">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-16 items-start">
          <div className="lg:sticky lg:top-24">
            <div className="mb-5 inline-flex items-center gap-2">
              <span className="block h-px w-8 bg-brand-orange" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-orange">
                {t("faq.eyebrow")}
              </span>
            </div>
            <h2 className="font-extrabold text-white text-[2.5rem] leading-[1.2] tracking-tight">
              {t("faq.titleStart")}{" "}
              <span className="text-brand-orange italic font-medium">
                {t("faq.titleHighlight")}
              </span>
            </h2>
            <p className="mt-4 text-white/60 text-sm leading-relaxed max-w-xs">{t("faq.desc")}</p>
            <Link
              href="/fale-conosco"
              className="mt-6 inline-flex items-center text-sm font-semibold text-brand-orange hover:text-[#FF9B26] transition-all"
            >
              {t("faq.cta")}
            </Link>
          </div>

          <div>
            {faqs.map((item, i) => {
              const isOpen = open === i;
              const isFirst = i === 0;
              const isLast = i === faqs.length - 1;
              return (
                <div
                  key={i}
                  className={[
                    "border-b border-white/[0.06] last:border-b-0 transition-all duration-300",
                    isOpen ? "bg-white/[0.02]" : "hover:bg-white/[0.015]",
                    isOpen && isFirst ? "rounded-t-2xl" : "",
                    isOpen && isLast ? "rounded-b-2xl" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 px-4 py-5 sm:px-7 sm:py-6 text-left group"
                  >
                    <span
                      className={`text-[16px] font-semibold transition-colors ${isOpen ? "text-white" : "text-white/85 group-hover:text-white"}`}
                    >
                      {item.q}
                    </span>
                    <span
                      className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? "bg-brand-orange text-white rotate-45 shadow-lg shadow-brand-orange/30" : "bg-white/[0.08] text-white/70 group-hover:bg-white/15 group-hover:text-white border border-white/10"}`}
                    >
                      <Plus strokeWidth={2.5} className="w-3.5 h-3.5" />
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-5 sm:px-7 sm:pb-6 -mt-2">
                      <p className="text-sm text-white/65 leading-relaxed max-w-2xl">{item.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
