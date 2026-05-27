import type { Metadata } from 'next'
import { getTragaSuaEmpresa } from '@/sanity/queries/tragaSuaEmpresa'
import TragaSuaEmpresaClientComponent from '@/components/traga-sua-empresa/TragaSuaEmpresaClientComponent'

export const metadata: Metadata = {
  title: 'Traga sua empresa',
  description:
    'Instale sua empresa no Parque Pedra Branca: coworking, laboratórios, perks de mais de 30 ferramentas (HubSpot, IBM Cloud, Notion, Zendesk) e incentivos fiscais.',
}

type Props = {
  params: Promise<{ locale: string }>
}

export default async function TragaSuaEmpresaPage({ params }: Props) {
  const { locale } = await params
  const data = await getTragaSuaEmpresa({ locale })

  return <TragaSuaEmpresaClientComponent data={data} />
}
