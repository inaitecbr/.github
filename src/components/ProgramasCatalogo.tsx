'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronDown } from 'lucide-react'
import BrandPattern from '@/components/BrandPattern'
import SidebarFilter from '@/components/SidebarFilter'
import { Section, Container } from '@/components/Section'
import {
  PROGRAMAS,
  PUBLICO_COLORS,
  STATUS_COLOR,
  STATUS_SHORT,
  type Programa,
  type Publico,
  type Estagio,
  type Entrada,
  type StatusInscricao,
} from '@/data/programas'

const PUBLICOS: Publico[] = [
  'Startups e Pequenas Empresas',
  'Grandes e Médias Empresas',
  'Universidades e Governo',
  'Investidores',
]
const ESTAGIOS: Estagio[] = [
  'Ideação',
  'Pré-aceleração',
  'Aceleração',
  'Crescimento',
  'Internacionalização',
  'Pesquisa',
  'Operação',
]
const ENTRADAS: Entrada[] = ['Edital', 'Inscrição contínua', 'Convite', 'Parceria']
const STATUSES: StatusInscricao[] = ['aberta', 'em-breve', 'fluxo-continuo', 'fechada']

function toggle<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value]
}

export default function ProgramasCatalogo() {
  const [publicos, setPublicos] = useState<Publico[]>([])
  const [estagios, setEstagios] = useState<Estagio[]>([])
  const [entradas, setEntradas] = useState<Entrada[]>([])
  const [statuses, setStatuses] = useState<StatusInscricao[]>([])

  const filtrados = useMemo(
    () =>
      PROGRAMAS.filter(
        (p) =>
          (publicos.length === 0 || publicos.includes(p.publico)) &&
          (estagios.length === 0 || estagios.includes(p.estagio)) &&
          (entradas.length === 0 || entradas.includes(p.entrada)) &&
          (statuses.length === 0 || statuses.includes(p.status))
      ),
    [publicos, estagios, entradas, statuses]
  )

  const limparFiltros = () => {
    setPublicos([])
    setEstagios([])
    setEntradas([])
    setStatuses([])
  }

  const filtrosAtivos =
    publicos.length + estagios.length + entradas.length + statuses.length

  const contagens = useMemo(() => {
    const make = (key: keyof Programa, source: Programa[]) => {
      const m: Record<string, number> = {}
      source.forEach((p) => {
        const v = p[key] as string
        m[v] = (m[v] || 0) + 1
      })
      return m
    }
    const baseFiltradoPorPublico =
      publicos.length === 0 ? PROGRAMAS : PROGRAMAS.filter((p) => publicos.includes(p.publico))
    return {
      publico: make('publico', PROGRAMAS),
      estagio: make('estagio', baseFiltradoPorPublico),
      entrada: make('entrada', baseFiltradoPorPublico),
      status: make('status', baseFiltradoPorPublico),
    }
  }, [publicos])

  return (
    <main className="relative bg-[#0D2E38] overflow-x-clip">

      {/* ── Fundo orgânico unificado ──────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-[40vh] left-[-10%] w-[1000px] h-[1000px] rounded-full bg-[#FA8400]/[0.10] blur-[160px]" />
        <div className="absolute top-[180vh] right-[-15%] w-[1100px] h-[1100px] rounded-full bg-[#00C08B]/[0.06] blur-[160px]" />
        <div className="absolute top-[320vh] left-[15%] w-[900px] h-[900px] rounded-full bg-[#FA8400]/[0.08] blur-[160px]" />

        {/* Grid sutil global — só aparece após a hero */}
        <div
          className="absolute top-[700px] left-0 right-0 bottom-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
            backgroundSize: '80px 80px',
            maskImage:
              'linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)',
          }}
        />
      </div>

      {/* ── 1. Hero ───────────────────────────────────────────────────── */}
      <section className="relative z-10 min-h-[640px] lg:h-[700px] pt-[108px] pb-16 overflow-hidden">
        <BrandPattern
          variant="dots"
          color="#FA8400"
          className="absolute top-32 right-8 w-72 h-72 opacity-25 pointer-events-none"
        />

        <Container className="relative h-full grid lg:grid-cols-[1.1fr_1fr] gap-16 items-stretch">
          <div className="flex flex-col justify-center">
            <div className="mb-5 inline-flex items-center gap-2">
              <span className="block h-px w-8 bg-[#FA8400]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FA8400]">
                Catálogo de programas
              </span>
            </div>

            <h1 className="font-extrabold text-white text-display-xl leading-[1.2] tracking-tight">
              17 programas, 4 pilares.<br />
              <span className="italic font-medium text-[#FA8400]">Um ecossistema</span>.
            </h1>

            <p className="mt-6 max-w-xl text-white/70 text-base leading-relaxed">
              Da ideia ao IPO. Filtre por público, estágio do negócio e modelo de entrada para
              encontrar o programa certo para o momento da sua empresa.
            </p>
          </div>

          <div className="relative aspect-[4/3] lg:aspect-auto rounded-3xl overflow-hidden">
            <Image
              src="/imagens-destaques/inaitec5.jpg"
              alt="Programas Inaitec — encontros e mentoria"
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 45vw, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#0D2E38]/60 via-transparent to-transparent" />
          </div>
        </Container>
      </section>

      {/* ── 2. Filtros (sidebar) + Grid ───────────────────────────────── */}
      <Section theme="light" padding="md">

          <div className="grid lg:grid-cols-[240px_1fr] gap-8 lg:gap-12 items-start">

            {/* Sidebar de filtros */}
            <aside className="lg:sticky lg:top-[88px]">
              {/* Mobile: collapse */}
              <details className="lg:hidden rounded-2xl bg-white border border-[#E8E6E1] overflow-hidden group">
                <summary className="flex items-center justify-between px-5 py-4 cursor-pointer list-none">
                  <span className="text-sm font-semibold text-[#0D2E38] inline-flex items-center gap-2">
                    Filtros
                    {filtrosAtivos > 0 && (
                      <span className="inline-flex items-center justify-center min-w-[20px] h-5 rounded-full bg-[#FA8400] text-white text-[10px] font-bold px-1.5">
                        {filtrosAtivos}
                      </span>
                    )}
                  </span>
                  <ChevronDown
                    strokeWidth={2.5}
                    className="w-4 h-4 text-[#0D2E38]/50 transition-transform group-open:rotate-180"
                  />
                </summary>
                <div className="px-5 pb-5 pt-1 flex flex-col border-t border-[#E8E6E1] max-h-[60vh] overflow-y-auto overflow-x-hidden overscroll-contain scrollbar-subtle">
                  <SidebarFilter label="Público" options={PUBLICOS} active={publicos} onChange={(v) => setPublicos((prev) => toggle(prev, v as Publico))} counts={contagens.publico} />
                  <SidebarFilter label="Status" options={STATUSES} active={statuses} onChange={(v) => setStatuses((prev) => toggle(prev, v as StatusInscricao))} counts={contagens.status} labels={STATUS_SHORT} />
                  <SidebarFilter label="Estágio" options={ESTAGIOS} active={estagios} onChange={(v) => setEstagios((prev) => toggle(prev, v as Estagio))} counts={contagens.estagio} />
                  <SidebarFilter label="Entrada" options={ENTRADAS} active={entradas} onChange={(v) => setEntradas((prev) => toggle(prev, v as Entrada))} counts={contagens.entrada} />
                  {filtrosAtivos > 0 && (
                    <button
                      onClick={limparFiltros}
                      className="mt-3 text-[12px] font-semibold text-[#FA8400] hover:underline self-start"
                    >
                      Limpar filtros
                    </button>
                  )}
                </div>
              </details>

              {/* Desktop: sidebar visível */}
              <div className="hidden lg:flex lg:flex-col lg:max-h-[calc(100dvh-7rem)] lg:overflow-y-auto lg:overflow-x-hidden lg:overscroll-contain lg:pr-2 scrollbar-subtle">
                <div className="flex items-baseline justify-between mb-5">
                  <span className="text-lg font-extrabold text-[#0D2E38] tracking-tight">
                    Filtros
                  </span>
                  <button
                    onClick={limparFiltros}
                    disabled={filtrosAtivos === 0}
                    className="text-[12px] font-semibold text-[#0D2E38]/45 hover:text-[#FA8400] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:text-[#0D2E38]/45 transition-colors"
                  >
                    Limpar tudo
                  </button>
                </div>
                <div className="flex flex-col">
                  <SidebarFilter label="Público" options={PUBLICOS} active={publicos} onChange={(v) => setPublicos((prev) => toggle(prev, v as Publico))} counts={contagens.publico} />
                  <SidebarFilter label="Status" options={STATUSES} active={statuses} onChange={(v) => setStatuses((prev) => toggle(prev, v as StatusInscricao))} counts={contagens.status} labels={STATUS_SHORT} />
                  <SidebarFilter label="Estágio" options={ESTAGIOS} active={estagios} onChange={(v) => setEstagios((prev) => toggle(prev, v as Estagio))} counts={contagens.estagio} />
                  <SidebarFilter label="Entrada" options={ENTRADAS} active={entradas} onChange={(v) => setEntradas((prev) => toggle(prev, v as Entrada))} counts={contagens.entrada} />
                </div>
              </div>
            </aside>

            {/* Grid principal */}
            <div>
              {/* Header com contador */}
              <div className="flex items-baseline justify-between mb-6 pb-4 border-b border-[#0D2E38]/10">
                <h2 className="text-base font-bold text-[#0D2E38]">
                  <span className="text-[#FA8400]">{filtrados.length}</span>{' '}
                  programa{filtrados.length === 1 ? '' : 's'}
                </h2>
                <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#0D2E38]/45">
                  Catálogo completo
                </span>
              </div>

              {/* Cards / empty state */}
              {filtrados.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-[#0D2E38]/15 bg-white/50 p-12 text-center">
                  <div className="text-lg font-bold text-[#0D2E38] mb-2">
                    Sem programas pra essa combinação.
                  </div>
                  <p className="text-sm text-[#0D2E38]/60 mb-6 max-w-md mx-auto">
                    Ajuste algum filtro ou fale com a gente — montamos uma jornada sob medida pra
                    sua empresa.
                  </p>
                  <div className="flex flex-wrap justify-center gap-3">
                    <button
                      onClick={limparFiltros}
                      className="inline-flex items-center rounded-full border border-[#0D2E38]/15 bg-white text-[#0D2E38] text-sm font-semibold px-5 py-3 hover:border-[#FA8400] hover:text-[#FA8400] transition-all"
                    >
                      Limpar filtros
                    </button>
                    <Link
                      href="/fale-conosco"
                      className="inline-flex items-center rounded-full bg-[#FA8400] text-white text-sm font-semibold px-5 py-3 hover:bg-[#FF9B26] transition-all"
                    >
                      Falar com especialista
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filtrados.map((p) => {
                    const accent = PUBLICO_COLORS[p.publico]
                    return (
                      <Link
                        key={p.name}
                        href={p.href}
                        style={{ '--card-accent': accent } as React.CSSProperties}
                        className="group relative rounded-2xl bg-white border border-[#E8E6E1] overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#0D2E38]/10 hover:border-[color:var(--card-accent)]"
                      >
                    {/* Imagem limpa */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#E8E6E1]">
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      />
                    </div>

                    {/* Body */}
                    <div className="flex-1 flex flex-col p-6 gap-3">
                      {/* Tag — dot + texto, neutra, cor só no dot */}
                      <span className="inline-flex items-center gap-2 text-[11px] font-semibold text-[#0D2E38]/70">
                        <span
                          className="block w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ backgroundColor: accent }}
                        />
                        {p.publico}
                      </span>

                      <h3 className="text-[#0D2E38] text-xl font-extrabold leading-tight">
                        {p.name}
                      </h3>
                      <p className="text-[#0D2E38]/65 text-sm leading-relaxed flex-1">{p.desc}</p>

                      {/* Metadata grid */}
                      <dl className="grid grid-cols-2 gap-4 pt-4 mt-2 border-t border-[#E8E6E1]">
                        <div className="flex flex-col gap-0.5">
                          <dt className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#0D2E38]/45">
                            Estágio
                          </dt>
                          <dd className="text-[12px] font-semibold text-[#0D2E38]">
                            {p.estagio}
                          </dd>
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <dt className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#0D2E38]/45">
                            Status
                          </dt>
                          <dd
                            className="inline-flex items-center gap-1.5 text-[12px] font-semibold"
                            style={{ color: STATUS_COLOR[p.status] }}
                          >
                            <span
                              className={`block w-1.5 h-1.5 rounded-full ${p.status === 'aberta' ? 'animate-pulse' : ''}`}
                              style={{ backgroundColor: STATUS_COLOR[p.status] }}
                            />
                            {STATUS_SHORT[p.status]}
                          </dd>
                        </div>
                      </dl>
                    </div>

                    {/* Accent stripe inferior — só no hover */}
                    <span
                      className="absolute bottom-0 left-0 right-0 h-[3px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                      style={{ backgroundColor: accent }}
                    />
                  </Link>
                )
              })}
                </div>
              )}
            </div>
          </div>
      </Section>

      {/* ── 3. CTA final ──────────────────────────────────────────────── */}
      <Section padding="md">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0D2E38] via-[#004E69] to-[#0D2E38] p-8 sm:p-12 md:p-20">
            <div className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full bg-[#FA8400]/20 blur-[140px]" />
            <div className="absolute -bottom-32 -left-20 w-[400px] h-[400px] rounded-full bg-[#00C08B]/10 blur-[120px]" />

            <div className="relative grid lg:grid-cols-[1fr_auto] gap-10 items-center">
              <div>
                <div className="mb-5 inline-flex items-center gap-2">
                  <span className="block h-px w-8 bg-[#FA8400]" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FA8400]">
                    Não sabe por onde começar?
                  </span>
                </div>
                <h2 className="font-extrabold text-white text-display-xl leading-[1.2] tracking-tight max-w-2xl">
                  Conta pra gente em que momento sua empresa está.{' '}
                  <span className="italic font-medium text-[#FA8400]">A gente te aponta o caminho</span>.
                </h2>
                <p className="mt-5 text-white/70 text-base leading-relaxed max-w-xl">
                  Em uma conversa de 30 minutos, nossa equipe entende seu contexto e indica o
                  programa que faz mais sentido — ou monta uma jornada combinada.
                </p>
              </div>
              <div className="w-full flex flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                <Link
                  href="/fale-conosco"
                  className="inline-flex items-center justify-center rounded-full bg-[#FA8400] text-white text-sm font-semibold px-7 py-4 hover:bg-[#FF9B26] hover:shadow-xl hover:shadow-[#FA8400]/40 transition-all duration-300 shadow-lg shadow-[#FA8400]/25"
                >
                  Falar com especialista
                </Link>
                <Link
                  href="/traga-sua-empresa"
                  className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/5 backdrop-blur-sm text-white text-sm font-semibold px-7 py-4 hover:bg-white/10 hover:border-white/50 transition-all duration-300"
                >
                  Traga sua empresa
                </Link>
              </div>
            </div>
          </div>
      </Section>
    </main>
  )
}

