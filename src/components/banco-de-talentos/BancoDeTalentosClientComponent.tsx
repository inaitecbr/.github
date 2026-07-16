'use client'

import HeroSection from './HeroSection'
import OQueESection from './OQueESection'
import ParaCandidatosSection from './ParaCandidatosSection'
import ParaEmpresasSection from './ParaEmpresasSection'
import NumerosSection from './NumerosSection'
import CtaCadastroSection from './CtaCadastroSection'
import type { BancoDeTalentosData } from '@/sanity/queries/bancoDeTalentos'

type Props = { data: BancoDeTalentosData }

export default function BancoDeTalentosClientComponent({ data }: Props) {
  return (
    <main className="relative bg-brand-navy overflow-clip">
      {/* Fundo orgânico */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-[40vh] left-[-10%] w-[1000px] h-[1000px] rounded-full bg-[#4A9EE0]/[0.10] blur-[160px]" />
        <div className="absolute top-[170vh] right-[-15%] w-[1100px] h-[1100px] rounded-full bg-brand-orange/[0.08] blur-[160px]" />
      </div>

      <HeroSection hero={data?.hero} />
      <OQueESection oQueE={data?.oQueE} />
      <ParaCandidatosSection paraCandidatos={data?.paraCandidatos} />
      <ParaEmpresasSection paraEmpresas={data?.paraEmpresas} />
      <NumerosSection numeros={data?.numeros} />
      <CtaCadastroSection ctaFinal={data?.ctaFinal} />
    </main>
  )
}
