import HomeClientComponent from '@/components/home/HomeClientComponent'
import { getHome } from '@/sanity/queries/home'

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const data = await getHome({ locale })
  return <HomeClientComponent data={data} />
}
