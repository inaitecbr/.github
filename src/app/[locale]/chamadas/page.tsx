import type { Metadata } from 'next'
import { getLocale } from 'next-intl/server'
import { getChamadasPage } from '@/sanity/queries/chamadas'
import { getChamadasLista } from '@/sanity/queries/programa'
import ChamadasClientComponent from '@/components/chamadas/ChamadasClientComponent'

export const metadata: Metadata = {
  title: 'Chamadas Abertas',
  description:
    'Todas as seleções abertas do Inaitec — programas, editais e parcerias. Encontre a oportunidade certa para sua startup, empresa ou pesquisa.',
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
