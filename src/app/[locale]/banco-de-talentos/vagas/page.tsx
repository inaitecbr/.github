import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Container } from '@/components/Section'

export const metadata: Metadata = {
  title: 'Vagas — Banco de Talentos',
  description:
    'Em breve, a listagem completa de vagas abertas nas empresas do ecossistema Inaitec.',
}

export default function VagasPage() {
  return (
    <main className="relative bg-[#0D2E38] min-h-dvh overflow-x-clip">
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-[20vh] left-[-10%] w-[800px] h-[800px] rounded-full bg-[#FA8400]/[0.10] blur-[160px]" />
        <div className="absolute bottom-[10vh] right-[-15%] w-[900px] h-[900px] rounded-full bg-[#4A9EE0]/[0.08] blur-[160px]" />
      </div>

      <section className="relative z-10 min-h-dvh flex items-center py-32">
        <Container>
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2">
              <span className="block h-px w-8 bg-[#FA8400]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FA8400]">
                Banco de Talentos · Vagas
              </span>
            </div>

            <h1 className="font-extrabold text-white text-display-2xl leading-[1.15] tracking-tight">
              Vagas abertas{' '}
              <span className="italic font-medium text-[#FA8400]">em breve</span>.
            </h1>

            <p className="mt-8 text-white/65 text-base leading-relaxed max-w-xl">
              Estamos preparando a listagem completa de vagas das mais de 200 empresas residentes
              no Parque Pedra Branca. Em breve você poderá filtrar por área, modelo de trabalho e
              senioridade direto por aqui.
            </p>

            <p className="mt-4 text-white/55 text-base leading-relaxed max-w-xl">
              Enquanto isso, adiante seu cadastro no Banco de Talentos — assim que as vagas forem
              publicadas, você receberá um aviso por e-mail das que combinarem com seu perfil.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/banco-de-talentos"
                className="inline-flex items-center gap-2 rounded-full bg-[#FA8400] text-white text-sm font-semibold px-7 py-4 hover:bg-[#FF9B26] hover:shadow-xl hover:shadow-[#FA8400]/40 transition-all duration-300 shadow-lg shadow-[#FA8400]/25"
              >
                <ArrowLeft strokeWidth={2.5} className="w-4 h-4" />
                Voltar ao Banco de Talentos
              </Link>
              <Link
                href="/fale-conosco"
                className="inline-flex items-center rounded-full border border-white/30 bg-white/5 backdrop-blur-sm text-white text-sm font-semibold px-7 py-4 hover:bg-white/10 hover:border-white/50 transition-all duration-300"
              >
                Falar com nosso time
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}
