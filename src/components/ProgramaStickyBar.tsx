'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Container } from '@/components/Section'

type Props = {
  nome: string
  deadline: string
  ctaHref?: string
  /** Pixels rolados antes da barra aparecer. Default: 600. */
  threshold?: number
}

function calcCompactTime(target: Date) {
  const diff = Math.max(0, target.getTime() - Date.now())
  const dias = Math.floor(diff / 86400000)
  const hrs = Math.floor((diff % 86400000) / 3600000)
  const min = Math.floor((diff % 3600000) / 60000)
  return { dias, hrs, min }
}

export default function ProgramaStickyBar({
  nome,
  deadline,
  ctaHref = '/fale-conosco',
  threshold = 600,
}: Props) {
  const [visible, setVisible] = useState(false)
  // Acompanha o header: escondido (scroll p/ baixo) → barra colada no topo;
  // header visível (scroll p/ cima ou topo) → barra abaixo do header.
  const [headerHidden, setHeaderHidden] = useState(false)
  const [time, setTime] = useState(() => calcCompactTime(new Date(deadline)))
  const lastScrollY = useRef(0)

  useEffect(() => {
    const target = new Date(deadline)
    lastScrollY.current = window.scrollY
    const handleScroll = () => {
      const y = window.scrollY
      setVisible(y > threshold)
      const delta = y - lastScrollY.current
      if (Math.abs(delta) >= 6) {
        if (y < 80) setHeaderHidden(false)
        else if (delta > 0) setHeaderHidden(true)
        else setHeaderHidden(false)
        lastScrollY.current = y
      }
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    const id = setInterval(() => setTime(calcCompactTime(target)), 60000)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearInterval(id)
    }
  }, [deadline, threshold])

  return (
    <div
      className={`fixed left-0 right-0 z-40 transition-all duration-300 ${
        headerHidden ? 'top-0' : 'top-[68px]'
      } ${
        visible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
      }`}
      aria-hidden={!visible}
    >
      <div className="bg-brand-navy/95 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20">
        <Container className="py-3 flex items-center justify-between gap-4">

          {/* Left: status + nome */}
          <div className="flex items-center gap-3 min-w-0">
            <span className="block w-2 h-2 rounded-full bg-brand-teal animate-pulse shrink-0" />
            <span className="hidden sm:inline-flex items-center text-[10px] font-bold uppercase tracking-[0.2em] text-brand-teal leading-none shrink-0">
              Inscrições abertas
            </span>
            <span className="inline-flex items-center text-white text-sm font-semibold leading-none truncate">
              {nome}
            </span>
          </div>

          {/* Right: countdown compacto + CTA */}
          <div className="flex items-center gap-4 shrink-0">
            <div className="hidden md:flex items-center gap-1.5 tabular-nums leading-none">
              <span className="text-white font-extrabold text-sm">{time.dias}d</span>
              <span className="text-white/85 text-sm font-semibold">{String(time.hrs).padStart(2, '0')}h</span>
              <span className="text-white/85 text-sm font-semibold">{String(time.min).padStart(2, '0')}m</span>
            </div>
            <Link
              href={ctaHref}
              className="inline-flex h-10 items-center justify-center rounded-full bg-brand-orange text-white text-xs sm:text-sm font-semibold leading-none px-5 hover:bg-[#FF9B26] hover:shadow-xl hover:shadow-brand-orange/40 transition-all duration-300 shadow-lg shadow-brand-orange/25"
            >
              Inscrever agora
            </Link>
          </div>
        </Container>
      </div>
    </div>
  )
}
