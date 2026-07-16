'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useMemo, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { ArrowRight, ChevronDown, Search, X } from 'lucide-react'
import SidebarFilter from '@/components/SidebarFilter'
import { Section } from '@/components/Section'
import { urlFor } from '@/sanity/image'
import type { EmpresaItem } from '@/sanity/queries/empresas'

// ── Constantes ──────────────────────────────────────────────────────────────

const ESTAGIOS = ['Startup', 'Scale-up', 'Corporação'] as const

// Cores de status por estágio (mantidas no componente — configuração visual, não editorial)
const ESTAGIO_STATUS_COLOR: Record<string, string> = {
  Startup: 'var(--color-brand-orange)',
  'Scale-up': 'var(--color-brand-teal)',
  Corporação: 'var(--color-brand-navy)',
}

// ── Helpers ─────────────────────────────────────────────────────────────────

function toggle<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value]
}

// ── Props ────────────────────────────────────────────────────────────────────

type Props = { empresas: EmpresaItem[] }

// ── Component ────────────────────────────────────────────────────────────────

export default function CatalogoSection({ empresas }: Props) {
  const [setores, setSetores] = useState<string[]>([])
  const [estagios, setEstagios] = useState<string[]>([])
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<EmpresaItem | null>(null)

  // Fechar modal com Escape + travar scroll
  useEffect(() => {
    if (!selected) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null)
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [selected])

  // Filtro client-side — sem round-trip ao Sanity, resposta instantânea
  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    return empresas.filter((e) => {
      if (setores.length > 0 && !setores.includes(e.setor)) return false
      if (estagios.length > 0 && !estagios.includes(e.estagio)) return false
      if (q && !e.nome.toLowerCase().includes(q) && !e.desc.toLowerCase().includes(q)) return false
      return true
    })
  }, [empresas, setores, estagios, query])

  const limparFiltros = () => {
    setSetores([])
    setEstagios([])
    setQuery('')
  }

  const filtrosAtivos = setores.length + estagios.length + (query ? 1 : 0)

  // Contagens para exibir ao lado de cada opção do filtro
  const contagens = useMemo(() => {
    const baseFiltradoPorSetor =
      setores.length === 0 ? empresas : empresas.filter((e) => setores.includes(e.setor))

    const setor: Record<string, number> = {}
    empresas.forEach((e) => {
      setor[e.setor] = (setor[e.setor] || 0) + 1
    })

    const estagio: Record<string, number> = {}
    baseFiltradoPorSetor.forEach((e) => {
      estagio[e.estagio] = (estagio[e.estagio] || 0) + 1
    })

    return { setor, estagio }
  }, [empresas, setores])

  // Setores derivados do catálogo (gerenciados no Sanity) — só aparecem
  // os que têm ao menos uma empresa
  const setoresDisponiveis = useMemo(
    () => Object.keys(contagens.setor).sort((a, b) => a.localeCompare(b, 'pt')),
    [contagens.setor],
  )

  const searchInput = (
    <div className="relative">
      <Search
        strokeWidth={2}
        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30"
      />
      <input
        type="text"
        placeholder="Buscar empresa..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full pl-9 pr-4 py-2 rounded-full bg-white/[0.06] border border-white/10 text-white text-[12px] placeholder:text-white/30 focus:outline-none focus:border-brand-orange/50 transition-colors"
      />
    </div>
  )

  const filterGroups = (
    <>
      <SidebarFilter
        label="Setor"
        options={setoresDisponiveis}
        active={setores}
        onChange={(v) => setSetores((prev) => toggle(prev, v))}
        counts={contagens.setor}
        theme="dark"
      />
      <SidebarFilter
        label="Estágio"
        options={ESTAGIOS}
        active={estagios}
        onChange={(v) => setEstagios((prev) => toggle(prev, v))}
        counts={contagens.estagio}
        theme="dark"
      />
    </>
  )

  return (
    <Section padding="md" className="bg-brand-navy">
      <div className="grid lg:grid-cols-[240px_1fr] gap-8 lg:gap-12 items-start">

        {/* ── Sidebar de filtros ────────────────────────────────────────── */}
        <aside className="lg:sticky lg:top-[88px]">
          {/* Mobile: collapse */}
          <details className="lg:hidden rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden group">
            <summary className="flex items-center justify-between px-5 py-4 cursor-pointer list-none">
              <span className="text-sm font-semibold text-white inline-flex items-center gap-2">
                Filtros
                {filtrosAtivos > 0 && (
                  <span className="inline-flex items-center justify-center min-w-[20px] h-5 rounded-full bg-brand-orange text-white text-[10px] font-bold px-1.5">
                    {filtrosAtivos}
                  </span>
                )}
              </span>
              <ChevronDown
                strokeWidth={2.5}
                className="w-4 h-4 text-white/50 transition-transform group-open:rotate-180"
              />
            </summary>
            <div className="px-5 pb-5 pt-3 flex flex-col gap-4 border-t border-white/10">
              {searchInput}
              {filterGroups}
              {filtrosAtivos > 0 && (
                <button
                  onClick={limparFiltros}
                  className="mt-1 text-[12px] font-semibold text-brand-orange hover:underline self-start"
                >
                  Limpar filtros
                </button>
              )}
            </div>
          </details>

          {/* Desktop: sidebar visível */}
          <div className="hidden lg:block">
            <div className="flex items-baseline justify-between mb-5">
              <span className="text-lg font-extrabold text-white tracking-tight">Filtros</span>
              <button
                onClick={limparFiltros}
                disabled={filtrosAtivos === 0}
                className="text-[12px] font-semibold text-white/45 hover:text-brand-orange disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:text-white/45 transition-colors"
              >
                Limpar tudo
              </button>
            </div>
            <div className="mb-5">{searchInput}</div>
            <div className="flex flex-col">{filterGroups}</div>
          </div>
        </aside>

        {/* ── Grid principal ────────────────────────────────────────────── */}
        <div>
          {/* Contador */}
          <div className="flex items-baseline justify-between mb-6 pb-4 border-b border-white/10">
            <h2 className="text-base font-bold text-white">
              <span className="text-brand-orange">{filtered.length}</span>{' '}
              empresa{filtered.length === 1 ? '' : 's'}
            </h2>
            <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-white/45">
              Catálogo completo
            </span>
          </div>

          {filtered.length > 0 ? (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3">
              {filtered.map((empresa) => {
                const logoUrl = empresa.logo?.asset?._ref
                  ? urlFor(empresa.logo).width(360).url()
                  : null

                return (
                  <button
                    key={empresa.slug}
                    type="button"
                    onClick={() => setSelected(empresa)}
                    aria-label={`Ver detalhes de ${empresa.nome}`}
                    className="group relative flex items-center justify-center h-[180px] rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06] hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/60"
                  >
                    <span className="absolute top-4 right-5 text-[10px] font-bold uppercase tracking-[0.18em] text-white/30 transition-colors duration-300 group-hover:text-white/55">
                      {empresa.setor}
                    </span>

                    {logoUrl ? (
                      <Image
                        src={logoUrl}
                        alt={`Logo ${empresa.nome}`}
                        width={180}
                        height={48}
                        className="max-h-12 w-auto object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-200"
                      />
                    ) : (
                      <span className="text-white/60 font-bold text-lg">{empresa.nome}</span>
                    )}
                  </button>
                )
              })}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-12 text-center">
              <div className="text-lg font-bold text-white mb-2">
                Sem empresas pra essa combinação.
              </div>
              <p className="text-sm text-white/60 mb-6 max-w-md mx-auto">
                Ajuste algum filtro ou explore o catálogo completo.
              </p>
              <button
                onClick={limparFiltros}
                className="inline-flex items-center rounded-full border border-white/20 bg-white/5 text-white text-sm font-semibold px-5 py-3 hover:border-brand-orange hover:text-brand-orange transition-all"
              >
                Limpar filtros
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── Modal de detalhe — portal no body para ficar acima de header/CTA ── */}
      {selected && createPortal(
        <div
          className="fixed inset-0 z-100 flex items-center justify-center px-4 py-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="empresa-modal-title"
        >
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          />

          <div className="relative w-full max-w-5xl my-auto rounded-3xl border border-white/10 bg-white shadow-2xl overflow-hidden">
            {/* Botão fechar */}
            <button
              type="button"
              onClick={() => setSelected(null)}
              aria-label="Fechar"
              className="absolute top-4 right-4 z-10 rounded-full w-9 h-9 flex items-center justify-center bg-black/5 text-neutral-700 hover:bg-black/10 hover:text-black transition-colors"
            >
              <X strokeWidth={2.5} className="w-4 h-4" />
            </button>

            {/* Linha 1 — Info + Foto */}
            <div className="grid md:grid-cols-2">
              {/* Coluna esquerda — info */}
              <div className="px-8 md:px-10 py-10 flex flex-col">
                {/* Logo */}
                {selected.logo?.asset?._ref && (
                  <Image
                    src={urlFor(selected.logo).width(440).url()}
                    alt={`Logo ${selected.nome}`}
                    width={220}
                    height={56}
                    className="max-h-14 w-auto object-contain self-start"
                  />
                )}

                <h2 id="empresa-modal-title" className="sr-only">
                  {selected.nome}
                </h2>

                <p className="mt-7 text-neutral-700 text-[15px] leading-relaxed">
                  {selected.longDesc ?? selected.desc}
                </p>

                <div className="mt-auto pt-8 flex flex-wrap items-center gap-4">
                  <Link
                    href="/fale-conosco"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-orange text-white text-sm font-semibold px-6 py-3 shadow-lg shadow-brand-orange/20 hover:bg-[#FF9B26] hover:shadow-xl hover:shadow-brand-orange/30 transition-all"
                  >
                    Entrar em contato
                  </Link>
                  {selected.website && (
                    <a
                      href={selected.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[14px] font-semibold text-neutral-900 hover:text-brand-orange transition-colors"
                    >
                      Visitar site
                      <ArrowRight strokeWidth={2} className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

              {/* Coluna direita — foto */}
              <div className="relative min-h-[320px] md:min-h-[420px] bg-neutral-100">
                {selected.foto?.asset?._ref && (
                  <Image
                    src={urlFor(selected.foto).width(800).height(840).fit('crop').url()}
                    alt={
                      selected.fundador?.nome
                        ? `${selected.fundador.nome}, ${selected.fundador.titulo ?? ''} de ${selected.nome}`
                        : `Equipe ${selected.nome}`
                    }
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                )}
              </div>
            </div>

            {/* Linha de info — flex-wrap: blocos sobrando na última linha esticam a largura toda */}
            <div className="border-t border-neutral-200 flex flex-wrap gap-px bg-neutral-200">
              {[
                selected.fundador?.titulo && selected.fundador?.nome
                  ? { label: selected.fundador.titulo, value: selected.fundador.nome }
                  : null,
                selected.investimento?.rodada && selected.investimento?.ano
                  ? {
                      label: 'Investimento inicial',
                      value: `${selected.investimento.rodada}, ${selected.investimento.ano}`,
                    }
                  : null,
                selected.status
                  ? {
                      label: 'Status',
                      value: selected.status,
                      color: ESTAGIO_STATUS_COLOR[selected.estagio],
                    }
                  : null,
                { label: 'Estágio', value: selected.estagio },
                { label: 'Fundada em', value: String(selected.fundada) },
                selected.investidores?.length
                  ? { label: 'Investidores', value: selected.investidores.join(', ') }
                  : null,
              ]
                .filter(Boolean)
                .map((info) => (
                  <div
                    key={info!.label}
                    className="grow basis-full sm:basis-[calc(50%-1px)] md:basis-[calc(33.333%-1px)] bg-white px-8 md:px-10 py-6"
                  >
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-orange">
                      {info!.label}
                    </p>
                    <p
                      className="mt-2 text-[15px] font-bold"
                      style={{ color: info!.color ?? 'var(--color-brand-navy)' }}
                    >
                      {info!.value}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>,
        document.body,
      )}
    </Section>
  )
}
