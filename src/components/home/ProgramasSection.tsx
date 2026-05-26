"use client";

import { Section } from "@/components/Section";
import type { HomeProgramas } from "@/sanity/queries/home";
import type { PublicoKey } from "@/sanity/queries/programa";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

type Props = {
  programas?: HomeProgramas;
};

export default function ProgramasSection({ programas }: Props) {
  const t = useTranslations("Programa");
  const destaques = programas?.destaques ?? [];

  if (!programas || destaques.length === 0) return null;

  return (
    <Section theme="light" padding="md" className="overflow-hidden" containerClassName="relative">
      <div className="flex flex-wrap items-end justify-between gap-8 mb-14">
        <div className="max-w-2xl">
          {programas.eyebrow && (
            <div className="mb-5 inline-flex items-center gap-2">
              <span className="block h-px w-8 bg-brand-orange" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-orange">
                {programas.eyebrow}
              </span>
            </div>
          )}
          {(programas.titleStart || programas.titleHighlight) && (
            <h2 className="font-extrabold text-brand-navy text-display-2xl leading-[1.2] tracking-tight">
              {programas.titleStart}
              {programas.titleStart && programas.titleHighlight && " "}
              {programas.titleHighlight && (
                <span className="text-brand-orange italic font-medium">
                  {programas.titleHighlight}
                </span>
              )}
            </h2>
          )}
          {programas.desc && (
            <p className="mt-5 text-brand-navy/65 text-[15px] leading-relaxed max-w-xl">
              {programas.desc}
            </p>
          )}
        </div>
        {programas.verTodosLabel && (
          <Link
            href="/programas"
            className="text-sm font-semibold text-brand-navy/70 hover:text-brand-orange transition-colors"
          >
            {programas.verTodosLabel}
          </Link>
        )}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {destaques.map((p) => {
          const pilarLabel = p.publicoKey ? t(`publicoShort.${p.publicoKey as PublicoKey}`) : "";
          return (
            <Link
              key={p._id}
              href={p.slug ? `/programas/${p.slug}` : "/programas"}
              className="group rounded-2xl bg-white overflow-hidden flex flex-col hover:shadow-lg hover:shadow-black/[0.06] transition-all"
            >
              <div className="relative h-48 overflow-hidden bg-border">
                {p.imageUrl && (
                  <img
                    src={p.imageUrl}
                    alt={p.name ?? ""}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}
              </div>
              <div className="p-6 flex flex-col gap-3 flex-1">
                {pilarLabel && (
                  <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-orange">
                    {pilarLabel}
                  </div>
                )}
                {p.name && (
                  <h3 className="text-brand-navy text-xl font-extrabold leading-tight">{p.name}</h3>
                )}
                {p.desc && (
                  <p className="text-brand-navy/60 text-sm leading-relaxed flex-1">{p.desc}</p>
                )}
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <span className="text-[11px] font-semibold text-brand-orange uppercase tracking-widest">
                    {t("saibaMais")}
                  </span>
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#F5F4EF] group-hover:bg-brand-orange transition-all">
                    <ArrowRight
                      strokeWidth={2.5}
                      className="w-3 h-3 text-brand-navy group-hover:text-white transition-colors"
                    />
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </Section>
  );
}
