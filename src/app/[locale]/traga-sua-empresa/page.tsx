import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { getTragaSuaEmpresa } from '@/sanity/queries/tragaSuaEmpresa'
import { buildMetadata } from '@/lib/seo'
import TragaSuaEmpresaClientComponent from '@/components/traga-sua-empresa/TragaSuaEmpresaClientComponent'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Seo' })
  return buildMetadata({
    locale,
    path: '/traga-sua-empresa',
    title: t('tragaSuaEmpresa.title'),
    description: t('tragaSuaEmpresa.description'),
  })
}

type Props = {
  params: Promise<{ locale: string }>
}

export default async function TragaSuaEmpresaPage({ params }: Props) {
  const { locale } = await params
  const data = await getTragaSuaEmpresa({ locale })

  return <TragaSuaEmpresaClientComponent data={data} />
}
