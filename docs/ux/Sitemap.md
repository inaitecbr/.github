# Sitemap — Inaitec Website Redesign
**Projeto:** Inaitec — Instituto de Inovação do Ecossistema Pedra Branca
**Fase:** UX / Sitemap
**Data:** Abril 2026
**Responsável:** _(preencher)_
**Status:** Gerado por AI — validação humana necessária antes de avançar para Copywriter e Conversão

---

## Sobre este documento

Arquitetura de informação completa do site Inaitec. Organizada por valor para cada público — não por estrutura interna do instituto. Fundamentada no Foundation.md, Personas.md, Benchmarking.md e PRD v1.1.

---

## Header — Navegação Principal

```
Logo Inaitec  |  Programas ▾  |  Soluções ▾  |  Portal de Conteúdo  |  Traga sua Empresa  |  [Área do Associado]  |  [Fale Conosco]
```

### Programas ▾ — Megamenu com 3 colunas + link geral

| Para Startups | Para Empresas | Para Governo |
|---|---|---|
| Acelera Pedra Branca | Inovação Aberta | Políticas Públicas |
| Impulse Inaitec | Globaliza Inaitec | Emprega Palhoça |
| Globaliza Inaitec | Catalisa Inaitec | |
| Catalisa Inaitec | Laboratório Cidade | |
| Laboratório Cidade | Emprega Palhoça | |
| Hub de Ideias | Missões Internacionais | |
| Missões Internacionais | | |

**→ Sobre os Programas** — link para página /programas com catálogo completo dos programas com filtros por público, estágio e modelo de entrada.

> Programas transversais (Globaliza, Catalisa, Laboratório Cidade, Missões Internacionais) aparecem em mais de uma coluna — a página do programa é única, o ponto de entrada varia.

### Soluções ▾ — Dropdown simples
| Item | URL sugerida |
|---|---|
| Empresas Instaladas | /solucoes/empresas-instaladas |
| Chamadas Abertas | /chamadas |
| Banco de Talentos | /banco-de-talentos |

> Benefícios e infraestrutura do Parque Pedra Branca passam para a página dedicada "Traga sua Empresa". Missões Internacionais migra para o megamenu de Programas (Para Startups e Para Empresas).

### Itens simples no header
| Item | URL sugerida | Tipo |
|---|---|---|
| Portal de Conteúdo | /conteudo | Página |
| Traga sua Empresa | /traga-sua-empresa | Página |
| Área do Associado | /area-do-associado | CTA secundário |
| Fale Conosco | /fale-conosco | CTA primário (botão destacado) |

> Banco de Talentos acessado via Soluções ▾ ou pela página explicativa /banco-de-talentos. Missões Internacionais migra para o megamenu de Programas.

---

## Estrutura Completa de Páginas

> **Nota global:** Todas as páginas incluem Footer ao final. O footer contém: links institucionais, redes sociais, endereço, política de privacidade e newsletter.


### 0. Home
**URL:** /
**Objetivo:** Hub narrativo do ecossistema. Comunicar o que é o Inaitec, os números de impacto e distribuir cada perfil de visitante para sua jornada em ≤ 3 cliques.
**Público:** Todos
**Prioridade:** P0

**Seções da página:**
1. Hero section — +300 startups, R$3,5Bi, 15 anos, 1,7M m²
2. Lista de mantenedores
3. O ecossistema Pedra Branca
4. Jornada do empreendedor — bloco de 4 colunas (segmentação por público)
   - Startups e Empreendedores → jornada Acelera/Impulse
   - Grandes e Médias Empresas → jornada Inovação Aberta
   - Investidores → CTA de contato / rede de investidores
   - Entidades, Universidades e Governo → jornada Políticas Públicas
5. Conheça os programas — seção com resumo dos programas com link direcionador
6. Chamadas abertas em destaque
7. Cases / Startups do ecossistema
8. Notícias recentes
9. Traga sua empresa
10. Fale Conosco (Formulário)
11. Footer

> Investidores e Governo são atendidos pelo bloco de 4 colunas — **sem páginas dedicadas nesta versão**.

---

### 0.1 Sobre os Programas
**URL:** /programas
**Objetivo:** Catálogo completo dos programas com filtros por público (Startups / Empresas / Governo), estágio e modelo de entrada. Ponto de entrada para quem chegou pelo link "Sobre os Programas" do megamenu ou não sabe qual programa é o certo.
**Público:** Todos
**Prioridade:** P0

**Seções da página:**
1. Filtros por público, estágio e modelo de entrada
2. Cards de cada programa com: nome, público, estágio, modelo de entrada e status de inscrição
3. CTA de cada card leva para a página do programa

---

### 1. Sobre

#### 1.1 Quem Somos
**URL:** /sobre/quem-somos
**Objetivo:** Apresentar o Inaitec, sua missão, valores e papel no ecossistema Pedra Branca.
**Público:** Todos (primeiro contato institucional)
**Prioridade:** P0

#### 1.2 Nossa História
**URL:** /sobre/nossa-historia
**Objetivo:** Linha do tempo da trajetória do instituto — 15 anos de operação, marcos e conquistas.
**Público:** Governo, Investidores, Imprensa
**Prioridade:** P1

#### 1.3 Presidência e Conselho de Administração
**URL:** /sobre/presidencia-e-conselho
**Objetivo:** Apresentar a liderança e estrutura de governança do instituto.
**Público:** Governo, Investidores, Empresas
**Prioridade:** P1

#### 1.4 Relatório de Atividades
**URL:** /sobre/relatorio-de-atividades
**Objetivo:** Transparência institucional — resultados anuais, programas executados, impacto gerado.
**Público:** Governo, Investidores, Imprensa
**Prioridade:** P1

#### 1.5 Estrutura INAITEC
**URL:** /sobre/estrutura-inaitec
**Objetivo:** Comunicar ao usuário sobre a estrutura física do prédio Inaitec, sobre obras e as futuras implantações no prédio.
**Público:** Empresas, Governo, Investidores
**Prioridade:** P1

**Seções da página:**
1. Apresentação do prédio e estrutura física atual
2. Obras e expansões em andamento
3. Futuras implantações no prédio
4. CTA final — Fale Conosco
5. Footer

---

### 2. Programas

Cada programa tem página própria com estrutura padronizada:
- O que é o programa
- Para quem é (público e critérios)
- O que você ganha (benefícios)
- Como funciona (etapas)
- Status de inscrição (aberta / fechada / em breve / fluxo contínuo)
- CTA principal (formulário ou contato)
- Cases / startups que passaram pelo programa

#### 2.1 Acelera Pedra Branca
**URL:** /programas/acelera-pedra-branca
**Público primário:** Startups (MVP validado → pronto para mercado)
**Modelo de entrada:** Seletivo periódico
**Status de inscrição:** Dinâmico (aberta / fechada / próxima edição em [data])
**Prioridade:** P0

#### 2.2 Impulse Inaitec
**URL:** /programas/impulse-inaitec
**Público primário:** Startups / Empreendedores (ideia → validação de protótipo)
**Modelo de entrada:** Fluxo contínuo
**Status de inscrição:** Sempre aberto
**Prioridade:** P0

#### 2.3 Globaliza Inaitec
**URL:** /programas/globaliza-inaitec
**Público primário:** Startups em escala + Empresas consolidadas
**Modelo de entrada:** Seletivo / sob demanda
**Aparece em:** Megamenu Startups + Megamenu Empresas
**Prioridade:** P1

#### 2.4 Inovação Aberta
**URL:** /programas/inovacao-aberta
**Público primário:** Indústrias e empresas de médio/grande porte
**Modelo de entrada:** Sob demanda (empresa apresenta desafio)
**Prioridade:** P0

#### 2.5 Catalisa Inaitec
**URL:** /programas/catalisa-inaitec
**Público primário:** Startups + Empresas inovadoras
**Modelo de entrada:** Sob demanda
**Aparece em:** Megamenu Startups + Megamenu Empresas
**Prioridade:** P1

#### 2.6 Laboratório Cidade
**URL:** /programas/laboratorio-cidade
**Público primário:** Startups + Empresas + Pesquisadores
**Modelo de entrada:** Parceria / sob demanda
**Aparece em:** Megamenu Startups + Megamenu Empresas
**Prioridade:** P1

#### 2.7 Políticas Públicas
**URL:** /programas/politicas-publicas
**Público primário:** Governos municipais / órgãos públicos
**Modelo de entrada:** Sob demanda
**Aparece em:** Megamenu Governo
**Prioridade:** P0 (diferencial único — nenhum concorrente tem)

#### 2.8 Emprega Palhoça
**URL:** /programas/emprega-palhoca
**Público primário:** Cidadãos de Palhoça + Empresas parceiras
**Modelo de entrada:** Fluxo contínuo
**Aparece em:** Megamenu Empresas + Megamenu Governo
**Prioridade:** P1

#### 2.9 Hub de Ideias
**URL:** /programas/hub-de-ideias
**Público primário:** Empreendedores em fase de ideia
**Modelo de entrada:** Ciclos de seleção
**Aparece em:** Megamenu Startups
**Prioridade:** P1

#### 2.10 Missões Internacionais
**URL:** /programas/missoes-internacionais
**Público primário:** Startups em escala + Empresas consolidadas
**Modelo de entrada:** Seletivo / sob demanda
**Aparece em:** Megamenu Startups + Megamenu Empresas
**Prioridade:** P1

---

### 3. Traga sua Empresa
**URL:** /traga-sua-empresa
**Objetivo:** Comunicar às empresas os benefícios e a infraestrutura disponível no Parque Pedra Branca — coworking, laboratórios, incentivos fiscais, perks de parceiros — e apresentar as empresas que já fazem parte do ecossistema.
**Público:** Empresas (interessadas em se instalar no Parque)
**Prioridade:** P1

**Seções da página:**
1. Hero
2. Lista com logos e benefícios dos parceiros (Zendesk, HubSpot, IBM Cloud, Notion, Miro, Pipedrive, etc.)
3. Infraestrutura do Parque Pedra Branca (coworking, laboratórios, incentivos fiscais, localização)
4. Por que fazer parte do ecossistema Inaitec
5. CTA
6. Footer

### 4. Soluções

#### 4.1 Empresas Instaladas
**URL:** /solucoes/empresas-instaladas
**Objetivo:** Vitrine das empresas que já estão instaladas e que passaram pelo ecossistema no Parque Pedra Branca com direcionadores.
**Público:** Empresas (Ricardo), Investidores (André)
**Prioridade:** P1

**Seções da página:**
1. Hero
2. Cards individuais com logos de empresas e direcionadores
3. CTA
4. Footer

#### 4.2 Chamadas Abertas
**URL:** /chamadas
**Objetivo:** Agregar todas as seleções abertas no momento — programas, editais, parcerias. Ponto de entrada para quem sabe que quer participar mas não sabe de qual programa.
**Público:** Startups, Empresas, Governo
**Prioridade:** P0

**Seções da página:**
1. Hero
2. Lista de chamadas abertas com filtros
3. CTA
4. Footer

---

### 5. Portal de Conteúdo
**URL:** /conteudo
**Objetivo:** Hub de conteúdo — notícias do ecossistema, cases, conquistas, eventos. Filtros por categoria.
**Público:** Todos
**Prioridade:** P1

**Seções da página:**
1. Hero — lista de conteúdos em destaque
2. Filtros por categoria (notícias, cases, eventos, conquistas)
3. Grid de posts/artigos
4. CTA
5. Footer

---

### 6. Fale Conosco
**URL:** /fale-conosco
**Objetivo:** Ponto de contato centralizado. Formulário com campo de perfil (Startup / Empresa / Investidor / Governo / Imprensa / Outro) para direcionamento correto.
**Público:** Todos
**Prioridade:** P0

**Seções da página:**
1. Formulário principal com campo de perfil (Startup / Empresa / Investidor / Governo / Imprensa / Outro)
2. Informações de contato direto
3. Footer

---

### 7. Links Externos (sem desenvolvimento)
| Página | Destino | Tipo |
|---|---|---|
| Área do Associado | Link externo | Página explicativa + botão |
| Banco de Talentos | Link externo | CTA no header + página explicativa |

---

---

### 8. Área do Associado
**URL:** /area-do-associado
**Objetivo:** Página explicativa antes do acesso ao link externo. Comunicar o que é a área do associado, quem pode acessar e o que encontra lá dentro.
**Público:** Empresas e startups já associadas ao Inaitec
**Prioridade:** P1

**Seções da página:**
1. Hero — o que é
2. Lista de benefícios e funcionalidades (documentos, relatórios, networking, agenda, etc.)
3. Quem pode acessar
4. CTA principal — botão "Acessar área do associado →" (link externo)
5. Footer

---

### 9. Banco de Talentos
**URL:** /banco-de-talentos
**Objetivo:** Página explicativa antes do acesso ao link externo. Apresentar o programa de capacitação e empregabilidade, para quem é e como participar — tanto para candidatos quanto para empresas parceiras que oferecem vagas.
**Público:** Cidadãos de Palhoça (candidatos), Empresas parceiras (recrutadores)
**Prioridade:** P1

**Seções da página:**
1. O que é o Banco de Talentos — descrição do programa
2. Para candidatos — como se cadastrar, quais vagas existem, perfis buscados
3. Para empresas — como anunciar vagas e conectar com talentos locais
4. Números do programa — vagas preenchidas, empresas parceiras, candidatos cadastrados
5. CTA principal — botão "Acessar o Banco de Talentos →" (link externo)
6. CTA secundário — "Sou empresa e quero anunciar vagas → Fale Conosco"

---

## Fluxos por Persona

### Sofia — Fundadora de Startup
```
Google "aceleração startups SC"
→ Home
→ Bloco "Startups e Empreendedores"
→ Soluções / Acelera Pedra Branca
→ Lê critérios + status de inscrição
→ Formulário de inscrição / "Avise-me quando abrir"
```
**Cenário crítico:** Inscrições fechadas sem data → mostrar próxima edição + alternativa (Impulse)

---

### Ricardo — Diretor de Inovação Industrial
```
Indicação em evento
→ Home
→ Bloco "Grandes e Médias Empresas"
→ Soluções / Inovação Aberta
→ Lê cases industriais + como funciona
→ Formulário de contato com campo aberto para desafio
```
**Cenário crítico:** Sem cases industriais visíveis → Ricardo não identifica relevância → sai

---

### André — Investidor-Anjo
```
LinkedIn ou indicação
→ Home
→ Bloco "Investidores"
→ CTA de contato / "Faça parte da rede de investidores"
```
**Nota:** André não tem página dedicada. O bloco na home deve ter CTA claro e informações suficientes sobre o portfólio de startups do ecossistema.

---

### Carlos — Secretário Municipal
```
Fórum de prefeituras / Google "políticas públicas inovação SC"
→ Home
→ Bloco "Entidades, Universidades e Governo"
→ Soluções / Políticas Públicas
→ Case Palhoça documentado
→ Formulário de contato com campo para descrever o município
```
**Cenário crítico:** Linguagem de "startup" sem tradução para gestão pública → Carlos não se identifica → sai

---

## Regras de Arquitetura

- Cada jornada chega ao formulário de contato/inscrição relevante em ≤ 3 cliques a partir da home
- Status de inscrição de cada programa visível sem precisar abrir a página (badge na vitrine)
- Programas com entrada contínua (Impulse, Emprega Palhoça) nunca mostram "inscrições fechadas" — sempre "inscrições abertas"
- Programas transversais têm página única — o megamenu aponta para a mesma URL independente da coluna
- Investidores e Governo atendidos pelo bloco de 4 colunas na home — sem páginas dedicadas nesta versão

---

## Mapa de URLs

| Página | URL | Prioridade |
|---|---|---|
| Home | / | P0 |
| Sobre os Programas | /programas | P0 |
| Quem Somos | /sobre/quem-somos | P0 |
| Nossa História | /sobre/nossa-historia | P1 |
| Presidência e Conselho | /sobre/presidencia-e-conselho | P1 |
| Relatório de Atividades | /sobre/relatorio-de-atividades | P1 |
| Acelera Pedra Branca | /programas/acelera-pedra-branca | P0 |
| Impulse Inaitec | /programas/impulse-inaitec | P0 |
| Globaliza Inaitec | /programas/globaliza-inaitec | P1 |
| Inovação Aberta | /programas/inovacao-aberta | P0 |
| Catalisa Inaitec | /programas/catalisa-inaitec | P1 |
| Laboratório Cidade | /programas/laboratorio-cidade | P1 |
| Políticas Públicas | /programas/politicas-publicas | P0 |
| Emprega Palhoça | /programas/emprega-palhoca | P1 |
| Hub de Ideias | /programas/hub-de-ideias | P1 |
| Traga sua Empresa | /traga-sua-empresa | P1 |
| Missões Internacionais | /programas/missoes-internacionais | P1 |
| Estrutura INAITEC | /sobre/estrutura-inaitec | P1 |
| Empresas Instaladas | /solucoes/empresas-instaladas | P1 |

| Chamadas Abertas | /chamadas | P0 |
| Portal de Conteúdo | /conteudo | P1 |
| Fale Conosco | /fale-conosco | P0 |
| Área do Associado | /area-do-associado | P1 |
| Banco de Talentos | /banco-de-talentos | P1 |

---

## Validação Humana

Antes de avançar para Copywriter e Conversão, validar:

- [ ] A estrutura do header (Sobre, Soluções, Ecossistema, Notícias, Fale Conosco) está aprovada?
- [ ] O megamenu de Soluções com 3 colunas está correto?
- [ ] Os 9 programas estão todos mapeados com URL e prioridade corretos?
- [ ] Os fluxos por persona refletem as jornadas esperadas pelo Inaitec?
- [ ] As regras de arquitetura (≤3 cliques, status de inscrição, programas transversais) estão aprovadas?
- [ ] Investidores e Governo sem página dedicada está confirmado para esta versão?

**Validado por:** _____________________ **Data:** ___________

---

*Documento gerado com base em: Foundation.md, Personas.md, Benchmarking.md e PRD v1.1 — Abril 2026.*
*Requer validação antes de avançar para Copywriter.md e Conversao.md.*
