'use client'

import Link from 'next/link'
import { Section } from '@/components/Section'
import CadastroCTA from '@/components/CadastroCTA'
import type { BancoParaCandidatos } from '@/sanity/queries/bancoDeTalentos'

type Props = { paraCandidatos?: BancoParaCandidatos }

export default function ParaCandidatosSection({ paraCandidatos }: Props) {
  if (!paraCandidatos) return null

  return (
    <Section id="para-candidatos" padding="md" className="scroll-mt-24">
      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 items-start">
        <div className="lg:sticky lg:top-32">
          {paraCandidatos.eyebrow && (
            <div className="mb-5 inline-flex items-center gap-2">
              <span className="block h-px w-8 bg-brand-orange" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-orange">
                {paraCandidatos.eyebrow}
              </span>
            </div>
          )}
          {(paraCandidatos.titleStart || paraCandidatos.titleHighlight || paraCandidatos.titleEnd) && (
            <h2 className="font-extrabold text-white text-display-xl leading-[1.2] tracking-tight">
              {paraCandidatos.titleStart && <>{paraCandidatos.titleStart}{' '}</>}
              {paraCandidatos.titleHighlight && (
                <span className="italic font-medium text-brand-orange">{paraCandidatos.titleHighlight}</span>
              )}
              {paraCandidatos.titleEnd && <>{' '}{paraCandidatos.titleEnd}</>}
            </h2>
          )}
          {paraCandidatos.desc && (
            <p className="mt-6 text-white/65 text-base leading-relaxed">{paraCandidatos.desc}</p>
          )}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            {paraCandidatos.ctaLabelCurriculo && (
              <CadastroCTA tipo="candidato" label={paraCandidatos.ctaLabelCurriculo} />
            )}
            {paraCandidatos.ctaLabelVagas && (
              <Link
                href="/banco-de-talentos/vagas"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 backdrop-blur-sm text-white text-sm font-semibold px-6 py-4 hover:bg-white/10 hover:border-white/50 transition-all duration-300"
              >
                {paraCandidatos.ctaLabelVagas}
                {paraCandidatos.ctaVagasTag && (
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-brand-orange bg-brand-orange/10 border border-brand-orange/30 rounded-full px-2 py-0.5">
                    {paraCandidatos.ctaVagasTag}
                  </span>
                )}
              </Link>
            )}
          </div>
        </div>

        {paraCandidatos.passos && paraCandidatos.passos.length > 0 && (
          <ol className="divide-y divide-white/10">
            {paraCandidatos.passos.map((p, i) => (
              <li key={p._key ?? i} className="grid grid-cols-[auto_1fr] gap-8 py-8 first:pt-0 last:pb-0">
                <div className="text-brand-orange font-extrabold text-3xl tracking-tight tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div>
                  {p.titulo && <h3 className="font-bold text-white text-xl mb-2 leading-tight">{p.titulo}</h3>}
                  {p.desc && <p className="text-white/65 leading-relaxed">{p.desc}</p>}
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>
    </Section>
  )
}
