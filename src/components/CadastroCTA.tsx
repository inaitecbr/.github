import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

type Tipo = 'candidato' | 'empresa'

type Variant = 'solid' | 'outline'

/**
 * CTA do Banco de Talentos — redireciona para /fale-conosco
 * (origem identifica candidato vs empresa para contexto/analytics).
 */
export default function CadastroCTA({
  tipo,
  label,
  variant = 'solid',
  className,
  showArrow = true,
}: {
  tipo: Tipo
  label: string
  variant?: Variant
  className?: string
  showArrow?: boolean
}) {
  const base =
    'inline-flex items-center gap-2 rounded-full text-sm font-semibold px-7 py-4 transition-all duration-300'

  const variantCls =
    variant === 'solid'
      ? 'bg-brand-orange text-white hover:bg-[#FF9B26] hover:shadow-xl hover:shadow-brand-orange/40 shadow-lg shadow-brand-orange/25'
      : 'border border-white/30 bg-white/5 backdrop-blur-sm text-white hover:bg-white/10 hover:border-white/50'

  return (
    <Link
      href={`/fale-conosco?origem=banco-talentos-${tipo}`}
      className={[base, variantCls, className].filter(Boolean).join(' ')}
    >
      {label}
      {showArrow && <ArrowRight strokeWidth={2.5} className="w-4 h-4" />}
    </Link>
  )
}
