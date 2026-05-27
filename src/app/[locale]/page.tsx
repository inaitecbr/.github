import HomeClientComponent from '@/components/home/HomeClientComponent'
import { getCtaBanner } from '@/sanity/queries/ctaBanner'
import { getHome } from '@/sanity/queries/home'

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const [data, ctaBanner] = await Promise.all([
    getHome({ locale }),
    getCtaBanner({ locale }),
  ])
  return <HomeClientComponent data={data} ctaBanner={ctaBanner} />
}
