import { Download } from 'lucide-react'
import { Section } from '@/components/Section'
import type { SobreMediaKit } from '@/sanity/queries/sobre'

type Props = {
  mediaKit?: SobreMediaKit
}

export default function MediaKitSection({ mediaKit }: Props) {
  if (!mediaKit) return null

  return (
    <Section padding="md">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-8 sm:p-10 lg:p-12">
        <div className="pointer-events-none absolute -top-24 -right-16 w-[360px] h-[360px] rounded-full bg-brand-orange/[0.10] blur-[120px]" />

        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            {mediaKit.eyebrow && (
              <div className="mb-4 inline-flex items-center gap-2">
                <span className="block h-px w-8 bg-brand-orange" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-orange">
                  {mediaKit.eyebrow}
                </span>
              </div>
            )}
            <h2 className="font-extrabold text-white text-display-lg leading-[1.2] tracking-tight">
              {mediaKit.titleStart && <>{mediaKit.titleStart}{' '}</>}
              {mediaKit.titleHighlight && (
                <span className="italic font-medium text-brand-orange">{mediaKit.titleHighlight}</span>
              )}
            </h2>
            {mediaKit.desc && (
              <p className="mt-4 text-white/65 text-base leading-relaxed">{mediaKit.desc}</p>
            )}
          </div>

          {mediaKit.ctaLabel && (
            <a
              href={mediaKit.ctaHref ?? '#'}
              className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-brand-orange text-white text-sm font-semibold px-7 py-4 shadow-lg shadow-brand-orange/25 transition-all hover:bg-[#FF9B26] hover:shadow-xl hover:shadow-brand-orange/40 lg:w-auto shrink-0"
            >
              <Download strokeWidth={2} className="w-4 h-4" />
              {mediaKit.ctaLabel}
            </a>
          )}
        </div>
      </div>
    </Section>
  )
}
