import type { Metadata } from 'next'
import Link from 'next/link'
import BrandPattern from '@/components/BrandPattern'
import EmpresasInstaladas from '@/components/EmpresasInstaladas'
import { Section, Container } from '@/components/Section'

export const metadata: Metadata = {
  title: 'Empresas Instaladas',
  description:
    'Conheça as +200 startups, scale-ups e corporações residentes no Parque Pedra Branca — o maior hub urbano de inovação do Sul do Brasil.',
}

export default function EmpresasInstaladasPage() {
  return (
    <main>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-brand-navy pt-[108px] pb-16">
        <BrandPattern className="absolute inset-0 opacity-[0.03]" />

        <Container className="relative pt-6">
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2">
              <span className="block h-px w-8 bg-brand-orange" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-orange">
                Empresas Instaladas
              </span>
            </div>
            <h1 className="font-extrabold text-white text-display-2xl leading-[1.1] tracking-tight mb-6">
              O ecossistema que{' '}
              <span className="italic font-medium text-brand-orange">cresce junto</span>.
            </h1>
            <p className="text-white/60 text-base md:text-lg leading-relaxed">
              Startups em tração, scale-ups acelerando e corporações inovando — tudo no mesmo
              endereço. Conheça quem faz parte do Parque Pedra Branca.
            </p>
          </div>
        </Container>
      </section>

      {/* ── Catálogo de empresas ── */}
      <EmpresasInstaladas />

      {/* ── CTA ── */}
      <Section padding="md" className="bg-brand-navy">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-brand-navy via-[#004E69] to-brand-navy p-8 sm:p-12 md:p-20">
            <div className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full bg-brand-orange/15 blur-[140px]" />
            <div className="absolute -bottom-32 -left-20 w-[400px] h-[400px] rounded-full bg-brand-teal/10 blur-[120px]" />
            <div className="relative grid lg:grid-cols-[1fr_auto] gap-10 items-center">
              <div>
                <h2 className="font-extrabold text-white text-display-xl leading-[1.2] tracking-tight">
                  Quer fazer parte{' '}
                  <span className="italic font-medium text-brand-orange">desse ecossistema</span>?
                </h2>
                <p className="mt-6 text-white/65 text-base leading-relaxed max-w-xl">
                  Instale sua startup ou empresa no Parque Pedra Branca e acesse infraestrutura,
                  comunidade e programas de aceleração em um só lugar.
                </p>
              </div>
              <div className="w-full flex flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 sm:shrink-0">
                <Link
                  href="/traga-sua-empresa"
                  className="inline-flex items-center justify-center rounded-full bg-brand-orange text-white text-sm font-semibold px-7 py-4 hover:bg-[#FF9B26] hover:shadow-xl hover:shadow-brand-orange/40 transition-all duration-300 shadow-lg shadow-brand-orange/25"
                >
                  Traga sua empresa
                </Link>
                <Link
                  href="/fale-conosco"
                  className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/5 backdrop-blur-sm text-white text-sm font-semibold px-7 py-4 hover:bg-white/10 hover:border-white/50 transition-all duration-300"
                >
                  Fale conosco
                </Link>
              </div>
            </div>
          </div>
      </Section>
    </main>
  )
}
