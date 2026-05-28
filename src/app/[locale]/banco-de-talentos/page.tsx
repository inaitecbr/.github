import type { Metadata } from 'next'
import { getLocale } from 'next-intl/server'
import { getBancoDeTalentos } from '@/sanity/queries/bancoDeTalentos'
import BancoDeTalentosClientComponent from '@/components/banco-de-talentos/BancoDeTalentosClientComponent'

export const metadata: Metadata = {
  title: 'Banco de Talentos',
  description:
    'Capacitação e empregabilidade no ecossistema Inaitec: conecte-se a vagas em mais de 200 empresas do Parque Pedra Branca ou anuncie posições para encontrar talentos locais qualificados.',
}

export default async function BancoDeTalentosPage() {
  const locale = await getLocale()
  const data = await getBancoDeTalentos({ locale })

  return <BancoDeTalentosClientComponent data={data} />
}
