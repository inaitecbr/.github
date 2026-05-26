'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { ArrowUpRight, GraduationCap, Plus, TrendingUp, Workflow, Zap } from 'lucide-react'
import { Container } from '@/components/Section'
import type { HomePilares } from '@/sanity/queries/home'

const INTERVAL = 4000

// Configuração técnica por pilar (não editorial): cor, orb, href, ícone
const PILLAR_ASSETS = [
  {
    accent: 'var(--color-brand-orange)',
    orbPos: 'top-[-20%] right-[-15%]',
    href: '/programas/acelera-pedra-branca',
    icon: <Zap strokeWidth={2} className="w-full h-full" />,
  },
  {
    accent: 'var(--color-brand-teal)',
    orbPos: 'top-[-20%] left-[-15%]',
    href: '/programas/inovacao-aberta',
    icon: <Workflow strokeWidth={2} className="w-full h-full" />,
  },
  {
    accent: '#FFB560',
    orbPos: 'bottom-[-20%] right-[-15%]',
    href: '/programas/pesquisa-aplicada',
    icon: <GraduationCap strokeWidth={2} className="w-full h-full" />,
  },
  {
    accent: 'var(--color-brand-orange)',
    orbPos: 'top-[-25%] right-[-10%]',
    href: '/programas/catalisa-inaitec',
    icon: <TrendingUp strokeWidth={2} className="w-full h-full" />,
  },
]

type Props = {
  pilares?: HomePilares
}

export default function PilaresSection({ pilares }: Props) {
  const t = useTranslations('EcosystemAccordion')

  const pillars = (pilares?.pillars ?? []).map((p, i) => ({
    ...p,
    ...PILLAR_ASSETS[i],
  }))

  const [active, setActive] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (isPaused) {
      if (intervalRef.current) clearInterval(intervalRef.current)
      return
    }
    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % pillars.length)
    }, INTERVAL)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isPaused, pillars.length])

  if (!pilares || !pillars.length) return null

  return (
    <section className="relative pt-16 pb-0 md:pb-16 overflow-hidden">
      {/* Orbs orgânicos de fundo */}
      <div
        className="pointer-events-none absolute top-[5%] right-[-8%] w-[700px] h-[820px] opacity-[0.08]"
        style={{
          background: 'radial-gradient(ellipse at 40% 50%, #FA8400 0%, transparent 65%)',
          borderRadius: '62% 38% 46% 54% / 60% 44% 56% 40%',
          filter: 'blur(50px)',
        }}
      />
      <div
        className="pointer-events-none absolute bottom-[5%] left-[-8%] w-[600px] h-[720px] opacity-[0.06]"
        style={{
          background: 'radial-gradient(ellipse at 60% 50%, #00C08B 0%, transparent 65%)',
          borderRadius: '38% 62% 54% 46% / 44% 56% 40% 60%',
          filter: 'blur(60px)',
        }}
      />
      <div
        className="pointer-events-none absolute top-[45%] left-[30%] w-[500px] h-[600px] opacity-[0.04]"
        style={{
          background: 'radial-gradient(ellipse at 50% 40%, #FFB560 0%, transparent 65%)',
          borderRadius: '54% 46% 38% 62% / 56% 40% 60% 44%',
          filter: 'blur(70px)',
        }}
      />

      <Container className="relative">
        {/* Cabeçalho da seção */}
        <div className="flex flex-wrap items-end justify-between gap-8 mb-8">
          <div className="max-w-3xl">
            {pilares.eyebrow && (
              <div className="mb-4 inline-flex items-center gap-2">
                <span className="block h-px w-8 bg-brand-orange" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-orange">
                  {pilares.eyebrow}
                </span>
              </div>
            )}
            {(pilares.titleStart || pilares.titleHighlight) && (
              <h2 className="font-extrabold text-white text-display-xl leading-[1.15] tracking-tight">
                {pilares.titleStart}
                {pilares.titleStart && pilares.titleHighlight && ' '}
                {pilares.titleHighlight && (
                  <em className="italic font-medium text-brand-orange tracking-tight">
                    {pilares.titleHighlight}
                  </em>
                )}
              </h2>
            )}
          </div>
          {pilares.desc && (
            <p className="text-white/60 text-[14px] leading-relaxed max-w-sm">{pilares.desc}</p>
          )}
        </div>

        {/* Accordion horizontal (desktop) / Cards (mobile) */}
        <div className="-mx-[clamp(1.25rem,4vw+0.5rem,6.75rem)] md:mx-0">
          <div
            className="grid grid-cols-1 gap-0 md:gap-3 md:h-[480px] md:[grid-template-columns:var(--cols)] md:transition-[grid-template-columns] md:duration-700 md:ease-[cubic-bezier(0.4,0,0.2,1)]"
            style={{
              ['--cols' as string]: pillars.map((_, i) => (i === active ? '4fr' : '1fr')).join(' '),
            }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {pillars.map((p, i) => {
              const isOpen = active === i
              return (
                <button
                  key={p.label ?? i}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="relative min-h-dvh md:min-h-0 rounded-none md:rounded-2xl overflow-hidden group text-left"
                  style={{ background: 'linear-gradient(135deg, #0A2530 0%, #0D2E38 100%)' }}
                  aria-label={t('pillarAria', { label: p.label ?? '' })}
                >
                  {/* Orb de glow */}
                  <div
                    className={[
                      'absolute w-[110%] h-[110%] rounded-full blur-3xl pointer-events-none transition-all duration-1000',
                      p.orbPos,
                      isOpen ? 'opacity-25 scale-100' : 'opacity-15 scale-90',
                    ].join(' ')}
                    style={{ backgroundColor: p.accent }}
                  />

                  {/* Padrão de pontos */}
                  <div
                    className="absolute inset-0 opacity-[0.04] pointer-events-none"
                    style={{
                      backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                      backgroundSize: '24px 24px',
                    }}
                  />

                  {/* Glow inferior quando aberto */}
                  <div
                    className={[
                      'absolute -bottom-32 -left-32 w-96 h-96 rounded-full blur-3xl pointer-events-none transition-opacity duration-700',
                      isOpen ? 'opacity-20' : 'opacity-0',
                    ].join(' ')}
                    style={{ backgroundColor: p.accent }}
                  />

                  {/* Ring border */}
                  <div
                    className={[
                      'absolute inset-0 md:rounded-2xl transition-all duration-500 pointer-events-none',
                      isOpen
                        ? 'ring-1 ring-white/10'
                        : 'ring-1 ring-white/[0.06] group-hover:ring-white/20',
                    ].join(' ')}
                  />

                  {/* Estado colapsado */}
                  <div
                    className={[
                      'absolute inset-0 hidden md:flex flex-col items-center justify-between py-8 md:transition-opacity md:duration-500',
                      isOpen ? 'md:opacity-0 md:pointer-events-none' : 'md:opacity-100',
                    ].join(' ')}
                  >
                    <div
                      className="w-11 h-11 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/10 transition-all duration-500 group-hover:scale-110"
                      style={{ backgroundColor: `${p.accent}15`, color: p.accent }}
                    >
                      <div className="w-[18px] h-[18px]">{p.icon}</div>
                    </div>

                    <span className="[writing-mode:vertical-rl] rotate-180 text-[11px] font-bold uppercase tracking-[0.3em] text-white whitespace-nowrap">
                      {p.label}
                    </span>

                    <div className="flex flex-col items-center gap-3">
                      <span className="text-[10px] font-extrabold tracking-[0.25em] text-white/40">
                        0{i + 1}
                      </span>
                      <span className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-white/70 group-hover:rotate-90 group-hover:text-white group-hover:border-white/40 transition-all duration-500">
                        <Plus strokeWidth={2.5} className="w-3 h-3" />
                      </span>
                    </div>
                  </div>

                  {/* Estado aberto */}
                  <div
                    className={[
                      'relative flex flex-col justify-between gap-6 p-6 md:gap-0 md:h-full md:p-8 md:transition-opacity md:duration-500',
                      isOpen ? 'md:opacity-100 md:delay-200' : 'md:opacity-0 md:pointer-events-none',
                    ].join(' ')}
                  >
                    {/* Topo */}
                    <div>
                      <div className="flex flex-col items-start gap-4 mb-6 md:flex-row md:items-start md:justify-between">
                        <div className="flex items-center gap-4">
                          <div
                            className="w-12 h-12 rounded-2xl flex items-center justify-center border border-white/10 backdrop-blur-sm"
                            style={{ backgroundColor: `${p.accent}18`, color: p.accent }}
                          >
                            <div className="w-5 h-5">{p.icon}</div>
                          </div>
                          <div>
                            {p.subtitle && (
                              <div
                                className="text-[10px] font-bold uppercase tracking-[0.25em]"
                                style={{ color: p.accent }}
                              >
                                {p.subtitle}
                              </div>
                            )}
                            <div className="text-white/40 text-[10px] font-semibold tracking-[0.2em] uppercase mt-1">
                              {t('pillarOf', { n: i + 1, total: pillars.length })}
                            </div>
                          </div>
                        </div>

                        <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-3 py-1.5 backdrop-blur-sm">
                          <span className="relative flex w-1.5 h-1.5">
                            <span
                              className="absolute inset-0 rounded-full animate-ping opacity-75"
                              style={{ backgroundColor: p.accent }}
                            />
                            <span
                              className="relative rounded-full w-1.5 h-1.5"
                              style={{ backgroundColor: p.accent }}
                            />
                          </span>
                          <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/70">
                            {t('operacaoAtiva')}
                          </span>
                        </div>
                      </div>

                      {p.label && (
                        <h3 className="text-white font-extrabold text-2xl md:text-3xl tracking-tight mb-3 max-w-lg">
                          {p.label}
                        </h3>
                      )}
                      {p.desc && (
                        <p className="text-white/65 text-[14px] leading-relaxed max-w-lg">{p.desc}</p>
                      )}

                      {p.tags && p.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-5">
                          {p.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] font-semibold uppercase tracking-[0.15em] px-3 py-1.5 rounded-full text-white/70 bg-white/[0.04] border border-white/10"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Rodapé — métrica + CTA */}
                    <div className="border-t border-white/10 pt-6">
                      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between md:gap-4">
                        <div>
                          {p.metric && (
                            <div className="text-display-2xl font-extrabold text-white leading-[0.9] tracking-tight">
                              {p.metric}
                            </div>
                          )}
                          {p.metricLabel && (
                            <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60 mt-2">
                              {p.metricLabel}
                            </div>
                          )}
                        </div>

                        {p.ctaLabel && (
                          <Link
                            href={p.href}
                            className="group/cta inline-flex items-center gap-3 rounded-full pl-1.5 pr-5 py-1.5 border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/20 transition-all"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span
                              className="w-9 h-9 rounded-full flex items-center justify-center text-white transition-transform duration-500 group-hover/cta:rotate-45"
                              style={{ backgroundColor: p.accent }}
                            >
                              <ArrowUpRight strokeWidth={2.5} className="w-3.5 h-3.5" />
                            </span>
                            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white">
                              {p.ctaLabel}
                            </span>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Barra de progresso (desktop only) */}
        <div className="mt-6 hidden md:grid grid-cols-4 gap-3">
          {pillars.map((p, i) => (
            <button
              key={p.label ?? i}
              onClick={() => {
                setActive(i)
                setIsPaused(true)
              }}
              className="flex items-center gap-3 group"
            >
              <span
                className={[
                  'text-[10px] font-bold tracking-[0.25em] transition-colors duration-500',
                  i === active ? 'text-white' : 'text-white/30 group-hover:text-white/60',
                ].join(' ')}
              >
                0{i + 1}
              </span>
              <div className="flex-1 h-[2px] rounded-full bg-white/[0.08] overflow-hidden">
                <div
                  className="h-full transition-all duration-700 ease-out"
                  style={{
                    width: i === active ? '100%' : '0%',
                    backgroundColor: p.accent,
                    opacity: i === active ? 1 : 0,
                  }}
                />
              </div>
            </button>
          ))}
        </div>
      </Container>
    </section>
  )
}
