import type { Metadata } from 'next'
import { getLocale, getTranslations } from 'next-intl/server'
import { getBancoDeTalentos } from '@/sanity/queries/bancoDeTalentos'
import { buildMetadata } from '@/lib/seo'
import BancoDeTalentosClientComponent from '@/components/banco-de-talentos/BancoDeTalentosClientComponent'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Seo' })
  return buildMetadata({
    locale,
    path: '/banco-de-talentos',
    title: t('bancoDeTalentos.title'),
    description: t('bancoDeTalentos.description'),
  })
}

export default async function BancoDeTalentosPage() {
  const locale = await getLocale()
  const data = await getBancoDeTalentos({ locale })

  return <BancoDeTalentosClientComponent data={data} />
}
