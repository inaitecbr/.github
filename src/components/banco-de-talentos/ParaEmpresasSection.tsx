'use client'

import { Check } from 'lucide-react'
import { Section } from '@/components/Section'
import CadastroCTA from '@/components/CadastroCTA'
import type { BancoParaEmpresas } from '@/sanity/queries/bancoDeTalentos'

type Props = { paraEmpresas?: BancoParaEmpresas }

export default function ParaEmpresasSection({ paraEmpresas }: Props) {
  if (!paraEmpresas) return null

  return (
    <Section id="para-empresas" theme="light" padding="md" className="scroll-mt-24">
      <div className="max-w-2xl mb-16">
        {paraEmpresas.eyebrow && (
          <div className="mb-5 inline-flex items-center gap-2">
            <span className="block h-px w-8 bg-brand-orange" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-orange">
              {paraEmpresas.eyebrow}
            </span>
          </div>
        )}
        {(paraEmpresas.titleStart || paraEmpresas.titleHighlight) && (
          <h2 className="font-extrabold text-display-xl leading-[1.2] tracking-tight">
            {paraEmpresas.titleStart && <>{paraEmpresas.titleStart}{' '}</>}
            {paraEmpresas.titleHighlight && (
              <span className="italic font-medium text-brand-orange">{paraEmpresas.titleHighlight}</span>
            )}
          </h2>
        )}
        {paraEmpresas.desc && (
          <p className="mt-6 text-brand-navy/70 text-base leading-relaxed">{paraEmpresas.desc}</p>
        )}
        {paraEmpresas.ctaLabel && (
          <CadastroCTA tipo="empresa" label={paraEmpresas.ctaLabel} className="mt-8" />
        )}
      </div>

      {paraEmpresas.passos && paraEmpresas.passos.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
          {paraEmpresas.passos.map((p, i) => (
            <div key={p._key ?? i} className="rounded-2xl bg-white border border-border p-8">
              <div className="text-brand-orange font-extrabold text-3xl tracking-tight tabular-nums mb-5">
                {String(i + 1).padStart(2, '0')}
              </div>
              {p.titulo && <h3 className="font-bold text-lg mb-2 leading-tight">{p.titulo}</h3>}
              {p.desc && <p className="text-sm text-brand-navy/65 leading-relaxed">{p.desc}</p>}
            </div>
          ))}
        </div>
      )}

      {paraEmpresas.vantagens && paraEmpresas.vantagens.length > 0 && (
        <div className="grid lg:grid-cols-3 gap-4">
          {paraEmpresas.vantagens.map((v, i) => (
            <div key={v._key ?? i} className="rounded-2xl bg-white border border-border p-8">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-brand-orange/10 text-brand-orange mb-5">
                <Check strokeWidth={2} className="w-6 h-6" />
              </div>
              {v.titulo && <h3 className="font-bold text-lg mb-2 leading-tight">{v.titulo}</h3>}
              {v.desc && <p className="text-sm text-brand-navy/65 leading-relaxed">{v.desc}</p>}
            </div>
          ))}
        </div>
      )}
    </Section>
  )
}
