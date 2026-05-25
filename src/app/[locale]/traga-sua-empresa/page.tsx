import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Check, MapPin } from 'lucide-react'
import { Section, Container } from '@/components/Section'

export const metadata: Metadata = {
  title: 'Traga sua empresa',
  description:
    'Instale sua empresa no Parque Pedra Branca: coworking, laboratórios, perks de mais de 30 ferramentas (HubSpot, IBM Cloud, Notion, Zendesk) e incentivos fiscais.',
}

/* ─────────────────────────────────────────────────────────────────────────
   /traga-sua-empresa — sitemap:
   1. Hero
   2. Lista com logos e benefícios (perks)
   3. Infraestrutura do Parque Pedra Branca
   4. Por que fazer parte do ecossistema Inaitec
   5. CTA
   ───────────────────────────────────────────────────────────────────────── */

const PERKS = [
  { nome: 'HubSpot', logo: '/logos/logo-hubspot.png', desc: 'Até 90% off no plano Startups por 1 ano' },
  { nome: 'IBM Cloud', logo: '/logos/logo-ibm.png', desc: 'Créditos de US$ 12k em infraestrutura cloud' },
  { nome: 'Notion', logo: '/logos/logo-notion 1.png', desc: '6 meses grátis no Plus + IA ilimitada' },
  { nome: 'Zendesk', logo: '/logos/logo-zendesk 1.png', desc: '6 meses grátis em todos os módulos' },
  { nome: 'Pipedrive', logo: '/logos/logo-pipedrive 1.png', desc: '12 meses 50% off no plano Professional' },
  { nome: 'Miro', logo: '/logos/logo-miro 1.png', desc: 'Plano Business gratuito por 6 meses' },
  { nome: 'Tally', logo: '/logos/logo-tally 1.png', desc: 'Plano Pro vitalício para residentes' },
  { nome: 'Influx', logo: '/logos/logo-influx 1.png', desc: 'Atendimento white-label com 30% off' },
] as const

const BENEFICIOS = [
  {
    titulo: 'Coworking 24/7',
    desc: 'Acesso ininterrupto, salas de reunião sob demanda, café e áreas de descompressão.',
  },
  {
    titulo: 'Laboratórios compartilhados',
    desc: 'Maker space, prototipagem, eletrônica, áudio/vídeo e bancada de testes.',
  },
  {
    titulo: 'Incentivos fiscais',
    desc: 'ISS reduzido, regimes especiais e suporte para enquadramento como Inova SC.',
  },
  {
    titulo: 'Localização premium',
    desc: 'Coração do Parque Pedra Branca, 15min do aeroporto e 8min da BR-101.',
  },
  {
    titulo: 'Conexão com investidores',
    desc: 'Demo days trimestrais com fundos parceiros e family offices catarinenses.',
  },
  {
    titulo: 'Mentoria e programas',
    desc: 'Acesso preferencial a Acelera Pedra Branca, Inovação Aberta e Globaliza.',
  },
] as const

const ESPACOS = [
  {
    nome: 'Coworking',
    metragem: '4.200 m²',
    desc: 'Plano flex, plano dedicado e plano premium para times de 1 a 30 pessoas.',
    foto: '/estrutura/estrutura3-1.png',
  },
  {
    nome: 'Salas privativas',
    metragem: '2.800 m²',
    desc: 'Escritórios de 2 a 200 posições, com infraestrutura plug-and-play.',
    foto: '/estrutura/estrutura4.png',
  },
  {
    nome: 'Laboratórios',
    metragem: '1.500 m²',
    desc: 'Maker, prototipagem, eletrônica e estúdio multimídia compartilhados.',
    foto: '/estrutura/estrutura3.png',
  },
  {
    nome: 'Auditório',
    metragem: '200 lugares',
    desc: 'Eventos, demo days e treinamentos com infraestrutura audiovisual completa.',
    foto: '/estrutura/estrutura1.png',
  },
] as const

const RAZOES = [
  {
    num: '01',
    titulo: 'Comunidade ativa de +200 empresas',
    desc: 'Da startup de 2 fundadores à corporate global. A densidade gera serendipidade — o próximo cliente, parceiro ou contratação está no andar de cima.',
  },
  {
    num: '02',
    titulo: 'Infraestrutura de classe mundial',
    desc: 'Coworking, laboratórios, auditório, café, restaurante. 12 mil m² de área já ativa, com expansão para mais 5 mil m² em 2027.',
  },
  {
    num: '03',
    titulo: 'Mais de R$ 800 mil em perks',
    desc: 'Acordos com HubSpot, Notion, IBM, Zendesk, Pipedrive e dezenas de outros parceiros — descontos e créditos exclusivos para residentes.',
  },
  {
    num: '04',
    titulo: 'Acesso aos programas Inaitec',
    desc: 'Aceleração, inovação aberta, internacionalização. Empresas instaladas têm prioridade nas chamadas e descontos em programas pagos.',
  },
  {
    num: '05',
    titulo: 'Marca do ecossistema',
    desc: 'Estar no Parque Pedra Branca pesa em rodadas, em vendas B2B e na atração de talento. É a vitrine de quem faz inovação no Sul.',
  },
] as const

export default function TragaSuaEmpresaPage() {
  return (
    <main className="relative bg-[#0D2E38] overflow-x-clip">

      {/* ── Fundo orgânico ─────────────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-[40vh] left-[-10%] w-[1000px] h-[1000px] rounded-full bg-[#FA8400]/[0.10] blur-[160px]" />
        <div className="absolute top-[170vh] right-[-15%] w-[1100px] h-[1100px] rounded-full bg-[#00C08B]/[0.06] blur-[160px]" />
        <div className="absolute top-[300vh] left-[15%] w-[900px] h-[900px] rounded-full bg-[#FA8400]/[0.08] blur-[160px]" />
        <div className="absolute top-[440vh] right-[-10%] w-[800px] h-[800px] rounded-full bg-[#004E69]/40 blur-[150px]" />
      </div>

      {/* ── 1. Hero ────────────────────────────────────────────────────── */}
      <section className="relative z-10 min-h-[640px] lg:h-[700px] pt-[108px] pb-16 overflow-hidden">
        <Container className="h-full grid lg:grid-cols-[1.1fr_1fr] gap-16 items-stretch">
          <div className="flex flex-col justify-center">
            <h1 className="font-extrabold text-white text-display-xl leading-[1.2] tracking-tight">
              Instale sua empresa{' '}
              <span className="italic font-medium text-[#FA8400]">no maior hub urbano</span>{' '}
              de inovação do sul do{' '}Brasil.
            </h1>

            <p className="mt-6 max-w-xl text-white/70 text-sm leading-relaxed">
              Coworking, laboratórios e mais de R$ 800 mil em perks exclusivos no Parque Pedra
              Branca, em Palhoça (SC) — com mais de 200 empresas instaladas.
            </p>

            <div className="mt-8 w-full flex flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <Link
                href="/fale-conosco"
                className="inline-flex items-center justify-center rounded-full bg-[#FA8400] text-white text-sm font-semibold px-7 py-4 hover:bg-[#FF9B26] hover:shadow-xl hover:shadow-[#FA8400]/40 transition-all duration-300 shadow-lg shadow-[#FA8400]/25"
              >
                Agendar visita
              </Link>
              <Link
                href="#beneficios"
                className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/5 backdrop-blur-sm text-white text-sm font-semibold px-7 py-4 hover:bg-white/10 hover:border-white/50 transition-all duration-300"
              >
                Ver benefícios
              </Link>
            </div>
          </div>

          {/* Imagem hero */}
          <div className="relative aspect-[4/3] lg:aspect-auto rounded-3xl overflow-hidden">
            <Image
              src="/imagens-destaques/inaitec1.jpg"
              alt="Edifício Inaitec — Parque Pedra Branca"
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 45vw, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#0D2E38]/60 via-transparent to-transparent" />
            <div className="absolute top-6 left-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/30 backdrop-blur-md px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00C08B] animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">
                Vagas disponíveis
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 2. Perks (logos) + Benefícios ─────────────────────────────── */}
      <Section id="beneficios" theme="light" padding="md" className="scroll-mt-24">

          {/* Bloco perks */}
          <div className="max-w-2xl mb-16">
            <div className="mb-5 inline-flex items-center gap-2">
              <span className="block h-px w-8 bg-[#FA8400]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FA8400]">
                Perks exclusivos
              </span>
            </div>
            <h2 className="font-extrabold text-display-xl leading-[1.2] tracking-tight">
              Mais de <span className="italic font-medium text-[#FA8400]">R$ 800 mil</span>{' '}
              em ferramentas e créditos.
            </h2>
            <p className="mt-6 text-[#0D2E38]/70 text-base leading-relaxed">
              Empresas instaladas no Parque Pedra Branca têm acesso a um catálogo crescente de
              acordos com plataformas que startups e times de inovação realmente usam.
            </p>
          </div>

          {/* Grid de logos */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-24">
            {PERKS.map((p) => (
              <div
                key={p.nome}
                className="group rounded-2xl bg-white border border-[#E8E6E1] p-8 flex flex-col items-start gap-6 transition-shadow hover:shadow-md hover:shadow-[#0D2E38]/10"
              >
                <div className="relative h-8 w-32">
                  <Image
                    src={p.logo}
                    alt={p.nome}
                    fill
                    className="object-contain object-left"
                    sizes="128px"
                  />
                </div>
                <p className="text-sm text-[#0D2E38]/65 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>

          {/* Bloco benefícios */}
          <div className="max-w-2xl mb-12">
            <div className="mb-5 inline-flex items-center gap-2">
              <span className="block h-px w-8 bg-[#FA8400]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FA8400]">
                Benefícios da residência
              </span>
            </div>
            <h2 className="font-extrabold text-display-xl leading-[1.2] tracking-tight">
              O que está incluído ao{' '}
              <span className="italic font-medium text-[#FA8400]">se instalar aqui</span>.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {BENEFICIOS.map((b) => (
              <div
                key={b.titulo}
                className="rounded-2xl bg-white border border-[#E8E6E1] p-8"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#FA8400]/10 text-[#FA8400] mb-5">
                  <Check strokeWidth={2} className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg mb-2 leading-tight">{b.titulo}</h3>
                <p className="text-sm text-[#0D2E38]/65 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
      </Section>

      {/* ── 3. Infraestrutura do Parque Pedra Branca ──────────────────── */}
      <Section id="infraestrutura" padding="md" className="scroll-mt-24">
          <div className="flex flex-wrap items-end justify-between gap-8 mb-16">
            <div className="max-w-2xl">
              <div className="mb-5 inline-flex items-center gap-2">
                <span className="block h-px w-8 bg-[#FA8400]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FA8400]">
                  Infraestrutura
                </span>
              </div>
              <h2 className="font-extrabold text-white text-display-xl leading-[1.2] tracking-tight">
                Estrutura completa para{' '}
                <span className="italic font-medium text-[#FA8400]">empresas em qualquer estágio</span>.
              </h2>
              <p className="mt-6 text-white/65 text-base leading-relaxed">
                12 mil m² ativos no edifício principal, distribuídos entre coworking, salas
                privativas, laboratórios e auditório. Nova ala em obras prevê mais 5 mil m² para
                2027.
              </p>
            </div>
            <Link
              href="/fale-conosco"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/70 hover:text-[#FA8400] transition-colors"
            >
              Solicitar tour 360º            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ESPACOS.map((e) => (
              <article
                key={e.nome}
                className="group relative rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition-all"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={e.foto}
                    alt={e.nome}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D2E38] via-[#0D2E38]/30 to-transparent" />
                  <span className="absolute top-4 left-4 rounded-full bg-[#FA8400] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white">
                    {e.metragem}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-white text-lg mb-2 leading-tight">{e.nome}</h3>
                  <p className="text-sm text-white/55 leading-relaxed">{e.desc}</p>
                </div>
              </article>
            ))}
          </div>

          {/* Localização */}
          <div className="mt-16 rounded-2xl border border-white/10 bg-white/[0.03] p-8 md:p-12 grid md:grid-cols-[auto_1fr_auto] gap-8 items-center">
            <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-[#FA8400]/15 text-[#FA8400]">
              <MapPin strokeWidth={1.8} className="w-7 h-7" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#FA8400] mb-2">
                Localização privilegiada
              </div>
              <div className="text-white text-lg font-semibold leading-snug">
                Av. Pedra Branca, 25 — Cidade Universitária Pedra Branca · Palhoça/SC
              </div>
              <p className="text-white/55 text-sm mt-2 leading-relaxed">
                15 min do Aeroporto Hercílio Luz · 8 min da BR-101 · 25 min do centro de Florianópolis.
              </p>
            </div>
            <Link
              href="/fale-conosco"
              className="inline-flex items-center rounded-full border border-white/25 bg-white/[0.06] backdrop-blur-sm text-white text-sm font-semibold px-6 py-3 hover:bg-white/15 hover:border-white/40 transition-all shrink-0"
            >
              Ver no mapa
            </Link>
          </div>
      </Section>

      {/* ── 4. Por que fazer parte do ecossistema ─────────────────────── */}
      <Section id="por-que" theme="light" padding="md" className="scroll-mt-24">
          <div className="max-w-2xl mb-16">
            <div className="mb-5 inline-flex items-center gap-2">
              <span className="block h-px w-8 bg-[#FA8400]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FA8400]">
                Por que estar aqui
              </span>
            </div>
            <h2 className="font-extrabold text-display-xl leading-[1.2] tracking-tight">
              Cinco motivos para fazer parte do{' '}
              <span className="italic font-medium text-[#FA8400]">ecossistema Inaitec</span>.
            </h2>
          </div>

          <div className="grid lg:grid-cols-[400px_1fr] gap-16">
            {/* Foto/visual */}
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden order-2 lg:order-1">
              <Image
                src="/imagens-destaques/inaitec8.jpg"
                alt="Comunidade Inaitec"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 33vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D2E38]/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-5">
                  <p className="text-white text-sm leading-relaxed">
                    "Em 2 anos no Parque Pedra Branca, dobramos nosso time, fechamos rodada
                    com fundo nacional e exportamos para 4 países."
                  </p>
                  <div className="mt-4 pt-4 border-t border-white/15">
                    <div className="text-white text-sm font-bold">Naira Oliveira</div>
                    <div className="text-white/60 text-[11px] mt-0.5">
                      Fundadora · AgroSmart
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Lista 5 razões */}
            <ol className="order-1 lg:order-2 divide-y divide-[#E8E6E1] -mt-2">
              {RAZOES.map((r) => (
                <li key={r.num} className="grid grid-cols-[auto_1fr] gap-8 py-8 first:pt-0 last:pb-0">
                  <div className="text-[#FA8400] font-extrabold text-3xl tracking-tight tabular-nums">
                    {r.num}
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2 leading-tight">{r.titulo}</h3>
                    <p className="text-[#0D2E38]/65 leading-relaxed">{r.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
      </Section>

      {/* ── 5. CTA final ──────────────────────────────────────────────── */}
      <Section padding="md">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0D2E38] via-[#004E69] to-[#0D2E38] p-8 sm:p-12 md:p-20">
            <div className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full bg-[#FA8400]/20 blur-[140px]" />
            <div className="absolute -bottom-32 -left-20 w-[400px] h-[400px] rounded-full bg-[#00C08B]/10 blur-[120px]" />

            <div className="relative grid lg:grid-cols-[1fr_auto] gap-10 items-center">
              <div>
                <h2 className="font-extrabold text-white text-display-xl leading-[1.2] tracking-tight">
                  Vagas limitadas para 2026.{' '}
                  <span className="italic font-medium text-[#FA8400]">Agende uma visita</span>{' '}
                  e conheça o espaço.
                </h2>
                <p className="mt-6 text-white/65 text-base leading-relaxed">
                  Tour guiado de 90 minutos pelas áreas comuns, salas privativas e laboratórios.
                  Café por nossa conta.
                </p>
              </div>
              <div className="w-full flex flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 sm:shrink-0">
                <Link
                  href="/fale-conosco"
                  className="inline-flex items-center justify-center rounded-full bg-[#FA8400] text-white text-sm font-semibold px-7 py-4 hover:bg-[#FF9B26] hover:shadow-xl hover:shadow-[#FA8400]/40 transition-all duration-300 shadow-lg shadow-[#FA8400]/25"
                >
                  Agendar visita
                </Link>
                <Link
                  href="/fale-conosco"
                  className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/5 backdrop-blur-sm text-white text-sm font-semibold px-7 py-4 hover:bg-white/10 hover:border-white/50 transition-all duration-300"
                >
                  Falar conosco
                </Link>
              </div>
            </div>
          </div>
      </Section>
    </main>
  )
}
