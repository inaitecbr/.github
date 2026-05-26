'use client'

import Link from 'next/link'
import BrandPattern from '@/components/BrandPattern'
import TimelineCinematic from '@/components/TimelineCinematic'
import { Container } from '@/components/Section'
import type { HomeEcossistema, HomeTimeline } from '@/sanity/queries/home'

type Props = {
  ecossistema?: HomeEcossistema
  timeline?: HomeTimeline
}

export default function EcossistemaSection({ ecossistema, timeline }: Props) {
  if (!ecossistema) return null

  const hasContent =
    ecossistema.eyebrow ||
    ecossistema.titleStart ||
    ecossistema.titleHighlight ||
    ecossistema.p1 ||
    ecossistema.p2

  if (!hasContent) return null

  return (
    <section className="relative z-10 min-h-dvh flex flex-col justify-center py-20 overflow-hidden">
      <BrandPattern
        variant="dots"
        color="var(--color-brand-orange)"
        className="absolute top-20 right-0 w-96 h-96 opacity-20 pointer-events-none"
      />

      <Container className="relative">
        {ecossistema.eyebrow && (
          <div className="mb-4 inline-flex items-center gap-2">
            <span className="block h-px w-8 bg-brand-orange" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-orange">
              {ecossistema.eyebrow}
            </span>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
          {(ecossistema.titleStart || ecossistema.titleHighlight) && (
            <h2 className="font-extrabold text-display-lg leading-[1.15] text-white tracking-tight">
              {ecossistema.titleStart}
              {ecossistema.titleStart && ecossistema.titleHighlight && ' '}
              {ecossistema.titleHighlight && (
                <span className="text-brand-orange italic font-medium">
                  {ecossistema.titleHighlight}
                </span>
              )}
            </h2>
          )}

          <div className="flex flex-col gap-3.5 justify-center">
            {ecossistema.p1 && (
              <p className="text-[14px] text-white/70 leading-relaxed">{ecossistema.p1}</p>
            )}
            {ecossistema.p2 && (
              <p className="text-[14px] text-white/70 leading-relaxed">{ecossistema.p2}</p>
            )}
            {ecossistema.ctaLabel && (
              <Link
                href={ecossistema.ctaHref || '/sobre'}
                className="inline-flex items-center text-sm font-semibold text-brand-orange hover:text-[#FF9B26] transition-all self-start"
              >
                {ecossistema.ctaLabel}
              </Link>
            )}
          </div>
        </div>

        <div className="mt-10">
          <TimelineCinematic theme="dark" data={timeline} />
        </div>
      </Container>
    </section>
  )
}
