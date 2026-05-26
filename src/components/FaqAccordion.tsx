'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'

export type FaqItem = { q: string; a: string }

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div>
      {items.map((item, i) => {
        const isOpen = open === i
        const isFirst = i === 0
        const isLast = i === items.length - 1
        return (
          <div
            key={i}
            className={[
              'border-b border-white/[0.06] last:border-b-0 transition-all duration-300',
              isOpen ? 'bg-white/[0.02]' : 'hover:bg-white/[0.015]',
              isOpen && isFirst ? 'rounded-t-2xl' : '',
              isOpen && isLast ? 'rounded-b-2xl' : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-4 px-4 py-5 sm:px-7 sm:py-6 text-left group"
            >
              <span
                className={`text-[16px] font-semibold transition-colors ${
                  isOpen ? 'text-white' : 'text-white/85 group-hover:text-white'
                }`}
              >
                {item.q}
              </span>
              <span
                className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isOpen
                    ? 'bg-brand-orange text-white rotate-45 shadow-lg shadow-brand-orange/30'
                    : 'bg-white/[0.08] text-white/70 group-hover:bg-white/15 group-hover:text-white border border-white/10'
                }`}
              >
                <Plus strokeWidth={2.5} className="w-3.5 h-3.5" />
              </span>
            </button>
            {isOpen && (
              <div className="px-4 pb-5 sm:px-7 sm:pb-6 -mt-2">
                <p className="text-sm text-white/65 leading-relaxed max-w-2xl">{item.a}</p>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
