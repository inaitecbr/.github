import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { Container } from '@/components/Section'
import { buildMetadata } from '@/lib/seo'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Seo' })
  return buildMetadata({
    locale,
    path: '/banco-de-talentos/vagas',
    title: t('bancoDeTalentosVagas.title'),
    description: t('bancoDeTalentosVagas.description'),
  })
}

export default async function VagasPage() {
  const t = await getTranslations('BancoDeTalentosVagas')

  return (
    <main className="relative bg-brand-navy min-h-dvh overflow-x-clip">
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-[20vh] left-[-10%] w-200 h-200 rounded-full bg-brand-orange/10 blur-[160px]" />
        <div className="absolute bottom-[10vh] right-[-15%] w-225 h-225 rounded-full bg-[#4A9EE0]/8 blur-[160px]" />
      </div>

      <section className="relative z-10 min-h-dvh flex items-center py-32">
        <Container>
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2">
              <span className="block h-px w-8 bg-brand-orange" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-orange">
                {t('eyebrow')}
              </span>
            </div>

            <h1 className="font-extrabold text-white text-display-2xl leading-[1.15] tracking-tight">
              {t('titleStart')}{' '}
              <span className="italic font-medium text-brand-orange">{t('titleHighlight')}</span>.
            </h1>

            <p className="mt-8 text-white/65 text-base leading-relaxed max-w-xl">
              {t('desc1')}
            </p>

            <p className="mt-4 text-white/55 text-base leading-relaxed max-w-xl">
              {t('desc2')}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/banco-de-talentos"
                className="inline-flex items-center gap-2 rounded-full bg-brand-orange text-white text-sm font-semibold px-7 py-4 hover:bg-[#FF9B26] hover:shadow-xl hover:shadow-brand-orange/40 transition-all duration-300 shadow-lg shadow-brand-orange/25"
              >
                <ArrowLeft strokeWidth={2.5} className="w-4 h-4" />
                {t('ctaBack')}
              </Link>
              <Link
                href="/fale-conosco"
                className="inline-flex items-center rounded-full border border-white/30 bg-white/5 backdrop-blur-sm text-white text-sm font-semibold px-7 py-4 hover:bg-white/10 hover:border-white/50 transition-all duration-300"
              >
                {t('ctaContact')}
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}
