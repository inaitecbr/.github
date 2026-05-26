'use client'

import { useState } from 'react'
import { Check, ChevronLeft, ChevronRight } from 'lucide-react'
import AnimatedCounter from './AnimatedCounter'

const events = [
  {
    year: '2009',
    title: 'Fundação do Inaitec',
    desc: 'Nasce o hub de inovação no Parque Tecnológico Pedra Branca, com a missão de conectar startups, empresas e governo em um ecossistema único.',
    metric: '1ª sede',
  },
  {
    year: '2013',
    title: 'Primeiros programas de aceleração',
    desc: 'Lançamento das primeiras turmas de aceleração, formando startups com mentoria intensiva e conexão com o mercado catarinense.',
    metric: '12 startups',
  },
  {
    year: '2016',
    title: 'Missões Internacionais',
    desc: 'Expansão global com as primeiras missões ao Vale do Silício e Europa, abrindo portas para startups brasileiras em mercados internacionais.',
    metric: '3 países',
  },
  {
    year: '2019',
    title: '+100 empresas no ecossistema',
    desc: 'Marco de 100 empresas instaladas no parque, consolidando o Pedra Branca como o maior ecossistema de inovação urbano do Brasil.',
    metric: '+100 empresas',
  },
  {
    year: '2021',
    title: 'Inovação Aberta com Corporações',
    desc: 'Estruturação dos programas de inovação aberta, conectando grandes empresas e setor público a soluções desenvolvidas pelas startups do hub.',
    metric: '20 corporações',
  },
  {
    year: '2026',
    title: 'Onde o Inaitec está hoje',
    desc: '17 anos de ecossistema consolidado. Mais de 300 startups aceleradas, R$3,5 bilhões em negócios gerados e 1,7 milhão de m² de área de inovação em plena operação.',
    metric: 'R$3,5Bi gerados',
  },
]

export default function Timeline({ theme = 'light' }: { theme?: 'light' | 'dark' }) {
  const [active, setActive] = useState(events.length - 1)
  const isDark = theme === 'dark'

  return (
    <div className="mt-24">
      <div className="mb-4 inline-flex items-center gap-2">
        <span className="block h-px w-8 bg-brand-orange" />
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-orange">
          Nossa trajetória
        </span>
      </div>
      <h3 className={`font-extrabold text-display-lg leading-tight mb-10 tracking-tight max-w-2xl ${isDark ? 'text-white' : 'text-text-heading'}`}>
        15 anos construindo o <span className="text-brand-orange">maior ecossistema</span> de inovação do Sul
      </h3>

      {/* Linha do tempo — anos */}
      <div className="relative flex items-start gap-0">

        {/* Trilho dos pontos — ocupa ~90% da largura */}
        <div className="relative flex-1">
          {/* Linha base */}
          <div className={`absolute top-[18px] left-0 right-0 h-px ${isDark ? 'bg-white/15' : 'bg-border'}`} />
          {/* Linha de progresso */}
          <div
            className={`absolute top-[18px] left-0 h-px transition-all duration-500 ${isDark ? 'bg-brand-orange' : 'bg-[#004E69]'}`}
            style={{ width: `${(active / (events.length - 1)) * 100}%` }}
          />

          <div className="relative flex justify-between">
            {events.map((e, i) => (
              <button
                key={e.year}
                onClick={() => setActive(i)}
                className={[
                  'flex flex-col items-center gap-2 group transition-opacity duration-300',
                  i > active ? 'opacity-40 hover:opacity-70' : 'opacity-100',
                ].join(' ')}
              >
                {/* Ponto */}
                <div
                  className={[
                    'w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all duration-300 z-10',
                    isDark
                      ? i <= active
                        ? 'bg-brand-orange border-brand-orange'
                        : 'bg-brand-navy border-white/25 group-hover:border-brand-orange'
                      : i <= active
                        ? 'bg-[#004E69] border-[#004E69]'
                        : 'bg-white border-border group-hover:border-[#004E69]',
                  ].join(' ')}
                >
                  {i < active && (
                    <Check strokeWidth={2.5} className="w-4 h-4 text-white" />
                  )}
                  {i === active && (
                    <div className="w-2.5 h-2.5 rounded-full bg-white" />
                  )}
                </div>
                {/* Ano */}
                <span
                  className={[
                    'text-xs font-semibold transition-colors',
                    isDark
                      ? i <= active ? 'text-white' : 'text-white/40'
                      : i <= active ? 'text-[#004E69]' : 'text-text-muted',
                  ].join(' ')}
                >
                  {e.year}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Continuação pontilhada após 2026 */}

      </div>

      {/* Card do evento ativo */}
      <div className="mt-8 flex gap-1 rounded-3xl overflow-hidden h-80 shadow-sm">

        {/* Texto — ocupa o espaço restante */}
        <div className={`relative flex-1 p-10 flex flex-col min-w-0 overflow-hidden ${isDark ? 'bg-white/5 backdrop-blur-md border border-white/10' : 'bg-[#F5F4EF]'}`}>
          {/* Ano grande de fundo — decorativo */}
          <span className={`absolute -bottom-6 -left-2 text-[9rem] font-extrabold select-none leading-none pointer-events-none tracking-tighter ${isDark ? 'text-white/[0.05]' : 'text-[#004E69]/[0.055]'}`}>
            {events[active].year}
          </span>

          {/* Topo: eyebrow + título */}
          <div className="relative">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="block h-px w-6 bg-brand-orange" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-orange">
                {events[active].year}
              </span>
            </div>
            <h4 className={`font-extrabold text-2xl break-words leading-snug tracking-tight ${isDark ? 'text-white' : 'text-text-heading'}`}>
              {events[active].title}
            </h4>
          </div>

          {/* Meio: descrição */}
          <p className={`relative mt-4 text-[15px] leading-relaxed break-words flex-1 ${isDark ? 'text-white/70' : 'text-text-body'}`}>
            {events[active].desc}
          </p>

          {/* Rodapé: métrica */}
          <div className={`relative flex flex-col gap-1 pt-5 border-t mt-6 ${isDark ? 'border-white/10' : 'border-border/80'}`}>
            <span className={`text-[10px] font-semibold uppercase tracking-widest ${isDark ? 'text-white/50' : 'text-text-muted'}`}>
              marco do período
            </span>
            <span className={`text-3xl font-extrabold ${isDark ? 'text-brand-orange' : 'text-[#004E69]'}`}>
              <AnimatedCounter key={active} value={events[active].metric} />
            </span>
          </div>
        </div>

        {/* Imagem */}
        <div className="w-[35%] shrink-0 bg-brand-navy relative overflow-hidden">
          <img
            src="/hero-pedra-branca.jpg"
            alt="Parque Tecnológico Pedra Branca"
            className="absolute inset-0 w-full h-full object-cover opacity-70 transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#004E69]/80 via-[#004E69]/20 to-transparent" />
        </div>
      </div>

      {/* Navegação */}
      <div className="mt-5 flex items-center justify-between">
        <span className={`text-xs ${isDark ? 'text-white/60' : 'text-text-muted'}`}>
          {events[active].year}
          <span className={`ml-2 ${isDark ? 'text-white/30' : 'text-text-muted/50'}`}>
            — {String(active + 1).padStart(2, '0')} / {String(events.length).padStart(2, '0')}
          </span>
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => setActive(Math.max(0, active - 1))}
            disabled={active === 0}
            className={`w-10 h-10 rounded-full border flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:border-brand-orange hover:text-brand-orange hover:bg-brand-orange/5 transition-all ${isDark ? 'border-white/20 text-white' : 'border-border text-[#004E69]'}`}
            aria-label="Ano anterior"
          >
            <ChevronLeft strokeWidth={2} className="w-4 h-4" />
          </button>
          <button
            onClick={() => setActive(Math.min(events.length - 1, active + 1))}
            disabled={active === events.length - 1}
            className={`w-10 h-10 rounded-full border flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:border-brand-orange hover:text-brand-orange hover:bg-brand-orange/5 transition-all ${isDark ? 'border-white/20 text-white' : 'border-border text-[#004E69]'}`}
            aria-label="Próximo ano"
          >
            <ChevronRight strokeWidth={2} className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
