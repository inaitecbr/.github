import type { ProgramaCard, ProgramasPageData } from '@/sanity/queries/programa'
import CtaFinalSection from '@/components/CtaFinalSection'
import HeroSection from './HeroSection'
import CatalogoSection from './CatalogoSection'

type Props = {
  programas: ProgramaCard[]
  pageData: ProgramasPageData
}

export default function ProgramasClientComponent({ programas, pageData }: Props) {
  return (
    <main className="relative bg-brand-navy overflow-x-clip">

      {/* ── Fundo orgânico ─────────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-[40vh] left-[-10%] w-[1000px] h-[1000px] rounded-full bg-brand-orange/[0.10] blur-[160px]" />
        <div className="absolute top-[180vh] right-[-15%] w-[1100px] h-[1100px] rounded-full bg-brand-teal/[0.06] blur-[160px]" />
        <div className="absolute top-[320vh] left-[15%] w-[900px] h-[900px] rounded-full bg-brand-orange/[0.08] blur-[160px]" />
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

      <HeroSection hero={pageData?.hero} count={programas.length} />
      <CatalogoSection programas={programas} />
      <CtaFinalSection data={pageData?.ctaFinal} />
    </main>
  )
}
