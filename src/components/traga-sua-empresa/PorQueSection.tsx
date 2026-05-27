import Image from 'next/image'
import { Section } from '@/components/Section'
import type { TragaPorQue } from '@/sanity/queries/tragaSuaEmpresa'

type Props = { porQue?: TragaPorQue }

export default function PorQueSection({ porQue }: Props) {
  if (!porQue) return null

  return (
    <Section id="por-que" theme="light" padding="md" className="scroll-mt-24">
      <div className="max-w-2xl mb-16">
        {porQue.eyebrow && (
          <div className="mb-5 inline-flex items-center gap-2">
            <span className="block h-px w-8 bg-brand-orange" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-orange">
              {porQue.eyebrow}
            </span>
          </div>
        )}
        <h2 className="font-extrabold text-display-xl leading-[1.2] tracking-tight">
          {porQue.titleStart && <>{porQue.titleStart}{' '}</>}
          {porQue.titleHighlight && (
            <span className="italic font-medium text-brand-orange">{porQue.titleHighlight}</span>
          )}
          {porQue.titleEnd && porQue.titleEnd}
        </h2>
      </div>

      <div className="grid lg:grid-cols-[400px_1fr] gap-16">
        {/* Foto + depoimento */}
        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden order-2 lg:order-1">
          {porQue.porQueImageUrl && (
            <Image
              src={porQue.porQueImageUrl}
              alt="Comunidade Inaitec"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 33vw, 100vw"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/70 via-transparent to-transparent" />
          {porQue.testimonial?.quote && (
            <div className="absolute bottom-6 left-6 right-6">
              <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-5">
                <p className="text-white text-sm leading-relaxed">
                  &ldquo;{porQue.testimonial.quote}&rdquo;
                </p>
                <div className="mt-4 pt-4 border-t border-white/15">
                  {porQue.testimonial.nome && (
                    <div className="text-white text-sm font-bold">{porQue.testimonial.nome}</div>
                  )}
                  {(porQue.testimonial.cargo || porQue.testimonial.empresa) && (
                    <div className="text-white/60 text-[11px] mt-0.5">
                      {[porQue.testimonial.cargo, porQue.testimonial.empresa]
                        .filter(Boolean)
                        .join(' · ')}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Lista de razões */}
        {porQue.razoes && porQue.razoes.length > 0 && (
          <ol className="order-1 lg:order-2 divide-y divide-border -mt-2">
            {porQue.razoes.map((r, i) => (
              <li
                key={r._key ?? r.titulo}
                className="grid grid-cols-[auto_1fr] gap-8 py-8 first:pt-0 last:pb-0"
              >
                <div className="text-brand-orange font-extrabold text-3xl tracking-tight tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2 leading-tight">{r.titulo}</h3>
                  <p className="text-brand-navy/65 leading-relaxed">{r.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>
    </Section>
  )
}
