import { Mail } from 'lucide-react'
import { Container } from '@/components/Section'
import type { FaleConoscoHero } from '@/sanity/queries/faleConosco'
import ContactForm from './ContactForm'

type Props = {
  hero?: FaleConoscoHero
}

export default function HeroSection({ hero }: Props) {
  if (!hero) return null

  return (
    <section className="relative z-10 min-h-dvh flex items-center pt-[108px] pb-6 lg:pb-10">
      <Container className="grid lg:grid-cols-[1fr_1.05fr] gap-10 lg:gap-16 items-center">

        {/* Texto / Título */}
        <div>
          {hero.eyebrow && (
            <div className="mb-5 inline-flex items-center gap-2">
              <span className="block h-px w-8 bg-brand-orange" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-orange">
                {hero.eyebrow}
              </span>
            </div>
          )}

          <h1 className="font-extrabold text-white text-display-xl leading-[1.1] tracking-tight">
            {hero.titleStart && <>{hero.titleStart}<br /></>}
            {hero.titleHighlight && (
              <span className="italic font-medium text-brand-orange">{hero.titleHighlight}</span>
            )}
          </h1>

          {hero.desc && (
            <p className="mt-5 max-w-xl text-white/70 text-base leading-relaxed">
              {hero.desc}
            </p>
          )}

          {hero.emailContato && (
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${hero.emailContato}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-all"
              >
                <Mail strokeWidth={1.8} className="w-4 h-4 text-brand-orange" />
                {hero.emailContato}
              </a>
            </div>
          )}
        </div>

        {/* Formulário */}
        <ContactForm />
      </Container>
    </section>
  )
}
