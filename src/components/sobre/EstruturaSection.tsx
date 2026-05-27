import { Fragment } from 'react'
import Image from 'next/image'
import BrandPattern from '@/components/BrandPattern'
import { Container } from '@/components/Section'
import type { SobreEstrutura } from '@/sanity/queries/sobre'

type Props = {
  estrutura?: SobreEstrutura
}

export default function EstruturaSection({ estrutura }: Props) {
  if (!estrutura) return null

  const enderecoLinhas = estrutura.enderecoLinhas?.split('\n') ?? []

  return (
    <section
      id="estrutura"
      data-theme="light"
      className="relative z-10 scroll-mt-24 bg-[#F5F4EF] text-brand-navy overflow-hidden"
    >
      <BrandPattern
        variant="dots"
        color="var(--color-brand-navy)"
        className="absolute -top-10 left-[5%] w-80 h-80 opacity-[0.08] pointer-events-none"
      />

      <Container className="relative py-16">
        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 items-stretch">

          {/* Imagem do edifício com endereço flutuante */}
          <div className="relative rounded-3xl overflow-hidden bg-brand-navy min-h-[480px] lg:min-h-[600px]">
            {estrutura.estruturaImageUrl && (
              <Image
                src={estrutura.estruturaImageUrl}
                alt="Edifício Inaitec — Parque Pedra Branca"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/75 via-brand-navy/15 to-transparent" />

            {/* Badge "nova ala em obras" no topo */}
            {estrutura.badgeLabel && (
              <div className="absolute top-6 left-6">
                <span className="rounded-full bg-brand-orange px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white inline-flex items-center gap-1.5 shadow-lg shadow-brand-orange/30">
                  <span className="block w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  {estrutura.badgeLabel}
                </span>
              </div>
            )}

            {/* Endereço flutuante na base */}
            {enderecoLinhas.length > 0 && (
              <div className="absolute bottom-6 left-6 right-6">
                <div className="inline-flex flex-col rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 px-5 py-4 max-w-sm">
                  {estrutura.enderecoLabel && (
                    <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/65 mb-1">
                      {estrutura.enderecoLabel}
                    </div>
                  )}
                  <div className="text-white font-semibold text-sm leading-snug">
                    {enderecoLinhas.map((linha, i) => (
                      <Fragment key={i}>
                        {linha}
                        {i < enderecoLinhas.length - 1 && <br />}
                      </Fragment>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Conteúdo + métricas */}
          <div className="flex flex-col justify-center">
            {estrutura.eyebrow && (
              <div className="mb-5 inline-flex items-center gap-2">
                <span className="block h-px w-8 bg-brand-orange" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-orange">
                  {estrutura.eyebrow}
                </span>
              </div>
            )}
            <h2 className="font-extrabold text-display-xl leading-[1.2] tracking-tight">
              {estrutura.titleStart && <>{estrutura.titleStart}{' '}</>}
              {estrutura.titleHighlight && (
                <span className="italic font-medium text-brand-orange">{estrutura.titleHighlight}</span>
              )}
            </h2>
            {estrutura.desc && (
              <p className="mt-6 text-brand-navy/70 text-base leading-relaxed">{estrutura.desc}</p>
            )}

            {/* Métricas em grid limpo */}
            {estrutura.items && estrutura.items.length > 0 && (
              <dl className="mt-10 pt-8 border-t border-brand-navy/10 grid grid-cols-2 gap-x-8 gap-y-8">
                {estrutura.items.map((e) => (
                  <div key={e._key ?? e.area} className="flex flex-col gap-1.5">
                    <dt className="text-3xl md:text-4xl font-extrabold text-brand-navy tracking-tight">
                      {e.area}
                    </dt>
                    <dd className="text-sm text-brand-navy/65 leading-relaxed">{e.desc}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}
