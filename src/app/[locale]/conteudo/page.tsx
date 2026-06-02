import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import ConteudoHub from '@/components/ConteudoHub'
import CtaBannerSection from '@/components/CtaBannerSection'
import { getCtaBanner } from '@/sanity/queries/ctaBanner'
import { getPosts } from '@/sanity/queries/posts'
import { getPortalConteudo } from '@/sanity/queries/portalConteudo'
import { buildMetadata } from '@/lib/seo'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Seo' })
  return buildMetadata({
    locale,
    path: '/conteudo',
    title: t('conteudo.title'),
    description: t('conteudo.description'),
  })
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
