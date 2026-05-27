import { Section } from '@/components/Section'
import type { SobreQuemSomos } from '@/sanity/queries/sobre'

type Props = {
  quemSomos?: SobreQuemSomos
}

export default function QuemSomosSection({ quemSomos }: Props) {
  if (!quemSomos) return null

  return (
    <Section id="quem-somos" theme="light" padding="md" className="scroll-mt-24">
      <div className="grid lg:grid-cols-[420px_1fr] gap-16">
        <div>
          {quemSomos.eyebrow && (
            <div className="mb-5 inline-flex items-center gap-2">
              <span className="block h-px w-8 bg-brand-orange" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-orange">
                {quemSomos.eyebrow}
              </span>
            </div>
          )}
          <h2 className="font-extrabold text-display-xl leading-[1.2] tracking-tight">
            {quemSomos.titleStart && <>{quemSomos.titleStart}{' '}</>}
            {quemSomos.titleHighlight && (
              <span className="italic font-medium text-brand-orange">{quemSomos.titleHighlight}</span>
            )}
            {quemSomos.titleEnd && quemSomos.titleEnd}
          </h2>
          {quemSomos.desc && (
            <p className="mt-6 text-brand-navy/70 text-base leading-relaxed">{quemSomos.desc}</p>
          )}
        </div>

        {/* Missão / Visão / Valores */}
        <div className="grid gap-4">
          {quemSomos.missao && (
            <div className="rounded-2xl bg-white p-8 border border-border">
              <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-orange mb-2">
                Missão
              </div>
              <p className="text-lg leading-relaxed">{quemSomos.missao}</p>
            </div>
          )}
          {quemSomos.visao && (
            <div className="rounded-2xl bg-white p-8 border border-border">
              <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-orange mb-2">
                Visão
              </div>
              <p className="text-lg leading-relaxed">{quemSomos.visao}</p>
            </div>
          )}
          {quemSomos.valores && quemSomos.valores.length > 0 && (
            <div className="rounded-2xl bg-white p-8 border border-border">
              <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-orange mb-4">
                Valores
              </div>
              <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
                {quemSomos.valores.map((v) => (
                  <li key={v._key ?? v.titulo} className="flex gap-3">
                    <span className="mt-2 block h-1.5 w-1.5 rounded-full bg-brand-orange shrink-0" />
                    <div>
                      <div className="font-semibold text-brand-navy">{v.titulo}</div>
                      <div className="text-sm text-brand-navy/65 leading-relaxed">{v.desc}</div>
                    </div>
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
