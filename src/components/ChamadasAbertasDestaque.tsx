'use client'

import { useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import CountdownTimer from '@/components/CountdownTimer'
import { PROGRAMAS, PUBLICO_COLORS, type Programa } from '@/data/programas'

const PROXIMAS: Programa[] = PROGRAMAS
  .filter((p) => p.status === 'aberta' || p.status === 'em-breve')
  .sort((a, b) => {
    if (a.status !== b.status) return a.status === 'aberta' ? -1 : 1
    if (a.deadline && b.deadline) {
      return new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
    }
    return 0
  })

function timeLeft(iso: string) {
  const diff = Math.max(0, new Date(iso).getTime() - Date.now())
  return {
    dias: Math.floor(diff / 86400000),
    hrs: Math.floor((diff % 86400000) / 3600000),
  }
}

// Mapeia locale do next-intl para BCP-47 usado pelo Intl
const LOCALE_MAP: Record<string, string> = {
  pt: 'pt-BR',
  en: 'en-US',
  es: 'es-ES',
}

function formatDeadline(iso: string, locale: string) {
  return new Date(iso).toLocaleDateString(LOCALE_MAP[locale] ?? locale, {
    day: '2-digit',
    month: 'short',
  })
}

export default function ChamadasAbertasDestaque() {
  const t = useTranslations('ChamadasAbertasDestaque')
  const locale = useLocale()
  const [hero, ...secondary] = PROXIMAS
  const trackRef = useRef<HTMLDivElement>(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)

  const heroTarget = useMemo(
    () => (hero?.deadline ? new Date(hero.deadline) : null),
    [hero?.deadline],
  )

  if (!hero) return null

  const scroll = (dir: 1 | -1) => {
    const el = trackRef.current
    if (!el) return
    const first = el.firstElementChild as HTMLElement | null
    const step = first ? first.offsetWidth + 16 : el.offsetWidth
    el.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

  const onScroll = () => {
    const el = trackRef.current
    if (!el) return
    setCanPrev(el.scrollLeft > 4)
    setCanNext(el.scrollLeft < el.scrollWidth - el.offsetWidth - 4)
  }

  return (
    <>
      {/* Cabeçalho da subseção */}
      <div className="flex items-center gap-3 mb-6">
        <span className="inline-flex w-2 h-2 rounded-full bg-[#00C08B] animate-pulse" />
        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#00C08B]">
          {t('eyebrow')}
        </span>
      </div>

      {/* Hero — chamada mais urgente */}
      <Link
        href={hero.href}
        className="group block rounded-2xl bg-white overflow-hidden mb-6 hover:shadow-2xl hover:shadow-black/[0.08] transition-shadow duration-500"
      >
        <div className="flex flex-col md:flex-row min-h-[360px] md:min-h-[420px]">
          <div className="w-full md:w-1/2 relative min-h-[260px] md:min-h-0 overflow-hidden">
            <img
              src={hero.image}
              alt={hero.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#FA8400]">
                {hero.publico}
              </span>
              <h3 className="text-[#0D2E38] text-[1.8rem] font-extrabold leading-tight">
                {hero.name}
              </h3>
              <p className="text-[#0D2E38]/60 text-sm leading-relaxed">
                {hero.desc}
              </p>
            </div>
            <div className="flex flex-col gap-5">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-[#0D2E38]/45 mb-3">
                  {t('tempoRestante')}
                </p>
                {heroTarget && <CountdownTimer target={heroTarget} />}
              </div>
              <span className="inline-flex items-center gap-2 self-start rounded-full bg-[#FA8400] text-white text-sm font-bold px-7 py-4 shadow-lg shadow-[#FA8400]/25 group-hover:shadow-xl group-hover:shadow-[#FA8400]/40 transition-all">
                {t('inscreverAgora')}
              </span>
            </div>
          </div>
        </div>
      </Link>

      {/* Carrossel — chamadas secundárias (abertas + em-breve) */}
      {secondary.length > 0 && (
        <div className="relative">
          <div
            ref={trackRef}
            onScroll={onScroll}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {secondary.map((p) => {
              const accent = PUBLICO_COLORS[p.publico]
              const isAberta = p.status === 'aberta' && !!p.deadline
              const tl = isAberta ? timeLeft(p.deadline!) : null
              const isUrgent = isAberta && tl!.dias <= 14

              return (
                <Link
                  key={p.slug}
                  href={p.href}
                  className="group snap-start flex-none w-[280px] sm:w-[calc((100%-16px)/2)] lg:w-[calc((100%-48px)/4)] rounded-2xl bg-white border border-[#E8E6E1] overflow-hidden flex flex-col hover:border-[#FA8400]/40 hover:shadow-lg hover:shadow-black/[0.06] hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="relative h-44 overflow-hidden bg-[#E8E6E1] shrink-0">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-700"
                    />
                    {!isAberta && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                    )}
                  </div>

                  <div className="p-6 flex flex-col gap-3 flex-1">
                    <div className="inline-flex items-center gap-2">
                      <span className="block w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent }} />
                      <span className="text-[9px] font-bold uppercase tracking-[0.2em]" style={{ color: accent }}>
                        {p.publico}
                      </span>
                    </div>

                    <h3 className="text-[#0D2E38] text-[1.1rem] font-extrabold leading-snug group-hover:text-[#FA8400] transition-colors">
                      {p.name}
                    </h3>

                    <p className="text-[#0D2E38]/55 text-[13px] leading-relaxed line-clamp-2">
                      {p.desc}
                    </p>

                    <div className="mt-auto pt-5 border-t border-[#F0EFEA]">
                      {isAberta ? (
                        <>
                          <p className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-2 ${isUrgent ? 'text-red-500' : 'text-[#0D2E38]/45'}`}>
                            {isUrgent
                              ? t('encerraEmBreve', { date: formatDeadline(p.deadline!, locale) })
                              : t('encerraEm', { date: formatDeadline(p.deadline!, locale) })}
                          </p>
                          <div className="flex items-end justify-between gap-3">
                            <div className="flex items-baseline gap-4">
                              <div className="flex items-baseline gap-1.5">
                                <span className={`text-[1.65rem] font-extrabold tabular-nums leading-none ${isUrgent ? 'text-red-500' : 'text-[#0D2E38]'}`}>
                                  {String(tl!.dias).padStart(2, '0')}
                                </span>
                                <span className={`text-[11px] font-bold ${isUrgent ? 'text-red-500/75' : 'text-[#0D2E38]/55'}`}>
                                  {t('dias')}
                                </span>
                              </div>
                              <div className="flex items-baseline gap-1.5">
                                <span className={`text-[1.15rem] font-bold tabular-nums leading-none ${isUrgent ? 'text-red-500/85' : 'text-[#0D2E38]/65'}`}>
                                  {String(tl!.hrs).padStart(2, '0')}
                                </span>
                                <span className={`text-[11px] font-bold ${isUrgent ? 'text-red-500/60' : 'text-[#0D2E38]/45'}`}>
                                  {t('horas')}
                                </span>
                              </div>
                            </div>
                            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#F5F4EF] group-hover:bg-[#FA8400] transition-all shrink-0">
                              <ArrowRight strokeWidth={2.5} className="w-3 h-3 text-[#0D2E38] group-hover:text-white transition-colors" />
                            </span>
                          </div>
                        </>
                      ) : (
                        <div className="flex items-end justify-between gap-3">
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2 text-[#0D2E38]/45">
                              {t('inscricoes')}
                            </p>
                            <p className="text-[1.15rem] font-extrabold leading-none text-[#0D2E38]">
                              {t('emBreve')}
                            </p>
                          </div>
                          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#F5F4EF] group-hover:bg-[#FA8400] transition-all shrink-0">
                            <ArrowRight strokeWidth={2.5} className="w-3 h-3 text-[#0D2E38] group-hover:text-white transition-colors" />
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>

          <div className="hidden md:flex gap-2 mt-5 justify-end">
            <button
              onClick={() => scroll(-1)}
              disabled={!canPrev}
              aria-label={t('aria.prev')}
              className="w-10 h-10 rounded-full border border-[#E8E6E1] flex items-center justify-center text-[#004E69] hover:border-[#FA8400] hover:text-[#FA8400] hover:bg-[#FA8400]/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft strokeWidth={2.5} className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll(1)}
              disabled={!canNext}
              aria-label={t('aria.next')}
              className="w-10 h-10 rounded-full border border-[#E8E6E1] flex items-center justify-center text-[#004E69] hover:border-[#FA8400] hover:text-[#FA8400] hover:bg-[#FA8400]/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight strokeWidth={2.5} className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
