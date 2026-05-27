import type { Metadata } from 'next'
import { getSobre } from '@/sanity/queries/sobre'
import SobreClientComponent from '@/components/sobre/SobreClientComponent'

export const metadata: Metadata = {
  title: 'Sobre',
  description:
    'Há 15 anos o Inaitec opera o Parque Pedra Branca, em Palhoça (SC): +200 empresas instaladas, +300 startups aceleradas e R$ 180M em capital movimentado. Conheça o instituto.',
}

type Props = {
  params: Promise<{ locale: string }>
}

export default async function SobrePage({ params }: Props) {
  const { locale } = await params
  const data = await getSobre({ locale })

  return <SobreClientComponent data={data} />
}
