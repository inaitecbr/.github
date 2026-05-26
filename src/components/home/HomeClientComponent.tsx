'use client'

import { Fragment } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import AnimatedCounter from '@/components/AnimatedCounter'
import InaitecWebsite from '@/components/InaitecWebsite'
import { Container, Section } from '@/components/Section'
import type { HomeData } from '@/sanity/queries/home'

type Props = {
  data: HomeData
}

export default function HomeClientComponent({ data }: Props) {
  const hero = data?.hero

  return (
    <main className="relative bg-brand-navy overflow-x-clip">
      {/* ── Fundo orgânico unificado — orbs flutuantes através de todas as seções ── */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-[110vh] left-[-10%] w-[1100px] h-[1100px] rounded-full bg-brand-orange/[0.10] blur-[160px]" />
        <div className="absolute top-[310vh] right-[-10%] w-[1100px] h-[1100px] rounded-full bg-brand-orange/[0.10] blur-[160px]" />
        <div className="absolute top-[520vh] left-[20%] w-[1100px] h-[1100px] rounded-full bg-brand-orange/[0.10] blur-[160px]" />

        <div className="absolute top-[160vh] right-[-20%] w-[900px] h-[900px] rounded-full bg-[#004E69]/30 blur-[140px]" />
        <div className="absolute top-[420vh] left-[-10%] w-[800px] h-[800px] rounded-full bg-brand-teal/[0.05] blur-[140px]" />

        <div
          className="absolute top-[100vh] left-0 right-0 bottom-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
            backgroundSize: '80px 80px',
            maskImage:
              'linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)',
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-navy/20 to-brand-navy/40" />
      </div>

      {/* ── Hero full-screen com vídeo (Sanity) ─────────────────────────── */}
      <section className="relative h-dvh w-full overflow-hidden z-10">
        {hero?.videoUrl && (
          <video
            src={hero.videoUrl}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/70 via-brand-navy/50 to-brand-navy/90 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.5))] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_52%,rgba(13,46,56,0.55)_0%,transparent_100%)] pointer-events-none" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 pt-[68px] pb-32">
          {(hero?.titleStart || hero?.titleHighlight) && (
            <h1 className="font-extrabold text-white text-display-3xl leading-[0.95] tracking-tight max-w-5xl drop-shadow-xl">
              {hero?.titleStart}
              {hero?.titleStart && hero?.titleHighlight && ' '}
              {hero?.titleHighlight && (
                <span className="italic font-medium text-brand-orange tracking-tight">
                  {hero.titleHighlight}
                </span>
              )}
            </h1>
          )}

          {hero?.subtitle && (
            <p className="mt-8 max-w-2xl text-white/80 text-[15px] md:text-base leading-relaxed">
              {hero.subtitle}
            </p>
          )}

          {(hero?.ctaPrimary?.label || hero?.ctaSecondary?.label) && (
            <div className="mt-10 w-full flex flex-col items-stretch gap-4 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
              {hero?.ctaPrimary?.label && (
                <Link
                  href={hero.ctaPrimary.href || '#'}
                  className="group inline-flex items-center justify-center rounded-full bg-brand-orange text-white text-sm font-semibold px-7 py-4 hover:bg-[#FF9B26] hover:shadow-xl hover:shadow-brand-orange/40 transition-all duration-300 shadow-lg shadow-brand-orange/25"
                >
                  {hero.ctaPrimary.label}
                </Link>
              )}
              {hero?.ctaSecondary?.label && (
                <Link
                  href={hero.ctaSecondary.href || '#'}
                  className="group inline-flex items-center justify-center rounded-full border border-white/40 bg-white/10 backdrop-blur-sm text-white text-sm font-semibold px-7 py-4 hover:bg-white hover:text-brand-navy hover:border-white transition-all duration-300"
                >
                  {hero.ctaSecondary.label}
                </Link>
              )}
            </div>
          )}
        </div>

        {hero?.metrics && hero.metrics.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-white/10 bg-brand-navy/50 backdrop-blur-md">
            <Container className="py-6 grid grid-cols-2 gap-y-6 md:grid-cols-4 md:gap-y-0 md:divide-x md:divide-white/10">
              {hero.metrics.map((m, i) => (
                <div
                  key={`${m.label ?? ''}-${i}`}
                  className="flex flex-col items-center gap-1 md:py-0 md:px-6"
                >
                  {m.value && (
                    <span className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                      <AnimatedCounter value={m.value} />
                    </span>
                  )}
                  {m.label && (
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50 text-center">
                      {m.label}
                    </span>
                  )}
                </div>
              ))}
            </Container>
          </div>
        )}
      </section>

      {/* ── Parceiros — Mantenedores + Apoiadores (Sanity) ────────────── */}
      {data?.parceiros &&
        (data.parceiros.title ||
          data.parceiros.titleHighlight ||
          (data.parceiros.groups && data.parceiros.groups.length > 0)) && (
          <Section
            padding="md"
            containerClassName="grid lg:grid-cols-[auto_1fr] gap-10 lg:gap-16 items-center"
          >
            {(data.parceiros.title || data.parceiros.titleHighlight) && (
              <h2 className="font-extrabold text-white text-display-lg tracking-tight text-center lg:text-left">
                {data.parceiros.title}
                {data.parceiros.title && data.parceiros.titleHighlight && <br />}
                {data.parceiros.titleHighlight && (
                  <span className="italic font-medium text-brand-orange">
                    {data.parceiros.titleHighlight}
                  </span>
                )}
                .
              </h2>
            )}

            {data.parceiros.groups && data.parceiros.groups.length > 0 && (
              <ul className="flex flex-col items-center gap-10 sm:flex-row sm:items-center sm:justify-center sm:gap-12 lg:justify-end lg:gap-16">
                {data.parceiros.groups.map((group, i) => (
                  <Fragment key={group._key ?? group.label ?? i}>
                    {i > 0 && (
                      <li
                        aria-hidden
                        className="hidden sm:block w-px h-10 bg-white/15 shrink-0"
                      />
                    )}
                    <li className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
                      {group.label && (
                        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/45 shrink-0">
                          {group.label}
                        </span>
                      )}
                      {group.logos && group.logos.length > 0 && (
                        <div className="flex items-center gap-8 sm:gap-10">
                          {group.logos.map(
                            (logo, j) =>
                              logo.imageUrl && (
                                <Image
                                  key={logo._key ?? logo.alt ?? j}
                                  src={logo.imageUrl}
                                  alt={logo.alt ?? ''}
                                  width={180}
                                  height={48}
                                  className="h-16 sm:h-12 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
                                  style={{ filter: 'brightness(0) invert(1)' }}
                                />
                              ),
                          )}
                        </div>
                      )}
                    </li>
                  </Fragment>
                ))}
              </ul>
            )}
          </Section>
        )}

      {/* ── Restante da Home (ainda hardcoded — migrar seção por seção) ── */}
      <InaitecWebsite />
    </main>
  )
}
