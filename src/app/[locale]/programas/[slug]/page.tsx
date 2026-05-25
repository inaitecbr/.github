import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Clock, Users, MapPin, DollarSign, Info, Check } from 'lucide-react'
import BrandPattern from '@/components/BrandPattern'
import CountdownTimer from '@/components/CountdownTimer'
import AnimatedCounter from '@/components/AnimatedCounter'
import FaqAccordion from '@/components/FaqAccordion'
import ProgramaStickyBar from '@/components/ProgramaStickyBar'
import TimelineEtapas from '@/components/TimelineEtapas'
import CasesGrid from '@/components/CasesGrid'
import { Section, Container } from '@/components/Section'
import {
  PROGRAMAS,
  getPrograma,
  STATUS_LABEL,
  STATUS_COLOR,
} from '@/data/programas'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return PROGRAMAS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const programa = getPrograma(slug)
  if (!programa) return { title: 'Programa não encontrado' }
  return {
    title: programa.name,
    description: programa.longDesc ?? programa.desc,
  }
}

// ─── Ícones para Quick Facts (matching por keyword no label) ──────────────────
function QuickFactIcon({ label }: { label: string }) {
  const l = label.toLowerCase()
  const className = 'w-5 h-5'
  if (l.includes('dura') || l.includes('tempo') || l.includes('prazo')) {
    return <Clock strokeWidth={1.8} className={className} />
  }
  if (l.includes('vaga') || l.includes('startup') || l.includes('empresa')) {
    return <Users strokeWidth={1.8} className={className} />
  }
  if (l.includes('modal') || l.includes('local') || l.includes('onde')) {
    return <MapPin strokeWidth={1.8} className={className} />
  }
  if (
    l.includes('aporte') ||
    l.includes('capital') ||
    l.includes('investimento') ||
    l.includes('valor') ||
    l.includes('r$')
  ) {
    return <DollarSign strokeWidth={1.8} className={className} />
  }
  // fallback — sparkle/info
  return <Info strokeWidth={1.8} className={className} />
}

// ─── Defaults — usados quando o programa não tem campo próprio ────────────────
const DEFAULT_PARA_QUEM = [
  'Empresas formalizadas com pelo menos 1 produto/serviço no mercado.',
  'Time fundador comprometido com dedicação integral durante o programa.',
  'Disponibilidade para participar das atividades presenciais no Parque Pedra Branca.',
  'Tese de negócio com potencial de escala regional ou nacional.',
]

const DEFAULT_BENEFICIOS = [
  { titulo: 'Mentoria especializada', desc: 'Acompanhamento com mentores que já operaram, captaram e venderam empresas.' },
  { titulo: 'Conexões estratégicas', desc: 'Acesso direto à rede de corporações, universidades e governo do ecossistema.' },
  { titulo: 'Infraestrutura completa', desc: 'Coworking, salas privativas e laboratórios no Parque Pedra Branca.' },
  { titulo: 'Visibilidade institucional', desc: 'Presença em eventos, parceiros e canais de imprensa do hub.' },
  { titulo: 'Acesso a investimento', desc: 'Conexão com investidores anjo, fundos parceiros e instrumentos de capital.' },
  { titulo: 'Comunidade vitalícia', desc: 'Rede de alumni com encontros, follow-on e oportunidades futuras.' },
]

const DEFAULT_ETAPAS: { titulo: string; desc: string; duracao?: string }[] = [
  { titulo: 'Inscrição', desc: 'Envio do formulário com pitch e métricas iniciais.' },
  { titulo: 'Triagem', desc: 'Análise de fit e potencial de impacto.' },
  { titulo: 'Entrevista', desc: 'Conversa estruturada com banca avaliadora.' },
  { titulo: 'Pitch final', desc: 'Apresentação para banca de mentores e investidores.' },
  { titulo: 'Onboarding', desc: 'Início do programa com kickoff e plano individual.' },
]

const DEFAULT_STATS = [
  { value: '+300', label: 'startups aceleradas' },
  { value: 'R$ 180M', label: 'em capital movimentado' },
  { value: '+200', label: 'empresas instaladas' },
  { value: '15', label: 'anos de ecossistema' },
]

const DEFAULT_FAQ = [
  { q: 'Como funciona o processo de inscrição?', a: 'As inscrições são feitas via formulário online publicado neste site quando o edital está aberto. O processo seletivo envolve análise de proposta, entrevistas e, em alguns casos, pitch final.' },
  { q: 'Preciso estar no Parque Pedra Branca para participar?', a: 'Depende do programa. A maioria das jornadas tem componentes presenciais em Palhoça/SC, mas oferecemos modalidades híbridas. Verifique o detalhe na seção "Como funciona".' },
  { q: 'Tem custo para o participante?', a: 'A maioria dos nossos programas é gratuita ou subsidiada. Programas com aporte podem envolver equity ou contrapartida — sempre transparente no edital.' },
  { q: 'Quando abre a próxima turma?', a: 'O calendário de turmas é divulgado neste site e nas nossas redes. Inscreva-se na nossa newsletter para receber avisos das próximas chamadas.' },
]

const DEFAULT_CASES: {
  nome: string; setor: string; logo?: string; foto?: string
  quote: string; pessoa: string; cargo?: string
  metricas?: { label: string; value: string }[]
}[] = [
  {
    nome: 'NexusHealth', setor: 'Healthtech', logo: '/logo-placeholder.svg',
    foto: 'https://randomuser.me/api/portraits/men/32.jpg',
    quote: 'O Inaitec nos conectou a investidores e hospitais parceiros em tempo recorde. A mentoria focada nos ajudou a evitar os erros clássicos do setor.',
    pessoa: 'Rodrigo Maia', cargo: 'CEO & Co-fundador',
    metricas: [{ label: 'Crescimento', value: '13×' }, { label: 'Hospitais parceiros', value: '8' }, { label: 'Captado seed', value: 'R$ 4M' }],
  },
  {
    nome: 'AgroSmart', setor: 'Agritech', logo: '/logo-placeholder.svg',
    foto: 'https://randomuser.me/api/portraits/men/45.jpg',
    quote: 'O ecossistema do parque abriu portas que jamais teríamos sozinhos. Fechamos nosso primeiro grande contrato corporativo em apenas 3 meses.',
    pessoa: 'Jorge Dias', cargo: 'Fundador',
    metricas: [{ label: 'Produtores ativos', value: '+200' }, { label: 'MRR', value: 'R$ 80k' }, { label: 'Cobertura', value: '5 estados' }],
  },
  {
    nome: 'CityFlow', setor: 'Smart City', logo: '/logo-placeholder.svg',
    foto: 'https://randomuser.me/api/portraits/men/12.jpg',
    quote: 'A credibilidade do programa abriu portas em prefeituras. O Inaitec é a nossa maior vitrine institucional.',
    pessoa: 'André Luz', cargo: 'COO',
    metricas: [{ label: 'Em contratos', value: 'R$ 12M' }, { label: 'Cidades', value: '7' }, { label: 'ROI público', value: '3,2×' }],
  },
  {
    nome: 'EduSpark', setor: 'Edtech', logo: '/logo-placeholder.svg',
    foto: 'https://randomuser.me/api/portraits/women/44.jpg',
    quote: 'Em 6 meses dobramos nossa base de alunos. As mentorias de growth foram decisivas para a nossa estratégia de escala.',
    pessoa: 'Carla Mendes', cargo: 'CPO & Co-fundadora',
    metricas: [{ label: 'Base de alunos', value: '2×' }, { label: 'NPS', value: '78' }, { label: 'Redução de churn', value: '-35%' }],
  },
  {
    nome: 'LogisTek', setor: 'Logística', logo: '/logo-placeholder.svg',
    foto: 'https://randomuser.me/api/portraits/men/67.jpg',
    quote: 'As mentorias nos ajudaram a pivotar no momento certo. Economizamos 6 meses de desenvolvimento no caminho errado.',
    pessoa: 'Felipe Torres', cargo: 'CTO',
    metricas: [{ label: 'Custo operacional', value: '-40%' }, { label: 'Entregas/mês', value: '18k' }, { label: 'Clientes B2B', value: '14' }],
  },
  {
    nome: 'FinLab', setor: 'Fintech', logo: '/logo-placeholder.svg',
    foto: 'https://randomuser.me/api/portraits/women/28.jpg',
    quote: 'Captamos nossa primeira rodada seed graças às conexões diretas com investidores da rede do Inaitec.',
    pessoa: 'Mariana Costa', cargo: 'CEO',
    metricas: [{ label: 'Rodada seed', value: 'R$ 2,5M' }, { label: 'Usuários', value: '+12k' }, { label: 'TPV mensal', value: 'R$ 4M' }],
  },
  {
    nome: 'GreenBuild', setor: 'Construtech', logo: '/logo-placeholder.svg',
    foto: 'https://randomuser.me/api/portraits/men/23.jpg',
    quote: 'A infraestrutura do parque foi essencial para desenvolver e testar nossos protótipos com clientes reais ainda no programa.',
    pessoa: 'Lucas Ramos', cargo: 'Fundador & CEO',
    metricas: [{ label: 'Contratos B2B', value: '3' }, { label: 'Redução de CO₂', value: '28%' }, { label: 'Ticket médio', value: 'R$ 320k' }],
  },
  {
    nome: 'MedConnect', setor: 'Healthtech', logo: '/logo-placeholder.svg',
    foto: 'https://randomuser.me/api/portraits/women/15.jpg',
    quote: 'Conseguimos validar nosso produto com 4 hospitais parceiros ainda dentro do programa. Saímos com tração real.',
    pessoa: 'Ana Figueiredo', cargo: 'CEO & Fundadora',
    metricas: [{ label: 'Hospitais parceiros', value: '4' }, { label: 'Pacientes impactados', value: '+5k' }, { label: 'Tempo de diagnóstico', value: '-60%' }],
  },
  {
    nome: 'DataSphere', setor: 'Data & AI', logo: '/logo-placeholder.svg',
    foto: 'https://randomuser.me/api/portraits/men/54.jpg',
    quote: 'O ecossistema do Inaitec nos deu acesso a dados e cases reais para treinar nossos modelos com qualidade de enterprise.',
    pessoa: 'Bruno Leal', cargo: 'CDO & Co-fundador',
    metricas: [{ label: 'Acurácia', value: '87%' }, { label: 'Datasets', value: '+40' }, { label: 'Clientes enterprise', value: '6' }],
  },
  {
    nome: 'RetailAI', setor: 'Varejo', logo: '/logo-placeholder.svg',
    foto: 'https://randomuser.me/api/portraits/women/62.jpg',
    quote: 'Implementamos nossa solução em 12 redes varejistas durante o programa. O acesso à rede do Inaitec foi determinante.',
    pessoa: 'Isabela Nunes', cargo: 'CEO',
    metricas: [{ label: 'Redes varejistas', value: '12' }, { label: 'Aumento em vendas', value: '+22%' }, { label: 'ROI médio', value: '4,5×' }],
  },
  {
    nome: 'SafeGuard', setor: 'Segurança', logo: '/logo-placeholder.svg',
    foto: 'https://randomuser.me/api/portraits/men/8.jpg',
    quote: 'As mentorias técnicas nos ajudaram a superar os desafios de compliance e lançar em escala nacional.',
    pessoa: 'Ricardo Barros', cargo: 'CTO & Fundador',
    metricas: [{ label: 'Clientes ativos', value: '+300' }, { label: 'Incidentes evitados', value: '98%' }, { label: 'Expansão', value: '8 estados' }],
  },
  {
    nome: 'ClimaTech', setor: 'Cleantech', logo: '/logo-placeholder.svg',
    foto: 'https://randomuser.me/api/portraits/women/33.jpg',
    quote: 'O Inaitec nos conectou a parceiros institucionais que abriram portas para financiamento climático internacional.',
    pessoa: 'Fernanda Souza', cargo: 'CEO & Co-fundadora',
    metricas: [{ label: 'CO₂ compensado', value: '12kt' }, { label: 'Financiamento', value: 'R$ 6M' }, { label: 'Municípios', value: '15' }],
  },
  {
    nome: 'HRFlow', setor: 'RH Tech', logo: '/logo-placeholder.svg',
    foto: 'https://randomuser.me/api/portraits/men/71.jpg',
    quote: 'Saímos do programa com produto validado, equipe estruturada e os primeiros 50 clientes pagantes.',
    pessoa: 'Thiago Alves', cargo: 'Co-fundador',
    metricas: [{ label: 'Clientes pagantes', value: '50' }, { label: 'Redução de turnover', value: '-28%' }, { label: 'NPS', value: '82' }],
  },
  {
    nome: 'MobilityX', setor: 'Mobilidade', logo: '/logo-placeholder.svg',
    foto: 'https://randomuser.me/api/portraits/women/51.jpg',
    quote: 'O ecossistema do parque nos deu infraestrutura para testar nossa frota antes de escalar. Economizamos 8 meses.',
    pessoa: 'Carolina Lima', cargo: 'COO',
    metricas: [{ label: 'Veículos na frota', value: '120' }, { label: 'Cidades operando', value: '4' }, { label: 'Emissão zero', value: '100%' }],
  },
  {
    nome: 'InsurTech BR', setor: 'Insurtech', logo: '/logo-placeholder.svg',
    foto: 'https://randomuser.me/api/portraits/men/39.jpg',
    quote: 'Captamos investidores estratégicos do setor financeiro graças às conexões diretas da rede Inaitec.',
    pessoa: 'Paulo Henrique', cargo: 'CEO',
    metricas: [{ label: 'Apólices ativas', value: '+8k' }, { label: 'Sinistros digitais', value: '100%' }, { label: 'Captado', value: 'R$ 3,2M' }],
  },
]

export default async function ProgramaPage({ params }: Props) {
  const { slug } = await params
  const programa = getPrograma(slug)
  if (!programa) notFound()

  const accent = '#FA8400'
  const statusLabel = STATUS_LABEL[programa.status]
  const statusColor = STATUS_COLOR[programa.status]
  const isAberta = programa.status === 'aberta' && programa.deadline

  // Resolve content (per-programa ?? template default)
  const oQueE = programa.oQueE ?? [
    programa.desc,
    `A jornada acontece presencialmente no Parque Pedra Branca, em Palhoça (SC). A entrada se dá por ${programa.entrada.toLowerCase()}, com processo seletivo claro e cronograma divulgado abertamente.`,
    'Mais que um programa, é a porta de entrada para o ecossistema Inaitec — uma rede de +200 empresas, +300 startups aceleradas e dezenas de mentores que continuam presentes na sua jornada.',
  ]
  const paraQuem = programa.paraQuem ?? DEFAULT_PARA_QUEM
  const beneficios = programa.beneficios ?? DEFAULT_BENEFICIOS
  const etapas = programa.etapas ?? DEFAULT_ETAPAS
  const stats = programa.stats ?? DEFAULT_STATS
  const cases = programa.cases ?? DEFAULT_CASES
  const faq = programa.faq ?? DEFAULT_FAQ

  const ctaPrimario =
    programa.status === 'aberta'
      ? 'Inscrever agora'
      : programa.status === 'em-breve'
      ? 'Quero ser avisado'
      : programa.status === 'fechada'
      ? 'Ficar na lista'
      : 'Manifestar interesse'

  return (
    <main className="relative bg-[#0D2E38] overflow-x-clip">

      {/* Sticky bar — só quando aberta com deadline */}
      {isAberta && programa.deadline && (
        <ProgramaStickyBar
          nome={programa.name}
          deadline={programa.deadline}
          ctaHref="#inscricao"
        />
      )}

      {/* ── Fundo orgânico ─────────────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-[40vh] left-[-10%] w-[1000px] h-[1000px] rounded-full bg-[#FA8400]/[0.10] blur-[160px]" />
        <div className="absolute top-[180vh] right-[-15%] w-[1100px] h-[1100px] rounded-full bg-[#00C08B]/[0.06] blur-[160px]" />
        <div className="absolute top-[320vh] left-[15%] w-[900px] h-[900px] rounded-full bg-[#FA8400]/[0.08] blur-[160px]" />

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

      {/* ══════════════ 1. HERO ══════════════ */}
      <section className="relative z-10 pt-[108px] pb-16 overflow-hidden">
        <BrandPattern
          variant="dots"
          color="#FA8400"
          className="absolute top-32 right-8 w-72 h-72 opacity-25 pointer-events-none"
        />

        <Container className="relative grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center">
          <div>
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-[12px] text-white/45">
              <Link href="/programas" className="hover:text-white transition-colors">Programas</Link>
              <span>/</span>
              <span className="text-white/65">{programa.publico}</span>
            </nav>

            {/* Eyebrow do público */}
            <div className="mb-5 inline-flex items-center gap-2">
              <span className="block h-px w-8" style={{ backgroundColor: accent }} />
              <span
                className="text-[10px] font-bold uppercase tracking-[0.2em]"
                style={{ color: accent }}
              >
                {programa.publico}
              </span>
            </div>

            <h1 className="font-extrabold text-white text-display-2xl leading-[1.1] tracking-tight">
              {programa.name}
            </h1>

            <p className="mt-6 max-w-xl text-white/75 text-[17px] leading-relaxed">
              {programa.longDesc ?? programa.desc}
            </p>

            {/* CTAs */}
            <div className="mt-10 w-full flex flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <Link
                href="#inscricao"
                className="inline-flex items-center justify-center rounded-full bg-[#FA8400] text-white text-sm font-semibold px-7 py-4 hover:bg-[#FF9B26] hover:shadow-xl hover:shadow-[#FA8400]/40 transition-all duration-300 shadow-lg shadow-[#FA8400]/25"
              >
                {ctaPrimario}
              </Link>
              <Link
                href="#como-funciona"
                className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/5 backdrop-blur-sm text-white text-sm font-semibold px-7 py-4 hover:bg-white/10 hover:border-white/50 transition-all duration-300"
              >
                Como funciona
              </Link>
            </div>

            {/* Prazo de inscrição abaixo dos CTAs (só quando aberta) */}
            {isAberta && programa.deadline && (
              <div className="mt-10 pt-8 border-t border-white/10 max-w-md">
                <div className="flex items-center gap-2 mb-4">
                  <span className="block w-1.5 h-1.5 rounded-full bg-[#00C08B] animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#00C08B]">
                    Inscrições abertas · prazo
                  </span>
                </div>
                <CountdownTimer
                  target={new Date(programa.deadline)}
                  theme="dark"
                  variant="segments"
                />
              </div>
            )}
          </div>

          <div className="relative aspect-[5/4] lg:aspect-auto lg:h-full lg:min-h-[520px] rounded-3xl overflow-hidden">
            <Image
              src={programa.image}
              alt={programa.name}
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 45vw, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#0D2E38]/60 via-transparent to-transparent" />
          </div>
        </Container>
      </section>

      {/* ══════════════ 2. SOBRE / O QUE É ══════════════ */}
      <section
        id="o-que-e"
        data-theme="light"
        className="relative z-10 scroll-mt-24 bg-[#F5F4EF] text-[#0D2E38] overflow-hidden"
      >
        <BrandPattern
          variant="dots"
          color="#0D2E38"
          className="absolute -top-10 right-[5%] w-72 h-72 opacity-[0.06] pointer-events-none"
        />

        <Container className="relative py-16">
          <div className="grid lg:grid-cols-[420px_1fr] gap-12 lg:gap-20">
            <div>
              <div className="mb-5 inline-flex items-center gap-2">
                <span className="block h-px w-8" style={{ backgroundColor: accent }} />
                <span
                  className="text-[10px] font-bold uppercase tracking-[0.2em]"
                  style={{ color: accent }}
                >
                  Sobre o programa
                </span>
              </div>
              <h2 className="font-extrabold text-display-xl leading-[1.2] tracking-tight">
                O que é o{' '}
                <span className="italic font-medium" style={{ color: accent }}>
                  {programa.name}
                </span>
                ?
              </h2>
            </div>

            <div className="flex flex-col gap-6 text-[#0D2E38]/75 text-[17px] leading-relaxed">
              {oQueE.map((p, i) => (
                <p key={i}>{p}</p>
              ))}

              {/* Highlight callout */}
              {programa.highlight && (
                <blockquote
                  className="mt-2 border-l-4 pl-6 py-3 rounded-r-lg text-[#0D2E38] font-semibold text-xl leading-snug"
                  style={{ borderColor: accent, backgroundColor: `${accent}0F` }}
                >
                  {programa.highlight}
                </blockquote>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* ══════════════ 3. NÚMEROS — detalhes + track record ══════════════ */}
      <Section padding="md" className="overflow-hidden" containerClassName="relative">

          {/* Header da seção */}
          <div className="max-w-2xl mb-14">
            <div className="mb-5 inline-flex items-center gap-2">
              <span className="block h-px w-8" style={{ backgroundColor: accent }} />
              <span
                className="text-[10px] font-bold uppercase tracking-[0.2em]"
                style={{ color: accent }}
              >
                O programa em números
              </span>
            </div>
            <h2 className="font-extrabold text-white text-display-xl leading-[1.2] tracking-tight">
              Os{' '}
              <span className="italic font-medium" style={{ color: accent }}>
                números
              </span>{' '}
              que importam.
            </h2>
            <p className="mt-5 text-white/65 text-base leading-relaxed">
              Os detalhes essenciais do programa e o que já entregamos em edições anteriores.
            </p>
          </div>

          {/* Sub-block 1: Quick Facts */}
          {programa.quickFacts && programa.quickFacts.length > 0 && (
            <>
              <div className="mb-6 flex items-center gap-3">
                <span className="block h-px w-8 bg-white/30" />
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/55">
                  Detalhes do programa
                </span>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
                {programa.quickFacts.map((f) => (
                  <article
                    key={f.label}
                    className="group relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:bg-white/[0.06] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                  >
                    <span
                      className="pointer-events-none absolute -top-20 -right-20 w-[200px] h-[200px] rounded-full blur-[60px] opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                      style={{ backgroundColor: accent }}
                    />

                    <div
                      className="relative inline-flex items-center justify-center w-11 h-11 rounded-xl mb-6"
                      style={{ backgroundColor: `${accent}1A`, color: accent }}
                    >
                      <QuickFactIcon label={f.label} />
                    </div>

                    <div className="relative flex flex-col gap-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/45">
                        {f.label}
                      </span>
                      <span className="text-2xl md:text-[1.75rem] font-extrabold text-white tracking-tight leading-tight">
                        {f.value}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}

          {/* Sub-block 2: Track Record */}
          <div className="mb-6 flex items-center gap-3">
            <span className="block h-px w-8 bg-white/30" />
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/55">
              Track record
            </span>
          </div>

          <div className="relative rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-md overflow-hidden">
            <div className="pointer-events-none absolute -top-32 -left-20 w-[400px] h-[400px] rounded-full bg-[#FA8400]/[0.08] blur-[120px]" />
            <div className="pointer-events-none absolute -bottom-32 -right-20 w-[400px] h-[400px] rounded-full bg-[#00C08B]/[0.06] blur-[120px]" />

            <div className="relative grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/10">
              {stats.map((m) => (
                <div key={m.label} className="flex flex-col gap-2 px-4 py-8 sm:px-6 sm:py-10">
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
      </Section>

      {/* ══════════════ 4. PARA QUEM É ══════════════ */}
      <Section id="para-quem" theme="light" padding="md" className="scroll-mt-24">
          <div className="grid lg:grid-cols-[420px_1fr] gap-12 lg:gap-20">
            <div>
              <div className="mb-5 inline-flex items-center gap-2">
                <span className="block h-px w-8" style={{ backgroundColor: accent }} />
                <span
                  className="text-[10px] font-bold uppercase tracking-[0.2em]"
                  style={{ color: accent }}
                >
                  Para quem é
                </span>
              </div>
              <h2 className="font-extrabold text-display-xl leading-[1.2] tracking-tight">
                Esse programa é{' '}
                <span className="italic font-medium" style={{ color: accent }}>
                  pra você
                </span>{' '}
                se…
              </h2>
              <p className="mt-6 text-[#0D2E38]/65 text-base leading-relaxed">
                Confira se sua empresa atende ao perfil antes de se inscrever. Critérios objetivos,
                sem letra miúda.
              </p>
            </div>

            <ul className="grid sm:grid-cols-2 gap-4">
              {paraQuem.map((c, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 rounded-2xl bg-white border border-[#E8E6E1] p-5"
                >
                  <span
                    className="mt-0.5 shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-full"
                    style={{ backgroundColor: `${accent}1A` }}
                  >
                    <Check strokeWidth={3} className="w-3.5 h-3.5" style={{ color: accent }} />
                  </span>
                  <p className="text-[#0D2E38]/85 text-[15px] leading-relaxed">{c}</p>
                </li>
              ))}
            </ul>
          </div>
      </Section>

      {/* ══════════════ 5. BENEFÍCIOS ══════════════ */}
      <Section padding="md" className="overflow-hidden" containerClassName="relative">
          <div className="max-w-2xl mb-16">
            <div className="mb-5 inline-flex items-center gap-2">
              <span className="block h-px w-8" style={{ backgroundColor: accent }} />
              <span
                className="text-[10px] font-bold uppercase tracking-[0.2em]"
                style={{ color: accent }}
              >
                O que você ganha
              </span>
            </div>
            <h2 className="font-extrabold text-white text-display-xl leading-[1.2] tracking-tight">
              Tudo que precisa para{' '}
              <span className="italic font-medium" style={{ color: accent }}>
                acelerar de verdade
              </span>
              .
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {beneficios.map((b, i) => (
              <article
                key={b.titulo}
                className="group rounded-2xl border border-white/10 bg-white/[0.03] p-7 hover:bg-white/[0.06] hover:-translate-y-1 transition-all duration-300"
              >
                <div
                  className="inline-flex items-center justify-center w-10 h-10 rounded-xl mb-5 font-bold text-sm"
                  style={{ backgroundColor: `${accent}26`, color: accent }}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="text-white text-lg font-extrabold leading-tight mb-3">
                  {b.titulo}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">{b.desc}</p>
              </article>
            ))}
          </div>
      </Section>

      {/* ══════════════ 6. COMO FUNCIONA ══════════════ */}
      <section
        id="como-funciona"
        data-theme="light"
        className="relative z-10 scroll-mt-24 bg-[#F5F4EF] text-[#0D2E38] overflow-hidden"
      >
        <BrandPattern
          variant="dots"
          color="#0D2E38"
          className="absolute top-20 right-[5%] w-80 h-80 opacity-[0.06] pointer-events-none"
        />

        <Container className="relative py-16">
          <div className="max-w-2xl mb-16">
            <div className="mb-5 inline-flex items-center gap-2">
              <span className="block h-px w-8" style={{ backgroundColor: accent }} />
              <span
                className="text-[10px] font-bold uppercase tracking-[0.2em]"
                style={{ color: accent }}
              >
                Como funciona
              </span>
            </div>
            <h2 className="font-extrabold text-display-xl leading-[1.2] tracking-tight">
              Da inscrição{' '}
              <span className="italic font-medium" style={{ color: accent }}>
                ao Demo Day
              </span>
              .
            </h2>
            <p className="mt-6 text-[#0D2E38]/70 text-base leading-relaxed">
              Etapas claras, com critérios objetivos em cada fase. Sem surpresa, sem caixa-preta.
            </p>
          </div>

          <TimelineEtapas etapas={etapas} accent={accent} />
        </Container>
      </section>

      {/* ══════════════ 7. CASES ══════════════ */}
      <Section id="cases" padding="md" className="overflow-hidden" containerClassName="relative">
          <div className="flex flex-wrap items-end justify-between gap-8 mb-16">
            <div className="max-w-2xl">
              <div className="mb-5 inline-flex items-center gap-2">
                <span className="block h-px w-8" style={{ backgroundColor: accent }} />
                <span
                  className="text-[10px] font-bold uppercase tracking-[0.2em]"
                  style={{ color: accent }}
                >
                  Cases reais
                </span>
              </div>
              <h2 className="font-extrabold text-white text-display-xl leading-[1.2] tracking-tight">
                Empresas que passaram<br />
                <span className="italic font-medium" style={{ color: accent }}>
                  por aqui
                </span>
                .
              </h2>
            </div>
          </div>

          <CasesGrid cases={cases} accent={accent} />
      </Section>

      {/* ══════════════ 8. FAQ ══════════════ */}
      <section className="relative z-10 py-16 overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/2 -translate-y-1/2 -right-40 w-[600px] h-[600px] rounded-full bg-[#004E69]/30 blur-[140px]" />
        </div>

        <Container className="relative">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-16 items-start">
            <div className="lg:sticky lg:top-24">
              <div className="mb-5 inline-flex items-center gap-2">
                <span className="block h-px w-8" style={{ backgroundColor: accent }} />
                <span
                  className="text-[10px] font-bold uppercase tracking-[0.2em]"
                  style={{ color: accent }}
                >
                  Perguntas frequentes
                </span>
              </div>
              <h2 className="font-extrabold text-white text-display-xl leading-[1.2] tracking-tight">
                Dúvidas{' '}
                <span className="italic font-medium" style={{ color: accent }}>
                  comuns
                </span>
                .
              </h2>
              <p className="mt-4 text-white/60 text-sm leading-relaxed max-w-xs">
                Não encontrou o que procura? Fale com nossa equipe — respondemos em até 48h.
              </p>
              <Link
                href="/fale-conosco"
                className="mt-6 inline-flex items-center text-sm font-semibold transition-all hover:opacity-80"
                style={{ color: accent }}
              >
                Falar com especialista
              </Link>
            </div>

            <FaqAccordion items={faq} />
          </div>
        </Container>
      </section>

      {/* ══════════════ 9. CTA FINAL DE INSCRIÇÃO ══════════════ */}
      <Section id="inscricao" padding="md" className="scroll-mt-24">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0D2E38] via-[#004E69] to-[#0D2E38] p-8 sm:p-12 md:p-20">
            <div className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full bg-[#FA8400]/20 blur-[140px]" />
            <div className="absolute -bottom-32 -left-20 w-[400px] h-[400px] rounded-full bg-[#00C08B]/10 blur-[120px]" />

            <div className="relative grid lg:grid-cols-[1fr_auto] gap-10 items-center">
              <div>
                <div className="mb-5 inline-flex items-center gap-2">
                  <span className="block h-px w-8 bg-[#FA8400]" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FA8400]">
                    {programa.status === 'aberta'
                      ? 'Inscreva-se'
                      : programa.status === 'em-breve'
                      ? 'Próxima turma'
                      : programa.status === 'fechada'
                      ? 'Próxima edição'
                      : 'Vamos conversar'}
                  </span>
                </div>
                <h2 className="font-extrabold text-white text-display-xl leading-[1.2] tracking-tight max-w-2xl">
                  {programa.status === 'aberta' && 'Inscrições abertas. '}
                  {programa.status === 'em-breve' && 'A próxima turma está chegando. '}
                  {programa.status === 'fechada' && 'Esta turma já fechou. '}
                  {programa.status === 'fluxo-continuo' && 'Aceitamos manifestações o ano todo. '}
                  <span className="italic font-medium text-[#FA8400]">
                    {programa.status === 'fechada' ? 'Fique na lista da próxima.' : 'Vamos conversar?'}
                  </span>
                </h2>
                <p className="mt-5 text-white/70 text-base leading-relaxed max-w-xl">
                  {programa.status === 'aberta' &&
                    'Inscrição em até 5 minutos. Sem custo, sem compromisso.'}
                  {programa.status === 'em-breve' &&
                    'Cadastre-se para ser avisado assim que abrirmos a próxima chamada.'}
                  {programa.status === 'fechada' &&
                    'A próxima edição será divulgada por aqui e na nossa newsletter.'}
                  {programa.status === 'fluxo-continuo' &&
                    'Manifestações são analisadas continuamente. Resposta em até 15 dias.'}
                </p>
              </div>

              <div className="w-full flex flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                <Link
                  href="/fale-conosco"
                  className="inline-flex items-center justify-center rounded-full bg-[#FA8400] text-white text-sm font-semibold px-7 py-4 hover:bg-[#FF9B26] hover:shadow-xl hover:shadow-[#FA8400]/40 transition-all duration-300 shadow-lg shadow-[#FA8400]/25"
                >
                  {ctaPrimario}
                </Link>
                <Link
                  href="/programas"
                  className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/5 backdrop-blur-sm text-white text-sm font-semibold px-7 py-4 hover:bg-white/10 hover:border-white/50 transition-all duration-300"
                >
                  Ver outros programas
                </Link>
              </div>
            </div>
          </div>
      </Section>
    </main>
  )
}
