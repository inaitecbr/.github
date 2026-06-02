import type { Metadata } from 'next'
import { getLocale, getTranslations } from 'next-intl/server'
import { getChamadasPage } from '@/sanity/queries/chamadas'
import { getChamadasLista } from '@/sanity/queries/programa'
import { buildMetadata } from '@/lib/seo'
import ChamadasClientComponent from '@/components/chamadas/ChamadasClientComponent'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Seo' })
  return buildMetadata({
    locale,
    path: '/chamadas',
    title: t('chamadas.title'),
    description: t('chamadas.description'),
  })
}

export default async function ChamadasPage() {
  const locale = await getLocale()

  const [pageData, programas] = await Promise.all([
    getChamadasPage({ locale }),
    getChamadasLista({ locale }),
  ])

  return (
    <ChamadasClientComponent
      data={pageData}
      programas={programas ?? []}
    />
  )
}
