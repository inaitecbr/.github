import HomeClientComponent from '@/components/home/HomeClientComponent'
import { getCtaBanner } from '@/sanity/queries/ctaBanner'
import { getHome } from '@/sanity/queries/home'
import { getPosts } from '@/sanity/queries/posts'

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
