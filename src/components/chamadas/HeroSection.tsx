'use client'

import BrandPattern from '@/components/BrandPattern'
import { Container } from '@/components/Section'
import type { ChamadasHero } from '@/sanity/queries/chamadas'

type Props = { hero?: ChamadasHero }

export default function HeroSection({ hero }: Props) {
  if (!hero) return null

  return (
    <section className="relative overflow-hidden bg-brand-navy pt-[108px] pb-16">
      <BrandPattern className="absolute inset-0 opacity-[0.03]" />

      <Container className="relative">
        <div className="max-w-3xl pt-14">
          {hero.eyebrow && (
            <div className="mb-5 inline-flex items-center gap-2">
              <span className="block h-px w-8 bg-brand-orange" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-orange">
                {hero.eyebrow}
              </span>
            </div>
          )}
          {(hero.titleStart || hero.titleHighlight) && (
            <h1 className="font-extrabold text-white text-display-2xl leading-[1.1] tracking-tight mb-6">
              {hero.titleStart && <>{hero.titleStart}{' '}</>}
              {hero.titleHighlight && (
                <span className="italic font-medium text-brand-orange">{hero.titleHighlight}</span>
              )}
            </h1>
          )}
          {hero.desc && (
            <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-2xl">
              {hero.desc}
            </p>
          )}
        </div>
      </Container>
    </section>
  )
}
