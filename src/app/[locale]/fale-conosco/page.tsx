import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { getFaleConosco } from '@/sanity/queries/faleConosco'
import { buildMetadata } from '@/lib/seo'
import FaleConoscoClientComponent from '@/components/fale-conosco/FaleConoscoClientComponent'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Seo' })
  return buildMetadata({
    locale,
    path: '/fale-conosco',
    title: t('faleConosco.title'),
    description: t('faleConosco.description'),
  })
}

type Props = {
  params: Promise<{ locale: string }>
}

export default async function FaleConoscoPage({ params }: Props) {
  const { locale } = await params
  const data = await getFaleConosco({ locale })

  return <FaleConoscoClientComponent data={data} />
}
