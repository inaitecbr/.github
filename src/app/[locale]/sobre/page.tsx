import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { getSobre } from '@/sanity/queries/sobre'
import { buildMetadata } from '@/lib/seo'
import SobreClientComponent from '@/components/sobre/SobreClientComponent'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Seo' })
  return buildMetadata({
    locale,
    path: '/sobre',
    title: t('sobre.title'),
    description: t('sobre.description'),
  })
}

type Props = {
  params: Promise<{ locale: string }>
}

export default async function SobrePage({ params }: Props) {
  const { locale } = await params
  const data = await getSobre({ locale })

  return <SobreClientComponent data={data} />
}
