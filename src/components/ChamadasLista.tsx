'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import SidebarFilter from '@/components/SidebarFilter'
import { Section } from '@/components/Section'
import {
  PROGRAMAS,
  PUBLICO_COLORS,
  type Publico,
  type Entrada,
} from '@/data/programas'

type Prazo = 'urgente' | 'mes' | 'continuo'

const PUBLICOS: Publico[] = [
  'Startups e Pequenas Empresas',
  'Grandes e Médias Empresas',
  'Universidades e Governo',
  'Investidores',
]

const PUBLICO_LABELS: Record<Publico, string> = {
  'Startups e Pequenas Empresas': 'Startups',
  'Grandes e Médias Empresas': 'Empresas',
  'Universidades e Governo': 'Universidades e Governo',
  Investidores: 'Investidores',
}

const TIPOS: Entrada[] = ['Edital', 'Inscrição contínua', 'Parceria', 'Convite']

const PRAZOS: Prazo[] = ['urgente', 'mes', 'continuo']

const PRAZO_LABELS: Record<Prazo, string> = {
  urgente: 'Urgente (≤14 dias)',
  mes: 'Este mês',
  continuo: 'Sem prazo fixo',
}

const CHAMADAS = PROGRAMAS.filter(
  (p) => p.status === 'aberta' || p.status === 'fluxo-continuo'
)

function formatDeadline(iso: string) {
  return new Date(iso).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

function daysLeft(iso: string) {
  return Math.ceil((new Date(iso).getTime() - Date.now()) / 86400000)
}

function toggle<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value]
}

function matchesPrazo(deadline: string | null | undefined, prazo: Prazo, endOfMonth: number) {
  if (prazo === 'urgente') return !!deadline && daysLeft(deadline) <= 14
  if (prazo === 'mes') return !!deadline && new Date(deadline).getTime() <= endOfMonth
  if (prazo === 'continuo') return !deadline
  return true
}

export default function ChamadasLista() {
  const [publicos, setPublicos] = useState<Publico[]>([])
  const [tipos, setTipos] = useState<Entrada[]>([])
  const [prazos, setPrazos] = useState<Prazo[]>([])

  const endOfMonth = useMemo(() => {
    const d = new Date()
    d.setMonth(d.getMonth() + 1, 0)
    return d.getTime()
  }, [])

  const filtered = useMemo(() => {
    return CHAMADAS.filter((p) => {
      if (publicos.length > 0 && !publicos.includes(p.publico)) return false
      if (tipos.length > 0 && !tipos.includes(p.entrada)) return false
      if (prazos.length > 0 && !prazos.some((pr) => matchesPrazo(p.deadline, pr, endOfMonth))) return false
      return true
    }).sort((a, b) => {
      if (a.deadline && b.deadline) return new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
      if (a.deadline) return -1
      if (b.deadline) return 1
      return 0
    })
  }, [publicos, tipos, prazos, endOfMonth])

  const limparFiltros = () => {
    setPublicos([])
    setTipos([])
    setPrazos([])
  }

  const filtrosAtivos = publicos.length + tipos.length + prazos.length

  const contagens = useMemo(() => {
    const baseFiltradoPorPublico =
      publicos.length === 0 ? CHAMADAS : CHAMADAS.filter((p) => publicos.includes(p.publico))

    const publico: Record<string, number> = {}
    CHAMADAS.forEach((p) => {
      publico[p.publico] = (publico[p.publico] || 0) + 1
    })

    const tipo: Record<string, number> = {}
    baseFiltradoPorPublico.forEach((p) => {
      tipo[p.entrada] = (tipo[p.entrada] || 0) + 1
    })

    const prazo: Record<string, number> = {}
    PRAZOS.forEach((pr) => {
      prazo[pr] = baseFiltradoPorPublico.filter((p) =>
        matchesPrazo(p.deadline, pr, endOfMonth),
      ).length
    })

    return { publico, tipo, prazo }
  }, [publicos, endOfMonth])

  return (
    <Section theme="light" padding="md">

        <div className="grid lg:grid-cols-[240px_1fr] gap-8 lg:gap-12 items-start">

          {/* Sidebar de filtros */}
          <aside className="lg:sticky lg:top-[88px]">
            {/* Mobile: collapse */}
            <details className="lg:hidden rounded-2xl bg-white border border-border overflow-hidden group">
              <summary className="flex items-center justify-between px-5 py-4 cursor-pointer list-none">
                <span className="text-sm font-semibold text-brand-navy inline-flex items-center gap-2">
                  Filtros
                  {filtrosAtivos > 0 && (
                    <span className="inline-flex items-center justify-center min-w-[20px] h-5 rounded-full bg-brand-orange text-white text-[10px] font-bold px-1.5">
                      {filtrosAtivos}
                    </span>
                  )}
                </span>
                <ChevronDown
                  strokeWidth={2.5}
                  className="w-4 h-4 text-brand-navy/50 transition-transform group-open:rotate-180"
                />
              </summary>
              <div className="px-5 pb-5 pt-1 flex flex-col border-t border-border">
                <SidebarFilter label="Para" options={PUBLICOS} active={publicos} onChange={(v) => setPublicos((prev) => toggle(prev, v as Publico))} counts={contagens.publico} labels={PUBLICO_LABELS} />
                <SidebarFilter label="Tipo" options={TIPOS} active={tipos} onChange={(v) => setTipos((prev) => toggle(prev, v as Entrada))} counts={contagens.tipo} />
                <SidebarFilter label="Prazo" options={PRAZOS} active={prazos} onChange={(v) => setPrazos((prev) => toggle(prev, v as Prazo))} counts={contagens.prazo} labels={PRAZO_LABELS} />
                {filtrosAtivos > 0 && (
                  <button
                    onClick={limparFiltros}
                    className="mt-3 text-[12px] font-semibold text-brand-orange hover:underline self-start"
                  >
                    Limpar filtros
                  </button>
                )}
              </div>
            </details>

            {/* Desktop: sidebar visível */}
            <div className="hidden lg:block">
              <div className="flex items-baseline justify-between mb-5">
                <span className="text-lg font-extrabold text-brand-navy tracking-tight">
                  Filtros
                </span>
                <button
                  onClick={limparFiltros}
                  disabled={filtrosAtivos === 0}
                  className="text-[12px] font-semibold text-brand-navy/45 hover:text-brand-orange disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:text-brand-navy/45 transition-colors"
                >
                  Limpar tudo
                </button>
              </div>
              <div className="flex flex-col">
                <SidebarFilter label="Para" options={PUBLICOS} active={publicos} onChange={(v) => setPublicos((prev) => toggle(prev, v as Publico))} counts={contagens.publico} labels={PUBLICO_LABELS} />
                <SidebarFilter label="Tipo" options={TIPOS} active={tipos} onChange={(v) => setTipos((prev) => toggle(prev, v as Entrada))} counts={contagens.tipo} />
                <SidebarFilter label="Prazo" options={PRAZOS} active={prazos} onChange={(v) => setPrazos((prev) => toggle(prev, v as Prazo))} counts={contagens.prazo} labels={PRAZO_LABELS} />
              </div>
            </div>
          </aside>

          {/* Grid principal */}
          <div>
            {/* Header com contador */}
            <div className="flex items-baseline justify-between mb-6 pb-4 border-b border-brand-navy/10">
              <h2 className="text-base font-bold text-brand-navy">
                <span className="text-brand-orange">{filtered.length}</span>{' '}
                chamada{filtered.length === 1 ? '' : 's'}
              </h2>
              <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-brand-navy/45">
                Catálogo completo
              </span>
            </div>

            {filtered.length > 0 ? (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5 items-start">
                {filtered.map((p) => {
              const accentPublico = PUBLICO_COLORS[p.publico]
              const days = p.deadline ? daysLeft(p.deadline) : null
              const isUrgent = days !== null && days <= 14

              return (
                <Link
                  key={p.slug}
                  href={p.href}
                  className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-border hover:shadow-xl hover:shadow-black/[0.07] hover:-translate-y-1 hover:border-brand-orange/30 transition-all duration-300"
                >
                  <div className="flex flex-col flex-1 p-7">

                    {/* Nome */}
                    <h3 className="font-extrabold text-brand-navy text-[1.15rem] leading-snug mb-3 group-hover:text-brand-orange transition-colors duration-200">
                      {p.name}
                    </h3>

                    {/* Desc */}
                    <p className="text-brand-navy/55 text-[13px] leading-relaxed mb-5 line-clamp-2 flex-1">
                      {p.desc}
                    </p>

                    {/* Público — texto simples */}
                    <p
                      className="text-[11px] font-semibold uppercase tracking-[0.12em] mb-6"
                      style={{ color: accentPublico }}
                    >
                      {p.publico}
                    </p>

                    <div className="border-t border-[#F0EFEA]" />

                    {/* Prazo */}
                    <div className="pt-5">
                      {p.deadline ? (
                        <>
                          <div className={`text-[10px] font-bold uppercase tracking-[0.18em] mb-0.5 ${isUrgent ? 'text-red-500' : 'text-brand-navy/35'}`}>
                            {isUrgent ? 'Encerra em breve' : 'Prazo'}
                          </div>
                          <div className={`text-sm font-extrabold leading-tight ${isUrgent ? 'text-red-500' : 'text-brand-navy'}`}>
                            {formatDeadline(p.deadline)}
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-navy/35 mb-0.5">
                            Entrada
                          </div>
                          <div className="text-sm font-bold text-brand-navy/60">
                            A qualquer momento
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-brand-navy/15 bg-white/50 p-12 text-center">
                <div className="text-lg font-bold text-brand-navy mb-2">
                  Sem chamadas pra essa combinação.
                </div>
                <p className="text-sm text-brand-navy/60 mb-6 max-w-md mx-auto">
                  Ajuste algum filtro ou fale com a gente — montamos uma jornada sob medida pra
                  sua empresa.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <button
                    onClick={limparFiltros}
                    className="inline-flex items-center rounded-full border border-brand-navy/15 bg-white text-brand-navy text-sm font-semibold px-5 py-3 hover:border-brand-orange hover:text-brand-orange transition-all"
                  >
                    Limpar filtros
                  </button>
                  <Link
                    href="/fale-conosco"
                    className="inline-flex items-center rounded-full bg-brand-orange text-white text-sm font-semibold px-5 py-3 hover:bg-[#FF9B26] transition-all"
                  >
                    Falar com especialista
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
    </Section>
  )
}
