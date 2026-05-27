import BrandPattern from '@/components/BrandPattern'
import { Container } from '@/components/Section'
import type { EmpresasInstaladasHero } from '@/sanity/queries/empresasInstaladas'

type Props = {
  hero?: EmpresasInstaladasHero
}

export default function HeroSection({ hero }: Props) {
  if (!hero) return null

  return (
    <section className="relative overflow-hidden bg-brand-navy pt-[108px] pb-16">
      <BrandPattern className="absolute inset-0 opacity-[0.03]" />

      <Container className="relative pt-6">
        <div className="max-w-2xl">
          {hero.eyebrow && (
            <div className="mb-5 inline-flex items-center gap-2">
              <span className="block h-px w-8 bg-brand-orange" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-orange">
                {hero.eyebrow}
              </span>
            </div>
          )}

          <h1 className="font-extrabold text-white text-display-2xl leading-[1.1] tracking-tight mb-6">
            {hero.titleStart && <>{hero.titleStart}{' '}</>}
            {hero.titleHighlight && (
              <span className="italic font-medium text-brand-orange">{hero.titleHighlight}</span>
            )}
            {!hero.titleHighlight && '.'}
          </h1>

          {hero.subtitle && (
            <p className="text-white/60 text-base md:text-lg leading-relaxed">
              {hero.subtitle}
            </p>
          )}
        </div>
      </Container>
    </section>
  )
}
