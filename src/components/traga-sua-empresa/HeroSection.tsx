import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/Section'
import type { TragaHero } from '@/sanity/queries/tragaSuaEmpresa'

type Props = { hero?: TragaHero }

export default function HeroSection({ hero }: Props) {
  if (!hero) return null

  return (
    <section className="relative z-10 min-h-[640px] lg:h-[700px] pt-[108px] pb-16 overflow-hidden">
      <Container className="h-full grid lg:grid-cols-[1.1fr_1fr] gap-16 items-stretch">
        <div className="flex flex-col justify-center">
          <h1 className="font-extrabold text-white text-display-xl leading-[1.2] tracking-tight">
            {hero.titleStart && <>{hero.titleStart}{' '}</>}
            {hero.titleHighlight && (
              <span className="italic font-medium text-brand-orange">{hero.titleHighlight}</span>
            )}
            {hero.titleEnd && <>{' '}{hero.titleEnd}</>}
          </h1>

          {hero.subtitle && (
            <p className="mt-6 max-w-xl text-white/70 text-sm leading-relaxed">{hero.subtitle}</p>
          )}

          <div className="mt-8 w-full flex flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            {hero.ctaPrimary?.label && (
              <Link
                href={hero.ctaPrimary.href ?? '/'}
                className="inline-flex items-center justify-center rounded-full bg-brand-orange text-white text-sm font-semibold px-7 py-4 hover:bg-[#FF9B26] hover:shadow-xl hover:shadow-brand-orange/40 transition-all duration-300 shadow-lg shadow-brand-orange/25"
              >
                {hero.ctaPrimary.label}
              </Link>
            )}
            {hero.ctaSecondary?.label && (
              <Link
                href={hero.ctaSecondary.href ?? '#'}
                className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/5 backdrop-blur-sm text-white text-sm font-semibold px-7 py-4 hover:bg-white/10 hover:border-white/50 transition-all duration-300"
              >
                {hero.ctaSecondary.label}
              </Link>
            )}
          </div>
        </div>

        {/* Imagem hero */}
        <div className="relative aspect-[4/3] lg:aspect-auto rounded-3xl overflow-hidden">
          {hero.heroImageUrl && (
            <Image
              src={hero.heroImageUrl}
              alt="Edifício Inaitec — Parque Pedra Branca"
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 45vw, 100vw"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-navy/60 via-transparent to-transparent" />
          {hero.heroBadgeLabel && (
            <div className="absolute top-6 left-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/30 backdrop-blur-md px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-teal animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">
                {hero.heroBadgeLabel}
              </span>
            </div>
          )}
        </div>
      </Container>
    </section>
  )
}
