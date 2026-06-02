import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { getProgramas, getProgramasPage } from '@/sanity/queries/programa'
import { buildMetadata } from '@/lib/seo'
import ProgramasClientComponent from '@/components/programas/ProgramasClientComponent'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Seo' })
  return buildMetadata({
    locale,
    path: '/programas',
    title: t('programas.title'),
    description: t('programas.description'),
  })
}

type Props = {
  params: Promise<{ locale: string }>
}

export default async function ProgramasPage({ params }: Props) {
  const { locale } = await params
  const [programas, pageData] = await Promise.all([
    getProgramas({ locale }),
    getProgramasPage({ locale }),
  ])
  return <ProgramasClientComponent programas={programas ?? []} pageData={pageData} />
}
