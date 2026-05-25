import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Check } from 'lucide-react'
import AnimatedCounter from '@/components/AnimatedCounter'
import CadastroCTA from '@/components/CadastroCTA'
import { Section, Container } from '@/components/Section'

export const metadata: Metadata = {
  title: 'Banco de Talentos',
  description:
    'Capacitação e empregabilidade no ecossistema Inaitec: conecte-se a vagas em mais de 200 empresas do Parque Pedra Branca ou anuncie posições para encontrar talentos locais qualificados.',
}

/* ─────────────────────────────────────────────────────────────────────────
   /banco-de-talentos — sitemap:
   1. Hero
   2. O que é
   3. Para candidatos (como se cadastrar, vagas, perfis buscados)
   4. Para empresas (como anunciar vagas e conectar com talentos locais)
   5. Números do programa (vagas preenchidas, empresas, candidatos)
   6. CTA
   ───────────────────────────────────────────────────────────────────────── */

const PERFIS_BUSCADOS = [
  'Desenvolvimento (front, back, mobile, full-stack)',
  'Dados, IA e analytics',
  'Produto, UX e design',
  'Marketing, vendas e growth',
  'Operações, finanças e RH',
  'Hardware, eletrônica e IoT',
] as const

const PASSOS_CANDIDATO = [
  {
    num: '01',
    titulo: 'Crie seu perfil',
    desc: 'Cadastro gratuito em poucos minutos. Importe LinkedIn, anexe portfólio e indique áreas de interesse.',
  },
  {
    num: '02',
    titulo: 'Receba vagas compatíveis',
    desc: 'Nosso match conecta seu perfil às vagas abertas nas empresas residentes. Você é avisado por e-mail.',
  },
  {
    num: '03',
    titulo: 'Aplique e cresça',
    desc: 'Aplicações em um clique, processo direto com a empresa contratante e acesso a trilhas de capacitação.',
  },
] as const

const PASSOS_EMPRESA = [
  {
    num: '01',
    titulo: 'Cadastre sua empresa',
    desc: 'Empresas residentes e parceiras do ecossistema têm acesso preferencial e gratuito ao banco.',
  },
  {
    num: '02',
    titulo: 'Publique sua vaga',
    desc: 'Descrição, requisitos, modelo de trabalho e faixa salarial. Sua vaga vai ao ar em até 24h.',
  },
  {
    num: '03',
    titulo: 'Receba candidatos qualificados',
    desc: 'Curadoria do time Inaitec + match automático. Você recebe apenas perfis aderentes à vaga.',
  },
] as const

const VANTAGENS_EMPRESA = [
  {
    titulo: 'Talentos locais qualificados',
    desc: 'Mais de 2 mil profissionais cadastrados na Grande Florianópolis, com perfis tech, produto e negócio.',
  },
  {
    titulo: 'Curadoria do ecossistema',
    desc: 'Triagem inicial feita pelo time Inaitec — você recebe apenas candidatos aderentes ao perfil da vaga.',
  },
  {
    titulo: 'Sem custo para residentes',
    desc: 'Empresas instaladas no Parque Pedra Branca anunciam vagas ilimitadas, gratuitamente.',
  },
] as const

const NUMEROS = [
  { valor: '+2.500', label: 'Candidatos cadastrados' },
  { valor: '+200', label: 'Empresas parceiras' },
  { valor: '+450', label: 'Vagas preenchidas em 2025' },
  { valor: '21', label: 'Dias médios para contratação' },
] as const

export default function BancoDeTalentosPage() {
  return (
    <main className="relative bg-[#0D2E38] overflow-x-clip">

      {/* ── Fundo orgânico ─────────────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-[40vh] left-[-10%] w-[1000px] h-[1000px] rounded-full bg-[#4A9EE0]/[0.10] blur-[160px]" />
        <div className="absolute top-[170vh] right-[-15%] w-[1100px] h-[1100px] rounded-full bg-[#FA8400]/[0.08] blur-[160px]" />
        <div className="absolute top-[300vh] left-[15%] w-[900px] h-[900px] rounded-full bg-[#00C08B]/[0.06] blur-[160px]" />
        <div className="absolute top-[440vh] right-[-10%] w-[800px] h-[800px] rounded-full bg-[#004E69]/40 blur-[150px]" />
      </div>

      {/* ── 1. Hero ────────────────────────────────────────────────────── */}
      <section className="relative z-10 min-h-[640px] lg:h-[700px] pt-[108px] pb-16 overflow-hidden">
        <Container className="h-full grid lg:grid-cols-[1.1fr_1fr] gap-16 items-stretch">
          <div className="flex flex-col justify-center">
            <div className="mb-5 inline-flex items-center gap-2">
              <span className="block h-px w-8 bg-[#FA8400]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FA8400]">
                Capacitação e empregabilidade
              </span>
            </div>
            <h1 className="font-extrabold text-white text-display-xl leading-[1.2] tracking-tight">
              Conectando{' '}
              <span className="italic font-medium text-[#FA8400]">talento e oportunidade</span>{' '}
              no ecossistema Inaitec.
            </h1>

            <p className="mt-6 max-w-xl text-white/70 text-sm leading-relaxed">
              O Banco de Talentos aproxima profissionais qualificados das mais de 200 empresas
              residentes no Parque Pedra Branca. Para quem busca a próxima oportunidade — e para
              quem precisa contratar bem, perto de casa.
            </p>

            <div className="mt-8 w-full flex flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <a
                href="#para-candidatos"
                className="inline-flex items-center justify-center rounded-full bg-[#FA8400] text-white text-sm font-semibold px-7 py-4 hover:bg-[#FF9B26] hover:shadow-xl hover:shadow-[#FA8400]/40 transition-all duration-300 shadow-lg shadow-[#FA8400]/25"
              >
                Sou candidato
              </a>
              <a
                href="#para-empresas"
                className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/5 backdrop-blur-sm text-white text-sm font-semibold px-7 py-4 hover:bg-white/10 hover:border-white/50 transition-all duration-300"
              >
                Sou empresa
              </a>
            </div>
          </div>

          {/* Imagem hero */}
          <div className="relative aspect-[4/3] lg:aspect-auto rounded-3xl overflow-hidden">
            <Image
              src="/imagens-destaques/inaitec8.jpg"
              alt="Profissionais conectados pelo Banco de Talentos Inaitec"
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 45vw, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#0D2E38]/60 via-transparent to-transparent" />
            <div className="absolute top-6 left-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/30 backdrop-blur-md px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00C08B] animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">
                Vagas abertas
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 2. O que é ─────────────────────────────────────────────────── */}
      <Section id="o-que-e" theme="light" padding="md" className="scroll-mt-24">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-16 items-start">
            <div>
              <div className="mb-5 inline-flex items-center gap-2">
                <span className="block h-px w-8 bg-[#FA8400]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FA8400]">
                  O que é
                </span>
              </div>
              <h2 className="font-extrabold text-display-xl leading-[1.2] tracking-tight">
                Um programa de{' '}
                <span className="italic font-medium text-[#FA8400]">capacitação e empregabilidade</span>{' '}
                do ecossistema.
              </h2>
            </div>

            <div className="space-y-6 text-[#0D2E38]/75 text-base leading-relaxed">
              <p>
                O Banco de Talentos Inaitec é a ponte entre profissionais da Grande Florianópolis
                e as empresas residentes no Parque Pedra Branca. Cobre todas as áreas — de
                desenvolvimento e dados a produto, design, marketing e operações.
              </p>
              <p>
                Para os candidatos, é acesso facilitado a vagas em startups e corporações
                inovadoras, com curadoria humana e match automático. Para as empresas, é uma base
                qualificada de talentos locais — sem o ruído dos grandes portais.
              </p>

              <div className="mt-10 pt-8 border-t border-[#E8E6E1]">
                <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#FA8400] mb-4">
                  Perfis mais buscados
                </div>
                <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
                  {PERFIS_BUSCADOS.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-sm text-[#0D2E38]/80">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#FA8400] shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
      </Section>

      {/* ── 3. Para candidatos ─────────────────────────────────────────── */}
      <Section id="para-candidatos" padding="md" className="scroll-mt-24">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 items-start">

            {/* Texto introdutório */}
            <div className="lg:sticky lg:top-32">
              <div className="mb-5 inline-flex items-center gap-2">
                <span className="block h-px w-8 bg-[#FA8400]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FA8400]">
                  Para candidatos
                </span>
              </div>
              <h2 className="font-extrabold text-white text-display-xl leading-[1.2] tracking-tight">
                Sua próxima oportunidade está{' '}
                <span className="italic font-medium text-[#FA8400]">no ecossistema</span>.
              </h2>
              <p className="mt-6 text-white/65 text-base leading-relaxed">
                Cadastre-se gratuitamente, atualize seu perfil e seja descoberto por empresas que
                inovam de verdade. Sem fricção, sem spam de vagas fora do seu perfil.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <CadastroCTA tipo="candidato" label="Cadastrar currículo" />
                <Link
                  href="/banco-de-talentos/vagas"
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 backdrop-blur-sm text-white text-sm font-semibold px-6 py-4 hover:bg-white/10 hover:border-white/50 transition-all duration-300"
                >
                  Ver vagas
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#FA8400] bg-[#FA8400]/10 border border-[#FA8400]/30 rounded-full px-2 py-0.5">
                    Em breve
                  </span>
                </Link>
              </div>
            </div>

            {/* Lista de passos */}
            <ol className="divide-y divide-white/10">
              {PASSOS_CANDIDATO.map((p) => (
                <li key={p.num} className="grid grid-cols-[auto_1fr] gap-8 py-8 first:pt-0 last:pb-0">
                  <div className="text-[#FA8400] font-extrabold text-3xl tracking-tight tabular-nums">
                    {p.num}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-xl mb-2 leading-tight">{p.titulo}</h3>
                    <p className="text-white/65 leading-relaxed">{p.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
      </Section>

      {/* ── 4. Para empresas ───────────────────────────────────────────── */}
      <Section id="para-empresas" theme="light" padding="md" className="scroll-mt-24">
          <div className="max-w-2xl mb-16">
            <div className="mb-5 inline-flex items-center gap-2">
              <span className="block h-px w-8 bg-[#FA8400]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FA8400]">
                Para empresas
              </span>
            </div>
            <h2 className="font-extrabold text-display-xl leading-[1.2] tracking-tight">
              Anuncie vagas e conecte-se com{' '}
              <span className="italic font-medium text-[#FA8400]">talentos locais</span>.
            </h2>
            <p className="mt-6 text-[#0D2E38]/70 text-base leading-relaxed">
              Empresas instaladas no Parque Pedra Branca e parceiros do ecossistema podem publicar
              vagas, receber candidatos triados e contratar mais rápido — sem custo extra.
            </p>

            <CadastroCTA tipo="empresa" label="Cadastrar empresa" className="mt-8" />
          </div>

          {/* 3 passos */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
            {PASSOS_EMPRESA.map((p) => (
              <div key={p.num} className="rounded-2xl bg-white border border-[#E8E6E1] p-8">
                <div className="text-[#FA8400] font-extrabold text-3xl tracking-tight tabular-nums mb-5">
                  {p.num}
                </div>
                <h3 className="font-bold text-lg mb-2 leading-tight">{p.titulo}</h3>
                <p className="text-sm text-[#0D2E38]/65 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>

          {/* Vantagens */}
          <div className="grid lg:grid-cols-3 gap-4">
            {VANTAGENS_EMPRESA.map((v) => (
              <div key={v.titulo} className="rounded-2xl bg-white border border-[#E8E6E1] p-8">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#FA8400]/10 text-[#FA8400] mb-5">
                  <Check strokeWidth={2} className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg mb-2 leading-tight">{v.titulo}</h3>
                <p className="text-sm text-[#0D2E38]/65 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
      </Section>

      {/* ── 5. Números do programa ─────────────────────────────────────── */}
      <Section id="numeros" padding="md" className="scroll-mt-24">
          <div className="max-w-2xl mb-16">
            <div className="mb-5 inline-flex items-center gap-2">
              <span className="block h-px w-8 bg-[#FA8400]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FA8400]">
                Números do programa
              </span>
            </div>
            <h2 className="font-extrabold text-white text-display-xl leading-[1.2] tracking-tight">
              O Banco de Talentos{' '}
              <span className="italic font-medium text-[#FA8400]">em movimento</span>.
            </h2>
            <p className="mt-6 text-white/65 text-base leading-relaxed">
              Indicadores atualizados trimestralmente com os times de RH das empresas residentes.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {NUMEROS.map((n) => (
              <div
                key={n.label}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 hover:bg-white/[0.06] transition-colors"
              >
                <div className="font-extrabold text-white text-display-2xl leading-none tracking-tight tabular-nums whitespace-nowrap">
                  <AnimatedCounter value={n.valor} />
                </div>
                <div className="mt-4 text-sm text-white/60 leading-snug">{n.label}</div>
              </div>
            ))}
          </div>
      </Section>

      {/* ── 6. CTA final ──────────────────────────────────────────────── */}
      <Section padding="md">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0D2E38] via-[#004E69] to-[#0D2E38] p-8 sm:p-12 md:p-20">
            <div className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full bg-[#FA8400]/20 blur-[140px]" />
            <div className="absolute -bottom-32 -left-20 w-[400px] h-[400px] rounded-full bg-[#4A9EE0]/15 blur-[120px]" />

            <div className="relative grid lg:grid-cols-[1fr_auto] gap-10 items-center">
              <div>
                <h2 className="font-extrabold text-white text-display-xl leading-[1.2] tracking-tight">
                  Pronto para entrar?{' '}
                  <span className="italic font-medium text-[#FA8400]">Cadastre seu perfil</span>{' '}
                  ou anuncie sua vaga.
                </h2>
                <p className="mt-6 text-white/65 text-base leading-relaxed">
                  Acesso gratuito para candidatos e para empresas residentes no Parque Pedra Branca.
                </p>
              </div>
              <div className="w-full flex flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 sm:shrink-0">
                <CadastroCTA tipo="candidato" label="Cadastrar currículo" className="justify-center" />
                <CadastroCTA tipo="empresa" label="Cadastrar empresa" variant="outline" className="justify-center" />
              </div>
            </div>
          </div>
      </Section>
    </main>
  )
}
