'use client'

import ChamadasLista from '@/components/ChamadasLista'
import HeroSection from './HeroSection'
import CtaFinalSection from '@/components/CtaFinalSection'
import type { ChamadasPageData } from '@/sanity/queries/chamadas'
import type { ProgramaCard } from '@/sanity/queries/programa'

type Props = {
  data: ChamadasPageData
  programas: ProgramaCard[]
}

export default function ChamadasClientComponent({ data, programas }: Props) {
  return (
    <main>
      <HeroSection hero={data?.hero} />
      <ChamadasLista programas={programas} />
      <CtaFinalSection data={data?.ctaFinal} />
    </main>
  )
}
