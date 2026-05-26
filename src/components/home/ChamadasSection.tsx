'use client'

import { useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import CountdownTimer from '@/components/CountdownTimer'
import { Section } from '@/components/Section'
import type { HomeChamadas } from '@/sanity/queries/home'
import type { ProgramaCard, PublicoKey } from '@/sanity/queries/programa'
import { PUBLICO_COLORS } from '@/lib/programa-config'

type Props = {
  chamadas?: HomeChamadas
}

const LOCALE_MAP: Record<string, string> = {
  pt: 'pt-BR',
  en: 'en-US',
  es: 'es-ES',
}

function timeLeft(iso: string) {
  const diff = Math.max(0, new Date(iso).getTime() - Date.now())
  return {
    dias: Math.floor(diff / 86400000),
    hrs: Math.floor((diff % 86400000) / 3600000),
  }
}

function formatDeadline(iso: string, locale: string) {
  return new Date(iso).toLocaleDateString(LOCALE_MAP[locale] ?? locale, {
    day: '2-digit',
    month: 'short',
  })
}

export default function ChamadasSection({ chamadas }: Props) {
  const t = useTranslations('ChamadasAbertasDestaque')
  const locale = useLocale()
  const items: ProgramaCard[] = chamadas?.items ?? []
  const [hero, ...secondary] = items
  const trackRef = useRef<HTMLDivElement>(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)

  const heroTarget = useMemo(
    () => (hero?.deadline ? new Date(hero.deadline) : null),
    [hero?.deadline],
  )

  if (!chamadas || !hero) return null

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

  const heroHref = hero.slug ? `/programas/${hero.slug}` : '/programas'

  return (
    <Section theme="light" padding="md" className="overflow-hidden" containerClassName="relative">
      <div className="mb-14">
        {(chamadas.titleStart || chamadas.titleHighlight) && (
          <h2 className="font-extrabold text-brand-navy text-display-2xl leading-[1.2] tracking-tight">
            {chamadas.titleStart}
            {chamadas.titleStart && chamadas.titleHighlight && ' '}
            {chamadas.titleHighlight && (
              <span className="text-brand-orange italic font-medium">
                {chamadas.titleHighlight}
              </span>
            )}
          </h2>
        )}
        {chamadas.desc && (
          <p className="mt-4 text-brand-navy/65 text-[15px] leading-relaxed max-w-xl">
            {chamadas.desc}
          </p>
        )}
      </div>

      {chamadas.eyebrow && (
        <div className="flex items-center gap-3 mb-6">
          <span className="inline-flex w-2 h-2 rounded-full bg-brand-teal animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-teal">
            {chamadas.eyebrow}
          </span>
        </div>
      )}

      <Link
        href={heroHref}
        className="group block rounded-2xl bg-white overflow-hidden mb-6 hover:shadow-2xl hover:shadow-black/[0.08] transition-shadow duration-500"
      >
        <div className="flex flex-col md:flex-row min-h-[360px] md:min-h-[420px]">
          <div className="w-full md:w-1/2 relative min-h-[260px] md:min-h-0 overflow-hidden">
            {hero.imageUrl && (
              <img
                src={hero.imageUrl}
                alt={hero.name ?? ''}
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
          </div>
          <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-4">
              {hero.publicoKey && (
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-orange">
                  {/* eslint-disable-next-line react/jsx-no-undef */}
                  <PublicoLabel publicoKey={hero.publicoKey} />
                </span>
              )}
              {hero.name && (
                <h3 className="text-brand-navy text-[1.8rem] font-extrabold leading-tight">
                  {hero.name}
                </h3>
              )}
              {hero.desc && (
                <p className="text-brand-navy/60 text-sm leading-relaxed">{hero.desc}</p>
              )}
            </div>
            <div className="flex flex-col gap-5">
              {heroTarget && (
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-brand-navy/45 mb-3">
                    {t('tempoRestante')}
                  </p>
                  <CountdownTimer target={heroTarget} />
                </div>
              )}
              <span className="inline-flex items-center gap-2 self-start rounded-full bg-brand-orange text-white text-sm font-bold px-7 py-4 shadow-lg shadow-brand-orange/25 group-hover:shadow-xl group-hover:shadow-brand-orange/40 transition-all">
                {t('inscreverAgora')}
              </span>
            </div>
          </div>
        </div>
      </Link>

      {secondary.length > 0 && (
        <div className="relative">
          <div
            ref={trackRef}
            onScroll={onScroll}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {secondary.map((p) => {
              const accent = p.publicoKey ? PUBLICO_COLORS[p.publicoKey] : 'var(--color-brand-orange)'
              const isAberta = p.statusKey === 'aberta' && !!p.deadline
              const tl = isAberta ? timeLeft(p.deadline!) : null
              const isUrgent = isAberta && tl!.dias <= 14
              const href = p.slug ? `/programas/${p.slug}` : '/programas'

              return (
                <Link
                  key={p._id}
                  href={href}
                  className="group snap-start flex-none w-[280px] sm:w-[calc((100%-16px)/2)] lg:w-[calc((100%-48px)/4)] rounded-2xl bg-white border border-border overflow-hidden flex flex-col hover:border-brand-orange/40 hover:shadow-lg hover:shadow-black/[0.06] hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="relative h-44 overflow-hidden bg-border shrink-0">
                    {p.imageUrl && (
                      <img
                        src={p.imageUrl}
                        alt={p.name ?? ''}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-700"
                      />
                    )}
                    {!isAberta && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                    )}
                  </div>

                  <div className="p-6 flex flex-col gap-3 flex-1">
                    {p.publicoKey && (
                      <div className="inline-flex items-center gap-2">
                        <span className="block w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent }} />
                        <span className="text-[9px] font-bold uppercase tracking-[0.2em]" style={{ color: accent }}>
                          <PublicoLabel publicoKey={p.publicoKey} />
                        </span>
                      </div>
                    )}

                    {p.name && (
                      <h3 className="text-brand-navy text-[1.1rem] font-extrabold leading-snug group-hover:text-brand-orange transition-colors">
                        {p.name}
                      </h3>
                    )}

                    {p.desc && (
                      <p className="text-brand-navy/55 text-[13px] leading-relaxed line-clamp-2">{p.desc}</p>
                    )}

                    <div className="mt-auto pt-5 border-t border-[#F0EFEA]">
                      {isAberta ? (
                        <>
                          <p
                            className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-2 ${isUrgent ? 'text-red-500' : 'text-brand-navy/45'}`}
                          >
                            {isUrgent
                              ? t('encerraEmBreve', { date: formatDeadline(p.deadline!, locale) })
                              : t('encerraEm', { date: formatDeadline(p.deadline!, locale) })}
                          </p>
                          <div className="flex items-end justify-between gap-3">
                            <div className="flex items-baseline gap-4">
                              <div className="flex items-baseline gap-1.5">
                                <span
                                  className={`text-[1.65rem] font-extrabold tabular-nums leading-none ${isUrgent ? 'text-red-500' : 'text-brand-navy'}`}
                                >
                                  {String(tl!.dias).padStart(2, '0')}
                                </span>
                                <span
                                  className={`text-[11px] font-bold ${isUrgent ? 'text-red-500/75' : 'text-brand-navy/55'}`}
                                >
                                  {t('dias')}
                                </span>
                              </div>
                              <div className="flex items-baseline gap-1.5">
                                <span
                                  className={`text-[1.15rem] font-bold tabular-nums leading-none ${isUrgent ? 'text-red-500/85' : 'text-brand-navy/65'}`}
                                >
                                  {String(tl!.hrs).padStart(2, '0')}
                                </span>
                                <span
                                  className={`text-[11px] font-bold ${isUrgent ? 'text-red-500/60' : 'text-brand-navy/45'}`}
                                >
                                  {t('horas')}
                                </span>
                              </div>
                            </div>
                            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#F5F4EF] group-hover:bg-brand-orange transition-all shrink-0">
                              <ArrowRight
                                strokeWidth={2.5}
                                className="w-3 h-3 text-brand-navy group-hover:text-white transition-colors"
                              />
                            </span>
                          </div>
                        </>
                      ) : (
                        <div className="flex items-end justify-between gap-3">
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2 text-brand-navy/45">
                              {t('inscricoes')}
                            </p>
                            <p className="text-[1.15rem] font-extrabold leading-none text-brand-navy">
                              {t('emBreve')}
                            </p>
                          </div>
                          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#F5F4EF] group-hover:bg-brand-orange transition-all shrink-0">
                            <ArrowRight
                              strokeWidth={2.5}
                              className="w-3 h-3 text-brand-navy group-hover:text-white transition-colors"
                            />
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
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-[#004E69] hover:border-brand-orange hover:text-brand-orange hover:bg-brand-orange/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft strokeWidth={2.5} className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll(1)}
              disabled={!canNext}
              aria-label={t('aria.next')}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-[#004E69] hover:border-brand-orange hover:text-brand-orange hover:bg-brand-orange/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight strokeWidth={2.5} className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </Section>
  )
}

function PublicoLabel({ publicoKey }: { publicoKey: PublicoKey }) {
  const t = useTranslations('Programa.publico')
  return <>{t(publicoKey)}</>
}
