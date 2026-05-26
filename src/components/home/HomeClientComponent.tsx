'use client'

import InaitecWebsite from '@/components/InaitecWebsite'
import HeroSection from './HeroSection'
import ParceirosSection from './ParceirosSection'
import EcossistemaSection from './EcossistemaSection'
import PilaresSection from './PilaresSection'
import type { HomeData } from '@/sanity/queries/home'

type Props = {
  data: HomeData
}

export default function HomeClientComponent({ data }: Props) {
  return (
    <main className="relative bg-brand-navy overflow-x-clip">
      {/* ── Fundo orgânico unificado — orbs flutuantes através de todas as seções ── */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-[110vh] left-[-10%] w-[1100px] h-[1100px] rounded-full bg-brand-orange/[0.10] blur-[160px]" />
        <div className="absolute top-[310vh] right-[-10%] w-[1100px] h-[1100px] rounded-full bg-brand-orange/[0.10] blur-[160px]" />
        <div className="absolute top-[520vh] left-[20%] w-[1100px] h-[1100px] rounded-full bg-brand-orange/[0.10] blur-[160px]" />

        <div className="absolute top-[160vh] right-[-20%] w-[900px] h-[900px] rounded-full bg-[#004E69]/30 blur-[140px]" />
        <div className="absolute top-[420vh] left-[-10%] w-[800px] h-[800px] rounded-full bg-brand-teal/[0.05] blur-[140px]" />

        <div
          className="absolute top-[100vh] left-0 right-0 bottom-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
            backgroundSize: '80px 80px',
            maskImage:
              'linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)',
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-navy/20 to-brand-navy/40" />
      </div>

      {/* Seções Sanity — uma por arquivo em ./[NomeDaSecao]Section.tsx */}
      <HeroSection hero={data?.hero} />
      <ParceirosSection parceiros={data?.parceiros} />
      <EcossistemaSection ecossistema={data?.ecossistema} timeline={data?.timeline} />
      <PilaresSection pilares={data?.pilares} />

      {/* Seções ainda hardcoded — migradas seção por seção */}
      <InaitecWebsite />
    </main>
  )
}
