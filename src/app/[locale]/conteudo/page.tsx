import type { Metadata } from 'next'
import ConteudoHub from '@/components/ConteudoHub'
import CtaBannerSection from '@/components/CtaBannerSection'
import { getCtaBanner } from '@/sanity/queries/ctaBanner'
import { getPosts } from '@/sanity/queries/posts'
import { getPortalConteudo } from '@/sanity/queries/portalConteudo'

export const metadata: Metadata = {
  title: 'Conteúdo',
  description:
    'Notícias, cases de sucesso, conquistas e eventos do ecossistema Inaitec — o hub de inovação do Parque Pedra Branca.',
}

export default async function ConteudoPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const [posts, page, ctaBanner] = await Promise.all([
    getPosts({ locale }),
    getPortalConteudo({ locale }),
    getCtaBanner({ locale }),
  ])

  return (
    <main>
      <ConteudoHub posts={posts} hero={page?.hero} />
      <CtaBannerSection data={ctaBanner} />
    </main>
  )
}
