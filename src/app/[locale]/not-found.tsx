import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { Container } from '@/components/Section'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('NotFound')
  return { title: t('metaTitle') }
}

export default async function NotFoundPage() {
  const t = await getTranslations('NotFound')

  return (
    <main className="relative min-h-dvh overflow-clip bg-brand-navy flex items-center pt-[108px] pb-16">
      {/* Fundo orgânico */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] rounded-full bg-brand-orange/15 blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[700px] h-[700px] rounded-full bg-brand-teal/10 blur-[140px]" />
      </div>

      <Container className="relative z-10 grid lg:grid-cols-[1.1fr_1fr] items-center gap-12 lg:gap-20">
        {/* Texto */}
        <div>
          <div className="mb-5 inline-flex items-center gap-2">
            <span className="block h-px w-8 bg-brand-orange" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-orange">
              {t('eyebrow')}
            </span>
          </div>

          <h1 className="font-extrabold text-white text-display-xl leading-[1.1] tracking-tight">
            {t('titleStart')}{' '}
            <span className="italic font-medium text-brand-orange">{t('titleHighlight')}</span>.
          </h1>

          <p className="mt-6 max-w-xl text-white/70 text-base leading-relaxed">
            {t('desc')}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 rounded-full bg-brand-orange text-white text-sm font-semibold px-6 py-3.5 shadow-lg shadow-brand-orange/25 hover:bg-[#FF9B26] hover:shadow-xl hover:shadow-brand-orange/40 transition-all duration-300"
            >
              <ArrowLeft strokeWidth={2.2} className="w-4 h-4" />
              {t('ctaHome')}
            </Link>
            <Link
              href="/fale-conosco"
              className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-white text-sm font-semibold px-6 py-3.5 hover:bg-white/10 hover:border-white/40 transition-all duration-300"
            >
              {t('ctaContato')}
              <ArrowRight strokeWidth={2.2} className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        {/* Número 404 gigante */}
        <div className="relative flex items-center justify-center select-none">
          <span
            aria-hidden
            className="text-white/[0.06] font-extrabold leading-none tracking-tighter text-[clamp(180px,28vw,400px)]"
          >
            404
          </span>
          <span
            aria-hidden
            className="absolute inset-0 flex items-center justify-center font-extrabold leading-none tracking-tighter text-[clamp(180px,28vw,400px)] text-transparent bg-clip-text bg-gradient-to-br from-brand-orange/40 via-brand-orange/10 to-transparent"
          >
            404
          </span>
        </div>
      </Container>
    </main>
  )
}
