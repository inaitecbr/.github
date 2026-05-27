import type { Metadata } from 'next'
import { getProgramas, getProgramasPage } from '@/sanity/queries/programa'
import ProgramasClientComponent from '@/components/programas/ProgramasClientComponent'

export const metadata: Metadata = {
  title: 'Programas',
  description:
    'Conheça todos os programas do Inaitec — aceleração, inovação aberta, pesquisa aplicada e investimento. Filtre por público, estágio e modelo de entrada.',
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
