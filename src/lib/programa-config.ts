import type { PublicoKey, StatusKey } from '@/sanity/queries/programa'

/** Cor de destaque por público — usada em badges, ícones e separadores. */
export const PUBLICO_COLORS: Record<PublicoKey, string> = {
  startups: 'var(--color-brand-orange)',
  empresas: 'var(--color-brand-teal)',
  universidades: '#4A9EE0',
  investidores: '#E9A84A',
}

/** Cor do badge de status (aberta/em-breve/fechada/fluxo-continuo). */
export const STATUS_COLORS: Record<StatusKey, string> = {
  aberta: 'var(--color-brand-teal)',
  'em-breve': 'var(--color-brand-orange)',
  fechada: '#94A3B8',
  'fluxo-continuo': 'var(--color-brand-orange)',
}
