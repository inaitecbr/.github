import type { ProgramaCard, StatusKey } from '@/sanity/queries/programa'

type StatusInput = Pick<ProgramaCard, 'statusKey' | 'deadline'>

/**
 * Chamada marcada como "aberta" no CMS, mas com deadline já vencido.
 * O statusKey é editado manualmente no Studio e pode ficar defasado —
 * o site nunca deve exibir uma chamada vencida como aberta.
 */
export function isChamadaExpirada(p: StatusInput): boolean {
  return (
    p.statusKey === 'aberta' &&
    !!p.deadline &&
    new Date(p.deadline).getTime() <= Date.now()
  )
}

/** Status efetivo para exibição: "aberta" com prazo vencido vira "fechada". */
export function effectiveStatusKey(p: StatusInput): StatusKey | undefined {
  return isChamadaExpirada(p) ? 'fechada' : p.statusKey
}
