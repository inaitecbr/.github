import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Download } from 'lucide-react'
import AnimatedCounter from '@/components/AnimatedCounter'
import BrandPattern from '@/components/BrandPattern'
import { Section, Container } from '@/components/Section'

export const metadata: Metadata = {
  title: 'Sobre',
  description:
    'Há 15 anos o Inaitec opera o Parque Pedra Branca, em Palhoça (SC): +200 empresas instaladas, +300 startups aceleradas e R$ 180M em capital movimentado. Conheça o instituto.',
}

/* ─────────────────────────────────────────────────────────────────────────
   /sobre — página única com âncoras para todas as sub-seções do sitemap
   ───────────────────────────────────────────────────────────────────────── */

const VALORES = [
  {
    titulo: 'Conexão',
    desc: 'Aproximamos startups, corporações, academia e governo para gerar negócios de impacto real.',
  },
  {
    titulo: 'Transparência',
    desc: 'Resultados, métodos e governança publicados abertamente — instituição pública precisa prestar contas.',
  },
  {
    titulo: 'Excelência',
    desc: 'Mentoria, infraestrutura e processos no padrão dos hubs de inovação mais maduros do mundo.',
  },
  {
    titulo: 'Impacto',
    desc: 'Cada programa é desenhado para mover indicadores: empregos qualificados, receita, exportação, ESG.',
  },
] as const

const HISTORIA = [
  { ano: '2010', titulo: 'Fundação', desc: 'Nasce o Inaitec dentro do Parque Pedra Branca como instituto de inovação aplicada.' },
  { ano: '2013', titulo: 'Primeira aceleração', desc: 'Lançamento do programa Acelera Pedra Branca — 12 startups na turma inaugural.' },
  { ano: '2017', titulo: 'Inovação aberta', desc: 'Primeiros desafios de inovação aberta com grandes corporações catarinenses.' },
  { ano: '2020', titulo: 'Hub regional', desc: 'Consolidação como o maior hub urbano de inovação do Sul do Brasil.' },
  { ano: '2023', titulo: '+200 empresas', desc: 'O ecossistema ultrapassa 200 empresas instaladas no Parque Pedra Branca.' },
  { ano: '2026', titulo: '15 anos', desc: 'Aniversário marcado pela expansão da estrutura física e novos verticais.' },
] as const

type Pessoa = {
  nome: string
  cargo: string
  /** Caminho da foto. Deixe `null` para renderizar placeholder com iniciais. */
  foto: string | null
}

const CONSELHO_DELIBERATIVO: Pessoa[] = [
  { nome: 'Guillermo Arturo Vieira', cargo: 'Presidente', foto: '/team/guillermo-arturo.png' },
  { nome: 'Marcelo C. Gomes', cargo: 'Vice-Presidente', foto: '/team/marcelo-gomes.png' },
  { nome: 'Marcelo Vargas Hilman', cargo: 'Conselheiro', foto: '/team/marcelo-hilman.png' },
  { nome: 'Vânio Pacheco de Abreu', cargo: 'Conselheiro', foto: '/team/vanio.png' },
]

const CONSELHO_FISCAL: Pessoa[] = [
  { nome: 'Fabiano da Costa', cargo: 'Presidente', foto: null },
  { nome: 'Fabiana Baya Silveira', cargo: 'Conselheira', foto: null },
  { nome: 'Pedro Alfinitto Capistrano', cargo: 'Conselheiro', foto: null },
]

const CONSELHO_TECNICO: Pessoa[] = [
  { nome: 'Marcelo Vargas Hilman', cargo: 'Membro', foto: null },
  { nome: 'Diego Chierighini', cargo: 'Membro', foto: null },
]

const JURIDICO: Pessoa[] = [
  { nome: 'Eduardo Murakami', cargo: 'Jurídico', foto: null },
]

const DIRETORIA: Pessoa[] = [
  { nome: 'Diego Chierighini', cargo: 'Diretor Executivo', foto: '/team/diego.png' },
  { nome: 'Lucas Teixeira', cargo: 'Gerência de Comunicação/Marketing', foto: '/team/lucas-teixeira.png' },
  { nome: 'Tamiko Yamada', cargo: 'Gerência de Programa e Operação', foto: '/team/tamiko.png' },
]

function getInitials(nome: string) {
  const partes = nome.trim().split(/\s+/).filter((p) => p.length > 1)
  if (partes.length === 0) return '·'
  if (partes.length === 1) return partes[0].slice(0, 2).toUpperCase()
  return (partes[0][0] + partes[partes.length - 1][0]).toUpperCase()
}

const RELATORIOS = [
  { ano: '2025', destaque: '320 startups', resumo: 'Maior turma da história do Inaitec — entre programas próprios e parcerias estratégicas.' },
  { ano: '2024', destaque: 'R$ 180M', resumo: 'Capital privado movimentado pelas empresas do ecossistema em rodadas, M&A e contratos.' },
  { ano: '2023', destaque: '+12 mil empregos', resumo: 'Empregos qualificados gerados em Santa Catarina por startups e residentes do Parque.' },
  { ano: '2022', destaque: '60 corporações', resumo: 'Grandes empresas conectadas a startups em chamadas de inovação aberta.' },
] as const

const ESTRUTURA = [
  { area: '12 mil m²', desc: 'de área construída ativa em coworking, salas privativas, labs e auditório.' },
  { area: '4 andares', desc: 'do edifício principal com acesso 24/7 para empresas residentes.' },
  { area: '+200', desc: 'empresas instaladas hoje no Parque Pedra Branca, do estágio de tração à corporate.' },
  { area: '2027', desc: 'previsão de entrega da nova ala — +5 mil m² para labs especializados e investidores.' },
] as const

export default function SobrePage() {
  return (
    <main className="relative bg-[#0D2E38] overflow-x-clip">

      {/* ── Fundo orgânico unificado ──────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-[40vh] left-[-10%] w-[1000px] h-[1000px] rounded-full bg-[#FA8400]/[0.10] blur-[160px]" />
        <div className="absolute top-[180vh] right-[-15%] w-[1100px] h-[1100px] rounded-full bg-[#00C08B]/[0.06] blur-[160px]" />
        <div className="absolute top-[320vh] left-[15%] w-[900px] h-[900px] rounded-full bg-[#FA8400]/[0.08] blur-[160px]" />
        <div className="absolute top-[460vh] right-[-10%] w-[800px] h-[800px] rounded-full bg-[#004E69]/40 blur-[150px]" />

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
                Sobre o Inaitec
              </span>
            </div>

            <h1 className="font-extrabold text-white text-display-xl leading-[1.2] tracking-tight">
              15 anos construindo o ecossistema<br />
              <span className="italic font-medium text-[#FA8400]">que move o Brasil</span>
            </h1>

            <p className="mt-6 max-w-xl text-white/70 text-base leading-relaxed">
              Operamos o Parque Pedra Branca, em Palhoça (SC) — onde +200 empresas, +300 startups
              aceleradas e R$ 180M em capital se encontram em um único endereço.
            </p>

            {/* Quick links — navegação interna do Sobre */}
            <nav aria-label="Navegação da página" className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] font-semibold text-white/55">
              <a href="#quem-somos" className="hover:text-[#FA8400] transition-colors">Quem somos</a>
              <span className="block w-1 h-1 rounded-full bg-white/20" />
              <a href="#nossa-historia" className="hover:text-[#FA8400] transition-colors">História</a>
              <span className="block w-1 h-1 rounded-full bg-white/20" />
              <a href="#lideranca" className="hover:text-[#FA8400] transition-colors">Liderança</a>
              <span className="block w-1 h-1 rounded-full bg-white/20" />
              <a href="#relatorio" className="hover:text-[#FA8400] transition-colors">Relatório</a>
              <span className="block w-1 h-1 rounded-full bg-white/20" />
              <a href="#estrutura" className="hover:text-[#FA8400] transition-colors">Estrutura</a>
            </nav>
          </div>

          <div className="relative aspect-[4/3] lg:aspect-auto rounded-3xl overflow-hidden ring-1 ring-white/10 shadow-2xl shadow-black/40">
            <Image
              src="/imagens-destaques/inaitec8.jpg"
              alt="Ecossistema Inaitec — Parque Pedra Branca"
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 45vw, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#0D2E38]/60 via-transparent to-transparent" />
          </div>
        </Container>
      </section>

      {/* ── 2. Quem somos ─────────────────────────────────────────────── */}
      <Section id="quem-somos" theme="light" padding="md" className="scroll-mt-24">
          <div className="grid lg:grid-cols-[420px_1fr] gap-16">
            <div>
              <div className="mb-5 inline-flex items-center gap-2">
                <span className="block h-px w-8 bg-[#FA8400]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FA8400]">
                  Quem somos
                </span>
              </div>
              <h2 className="font-extrabold text-display-xl leading-[1.2] tracking-tight">
                O ponto de encontro entre quem cria, quem investe e <span className="italic font-medium text-[#FA8400]">quem decide</span>.
              </h2>
              <p className="mt-6 text-[#0D2E38]/70 text-base leading-relaxed">
                Damos infraestrutura, mentoria e acesso a capital para quem está construindo.
                Estruturamos desafios reais para corporações que precisam inovar fora da própria
                caixa. E articulamos governo, academia e iniciativa privada em torno de uma agenda
                comum: tirar projetos do papel.
              </p>
            </div>

            {/* Missão / Visão / Valores */}
            <div className="grid gap-4">
              <div className="rounded-2xl bg-white p-8 border border-[#E8E6E1]">
                <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#FA8400] mb-2">
                  Missão
                </div>
                <p className="text-lg leading-relaxed">
                  Acelerar startups, destravar inovação aberta com corporações e fazer do Parque
                  Pedra Branca a referência nacional de inovação aplicada.
                </p>
              </div>
              <div className="rounded-2xl bg-white p-8 border border-[#E8E6E1]">
                <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#FA8400] mb-2">
                  Visão
                </div>
                <p className="text-lg leading-relaxed">
                  Ser, até 2030, o hub urbano de inovação mais relevante do Sul do Brasil — medido
                  em negócios gerados, capital atraído e impacto social entregue.
                </p>
              </div>
              <div className="rounded-2xl bg-white p-8 border border-[#E8E6E1]">
                <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#FA8400] mb-4">
                  Valores
                </div>
                <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
                  {VALORES.map((v) => (
                    <li key={v.titulo} className="flex gap-3">
                      <span className="mt-2 block h-1.5 w-1.5 rounded-full bg-[#FA8400] shrink-0" />
                      <div>
                        <div className="font-semibold text-[#0D2E38]">{v.titulo}</div>
                        <div className="text-sm text-[#0D2E38]/65 leading-relaxed">{v.desc}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
      </Section>

      {/* ── 3. Nossa história ─────────────────────────────────────────── */}
      <section
        id="nossa-historia"
        className="relative z-10 scroll-mt-24 py-16 overflow-hidden"
      >
        <BrandPattern
          variant="dots"
          color="#FA8400"
          className="absolute top-20 right-0 w-96 h-96 opacity-20 pointer-events-none"
        />

        <Container className="relative">
          <div className="max-w-2xl mb-16">
            <div className="mb-5 inline-flex items-center gap-2">
              <span className="block h-px w-8 bg-[#FA8400]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FA8400]">
                Nossa história
              </span>
            </div>
            <h2 className="font-extrabold text-white text-display-xl leading-[1.2] tracking-tight">
              De 2010 a hoje:{' '}
              <span className="italic font-medium text-[#FA8400]">15 anos</span> que mudaram o mapa
              da inovação no Sul.
            </h2>
            <p className="mt-6 text-white/65 text-base leading-relaxed">
              Da turma inaugural de 12 startups em 2013 às +200 empresas instaladas hoje, cada
              marco da nossa linha do tempo é também um marco do ecossistema Pedra Branca.
            </p>
          </div>

          {/* Timeline horizontal */}
          <div className="relative">
            <div className="absolute left-0 right-0 top-8 h-px bg-white/15 hidden md:block" />
            <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8">
              {HISTORIA.map((item, i) => (
                <li key={item.ano} className="relative group">
                  <div
                    className={`relative z-10 mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full font-extrabold text-sm tracking-tight transition-all duration-300 ${
                      i === HISTORIA.length - 1
                        ? 'bg-[#FA8400] text-white shadow-lg shadow-[#FA8400]/30 group-hover:scale-105'
                        : 'bg-[#0D2E38] border border-white/15 text-white group-hover:border-[#FA8400]/60 group-hover:bg-[#FA8400]/10'
                    }`}
                  >
                    {item.ano}
                  </div>
                  <h3 className="text-white font-semibold text-base mb-2 group-hover:text-[#FA8400] transition-colors">
                    {item.titulo}
                  </h3>
                  <p className="text-white/55 text-sm leading-relaxed">{item.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* ── 4. Presidência e Conselho de Administração ────────────────── */}
      <Section id="lideranca" theme="light" padding="md" className="scroll-mt-24">
          <div className="flex flex-wrap items-end justify-between gap-8 mb-16">
            <div className="max-w-2xl">
              <div className="mb-5 inline-flex items-center gap-2">
                <span className="block h-px w-8 bg-[#FA8400]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FA8400]">
                  Presidência e Conselho
                </span>
              </div>
              <h2 className="font-extrabold text-display-xl leading-[1.2] tracking-tight">
                Governança que une <span className="italic font-medium text-[#FA8400]">instituição, capital e ecossistema</span>.
              </h2>
              <p className="mt-6 text-[#0D2E38]/70 text-base leading-relaxed">
                Conselho de Administração renovado a cada 4 anos, com assento de mantenedores,
                governo e sociedade civil. Decisão pública, prestação de contas pública — porque
                instituição séria não opera no escuro.
              </p>
            </div>
          </div>

          {/* Diretoria Executiva e Gerências */}
          <div className="mb-20">
            <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FA8400] mb-2">
                  Diretoria Executiva e Gerências
                </div>
                <h3 className="font-extrabold text-2xl md:text-3xl leading-tight">
                  Quem opera o dia a dia
                </h3>
              </div>
              <p className="text-sm text-[#0D2E38]/55 max-w-md leading-relaxed">
                Time executivo responsável pela execução dos programas, comunicação e relação com
                empresas residentes.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {DIRETORIA.map((p) => (
                <PessoaCard key={p.nome} pessoa={p} />
              ))}
            </div>
          </div>

          {/* Conselhos — Deliberativo + apoio (Fiscal, Técnico, Jurídico) */}
          <div>
            <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FA8400] mb-2">
                  Conselhos
                </div>
                <h3 className="font-extrabold text-2xl md:text-3xl leading-tight">
                  Direção estratégica e conselhos de apoio
                </h3>
              </div>
              <p className="text-sm text-[#0D2E38]/55 max-w-md leading-relaxed">
                O Conselho Deliberativo define rumos institucionais e zela pela governança,
                apoiado pelos conselhos Fiscal, Técnico e Jurídico.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <ConselhoCompacto
                titulo="Conselho Deliberativo"
                desc="Define rumos institucionais, aprova orçamento e zela pela governança."
                membros={CONSELHO_DELIBERATIVO}
                accent="#FA8400"
                destaque
              />
              <ConselhoCompacto
                titulo="Conselho Fiscal"
                desc="Acompanha contas, auditoria e prestação pública."
                membros={CONSELHO_FISCAL}
                accent="#00C08B"
              />
              <ConselhoCompacto
                titulo="Conselho Técnico"
                desc="Avalia mérito de programas, editais e parcerias estratégicas."
                membros={CONSELHO_TECNICO}
                accent="#FFB560"
              />
              <ConselhoCompacto
                titulo="Jurídico"
                desc="Suporte legal e conformidade regulatória do hub."
                membros={JURIDICO}
                accent="#4A9EE0"
              />
            </div>
          </div>
      </Section>

      {/* ── 5. Relatório de Atividades ────────────────────────────────── */}
      <Section id="relatorio" padding="md" className="scroll-mt-24">
          <div className="max-w-2xl mb-16">
            <div className="mb-5 inline-flex items-center gap-2">
              <span className="block h-px w-8 bg-[#FA8400]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FA8400]">
                Relatório de atividades
              </span>
            </div>
            <h2 className="font-extrabold text-white text-display-xl leading-[1.2] tracking-tight">
              O que prometemos.<br />
              <span className="italic font-medium text-[#FA8400]">O que entregamos</span>.
            </h2>
            <p className="mt-6 text-white/65 text-base leading-relaxed">
              Todo ano publicamos quanto capital movimentamos, quantas empresas aceleramos e quantos
              empregos geramos. Sem maquiagem, sem release. Os PDFs estão aqui — abertos para quem
              quiser conferir.
            </p>
          </div>

          {/* Big numbers — destaque agregado em card glass */}
          <div className="relative mb-16 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-md overflow-hidden">
            {/* Glow interno sutil */}
            <div className="pointer-events-none absolute -top-32 -left-20 w-[400px] h-[400px] rounded-full bg-[#FA8400]/[0.08] blur-[120px]" />
            <div className="pointer-events-none absolute -bottom-32 -right-20 w-[400px] h-[400px] rounded-full bg-[#00C08B]/[0.06] blur-[120px]" />

            <div className="relative grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/10">
              {[
                { value: '+300', label: 'startups aceleradas' },
                { value: 'R$180M', label: 'em capital movimentado' },
                { value: '+12mil', label: 'empregos gerados' },
                { value: '+200', label: 'empresas instaladas' },
              ].map((m) => (
                <div
                  key={m.label}
                  className="flex flex-col gap-2 px-4 py-8 sm:px-6 sm:py-10"
                >
                  <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight whitespace-nowrap">
                    <AnimatedCounter value={m.value} />
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/55">
                    {m.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Lista anual */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {RELATORIOS.map((r) => (
              <a
                key={r.ano}
                href="#"
                className="group relative rounded-2xl border border-white/10 bg-white/[0.03] p-8 hover:bg-white/[0.06] hover:border-[#FA8400]/40 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                {/* Glow interno no hover */}
                <span className="pointer-events-none absolute -top-20 -right-20 w-[200px] h-[200px] rounded-full bg-[#FA8400]/0 group-hover:bg-[#FA8400]/15 blur-[60px] transition-all duration-500" />

                <div className="relative flex items-baseline justify-between mb-6">
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#FA8400]">
                    Relatório
                  </span>
                  <span className="text-3xl font-extrabold text-white tracking-tight">
                    {r.ano}
                  </span>
                </div>
                <div className="relative text-2xl font-bold text-white mb-2 leading-tight">
                  {r.destaque}
                </div>
                <p className="relative text-sm text-white/55 leading-relaxed mb-6">{r.resumo}</p>
                <span className="relative inline-flex items-center text-xs font-semibold text-[#FA8400] group-hover:text-[#FF9B26] transition-all">
                  Baixar PDF
                </span>
              </a>
            ))}
          </div>
      </Section>

      {/* ── 5b. Media Kit ─────────────────────────────────────────────── */}
      <Section padding="md">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-8 sm:p-10 lg:p-12">
            <div className="pointer-events-none absolute -top-24 -right-16 w-[360px] h-[360px] rounded-full bg-[#FA8400]/[0.10] blur-[120px]" />

            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-xl">
                <div className="mb-4 inline-flex items-center gap-2">
                  <span className="block h-px w-8 bg-[#FA8400]" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FA8400]">
                    Imprensa & marca
                  </span>
                </div>
                <h2 className="font-extrabold text-white text-display-lg leading-[1.2] tracking-tight">
                  Baixe o <span className="italic font-medium text-[#FA8400]">media kit</span>
                </h2>
                <p className="mt-4 text-white/65 text-base leading-relaxed">
                  Logos, guia de marca, fotos em alta resolução e dados institucionais — tudo o
                  que você precisa para falar sobre o Inaitec.
                </p>
              </div>

              <a
                href="#"
                className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#FA8400] text-white text-sm font-semibold px-7 py-4 shadow-lg shadow-[#FA8400]/25 transition-all hover:bg-[#FF9B26] hover:shadow-xl hover:shadow-[#FA8400]/40 lg:w-auto shrink-0"
              >
                <Download strokeWidth={2} className="w-4 h-4" />
                Baixar media kit (.zip)
              </a>
            </div>
          </div>
      </Section>

      {/* ── 6. Estrutura Inaitec ──────────────────────────────────────── */}
      <section
        id="estrutura"
        data-theme="light"
        className="relative z-10 scroll-mt-24 bg-[#F5F4EF] text-[#0D2E38] overflow-hidden"
      >
        <BrandPattern
          variant="dots"
          color="#0D2E38"
          className="absolute -top-10 left-[5%] w-80 h-80 opacity-[0.08] pointer-events-none"
        />

        <Container className="relative py-16">
          <div className="grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 items-stretch">

            {/* Imagem do edifício com endereço flutuante */}
            <div className="relative rounded-3xl overflow-hidden bg-[#0D2E38] min-h-[480px] lg:min-h-[600px]">
              <Image
                src="/imagens-destaques/inaitec7.jpg"
                alt="Edifício Inaitec — Parque Pedra Branca"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D2E38]/75 via-[#0D2E38]/15 to-transparent" />

              {/* Badge "nova ala em obras" no topo */}
              <div className="absolute top-6 left-6">
                <span className="rounded-full bg-[#FA8400] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white inline-flex items-center gap-1.5 shadow-lg shadow-[#FA8400]/30">
                  <span className="block w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  Nova ala em obras
                </span>
              </div>

              {/* Endereço flutuante na base */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="inline-flex flex-col rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 px-5 py-4 max-w-sm">
                  <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/65 mb-1">
                    Endereço
                  </div>
                  <div className="text-white font-semibold text-sm leading-snug">
                    Av. Pedra Branca, 25<br />
                    Cidade Universitária Pedra Branca<br />
                    Palhoça — SC
                  </div>
                </div>
              </div>
            </div>

            {/* Conteúdo + métricas */}
            <div className="flex flex-col justify-center">
              <div className="mb-5 inline-flex items-center gap-2">
                <span className="block h-px w-8 bg-[#FA8400]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FA8400]">
                  Estrutura Inaitec
                </span>
              </div>
              <h2 className="font-extrabold text-display-xl leading-[1.2] tracking-tight">
                12 mil m² para a <span className="italic font-medium text-[#FA8400]">inovação acontecer</span>.
              </h2>
              <p className="mt-6 text-[#0D2E38]/70 text-base leading-relaxed">
                Coworking, salas privativas, laboratórios de prototipagem e auditório para 200
                pessoas — no coração do Parque Pedra Branca. Em 2027, +5 mil m² entram em operação
                para labs especializados e novos investidores.
              </p>

              {/* Métricas em grid limpo */}
              <dl className="mt-10 pt-8 border-t border-[#0D2E38]/10 grid grid-cols-2 gap-x-8 gap-y-8">
                {ESTRUTURA.map((e) => (
                  <div key={e.area} className="flex flex-col gap-1.5">
                    <dt className="text-3xl md:text-4xl font-extrabold text-[#0D2E38] tracking-tight">
                      {e.area}
                    </dt>
                    <dd className="text-sm text-[#0D2E38]/65 leading-relaxed">{e.desc}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 7. CTA final — Fale conosco ───────────────────────────────── */}
      <Section padding="md">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0D2E38] via-[#004E69] to-[#0D2E38] p-8 sm:p-12 md:p-20">
            <div className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full bg-[#FA8400]/20 blur-[140px]" />
            <div className="absolute -bottom-32 -left-20 w-[400px] h-[400px] rounded-full bg-[#00C08B]/10 blur-[120px]" />

            <div className="relative grid lg:grid-cols-[1fr_auto] gap-10 items-center">
              <div>
                <div className="mb-5 inline-flex items-center gap-2">
                  <span className="block h-px w-8 bg-[#FA8400]" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FA8400]">
                    Vamos conversar
                  </span>
                </div>
                <h2 className="font-extrabold text-white text-display-xl leading-[1.2] tracking-tight max-w-2xl">
                  Pronto para fazer parte do{' '}
                  <span className="italic font-medium text-[#FA8400]">próximo capítulo</span>?
                </h2>
                <p className="mt-5 text-white/70 text-base leading-relaxed max-w-xl">
                  Traga sua empresa, proponha uma parceria ou agende uma visita. A próxima onda de
                  inovação no Brasil pode começar com essa conversa.
                </p>
              </div>
              <div className="w-full flex flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                <Link
                  href="/traga-sua-empresa"
                  className="inline-flex items-center justify-center rounded-full bg-[#FA8400] text-white text-sm font-semibold px-7 py-4 hover:bg-[#FF9B26] hover:shadow-xl hover:shadow-[#FA8400]/40 transition-all duration-300 shadow-lg shadow-[#FA8400]/25"
                >
                  Traga sua empresa
                </Link>
                <Link
                  href="/fale-conosco"
                  className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/5 backdrop-blur-sm text-white text-sm font-semibold px-7 py-4 hover:bg-white/10 hover:border-white/50 transition-all duration-300"
                >
                  Fale conosco
                </Link>
              </div>
            </div>
          </div>
      </Section>
    </main>
  )
}

/* ─────────────────────────────────────────────────────────────────────────
   Subcomponentes de governança
   ───────────────────────────────────────────────────────────────────────── */

function PessoaCard({ pessoa, destaque = false }: { pessoa: Pessoa; destaque?: boolean }) {
  return (
    <article
      className={[
        'group relative rounded-2xl bg-white border overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-[#0D2E38]/10 hover:-translate-y-1',
        destaque ? 'border-[#FA8400]/40 ring-1 ring-[#FA8400]/30' : 'border-[#E8E6E1] hover:border-[#FA8400]/30',
      ].join(' ')}
    >
      <div className="relative aspect-[4/5] bg-[#F5F4EF] overflow-hidden">
        {pessoa.foto ? (
          <Image
            src={pessoa.foto}
            alt={pessoa.nome}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#0D2E38]/[0.04] via-[#FA8400]/[0.06] to-[#004E69]/[0.05]">
            <span className="text-5xl font-extrabold tracking-tight text-[#0D2E38]/35">
              {getInitials(pessoa.nome)}
            </span>
            <span className="mt-3 text-[9px] font-semibold uppercase tracking-[0.25em] text-[#0D2E38]/30">
              Foto em breve
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D2E38]/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className="p-6">
        <div
          className={[
            'text-[10px] font-bold uppercase tracking-[0.2em] mb-2',
            destaque ? 'text-[#FA8400]' : 'text-[#0D2E38]/55',
          ].join(' ')}
        >
          {pessoa.cargo}
        </div>
        <h4 className="font-bold text-lg leading-tight">{pessoa.nome}</h4>
      </div>
      <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#FA8400] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
    </article>
  )
}

function ConselhoCompacto({
  titulo,
  desc,
  membros,
  accent,
  destaque = false,
}: {
  titulo: string
  desc: string
  membros: Pessoa[]
  accent: string
  destaque?: boolean
}) {
  return (
    <div
      className={`rounded-2xl p-7 flex flex-col ${destaque ? 'bg-[#0D2E38] text-white' : 'bg-white border border-[#E8E6E1] text-[#0D2E38]'}`}
    >
      <div className="mb-5">
        <span className="block h-px w-8 mb-3" style={{ backgroundColor: accent }} />
        <h4 className="font-bold text-lg leading-tight mb-2">{titulo}</h4>
        <p className={`text-[13px] leading-relaxed ${destaque ? 'text-white/60' : 'text-[#0D2E38]/60'}`}>
          {desc}
        </p>
      </div>
      <ul
        className={`flex-1 -mx-2 ${destaque ? 'divide-y divide-white/10' : 'divide-y divide-[#E8E6E1]/70'}`}
      >
        {membros.map((m) => (
          <li key={m.nome} className="flex items-center gap-3 px-2 py-3">
            <span
              className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold tracking-tight"
              style={{ backgroundColor: `${accent}1a`, color: accent }}
            >
              {getInitials(m.nome)}
            </span>
            <div className="min-w-0">
              <div className="font-semibold text-sm leading-tight truncate">{m.nome}</div>
              <div
                className={`text-[11px] leading-tight mt-0.5 ${destaque ? 'text-white/55' : 'text-[#0D2E38]/55'}`}
              >
                {m.cargo}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
