'use client'

import { useState, useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import AnimatedCounter from './AnimatedCounter'

type TimelineEvent = {
  year: string
  title: string
  desc: string
  metrics: Array<{ value: string; label: string }>
}

const AUTOPLAY_MS = 6000
const RING_RADIUS = 22
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS

export default function TimelineCinematic({
  theme = 'light',
  showHeader = true,
}: {
  theme?: 'light' | 'dark'
  showHeader?: boolean
}) {
  const t = useTranslations('TimelineCinematic')
  const events = t.raw('events') as TimelineEvent[]

  const [active, setActive] = useState(events.length - 1)
  const [isPaused, setIsPaused] = useState(false)
  const [progress, setProgress] = useState(0)
  const isDark = theme === 'dark'
  const scrollRef = useRef<HTMLDivElement>(null)

  // Autoplay — avança progress em tempo real, quando chega em 1 avança o ativo
  useEffect(() => {
    if (isPaused) return
    const start = Date.now()
    const id = setInterval(() => {
      const p = Math.min((Date.now() - start) / AUTOPLAY_MS, 1)
      setProgress(p)
      if (p >= 1) {
        setActive((a) => (a - 1 + events.length) % events.length)
      }
    }, 40)
    return () => clearInterval(id)
  }, [active, isPaused, events.length])

  // Mobile only: mantém a bolinha ativa colada à direita do container
  useEffect(() => {
    const container = scrollRef.current
    if (!container || typeof window === 'undefined') return
    if (window.matchMedia('(min-width: 640px)').matches) return

    const target = container.querySelector<HTMLElement>(`[data-year="${events[active].year}"]`)
    if (!target) return

    const buttonRight = target.offsetLeft + target.offsetWidth
    const targetScroll = Math.max(0, buttonRight - container.clientWidth)
    container.scrollTo({ left: targetScroll, behavior: 'smooth' })
  }, [active, events])

  const goto = (i: number) => {
    setActive(i)
    setProgress(0)
  }

  return (
    <div
      className={showHeader ? 'mt-24' : ''}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >

      {/* Cabeçalho opcional */}
      {showHeader && (
        <>
          <div className="mb-4 inline-flex items-center gap-2">
            <span className="block h-px w-8 bg-[#FA8400]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FA8400]">
              {t('header.eyebrow')}
            </span>
          </div>
          <h3 className={`font-extrabold text-display-lg leading-tight mb-10 tracking-tight max-w-2xl ${isDark ? 'text-white' : 'text-text-heading'}`}>
            {t('header.titleStart')} <span className="text-[#FA8400]">{t('header.titleHighlight')}</span> {t('header.titleEnd')}
          </h3>
        </>
      )}

      {/* Linha do tempo — anos */}
      <div className="relative pb-2">
        <div
          ref={scrollRef}
          className="@container overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:overflow-visible sm:snap-none"
        >
          <div className="relative flex w-max sm:w-auto sm:justify-between">
            {/* Linha base — guia visual apenas */}
            <div className={`absolute top-[26px] left-0 right-0 h-[2px] rounded-full ${isDark ? 'bg-white/10' : 'bg-[#E8E6E1]'}`} />

            {events.map((e, i) => {
              const isActive = i === active
              return (
                <button
                  key={e.year}
                  data-year={e.year}
                  onClick={() => goto(i)}
                  className="flex flex-col items-center gap-3 group transition-opacity duration-300 w-[25cqw] shrink-0 snap-end sm:w-auto sm:shrink"
                >
                {/* Wrapper do ponto com anel de progresso */}
                <div className="relative w-[54px] h-[54px] flex items-center justify-center">

                  {/* Pulse ring quando ativo */}
                  {isActive && (
                    <div
                      className="absolute inset-0 rounded-full bg-[#FA8400]/30"
                      style={{ animation: 'pulse-ring 2s ease-in-out infinite' }}
                    />
                  )}

                  {/* Anel SVG de progresso (só no ativo + não pausado) */}
                  {isActive && (
                    <svg
                      className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
                      viewBox="0 0 54 54"
                    >
                      <circle
                        cx="27" cy="27" r={RING_RADIUS}
                        fill="none"
                        stroke={isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,78,105,0.15)'}
                        strokeWidth="2"
                      />
                      <circle
                        cx="27" cy="27" r={RING_RADIUS}
                        fill="none"
                        stroke="#FA8400"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeDasharray={RING_CIRCUMFERENCE}
                        strokeDashoffset={RING_CIRCUMFERENCE * (1 - progress)}
                        style={{ transition: isPaused ? 'stroke-dashoffset 0.3s' : 'none' }}
                      />
                    </svg>
                  )}

                  {/* Ponto */}
                  <div
                    className={[
                      'relative w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all duration-300',
                      isActive
                        ? 'bg-[#FA8400] border-[#FA8400] scale-110 shadow-lg shadow-[#FA8400]/40'
                        : isDark
                          ? 'bg-[#0D2E38] border-white/25 group-hover:border-[#FA8400] group-hover:bg-[#FA8400]/10'
                          : 'bg-white border-[#E8E6E1] group-hover:border-[#FA8400] group-hover:bg-[#FA8400]/5',
                    ].join(' ')}
                  >
                    {isActive && (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>
                </div>

                {/* Ano */}
                <span
                  className={[
                    'text-sm font-bold transition-colors tracking-wide',
                    isActive
                      ? 'text-[#FA8400]'
                      : isDark
                        ? 'text-white/50 group-hover:text-white'
                        : 'text-text-muted group-hover:text-[#004E69]',
                  ].join(' ')}
                >
                  {e.year}
                </span>
              </button>
            )
          })}
          </div>
        </div>
      </div>

      {/* Card do evento ativo */}
      <div
        key={active}
        className="mt-8 flex flex-col md:flex-row gap-1 rounded-2xl overflow-hidden md:h-[360px] shadow-2xl"
        style={{ animation: 'card-reveal 500ms ease-out' }}
      >

        {/* Texto */}
        <div className={`relative flex-1 p-6 md:p-8 lg:p-10 flex flex-col min-w-0 overflow-hidden ${isDark ? 'bg-white/5 backdrop-blur-md border border-white/10' : 'bg-[#F5F4EF]'}`}>
          {/* Ano grande decorativo — edge to edge no card */}
          <span className={`absolute -bottom-4 inset-x-0 text-center text-[clamp(7rem,28vw,16rem)] font-extrabold select-none leading-none pointer-events-none tracking-tighter whitespace-nowrap ${isDark ? 'text-white/[0.04]' : 'text-[#004E69]/[0.045]'}`}>
            {events[active].year}
          </span>

          {/* Topo: eyebrow + título */}
          <div className="relative">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="block h-px w-8 bg-[#FA8400]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#FA8400]">
                {t('marcoLabel', { year: events[active].year })}
              </span>
            </div>
            <h4 className={`font-extrabold text-[1.5rem] md:text-[1.875rem] xl:text-[2.25rem] break-words leading-[1.05] tracking-tight ${isDark ? 'text-white' : 'text-text-heading'}`}>
              {events[active].title}
            </h4>
          </div>

          {/* Meio: descrição */}
          <p className={`relative mt-4 text-[13px] md:text-[14px] leading-relaxed break-words flex-1 max-w-2xl ${isDark ? 'text-white/70' : 'text-text-body'}`}>
            {events[active].desc}
          </p>

          {/* Rodapé: métricas do período — grandes e destacadas */}
          <div className={`relative grid grid-cols-3 gap-3 sm:gap-6 pt-5 border-t mt-5 ${isDark ? 'border-white/10' : 'border-[#E8E6E1]/80'}`}>
            {events[active].metrics.map((m) => (
              <div key={m.label} className="flex flex-col gap-1.5 min-w-0">
                <span className={`text-lg sm:text-2xl md:text-display-lg font-extrabold leading-none tracking-tight whitespace-nowrap ${isDark ? 'text-[#FA8400]' : 'text-[#004E69]'}`}>
                  <AnimatedCounter key={`${active}-${m.label}`} value={m.value} />
                </span>
                <span className={`text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.15em] leading-tight ${isDark ? 'text-white/55' : 'text-text-muted'}`}>
                  {m.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Imagem */}
        <div className="hidden md:block w-[35%] shrink-0 bg-[#0D2E38] relative overflow-hidden">
          <img
            src="/hero-pedra-branca.jpg"
            alt={t('imageAlt')}
            className="absolute inset-0 w-full h-full object-cover opacity-75 scale-105 transition-transform duration-[3000ms] hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#004E69]/70 via-transparent to-[#FA8400]/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D2E38]/80 via-transparent to-transparent" />
        </div>
      </div>

      {/* Navegação com play/pause */}
      <div className="mt-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-[#004E69]'}`}>
            {String(active + 1).padStart(2, '0')}
          </span>
          <span className={`text-xs ${isDark ? 'text-white/40' : 'text-text-muted/60'}`}>
            / {String(events.length).padStart(2, '0')}
          </span>
          <span className={`ml-3 text-[10px] uppercase tracking-[0.2em] font-semibold ${isDark ? 'text-white/50' : 'text-text-muted'}`}>
            {isPaused ? t('status.paused') : t('status.playing')}
          </span>
        </div>

        <div className="flex gap-2">
          {/* Play/Pause */}
          <button
            onClick={() => setIsPaused((p) => !p)}
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${isDark ? 'bg-[#FA8400] text-white hover:bg-[#FFB560]' : 'bg-[#004E69] text-white hover:bg-[#FA8400]'}`}
            aria-label={isPaused ? t('aria.play') : t('aria.pause')}
          >
            {isPaused ? (
              <Play className="w-4 h-4 ml-0.5" fill="currentColor" stroke="none" />
            ) : (
              <Pause className="w-4 h-4" fill="currentColor" stroke="none" />
            )}
          </button>

          {/* Prev */}
          <button
            onClick={() => goto(Math.max(0, active - 1))}
            disabled={active === 0}
            className={`w-11 h-11 rounded-full border flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#FA8400] hover:text-[#FA8400] hover:bg-[#FA8400]/10 transition-all ${isDark ? 'border-white/20 text-white' : 'border-[#E8E6E1] text-[#004E69]'}`}
            aria-label={t('aria.prev')}
          >
            <ChevronLeft strokeWidth={2.5} className="w-4 h-4" />
          </button>

          {/* Next */}
          <button
            onClick={() => goto(Math.min(events.length - 1, active + 1))}
            disabled={active === events.length - 1}
            className={`w-11 h-11 rounded-full border flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#FA8400] hover:text-[#FA8400] hover:bg-[#FA8400]/10 transition-all ${isDark ? 'border-white/20 text-white' : 'border-[#E8E6E1] text-[#004E69]'}`}
            aria-label={t('aria.next')}
          >
            <ChevronRight strokeWidth={2.5} className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
