import type { Metadata } from 'next'
import { getFaleConosco } from '@/sanity/queries/faleConosco'
import FaleConoscoClientComponent from '@/components/fale-conosco/FaleConoscoClientComponent'

export const metadata: Metadata = {
  title: 'Fale Conosco',
  description:
    'Entre em contato com o Inaitec — atendimento geral, imprensa, parcerias corporativas e suporte a empresas instaladas no Parque Pedra Branca.',
}

type Props = {
  params: Promise<{ locale: string }>
}

export default async function FaleConoscoPage({ params }: Props) {
  const { locale } = await params
  const data = await getFaleConosco({ locale })

  return <FaleConoscoClientComponent data={data} />
}
