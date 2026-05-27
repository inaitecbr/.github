import type { TragaSuaEmpresaData } from '@/sanity/queries/tragaSuaEmpresa'
import HeroSection from './HeroSection'
import PerksSection from './PerksSection'
import InfraestruturaSection from './InfraestruturaSection'
import PorQueSection from './PorQueSection'
import CtaFinalSection from '@/components/CtaFinalSection'

type Props = { data: TragaSuaEmpresaData }

export default function TragaSuaEmpresaClientComponent({ data }: Props) {
  return (
    <main className="relative bg-brand-navy overflow-x-clip">

      {/* ── Fundo orgânico ─────────────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-[40vh] left-[-10%] w-[1000px] h-[1000px] rounded-full bg-brand-orange/[0.10] blur-[160px]" />
        <div className="absolute top-[170vh] right-[-15%] w-[1100px] h-[1100px] rounded-full bg-brand-teal/[0.06] blur-[160px]" />
        <div className="absolute top-[300vh] left-[15%] w-[900px] h-[900px] rounded-full bg-brand-orange/[0.08] blur-[160px]" />
        <div className="absolute top-[440vh] right-[-10%] w-[800px] h-[800px] rounded-full bg-[#004E69]/40 blur-[150px]" />
      </div>

      <HeroSection hero={data?.hero} />
      <PerksSection perks={data?.perks} beneficios={data?.beneficios} />
      <InfraestruturaSection infraestrutura={data?.infraestrutura} />
      <PorQueSection porQue={data?.porQue} />
      <CtaFinalSection data={data?.ctaFinal} />
    </main>
  )
}
