export type Setor =
  | 'AgTech'
  | 'FinTech'
  | 'HealthTech'
  | 'EdTech'
  | 'RetailTech'
  | 'B2B SaaS'
  | 'CleanTech'
  | 'LogTech'
  | 'GovTech'
  | 'Cibersegurança'

export type Estagio = 'Startup' | 'Scale-up' | 'Corporação'

export type Empresa = {
  slug: string
  nome: string
  setor: Setor
  estagio: Estagio
  desc: string
  fundada: number
  cor: string
}

export type EmpresaDetails = {
  logoUrl: string
  longDesc: string
  website: string
  founder: { name: string; title: string }
  investment: { round: string; year: number }
  investors: string[]
  status: string
  photoUrl: string
}

export const SETOR_COLORS: Record<Setor, string> = {
  AgTech: '#16a34a',
  FinTech: '#2563eb',
  HealthTech: '#dc2626',
  EdTech: '#7c3aed',
  RetailTech: '#ea580c',
  'B2B SaaS': '#0891b2',
  CleanTech: '#15803d',
  LogTech: '#9333ea',
  GovTech: 'var(--color-brand-navy)',
  Cibersegurança: '#1e3a5f',
}

export const ESTAGIO_CONFIG: Record<Estagio, { bg: string; text: string }> = {
  Startup: { bg: '#FA840018', text: 'var(--color-brand-orange)' },
  'Scale-up': { bg: '#00C08B18', text: 'var(--color-brand-teal)' },
  Corporação: { bg: '#0D2E3818', text: 'var(--color-brand-navy)' },
}

export const EMPRESAS: Empresa[] = [
  {
    slug: 'agrosense',
    nome: 'AgroSense',
    setor: 'AgTech',
    estagio: 'Scale-up',
    desc: 'Sensores IoT e analytics para agricultura de precisão, reduzindo uso de insumos em até 40%.',
    fundada: 2019,
    cor: '#16a34a',
  },
  {
    slug: 'creditoo',
    nome: 'Creditoo',
    setor: 'FinTech',
    estagio: 'Startup',
    desc: 'Crédito sob medida para autônomos e MEIs usando open finance e dados alternativos.',
    fundada: 2022,
    cor: '#2563eb',
  },
  {
    slug: 'medtrack',
    nome: 'MedTrack',
    setor: 'HealthTech',
    estagio: 'Scale-up',
    desc: 'Gestão de jornada clínica em hospitais de médio porte, integrando prontuário e escala.',
    fundada: 2018,
    cor: '#dc2626',
  },
  {
    slug: 'edupath',
    nome: 'EduPath',
    setor: 'EdTech',
    estagio: 'Startup',
    desc: 'Plataforma adaptativa de ensino técnico com trilhas personalizadas por IA generativa.',
    fundada: 2021,
    cor: '#7c3aed',
  },
  {
    slug: 'shelfiq',
    nome: 'ShelfIQ',
    setor: 'RetailTech',
    estagio: 'Startup',
    desc: 'Motor de precificação dinâmica para varejistas, aumentando margem sem perder volume.',
    fundada: 2023,
    cor: '#ea580c',
  },
  {
    slug: 'fluxops',
    nome: 'FluxOps',
    setor: 'B2B SaaS',
    estagio: 'Scale-up',
    desc: 'ERP modular para PMEs industriais — implementação em dias, não meses.',
    fundada: 2020,
    cor: '#0891b2',
  },
  {
    slug: 'volta',
    nome: 'Volta',
    setor: 'CleanTech',
    estagio: 'Startup',
    desc: 'Infraestrutura de recarga para veículos elétricos em condomínios e estacionamentos.',
    fundada: 2022,
    cor: '#15803d',
  },
  {
    slug: 'routix',
    nome: 'Routix',
    setor: 'LogTech',
    estagio: 'Scale-up',
    desc: 'Otimização de última milha com IA preditiva, reduzindo custo de entrega em 28%.',
    fundada: 2019,
    cor: '#9333ea',
  },
  {
    slug: 'civicdata',
    nome: 'CivicData',
    setor: 'GovTech',
    estagio: 'Startup',
    desc: 'Analytics e painel de BI para prefeituras de médio porte monitorarem KPIs urbanos.',
    fundada: 2021,
    cor: 'var(--color-brand-navy)',
  },
  {
    slug: 'shieldlayer',
    nome: 'ShieldLayer',
    setor: 'Cibersegurança',
    estagio: 'Scale-up',
    desc: 'Plataforma zero-trust para bancos regionais e cooperativas de crédito.',
    fundada: 2018,
    cor: '#1e3a5f',
  },
  {
    slug: 'sinfra',
    nome: 'Sinfra',
    setor: 'B2B SaaS',
    estagio: 'Corporação',
    desc: 'Software de gestão de obras civis e concessões públicas, presente em 14 estados.',
    fundada: 2015,
    cor: '#57534e',
  },
  {
    slug: 'greenport',
    nome: 'GreenPort',
    setor: 'CleanTech',
    estagio: 'Startup',
    desc: 'Plataforma de compensação de carbono para exportadores com rastreabilidade MRV.',
    fundada: 2023,
    cor: '#15803d',
  },
  {
    slug: 'datafarm',
    nome: 'DataFarm',
    setor: 'AgTech',
    estagio: 'Corporação',
    desc: 'Hub nacional de dados agronômicos com cobertura de 12 mil fazendas conectadas.',
    fundada: 2012,
    cor: '#713f12',
  },
  {
    slug: 'vitalink',
    nome: 'Vitalink',
    setor: 'HealthTech',
    estagio: 'Startup',
    desc: 'Telemedicina e monitoramento remoto para trabalhadores rurais e comunidades isoladas.',
    fundada: 2022,
    cor: '#be123c',
  },
  {
    slug: 'lexia',
    nome: 'LexIA',
    setor: 'B2B SaaS',
    estagio: 'Scale-up',
    desc: 'IA jurídica para triagem, classificação e resposta de contratos em empresas de médio porte.',
    fundada: 2020,
    cor: '#4338ca',
  },
  {
    slug: 'packify',
    nome: 'Packify',
    setor: 'RetailTech',
    estagio: 'Scale-up',
    desc: 'Embalagens inteligentes com NFC para rastreabilidade e engajamento pós-compra.',
    fundada: 2019,
    cor: '#b45309',
  },
  {
    slug: 'tokedu',
    nome: 'TokEdu',
    setor: 'EdTech',
    estagio: 'Corporação',
    desc: 'Capacitação corporativa em microlearning — 1.200 empresas clientes no Brasil e LATAM.',
    fundada: 2016,
    cor: '#0369a1',
  },
  {
    slug: 'fiducia',
    nome: 'Fiducia',
    setor: 'FinTech',
    estagio: 'Scale-up',
    desc: 'Seguros embarcados para marketplaces e plataformas de e-commerce via API.',
    fundada: 2020,
    cor: '#7c3aed',
  },
]

const LOGOS = ['/logo1.png', '/logo2.png', '/logo3.png']
const PHOTO = '/imagens-pessoas/low-angle-businessman 1.png'

const FOUNDERS: { name: string; title: string }[] = [
  { name: 'Jason Atkins', title: 'Fundador & CEO' },
  { name: 'Marina Costa', title: 'Co-fundadora & CEO' },
  { name: 'Rafael Lima', title: 'Fundador & CTO' },
  { name: 'Helena Souza', title: 'Fundadora & CEO' },
  { name: 'Pedro Almeida', title: 'CEO' },
  { name: 'Carla Mendes', title: 'Co-fundadora & COO' },
]

const INVESTMENTS: { round: string; year: number }[] = [
  { round: 'Seed', year: 2021 },
  { round: 'Série A', year: 2020 },
  { round: 'Série B', year: 2019 },
  { round: 'Pré-seed', year: 2023 },
  { round: 'Série A', year: 2022 },
]

const INVESTOR_SETS: string[][] = [
  ['Leaders Fund', 'Sageview Capital', 'OMERS Ventures', 'Klass Capital'],
  ['Domo Invest', 'Bossa Nova', 'Astella Investimentos'],
  ['SP Ventures', 'Valor Capital', 'Monashees'],
  ['Kaszek', 'Redpoint eventures', 'Canary'],
  ['BTG Pactual', 'XP Inc.', 'Vox Capital'],
]

const STATUSES = ['Ativa', 'Em expansão', 'Recém-investida']

export const EMPRESA_DETAILS: Record<string, EmpresaDetails> = EMPRESAS.reduce(
  (acc, e, i) => {
    acc[e.slug] = {
      logoUrl: LOGOS[i % LOGOS.length],
      longDesc: `${e.desc} A operação combina tecnologia proprietária e parcerias estratégicas para entregar resultados mensuráveis aos clientes. Hoje, a empresa atende mais de 350 marcas em todo o território nacional, fortalecendo relacionamentos de longo prazo por meio de soluções escaláveis e mensuráveis.`,
      website: `https://${e.slug}.com.br`,
      founder: FOUNDERS[i % FOUNDERS.length],
      investment: INVESTMENTS[i % INVESTMENTS.length],
      investors: INVESTOR_SETS[i % INVESTOR_SETS.length],
      status: STATUSES[i % STATUSES.length],
      photoUrl: PHOTO,
    }
    return acc
  },
  {} as Record<string, EmpresaDetails>,
)
