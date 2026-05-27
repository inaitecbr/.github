import Image from 'next/image'
import { Check } from 'lucide-react'
import { Section } from '@/components/Section'
import type { TragaBeneficios, TragaPerks } from '@/sanity/queries/tragaSuaEmpresa'

type Props = {
  perks?: TragaPerks
  beneficios?: TragaBeneficios
}

/**
 * Renderiza perks (logos) e benefícios numa mesma Section light —
 * ficam juntos exatamente como na página original.
 */
export default function PerksSection({ perks, beneficios }: Props) {
  if (!perks && !beneficios) return null

  return (
    <Section id="beneficios" theme="light" padding="md" className="scroll-mt-24">

      {/* Bloco perks */}
      {perks && (
        <>
          <div className="max-w-2xl mb-16">
            {perks.eyebrow && (
              <div className="mb-5 inline-flex items-center gap-2">
                <span className="block h-px w-8 bg-brand-orange" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-orange">
                  {perks.eyebrow}
                </span>
              </div>
            )}
            <h2 className="font-extrabold text-display-xl leading-[1.2] tracking-tight">
              {perks.titleStart && <>{perks.titleStart}{' '}</>}
              {perks.titleHighlight && (
                <span className="italic font-medium text-brand-orange">{perks.titleHighlight}</span>
              )}
              {perks.titleEnd && <>{' '}{perks.titleEnd}</>}
            </h2>
            {perks.desc && (
              <p className="mt-6 text-brand-navy/70 text-base leading-relaxed">{perks.desc}</p>
            )}
          </div>

          {perks.items && perks.items.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-24">
              {perks.items.map((p) => (
                <div
                  key={p._key ?? p.nome}
                  className="group rounded-2xl bg-white border border-border p-8 flex flex-col items-start gap-6 transition-shadow hover:shadow-md hover:shadow-brand-navy/10"
                >
                  <div className="relative h-8 w-32">
                    {p.logoUrl && (
                      <Image
                        src={p.logoUrl}
                        alt={p.nome ?? ''}
                        fill
                        className="object-contain object-left"
                        sizes="128px"
                      />
                    )}
                  </div>
                  <p className="text-sm text-brand-navy/65 leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Bloco benefícios */}
      {beneficios && (
        <>
          <div className="max-w-2xl mb-12">
            {beneficios.eyebrow && (
              <div className="mb-5 inline-flex items-center gap-2">
                <span className="block h-px w-8 bg-brand-orange" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-orange">
                  {beneficios.eyebrow}
                </span>
              </div>
            )}
            <h2 className="font-extrabold text-display-xl leading-[1.2] tracking-tight">
              {beneficios.titleStart && <>{beneficios.titleStart}{' '}</>}
              {beneficios.titleHighlight && (
                <span className="italic font-medium text-brand-orange">{beneficios.titleHighlight}</span>
              )}
              {beneficios.titleEnd && beneficios.titleEnd}
            </h2>
          </div>

          {beneficios.items && beneficios.items.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {beneficios.items.map((b) => (
                <div key={b._key ?? b.titulo} className="rounded-2xl bg-white border border-border p-8">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-brand-orange/10 text-brand-orange mb-5">
                    <Check strokeWidth={2} className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 leading-tight">{b.titulo}</h3>
                  <p className="text-sm text-brand-navy/65 leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </Section>
  )
}
