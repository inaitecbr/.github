'use client'

import { useState, useEffect } from 'react'

type TimeLeft = { dias: number; hrs: number; min: number; seg: number }

function calcTimeLeft(target: Date): TimeLeft {
  const diff = Math.max(0, target.getTime() - Date.now())
  return {
    dias: Math.floor(diff / 86400000),
    hrs: Math.floor((diff % 86400000) / 3600000),
    min: Math.floor((diff % 3600000) / 60000),
    seg: Math.floor((diff % 60000) / 1000),
  }
}

type Theme = 'light' | 'dark'
type Variant = 'inline' | 'segments'

export default function CountdownTimer({
  target,
  theme = 'light',
  variant = 'inline',
}: {
  target: Date
  theme?: Theme
  variant?: Variant
}) {
  const [time, setTime] = useState<TimeLeft>(calcTimeLeft(target))

  useEffect(() => {
    const id = setInterval(() => setTime(calcTimeLeft(target)), 1000)
    return () => clearInterval(id)
  }, [target])

  const units = [
    { val: String(time.dias).padStart(2, '0'), label: 'Dias' },
    { val: String(time.hrs).padStart(2, '0'), label: 'Hrs' },
    { val: String(time.min).padStart(2, '0'), label: 'Min' },
    { val: String(time.seg).padStart(2, '0'), label: 'Seg' },
  ]

  const isDark = theme === 'dark'

  if (variant === 'segments') {
    return (
      <div className="grid grid-cols-4 gap-1.5">
        {units.map((u) => (
          <div key={u.label} className="flex flex-col items-start gap-1.5">
            <span
              className={`text-[1.75rem] md:text-[2rem] font-extrabold leading-none tabular-nums ${
                isDark ? 'text-white' : 'text-[#0D2E38]'
              }`}
            >
              {u.val}
            </span>
            <span
              className={`text-[9px] font-bold uppercase tracking-[0.2em] ${
                isDark ? 'text-white/55' : 'text-[#0D2E38]/45'
              }`}
            >
              {u.label}
            </span>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="flex items-end gap-1">
      {units.map((u, i) => (
        <div key={u.label} className="flex items-end gap-1">
          <div className="flex flex-col items-center">
            <span
              className={`text-[1.75rem] font-extrabold leading-none tabular-nums ${
                isDark ? 'text-white' : 'text-[#0D2E38]'
              }`}
            >
              {u.val}
            </span>
            <span
              className={`text-[9px] font-semibold uppercase tracking-widest mt-1.5 ${
                isDark ? 'text-white/55' : 'text-[#0D2E38]/40'
              }`}
            >
              {u.label}
            </span>
          </div>
          {i < units.length - 1 && (
            <span
              className={`text-lg font-bold mb-5 px-0.5 ${
                isDark ? 'text-white/30' : 'text-[#0D2E38]/25'
              }`}
            >
              :
            </span>
          )}
        </div>
      ))}
    </div>
  )
}
