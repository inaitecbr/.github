import type { Metadata } from 'next'
import Link from 'next/link'
import BrandPattern from '@/components/BrandPattern'
import ChamadasLista from '@/components/ChamadasLista'
import { Section, Container } from '@/components/Section'

export const metadata: Metadata = {
  title: 'Chamadas Abertas',
  description:
    'Todas as seleções abertas do Inaitec — programas, editais e parcerias. Encontre a oportunidade certa para sua startup, empresa ou pesquisa.',
}

export default function ChamadasPage() {
  return (
    <main>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-[#0D2E38] pt-[108px] pb-16">
        <BrandPattern className="absolute inset-0 opacity-[0.03]" />

        <Container className="relative">
          <div className="max-w-3xl pt-14">
            <div className="mb-5 inline-flex items-center gap-2">
              <span className="block h-px w-8 bg-[#FA8400]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FA8400]">
                Chamadas Abertas
              </span>
            </div>
            <h1 className="font-extrabold text-white text-display-2xl leading-[1.1] tracking-tight mb-6">
              Encontre a oportunidade{' '}
              <span className="italic font-medium text-[#FA8400]">certa para você</span>.
            </h1>
            <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-2xl">
              Todos os programas, editais e parcerias do Inaitec com inscrições abertas ou em
              fluxo contínuo — em um só lugar. Para quem sabe que quer participar, mas ainda
              está escolhendo por onde começar.
            </p>
          </div>
        </Container>
      </section>

      {/* ── Lista de chamadas ── */}
      <ChamadasLista />

      {/* ── CTA ── */}
      <Section padding="md" className="bg-[#0D2E38]">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0D2E38] via-[#004E69] to-[#0D2E38] p-8 sm:p-12 md:p-20">
            <div className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full bg-[#FA8400]/15 blur-[140px]" />
            <div className="absolute -bottom-32 -left-20 w-[400px] h-[400px] rounded-full bg-[#FA8400]/10 blur-[120px]" />
            <div className="relative grid lg:grid-cols-[1fr_auto] gap-10 items-center">
              <div>
                <h2 className="font-extrabold text-white text-display-xl leading-[1.2] tracking-tight">
                  Não encontrou{' '}
                  <span className="italic font-medium text-[#FA8400]">o que procurava</span>?
                </h2>
                <p className="mt-6 text-white/65 text-base leading-relaxed">
                  Nossa equipe pode te orientar sobre qual programa faz mais sentido para o
                  seu momento. Sem compromisso — só uma conversa.
                </p>
              </div>
              <div className="w-full flex flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 sm:shrink-0">
                <Link
                  href="/fale-conosco"
                  className="inline-flex items-center justify-center rounded-full bg-[#FA8400] text-white text-sm font-semibold px-7 py-4 hover:bg-[#FF9B26] hover:shadow-xl hover:shadow-[#FA8400]/40 transition-all duration-300 shadow-lg shadow-[#FA8400]/25"
                >
                  Falar com a equipe
                </Link>
                <Link
                  href="/programas"
                  className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/5 backdrop-blur-sm text-white text-sm font-semibold px-7 py-4 hover:bg-white/10 hover:border-white/50 transition-all duration-300"
                >
                  Ver todos os programas
                </Link>
              </div>
            </div>
          </div>
      </Section>
    </main>
  )
}
