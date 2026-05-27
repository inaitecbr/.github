import type { Metadata } from 'next'
import { getEmpresas } from '@/sanity/queries/empresas'
import { getEmpresasInstaladasPage } from '@/sanity/queries/empresasInstaladas'
import EmpresasInstaladasClientComponent from '@/components/empresas-instaladas/EmpresasInstaladasClientComponent'

export const metadata: Metadata = {
  title: 'Empresas Instaladas',
  description:
    'Conheça as +200 startups, scale-ups e corporações residentes no Parque Pedra Branca — o maior hub urbano de inovação do Sul do Brasil.',
}

type Props = {
  params: Promise<{ locale: string }>
}

export default async function EmpresasInstaladasPage({ params }: Props) {
  const { locale } = await params

  const [empresas, pageData] = await Promise.all([
    getEmpresas(),
    getEmpresasInstaladasPage({ locale }),
  ])

  return (
    <EmpresasInstaladasClientComponent
      empresas={empresas ?? []}
      pageData={pageData}
    />
  )
}
