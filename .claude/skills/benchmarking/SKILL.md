---
name: ux-benchmarking
description: Executa análise competitiva completa para projetos de UX/design, gerando um Benchmarking.md com pesquisa real de concorrentes, matriz competitiva, SWOT, gaps de mercado, ameaças e recomendações estratégicas. Use esta skill sempre que o projeto estiver na fase de UX e precisar de benchmarking competitivo, análise de concorrentes, referências visuais de mercado, ou posicionamento estratégico antes do moodboard. Deve ser usada antes da fase de Moodboard e Personas em qualquer tipo de projeto digital — site institucional, aplicativo, plataforma, e-commerce, SaaS, produto ou serviço.
---

# UX Benchmarking — Análise Competitiva

Skill para geração do `Benchmarking.md` em projetos de UX/design de qualquer tipo — sites institucionais, aplicativos, plataformas, e-commerce, SaaS, produtos ou serviços. Pesquisa concorrentes reais, analisa posicionamento, identidade visual, navegação, CTAs e público-alvo, e sintetiza insights estratégicos para o projeto.

---

## Quando usar esta skill

- Fase UX do projeto, após Foundation e antes de Moodboard
- Sempre que o projeto precisar de referências competitivas para embasar decisões de design
- Quando o cliente perguntar "como os concorrentes fazem?" ou "quem são as referências do mercado?"

---

## Configuração por Projeto

Antes de iniciar, confirmar com o responsável:

| Parâmetro | Padrão | Configurável |
|---|---|---|
| Concorrentes nacionais | 3 | Sim |
| Concorrentes internacionais | 3 | Sim |
| Total de organizações | 6 | Sim (máx. recomendado: 10) |
| Método de pesquisa | Web search | Sim (Chrome como alternativa) |

**Para alterar:** o responsável define o número e os nomes dos concorrentes antes de iniciar. Se não definir, a skill identifica os mais relevantes automaticamente.

---

## Fluxo de Trabalho

### Passo 1 — Contexto do Projeto

Ler o `Foundation.md` do projeto antes de qualquer pesquisa. Extrair:

- Nome e descrição da organização/produto
- Setor e vertical de atuação
- Localização geográfica e praça de atuação
- Públicos-alvo identificados
- Programas, produtos ou serviços oferecidos
- Diferencial declarado pelo cliente

Se o documento não existir, perguntar ao responsável os itens acima antes de avançar.

---

### Passo 2 — Identificação dos Concorrentes

Se os concorrentes não foram definidos pelo responsável, executar:

**Queries de busca:**
- `"[setor] [cidade/região] [tipo de produto: app / plataforma / serviço / instituto / hub]"`
- `"[produto/serviço] concorrentes Brasil"`
- `"[produto/serviço] competitors [país/região internacional]"`
- `"alternativas a [nome da organização ou produto]"`
- `"[categoria do produto] referências de design UX"`

**Critérios de seleção:**
- Site institucional com conteúdo real acessível
- Posicionamento claro e comunicação estruturada
- Sobreposição de público-alvo com o projeto atual
- Presença relevante no mercado (nacional ou internacional)

Apresentar lista de candidatos ao responsável e aguardar confirmação antes de avançar.

---

### Passo 3 — Pesquisa por Organização

Para cada organização confirmada, pesquisar e documentar:

#### 3a. Posicionamento e Mensagem
- Headline e tagline da home
- Tom de comunicação (formal / inspirador / técnico / acessível)
- Narrativa central da organização
- Como descrevem impacto (números, cases, depoimentos)

#### 3b. Identidade Visual e Estilo
- Paleta de cores predominante (hex se identificável)
- Estilo geral (minimalista / vibrante / institucional / editorial / moderno)
- Uso de tipografia (bold / clean / serifada)
- Uso de imagens (fotos reais / ilustrações / ícones / espaço físico)

#### 3c. Estrutura e Navegação
- Itens do menu principal
- Segmentação por perfil de visitante (se existir)
- Fluxo principal de navegação (home → ? → conversão)

#### 3d. CTAs e Conversão
- CTAs principais (texto exato)
- Estratégia de captação (inscrição / contato / associação / conteúdo)
- Pontos de contato identificados

#### 3e. Público-Alvo
- Para quais públicos comunicam claramente
- Como diferenciam a comunicação por perfil

#### 3f. Pontos de Melhoria
- Fraquezas ou oportunidades identificadas no site analisado

#### 3g. Relação com o Projeto Atual
- O que o projeto pode aprender ou se inspirar
- O que deve evitar
- Onde pode se diferenciar

#### 3h. Nível de Ameaça
- Alta / Média / Baixa — com justificativa de 1 frase

---

### Passo 4 — Método de Pesquisa

**Método padrão — Web Search:**
```
Buscar: "[nome da organização] site institucional"
Acessar a URL oficial via web_fetch
Extrair conteúdo das páginas: home, sobre, programas/produtos, contato
```

**Método alternativo — Chrome (quando disponível e autorizado):**
```
Navegar diretamente para a URL via browser
Usar get_page_text ou javascript_exec para extrair conteúdo
Navegar para sub-páginas relevantes se necessário
```

**Fallback:** Se o site não estiver acessível, registrar no documento como "Site inacessível — dados obtidos via busca secundária" e usar resultados de search para preencher as categorias com menor confiança.

---

### Passo 5 — Síntese e Geração do Documento

Após pesquisar todas as organizações, gerar o `Benchmarking.md` com a estrutura abaixo.

**Nomenclatura do arquivo:** `docs/ux/Benchmarking.md`

---

## Estrutura do Benchmarking.md

```markdown
# Benchmarking — Análise Competitiva
**Projeto:** [Nome do projeto]
**Fase:** UX / Benchmarking
**Metodologia:** Web search + framework ux-benchmarking
**Data:** [Data de geração]
**Responsável:** _(preencher)_
**Status:** Gerado por AI — validação humana necessária antes de avançar para Moodboard

---

## Sumário Executivo
[2-3 parágrafos com: panorama competitivo, principais ameaças, principal oportunidade]

---

## Perfil do Cliente-Alvo
[Segmentos primários com: perfil, localização, dor atual]

---

## Matriz Competitiva
[Tabela comparando todos os players nas dimensões:
Posicionamento / Público principal / Modelo de negócio / Ancoragem territorial /
Programa gov/políticas / Segmentação por perfil no site / CTA principal]

---

## Análise por Organização
[Para cada organização: seções 3a a 3h]

---

## Gaps e Oportunidades de Mercado
### Segmentos Subatendidos
### Gaps de Comunicação/Funcionalidade
### Gaps de Posicionamento

---

## Análise SWOT — [Nome do Projeto]
### Forças
### Fraquezas
### Oportunidades
### Moats e Defensabilidade

---

## Ameaças e Mitigação
### Curto Prazo (0–12 meses)
### Médio/Longo Prazo (12+ meses)

---

## Recomendações Estratégicas para o Produto
[Mínimo 3, máximo 6. Cada uma acionável e vinculada a um achado da pesquisa]

---

## Validação Humana
- [ ] Os concorrentes escolhidos são os mais relevantes?
- [ ] Existem players não mapeados que deveriam entrar?
- [ ] As recomendações estão alinhadas com a visão do projeto?
- [ ] Os dados de impacto do projeto foram coletados para completar a matriz?

**Validado por:** _____________________ **Data:** ___________

---

## Fontes
[Lista numerada com: nome da organização — URL — data de acesso]
```

---

## Regras Obrigatórias

- **Nunca avançar sem o `Foundation.md` lido.** Se não existir, coletar contexto do responsável antes de pesquisar.
- **Confirmar lista de concorrentes com o responsável** antes de iniciar a pesquisa — não definir sozinho sem validação.
- **Toda afirmação factual deve ter fonte identificável.** Se não foi possível verificar, registrar: "Não verificável via fontes públicas."
- **Nível de ameaça é obrigatório** para cada organização analisada.
- **Recomendações devem ser acionáveis** — sem genéricos como "melhorar a comunicação". Devem referenciar um achado específico da pesquisa.
- **Documento gerado com status "Gerado por AI"** — só muda para "Validado" quando o responsável assinar.
- **Não avançar para Moodboard sem validação humana registrada no documento.**

---

## Registro no decisions.md

Ao finalizar o documento, registrar em `docs/logs/decisions.md`:

```
## Benchmarking — [Data]
**Decisão:** [N] organizações analisadas: [lista de nomes]
**Quem decidiu:** [Responsável]
**Principais achados:** [2-3 bullets com os insights mais relevantes]
**Recomendação principal:** [A recomendação #1 para o site]
**Status:** Validado por [Nome] em [Data]
```

---

## Referências

Esta skill incorpora o framework da skill `business-competitor-analysis` (kenneth-liao/ai-launchpad-marketplace) adaptado para projetos de UX/design de qualquer tipo — com foco em posicionamento, identidade visual e arquitetura de informação.

Para análise competitiva mais profunda de modelo de negócio (funding, pricing, tamanho de empresa), consultar a skill original em `skills.sh/kenneth-liao/ai-launchpad-marketplace/business-competitor-analysis`.
