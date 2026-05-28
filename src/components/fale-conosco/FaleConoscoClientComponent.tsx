import type { FaleConoscoData } from '@/sanity/queries/faleConosco'
import HeroSection from './HeroSection'
import CanaisSection from './CanaisSection'
import EnderecoSection from './EnderecoSection'
import FaqSection from './FaqSection'

type Props = {
  data: FaleConoscoData
}

export default function FaleConoscoClientComponent({ data }: Props) {
  return (
    <main className="relative bg-brand-navy overflow-x-clip">

      {/* Fundo orgânico */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-[20vh] left-[-10%] w-[900px] h-[900px] rounded-full bg-brand-orange/[0.09] blur-[160px]" />
      </div>

      <HeroSection hero={data?.hero} />
      <CanaisSection canais={data?.canais} />
      <EnderecoSection endereco={data?.endereco} />
      <FaqSection faq={data?.faq} />
    </main>
  )
}
