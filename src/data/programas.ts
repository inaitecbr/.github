export type Publico =
  | 'Startups e Pequenas Empresas'
  | 'Grandes e Médias Empresas'
  | 'Universidades e Governo'
  | 'Investidores'
export type Estagio =
  | 'Ideação'
  | 'Pré-aceleração'
  | 'Aceleração'
  | 'Crescimento'
  | 'Internacionalização'
  | 'Pesquisa'
  | 'Operação'
export type Entrada = 'Edital' | 'Inscrição contínua' | 'Convite' | 'Parceria'
export type StatusInscricao = 'aberta' | 'em-breve' | 'fechada' | 'fluxo-continuo'

export type Programa = {
  // ─── Básico (catálogo + hero) ───────────────────────────────
  slug: string
  name: string
  href: string
  desc: string
  publico: Publico
  estagio: Estagio
  entrada: Entrada
  image: string
  status: StatusInscricao
  /** ISO date string — usado quando status = 'aberta' */
  deadline?: string

  // ─── Opcionais por programa (template usa fallback se vazio) ────
  /** Pitch estendido pro hero — em vez do desc curto. */
  longDesc?: string
  /** Quick facts mostrados em barra abaixo do hero. */
  quickFacts?: { label: string; value: string }[]
  /** Parágrafos da seção "O que é o programa". */
  oQueE?: string[]
  /** Frase de impacto / quote em destaque. */
  highlight?: string
  /** Critérios de "Para quem é". */
  paraQuem?: string[]
  /** Benefícios — "O que você ganha". */
  beneficios?: { titulo: string; desc: string }[]
  /** Etapas do processo seletivo / jornada. */
  etapas?: { titulo: string; desc: string; duracao?: string }[]
  /** Stats / track record do programa. */
  stats?: { value: string; label: string }[]
  /** Cases de empresas que passaram pelo programa. */
  cases?: {
    nome: string
    setor: string
    logo?: string
    foto?: string
    quote: string
    pessoa: string
    cargo?: string
    metricas?: { label: string; value: string }[]
  }[]
  /** Perguntas frequentes específicas do programa. */
  faq?: { q: string; a: string }[]
}

export const PUBLICO_COLORS: Record<Publico, string> = {
  'Startups e Pequenas Empresas': '#FA8400', // laranja
  'Grandes e Médias Empresas': '#00C08B', // verde
  'Universidades e Governo': '#4A9EE0', // azul institucional
  Investidores: '#E9A84A', // âmbar dourado
}

export const PROGRAMAS: Programa[] = [
  // Pilar 01 — Startups e Pequenas Empresas
  {
    slug: 'acelera-pedra-branca',
    name: 'Acelera Pedra Branca',
    href: '/programas/acelera-pedra-branca',
    desc: 'Programa intensivo de 6 meses com mentoria especializada, conexão com investidores e acesso à infraestrutura do parque.',
    publico: 'Startups e Pequenas Empresas',
    estagio: 'Aceleração',
    entrada: 'Edital',
    image: '/acelera-pedrabranca.jpg',
    status: 'aberta',
    deadline: '2026-05-30',
    longDesc:
      'O programa de aceleração mais maduro do Sul do Brasil. Em 6 meses, sua startup ganha mentoria de quem já operou e vendeu empresas, conexão direta com fundos parceiros e acesso à estrutura do Parque Pedra Branca.',
    quickFacts: [
      { label: 'Duração', value: '6 meses' },
      { label: 'Vagas', value: '12 startups' },
      { label: 'Modalidade', value: 'Híbrida · SC' },
      { label: 'Aporte', value: 'Até R$ 200K' },
    ],
    oQueE: [
      'O Acelera Pedra Branca é um programa intensivo desenhado para startups que já validaram o produto e estão prontas para escalar. Em 6 meses, mentoria 1:1, infraestrutura no parque e acesso à rede de investidores do ecossistema.',
      'A jornada combina trilhas estruturadas (gestão, vendas, captação, governança) com encontros sob medida pra resolver os bloqueios específicos de cada startup. Tudo presencial em Palhoça, com 2 imersões internacionais.',
      'No fim do programa, Demo Day fechado com 60+ investidores nacionais e internacionais — historicamente, 70% das startups saem com ao menos uma carta de intenção.',
    ],
    highlight:
      '70% das startups saem do programa com ao menos uma carta de intenção de aporte.',
    paraQuem: [
      'Startups com produto validado e pelo menos 6 meses de tração no mercado.',
      'Time fundador com dedicação integral durante os 6 meses.',
      'Receita ativa ou pipeline de contratos comprovado.',
      'Tese de negócio com potencial de escala nacional ou internacional.',
      'Disponibilidade para encontros presenciais semanais no Parque Pedra Branca.',
      'Governança mínima estabelecida — CNPJ, contrato social, sócios formalizados.',
    ],
    beneficios: [
      { titulo: 'Mentoria 1:1 semanal', desc: 'Encontros estruturados com mentores que já operaram, captaram e venderam empresas no setor da sua startup.' },
      { titulo: 'Aporte de até R$ 200K', desc: 'Capital direto via Fundo Anjo Pedra Branca + matching com co-investidores parceiros.' },
      { titulo: 'Infraestrutura no parque', desc: 'Sala privativa, coworking, laboratórios e auditório no Parque Pedra Branca durante e após o programa.' },
      { titulo: 'Demo Day exclusivo', desc: 'Apresentação fechada para 60+ investidores nacionais, com follow-up estruturado pelo Inaitec.' },
      { titulo: 'Imersões internacionais', desc: 'Duas missões guiadas em hubs globais (Boston, Berlim ou Tel Aviv) durante o programa.' },
      { titulo: 'Comunidade vitalícia', desc: 'Acesso permanente à rede de alumni — encontros, follow-on e oportunidades de co-investimento.' },
    ],
    etapas: [
      { titulo: 'Inscrição', desc: 'Envio do formulário com pitch deck, métricas e plano de uso do programa.', duracao: '15 dias' },
      { titulo: 'Triagem', desc: 'Análise de fit, tese e potencial de impacto pelo time Inaitec + mentores externos.', duracao: '2 semanas' },
      { titulo: 'Entrevista', desc: 'Conversa estruturada de 45 min com banca avaliadora — tese, time e tração.', duracao: '1 semana' },
      { titulo: 'Pitch final', desc: 'Apresentação ao vivo para banca de mentores, parceiros e investidores.', duracao: '1 dia' },
      { titulo: 'Onboarding', desc: 'Kickoff coletivo com a turma + plano individual de jornada.', duracao: '1 semana' },
      { titulo: 'Programa', desc: '6 meses de mentoria, infraestrutura, imersões e construção de Demo Day.', duracao: '6 meses' },
    ],
    stats: [
      { value: '+120', label: 'startups aceleradas' },
      { value: 'R$ 80M', label: 'em capital captado' },
      { value: '70%', label: 'recebem oferta no Demo Day' },
      { value: '11', label: 'turmas concluídas' },
    ],
    cases: [
      { nome: 'NexusHealth', setor: 'Healthtech', logo: '/logo-placeholder.svg', foto: 'https://randomuser.me/api/portraits/men/32.jpg', quote: 'O Inaitec nos conectou a investidores e hospitais parceiros em tempo recorde. Crescemos 13× em 12 meses.', pessoa: 'Rodrigo Maia', cargo: 'CEO', metricas: [{ label: 'Crescimento', value: '13×' }, { label: 'Série A', value: 'R$ 50M' }, { label: 'Hospitais', value: '8' }] },
      { nome: 'AgroSmart', setor: 'Agritech', logo: '/logo-placeholder.svg', foto: 'https://randomuser.me/api/portraits/men/45.jpg', quote: 'O ecossistema do parque me abriu portas que sozinho eu nunca acharia. Fechamos contrato corporativo em 3 meses.', pessoa: 'Jorge Dias', cargo: 'Fundador', metricas: [{ label: 'Produtores', value: '+200' }, { label: 'MRR', value: 'R$ 80k' }, { label: 'Estados', value: '5' }] },
      { nome: 'CityFlow', setor: 'Smart City', logo: '/logo-placeholder.svg', foto: 'https://randomuser.me/api/portraits/men/12.jpg', quote: 'A credibilidade do programa abriu portas em prefeituras. O Inaitec é nossa maior vitrine institucional.', pessoa: 'André Luz', cargo: 'COO', metricas: [{ label: 'Em contratos', value: 'R$ 12M' }, { label: 'Cidades', value: '7' }, { label: 'ROI público', value: '3,2×' }] },
      { nome: 'EduSpark', setor: 'Edtech', logo: '/logo-placeholder.svg', foto: 'https://randomuser.me/api/portraits/women/44.jpg', quote: 'Em 6 meses dobramos nossa base de alunos. As mentorias de growth foram decisivas para a nossa estratégia de escala.', pessoa: 'Carla Mendes', cargo: 'CPO & Co-fundadora', metricas: [{ label: 'Base de alunos', value: '2×' }, { label: 'NPS', value: '78' }, { label: 'Redução de churn', value: '-35%' }] },
      { nome: 'LogisTek', setor: 'Logística', logo: '/logo-placeholder.svg', foto: 'https://randomuser.me/api/portraits/men/67.jpg', quote: 'As mentorias nos ajudaram a pivotar no momento certo. Economizamos 6 meses de desenvolvimento no caminho errado.', pessoa: 'Felipe Torres', cargo: 'CTO', metricas: [{ label: 'Custo operacional', value: '-40%' }, { label: 'Entregas/mês', value: '18k' }, { label: 'Clientes B2B', value: '14' }] },
      { nome: 'FinLab', setor: 'Fintech', logo: '/logo-placeholder.svg', foto: 'https://randomuser.me/api/portraits/women/28.jpg', quote: 'Captamos nossa primeira rodada seed graças às conexões diretas com investidores da rede do Inaitec.', pessoa: 'Mariana Costa', cargo: 'CEO', metricas: [{ label: 'Rodada seed', value: 'R$ 2,5M' }, { label: 'Usuários', value: '+12k' }, { label: 'TPV mensal', value: 'R$ 4M' }] },
      { nome: 'GreenBuild', setor: 'Construtech', logo: '/logo-placeholder.svg', foto: 'https://randomuser.me/api/portraits/men/23.jpg', quote: 'A infraestrutura do parque foi essencial para desenvolver e testar nossos protótipos com clientes reais ainda no programa.', pessoa: 'Lucas Ramos', cargo: 'Fundador & CEO', metricas: [{ label: 'Contratos B2B', value: '3' }, { label: 'Redução de CO₂', value: '28%' }, { label: 'Ticket médio', value: 'R$ 320k' }] },
      { nome: 'MedConnect', setor: 'Healthtech', logo: '/logo-placeholder.svg', foto: 'https://randomuser.me/api/portraits/women/15.jpg', quote: 'Conseguimos validar nosso produto com 4 hospitais parceiros ainda dentro do programa. Saímos com tração real.', pessoa: 'Ana Figueiredo', cargo: 'CEO & Fundadora', metricas: [{ label: 'Hospitais parceiros', value: '4' }, { label: 'Pacientes impactados', value: '+5k' }, { label: 'Tempo de diagnóstico', value: '-60%' }] },
      { nome: 'DataSphere', setor: 'Data & AI', logo: '/logo-placeholder.svg', foto: 'https://randomuser.me/api/portraits/men/54.jpg', quote: 'O ecossistema do Inaitec nos deu acesso a dados e cases reais para treinar nossos modelos com qualidade de enterprise.', pessoa: 'Bruno Leal', cargo: 'CDO & Co-fundador', metricas: [{ label: 'Acurácia', value: '87%' }, { label: 'Datasets', value: '+40' }, { label: 'Clientes enterprise', value: '6' }] },
      { nome: 'RetailAI', setor: 'Varejo', logo: '/logo-placeholder.svg', foto: 'https://randomuser.me/api/portraits/women/62.jpg', quote: 'Implementamos nossa solução em 12 redes varejistas durante o programa. O acesso à rede do Inaitec foi determinante.', pessoa: 'Isabela Nunes', cargo: 'CEO', metricas: [{ label: 'Redes varejistas', value: '12' }, { label: 'Aumento em vendas', value: '+22%' }, { label: 'ROI médio', value: '4,5×' }] },
      { nome: 'SafeGuard', setor: 'Segurança', logo: '/logo-placeholder.svg', foto: 'https://randomuser.me/api/portraits/men/8.jpg', quote: 'As mentorias técnicas nos ajudaram a superar os desafios de compliance e lançar em escala nacional.', pessoa: 'Ricardo Barros', cargo: 'CTO & Fundador', metricas: [{ label: 'Clientes ativos', value: '+300' }, { label: 'Incidentes evitados', value: '98%' }, { label: 'Expansão', value: '8 estados' }] },
      { nome: 'ClimaTech', setor: 'Cleantech', logo: '/logo-placeholder.svg', foto: 'https://randomuser.me/api/portraits/women/33.jpg', quote: 'O Inaitec nos conectou a parceiros institucionais que abriram portas para financiamento climático internacional.', pessoa: 'Fernanda Souza', cargo: 'CEO & Co-fundadora', metricas: [{ label: 'CO₂ compensado', value: '12kt' }, { label: 'Financiamento', value: 'R$ 6M' }, { label: 'Municípios', value: '15' }] },
      { nome: 'HRFlow', setor: 'RH Tech', logo: '/logo-placeholder.svg', foto: 'https://randomuser.me/api/portraits/men/71.jpg', quote: 'Saímos do programa com produto validado, equipe estruturada e os primeiros 50 clientes pagantes.', pessoa: 'Thiago Alves', cargo: 'Co-fundador', metricas: [{ label: 'Clientes pagantes', value: '50' }, { label: 'Redução de turnover', value: '-28%' }, { label: 'NPS', value: '82' }] },
      { nome: 'MobilityX', setor: 'Mobilidade', logo: '/logo-placeholder.svg', foto: 'https://randomuser.me/api/portraits/women/51.jpg', quote: 'O ecossistema do parque nos deu infraestrutura para testar nossa frota antes de escalar. Economizamos 8 meses.', pessoa: 'Carolina Lima', cargo: 'COO', metricas: [{ label: 'Veículos na frota', value: '120' }, { label: 'Cidades operando', value: '4' }, { label: 'Emissão zero', value: '100%' }] },
      { nome: 'InsurTech BR', setor: 'Insurtech', logo: '/logo-placeholder.svg', foto: 'https://randomuser.me/api/portraits/men/39.jpg', quote: 'Captamos investidores estratégicos do setor financeiro graças às conexões diretas da rede Inaitec.', pessoa: 'Paulo Henrique', cargo: 'CEO', metricas: [{ label: 'Apólices ativas', value: '+8k' }, { label: 'Sinistros digitais', value: '100%' }, { label: 'Captado', value: 'R$ 3,2M' }] },
    ],
    faq: [
      { q: 'Preciso estar instalado no Parque Pedra Branca para participar?', a: 'Não é obrigatório, mas durante o programa você precisa estar disponível para encontros presenciais semanais. Oferecemos sala privativa para a turma durante os 6 meses.' },
      { q: 'Quantas startups são selecionadas por turma?', a: 'Selecionamos 12 startups por turma. O programa acontece duas vezes ao ano — abril e outubro.' },
      { q: 'Como funciona o aporte de até R$ 200K?', a: 'O aporte é estruturado via Fundo Anjo Pedra Branca em troca de equity (5–10%, negociado caso a caso). Não é obrigatório aceitar — você pode participar do programa sem o cheque.' },
      { q: 'Quais setores vocês aceleram?', a: 'Somos agnósticos por setor. Aceleramos qualquer startup tech com potencial de escala, mas temos histórico forte em healthtech, agritech, smart city e fintech.' },
      { q: 'Posso participar se minha startup ainda não tem receita?', a: 'O programa é para startups em estágio de aceleração — receita ativa ou pipeline forte é critério. Para startups pré-receita, recomendamos o Impulse Inaitec ou Hub de Ideias.' },
    ],
  },
  {
    slug: 'impulse-inaitec',
    name: 'Impulse Inaitec',
    href: '/programas/impulse-inaitec',
    desc: 'Pré-aceleração para startups early stage validarem solução, modelo de negócio e fit com mercado.',
    publico: 'Startups e Pequenas Empresas',
    estagio: 'Pré-aceleração',
    entrada: 'Edital',
    image: '/imagens-destaques/inaitec5.jpg',
    status: 'em-breve',
  },
  {
    slug: 'hub-de-ideias',
    name: 'Hub de Ideias',
    href: '/programas/hub-de-ideias',
    desc: 'Da ideia ao MVP em ciclos rápidos com mentoria, design sprints e suporte técnico.',
    publico: 'Startups e Pequenas Empresas',
    estagio: 'Ideação',
    entrada: 'Inscrição contínua',
    image: '/imagens-destaques/inaitec6.png',
    status: 'fluxo-continuo',
  },
  {
    slug: 'globaliza-inaitec',
    name: 'Globaliza Inaitec',
    href: '/programas/globaliza-inaitec',
    desc: 'Soft landing internacional para startups prontas para escalar fora do Brasil.',
    publico: 'Startups e Pequenas Empresas',
    estagio: 'Internacionalização',
    entrada: 'Edital',
    image: '/imagens-destaques/inaitec8.jpg',
    status: 'fechada',
  },
  {
    slug: 'missoes-internacionais',
    name: 'Missões Internacionais',
    href: '/programas/missoes-internacionais',
    desc: 'Imersões guiadas em hubs globais — Boston, Berlim, Tel Aviv e Singapura.',
    publico: 'Startups e Pequenas Empresas',
    estagio: 'Crescimento',
    entrada: 'Edital',
    image: '/imagens-destaques/inaitec7.jpg',
    status: 'aberta',
    deadline: '2026-07-15',
  },

  // Pilar 02 — Grandes e Médias Empresas
  {
    slug: 'inovacao-aberta',
    name: 'Inovação Aberta',
    href: '/programas/inovacao-aberta',
    desc: 'Conexão entre corporações e startups disruptivas para co-criar pilotos validados em até 12 semanas.',
    publico: 'Grandes e Médias Empresas',
    estagio: 'Crescimento',
    entrada: 'Parceria',
    image: '/imagens-destaques/inaitec2.jpeg',
    status: 'aberta',
    deadline: '2026-05-15',
  },
  {
    slug: 'laboratorio-cidade',
    name: 'Laboratório Cidade',
    href: '/programas/laboratorio-cidade',
    desc: 'Living lab urbano para validar soluções de mobilidade, energia e cidades inteligentes em ambiente real.',
    publico: 'Grandes e Médias Empresas',
    estagio: 'Crescimento',
    entrada: 'Parceria',
    image: '/imagens-destaques/inaitec4.jpg',
    status: 'fluxo-continuo',
  },
  {
    slug: 'desafios-corporativos',
    name: 'Desafios Corporativos',
    href: '/programas/desafios-corporativos',
    desc: 'Pilotos estruturados com startups validadas, das dores estratégicas à entrega final.',
    publico: 'Grandes e Médias Empresas',
    estagio: 'Crescimento',
    entrada: 'Edital',
    image: '/imagens-destaques/inaitec5.jpg',
    status: 'em-breve',
  },
  {
    slug: 'emprega-palhoca',
    name: 'Emprega Palhoça',
    href: '/programas/emprega-palhoca',
    desc: 'Atração e retenção de talentos qualificados para empresas instaladas no parque.',
    publico: 'Grandes e Médias Empresas',
    estagio: 'Operação',
    entrada: 'Inscrição contínua',
    image: '/imagens-destaques/inaitec1.jpg',
    status: 'fluxo-continuo',
  },

  // Pilar 03 — Universidades e Governo
  {
    slug: 'politicas-publicas',
    name: 'Políticas Públicas',
    href: '/programas/politicas-publicas',
    desc: 'Co-criação de políticas de inovação com municípios, estado e agências reguladoras.',
    publico: 'Universidades e Governo',
    estagio: 'Crescimento',
    entrada: 'Convite',
    image: '/imagens-destaques/inaitec3.jpg',
    status: 'fluxo-continuo',
  },
  {
    slug: 'pesquisa-aplicada',
    name: 'Pesquisa Aplicada',
    href: '/programas/pesquisa-aplicada',
    desc: 'P&D conectando academia ao mercado, com bolsas, projetos e infraestrutura de prototipagem.',
    publico: 'Universidades e Governo',
    estagio: 'Pesquisa',
    entrada: 'Edital',
    image: '/imagens-destaques/inaitec3.jpg',
    status: 'aberta',
    deadline: '2026-06-20',
  },
  {
    slug: 'transferencia-tecnologica',
    name: 'Transferência Tecnológica',
    href: '/programas/transferencia-tecnologica',
    desc: 'Spin-offs e licenciamentos a partir de pesquisa universitária com modelagem comercial.',
    publico: 'Universidades e Governo',
    estagio: 'Crescimento',
    entrada: 'Convite',
    image: '/imagens-destaques/inaitec7.jpg',
    status: 'fluxo-continuo',
  },
  {
    slug: 'editais-colaborativos',
    name: 'Editais Colaborativos',
    href: '/programas/editais-colaborativos',
    desc: 'Fomento público estruturado para ciência, tecnologia e inovação aplicada — em parceria com FINEP, BNDES e CNPq.',
    publico: 'Universidades e Governo',
    estagio: 'Pesquisa',
    entrada: 'Edital',
    image: '/imagens-destaques/inaitec8.jpg',
    status: 'aberta',
    deadline: '2026-08-10',
  },

  // Pilar 04 — Investidores
  {
    slug: 'catalisa-inaitec',
    name: 'Catalisa Inaitec',
    href: '/programas/catalisa-inaitec',
    desc: 'Acesso curado a deal flow do ecossistema, com tese, due diligence e governance estruturados.',
    publico: 'Investidores',
    estagio: 'Aceleração',
    entrada: 'Convite',
    image: '/imagens-destaques/inaitec4.jpg',
    status: 'fluxo-continuo',
  },
  {
    slug: 'deal-flow',
    name: 'Deal Flow Qualificado',
    href: '/programas/deal-flow',
    desc: 'Startups validadas e prontas para aporte, com tese estruturada e métricas confiáveis.',
    publico: 'Investidores',
    estagio: 'Crescimento',
    entrada: 'Convite',
    image: '/imagens-destaques/inaitec6.png',
    status: 'fluxo-continuo',
  },
  {
    slug: 'fundo-anjo',
    name: 'Fundo Anjo Pedra Branca',
    href: '/programas/fundo-anjo',
    desc: 'Tickets iniciais de até R$ 200K em startups early stage do ecossistema.',
    publico: 'Investidores',
    estagio: 'Pré-aceleração',
    entrada: 'Parceria',
    image: '/imagens-destaques/inaitec2.jpeg',
    status: 'fluxo-continuo',
  },
  {
    slug: 'co-investimento',
    name: 'Co-investimento',
    href: '/programas/co-investimento',
    desc: 'Co-investimento estruturado com fundos nacionais e internacionais para rodadas Série A em diante.',
    publico: 'Investidores',
    estagio: 'Crescimento',
    entrada: 'Parceria',
    image: '/imagens-destaques/inaitec1.jpg',
    status: 'fluxo-continuo',
  },
]

export function getPrograma(slug: string): Programa | undefined {
  return PROGRAMAS.find((p) => p.slug === slug)
}

export const STATUS_LABEL: Record<StatusInscricao, string> = {
  aberta: 'Inscrições abertas',
  'em-breve': 'Inscrições em breve',
  fechada: 'Inscrições encerradas',
  'fluxo-continuo': 'Fluxo contínuo',
}

export const STATUS_SHORT: Record<StatusInscricao, string> = {
  aberta: 'Aberto',
  'em-breve': 'Em breve',
  fechada: 'Fechado',
  'fluxo-continuo': 'Contínuo',
}

export const STATUS_COLOR: Record<StatusInscricao, string> = {
  aberta: '#00C08B',
  'em-breve': '#FA8400',
  fechada: '#94A3B8',
  'fluxo-continuo': '#FA8400',
}
