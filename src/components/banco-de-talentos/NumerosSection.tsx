'use client'

import { Section } from '@/components/Section'
import AnimatedCounter from '@/components/AnimatedCounter'
import type { BancoNumeros } from '@/sanity/queries/bancoDeTalentos'

type Props = { numeros?: BancoNumeros }

export default function NumerosSection({ numeros }: Props) {
  if (!numeros) return null

  return (
    <Section id="numeros" padding="md" className="scroll-mt-24">
      <div className="max-w-2xl mb-16">
        {numeros.eyebrow && (
          <div className="mb-5 inline-flex items-center gap-2">
            <span className="block h-px w-8 bg-brand-orange" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-orange">
              {numeros.eyebrow}
            </span>
          </div>
        )}
        {(numeros.titleStart || numeros.titleHighlight) && (
          <h2 className="font-extrabold text-white text-display-xl leading-[1.2] tracking-tight">
            {numeros.titleStart && <>{numeros.titleStart}{' '}</>}
            {numeros.titleHighlight && (
              <span className="italic font-medium text-brand-orange">{numeros.titleHighlight}</span>
            )}
          </h2>
        )}
        {numeros.desc && (
          <p className="mt-6 text-white/65 text-base leading-relaxed">{numeros.desc}</p>
        )}
      </div>

      {numeros.items && numeros.items.length > 0 && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {numeros.items.map((n, i) => (
            <div
              key={n._key ?? i}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 hover:bg-white/[0.06] transition-colors"
            >
              <div className="font-extrabold text-white text-display-2xl leading-none tracking-tight tabular-nums whitespace-nowrap">
                {n.valor && <AnimatedCounter value={n.valor} />}
              </div>
              {n.label && <div className="mt-4 text-sm text-white/60 leading-snug">{n.label}</div>}
            </div>
          ))}
        </div>
      )}
    </Section>
  )
}
