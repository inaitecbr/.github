import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProgramaBySlug } from '@/sanity/queries/programa'
import ProgramaClientComponent from '@/components/programas/ProgramaClientComponent'

type Props = { params: Promise<{ locale: string; slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params
  const programa = await getProgramaBySlug({ slug, locale })
  if (!programa) return { title: 'Programa não encontrado' }
  return {
    title: programa.name,
    description: programa.longDesc ?? programa.desc,
  }
}

export default async function ProgramaPage({ params }: Props) {
  const { slug, locale } = await params
  const programa = await getProgramaBySlug({ slug, locale })
  if (!programa) notFound()
  return <ProgramaClientComponent programa={programa} />
}
