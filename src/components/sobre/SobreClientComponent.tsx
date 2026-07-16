import type { SobreData } from '@/sanity/queries/sobre'
import HeroSection from './HeroSection'
import QuemSomosSection from './QuemSomosSection'
import HistoriaSection from './HistoriaSection'
import LiderancaSection from './LiderancaSection'
import RelatorioSection from './RelatorioSection'
import MediaKitSection from './MediaKitSection'
import EstruturaSection from './EstruturaSection'
import CtaFinalSection from '@/components/CtaFinalSection'

type Props = {
  data: SobreData
}

export default function SobreClientComponent({ data }: Props) {
  return (
    <main className="relative bg-brand-navy overflow-x-clip">

      {/* ── Fundo orgânico unificado ──────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-[40vh] left-[-10%] w-[1000px] h-[1000px] rounded-full bg-brand-orange/[0.10] blur-[160px]" />
        <div className="absolute top-[180vh] right-[-15%] w-[1100px] h-[1100px] rounded-full bg-brand-teal/[0.06] blur-[160px]" />
        <div className="absolute top-[320vh] left-[15%] w-[900px] h-[900px] rounded-full bg-brand-orange/[0.08] blur-[160px]" />
        <div className="absolute top-[460vh] right-[-10%] w-[800px] h-[800px] rounded-full bg-[#004E69]/40 blur-[150px]" />

        {/* Grid sutil global — só aparece após a hero */}
        <div
          className="absolute top-[700px] left-0 right-0 bottom-0 opacity-[0.025]"
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
      </div>

      <HeroSection hero={data?.hero} />
      <QuemSomosSection quemSomos={data?.quemSomos} />
      <HistoriaSection historia={data?.historia} />
      <LiderancaSection lideranca={data?.lideranca} />
      <RelatorioSection relatorio={data?.relatorio} />
      <MediaKitSection mediaKit={data?.mediaKit} />
      <EstruturaSection estrutura={data?.estrutura} />
      <CtaFinalSection data={data?.ctaFinal} />
    </main>
  )
}
