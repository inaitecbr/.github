import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import HomeClientComponent from '@/components/home/HomeClientComponent'
import { getCtaBanner } from '@/sanity/queries/ctaBanner'
import { getHome } from '@/sanity/queries/home'
import { getPosts } from '@/sanity/queries/posts'
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
    path: '',
    title: t('home.title'),
    description: t('home.description'),
  })
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const [data, ctaBanner, posts] = await Promise.all([
    getHome({ locale }),
    getCtaBanner({ locale }),
    getPosts({ locale }),
  ])
  return <HomeClientComponent data={data} ctaBanner={ctaBanner} posts={posts.slice(0, 5)} />
}
