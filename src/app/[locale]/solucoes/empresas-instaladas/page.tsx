import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { getEmpresas } from '@/sanity/queries/empresas'
import { getEmpresasInstaladasPage } from '@/sanity/queries/empresasInstaladas'
import { buildMetadata } from '@/lib/seo'
import EmpresasInstaladasClientComponent from '@/components/empresas-instaladas/EmpresasInstaladasClientComponent'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Seo' })
  return buildMetadata({
    locale,
    path: '/solucoes/empresas-instaladas',
    title: t('empresasInstaladas.title'),
    description: t('empresasInstaladas.description'),
  })
}

type Props = {
  params: Promise<{ locale: string }>
}

export default async function EmpresasInstaladasPage({ params }: Props) {
  const { locale } = await params

  const [empresas, pageData] = await Promise.all([
    getEmpresas({ locale }),
    getEmpresasInstaladasPage({ locale }),
  ])

  return (
    <EmpresasInstaladasClientComponent
      empresas={empresas ?? []}
      pageData={pageData}
    />
  )
}
