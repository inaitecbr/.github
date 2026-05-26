'use client'

import { useEffect, useRef, useState } from 'react'

export type Etapa = {
  titulo: string
  desc: string
  duracao?: string
}

type Props = {
  etapas: Etapa[]
  accent: string
}

export default function TimelineEtapas({ etapas, accent }: Props) {
  const ref = useRef<HTMLOListElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Tempo total da animação da linha = duração do último item + sua delay
  const lineDurationMs = etapas.length * 120 + 800

  return (
    <ol ref={ref} className="relative max-w-3xl flex flex-col gap-20">
      {/* Linha vertical — desenha do topo pra base junto com a animação */}
      <span
        aria-hidden
        className="absolute left-6 top-2 bottom-2 w-px bg-brand-navy/15 origin-top transition-transform ease-out"
        style={{
          transform: visible ? 'scaleY(1)' : 'scaleY(0)',
          transitionDuration: `${lineDurationMs}ms`,
        }}
      />

      {etapas.map((e, i) => (
        <li
          key={i}
          className="relative transition-all duration-700 ease-out"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(16px)',
            transitionDelay: visible ? `${i * 120}ms` : '0ms',
          }}
        >
          <div className="flex items-center gap-6">
            <span
              className="relative shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-full font-extrabold text-sm tracking-tight bg-white border-2 z-10"
              style={{ borderColor: accent, color: accent }}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h3 className="text-brand-navy text-xl font-extrabold leading-tight">
                  {e.titulo}
                </h3>
                {e.duracao && (
                  <span
                    className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.15em]"
                    style={{ backgroundColor: `${accent}1A`, color: accent }}
                  >
                    {e.duracao}
                  </span>
                )}
              </div>
              <p className="text-brand-navy/65 text-[15px] leading-relaxed">{e.desc}</p>
            </div>
          </div>
        </li>
      ))}
    </ol>
  )
}
