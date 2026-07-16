'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Check, ChevronDown } from 'lucide-react'

/* ─────────────────────────────────────────────────────────────────────────
   Inaitec — Design System (rota oculta: /design-system)
   Arquitetura inspirada em lp.atomsixstudio.com/design-system
   Tokens 100% baseados em src/app/globals.css
   ───────────────────────────────────────────────────────────────────────── */

type SwatchProps = {
  name: string
  hex: string
  pantone?: string
  desc?: string
  textOnTop?: 'light' | 'dark'
}

function Swatch({ name, hex, pantone, desc, textOnTop = 'light' }: SwatchProps) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(hex)
      setCopied(true)
      setTimeout(() => setCopied(false), 1400)
    } catch {}
  }
  return (
    <button
      onClick={copy}
      className="group text-left rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition"
    >
      <div
        className="h-28 flex items-end justify-between p-4 relative"
        style={{ backgroundColor: hex }}
      >
        <span
          className={`text-[10px] font-bold uppercase tracking-[0.2em] ${
            textOnTop === 'light' ? 'text-white/85' : 'text-brand-navy/70'
          }`}
        >
          {pantone ?? ' '}
        </span>
        <span
          className={`text-[10px] font-semibold opacity-0 group-hover:opacity-100 transition ${
            textOnTop === 'light' ? 'text-white' : 'text-brand-navy'
          }`}
        >
          {copied ? 'copiado!' : 'clique p/ copiar'}
        </span>
      </div>
      <div className="px-4 py-3">
        <div className="text-sm font-semibold text-white">{name}</div>
        <div className="text-[11px] font-mono text-white/60 mt-0.5">{hex}</div>
        {desc && <div className="text-[11px] text-white/40 mt-1.5 leading-snug">{desc}</div>}
      </div>
    </button>
  )
}

function SectionTitle({ kicker, title }: { kicker?: string; title: string }) {
  return (
    <div className="mb-10">
      {kicker && (
        <div className="mb-3 inline-flex items-center gap-2">
          <span className="block h-px w-8 bg-brand-orange" />
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-orange">
            {kicker}
          </span>
        </div>
      )}
      <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight">{title}</h2>
    </div>
  )
}

function Section({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-[104px] py-16 border-t border-white/5">
      {children}
    </section>
  )
}

const NAV = [
  ['Cores', 'cores'],
  ['Tipografia', 'tipografia'],
  ['Espaçamento', 'espacamento'],
  ['Radius', 'radius'],
  ['Sombras', 'sombras'],
  ['Botões', 'botoes'],
  ['Badges', 'badges'],
  ['Eyebrows', 'eyebrows'],
  ['Cards', 'cards'],
  ['Inputs', 'inputs'],
  ['Checkboxes', 'checkboxes'],
  ['Toggles', 'toggles'],
  ['Tabs', 'tabs'],
  ['Dropdowns', 'dropdowns'],
  ['Toasts', 'toasts'],
  ['Alertas', 'alertas'],
  ['Modais', 'modais'],
  ['Dividers', 'dividers'],
] as const

export default function DesignSystemPage() {
  const [tab, setTab] = useState<'visao' | 'tokens' | 'uso'>('visao')
  const [toggle, setToggle] = useState(true)
  const [toggle2, setToggle2] = useState(false)
  const [check1, setCheck1] = useState(true)
  const [check2, setCheck2] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [dropdownValue, setDropdownValue] = useState('Acelera Pedra Branca')
  const [activeTabDemo, setActiveTabDemo] = useState(0)
  const [showToast, setShowToast] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const triggerToast = () => {
    setShowToast(true)
    setTimeout(() => setShowToast(false), 2600)
  }

  return (
    <main className="relative min-h-dvh bg-brand-navy text-white selection:bg-brand-orange/40">
      {/* Fundo orgânico */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-[10vh] left-[-10%] w-[900px] h-[900px] rounded-full bg-brand-orange/[0.10] blur-[160px]" />
        <div className="absolute top-[80vh] right-[-15%] w-[900px] h-[900px] rounded-full bg-brand-teal/[0.06] blur-[160px]" />
        <div className="absolute top-[160vh] left-[10%] w-[800px] h-[800px] rounded-full bg-[#004E69]/40 blur-[150px]" />
      </div>

      {/* Top bar minimalista — sticky */}
      <div className="sticky top-0 z-30 h-16 border-b border-white/10 bg-brand-navy/85 backdrop-blur-md">
        <div className="mx-auto max-w-[1280px] h-full px-6 lg:px-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image
              src="/logo-inaitec-h.png"
              alt="Inaitec"
              width={130}
              height={30}
              className="h-7 w-auto object-contain brightness-0 invert"
              priority
            />
            <span className="block h-6 w-px bg-white/20" />
            <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-white/85">
              Design System
            </span>
          </div>
          <a
            href="/"
            className="text-xs font-semibold text-white/70 hover:text-white transition"
          >
            ← Voltar para o site
          </a>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-[1280px] px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-12 lg:gap-16">
        {/* Sidebar de navegação — sticky 40px abaixo do header (64px) */}
        <aside className="hidden lg:block sticky top-[104px] self-start max-h-[calc(100dvh-104px-24px)] overflow-auto pt-8">
          <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-orange mb-4">
            Sumário
          </div>
          <nav className="flex flex-col gap-1.5">
            {NAV.map(([label, id]) => (
              <a
                key={id}
                href={`#${id}`}
                className="text-sm text-white/60 hover:text-white transition py-1"
              >
                {label}
              </a>
            ))}
          </nav>
        </aside>

        {/* Conteúdo */}
        <div>
          {/* Hero */}
          <header className="pt-24 pb-12">
            <div className="mb-5 inline-flex items-center gap-2">
              <span className="block h-px w-8 bg-brand-orange" />
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-orange">
                Manual de Marca · Inaitec
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-semibold text-white leading-[1.05] tracking-tight mb-6">
              Design System
            </h1>
            <p className="max-w-2xl text-base md:text-lg text-white/70 leading-relaxed">
              Fonte única de verdade para cores, tipografia, componentes e padrões visuais usados
              no site institucional do Inaitec. Tudo aqui é derivado dos tokens definidos em{' '}
              <code className="text-brand-orange">globals.css</code>.
            </p>

            {/* Tabs do hero (exemplo de Tabs em ação) */}
            <div className="mt-10 inline-flex p-1 rounded-full border border-white/10 bg-white/[0.04]">
              {(
                [
                  ['visao', 'Visão geral'],
                  ['tokens', 'Tokens'],
                  ['uso', 'Como usar'],
                ] as const
              ).map(([id, label]) => (
                <button
                  key={id}
                  onClick={() => setTab(id)}
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
                    tab === id
                      ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/20'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="mt-6 text-sm text-white/50 max-w-2xl leading-relaxed">
              {tab === 'visao' && (
                <>
                  Hub brasileiro de inovação. Visual baseado em{' '}
                  <strong className="text-white/80">deep teal</strong> + acentos{' '}
                  <strong className="text-brand-orange">laranja vivo</strong>, tipografia humanista
                  (Plus Jakarta Sans) e marca em Campton.
                </>
              )}
              {tab === 'tokens' && (
                <>
                  Os tokens vivem em <code>src/app/globals.css</code> e são consumidos via
                  Tailwind v4 (<code>@theme</code>). Cores hard-coded como{' '}
                  <code>#FA8400</code> aparecem nos componentes existentes — a próxima onda de
                  refactor deve consolidá-los nos tokens.
                </>
              )}
              {tab === 'uso' && (
                <>
                  Use <code>bg-brand-orange</code> e <code>text-[#004E69]</code> no Tailwind, ou
                  prefira <code>var(--color-brand-orange)</code> em CSS custom. Tipografia: classe
                  default já aplica <code>font-sans</code> (Plus Jakarta).
                </>
              )}
            </div>
          </header>

          {/* CORES */}
          <Section id="cores">
            <SectionTitle kicker="01" title="Cores" />

            <div className="mb-10">
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/50 mb-5">
                Marca
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <Swatch
                  name="Brand Orange"
                  hex="var(--color-brand-orange)"
                  pantone="PANTONE 1505 C"
                  desc="Primária. CTAs, eyebrows e destaques."
                />
                <Swatch
                  name="Brand Teal"
                  hex="var(--color-brand-teal)"
                  pantone="PANTONE 335 C"
                  desc="Secundária. Sucesso e brilhos secundários."
                />
                <Swatch
                  name="Brand Dark"
                  hex="#004E69"
                  pantone="PANTONE 560 C"
                  desc="Cor de títulos sobre fundo claro."
                />
              </div>
            </div>

            <div className="mb-10">
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/50 mb-5">
                Superfícies
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Swatch
                  name="Hero Dark"
                  hex="var(--color-brand-navy)"
                  desc="Fundo escuro principal do site."
                />
                <Swatch
                  name="Surface"
                  hex="#FFFFFF"
                  desc="Cartões e painéis claros."
                  textOnTop="dark"
                />
                <Swatch
                  name="Surface Soft"
                  hex="#F5F4EF"
                  desc="Hero claro, seções alternadas."
                  textOnTop="dark"
                />
                <Swatch
                  name="Border"
                  hex="var(--color-border)"
                  desc="Bordas sutis em superfícies claras."
                  textOnTop="dark"
                />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/50 mb-5">
                Texto
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <Swatch name="Heading" hex="#004E69" desc="Títulos sobre claro." />
                <Swatch name="Body" hex="#4B6472" desc="Corpo de texto sobre claro." />
                <Swatch name="Muted" hex="#8A9FAD" desc="Labels e metadados." />
              </div>
            </div>
          </Section>

          {/* TIPOGRAFIA */}
          <Section id="tipografia">
            <SectionTitle kicker="02" title="Tipografia" />

            <div className="grid md:grid-cols-2 gap-10">
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8">
                <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-orange mb-3">
                  Display · Plus Jakarta Sans
                </div>
                <p className="text-5xl font-extrabold leading-[1.05] tracking-tight">
                  Acelere, conecte{' '}
                  <span className="italic font-medium text-brand-orange">& transforme</span>
                </p>
                <div className="mt-6 text-xs text-white/50">
                  Variable · 200–800 · normal & italic
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8">
                <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-orange mb-3">
                  Body · Plus Jakarta Sans
                </div>
                <p className="text-base text-white/80 leading-relaxed">
                  O Inaitec é um hub brasileiro de inovação e tecnologia que conecta startups,
                  corporações e governo em um ecossistema vivo de 1,7 milhão de m². Acreditamos
                  que <em className="text-white">grandes negócios de impacto</em> nascem quando
                  pessoas, capital e conhecimento se encontram no lugar certo — e no tempo certo.
                </p>
                <div className="mt-6 text-xs text-white/50">
                  17px base · line-height 1.5 · letter-spacing 0.01em
                </div>
              </div>
            </div>

            <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.02] divide-y divide-white/5">
              {[
                ['Display 1', '5.5rem · 88px', 'font-extrabold leading-[0.95]', 'text-[5.5rem]'],
                ['Display 2', '4.5rem · 72px', 'font-extrabold leading-[1.05]', 'text-[4.5rem]'],
                ['H1', '3rem · 48px', 'font-bold tracking-tight', 'text-5xl'],
                ['H2', '2.25rem · 36px', 'font-semibold tracking-tight', 'text-4xl'],
                ['H3', '1.5rem · 24px', 'font-semibold', 'text-2xl'],
                ['Body lg', '1.125rem · 18px', 'leading-relaxed', 'text-lg'],
                ['Body', '1rem · 16px', 'leading-relaxed', 'text-base'],
                ['Caption', '0.75rem · 12px', 'uppercase tracking-[0.25em] font-semibold', 'text-xs'],
              ].map(([label, size, modif, sample]) => (
                <div
                  key={label}
                  className="flex items-baseline gap-6 px-6 py-5"
                >
                  <div className="w-28 shrink-0 text-[11px] font-mono uppercase tracking-[0.15em] text-white/40">
                    {label}
                  </div>
                  <div className="flex-1 truncate">
                    <span className={`text-white ${sample} ${modif as string}`}>
                      O Brasil que acelera
                    </span>
                  </div>
                  <div className="shrink-0 text-[11px] font-mono text-white/40">{size}</div>
                </div>
              ))}
            </div>
          </Section>

          {/* ESPAÇAMENTO */}
          <Section id="espacamento">
            <SectionTitle kicker="03" title="Espaçamento" />
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8">
              <div className="space-y-3">
                {[
                  ['1', '4px', 4],
                  ['2', '8px', 8],
                  ['3', '12px', 12],
                  ['4', '16px', 16],
                  ['6', '24px', 24],
                  ['8', '32px', 32],
                  ['12', '48px', 48],
                  ['16', '64px', 64],
                  ['24', '96px', 96],
                ].map(([token, px, w]) => (
                  <div key={token as string} className="flex items-center gap-4">
                    <div className="w-12 text-[11px] font-mono text-white/50">{token}</div>
                    <div
                      className="h-3 rounded-sm bg-brand-orange"
                      style={{ width: `${w}px` }}
                    />
                    <div className="text-[11px] font-mono text-white/40">{px}</div>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-xs text-white/50">
                Container do site: <code>--width-content: 1126px</code>. Layout máx:{' '}
                <code>1440px</code>.
              </div>
            </div>
          </Section>

          {/* RADIUS */}
          <Section id="radius">
            <SectionTitle kicker="04" title="Border Radius" />
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                ['sm', '4px', 'rounded-sm'],
                ['md', '8px', 'rounded-md'],
                ['lg', '12px', 'rounded-lg'],
                ['xl', '16px', 'rounded-xl'],
                ['2xl', '24px', 'rounded-2xl'],
                ['3xl', '32px', 'rounded-3xl'],
                ['full', '9999px', 'rounded-full'],
              ].map(([name, val, cls]) => (
                <div key={name} className="flex flex-col items-center gap-3">
                  <div
                    className={`h-20 w-20 ${cls} bg-white/10 border border-white/15`}
                  />
                  <div className="text-center">
                    <div className="text-xs font-semibold text-white">{name}</div>
                    <div className="text-[10px] font-mono text-white/40">{val}</div>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* SOMBRAS */}
          <Section id="sombras">
            <SectionTitle kicker="05" title="Sombras & Elevação" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {[
                ['shadow-sm', 'shadow-sm'],
                ['shadow-md', 'shadow-md'],
                ['shadow-xl', 'shadow-xl'],
                ['shadow-2xl/40', 'shadow-2xl shadow-black/40'],
              ].map(([name, cls]) => (
                <div
                  key={name}
                  className={`h-28 rounded-xl bg-white text-brand-navy flex items-center justify-center text-xs font-semibold ${cls}`}
                >
                  {name}
                </div>
              ))}
            </div>
          </Section>

          {/* BOTÕES */}
          <Section id="botoes">
            <SectionTitle kicker="06" title="Botões" />
            <div className="space-y-8">
              {/* Primário / Secundário sobre dark */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8">
                <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/40 mb-5">
                  Sobre fundo escuro
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <button className="inline-flex items-center rounded-full bg-brand-orange text-white text-sm font-semibold px-7 py-4 hover:bg-[#FF9B26] hover:shadow-xl hover:shadow-brand-orange/40 transition-all duration-300 shadow-2xl shadow-black/40">
                    Botão primário
                  </button>
                  <button className="inline-flex items-center rounded-full border border-white/40 bg-white/10 backdrop-blur-sm text-white text-sm font-semibold px-7 py-4 hover:bg-white hover:text-brand-navy hover:border-white transition-all duration-300">
                    Botão secundário
                  </button>
                  <button className="inline-flex items-center text-sm font-semibold text-brand-orange hover:text-[#FF9B26] transition-all">
                    Botão terciário
                  </button>
                  <button
                    disabled
                    className="inline-flex items-center rounded-full bg-white/10 text-white/40 text-sm font-semibold px-7 py-4 cursor-not-allowed"
                  >
                    Desabilitado
                  </button>
                </div>
              </div>

              {/* Primário / Secundário sobre light */}
              <div className="rounded-2xl border border-white/10 bg-[#F5F4EF] p-8">
                <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-navy/50 mb-5">
                  Sobre fundo claro
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <button className="inline-flex items-center rounded-full bg-brand-orange text-white text-sm font-semibold px-7 py-4 hover:bg-[#FF9B26] hover:shadow-lg hover:shadow-brand-orange/40 transition-all duration-300 shadow-lg shadow-brand-orange/20">
                    Botão primário
                  </button>
                  <button className="inline-flex items-center rounded-full border border-brand-navy/20 bg-white text-brand-navy text-sm font-semibold px-7 py-4 hover:bg-brand-navy hover:text-white hover:border-brand-navy transition-all duration-300">
                    Botão secundário
                  </button>
                  <button className="inline-flex items-center text-sm font-semibold text-brand-navy hover:text-brand-orange transition-all">
                    Botão terciário
                  </button>
                </div>
              </div>

              {/* Tamanhos */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8">
                <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/40 mb-5">
                  Tamanhos
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <button className="inline-flex items-center rounded-full bg-brand-orange text-white text-xs font-semibold px-4 py-2">
                    SM
                  </button>
                  <button className="inline-flex items-center rounded-full bg-brand-orange text-white text-sm font-semibold px-7 py-4">
                    MD (default)
                  </button>
                  <button className="inline-flex items-center rounded-full bg-brand-orange text-white text-base font-semibold px-9 py-4">
                    LG
                  </button>
                </div>
              </div>
            </div>
          </Section>

          {/* BADGES */}
          <Section id="badges">
            <SectionTitle kicker="07" title="Badges" />
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-orange/40 bg-brand-orange/10 px-3 py-1 text-[11px] font-semibold text-brand-orange">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-orange animate-pulse" />
                Inscrições abertas
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-teal/40 bg-brand-teal/10 px-3 py-1 text-[11px] font-semibold text-brand-teal">
                Sucesso
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-semibold text-white/80">
                Neutra
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-orange px-3 py-1 text-[11px] font-bold text-white">
                Sólida
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-red-400/40 bg-red-400/10 px-3 py-1 text-[11px] font-semibold text-red-300">
                Erro
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/40 bg-amber-300/10 px-3 py-1 text-[11px] font-semibold text-amber-200">
                Atenção
              </span>
            </div>
          </Section>

          {/* EYEBROWS */}
          <Section id="eyebrows">
            <SectionTitle kicker="08" title="Eyebrows" />
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8">
                <div className="inline-flex items-center gap-2 mb-4">
                  <span className="block h-px w-8 bg-brand-orange" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-orange">
                    Acelera Pedra Branca
                  </span>
                </div>
                <p className="text-white/60 text-sm">
                  Eyebrow padrão — usado em todas as seções. Linha laranja + label uppercase.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-[#F5F4EF] p-8">
                <div className="inline-flex items-center gap-2 mb-4">
                  <span className="block h-px w-8 bg-brand-orange" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-orange">
                    Sobre fundo claro
                  </span>
                </div>
                <p className="text-[#4B6472] text-sm">
                  O mesmo padrão se mantém legível em superfícies claras.
                </p>
              </div>
            </div>
          </Section>

          {/* CARDS */}
          <Section id="cards">
            <SectionTitle kicker="09" title="Cards" />
            <div className="grid md:grid-cols-3 gap-5">
              {/* Card translúcido sobre dark */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-6 hover:bg-white/[0.06] transition">
                <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-orange mb-3">
                  Programa
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Acelera Pedra Branca</h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  Programa de aceleração de startups com mentoria, capital e acesso ao ecossistema.
                </p>
                <button className="mt-5 inline-flex items-center text-xs font-semibold text-brand-orange hover:text-[#FF9B26] transition-all">
                  Saiba mais
                </button>
              </div>

              {/* Card claro sobre dark */}
              <div className="rounded-2xl bg-white p-6 text-brand-navy shadow-2xl shadow-black/30">
                <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-orange mb-3">
                  Métrica
                </div>
                <div className="text-5xl font-extrabold tracking-tight text-brand-navy">+300</div>
                <div className="mt-2 text-sm text-[#4B6472]">startups aceleradas</div>
              </div>

              {/* Card outline */}
              <div className="rounded-2xl border-2 border-dashed border-white/15 p-6">
                <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/40 mb-3">
                  Outline
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Card vazio</h3>
                <p className="text-sm text-white/50 leading-relaxed">
                  Use em estados vazios ou áreas de upload.
                </p>
              </div>
            </div>
          </Section>

          {/* INPUTS */}
          <Section id="inputs">
            <SectionTitle kicker="10" title="Inputs & Forms" />
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 space-y-5">
                <label className="block">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">
                    Nome completo
                  </span>
                  <input
                    type="text"
                    placeholder="Seu nome"
                    className="mt-2 w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-brand-orange focus:bg-white/[0.06]"
                  />
                </label>
                <label className="block">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">
                    E-mail
                  </span>
                  <input
                    type="email"
                    defaultValue="contato@inaitec.org"
                    className="mt-2 w-full rounded-xl border border-brand-teal/50 bg-brand-teal/[0.05] px-4 py-3 text-sm text-white outline-none focus:border-brand-teal"
                  />
                  <span className="mt-1.5 inline-block text-[11px] text-brand-teal">
                    ✓ válido
                  </span>
                </label>
                <label className="block">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">
                    Telefone
                  </span>
                  <input
                    type="tel"
                    defaultValue="(48) 9999-99"
                    className="mt-2 w-full rounded-xl border border-red-400/60 bg-red-500/[0.06] px-4 py-3 text-sm text-white outline-none focus:border-red-400"
                  />
                  <span className="mt-1.5 inline-block text-[11px] text-red-300">
                    Telefone incompleto
                  </span>
                </label>
                <label className="block">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">
                    Mensagem
                  </span>
                  <textarea
                    rows={4}
                    placeholder="Conte-nos sobre o seu projeto…"
                    className="mt-2 w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-brand-orange focus:bg-white/[0.06] resize-none"
                  />
                </label>
              </div>

              {/* Light variant */}
              <div className="rounded-2xl bg-[#F5F4EF] p-8 space-y-5">
                <label className="block">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-navy/60">
                    Nome completo
                  </span>
                  <input
                    type="text"
                    placeholder="Seu nome"
                    className="mt-2 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-brand-navy placeholder:text-[#8A9FAD] outline-none transition focus:border-brand-orange"
                  />
                </label>
                <label className="block">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-navy/60">
                    Empresa
                  </span>
                  <input
                    type="text"
                    placeholder="Nome da empresa"
                    className="mt-2 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-brand-navy placeholder:text-[#8A9FAD] outline-none transition focus:border-brand-orange"
                  />
                </label>
                <button className="w-full rounded-full bg-brand-orange text-white text-sm font-semibold py-4 hover:bg-[#FF9B26] hover:shadow-lg hover:shadow-brand-orange/40 transition-all">
                  Enviar mensagem
                </button>
              </div>
            </div>
          </Section>

          {/* CHECKBOXES */}
          <Section id="checkboxes">
            <SectionTitle kicker="11" title="Checkboxes" />
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 space-y-4">
              {[
                ['Quero receber novidades sobre programas', check1, () => setCheck1(!check1)],
                ['Concordo com os termos e a política de privacidade', check2, () => setCheck2(!check2)],
              ].map(([label, on, toggle]) => (
                <label key={label as string} className="flex items-center gap-3 cursor-pointer group">
                  <button
                    onClick={toggle as () => void}
                    type="button"
                    aria-pressed={on as boolean}
                    className={`h-5 w-5 rounded-md border flex items-center justify-center transition ${
                      on
                        ? 'bg-brand-orange border-brand-orange'
                        : 'border-white/30 group-hover:border-white/60'
                    }`}
                  >
                    {(on as boolean) && (
                      <Check strokeWidth={2.5} className="h-3 w-3 text-white" />
                    )}
                  </button>
                  <span className={`text-sm ${on ? 'text-white' : 'text-white/60'}`}>
                    {label as string}
                  </span>
                </label>
              ))}
            </div>
          </Section>

          {/* TOGGLES */}
          <Section id="toggles">
            <SectionTitle kicker="12" title="Toggles" />
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] divide-y divide-white/5">
              {[
                ['Notificações por e-mail', 'Receba atualizações sobre programas e chamadas.', toggle, () => setToggle(!toggle)],
                ['Modo destaque na home', 'Exibe o programa em destaque no carrossel principal.', toggle2, () => setToggle2(!toggle2)],
              ].map(([title, sub, on, t]) => (
                <div key={title as string} className="flex items-center justify-between gap-6 px-6 py-5">
                  <div>
                    <div className="text-sm font-semibold text-white">{title as string}</div>
                    <div className="text-xs text-white/50 mt-0.5">{sub as string}</div>
                  </div>
                  <button
                    onClick={t as () => void}
                    role="switch"
                    aria-checked={on as boolean}
                    className={`relative h-6 w-11 rounded-full transition ${
                      on ? 'bg-brand-orange' : 'bg-white/15'
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                        on ? 'translate-x-5' : ''
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </Section>

          {/* TABS */}
          <Section id="tabs">
            <SectionTitle kicker="13" title="Tabs" />
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8">
              <div className="border-b border-white/10 flex gap-1">
                {['Visão geral', 'Cronograma', 'Mentores', 'FAQ'].map((label, i) => (
                  <button
                    key={label}
                    onClick={() => setActiveTabDemo(i)}
                    className={`px-5 py-3 text-sm font-semibold border-b-2 transition ${
                      i === activeTabDemo
                        ? 'border-brand-orange text-white'
                        : 'border-transparent text-white/50 hover:text-white'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <div className="pt-6 text-sm text-white/70 leading-relaxed">
                {activeTabDemo === 0 && 'Visão geral do programa: objetivos, critérios de seleção e benefícios oferecidos às startups participantes.'}
                {activeTabDemo === 1 && 'Cronograma: inscrições, entrevistas, imersão de 3 meses e Demo Day com investidores e parceiros corporativos.'}
                {activeTabDemo === 2 && 'Mentores: +40 especialistas em tecnologia, negócios, captação e internacionalização disponíveis para as startups.'}
                {activeTabDemo === 3 && 'FAQ: tire as principais dúvidas sobre elegibilidade, processo seletivo e compromissos durante o programa.'}
              </div>
            </div>
          </Section>

          {/* DROPDOWNS */}
          <Section id="dropdowns">
            <SectionTitle kicker="14" title="Dropdowns / Select" />
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8">
              <div className="relative max-w-sm">
                <button
                  onClick={() => setDropdownOpen((v) => !v)}
                  className="w-full flex items-center justify-between rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-white hover:bg-white/[0.06] transition"
                >
                  <span>{dropdownValue}</span>
                  <ChevronDown
                    strokeWidth={2}
                    className={`h-4 w-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {dropdownOpen && (
                  <div className="absolute z-10 left-0 right-0 mt-2 rounded-xl border border-white/10 bg-brand-navy shadow-2xl shadow-black/50 overflow-hidden">
                    {['Acelera Pedra Branca', 'Inova Conexões', 'Lab Open Innovation', 'Trilha Investidor'].map(
                      (opt) => (
                        <button
                          key={opt}
                          onClick={() => {
                            setDropdownValue(opt)
                            setDropdownOpen(false)
                          }}
                          className={`w-full text-left px-4 py-3 text-sm transition ${
                            opt === dropdownValue
                              ? 'bg-brand-orange/15 text-brand-orange'
                              : 'text-white/80 hover:bg-white/5'
                          }`}
                        >
                          {opt}
                        </button>
                      ),
                    )}
                  </div>
                )}
              </div>
            </div>
          </Section>

          {/* TOASTS */}
          <Section id="toasts">
            <SectionTitle kicker="15" title="Toasts" />
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 space-y-5">
              <button
                onClick={triggerToast}
                className="inline-flex items-center rounded-full bg-brand-orange text-white text-sm font-semibold px-7 py-4 hover:bg-[#FF9B26] hover:shadow-lg hover:shadow-brand-orange/40 transition"
              >
                Disparar toast
              </button>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 rounded-xl border border-brand-teal/30 bg-brand-teal/[0.08] px-4 py-3">
                  <span className="mt-0.5 h-2 w-2 rounded-full bg-brand-teal" />
                  <div>
                    <div className="text-sm font-semibold text-white">Inscrição confirmada!</div>
                    <div className="text-xs text-white/60 mt-0.5">
                      Em breve você receberá os próximos passos por e-mail.
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-xl border border-red-400/30 bg-red-500/[0.08] px-4 py-3">
                  <span className="mt-0.5 h-2 w-2 rounded-full bg-red-400" />
                  <div>
                    <div className="text-sm font-semibold text-white">Não foi possível enviar.</div>
                    <div className="text-xs text-white/60 mt-0.5">
                      Verifique a conexão e tente novamente.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          {/* ALERTAS */}
          <Section id="alertas">
            <SectionTitle kicker="16" title="Alertas & Feedbacks" />
            <div className="space-y-3">
              {[
                ['info', 'var(--color-brand-orange)', 'Inscrições do próximo ciclo abrem em 12 de junho.'],
                ['success', 'var(--color-brand-teal)', 'Sua candidatura foi recebida com sucesso.'],
                ['warning', '#F5C84B', 'Seu perfil ainda está incompleto — finalize para concorrer.'],
                ['danger', '#F87171', 'Não foi possível enviar sua mensagem. Tente novamente.'],
              ].map(([type, color, msg]) => (
                <div
                  key={type as string}
                  className="flex items-start gap-4 rounded-xl border px-5 py-4"
                  style={{
                    borderColor: `${color}55`,
                    backgroundColor: `${color}12`,
                  }}
                >
                  <span
                    className="mt-1 h-2 w-2 rounded-full"
                    style={{ backgroundColor: color as string }}
                  />
                  <div className="flex-1">
                    <div className="text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: color as string }}>
                      {type as string}
                    </div>
                    <div className="text-sm text-white/80 mt-1">{msg as string}</div>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* MODAIS */}
          <Section id="modais">
            <SectionTitle kicker="17" title="Modais" />
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8">
              <button
                onClick={() => setShowModal(true)}
                className="inline-flex items-center rounded-full bg-brand-orange text-white text-sm font-semibold px-7 py-4 hover:bg-[#FF9B26] hover:shadow-lg hover:shadow-brand-orange/40 transition"
              >
                Abrir modal
              </button>
            </div>
          </Section>

          {/* DIVIDERS */}
          <Section id="dividers">
            <SectionTitle kicker="18" title="Dividers" />
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 space-y-8">
              <div>
                <div className="text-[11px] font-mono text-white/40 mb-2">Solid</div>
                <div className="h-px bg-white/15" />
              </div>
              <div>
                <div className="text-[11px] font-mono text-white/40 mb-2">Soft</div>
                <div className="h-px bg-white/[0.06]" />
              </div>
              <div>
                <div className="text-[11px] font-mono text-white/40 mb-2">Brand stripe</div>
                <div className="h-px bg-brand-orange" />
              </div>
              <div>
                <div className="text-[11px] font-mono text-white/40 mb-2">Eyebrow inline</div>
                <div className="inline-flex items-center gap-3">
                  <span className="block h-px w-12 bg-white/20" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/60">
                    Mantenedores
                  </span>
                  <span className="block h-px w-12 bg-white/20" />
                </div>
              </div>
            </div>
          </Section>

          {/* Footer da DS */}
          <footer className="py-16 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/40 mb-1.5">
                Inaitec · Design System
              </div>
              <div className="text-xs text-white/30">
                Tokens em <code className="text-brand-orange">src/app/globals.css</code> · rota oculta{' '}
                <code className="text-brand-orange">/design-system</code>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-white/30 shrink-0">
              <span>Criado por</span>
              <Image
                src="/atomsix-signature.svg"
                alt="Atom6 Studio"
                width={30}
                height={8}
                className="opacity-40 hover:opacity-70 transition-opacity"
              />
            </div>
          </footer>
        </div>
      </div>

      {/* Toast flutuante */}
      <div
        className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
          showToast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <div className="flex items-center gap-3 rounded-xl border border-brand-orange/40 bg-brand-navy shadow-2xl shadow-black/50 px-5 py-3">
          <span className="h-2 w-2 rounded-full bg-brand-orange animate-pulse" />
          <div className="text-sm font-semibold text-white">Token copiado para a área de transferência</div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-6"
          onClick={() => setShowModal(false)}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <div
            className="relative max-w-md w-full rounded-2xl bg-brand-navy border border-white/10 p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 inline-flex items-center gap-2">
              <span className="block h-px w-8 bg-brand-orange" />
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-orange">
                Confirmação
              </span>
            </div>
            <h3 className="text-2xl font-semibold text-white mb-3 tracking-tight">
              Cancelar inscrição?
            </h3>
            <p className="text-sm text-white/60 leading-relaxed mb-6">
              Esta ação não pode ser desfeita. Sua candidatura ao programa Acelera Pedra Branca
              será removida.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="inline-flex items-center rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white/80 hover:bg-white/5 transition"
              >
                Manter inscrição
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="inline-flex items-center rounded-full bg-red-500/90 hover:bg-red-500 px-5 py-2.5 text-sm font-semibold text-white transition"
              >
                Sim, cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
