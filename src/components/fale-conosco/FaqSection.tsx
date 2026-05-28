import { Section } from '@/components/Section'
import FaqAccordion from '@/components/FaqAccordion'
import type { FaleConoscoFaq } from '@/sanity/queries/faleConosco'

type Props = {
  faq?: FaleConoscoFaq
}

export default function FaqSection({ faq }: Props) {
  if (!faq || !faq.items?.length) return null

  const items = faq.items.map((item) => ({ q: item.q ?? '', a: item.a ?? '' }))

  return (
    <Section padding="md" containerClassName="grid lg:grid-cols-[400px_1fr] gap-16">
      <div className="lg:sticky lg:top-28 lg:self-start">
        {faq.eyebrow && (
          <div className="mb-5 inline-flex items-center gap-2">
            <span className="block h-px w-8 bg-brand-orange" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-orange">
              {faq.eyebrow}
            </span>
          </div>
        )}

        <h2 className="font-extrabold text-white text-display-xl leading-[1.2] tracking-tight">
          {faq.titleStart && <>{faq.titleStart}{' '}</>}
          {faq.titleHighlight && (
            <span className="italic font-medium text-brand-orange">{faq.titleHighlight}</span>
          )}
        </h2>

        {faq.desc && (
          <p className="mt-6 text-white/65 text-base leading-relaxed">{faq.desc}</p>
        )}
      </div>

      <FaqAccordion items={items} />
    </Section>
  )
}
