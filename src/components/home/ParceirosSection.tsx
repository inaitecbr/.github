'use client'

import { Fragment } from 'react'
import Image from 'next/image'
import { Section } from '@/components/Section'
import type { HomeParceiros } from '@/sanity/queries/home'

type Props = {
  parceiros?: HomeParceiros
}

export default function ParceirosSection({ parceiros }: Props) {
  if (!parceiros) return null

  const hasGroups = parceiros.groups && parceiros.groups.length > 0
  const hasTitle = parceiros.title || parceiros.titleHighlight

  if (!hasTitle && !hasGroups) return null

  return (
    <Section
      padding="md"
      containerClassName="grid lg:grid-cols-[auto_1fr] gap-10 lg:gap-16 items-center"
    >
      {hasTitle && (
        <h2 className="font-extrabold text-white text-display-lg tracking-tight text-center lg:text-left">
          {parceiros.title}
          {parceiros.title && parceiros.titleHighlight && <br />}
          {parceiros.titleHighlight && (
            <span className="italic font-medium text-brand-orange">
              {parceiros.titleHighlight}
            </span>
          )}
          .
        </h2>
      )}

      {hasGroups && (
        <ul className="flex flex-col items-center gap-10 sm:flex-row sm:items-center sm:justify-center sm:gap-12 lg:justify-end lg:gap-16">
          {parceiros.groups!.map((group, i) => (
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
  )
}
