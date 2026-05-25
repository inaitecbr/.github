export type Autor = {
  slug: string
  nome: string
  cargo: string
  foto: string
  bio: string
}

export type Post = {
  id: number
  slug: string
  titulo: string
  categoria: string
  data: string
  autor: Autor
  excerpt: string
  imagem: string
  destaque?: boolean
  corpo: string[]
}

export const AUTORES: Record<string, Autor> = {
  'ana-luiza-ferreira': {
    slug: 'ana-luiza-ferreira',
    nome: 'Ana Luiza Ferreira',
    cargo: 'Gerente de Comunicação',
    foto: 'https://randomuser.me/api/portraits/women/44.jpg',
    bio: 'Jornalista com 12 anos de experiência em comunicação corporativa e ecossistemas de inovação. Na Inaitec desde 2019, é responsável pela estratégia de conteúdo e relacionamento com a imprensa. Já colaborou com publicações como Exame, Startups e MIT Technology Review Brasil.',
  },
  'carlos-meurer': {
    slug: 'carlos-meurer',
    nome: 'Carlos Meurer',
    cargo: 'Analista de Ecossistema',
    foto: 'https://randomuser.me/api/portraits/men/32.jpg',
    bio: 'Economista especializado em inovação e desenvolvimento regional. Acompanha de perto a trajetória das startups aceleradas pelo Inaitec, produzindo análises sobre captação de investimento, expansão de mercado e impacto no ecossistema catarinense.',
  },
  'fernanda-luz': {
    slug: 'fernanda-luz',
    nome: 'Fernanda Luz',
    cargo: 'Assessora de Imprensa',
    foto: 'https://randomuser.me/api/portraits/women/68.jpg',
    bio: 'Relações públicas com foco em tecnologia e startups. Atua na ponte entre o Inaitec e os veículos de comunicação regionais e nacionais, além de coordenar a cobertura dos eventos e premiações do hub.',
  },
}

export const POSTS: Post[] = [
  {
    id: 1,
    slug: 'inaitec-lanca-12a-turma-acelera-pedra-branca',
    titulo: 'Inaitec lança 12ª turma do Acelera Pedra Branca com startups de alto impacto',
    categoria: 'Notícias',
    data: '28 abr 2026',
    autor: AUTORES['ana-luiza-ferreira'],
    excerpt:
      'Doze startups selecionadas entre mais de 200 candidatos iniciam jornada de seis meses com mentoria intensiva, infraestrutura no parque e acesso direto a investidores.',
    imagem: '/acelera-pedrabranca.jpg',
    destaque: true,
    corpo: [
      'Após um processo seletivo que reuniu mais de 200 candidaturas de todo o Brasil, o Inaitec confirmou as 12 startups que integram a 12ª turma do Acelera Pedra Branca — o programa de aceleração mais longevo do Sul do Brasil, com 11 anos de história e mais de 120 startups formadas.',
      'A seleção priorizou empresas com tração comprovada, produto validado e equipes completas. Os verticais contemplados nesta edição incluem healthtech, agritech, edtech, cleantech e soluções para cidades inteligentes — reflexo direto da demanda dos parceiros corporativos e investidores da rede Inaitec.',
      'As startups selecionadas terão acesso a 180 horas de mentoria individual com especialistas setoriais, infraestrutura completa no Parque Pedra Branca, acesso privilegiado a laboratórios e ao hub de co-inovação, além de uma rede de 40 investidores anjo e fundos de venture capital que acompanham o programa desde sua fundação.',
      '"Esta turma é a mais competitiva que já recebemos. A qualidade das inscrições subiu de forma expressiva, e isso é um reflexo direto da maturidade do ecossistema catarinense", afirmou Diego Rodrigues, diretor de programas do Inaitec.',
      'O programa tem duração de seis meses e culmina no Demo Day, evento que reúne investidores, corporações e imprensa especializada. Nas últimas cinco edições, 78% das startups formadas captaram investimento em até 12 meses após a conclusão do programa.',
    ],
  },
  {
    id: 2,
    slug: 'nexushealth-capta-r50m-serie-a',
    titulo: 'NexusHealth capta R$ 50M em Série A após ciclo de aceleração',
    categoria: 'Cases',
    data: '15 abr 2026',
    autor: AUTORES['carlos-meurer'],
    excerpt:
      'A startup de healthtech fechou sua maior rodada com fundo nacional e dois co-investidores internacionais.',
    imagem: '/noticias-2.jpg',
    corpo: [
      'A NexusHealth, startup de healthtech acelerada pelo Inaitec na 10ª turma do Acelera Pedra Branca, anunciou o fechamento de uma rodada Série A de R$ 50 milhões — a maior captação já realizada por uma empresa saída do programa.',
      'A rodada foi liderada pelo fundo nacional Canary, com participação de dois co-investidores internacionais. O capital será utilizado para expansão da plataforma para novos estados e contratação de 80 profissionais nos próximos 18 meses.',
      '"O Inaitec foi decisivo para nossa tração inicial. As conexões com o mercado, a infraestrutura e a mentoria nos permitiram validar o produto com velocidade que não teríamos de outra forma", disse Marcos Teixeira, CEO da NexusHealth.',
      'A empresa saiu do programa com três contratos corporativos e uma base de 12 mil usuários ativos. Dois anos depois, opera em 8 estados com mais de 400 mil usuários mensais e receita recorrente de R$ 2,8M por mês.',
    ],
  },
  {
    id: 3,
    slug: 'parque-pedra-branca-premio-nacional-ecossistema-inovacao',
    titulo: 'Parque Pedra Branca recebe prêmio nacional de ecossistema de inovação',
    categoria: 'Conquistas',
    data: '10 abr 2026',
    autor: AUTORES['fernanda-luz'],
    excerpt:
      'O hub foi reconhecido entre os três melhores ambientes de inovação urbana do Brasil pelo quinto ano consecutivo.',
    imagem: '/noticias-3.png',
    corpo: [
      'O Parque Pedra Branca foi reconhecido pelo quinto ano consecutivo como um dos três melhores ambientes de inovação urbana do Brasil, pelo Prêmio Nacional de Ecossistemas de Inovação, organizado pela ABDI em parceria com o Ministério da Ciência, Tecnologia e Inovação.',
      'A premiação avalia critérios como densidade de empresas inovadoras, volume de capital movimentado, geração de empregos qualificados, integração com universidades e qualidade da infraestrutura de suporte à inovação.',
      'Em 2025, o Parque Pedra Branca registrou a instalação de 28 novas empresas, a criação de 1.200 empregos diretos e a movimentação de R$ 42 milhões em rodadas de investimento — todos recordes históricos do hub.',
      '"Cinco anos consecutivos no pódio não são acidente. São o resultado de uma estratégia de longo prazo, de uma equipe dedicada e de um ecossistema que acredita genuinamente que inovação transforma territórios", declarou o presidente do Inaitec, Dr. Carlos Eduardo Silva.',
    ],
  },
  {
    id: 4,
    slug: 'demo-day-60-investidores-8-cartas-intencao',
    titulo: 'Demo Day reúne 60 investidores e fecha 8 cartas de intenção na mesma noite',
    categoria: 'Eventos',
    data: '22 mar 2026',
    autor: AUTORES['ana-luiza-ferreira'],
    excerpt:
      'O evento anual do Acelera Pedra Branca reuniu o maior número de investidores de toda a história do programa.',
    imagem: '/noticias-4.jpg',
    corpo: [
      'O Demo Day da 11ª turma do Acelera Pedra Branca bateu todos os recordes. Sessenta investidores — entre anjos, fundos de venture capital e family offices — acompanharam os pitches das 12 startups formadas e, ao final da noite, oito cartas de intenção de investimento foram assinadas.',
      'O evento, realizado no auditório principal do Parque Pedra Branca com transmissão ao vivo para mais de 800 espectadores online, contou com pitches de 8 minutos por startup, seguidos de sessões de Q&A com a plateia de investidores.',
      'Entre os destaques da noite estavam a ClimaFit, solução de gestão climática para o agronegócio que captou uma LOI de R$ 3,5M; a EduFlow, plataforma de microlearning corporativo com interesse de dois fundos simultâneos; e a MedRoute, que conecta pacientes a especialistas em regiões remotas.',
      '"O Demo Day é a cereja do bolo, mas o trabalho real acontece nos seis meses anteriores. O que os investidores veem aqui é o resultado de 180 horas de mentoria, dezenas de reuniões de validação e muita iteração de produto", explicou a gestora do programa, Juliana Borges.',
    ],
  },
  {
    id: 5,
    slug: 'parceria-universidade-federal-3-spin-offs',
    titulo: 'Parceria com universidade federal abre caminho para 3 novas spin-offs',
    categoria: 'Notícias',
    data: '15 mar 2026',
    autor: AUTORES['carlos-meurer'],
    excerpt:
      'Acordo prevê transferência tecnológica e pesquisa aplicada nos verticais de saúde, agro e cidades inteligentes.',
    imagem: '/noticias-5.jpg',
    corpo: [
      'O Inaitec firmou parceria estratégica com uma universidade federal catarinense para desenvolvimento de três spin-offs nos verticais de saúde, agronegócio e cidades inteligentes. O acordo prevê transferência tecnológica, acesso a laboratórios de pesquisa e co-orientação de doutores e mestres que integrarão as equipes fundadoras.',
      'As spin-offs serão incubadas diretamente no Parque Pedra Branca e terão acesso ao programa de pré-aceleração do Inaitec, incluindo mentoria de negócios, suporte jurídico para proteção de propriedade intelectual e acesso à rede de investidores.',
      'A iniciativa é resultado de dois anos de negociação e representa um novo modelo de transferência tecnológica no Sul do Brasil — onde pesquisa aplicada e empreendedorismo se encontram de forma estruturada e com suporte institucional em ambos os lados.',
    ],
  },
  {
    id: 6,
    slug: 'agrosmart-dobra-faturamento-expande-5-estados',
    titulo: 'AgroSmart dobra faturamento e expande para 5 estados após aceleração',
    categoria: 'Cases',
    data: '01 mar 2026',
    autor: AUTORES['fernanda-luz'],
    excerpt:
      'A startup de agritech saiu do programa com 5 contratos corporativos e cobertura em três estados do Sul.',
    imagem: '/noticias-1.jpg',
    corpo: [
      'A AgroSmart, startup de agritech que passou pelo Acelera Pedra Branca em 2024, dobrou seu faturamento em 12 meses e expandiu sua operação para cinco estados brasileiros. A empresa, que desenvolve soluções de monitoramento de solo e previsão de safra com base em IA, saiu do programa com cinco contratos corporativos e encerrou 2025 com receita anual de R$ 4,2 milhões.',
      'Durante o programa, a equipe validou seu modelo de precificação, reformulou o go-to-market e firmou parcerias com duas cooperativas agrícolas do Sul. A mentoria em vendas B2B e o acesso à rede de clientes corporativos do Inaitec foram apontados pelos fundadores como os diferenciais mais valiosos.',
      '"Antes do programa, a gente tinha tecnologia. Depois, aprendemos a vender", resumiu Naira Oliveira, CEO da AgroSmart. A empresa planeja abrir uma nova rodada de investimento no segundo semestre de 2026 para acelerar a expansão para o Centro-Oeste.',
    ],
  },
  {
    id: 7,
    slug: 'inaitec-10-melhores-hubs-america-latina',
    titulo: 'Inaitec entre os 10 melhores hubs de inovação da América Latina',
    categoria: 'Conquistas',
    data: '20 fev 2026',
    autor: AUTORES['ana-luiza-ferreira'],
    excerpt:
      'Ranking publicado por consultoria internacional posiciona o hub catarinense entre os mais influentes da região.',
    imagem: '/noticias-2.jpg',
    corpo: [
      'O Inaitec foi incluído no ranking dos 10 melhores hubs de inovação da América Latina, publicado pela consultoria internacional Startup Genome em parceria com a Global Entrepreneurship Network. É a primeira vez que um hub do Sul do Brasil figura entre os dez primeiros da região.',
      'O ranking avalia critérios como volume de startups ativas, qualidade dos programas de aceleração, integração com universidades, acesso a capital e conexões internacionais. O Inaitec se destacou especialmente nos quesitos de densidade de mentores especializados e taxa de sobrevivência das startups formadas — 82% ainda ativas após três anos.',
      'A posição no ranking deve impulsionar a atração de startups de outros estados e países para os programas do hub, além de fortalecer as conexões com fundos internacionais que usam o ranking como referência para identificar ecossistemas emergentes.',
    ],
  },
  {
    id: 8,
    slug: 'missao-internacional-8-startups-boston',
    titulo: 'Missão Internacional: 8 startups representam o Sul em Boston',
    categoria: 'Eventos',
    data: '10 fev 2026',
    autor: AUTORES['carlos-meurer'],
    excerpt:
      'A missão de 5 dias incluiu visitas ao MIT Media Lab, Harvard Innovation Labs e reuniões com fundos de VC americanos.',
    imagem: '/noticias-3.png',
    corpo: [
      'Oito startups do ecossistema Inaitec participaram da Missão Boston 2026, programa de internacionalização de cinco dias que incluiu visitas ao MIT Media Lab, Harvard Innovation Labs e reuniões com cinco fundos de venture capital americanos com foco em mercados emergentes.',
      'A missão foi organizada em parceria com a Apex-Brasil e o escritório de representação do estado de Santa Catarina em Boston. Além das visitas institucionais, cada startup participou de ao menos duas reuniões de pitch com investidores americanos e uma sessão de networking com a comunidade brasileira do ecossistema de inovação de Boston.',
      'Três empresas retornaram com termo de confidencialidade assinado e pelo menos uma reunião de follow-up agendada com fundos americanos. "Foi transformador. Ver de perto como funciona o ecossistema de Boston muda completamente a régua do que é possível construir", disse Felipe Andrade, CEO da HealthRoute, uma das participantes.',
      'A próxima missão internacional está programada para o segundo semestre de 2026, com destino a Tel Aviv — referência global em deeptech e cibersegurança.',
    ],
  },
  {
    id: 9,
    slug: 'finlab-fecha-rodada-seed-r25m',
    titulo: 'FinLab fecha rodada seed de R$ 2,5M com investidores da rede Inaitec',
    categoria: 'Cases',
    data: '28 jan 2026',
    autor: AUTORES['fernanda-luz'],
    excerpt:
      'A fintech conectou-se a três investidores anjo durante o Demo Day e fechou a rodada em menos de 60 dias.',
    imagem: '/noticias-4.jpg',
    corpo: [
      'A FinLab, fintech de crédito para pequenos produtores rurais, fechou rodada seed de R$ 2,5 milhões com três investidores anjo da rede Inaitec — todos conectados à startup durante o Demo Day da 11ª turma do Acelera Pedra Branca. A captação foi concluída em menos de 60 dias após o evento.',
      'A startup desenvolve uma plataforma de análise de crédito alternativo para agricultores familiares, usando dados satelitais e histórico de produção no lugar de score de crédito tradicional — tornando o crédito acessível a um segmento que representa 70% dos alimentos produzidos no Brasil, mas tem acesso extremamente limitado ao sistema financeiro.',
      'O capital captado será usado para expansão da equipe de tecnologia, validação do modelo em duas novas regiões produtoras e obtenção de licença de crédito junto ao Banco Central. "Sem o Inaitec, levaríamos pelo menos um ano a mais para chegar aqui. A rede de investidores e a credibilidade do programa encurtaram muito esse caminho", disse Lucas Carvalho, cofundador da FinLab.',
    ],
  },
]
