import type { Metadata } from 'next'
import Link from 'next/link'
import ConteudoHub from '@/components/ConteudoHub'
import { Section } from '@/components/Section'

export const metadata: Metadata = {
  title: 'Conteúdo',
  description:
    'Notícias, cases de sucesso, conquistas e eventos do ecossistema Inaitec — o hub de inovação do Parque Pedra Branca.',
}

export default function ConteudoPage() {
  return (
    <main>
      <ConteudoHub />

      {/* ── CTA ── */}
      <Section padding="md" className="bg-brand-navy">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-brand-navy via-[#004E69] to-brand-navy p-8 sm:p-12 md:p-20">
            <div className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full bg-brand-orange/20 blur-[140px]" />
            <div className="absolute -bottom-32 -left-20 w-[400px] h-[400px] rounded-full bg-brand-teal/10 blur-[120px]" />

            <div className="relative grid lg:grid-cols-[1fr_auto] gap-10 items-center">
              <div>
                <h2 className="font-extrabold text-white text-display-xl leading-[1.2] tracking-tight">
                  Quer fazer parte das{' '}
                  <span className="italic font-medium text-brand-orange">próximas histórias</span>?
                </h2>
                <p className="mt-6 text-white/65 text-base leading-relaxed">
                  Conheça os programas de aceleração e descubra como o Inaitec pode impulsionar
                  o crescimento da sua startup ou empresa.
                </p>
              </div>
              <div className="w-full flex flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 sm:shrink-0">
                <Link
                  href="/programas"
                  className="inline-flex items-center justify-center rounded-full bg-brand-orange text-white text-sm font-semibold px-7 py-4 hover:bg-[#FF9B26] hover:shadow-xl hover:shadow-brand-orange/40 transition-all duration-300 shadow-lg shadow-brand-orange/25"
                >
                  Ver programas
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
