'use client'

import { Section } from '@/components/Section'
import type { BancoOQueE } from '@/sanity/queries/bancoDeTalentos'

type Props = { oQueE?: BancoOQueE }

export default function OQueESection({ oQueE }: Props) {
  if (!oQueE) return null

  return (
    <Section id="o-que-e" theme="light" padding="md" className="scroll-mt-24">
      <div className="grid lg:grid-cols-[1fr_1fr] gap-16 items-start">
        <div>
          {oQueE.eyebrow && (
            <div className="mb-5 inline-flex items-center gap-2">
              <span className="block h-px w-8 bg-brand-orange" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-orange">
                {oQueE.eyebrow}
              </span>
            </div>
          )}
          {(oQueE.titleStart || oQueE.titleHighlight || oQueE.titleEnd) && (
            <h2 className="font-extrabold text-display-xl leading-[1.2] tracking-tight">
              {oQueE.titleStart && <>{oQueE.titleStart}{' '}</>}
              {oQueE.titleHighlight && (
                <span className="italic font-medium text-brand-orange">{oQueE.titleHighlight}</span>
              )}
              {oQueE.titleEnd && <>{' '}{oQueE.titleEnd}</>}
            </h2>
          )}
        </div>

        <div className="space-y-6 text-brand-navy/75 text-base leading-relaxed">
          {oQueE.paragraphs?.map((p, i) => <p key={i}>{p}</p>)}

          {oQueE.perfisBuscados && oQueE.perfisBuscados.length > 0 && (
            <div className="mt-10 pt-8 border-t border-border">
              {oQueE.perfisBuscadosLabel && (
                <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-orange mb-4">
                  {oQueE.perfisBuscadosLabel}
                </div>
              )}
              <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
                {oQueE.perfisBuscados.map((p, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-brand-navy/80">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-orange shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </Section>
  )
}
