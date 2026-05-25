# Sistema de Skills — Projeto Full AI
## Site Institucional · Março 2026

> **Referência base do framework.** Consulte este arquivo ao criar ou executar qualquer skill.

---

## Visão Geral

Este documento define o sistema de skills para conduzir o primeiro projeto full AI da empresa. O sistema cobre todas as fases de um site institucional — da Discovery ao Deploy — com especialistas AI distintos para cada etapa, controle de decisões, logs automáticos e rastreamento de tokens.

---

## Princípios do Sistema

- Cada fase tem um responsável humano diferente
- Nenhuma fase avança sem o documento anterior validado e gerado
- Especialistas sempre técnicos — não simplificam critérios
- Discordâncias e riscos bloqueiam o avanço até serem resolvidos
- AI consultiva — humano decide, AI executa
- Todos os documentos versionados no Git
- Skills em português por padrão, configurável por projeto
- Só o humano decide quando rodar cada fase (`disable-model-invocation: true`)

---

## Fase 0 — Inputs

Antes de qualquer skill ser executada, o responsável pela Discovery coleta e organiza os materiais de entrada do projeto na pasta `docs/inputs/`. Cria um arquivo `CLAUDE.md` para registrar as informações iniciais.

### Materiais

- Transcrições de reuniões ou entrevistas com o cliente (PDF)
- Materiais de produto, soluções ou programas existentes (PDF)
- Brandbook, logo, paleta de cores, tipografia (PDF)
- Referências visuais que o cliente trouxe
- Anotações de feeling do responsável

---

## Fases do Processo

Cada fase é uma skill independente, com persona especializada, inputs definidos e documento de saída padronizado.

---

### Fase 1 — Foundation `/foundation`

| Campo | Detalhes | Inputs | Outputs |
|-------|----------|--------|---------|
| **Foundation** `/foundation` | Analista de Requisitos Sênior com background em UX Research. Distingue requisito de desejo, restrição de preferência e problema real de sintoma. | `docs/inputs/` (todos os PDFs) · Transcrições do cliente · Materiais complementares · Feeling anotado | `docs/Foundation.md` · Resumo validado pelo responsável |

#### Blocos de perguntas

- Na fase 1 deve ser perguntado qual o site atual do cliente como input
- Contexto do cliente — negócio, modelo, momento atual
- O problema — causa raiz, impacto mensurável, histórico de tentativas
- Requisitos — explícitos, implícitos, inegociáveis e contraditórios
- Restrições — prazo, orçamento, técnicas e organizacionais
- Stakeholders — quem decide, influencia e executa
- Concorrentes e referências — posicionamento e o que o cliente não quer

#### Critérios de bloqueio

- Problema sem impacto mensurável definido
- Requisitos contraditórios não resolvidos
- Público-alvo indefinido ou genérico demais para gerar Personas
- Restrição que torna o escopo inviável sem o cliente ter sido alertado
- Causa raiz não identificada — apenas sintomas descritos
- Stakeholder com poder de decisão não mapeado

#### Estrutura do `Foundation.md`

- Síntese executiva
- Problem Statement — causa raiz, impacto e histórico
- Requisitos — funcionais, não-funcionais, técnicos, inegociáveis
- Restrições — explícitas, implícitas e riscos identificados
- Stakeholders — mapa de autoridade e papel no projeto
- Concorrentes e referências visuais

---

### Fase 2 — UX Design `/ux1`

| Campo | Detalhes | Inputs | Outputs |
|-------|----------|--------|---------|
| **Documentos de Design** `/ux/design-documentation` | Repositório de referência vivo. Alimentado durante todo o projeto. | Documentos relacionados a design, artigos, referências, boas práticas, skills, etc. | `docs/ux/DesignDocumentation.md` |
| **Benchmarking** `/ux/benchmarking` | Analista de Mercado e UX. Mapeia concorrentes, padrões do segmento e oportunidades. | `docs/Foundation.md` · `docs/ux/DesignDocumentation.md` · Links de concorrentes · Imagens relacionadas à busca de mercado | `docs/ux/Benchmarking.md` |
| **Personas** `/ux/personas` | Pesquisador de UX. Define perfis com jornadas, dores e critérios de sucesso. | `docs/Foundation.md` · `docs/ux/DesignDocumentation.md` · `docs/ux/Benchmarking.md` | `docs/ux/Personas.md` |

#### Entregas

- Documentação organizada
- Benchmarking com 3–5 concorrentes
- Personas com mínimo 3 perfis completos

---

### Fase 3 — PRD `/prd`

| Campo | Detalhes | Inputs | Outputs |
|-------|----------|--------|---------|
| **PRD** `/prd` | Web Strategist / Information Architect. Define estrutura e objetivos. Mais próximo de um sitemap estratégico do que um PRD tradicional. | `docs/Foundation.md` · `docs/ux/DesignDocumentation.md` · `docs/ux/Benchmarking.md` · `docs/ux/Personas.md` | `docs/Prd.md` · Estrutura de páginas de alto nível + briefing |

#### Entregas

- Estrutura de páginas e objetivos de cada seção
- Fluxos de navegação e CTAs por página
- O que cada página precisa comunicar e converter
- Responsável pelo conteúdo (copywriter, cliente ou AI)
- Diretrizes de alto nível para Design e Desenvolvimento

#### Blocos de perguntas

- Contexto estratégico — objetivos do projeto, posicionamento como autoridade em soluções sob medida e IA, públicos-alvo (SMEs, grandes empresas, startups)
- KPIs de sucesso — principal indicador (leads qualificados) e métricas secundárias mensuráveis
- Serviços — mapeamento completo de todos os serviços e como cada um deve ser comunicado
- Estrutura de páginas de alto nível — páginas obrigatórias (Home, Serviços, 9 páginas de Produtos com templates adaptáveis, Cases, Sobre, Contato, Chat IA, Política de Privacidade, Landing Page) e margem de ±15%
- Fluxos de conversão — jornadas principais por persona, CTAs primários/secundários e integração do chat de estimativas
- Conteúdo — tom de voz (viés negócios + tecnologia, evitar "inovação" e "transformação digital"), planilha de keywords 2025 e responsável por copy
- Benchmarking — Ramotion, ITRex, Qubika, BRQ, weme e definição de filtros por indústria/startup
- Restrições e escopo — WordPress, 2 animações (máx. 5s), cronograma de 14 semanas, materiais existentes e comunicação via Slack

#### Critérios de bloqueio

- KPIs sem definição mensurável ou baseline
- Estrutura de páginas desalinhada com serviços ou personas
- Falta de clareza sobre responsável e tom de voz do conteúdo
- Ausência de CTAs e fluxos de conversão de alto nível
- Restrições de escopo ou cronograma inviáveis sem alerta ao cliente
- Benchmarking não analisado ou não incorporado

#### Estrutura do `PRD.md`

- Síntese executiva (BLUF) — objetivos estratégicos e KPIs principais
- Problem Statement — causa raiz do site atual e impacto de negócio
- Objetivos do site — lista priorizada e mensurável
- Estrutura de páginas de alto nível — lista com objetivo, o que comunicar, o que converter, CTA primário/secundário e responsável por conteúdo
- Fluxos de navegação (alto nível) — jornadas por persona e CTAs principais
- Diretrizes de alto nível para Design e Desenvolvimento — estilo visual, stack, integrações e SEO *(Desenvolvimento pode ser atualizado depois)*
- Responsabilidades de conteúdo — tom, keywords e fluxo de aprovação
- Métricas de sucesso e monitoramento
- Riscos, dependências e próximos passos
- Apêndice — links para Foundation, Benchmarking, Personas e materiais do cliente

---

### Fase 4 — UX Design `/ux2`

| Campo | Detalhes | Inputs | Outputs |
|-------|----------|--------|---------|
| **Moodboard** `/ux/moodboard` | Creative Director. Exige referências concretas para cada escolha. | `docs/Foundation.md` · `docs/ux/DesignDocumentation.md` · Imagens e screenshots | `docs/ux/Moodboard.md` |
| **Sitemap** `/ux/sitemap` | Information Architect. Organiza a estrutura de páginas, hierarquia de conteúdo e fluxos de navegação. | `docs/Foundation.md` · `docs/ux/DesignDocumentation.md` · `docs/ux/Benchmarking.md` · `docs/Personas.md` · `docs/Prd.md` | `docs/ux/Sitemap.md` |
| **Copywriting** `/ux/copywriter` | Repositório vivo de referência com documentação relacionada a boas práticas de copywriting e skills. | `docs/Foundation.md` · `docs/ux/DesignDocumentation.md` · `docs/ux/Benchmarking.md` · `docs/Personas.md` · `docs/ux/Sitemap.md` · `docs/Prd.md` | `docs/ux/Copywriter.md` |
| **Conversão** `/ux/conversao` | Estrategista de CRO. Define estratégia de conversão, CTAs e fluxos por persona antes do UI. | `docs/Foundation.md` · `docs/ux/DesignDocumentation.md` · `docs/ux/Benchmarking.md` · `docs/Personas.md` · `docs/ux/Sitemap.md` · `docs/ux/Copywriter.md` · `docs/Prd.md` | `docs/ux/Conversao.md` |

#### Entregas

- *(TBD)*

---

### Fase 5 — UI Design `/ui`

| Campo | Detalhes | Inputs | Outputs |
|-------|----------|--------|---------|
| **Conceito Visual** `/ui/concept` | Traduz a pesquisa e diretrizes anteriores em conceitos visuais concretos: grid, hierarquia tipográfica, paleta definitiva. Design System inicia aqui com tokens e fundações. | `docs/ux/Moodboard.md` · `docs/ux/DesignDocumentation.md` · `docs/ux/Sitemap.md` · `docs/ux/Copywriter.md` · `docs/ui/design-system/Components.md` · `docs/ux/Conversao.md` · `docs/Prd.md` | `docs/ui/Concept.md` · `docs/ui/design-system/Components.md` |
| **UI Design** `/ui/ui-design` | UI Designer. Produz as telas finais de todas as páginas seguindo o concept aprovado e o PRD. Design System cresce com cada tela produzida. | `docs/ui/Concept.md` · `docs/ui/design-system/Components.md` · `docs/ux/Conversao.md` · `docs/Personas.md` · `docs/Prd.md` | `docs/ui/UiDesign.md` · `docs/ui/design-system/Components.md` |
| **Design System** `/ui/design-system` | Markdown iniciado na fase de concept e consolidado ao fim do UiDesign.md. Cores, tipografia, botões, inputs e componentes principais. | `docs/ui/Concept.md` · `docs/ui/UiDesign.md` | `docs/ui/design-system/Components.md` |
| **Teste de Usabilidade** `/ui/usability-test` | Agentes de persona + revisor. Testa o design final simulando as jornadas críticas de cada perfil. | `docs/ui/UiDesign.md` · `docs/ux/Personas.md` | `docs/ui/usability-test/Review.md` |

#### Entregas

- *(TBD)*

---

### Fase 6 — Desenvolvimento `/dev`

| Campo | Detalhes | Inputs | Outputs |
|-------|----------|--------|---------|
| **Desenvolvimento** `/dev` | Tech Lead. Avalia viabilidade técnica e não deixa passar requisito vago que gera retrabalho. | `docs/Prd.md` · `docs/ui/Concept.md` · UI Concepts aprovados | `docs/Dev.md` |

#### Escopo técnico

- Stack, CMS ou site estático
- Estrutura de URLs e SEO técnico
- Performance, hospedagem e integrações
- AI gera o código seguindo fielmente o design aprovado
- Cada bloco revisado pelo humano antes de avançar

---

### Fase 7 — QA `/qa`

| Campo | Detalhes | Inputs | Outputs |
|-------|----------|--------|---------|
| **QA / Testes** `/qa` | QA Engineer Sênior. Parte do pressuposto que tudo pode falhar. Não aprova sem critério de aceite claro. | `docs/Prd.md` · `docs/Dev.md` | `docs/Qa.md` · Checklist de aceite |

#### Cobertura

- Links e navegação
- Responsividade em todos os breakpoints
- Velocidade e performance (Core Web Vitals)
- Formulários e conversões
- Analytics e rastreamento
- SEO on-page e acessibilidade

---

### Fase 8 — Deploy `/deploy`

| Campo | Detalhes | Inputs | Outputs |
|-------|----------|--------|---------|
| **Deploy / Lançamento** `/deploy` | DevOps / Release Manager. Não deixa nada ir para produção sem checklist completo e plano de rollback definido. | Todos os docs anteriores (Fases 1–7) | `docs/Deploy.md` · Checklist de lançamento |

#### Cobertura

- DNS, SSL e redirecionamentos
- Monitoramento pós-lançamento
- Plano de rollback
- Comunicação de lançamento

---

## Modelo AI Assistida por Humano

O sistema segue um modelo consultivo — a AI nunca age de forma autônoma. O humano decide em todos os momentos críticos; a AI executa a partir do que foi aprovado.

### Design

- Skill conduz o processo de direção criativa com o Creative Director humano
- Humano aprova moodboard, paleta, tipografia e conceito
- Skill pergunta qual ferramenta usar para geração (Figma, Framer, Webflow, Midjourney, Flux)
- AI gera seguindo exatamente o que foi decidido — sem criatividade própria nessa etapa

### Desenvolvimento

- Skill lê PRD + Design aprovado
- Tech Lead humano define stack, CMS, hospedagem e restrições
- AI gera o código seguindo fielmente o design aprovado
- Cada bloco revisado antes de avançar

---

## Sistema de Logs e Documentação

Toda ação relevante é registrada automaticamente via hooks do Claude Code.

| Arquivo | O que registra | Gerado por | Atualizado quando |
|---------|---------------|------------|-------------------|
| `docs/logs/changelog.md` | Ações, arquivos criados/editados, timestamps | Hooks automáticos (PostToolUse, Stop) | A cada ação do Claude Code |
| `docs/logs/decisions.md` | Decisões validadas, alternativas descartadas, riscos resolvidos | Skills ao final de cada fase | Ao gerar cada doc de fase |
| `docs/logs/tokens.md` | Tokens gastos por fase, custo estimado, modelo usado | Hook Stop + scripts de custo | Ao final de cada sessão |
| `docs/logs/prompts.md` | Prompts usados em geração por AI, iterações realizadas | Skills de Design e Dev | Quando AI gera um entregável |

### Como funciona tecnicamente

**Hooks no Claude Code** — configurados em `.claude/settings.json`, disparam scripts Python nos eventos `PostToolUse` e `Stop`. Esses scripts escrevem automaticamente no changelog e no arquivo de tokens.

**Skills com instrução de log** — cada skill, ao gerar seu documento de fase, também registra uma entrada no `decisions.md` com o resumo do que foi decidido, quem decidiu, alternativas descartadas e riscos resolvidos.

**CLAUDE.md** — instrui o Claude a registrar no log quando tomar decisões relevantes fora de uma skill — como uma conversa avulsa que resulta em mudança de direção.

---

## Controle de Tokens e Custo

O hook `Stop` captura automaticamente o uso de tokens de cada sessão e registra em `docs/logs/tokens.md`.

### Exemplo de registro

| Data | Fase | Responsável | Input tokens | Output tokens | Custo est. |
|------|------|-------------|-------------|---------------|------------|
| 2026-03-28 | Discovery | Ana | 12.400 | 3.200 | $0.04 |
| 2026-03-28 | Insights | Carlos | 18.700 | 5.100 | $0.07 |

### Camadas de rastreamento

- Tokens do Claude Code — orquestração, leitura de docs e tomada de decisão
- Tokens de APIs externas — quando outro modelo é usado para geração de código ou texto
- Custo de APIs de imagem — cobrado por imagem gerada, linha separada no log
- Iterações — quantas tentativas até o resultado aprovado pelo humano

### Registro de prompts

Quando a AI gera um entregável (design ou código), o prompt usado é registrado em `docs/logs/prompts.md` junto com o número de iterações. Isso permite ajustar prompts nas próximas fases sem repetir erros.

---

## Estrutura de Arquivos do Projeto

```
.claude/
  ProjectGuidelines.md        ← este arquivo (framework base)
  settings.json               ← hooks automáticos
  scripts/
    log_changes.py            ← hook PostToolUse
    log_tokens.py             ← hook Stop
  skills/
    Foundation.md             ← Fase 1 — Foundation
    ux1/
      DesignDocumentation.md  ← Documentos de Design (repositório vivo)
      Benchmarking.md         ← Benchmarking
      Personas.md             ← Personas
    Prd.md                    ← Fase 3 — PRD
    ux2/
      Moodboard.md            ← Moodboard
      Sitemap.md              ← Sitemap
      Copywriter.md           ← Copywriting
      Conversao.md            ← Conversão / CRO
    ui/
      Concept.md              ← Conceito Visual
      UiDesign.md             ← UI Design
      DesignSystem.md         ← Design System
      Usability-test.md       ← Teste de Usabilidade
    Dev.md                    ← Desenvolvimento
    Qa.md                     ← QA / Testes
    Deploy.md                 ← Deploy

docs/
  inputs/                     ← PDFs e materiais do cliente
  ux/
    DesignDocumentation.md    ← Repositório vivo de referências
    Benchmarking.md
    Personas.md
    Moodboard.md
    Sitemap.md
    Copywriter.md
    Conversao.md              ← Estratégia de conversão / CRO
  Prd.md                      ← Documento principal da Fase 3
  ui/
    Concept.md
    UiDesign.md
    design-system/
      Components.md           ← Tokens, cores, tipografia, componentes
    usability-test/
      Review.md               ← Resultados do teste de usabilidade
  logs/
    changelog.md              ← Ações automáticas (hooks)
    decisions.md              ← Decisões validadas por fase
    tokens.md                 ← Custo e tokens por sessão
    prompts.md                ← Prompts usados em gerações AI
  design/
    moodboards/               ← 3 direções criativas (se aplicável)
```
