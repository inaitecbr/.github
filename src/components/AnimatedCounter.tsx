'use client'

import { useEffect, useRef, useState } from 'react'

type Props = {
  value: string
  duration?: number
}

/**
 * Anima qualquer valor numérico encontrado dentro da string.
 * Mantém prefixos/sufixos (ex.: "+300", "R$3,5Bi", "1,7M m²") intactos.
 */
export default function AnimatedCounter({ value, duration = 1800 }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(value)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (!ref.current || hasAnimated) return

    const node = ref.current
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          animate()
        }
      },
      { threshold: 0.4 },
    )
    obs.observe(node)
    return () => obs.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasAnimated])

  const animate = () => {
    // Extrai o primeiro número da string
    const match = value.match(/[\d]+([,.]\d+)?/)
    if (!match) return setDisplay(value)
    const numericString = match[0]
    const target = parseFloat(numericString.replace(',', '.'))
    const decimals = numericString.includes(',') ? 1 : 0

    const start = performance.now()

    const tick = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      // easeOutQuart
      const eased = 1 - Math.pow(1 - progress, 4)
      const current = target * eased

      const formatted = decimals
        ? current.toFixed(decimals).replace('.', ',')
        : Math.floor(current).toString()

      setDisplay(value.replace(numericString, formatted))

      if (progress < 1) requestAnimationFrame(tick)
      else setDisplay(value)
    }
    requestAnimationFrame(tick)
  }

  return <span ref={ref}>{display}</span>
}
