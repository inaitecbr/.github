'use client'

import { useState } from 'react'
import { Check, ChevronDown } from 'lucide-react'

const THEMES = {
  light: {
    border: 'border-brand-navy/10',
    headingText: 'text-brand-navy',
    optionInactive: 'text-brand-navy/65 group-hover:text-brand-navy',
    optionActive: 'text-brand-navy font-semibold',
    chevron: 'text-brand-navy/40 group-hover:text-brand-navy',
    countText: 'text-brand-navy/40',
    boxInactive: 'border-brand-navy/25 group-hover:border-brand-orange/60 bg-white',
  },
  dark: {
    border: 'border-white/10',
    headingText: 'text-white',
    optionInactive: 'text-white/65 group-hover:text-white',
    optionActive: 'text-white font-semibold',
    chevron: 'text-white/40 group-hover:text-white',
    countText: 'text-white/40',
    boxInactive: 'border-white/25 group-hover:border-brand-orange/60 bg-transparent',
  },
} as const

export type SidebarFilterProps = {
  label: string
  options: readonly string[]
  active: readonly string[]
  onChange: (v: string) => void
  counts?: Record<string, number>
  labels?: Record<string, string>
  theme?: 'light' | 'dark'
  defaultOpen?: boolean
}

export default function SidebarFilter({
  label,
  options,
  active,
  onChange,
  counts,
  labels,
  theme = 'light',
  defaultOpen = true,
}: SidebarFilterProps) {
  const [open, setOpen] = useState(defaultOpen)
  const t = THEMES[theme]
  return (
    <div className={`border-t ${t.border} first:border-t-0 py-4`}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full group"
      >
        <span className={`text-[14px] font-bold inline-flex items-center gap-2 ${t.headingText}`}>
          {label}
          {active.length > 0 && (
            <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] rounded-full bg-brand-orange text-white text-[10px] font-bold px-1.5">
              {active.length}
            </span>
          )}
        </span>
        <ChevronDown
          strokeWidth={2.5}
          className={`w-4 h-4 transition-transform ${t.chevron} ${open ? '' : '-rotate-90'}`}
        />
      </button>
      {open && (
        <ul className="flex flex-col gap-2 mt-3">
          {options.map((opt) => {
            const isActive = active.includes(opt)
            const count = counts?.[opt]
            return (
              <li key={opt}>
                <button
                  onClick={() => onChange(opt)}
                  className="group flex items-center gap-2.5 w-full text-left"
                >
                  <span
                    className={`relative shrink-0 w-[16px] h-[16px] rounded-[4px] border transition-all ${
                      isActive ? 'bg-brand-orange border-brand-orange' : t.boxInactive
                    }`}
                  >
                    {isActive && (
                      <Check
                        strokeWidth={3}
                        className="absolute inset-0 w-full h-full text-white p-[2px]"
                      />
                    )}
                  </span>
                  <span
                    className={`text-[13px] flex-1 transition-colors ${
                      isActive ? t.optionActive : t.optionInactive
                    }`}
                  >
                    {labels?.[opt] ?? opt}
                    {count !== undefined && (
                      <span className={`${t.countText} font-normal ml-1`}>({count})</span>
                    )}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
