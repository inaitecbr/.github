import Image from 'next/image'
import Link from 'next/link'
import { MapPin } from 'lucide-react'
import { Section } from '@/components/Section'
import type { TragaInfraestrutura } from '@/sanity/queries/tragaSuaEmpresa'

type Props = { infraestrutura?: TragaInfraestrutura }

export default function InfraestruturaSection({ infraestrutura }: Props) {
  if (!infraestrutura) return null

  return (
    <Section id="infraestrutura" padding="md" className="scroll-mt-24">
      <div className="flex flex-wrap items-end justify-between gap-8 mb-16">
        <div className="max-w-2xl">
          {infraestrutura.eyebrow && (
            <div className="mb-5 inline-flex items-center gap-2">
              <span className="block h-px w-8 bg-brand-orange" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-orange">
                {infraestrutura.eyebrow}
              </span>
            </div>
          )}
          <h2 className="font-extrabold text-white text-display-xl leading-[1.2] tracking-tight">
            {infraestrutura.titleStart && <>{infraestrutura.titleStart}{' '}</>}
            {infraestrutura.titleHighlight && (
              <span className="italic font-medium text-brand-orange">{infraestrutura.titleHighlight}</span>
            )}
            {infraestrutura.titleEnd && <>{infraestrutura.titleEnd}</>}
          </h2>
          {infraestrutura.desc && (
            <p className="mt-6 text-white/65 text-base leading-relaxed">{infraestrutura.desc}</p>
          )}
        </div>
        {infraestrutura.tourCtaLabel && (
          <Link
            href={infraestrutura.tourCtaHref ?? '/fale-conosco'}
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/70 hover:text-brand-orange transition-colors"
          >
            {infraestrutura.tourCtaLabel}
          </Link>
        )}
      </div>

      {infraestrutura.espacos && infraestrutura.espacos.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {infraestrutura.espacos.map((e) => (
            <article
              key={e._key ?? e.nome}
              className="group relative rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition-all"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                {e.fotoUrl && (
                  <Image
                    src={e.fotoUrl}
                    alt={e.nome ?? ''}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/30 to-transparent" />
                {e.metragem && (
                  <span className="absolute top-4 left-4 rounded-full bg-brand-orange px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white">
                    {e.metragem}
                  </span>
                )}
              </div>
              <div className="p-6">
                <h3 className="font-bold text-white text-lg mb-2 leading-tight">{e.nome}</h3>
                <p className="text-sm text-white/55 leading-relaxed">{e.desc}</p>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Localização */}
      {infraestrutura.localizacao && (
        <div className="mt-16 rounded-2xl border border-white/10 bg-white/[0.03] p-8 md:p-12 grid md:grid-cols-[auto_1fr_auto] gap-8 items-center">
          <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-orange/15 text-brand-orange">
            <MapPin strokeWidth={1.8} className="w-7 h-7" />
          </div>
          <div>
            {infraestrutura.localizacao.eyebrow && (
              <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-orange mb-2">
                {infraestrutura.localizacao.eyebrow}
              </div>
            )}
            {infraestrutura.localizacao.endereco && (
              <div className="text-white text-lg font-semibold leading-snug">
                {infraestrutura.localizacao.endereco}
              </div>
            )}
            {infraestrutura.localizacao.distancias && (
              <p className="text-white/55 text-sm mt-2 leading-relaxed">
                {infraestrutura.localizacao.distancias}
              </p>
            )}
          </div>
          {infraestrutura.localizacao.ctaLabel && (
            <Link
              href={infraestrutura.localizacao.ctaHref ?? '/fale-conosco'}
              className="inline-flex items-center rounded-full border border-white/25 bg-white/[0.06] backdrop-blur-sm text-white text-sm font-semibold px-6 py-3 hover:bg-white/15 hover:border-white/40 transition-all shrink-0"
            >
              {infraestrutura.localizacao.ctaLabel}
            </Link>
          )}
        </div>
      )}
    </Section>
  )
}
