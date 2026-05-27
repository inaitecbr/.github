import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import BrandPattern from '@/components/BrandPattern'
import { Container } from '@/components/Section'
import type { SobreHero } from '@/sanity/queries/sobre'

type Props = {
  hero?: SobreHero
}

export default async function HeroSection({ hero }: Props) {
  if (!hero) return null

  const t = await getTranslations('Sobre')

  return (
    <section className="relative z-10 min-h-[640px] lg:h-[700px] pt-[108px] pb-16 overflow-hidden">
      <BrandPattern
        variant="dots"
        color="var(--color-brand-orange)"
        className="absolute top-32 right-8 w-72 h-72 opacity-25 pointer-events-none"
      />

      <Container className="relative h-full grid lg:grid-cols-[1.1fr_1fr] gap-16 items-stretch">
        <div className="flex flex-col justify-center">
          {hero.eyebrow && (
            <div className="mb-5 inline-flex items-center gap-2">
              <span className="block h-px w-8 bg-brand-orange" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-orange">
                {hero.eyebrow}
              </span>
            </div>
          )}

          <h1 className="font-extrabold text-white text-display-xl leading-[1.2] tracking-tight">
            {hero.titleStart}
            <br />
            {hero.titleHighlight && (
              <span className="italic font-medium text-brand-orange">{hero.titleHighlight}</span>
            )}
          </h1>

          {hero.subtitle && (
            <p className="mt-6 max-w-xl text-white/70 text-base leading-relaxed">
              {hero.subtitle}
            </p>
          )}

          {/* Quick links — navegação interna do Sobre */}
          <nav
            aria-label="Navegação da página"
            className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] font-semibold text-white/55"
          >
            <a href="#quem-somos" className="hover:text-brand-orange transition-colors">
              {t('navQuemSomos')}
            </a>
            <span className="block w-1 h-1 rounded-full bg-white/20" />
            <a href="#nossa-historia" className="hover:text-brand-orange transition-colors">
              {t('navHistoria')}
            </a>
            <span className="block w-1 h-1 rounded-full bg-white/20" />
            <a href="#lideranca" className="hover:text-brand-orange transition-colors">
              {t('navLideranca')}
            </a>
            <span className="block w-1 h-1 rounded-full bg-white/20" />
            <a href="#relatorio" className="hover:text-brand-orange transition-colors">
              {t('navRelatorio')}
            </a>
            <span className="block w-1 h-1 rounded-full bg-white/20" />
            <a href="#estrutura" className="hover:text-brand-orange transition-colors">
              {t('navEstrutura')}
            </a>
          </nav>
        </div>

        <div className="relative aspect-[4/3] lg:aspect-auto rounded-3xl overflow-hidden ring-1 ring-white/10 shadow-2xl shadow-black/40">
          {hero.heroImageUrl ? (
            <Image
              src={hero.heroImageUrl}
              alt="Ecossistema Inaitec — Parque Pedra Branca"
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 45vw, 100vw"
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-navy/60 via-transparent to-transparent" />
        </div>
      </Container>
    </section>
  )
}
