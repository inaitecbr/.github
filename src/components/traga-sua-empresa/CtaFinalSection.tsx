import Link from 'next/link'
import { Section } from '@/components/Section'
import type { TragaCtaFinal } from '@/sanity/queries/tragaSuaEmpresa'

type Props = { ctaFinal?: TragaCtaFinal }

export default function CtaFinalSection({ ctaFinal }: Props) {
  if (!ctaFinal) return null

  return (
    <Section padding="md">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-brand-navy via-[#004E69] to-brand-navy p-8 sm:p-12 md:p-20">
        <div className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full bg-brand-orange/20 blur-[140px]" />
        <div className="absolute -bottom-32 -left-20 w-[400px] h-[400px] rounded-full bg-brand-teal/10 blur-[120px]" />

        <div className="relative grid lg:grid-cols-[1fr_auto] gap-10 items-center">
          <div>
            <h2 className="font-extrabold text-white text-display-xl leading-[1.2] tracking-tight">
              {ctaFinal.titleStart && <>{ctaFinal.titleStart}{' '}</>}
              {ctaFinal.titleHighlight && (
                <span className="italic font-medium text-brand-orange">{ctaFinal.titleHighlight}</span>
              )}
              {ctaFinal.titleEnd && <>{' '}{ctaFinal.titleEnd}</>}
            </h2>
            {ctaFinal.desc && (
              <p className="mt-6 text-white/65 text-base leading-relaxed">{ctaFinal.desc}</p>
            )}
          </div>
          <div className="w-full flex flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 sm:shrink-0">
            {ctaFinal.ctaPrimary?.label && (
              <Link
                href={ctaFinal.ctaPrimary.href ?? '/'}
                className="inline-flex items-center justify-center rounded-full bg-brand-orange text-white text-sm font-semibold px-7 py-4 hover:bg-[#FF9B26] hover:shadow-xl hover:shadow-brand-orange/40 transition-all duration-300 shadow-lg shadow-brand-orange/25"
              >
                {ctaFinal.ctaPrimary.label}
              </Link>
            )}
            {ctaFinal.ctaSecondary?.label && (
              <Link
                href={ctaFinal.ctaSecondary.href ?? '/'}
                className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/5 backdrop-blur-sm text-white text-sm font-semibold px-7 py-4 hover:bg-white/10 hover:border-white/50 transition-all duration-300"
              >
                {ctaFinal.ctaSecondary.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </Section>
  )
}
