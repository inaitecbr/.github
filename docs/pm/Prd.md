# PRD — Inaitec Website Redesign

**Projeto:** Inaitec — Redesign de Site Institucional
**Versão:** 1.1
**Data:** Abril 2026
**Responsável:** João Felipe (PM, Atomsix)

---

## 1. Executive Summary

O Inaitec é um hub privado sem fins lucrativos que governa o Parque Tecnológico Pedra Branca em Palhoça/SC — um dos projetos de cidade inteligente mais avançados do Brasil. Com 15 anos de operação, +300 startups aceleradas e R$3,5 bilhões em faturamento gerado no ecossistema, o instituto acumula resultados expressivos que o site atual falha em comunicar.

O redesign substitui um site fragmentado — resultado de uma atualização que desviou do manual de marca vigente — por uma plataforma organizada por valor para cada público, não por estrutura interna. O novo site posiciona o Inaitec como referência nacional de inovação, comunica os 9 programas com clareza e converte visitantes em candidatos, parceiros e investidores por meio de jornadas segmentadas.

**Proposta de valor central:**

> *"O Inaitec não é só uma aceleradora. É o único lugar do Brasil onde uma startup, uma indústria, um investidor e uma prefeitura compartilham o mesmo ecossistema físico — uma cidade inteligente real, em operação, em Pedra Branca. O novo site existe para que cada um desses públicos entenda, em segundos, o que esse ecossistema tem para oferecer a ele."*

A proposta se apoia em três diferenciais que o site precisa comunicar com evidências:

| Diferencial | Prova | Onde comunicar |
|---|---|---|
| Escala de impacto comprovada | +300 startups, R$3,5Bi no ecossistema, 15 anos | Home, Sobre |
| Ecossistema físico único | Parque Pedra Branca como cidade inteligente em operação | Home hero, Cidade Inteligente |
| Alcance internacional ativo | Missões internacionais 2025, programas de internacionalização | Home números, Programa de Internacionalização |

---

## 2. Problem Statement

### Causa raiz

A arquitetura de informação do site atual está organizada por estrutura interna do instituto (áreas, programas, departamentos) em vez de por valor para cada público. O resultado: qualquer visitante — seja uma fundadora de startup, um diretor industrial, um anjo ou um secretário municipal — chega ao site e não encontra a jornada para o seu perfil.

> *"A gente tem que falar com todo mundo, só que como que o usuário que entra sabe para onde ir?"* — Equipe Inaitec

O problema foi agravado por uma atualização do site que desviou do manual de marca vigente, gerando um estado visual inconsistente e sem aderência à identidade atual do instituto.

### Impacto quantificado por segmento

| Público | Problema atual | Consequência |
|---|---|---|
| Startups (Sofia) | Status de inscrições ausente, critérios de seleção vagos | Abandono antes da conversão |
| Empresas (Ricardo) | Sem diferenciação de jornada empresa vs. startup | Leads corporativos não identificam relevância |
| Investidores (André) | Nenhuma vitrine de portfolio de startups | Deal flow se perde para São Paulo |
| Governo (Carlos) | Nenhuma referência a parceria pública, case Palhoça não documentado | Gestores municipais não iniciam contato |

**Baseline atual:** ~5.000 visitas em 2 meses (2025). Sem dados de taxa de rejeição, tempo na página ou conversão de inscrições — impossível medir impacto hoje sem instrumentar o site.

---

## 3. Goals & Metrics

### Objetivos (SMART)

| ID | Objetivo | Métrica |
|---|---|---|
| G-01 | Aumentar candidaturas ao Acelera Pedra Branca via site | Formulários submetidos / edição |
| G-02 | Gerar leads qualificados de empresas industriais | Formulários "Sou Empresa" submetidos / mês |
| G-03 | Reduzir abandono por falta de informação | Taxa de rejeição na Home |
| G-04 | Suportar tráfego pago com landing pages otimizadas | Taxa de conversão por campanha |
| G-05 | Instrumentar o site para tomada de decisão | Eventos Analytics configurados (scroll, CTA, form) |

### Prioridade de objetivos

- **P0 (bloqueador de go-live):** G-03, G-05
- **P1 (resultado em 90 dias):** G-01, G-04
- **P2 (resultado em 6 meses):** G-02

---

## 4. Non-Goals

Os itens abaixo estão **fora do escopo** deste projeto:

- Animações e motion design
- Protótipo clicável (Figma estático para entrega)
- Hospedagem e infraestrutura de cloud
- Integrações com CRM ou automações de marketing
- Versões em inglês e espanhol (dependem de tradução do cliente — escopo futuro)
- Área restrita / login para associados (link externo, sem desenvolvimento)
- Banco de Talentos funcional (link externo, sem desenvolvimento)
- Funcionalidades de e-commerce ou pagamento
- SEO técnico avançado (apenas boas práticas básicas de SEO on-page)

---

## 5. User Personas

### Persona 1 — Sofia | Fundadora de Startup em Estágio Inicial

- **Perfil:** CEO, 28 anos, agritech, pré-seed, Palhoça/SC
- **Objetivo no site:** Entender se o Acelera Inaitec é adequado para ela e iniciar a inscrição
- **Dor principal:** Não sabe se as inscrições estão abertas, não encontra critérios de seleção claros
- **Cenário de falha:** Inscrições fechadas sem data da próxima edição → abandona sem converter
- **Jornada:** Google → Home → "Sou Startup" → Acelera Pedra Branca → Formulário / "Avise-me"

### Persona 2 — Ricardo | Diretor de Inovação Industrial

- **Perfil:** Diretor de P&D, 45 anos, indústria catarinense R$200M, São José/SC
- **Objetivo no site:** Entender o que o Inaitec oferece para empresas e iniciar uma conversa exploratória
- **Dor principal:** Site não diferencia empresa de startup, sem cases industriais com dados
- **Cenário de falha:** Lista genérica de 9 programas sem filtro → não identifica relevância → sai
- **Jornada:** Indicação → Home → "Sou Empresa" → Inovação Aberta / Laboratório Cidade → Formulário

### Persona 3 — André | Investidor-Anjo

- **Perfil:** Ex-fundador, 40 anos, 7 investimentos Sul do Brasil, ticket R$150k–R$500k
- **Objetivo no site:** Descobrir startups com tração no ecossistema Inaitec
- **Dor principal:** Nenhuma vitrine de portfolio, nenhuma jornada para investidor
- **Cenário de falha:** Bloco "Investidores" na home sem profundidade ou CTA claro → sai sem engajar
- **Jornada:** LinkedIn → Home → bloco "Investidores" (coluna 3) → CTA de contato / rede de investidores

### Persona 4 — Carlos | Secretário Municipal de Inovação

- **Perfil:** Secretário de Desenvolvimento, 52 anos, município 80k hab., SC
- **Objetivo no site:** Compreender como o Inaitec pode apoiar políticas públicas de inovação no seu município
- **Dor principal:** Nenhuma jornada pública, case Palhoça sem profundidade, linguagem inacessível
- **Cenário de falha:** Bloco "Governo" na home com linguagem "startup" sem tradução → desconexão → não contata
- **Jornada:** Fórum de prefeituras → Home → bloco "Governo" (coluna 4) → Programa Políticas Públicas → Formulário

---

## 6. Functional Requirements

### FR-001 — Navegação segmentada por audiência

**Prioridade:** P0
**Descrição:** A home e o header devem oferecer segmentação explícita por perfil (Startup / Empresa / Investidor / Governo), cada uma abrindo uma jornada própria com linguagem, conteúdo e CTAs adequados ao perfil.
**Critério de aceite:** Cada jornada leva o usuário do ponto de entrada ao formulário de contato/inscrição relevante em ≤3 cliques.

---

### FR-002 — Home como hub narrativo do ecossistema

**Prioridade:** P0
**Descrição:** A home posiciona o Inaitec como referência de inovação nacional. Deve comunicar: (a) o que é o instituto, (b) os números de impacto (+300 startups, R$3,5Bi, 1,7M m² construídos), (c) o diferencial do Parque Pedra Branca como cidade inteligente, (d) um bloco de 4 colunas — Startups e Empreendedores | Grandes e Médias Empresas | Investidores | Entidades, Universidades e Governo — com linguagem, benefícios e CTA específicos por perfil. Investidores e Governo são atendidos por esse bloco na home; **não possuem páginas dedicadas** nesta versão.
**Critério de aceite:** Acima da dobra, o visitante identifica o que é o Inaitec e qual jornada tomar sem scroll. O bloco de 4 colunas está visível sem scroll em desktop e em accordion colapsável no mobile.

---

### FR-003 — Página de cada programa com status de inscrição

**Prioridade:** P0
**Descrição:** Cada um dos 9 programas tem página própria com: descrição completa, benefícios, critérios de seleção, status de inscrições (Abertas / Fechadas — com data de reabertura quando aplicável) e formulário de inscrição ou CTA alternativo ("Avise-me quando abrir").
**Critério de aceite:** Visitante consegue determinar em <30s se o programa está disponível para ele e o que fazer a seguir.

**Programas no escopo:**
1. Acelera Pedra Branca
2. Impulse Inaitec — Programa de Incubação
3. Globaliza Inaitec — Programa de Internacionalização (inclui Missões Internacionais)
4. Inovação Aberta
5. Catalisa Inaitec — Captação de Recursos e Projetos de Impacto
6. Laboratório Cidade do Inaitec
7. Criação de Políticas Públicas
8. Emprega Palhoça
9. Hub de Ideias

---

### FR-004 — Jornada "Sou Empresa" com casos industriais

**Prioridade:** P1
**Descrição:** Página dedicada para empresas com linguagem corporativa (não de startup), foco em inovação aberta e P&D. O público primário é indústrias — especialmente as localizadas ou interessadas no Parque Pedra Branca — que buscam resolver desafios via colaboração com startups, universidades e o City Lab. Deve incluir pelo menos 1 case com resultado mensurável (tempo de desenvolvimento, ROI ou novo produto lançado).
**Critério de aceite:** Ricardo (persona 2) identifica relevância e preenche formulário sem precisar interpretar termos de ecossistema.

---

### FR-005 — Vitrine de Programas

**Prioridade:** P1
**Descrição:** Página de catálogo que lista os 9 programas do instituto em formato de cards, com: nome, público-alvo, breve descrição, status de inscrição e link para a página completa do programa. Funciona como ponto de entrada alternativo para quem não chegou via jornada segmentada.
**Critério de aceite:** Visitante consegue ver os 9 programas, filtrar por público (startup / empresa / governo) e acessar a página de qualquer programa em ≤2 cliques.

---

### FR-006 — Hub de Conteúdo Unificado (Blog + Comunicação)

**Prioridade:** P1
**Descrição:** Blog e Comunicação são uma única página — hub de conteúdo com filtros por categoria (programas, eventos, conquistas, ecossistema, imprensa). Gerenciável via CMS sem suporte técnico externo. Substitui a separação entre "Blog" e "Comunicação" do site atual.
**Critério de aceite:** Membro da equipe Inaitec publica, categoriza e visualiza post no hub após treinamento básico de CMS. Filtro funciona sem reload de página.

---

### FR-007 — Chamadas e Seleções em destaque

**Prioridade:** P1
**Descrição:** Página "Chamadas" agrega todas as seleções abertas no momento, com status claro e links diretos para os formulários de cada programa. Deve ser facilmente gerenciável via CMS.
**Critério de aceite:** Sofia (persona 1) encontra a chamada ativa do Acelera em ≤2 cliques da home.

---

### FR-008 — Área Sobre completa e credível

**Prioridade:** P1
**Descrição:** Seção Sobre com subpáginas: Quem Somos, Nossa História, Presidência e Conselho de Administração, Relatório de Atividades. Inclui timeline de 15 anos de história e fotos do time e conselho.
**Critério de aceite:** Visitante encontra a composição do conselho e o relatório de atividades mais recente sem precisar contatar o instituto.

---

### FR-009 — Formulários com confirmação e rastreamento

**Prioridade:** P0
**Descrição:** Todos os formulários de inscrição/contato devem: (a) confirmar submissão com mensagem clara, (b) enviar notificação para o time do Inaitec, (c) disparar e-mail de confirmação para o solicitante, (d) ser rastreados como evento no Google Analytics.
**Critério de aceite:** Submissão de formulário gera evento no Analytics, notificação interna e e-mail de confirmação ao solicitante.

---

### FR-010 — Responsividade mobile-first

**Prioridade:** P0
**Descrição:** Todas as páginas renderizam corretamente em dispositivos móveis (iOS Safari, Android Chrome). Menus, formulários e CTAs são operáveis por toque sem zoom.
**Critério de aceite:** Nenhuma página reprovada no teste de usabilidade mobile básico na entrega de cada fase.

---

### FR-011 — Traga sua empresa

**Prioridade:** P2
**Descrição:** Página dedicada para empresas interessadas em instalar-se no Parque Pedra Branca — diferente da jornada de inovação aberta. Foco em infraestrutura, localização e diferenciais do parque.
**Critério de aceite:** Empresa interessada em relocation encontra os diferenciais do parque e um contato claro.

---

### FR-012 — Fale Conosco centralizado

**Prioridade:** P1
**Descrição:** Página de contato com formulário geral integrado ao RD Station, mapa de localização (Pedra Branca, Palhoça) e canais alternativos (WhatsApp, e-mail, redes sociais).
**Critério de aceite:** Visitante que não se encaixa em nenhuma jornada específica consegue entrar em contato em ≤2 cliques; submissão registrada no RD Station.

---

### FR-013 — Páginas utilitárias (Área do Associado, Banco de Talentos)

**Prioridade:** P2
**Descrição:** Páginas que explicam brevemente o que são os serviços e redirecionam para links externos. Sem desenvolvimento de funcionalidade própria.
**Critério de aceite:** Visitante entende o que é o serviço e acessa o link externo correto.

---

### FR-014 — Formulário de Newsletter

**Prioridade:** P0
**Descrição:** Campo de inscrição na newsletter do Inaitec presente em posição fixa no site (footer e/ou seção dedicada na home). Integrado ao provedor de e-mail marketing do instituto. Rastreado como evento no Google Analytics.
**Critério de aceite:** Visitante consegue se inscrever na newsletter em ≤1 clique a partir de qualquer página; submissão gera evento no Analytics e confirmação visual imediata.

---

## 7. Implementation Phases

O projeto segue os 6 marcos do SoW, com 16 semanas a partir do kick-off (25/03/2026).

### Marco 1 — Planejamento e Kick Off (Semana 1–2)

**Entregáveis:** Documento de Foundation validado, personas aprovadas, escopo alinhado
**Dependências:** Manual de marca entregue pelo Inaitec, imagens fornecidas
**Critério de saída:** Diego confirma escopo e personas antes do início do Sitemap

---

### Marco 2 — Sitemap Estratégico + Jornada do Usuário (Semana 2–3)

**Entregáveis:**
- Sitemap estratégico: hierarquia de páginas com mapeamento de seções por página, objetivos de conversão por seção e CTAs primários/secundários
- Jornada do usuário: fluxo completo pelas 4 personas (Sofia, Ricardo, André, Carlos) do ponto de entrada ao ponto de conversão

**FRs cobertos:** FR-001 (estrutura de jornadas), FR-002 (home hub e bloco de audiências)
**Critério de saída:** Sitemap e jornadas aprovados por Diego com ≤2 rodadas de revisão

---

### Marco 3 — UI Concept (Semana 3–6)

**Entregáveis:** Conceito visual no Figma (desktop + mobile) com: direção de arte, guia de estilo (cores, tipografia, componentes), aplicação nas páginas principais (Home, Programas, Empresas)
**FRs cobertos:** FR-010 (responsividade), identidade visual aderente ao manual de marca
**Critério de saída:** Diego aprova conceito visual e style guide; direção de arte congelada antes do desenvolvimento

---

### Marco 4 — UI Design Completo (Semana 6–10)

**Entregáveis:** Design visual completo no Figma para todas as páginas do escopo (desktop + mobile)
**FRs cobertos:** FR-001 a FR-013 (todas as páginas e fluxos)
**Critério de saída:** Todas as páginas aprovadas com ≤2 rodadas de revisão; handoff para desenvolvimento

---

### Marco 5 — Desenvolvimento (Semana 10–15)

**Entregáveis:** Site funcional com responsividade mobile, formulários integrados, newsletter integrada e Google Analytics configurado
**FRs cobertos:** FR-009 (formulários), FR-010 (mobile), FR-006 (hub de conteúdo), FR-014 (newsletter)
**Critério de saída:** QA completo; todas as páginas aprovadas; Analytics instrumentado (G-05)

---

### Marco 6 — Entrega Final (Semana 16)

**Entregáveis:** Site em produção, 90 dias de garantia iniciados
**Critério de saída:** Go-live aprovado por Diego

---

## 8. Risks & Mitigations

| ID | Risco | Probabilidade | Impacto | Mitigação |
|---|---|---|---|---|
| R-01 | Sem baseline de métricas — impossível medir ROI do redesign | Alta | Médio | Instalar Google Analytics + Hotjar antes do go-live do novo site para criar baseline a partir do lançamento |
| R-02 | Tradução EN/ES não fornecida pelo cliente no prazo | Alta | Baixo | Lançar site apenas em PT; estrutura preparada para multilingue, conteúdo adicionado na fase 2 |
| R-03 | Conteúdo das páginas (redação, fotos) não entregue no prazo | Alta | Alto | Mapear conteúdo necessário por página na semana 1; definir data-limite por marco |
| R-04 | Equipe interna Inaitec discorda de decisões já aprovadas por Diego | Média | Médio | Documentar todas as aprovações formalmente; reprocessar qualquer reversão com Diego |
| R-05 | Programas descontinuados ou renomeados durante o projeto | Baixa | Médio | Confirmar lista de 9 programas com Diego no kick-off; congelar escopo de páginas no Marco 2 |
| R-06 | Performance do site prejudicada por imagens sem otimização | Média | Alto | Definir especificações de imagem (formato, tamanho) na entrega do guia de estilo (Marco 3) |
| R-07 | Exportação de posts de notícias e blog do site atual — perda de conteúdo histórico | Média | Alto | Mapear volume de posts existentes no Marco 1; definir estratégia de migração (exportação, redirecionamentos e canonicals) antes do desenvolvimento |

---

## 9. Constraints

### Técnicas
- Stack: Figma (design); stack de desenvolvimento a confirmar
- Sem hospedagem inclusa no escopo — responsabilidade do Inaitec
- Sem animações ou motion design
- Sem protótipo clicável

### Processo
- 2 rodadas de revisão por fase (excedente impacta cronograma e orçamento)
- Revisões do cliente em até 2 dias úteis
- Garantia de 90 dias cobre apenas bugs — não cobre alterações de terceiros

### Conteúdo
- Inaitec fornece: manual de marca, imagens, redação de todas as páginas
- Atomsix não produz conteúdo editorial (exceto estrutura e copywriting UX de apoio)

---

## 10. Out of Scope (reforço)

- Animações, motion design, vídeo background
- Protótipo clicável
- Hospedagem e cloud
- CRM ou automação de marketing
- Versões EN/ES (fase 2 — depende de tradução do cliente)
- Área do Associado funcional (link externo)
- Banco de Talentos funcional (link externo)
- SEO técnico avançado

---

## 11. Competitive Insights

*Síntese da análise competitiva realizada em Abril 2026, com 10 organizações mapeadas.*

---

### Padrões de mercado que validam decisões do PRD

| Padrão | Referência | FR impactado |
|---|---|---|
| Segmentação de perfis com CTAs distintos desde a home | Cubo Itaú ("Sou startup / corporate / partner / investor"), Techstars (3 perfis no menu), MassChallenge (founders vs. parceiros) | FR-001, FR-002 |
| CTA único e dominante em toda a navegação | Y Combinator ("Apply" persistente), Techstars ("Apply Now" no menu superior) | FR-001, FR-007 |
| Status de inscrição de programas explícito e em tempo real | **Gap de mercado** — nenhum concorrente nacional informa claramente se inscrições estão abertas, quando abrem e o critério mínimo | FR-003 |
| Hub de conteúdo como canal de autoridade | Y Combinator (Library + Hacker News), Distrito (repositório de conteúdo enterprise) | FR-006 |
| Critérios de seleção publicados com transparência | MIDI/CELTA (critérios explícitos de elegibilidade no edital) | FR-003 |

---

### Diferenciais competitivos do Inaitec que o site precisa comunicar

**1. Ecossistema territorial único**
Nenhum concorrente nacional combina ecossistema físico planejado + programas para todos os agentes (startup, empresa, governo, investidor). A ACATE representa empresas mas não tem território. O CELTA teve unidade em Pedra Branca mas em parceria com o próprio Inaitec. O Inaitec é o único com essa combinação — o site atual não comunica isso.

> Referência de execução: STATION F usa o edifício histórico de Paris como argumento central de marca ("The world's biggest startup campus"). Pedra Branca deve ser posicionada da mesma forma — fotos do espaço, dados do ecossistema territorial, mapa.

**2. Programa de Políticas Públicas**
Nenhum concorrente nacional — ACATE, MIDI, CELTA, Cubo Itaú, Distrito — tem programa formal para governo e políticas públicas. É o diferencial com maior barreira de entrada (moat institucional e de relacionamento). O site atual o trata como item de menu; deveria ser elemento de posicionamento.

**3. Comunicação multi-público sem perder clareza**
O Inaitec é o único player que precisa falar com startup, empresa, investidor e governo no mesmo site. O Cubo Itaú chega mais perto (4 perfis) mas não tem governo. Isso é diferencial e risco simultâneo — a solução de jornadas segmentadas (FR-001) é o que torna isso viável sem gerar confusão.

---

### Referências por decisão de design

| Decisão | Referência | Aplicação no Inaitec |
|---|---|---|
| Arquitetura da home com blocos de perfil | Cubo Itaú — hero com 4 CTAs de identificação imediata | Bloco de 4 colunas (FR-002) segue exatamente esse modelo |
| Espaço físico como identidade visual | STATION F — fotos do campus histórico em Paris como elemento central | Pedra Branca nas imagens do hero e seções de contexto do ecossistema |
| Tom de prova social com impacto contextualizado | MassChallenge ("$16B em capital follow-on, 90k empregos") e Techstars ("$130B market cap no portfolio") | Substituir "300 startups aceleradas" por métricas de impacto: empregos gerados, capital levantado, receita no ecossistema |
| Tom de quem seleciona | Y Combinator — posição de força, não de venda | Aplicável nas páginas dos programas com seletivo (Acelera, Globaliza) — tom de critério claro, não de convencimento |
| Depoimentos como elemento de conversão | MassChallenge — depoimentos humanos longos e emocionais na seção central da home | Founders e empresas do ecossistema Pedra Branca como prova social primária |

---

### Ameaças competitivas com implicação no cronograma

| Ameaça | Prazo | Implicação |
|---|---|---|
| ACATE redesenha o site e melhora jornada de inscrição de startups | 0–12 meses | Lançar o novo site Inaitec antes — vantagem de first-mover em comunicação de qualidade em SC |
| Cubo Itaú expande para capitais do Sul (Cubo Uruguai sinaliza expansão regional) | 12+ meses | Consolidar Pedra Branca como identidade e programa de governo como diferencial antes da expansão |
| Corporates catarinenses migram para Distrito (enterprise AI) | 0–12 meses | Fortalecer cases industriais na jornada Empresas (FR-004) antes do lançamento |

---

## Apêndice A — Sitemap Simplificado

```
Home  (bloco de 4 colunas: Startups | Empresas | Investidores | Governo)
├── Sobre
│   ├── Quem Somos
│   ├── Nossa História
│   ├── Presidência e Conselho
│   └── Relatório de Atividades
├── Vitrine de Programas  (catálogo dos 9 programas com filtros)
│   ├── Acelera Pedra Branca + Formulário
│   ├── Impulse Inaitec (Incubação) + Formulário
│   ├── Globaliza Inaitec (Internacionalização + Missões) + Formulário
│   ├── Inovação Aberta + Formulário
│   ├── Catalisa Inaitec (Captação de Recursos) + Formulário
│   ├── Laboratório Cidade + Formulário
│   ├── Políticas Públicas + Formulário
│   ├── Emprega Palhoça + Formulário
│   └── Hub de Ideias + Formulário
├── Empresas  (jornada Ricardo — inovação aberta, cases industriais)
├── Traga sua empresa
├── Chamadas  (seleções abertas agregadas)
├── Hub de Conteúdo  (blog + comunicação, filtros por categoria)
├── Fale Conosco
├── Área do Associado  (→ link externo)
└── Banco de Talentos  (→ link externo)
```

*Investidores e Governo são atendidos pelo bloco de 4 colunas na Home — sem páginas dedicadas nesta versão.*

---

## Apêndice B — Categorização dos Programas

Referência para segmentação de programas nas jornadas do site, filtros da Vitrine de Programas e CTAs por audiência.

| Programa | Público primário | Público secundário | Estágio | Tipo de oferta | Modelo de entrada | Jornadas no site |
|---|---|---|---|---|---|---|
| Acelera Pedra Branca | Startups | — | MVP validado → pronto para mercado | Aceleração + aporte financeiro (fundo R$5M) | Seletivo periódico | Startups |
| Impulse Inaitec (Incubação) | Startups / Empreendedores | Projetos acadêmicos | Ideia → validação de protótipo | Incubação + infraestrutura + mentoria | Fluxo contínuo | Startups |
| Globaliza Inaitec (Internacionalização) | Startups em escala | Empresas consolidadas | Escala / consolidada | Capacitação + conexões internacionais + missões | Seletivo / sob demanda | Startups, Empresas |
| Inovação Aberta | Indústrias (esp. Pedra Branca) | Startups parceiras | Consolidada / transição tecnológica | Cocriação + solução de desafios + City Lab | Sob demanda (empresa apresenta desafio) | Empresas |
| Catalisa Inaitec (Captação de Recursos) | Startups + Empresas inovadoras | Pesquisadores | Qualquer (com projeto estruturado) | Captação: subvenções, investidores, financiamentos | Sob demanda | Startups, Empresas |
| Laboratório Cidade | Startups + Empresas | Pesquisadores / Universidades | Prototipagem → validação em escala real | Infraestrutura + testes urbanos reais | Parceria / sob demanda | Startups, Empresas |
| Criação de Políticas Públicas | Governos municipais / órgãos públicos | — | Institucional | Consultoria estratégica para desenvolvimento econômico | Sob demanda | Governo |
| Emprega Palhoça | Cidadãos de Palhoça | Empresas parceiras (vagas) | Profissional (não startup) | Capacitação técnica + empregabilidade | Fluxo contínuo | Governo, Empresas |
| Hub de Ideias | Empreendedores em fase de ideia | Startups, pesquisadores, empresas | Pré-startup / ideia | Inovação colaborativa + hackathons + mentoria | Ciclos de seleção | Startups, Empresas |

### Notas de segmentação

- **Jornada Startups:** Acelera, Impulse, Globaliza, Catalisa, Laboratório Cidade, Hub de Ideias
- **Jornada Empresas:** Inovação Aberta, Globaliza, Catalisa, Laboratório Cidade, Emprega Palhoça (como parceira de vagas)
- **Jornada Governo:** Políticas Públicas, Emprega Palhoça
- **Programas transversais** (aparecem em mais de uma jornada): Globaliza, Catalisa, Laboratório Cidade
- **Modelo de entrada contínuo** (sem data de inscrição): Impulse, Emprega Palhoça — FR-003 deve tratar esses como "inscrições abertas permanentemente" em vez de status com data

---


*Documento elaborado pela Atomsix com base em imersão, entrevistas e materiais fornecidos pelo Inaitec — Abril 2026.*
