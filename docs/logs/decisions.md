# Decision Log

Register of key architectural, design, and product decisions made throughout the project.

| Date | Decision | Rationale | Alternatives Considered |
|------|----------|-----------|------------------------|

---

## Mudança de Stack: Next.js 15 + Tailwind CSS v4
**Data:** 2026-04-07
**Responsável:** João Felipe (Dev)

### Decisão
Migração de React 19 + Vite para **Next.js 15.3+ (App Router) + Tailwind CSS v4**, substituindo também o stack anterior planejado de WordPress + Figma para produção front-end.

### Rationale
- App Router do Next.js 15 serve nativamente a arquitetura hub-and-spoke definida no Sitemap (roteamento por pasta, layouts compartilhados, metadata por rota)
- Server Components e Static Generation adequados ao perfil de conteúdo do site (páginas de programa, hub de conteúdo)
- Tailwind v4 (CSS-first, `@theme`) elimina arquivo de configuração separado e alinha com os design tokens já definidos em CSS variables
- API Routes nativas para formulários de inscrição e contato (sem backend separado)
- TypeScript habilitado desde o início para DX e segurança de tipos nas props de rotas dinâmicas

### Estrutura de rotas criada
- `/` — Home
- `/programas` — Vitrine de programas
- `/programas/[slug]` — Página individual de programa (dinâmica)
- `/solucoes` — Soluções
- `/conteudo` — Hub de conteúdo
- `/fale-conosco` — Contato

### Alternativas descartadas
- WordPress: descartado por complexidade de deploy, manutenção e ausência de desenvolvedor WordPress definido
- Vite + React SPA: descartado por ausência de roteamento nativo, SSG/SSR e SEO out-of-the-box

---

## Fase: Foundation
**Data:** 2026-04-02
**Responsável:** João Felipe (PM)

### Decisões tomadas
- Causa raiz definida: arquitetura por estrutura interna em vez de por público, agravada por transição de marca incompleta (Unitech → Inaitec)
- Arquitetura hub-and-spoke validada como solução para "falar com todo mundo" sem perder clareza de jornada
- Inegociáveis: comunicação com todas as personas (startups, empresas, investidores, governo) e visibilidade de todos os programas
- KPIs e metas mensuráveis adiados para a fase de PRD (sem baseline de métricas no site atual)
- Versões EN/ES no escopo, dependentes de tradução fornecida pelo cliente
- Stack confirmado: WordPress + Figma
- Prazo: ~15/07/2026 (kick-off 25/03/2026 + 16 semanas)
- Aprovador único: Diego Chierighini

### Alternativas descartadas
- Definir KPIs na Foundation — descartado por ausência de dados históricos do site atual
- Versões EN/ES fora do escopo — descartado; cliente confirmou que fazem parte da entrega

### Critérios de bloqueio encontrados
- Nenhum critério de bloqueio identificado

### Pendências registradas
- Referências visuais positivas e negativas do cliente não coletadas — gap a resolver antes de iniciar o design
- Desenvolvedor WordPress ainda não definido
- Hospedagem e integrações a definir na fase de arquitetura técnica

---

## Fase: PRD
**Data:** 2026-04-02
**Responsável:** João Felipe (PM)

### Decisões tomadas
- 14 Functional Requirements definidos com critério de aceite mensurável por persona
- Prioridade P0: navegação segmentada (FR-001), home hub (FR-002), status de inscrição em programas (FR-003), formulários rastreados (FR-010), responsividade mobile (FR-011)
- Vitrine de investidores (FR-005) e jornada governo (FR-006) classificadas como P1 — necessárias para conversão mas sem bloqueio de go-live
- Versões EN/ES explicitamente fora do escopo v1 — lançar apenas em PT; estrutura preparada para multilingue
- Baseline de métricas inexistente — decisão: instrumentar Analytics no go-live para criar baseline a partir do lançamento
- Definição de desenvolvedor WordPress classificada como bloqueador do Marco 5 — prazo: até fim do Marco 3

### Alternativas descartadas
- Jornadas Investidor e Governo como subseções de Empresas — descartado pelo risco de invisibilidade (André e Carlos não se identificam com "Empresas")
- Protótipo clicável — fora do escopo do SoW; não contemplado

### Pendências para próxima fase (Sitemap)
- ~~Confirmar com Diego se Investidor e Governo são páginas próprias ou seções~~ → **Resolvido:** são seções no bloco de 4 colunas da Home (evidência: "Revisão site.docx.pdf" p.2/19 + transcrição de imersão)
- ~~Confirmar lista definitiva de 9 programas~~ → **Resolvido:** todos os 9 confirmados ativos
- Coletar referências visuais do cliente antes do início do design

### Revisões pós-PRD v1.0 (PRD v1.1)
- Investidores e Governo removidos como páginas dedicadas — servidos por bloco de 4 colunas na Home (FR-002 atualizado)
- Vitrine de Programas adicionada como página própria (FR-005)
- Blog + Comunicação unificados em Hub de Conteúdo com filtros (FR-006); FR-007 a FR-013 renumerados

---

## Página oculta `/design-system` como referência viva
**Data:** 2026-05-05
**Responsável:** Robson (Atom6 Studio)

### Decisão
Criada rota `/design-system` (não linkada na navegação pública) servindo como manual de marca interativo. Arquitetura inspirada em `lp.atomsixstudio.com/design-system`, mas **100% derivada dos tokens já existentes em `src/app/globals.css`** — não introduz tokens novos, apenas documenta e demonstra os existentes.

### Rationale
- Fonte única de verdade para devs e designers consultarem cores, tipografia, padrões de botão/eyebrow/card já em uso no site
- Componentes vivos (toggles, modais, dropdowns funcionais) garantem que a documentação não diverge do código
- `LayoutShell` introduzido em `src/components/LayoutShell.tsx` permite ocultar Header/Footer apenas nesta rota sem afetar o restante do site

### Cobertura
Cores (marca, superfícies, texto), Tipografia (Plus Jakarta + Campton + escala), Espaçamento, Radius, Sombras, Botões (dark/light/tamanhos/disabled), Badges, Eyebrows, Cards, Inputs (estados válido/erro), Checkboxes, Toggles, Tabs, Dropdowns, Toasts, Alertas, Modais, Dividers.

### Próximo passo sugerido
Refatorar componentes existentes para consumir variáveis CSS (`var(--color-brand-orange)`) em vez de hard-code `#FA8400`, usando esta página como contrato visual.

---

## Padronização visual do Acelera Pedra Branca
**Data:** 2026-05-11
**Responsável:** Codex (Cursor)

### Decisão
Definida `public/acelera-pedrabranca.jpg` como imagem oficial do programa Acelera Pedra Branca e aplicada nos pontos de destaque do site (home, cards de programa/chamada e conteúdo relacionado).

### Rationale
- Garante consistência visual do programa em todas as jornadas principais (Home, Programas e Conteúdo)
- Evita divergência de identidade ao usar imagens genéricas diferentes para o mesmo programa
- Centraliza a referência no dataset de programas (`src/data/programas.ts`), propagando para página individual e catálogo

### Alternativas descartadas
- Manter imagens diferentes por contexto (home/chamadas/página interna) — descartado por quebrar consistência de marca do programa

---

## Entrada para área de login no header
**Data:** 2026-05-11
**Responsável:** Codex (Cursor)

### Decisão
Adicionado botão `Fazer login` no header (desktop e mobile), direcionando para a nova rota `/login`, com interface de área restrita inspirada em layout split-screen.

### Rationale
- Torna o acesso à área restrita explícito na navegação principal sem competir com o CTA de contato
- Mantém os campos obrigatórios de autenticação solicitados (`Perfil`, `E-mail`, `Senha`, botão `Acessar`)
- Reaproveita linguagem visual do site com acabamento premium inspirado na referência enviada

### Alternativas descartadas
- Incluir login como item de menu simples (sem destaque visual) — descartado por reduzir visibilidade da entrada

---

## Página de login alinhada ao Design System
**Data:** 2026-05-11
**Responsável:** Claude (Cursor)

### Decisão
Componentes da rota `/login` reescritos para seguir os tokens e padrões definidos em `src/app/design-system/page.tsx`: tipografia (`font-semibold` em h1/h2, escala `text-5xl/sm:text-6xl` e `text-3xl/md:text-4xl`), labels uppercase com `tracking-[0.2em] text-white/60`, inputs/select com `border-white/15 bg-white/[0.04]` e foco `bg-white/[0.06]` + `border-[#FA8400]`, botão disabled em `bg-white/10 text-white/40`, eyebrow padronizado com linha `w-8`.

### Rationale
- Mantém a página de login como vitrine consistente da identidade visual, sem variações ad-hoc de pesos/cores
- Reduz dívida visual antes da próxima onda de refactor (consolidação de hard-codes em CSS variables)
- Reforça o Design System como contrato visual — qualquer componente novo deve referenciar `/design-system`

### Alternativas descartadas
- Manter botão primário desabilitado em laranja translúcido — descartado por divergir do padrão "primary disabled" do DS (cinza translúcido)

---

## Componente Dropdown unificado seguindo o Design System
**Data:** 2026-05-11
**Responsável:** Claude (Cursor)

### Decisão
Criado `src/components/Dropdown.tsx` como componente reutilizável que implementa o padrão de Dropdown do `/design-system` (botão custom + popover, sem `<select>` nativo). Substituído o `<select>` da página de login (`/login`) pelo novo componente. Integração com `<form>` mantida via `<input type="hidden">` interno, preservando submit nativo.

### Rationale
- O `<select>` nativo não permite estilizar o chevron/lista com o padrão visual do DS (cores, hover, item selecionado em laranja)
- Centraliza o padrão visual de dropdown em um único componente — qualquer rota futura usa `<Dropdown>` em vez de reinventar
- Fecha automaticamente em clique fora e tecla ESC (UX padrão)
- Acessibilidade básica: `aria-haspopup`, `aria-expanded`, `role="listbox"`, `aria-selected`

### Alternativas descartadas
- Estilizar `<select>` nativo via `appearance-none` + SVG de fundo — descartado porque o `<option>` não pode ser estilizado (background, hover, cor) para casar com o DS
- Replicar inline em cada formulário — descartado por gerar duplicação e dívida visual

---

## Arquitetura "Chamadas em destaque" — hero + carrossel lateral
**Data:** 2026-05-12
**Responsável:** Claude (Cursor)

### Decisão
A subseção "Inscrições abertas" da Home foi refatorada para um modelo **1 hero + carrossel de compactos**: a chamada com menor `deadline` vira card hero (imagem + countdown completo + CTA), e as demais (até 4) viram cards compactos sem imagem em scroll-snap horizontal com setas prev/next. Dados puxados de `PROGRAMAS` (`status: 'aberta'`, ordenado por deadline). Novo componente: `src/components/ChamadasAbertasDestaque.tsx`. Bloco inline anterior em `InaitecWebsite.tsx` substituído.

### Rationale
- O modelo anterior (2 cards full-width empilhados, ~420px cada) não escala para 5 chamadas — gastaria ~2.100px de eixo Y só nessa subseção
- Hierarquia clara: a chamada mais urgente recebe destaque visual (imagem + countdown segmentado), as demais ficam densas e comparáveis lado a lado
- Cards secundários sem imagem priorizam o countdown ("Restam X dias") como elemento ativo da seção, com cor de público como único acento visual
- Dados deixam de ser hardcoded e seguem `PROGRAMAS` — consistente com a página `/chamadas` e elimina links quebrados (`/chamadas/acelera-startups` apontava pra rota inexistente)
- Setas de navegação ficam sempre visíveis mas desabilitam quando não há overflow (no `xl`, os 4 cards cabem; abaixo, o scroll é acionado)

### Alternativas descartadas
- **Grid uniforme 5 colunas** — perdia a sensação de "chamada principal" e o countdown ficava espremido em cada card
- **Carrossel 3-por-vez com cards ricos (com imagem)** — preservava fidelidade visual mas exigia interação para ver todas e mantinha a imagem competindo com o countdown
- **Lista vertical compacta** — densidade boa, mas perdia totalmente o impacto visual do countdown grande

---

## Correção i18n — Programas e Empresas (conteúdo EN/ES)

**Contexto:** versões EN/ES de `programa` e a coleção `empresa` exibiam conteúdo em português. O conteúdo do Sanity deve vir já traduzido (i18n só cuida de labels estruturais).

**Programas (já tinham i18n):** preenchidas as traduções EN/ES dos 17 programas — `name`/`desc` dos 16 simples + conteúdo rico completo do Acelera Pedra Branca (oQueE, benefícios, etapas, stats, quickFacts, FAQ, 15 cases com quotes/cargos/setores/métricas). Slug mantido igual nas 3 línguas. 34 docs publicados.

**Empresas (não tinham i18n — montada a infra):**
- Schema `empresa.ts`: adicionado campo `language` (oculto) + `isUnique` de slug por idioma.
- `sanity.config.ts`: `empresa` adicionado a `i18nSchemaTypes`. `structure.ts`: lista filtrada por `language=='pt'`. Schema redeployado.
- Criadas versões EN/ES dos 18 docs (IDs `<ptId>__i18n_<lang>`) + `translation.metadata`, via `scripts/i18n-empresas.ts` (o MCP não escreve campo oculto `language`).
- Traduzidos: `desc`, `longDesc`, `status`, `fundador.titulo`, `investimento.rodada`.
- **Mantidos idênticos nas 3 línguas:** `setor` e `estagio` — são chaves de filtro comparadas contra listas hardcoded em `CatalogoSection.tsx` (e `ESTAGIO_STATUS_COLOR`). Traduzi-las quebraria filtros e cores. Consequência conhecida: o badge/label "Estágio" mostra "Corporação" também em EN/ES. Refino futuro: i18n no componente (key→label) se o cliente quiser.
- `empresasQuery`/`getEmpresas` passam a filtrar por `language == $locale`; `empresas-instaladas/page.tsx` passa o locale.

---

## Migração de Notícias — site antigo → Sanity (coleção `post`)

**Contexto:** o Portal de Conteúdo (`/conteudo`) usava 14 notícias mockadas em `src/data/conteudo.ts`. As notícias reais estavam só no site antigo (`inaitec.com.br/noticias` — CMS PHP custom, sem API). Migradas via scraping da parte pública.

**Schema:** criada coleção `post` (`src/sanity/schemas/post.ts`) com i18n (`document-internationalization`, PT padrão + Translations EN/ES). Campo `body` em **Portable Text rico** — cliente edita H1–H4, negrito, itálico, sublinhado, listas, citação, links e imagens inline no Studio. Campos: title, slug, category (default "Notícias"), mainImage, publishedAt, excerpt, author (string opcional), featured, body, legacyId, legacyUrl. Registrado em `schemas/index.ts`, `sanity.config.ts` (i18n) e `structure.ts` (coleção "Notícias", lista PT).

**Script:** `scripts/migrate-noticias.ts` (+ `scripts/README-noticias.md`). Scraping educado (delay 1s + retry/backoff), HTML→Portable Text via `@sanity/block-tools`+`jsdom`, upload de assets com dedup por URL, `createOrReplace` com `_id` estável `noticia-{id}` (idempotente), modo `--dry-run`/`--only`/`--limit`. Seletores validados no HTML cru: título via `og:title`, capa = 1ª `img[alt="blog-post-image"]`, data = `dd/mm/aaaa` (h2 após capa), corpo recortado entre a capa e `.blog-section.division` (relacionados descartados). Byline "por <Nome>" → campo `author` (removido do corpo); título duplicado no 1º parágrafo removido.

**Resultado:** 58 documentos PT importados (IDs `noticia-88`..`noticia-186`), todos com capa + corpo; 9 com autor; destaque = `noticia-186` (mais recente). 58 `translation.metadata` criados. Artigos da fonte não têm imagens inline (só capa).

**Frontend religado ao Sanity:** `conteudo/page.tsx` (server, `getPosts`) → `ConteudoHub` (props); `conteudo/[slug]/page.tsx` (server, `getPost` + relacionados) renderiza o corpo com `src/components/PortableTextRenderer.tsx`. Queries em `src/sanity/queries/posts.ts`. **Removidos:** `src/data/conteudo.ts` (mock) e a rota `/conteudo/autor/[slug]` (autor virou string simples, sem foto/bio). Build OK (215 páginas).

**Pendente (opcional):** a seção de notícias da Home (`src/components/home/NoticiasSection.tsx`) ainda usa itens fixos do `messages/*.json` — não foi religada ao Sanity nesta etapa.
