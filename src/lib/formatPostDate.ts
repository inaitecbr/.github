const MESES_PT = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']

/** ISO 8601 → "28 jul 2025". Tolerante a valores ausentes/inválidos. */
export function formatPostDate(iso?: string | null): string {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  // Usa UTC (datas gravadas ao meio-dia UTC) para não virar o dia.
  return `${d.getUTCDate()} ${MESES_PT[d.getUTCMonth()]} ${d.getUTCFullYear()}`
}
