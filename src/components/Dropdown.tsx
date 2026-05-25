'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'

export type DropdownOption = { value: string; label: string }

type DropdownProps = {
  id?: string
  name?: string
  options: DropdownOption[]
  placeholder?: string
  defaultValue?: string
  className?: string
}

export default function Dropdown({
  id,
  name,
  options,
  placeholder = '---',
  defaultValue = '',
  className = '',
}: DropdownProps) {
  const [value, setValue] = useState(defaultValue)
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClickOutside)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  const selected = options.find((o) => o.value === value)

  return (
    <div ref={ref} className={`relative ${className}`}>
      <input type="hidden" name={name} value={value} />
      <button
        id={id}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="w-full h-12 flex items-center justify-between rounded-xl border border-white/15 bg-white/[0.04] px-4 text-sm text-white hover:bg-white/[0.06] outline-none transition focus:border-[#FA8400] focus:bg-white/[0.06]"
      >
        <span className={selected ? '' : 'text-white/40'}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown
          strokeWidth={2}
          className={`h-4 w-4 text-white/60 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute z-20 left-0 right-0 mt-2 rounded-xl border border-white/10 bg-[#0D2E38] shadow-2xl shadow-black/50 overflow-hidden"
        >
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              role="option"
              aria-selected={opt.value === value}
              onClick={() => {
                setValue(opt.value)
                setOpen(false)
              }}
              className={`w-full text-left px-4 py-3 text-sm transition ${
                opt.value === value
                  ? 'bg-[#FA8400]/15 text-[#FA8400]'
                  : 'text-white/80 hover:bg-white/5'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
