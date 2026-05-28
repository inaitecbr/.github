'use client'

import { Section } from '@/components/Section'
import CadastroCTA from '@/components/CadastroCTA'
import type { BancoCtaFinal } from '@/sanity/queries/bancoDeTalentos'

type Props = { ctaFinal?: BancoCtaFinal }

export default function CtaFinalSection({ ctaFinal }: Props) {
  if (!ctaFinal) return null

  return (
    <Section padding="md">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-brand-navy via-[#004E69] to-brand-navy p-8 sm:p-12 md:p-20">
        <div className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full bg-brand-orange/20 blur-[140px]" />
        <div className="absolute -bottom-32 -left-20 w-[400px] h-[400px] rounded-full bg-[#4A9EE0]/15 blur-[120px]" />

        <div className="relative grid lg:grid-cols-[1fr_auto] gap-10 items-center">
          <div>
            {(ctaFinal.titleStart || ctaFinal.titleHighlight || ctaFinal.titleEnd) && (
              <h2 className="font-extrabold text-white text-display-xl leading-[1.2] tracking-tight">
                {ctaFinal.titleStart && <>{ctaFinal.titleStart}{' '}</>}
                {ctaFinal.titleHighlight && (
                  <span className="italic font-medium text-brand-orange">{ctaFinal.titleHighlight}</span>
                )}
                {ctaFinal.titleEnd && <>{' '}{ctaFinal.titleEnd}</>}
              </h2>
            )}
            {ctaFinal.desc && (
              <p className="mt-6 text-white/65 text-base leading-relaxed">{ctaFinal.desc}</p>
            )}
          </div>
          <div className="w-full flex flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 sm:shrink-0">
            {ctaFinal.labelCandidato && (
              <CadastroCTA tipo="candidato" label={ctaFinal.labelCandidato} className="justify-center" />
            )}
            {ctaFinal.labelEmpresa && (
              <CadastroCTA tipo="empresa" label={ctaFinal.labelEmpresa} variant="outline" className="justify-center" />
            )}
          </div>
        </div>
      </div>
    </Section>
  )
}
