'use client'

import Link from 'next/link'
import AnimatedCounter from '@/components/AnimatedCounter'
import { Container } from '@/components/Section'
import type { HomeHero } from '@/sanity/queries/home'

type Props = {
  hero?: HomeHero
}

export default function HeroSection({ hero }: Props) {
  return (
    <section className="relative h-dvh w-full overflow-hidden z-10">
      {hero?.videoUrl && (
        <video
          src={hero.videoUrl}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/70 via-brand-navy/50 to-brand-navy/90 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.5))] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_52%,rgba(13,46,56,0.55)_0%,transparent_100%)] pointer-events-none" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 pt-[68px] pb-32">
        {(hero?.titleStart || hero?.titleHighlight) && (
          <h1 className="font-extrabold text-white text-display-3xl leading-[0.95] tracking-tight max-w-5xl drop-shadow-xl">
            {hero?.titleStart}
            {hero?.titleStart && hero?.titleHighlight && ' '}
            {hero?.titleHighlight && (
              <span className="italic font-medium text-brand-orange tracking-tight">
                {hero.titleHighlight}
              </span>
            )}
          </h1>
        )}

        {hero?.subtitle && (
          <p className="mt-8 max-w-2xl text-white/80 text-[15px] md:text-base leading-relaxed">
            {hero.subtitle}
          </p>
        )}

        {(hero?.ctaPrimary?.label || hero?.ctaSecondary?.label) && (
          <div className="mt-10 w-full flex flex-col items-stretch gap-4 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
            {hero?.ctaPrimary?.label && (
              <Link
                href={hero.ctaPrimary.href || '#'}
                className="group inline-flex items-center justify-center rounded-full bg-brand-orange text-white text-sm font-semibold px-7 py-4 hover:bg-[#FF9B26] hover:shadow-xl hover:shadow-brand-orange/40 transition-all duration-300 shadow-lg shadow-brand-orange/25"
              >
                {hero.ctaPrimary.label}
              </Link>
            )}
            {hero?.ctaSecondary?.label && (
              <Link
                href={hero.ctaSecondary.href || '#'}
                className="group inline-flex items-center justify-center rounded-full border border-white/40 bg-white/10 backdrop-blur-sm text-white text-sm font-semibold px-7 py-4 hover:bg-white hover:text-brand-navy hover:border-white transition-all duration-300"
              >
                {hero.ctaSecondary.label}
              </Link>
            )}
          </div>
        )}
      </div>

      {hero?.metrics && hero.metrics.length > 0 && (
        <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-white/10 bg-brand-navy/50 backdrop-blur-md">
          <Container className="py-6 grid grid-cols-2 gap-y-6 md:grid-cols-4 md:gap-y-0 md:divide-x md:divide-white/10">
            {hero.metrics.map((m, i) => (
              <div
                key={`${m.label ?? ''}-${i}`}
                className="flex flex-col items-center gap-1 md:py-0 md:px-6"
              >
                {m.value && (
                  <span className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                    <AnimatedCounter value={m.value} />
                  </span>
                )}
                {m.label && (
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50 text-center">
                    {m.label}
                  </span>
                )}
              </div>
            ))}
          </Container>
        </div>
      )}
    </section>
  )
}
