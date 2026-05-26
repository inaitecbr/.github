"use client";

import { Container } from "@/components/Section";
import { Check, Star } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ContatoSection() {
  const t = useTranslations("Home");

  return (
    <section className="relative py-16 overflow-hidden">
      {/* Fundo da seção */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 80% 80% at 60% 50%, #0F3441 0%, transparent 70%)",
          }}
        />
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-brand-teal/[0.06] blur-[140px]" />
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-brand-orange/[0.07] blur-[140px]" />
      </div>

      <Container className="relative">
        <div className="grid lg:grid-cols-[42%_58%] gap-8 min-h-[700px]">
          {/* Esquerda — foto + quote */}
          <div className="relative rounded-2xl overflow-hidden bg-white/[0.04] border border-white/10 lg:bg-transparent lg:border-0 lg:min-h-0">
            <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:absolute lg:inset-0">
              <img
                src="/form-image.jpg"
                alt={t("contato.imageAlt")}
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/30 to-transparent" />
            </div>

            <div className="p-6 flex flex-col gap-4 lg:absolute lg:bottom-0 lg:left-0 lg:right-0 lg:m-8 lg:p-6 lg:rounded-2xl lg:bg-white/10 lg:backdrop-blur-md lg:border lg:border-white/15">
              <p className="text-white text-[13px] leading-relaxed">
                &ldquo;{t("contato.quote.text")}&rdquo;
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white font-bold text-sm">{t("contato.quote.author")}</div>
                  <div className="text-white/55 text-[11px] mt-0.5">{t("contato.quote.role")}</div>
                </div>
                <div className="flex items-center gap-0.5">
                  {Array(5)
                    .fill(null)
                    .map((_, i) => (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5 text-brand-orange"
                        fill="currentColor"
                        stroke="none"
                      />
                    ))}
                </div>
              </div>
            </div>
          </div>

          {/* Direita — formulário */}
          <div className="px-0 py-6 sm:p-8 lg:p-14 flex flex-col">
            <div className="mb-8">
              <div className="mb-4 inline-flex items-center gap-2">
                <span className="block h-px w-8 bg-brand-orange" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-orange">
                  {t("contato.eyebrow")}
                </span>
              </div>
              <h2 className="font-extrabold text-white text-display-xl leading-[1.2] tracking-tight">
                {t("contato.titleStart")}{" "}
                <span className="text-brand-orange italic font-medium">
                  {t("contato.titleHighlight")}
                </span>
                ?
              </h2>
              <p className="mt-3 text-white/55 text-sm leading-relaxed">
                {t("contato.descPrefix")}{" "}
                <a
                  href="mailto:contato@inaitec.com.br"
                  className="text-brand-orange hover:underline"
                >
                  contato@inaitec.com.br
                </a>
              </p>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4 flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-2">
                    {t("contato.labels.nome")}
                  </label>
                  <input
                    type="text"
                    placeholder={t("contato.placeholders.nome")}
                    className="w-full rounded-xl bg-white/[0.06] border border-white/10 px-4 py-3 text-white placeholder:text-white/25 text-sm focus:outline-none focus:border-brand-orange/60 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-2">
                    {t("contato.labels.sobrenome")}
                  </label>
                  <input
                    type="text"
                    placeholder={t("contato.placeholders.sobrenome")}
                    className="w-full rounded-xl bg-white/[0.06] border border-white/10 px-4 py-3 text-white placeholder:text-white/25 text-sm focus:outline-none focus:border-brand-orange/60 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-2">
                    {t("contato.labels.email")}
                  </label>
                  <input
                    type="email"
                    placeholder={t("contato.placeholders.email")}
                    className="w-full rounded-xl bg-white/[0.06] border border-white/10 px-4 py-3 text-white placeholder:text-white/25 text-sm focus:outline-none focus:border-brand-orange/60 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-2">
                    {t("contato.labels.telefone")}
                  </label>
                  <input
                    type="tel"
                    placeholder={t("contato.placeholders.telefone")}
                    className="w-full rounded-xl bg-white/[0.06] border border-white/10 px-4 py-3 text-white placeholder:text-white/25 text-sm focus:outline-none focus:border-brand-orange/60 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-2">
                  {t("contato.labels.mensagem")}
                </label>
                <textarea
                  rows={3}
                  placeholder={t("contato.placeholders.mensagem")}
                  className="w-full rounded-xl bg-white/[0.06] border border-white/10 px-4 py-3 text-white placeholder:text-white/25 text-sm focus:outline-none focus:border-brand-orange/60 transition-all resize-none"
                />
              </div>

              <div className="mt-4">
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-3">
                  {t("contato.labels.perfil")}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(
                    [
                      "startup",
                      "grande",
                      "universidade",
                      "investidor",
                      "aceleracao",
                      "outro",
                    ] as const
                  ).map((key) => (
                    <label key={key} className="flex items-center gap-2.5 cursor-pointer group">
                      <div className="relative shrink-0 w-[18px] h-[18px]">
                        <input
                          type="checkbox"
                          className="peer appearance-none w-full h-full rounded-[4px] bg-white/[0.06] border border-white/10 checked:bg-brand-orange checked:border-brand-orange cursor-pointer transition-all"
                        />
                        <Check
                          strokeWidth={2.5}
                          className="pointer-events-none absolute inset-0 w-full h-full text-white opacity-0 peer-checked:opacity-100 transition-opacity"
                        />
                      </div>
                      <span className="text-[12px] text-white/55 group-hover:text-white/80 transition-colors">
                        {t(`contato.perfis.${key}`)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="mt-6 w-full rounded-full bg-brand-orange text-white text-sm font-bold py-4 hover:shadow-xl hover:shadow-brand-orange/40 transition-all duration-300 shadow-lg shadow-brand-orange/25"
              >
                {t("contato.submit")}
              </button>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}
