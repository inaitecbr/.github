'use client'

import Image from 'next/image'
import { Container } from '@/components/Section'
import CadastroCTA from '@/components/CadastroCTA'
import type { BancoHero } from '@/sanity/queries/bancoDeTalentos'

type Props = { hero?: BancoHero }

export default function HeroSection({ hero }: Props) {
  if (!hero) return null

  return (
    <section className="relative z-10 min-h-[640px] lg:h-[700px] pt-[108px] pb-16 overflow-hidden">
      <Container className="h-full grid lg:grid-cols-[1.1fr_1fr] gap-16 items-stretch">
        <div className="flex flex-col justify-center">
          {hero.eyebrow && (
            <div className="mb-5 inline-flex items-center gap-2">
              <span className="block h-px w-8 bg-brand-orange" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-orange">
                {hero.eyebrow}
              </span>
            </div>
          )}
          {(hero.titleStart || hero.titleHighlight || hero.titleEnd) && (
            <h1 className="font-extrabold text-white text-display-xl leading-[1.2] tracking-tight">
              {hero.titleStart && <>{hero.titleStart}{' '}</>}
              {hero.titleHighlight && (
                <span className="italic font-medium text-brand-orange">{hero.titleHighlight}</span>
              )}
              {hero.titleEnd && <>{' '}{hero.titleEnd}</>}
            </h1>
          )}
          {hero.desc && (
            <p className="mt-6 max-w-xl text-white/70 text-sm leading-relaxed">{hero.desc}</p>
          )}
          <div className="mt-8 w-full flex flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            {hero.ctaLabelCandidato && (
              <a
                href="#para-candidatos"
                className="inline-flex items-center justify-center rounded-full bg-brand-orange text-white text-sm font-semibold px-7 py-4 hover:bg-[#FF9B26] hover:shadow-xl hover:shadow-brand-orange/40 transition-all duration-300 shadow-lg shadow-brand-orange/25"
              >
                {hero.ctaLabelCandidato}
              </a>
            )}
            {hero.ctaLabelEmpresa && (
              <a
                href="#para-empresas"
                className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/5 backdrop-blur-sm text-white text-sm font-semibold px-7 py-4 hover:bg-white/10 hover:border-white/50 transition-all duration-300"
              >
                {hero.ctaLabelEmpresa}
              </a>
            )}
          </div>
        </div>

        <div className="relative aspect-[4/3] lg:aspect-auto rounded-3xl overflow-hidden">
          <Image
            src="/imagens-destaques/inaitec8.jpg"
            alt="Profissionais conectados pelo Banco de Talentos Inaitec"
            fill
            priority
            className="object-cover"
            sizes="(min-width: 1024px) 45vw, 100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-navy/60 via-transparent to-transparent" />
          <div className="absolute top-6 left-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/30 backdrop-blur-md px-3 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-teal animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">
              Vagas abertas
            </span>
          </div>
        </div>
      </Container>
    </section>
  )
}
