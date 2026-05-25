# Inaitec — Redesign de Site
## Documento consolidado de decisões, estado atual, design, direcionamentos do cliente e estratégia

**Projeto:** Inaitec — Instituto de Inovação do Ecossistema Pedra Branca
**Versão consolidada:** 2026-05-13
**Responsável pela consolidação:** Atom6 Studio
**Status:** Snapshot único de tudo o que foi decidido e implementado até a data de hoje.

> Documento gerado a partir de: [Foundation.md](pm/Foundation.md), [Prd.md](pm/Prd.md), [Benchmarking.md](ux/Benchmarking.md), [Personas.md](ux/Personas.md), [Sitemap.md](ux/Sitemap.md), [decisions.md](logs/decisions.md), [concept-spec.md](logs/concept-spec.md), [design-tokens.md](logs/design-tokens.md) e dos PDFs do cliente em [docs/inputs/](inputs/).

---

## 1. Visão Geral e Posicionamento

### 1.1 O que é o Inaitec
Hub privado sem fins lucrativos que governa o **Parque Tecnológico Pedra Branca** (Palhoça/SC) — um dos projetos de cidade inteligente mais avançados do Brasil, com 15 anos de operação, +300 startups aceleradas, R$3,5 Bi de faturamento gerado no ecossistema e 1,7M m² construídos.

### 1.2 Proposta de valor central (definida no PRD v1.1)
> *"O Inaitec não é só uma aceleradora. É o único lugar do Brasil onde uma startup, uma indústria, um investidor e uma prefeitura compartilham o mesmo ecossistema físico — uma cidade inteligente real, em operação, em Pedra Branca. O novo site existe para que cada um desses públicos entenda, em segundos, o que esse ecossistema tem para oferecer a ele."*

### 1.3 Três diferenciais que o site precisa comunicar
| Diferencial | Prova | Onde aparece |
|---|---|---|
| Escala de impacto comprovada | +300 startups, R$3,5 Bi no ecossistema, 15 anos | Home, Sobre |
| Ecossistema físico único | Parque Pedra Branca como cidade inteligente em operação | Home hero, Cidade Inteligente |
| Alcance internacional ativo | Missões internacionais 2025, Globaliza Inaitec | Home números, Programa de Internacionalização |

---

## 2. Diagnóstico e Causa-raiz

### 2.1 Por que o site atual falha
- **Arquitetura de informação por estrutura interna** (áreas, departamentos, programas soltos) em vez de **por valor para cada público**.
- Transição de marca **Unitech → Inaitec** incompleta; visual atual desviou do manual de marca vigente.
- Conquistas recentes (missões 2025, premiações) **não estão visíveis**.
- **~5.000 visitas em 2 meses** (2025) — tráfego existe, falta conversão e clareza de jornada.

> Voz do cliente (Atomsix_Inaitec_Imersão.pdf): *"A gente tem que falar com todo mundo, só que como que o cara que entra sabe para onde ir?"*

### 2.2 Impacto por persona (do PRD)
| Público | Problema atual | Consequência |
|---|---|---|
| Startups (Sofia) | Status de inscrição ausente, critérios vagos | Abandono antes da conversão |
| Empresas (Ricardo) | Sem diferenciação empresa vs. startup | Leads corporativos não se identificam |
| Investidores (André) | Nenhuma vitrine de portfolio | Deal flow vaza para SP |
| Governo (Carlos) | Linguagem "startup", case Palhoça invisível | Gestores municipais não contatam |

---

## 3. Personas (validadas 2026-04-02)

| Persona | Papel | Objetivo no site | Dor crítica |
|---|---|---|---|
| **Sofia** (28) | CEO de startup agritech, Palhoça/SC | Descobrir se o Acelera está aberto e se ela se encaixa | Status de inscrição invisível |
| **Ricardo** (45) | Diretor de P&D em indústria SC | Entender o que o Inaitec faz para empresas | Sem casos industriais |
| **André** (40) | Investidor-anjo, Florianópolis/SC | Encontrar deal flow no ecossistema | Sem vitrine de startups |
| **Carlos** (52) | Secretário municipal de inovação | Entender se pode replicar o modelo Palhoça | Linguagem inacessível |

> Persona "Sofia" representa o caso crítico de conversão; persona "Carlos" representa o diferencial competitivo (programa de Políticas Públicas — nenhum concorrente nacional tem).

---

## 4. Decisões de Produto (PRD v1.1)

### 4.1 Inegociáveis
- Comunicação com **todas as 4 personas**: startups, empresas, investidores, governo.
- **Visibilidade e clareza dos 9 programas**.
- **Suporte preparado para EN/ES** (lançamento PT-only; tradução do cliente).

### 4.2 Functional Requirements (resumo das 14 FRs)
| FR | Descrição | Prioridade |
|---|---|---|
| FR-001 | Navegação segmentada por audiência (≤3 cliques até conversão) | P0 |
| FR-002 | Home hub com bloco de 4 colunas (Startups / Empresas / Investidores / Governo) | P0 |
| FR-003 | Cada programa com status de inscrição em tempo real | P0 |
| FR-004 | Jornada "Sou Empresa" com casos industriais mensuráveis | P1 |
| FR-005 | Vitrine de Programas com filtros por público/estágio/modelo | P1 |
| FR-006 | Hub de Conteúdo unificado (Blog + Comunicação) | P1 |
| FR-007 | Chamadas e seleções abertas agregadas | P1 |
| FR-008 | Área Sobre completa (Quem Somos, História, Conselho, Relatório) | P1 |
| FR-009 | Formulários com confirmação, e-mail e evento no Analytics | P0 |
| FR-010 | Responsividade mobile-first | P0 |
| FR-011 | Página "Traga sua Empresa" para relocation no Parque | P2 |
| FR-012 | Fale Conosco centralizado com perfil no form | P1 |
| FR-013 | Páginas utilitárias (Área do Associado / Banco de Talentos) | P2 |
| FR-014 | Newsletter em posição fixa (footer + home) | P0 |

### 4.3 Out of Scope
- Animações / motion design pesado
- Protótipo clicável
- Hospedagem e cloud
- CRM / automação de marketing
- Versões EN/ES no go-live (estrutura preparada — multilingue ativado quando tradução chegar)
- Área do Associado e Banco de Talentos como **funcionalidade própria** (são páginas explicativas + link externo)

### 4.4 Goals & métricas (G-01 a G-05)
- **P0 bloqueador de go-live:** G-03 (redução de rejeição), G-05 (instrumentação Analytics)
- **P1 (90 dias):** G-01 (candidaturas Acelera), G-04 (conversão em tráfego pago)
- **P2 (6 meses):** G-02 (leads industriais qualificados)

---

## 5. Sitemap e Arquitetura de Informação

### 5.1 Estrutura final aprovada
```
/
├── /sobre                            → Quem Somos, História, Presidência, Relatório, Estrutura
├── /programas                        → Catálogo com filtros (P0)
│   └── /programas/[slug]             → 9 programas (Acelera, Impulse, Globaliza, Inovação Aberta, Catalisa, Lab Cidade, Políticas Públicas, Emprega Palhoça, Hub de Ideias, Missões)
├── /solucoes
│   └── /solucoes/empresas-instaladas → Vitrine de empresas no Parque
├── /traga-sua-empresa                → Relocation / benefícios do Parque
├── /chamadas                         → Seleções abertas agregadas (P0)
├── /conteudo                         → Hub unificado (blog + comunicação)
│   ├── /conteudo/[slug]
│   └── /conteudo/autor/[slug]
├── /banco-de-talentos                → Explicativa + link externo
│   └── /banco-de-talentos/vagas      → Lista de vagas
├── /fale-conosco                     → Form com perfil (P0)
├── /login                            → Área restrita (split-screen premium)
└── /design-system                    → Manual de marca interativo (oculto da navegação)
```

### 5.2 Regras de arquitetura
- Cada jornada chega ao formulário relevante em **≤ 3 cliques** a partir da Home.
- **Status de inscrição visível na vitrine** sem precisar abrir a página (badge).
- Programas de fluxo contínuo (Impulse, Emprega Palhoça) sempre marcados como abertos.
- Programas transversais (Globaliza, Catalisa, Lab Cidade, Missões) têm **página única** — múltiplos pontos de entrada no megamenu.
- **Investidores e Governo NÃO têm página dedicada** nesta v1 — são atendidos pelo bloco de 4 colunas da Home (decisão validada em 2026-04-02 com evidência nos PDFs Revisão de Site + Imersão).

### 5.3 Header — navegação final
```
Logo | Programas ▾ | Soluções ▾ | Portal de Conteúdo | Traga sua Empresa | Login | Fale Conosco (CTA)
```
- **Megamenu Programas** com 3 colunas (Startups / Empresas / Governo) + link "Sobre os Programas".
- **Soluções ▾**: Empresas Instaladas, Chamadas Abertas, Banco de Talentos.
- **Login** adicionado ao header em 2026-05-11 (decisão registrada).

---

## 6. Decisões de Stack e Arquitetura Técnica

### 6.1 Mudança de stack (2026-04-07) — decisão crítica
**De:** WordPress + Figma (definido no SoW) → **Para:** **Next.js 15 (App Router) + Tailwind CSS v4 + TypeScript**.

**Por quê:**
- App Router serve nativamente a arquitetura hub-and-spoke (rotas por pasta, layouts compartilhados, metadata por rota).
- SSG / Server Components adequados ao perfil de conteúdo (páginas de programa, hub).
- Tailwind v4 com `@theme` elimina config separada e alinha com tokens já em CSS variables.
- API Routes nativas para formulários (sem backend separado).
- TypeScript desde o início para tipagem de rotas dinâmicas.

**Alternativas descartadas:**
- WordPress — complexidade de deploy, sem dev WordPress definido.
- Vite + React SPA — sem roteamento nativo, sem SSG/SSR, SEO ruim.

### 6.2 Internacionalização (2026-05-13)
- Estrutura **`/[locale]/`** implementada com `next-intl`.
- Locales: **PT (default), EN, ES**.
- Mensagens em [messages/pt.json](../messages/pt.json), [en.json](../messages/en.json), [es.json](../messages/es.json).
- Roteamento em [src/i18n/routing.ts](../src/i18n/routing.ts), middleware em [src/middleware.ts](../src/middleware.ts).
- Go-live só em PT; EN/ES ligados quando tradução do cliente chegar.

### 6.3 Deploy
- Vercel (configurado em [vercel.json](../vercel.json) e [.vercel/](../.vercel/)).

---

## 7. Design System e Identidade Visual

### 7.1 Conceito ativo — **Conceito 1: Verde & Laranja** ✅
> Decisão registrada em [docs/logs/concept-spec.md](logs/concept-spec.md).

**Intenção:** Institucional sólido, confiança e calor. Remete ao parque tecnológico físico com identidade verde da marca.

### 7.2 Tokens canônicos (em `src/app/globals.css`)
| Token | Valor | Uso |
|---|---|---|
| `--color-brand-dark` | `#004E69` | Verde Inaitec — primário, headings, footer |
| `--color-brand-orange` | `#FA8400` | Laranja PANTONE 1505 C — acento, CTAs |
| `--color-brand-teal` | `#00C08B` | Verde-azulado secundário |
| `--color-surface` | `#FFFFFF` | Fundo padrão |
| `--color-surface-soft` | `#F5F4EF` | Off-white quente — hero |
| `--color-border` | `#E8E6E1` | Bordas |
| `--color-text-heading` | `#004E69` | Títulos |
| `--color-text-body` | `#4B6472` | Corpo |
| `--color-text-muted` | `#8A9FAD` | Apoio |

### 7.3 Tipografia
- **Plus Jakarta Sans** (via `--font-jakarta`, `next/font`) — fonte principal de UI/headings.
- **Campton** — fonte de suporte/destaque (legado do manual de marca, aplicado em alguns blocos editoriais).
- **Mono:** `ui-monospace, Consolas, monospace` para snippets do `/design-system`.

### 7.4 Estrutura da Home (Conceito 1)
1. Hero 50/50 — vídeo à esquerda + texto + métricas animadas à direita
2. Carrossel de mantenedores
3. Ecossistema Pedra Branca (cards de escala + timeline interativa)
4. **Bloco de 4 colunas — Startups / Empresas / Investidores / Governo** (FR-002)
5. Conheça os programas
6. Chamadas abertas em destaque (hero + carrossel lateral — ver §8.4)
7. Cases / Startups do ecossistema
8. Notícias recentes
9. Traga sua empresa
10. Fale Conosco (form)
11. Footer verde com faixa laranja

### 7.5 Página `/design-system` como contrato visual
Decisão de 2026-05-05: rota **não linkada** servindo de manual de marca interativo. **100% derivada dos tokens existentes** em `globals.css` — não introduz tokens novos.

Cobertura: cores, tipografia, espaçamento, radius, sombras, botões (dark/light/disabled/tamanhos), badges, eyebrows, cards, inputs (válido/erro), checkboxes, toggles, tabs, dropdowns, toasts, alertas, modais, dividers.

> Próxima onda de refactor: migrar hard-codes `#FA8400` para `var(--color-brand-orange)` usando o DS como contrato.

---

## 8. Decisões de Design e UI registradas

### 8.1 Padronização visual do Acelera Pedra Branca (2026-05-11)
- `public/acelera-pedrabranca.jpg` definida como **imagem oficial** do programa.
- Aplicada nos pontos de destaque (Home, cards de programa/chamada, conteúdo relacionado).
- Centralizada em `src/data/programas.ts` — propaga para vitrine e página individual.

### 8.2 Botão e página de Login (2026-05-11)
- Botão "Fazer login" no header (desktop + mobile) → rota `/login`.
- Layout split-screen "premium" com campos `Perfil`, `E-mail`, `Senha`, `Acessar`.
- Componentes reescritos seguindo tokens do `/design-system`: labels uppercase com `tracking-[0.2em]`, `border-white/15`, foco `border-[#FA8400]`, botão disabled em `bg-white/10 text-white/40`.

### 8.3 Componente `<Dropdown>` unificado (2026-05-11)
- Criado `src/components/Dropdown.tsx` (botão custom + popover, **sem `<select>` nativo**).
- Aplicado em `/login`; integra com `<form>` via `<input type="hidden">`.
- Fecha em click-outside + ESC. ARIA correto (`role="listbox"`, `aria-selected`).
- Substitui qualquer `<select>` nativo no projeto.

### 8.4 Arquitetura "Chamadas em destaque" — hero + carrossel lateral (2026-05-12)
Subseção da Home refatorada para **1 hero + carrossel de compactos**:
- A chamada com **menor `deadline`** vira card hero (imagem + countdown completo + CTA).
- As demais (até 4) viram cards compactos sem imagem em scroll-snap horizontal com setas prev/next.
- Dados puxados de `PROGRAMAS` (`status: 'aberta'`, ordenado por deadline).
- Componente: `src/components/ChamadasAbertasDestaque.tsx`.

**Por quê:** o modelo anterior (2 cards full-width empilhados) não escalava para 5+ chamadas; countdown segmentado é o elemento ativo da seção; cards secundários sem imagem deixam o countdown como protagonista.

### 8.5 Componentes-chave entregues
Lista (em [src/components/](../src/components/)):
- `Header.tsx`, `Footer.tsx`, `LayoutShell.tsx`
- `InaitecWebsite.tsx` (home composer)
- `ChamadasAbertasDestaque.tsx`, `ChamadasLista.tsx`
- `ProgramasCatalogo.tsx`, `ProgramaStickyBar.tsx`, `SidebarFilter.tsx`
- `Timeline.tsx`, `TimelineCinematic.tsx`, `TimelineEtapas.tsx`
- `EcosystemAccordion.tsx`, `EmpresasInstaladas.tsx`
- `ConteudoHub.tsx`, `CasesGrid.tsx`, `FaqAccordion.tsx`
- `CountdownTimer.tsx`, `AnimatedCounter.tsx`, `BrandPattern.tsx`
- `Dropdown.tsx`, `CadastroCTA.tsx`

---

## 9. Direcionamentos baseados nos arquivos do cliente

Síntese dos PDFs em [docs/inputs/](inputs/) e como cada um informou as decisões.

### 9.1 Apresentação Inaitec rev. Diego 2026
- **Definiu o tom de pitch institucional**: hub de ecossistema, não aceleradora isolada.
- **Forneceu os números canônicos**: +300 startups, R$ 3,5 Bi, 15 anos, 1,7M m².
- **Influenciou:** Hero da Home, seção de números, copy do bloco "O que é o Inaitec".

### 9.2 Atomsix_Inaitec_Imersão (relatório de descoberta)
- Origem da **causa-raiz** ("falar com todo mundo sem dizer pra onde ir").
- Fonte do **inegociável de 4 públicos** (startups/empresas/investidores/governo).
- Levantou o gap: **referências visuais positivas/negativas não foram coletadas** — pendência aberta no Foundation.

### 9.3 Inaitec — Revisão site (DOCX → PDF)
- **Confirmou que Investidores e Governo são seções, não páginas**: nota explícita na pág. 2/19 sobre o bloco de 4 colunas na Home.
- Mapeou conteúdos faltantes e categorização dos programas.
- **Influenciou diretamente:** FR-002 e revisão do PRD v1.0 → v1.1.

### 9.4 Onboarding e Roadmap Acelera Pedra Branca
- Validaram o **status de inscrição como dor crítica** (Sofia não sabe quando abre).
- Definiram as etapas que aparecem na Timeline do programa (componente `TimelineEtapas.tsx`).
- **Influenciaram:** FR-003 (status em tempo real), página individual do programa, componente "Avise-me quando abrir".

### 9.5 SoW (Produção)
- Definiu: prazo 16 semanas a partir de 25/03/2026 (→ go-live ~15/07/2026), 460h totais, 2 rodadas de revisão por fase, escopo de 10 páginas.
- **Stack obrigatório original (WordPress + Figma) foi alterado em 2026-04-07** com justificativa registrada (ver §6.1).

### 9.6 Manual de Marca (pasta)
- Forneceu paleta canônica (#004E69, #FA8400, #00C08B), Plus Jakarta + Campton.
- **Confirmou desvio do site atual** vs. manual vigente — base do problema visual identificado.
- Tokens migrados integralmente para `globals.css`.

### 9.7 [Atom6 × Inaitec] Discussão de Conteúdo
- Validou a unificação **Blog + Comunicação → Hub de Conteúdo** com filtros (FR-006).
- Confirmou categorias (programas, eventos, conquistas, ecossistema, imprensa).

### 9.8 Apresentação UI Concept
- Validou o **Conceito 1 (Verde & Laranja)** como direção aprovada.
- Espaço para Conceito 2 e Conceito 3 fica no `ConceptSwitcher` (footer) — placeholders aguardando briefing.

---

## 10. Estratégia Competitiva (do Benchmarking, 10 organizações)

### 10.1 Síntese
- **Gap único:** Nenhum concorrente nacional combina os 4 públicos (startup + empresa + governo + investidor) com jornadas distintas no mesmo site.
- **Cubo Itaú** é o player mais próximo (4 perfis), mas **não tem governo** e **não tem território**.
- **CELTA** já teve unidade "CELTA Pedra Branca" em parceria com o Inaitec — histórico de colaboração, não de concorrência direta.
- **STATION F (Paris)** define o padrão de **espaço físico como identidade de marca** — modelo a replicar com Pedra Branca.

### 10.2 5 recomendações estratégicas adotadas
1. **Segmentação de 4 públicos como centro da Home** → implementado no bloco de 4 colunas (FR-002).
2. **Pedra Branca como argumento de identidade** (à la STATION F) → hero com vídeo + fotos do parque.
3. **Status de programas em tempo real** → FR-003 + badges na vitrine.
4. **Números de impacto contextualizados** (empregos gerados, capital levantado) — não apenas "X startups aceleradas" (modelo MassChallenge/Techstars).
5. **Programa de Políticas Públicas como diferencial de posicionamento**, não item de menu — único concorrente nacional com isso.

### 10.3 Ameaças competitivas mapeadas
| Ameaça | Janela | Ação no projeto |
|---|---|---|
| ACATE redesenha e melhora jornada de inscrição | 0–12 meses | Lançar antes (vantagem first-mover em SC) |
| Cubo Itaú expande para Sul (após Cubo Uruguai) | 12+ meses | Consolidar Pedra Branca + Políticas Públicas como diferencial |
| Corporates SC migram para Distrito (AI enterprise) | 0–12 meses | Fortalecer cases industriais antes do go-live (FR-004) |

---

## 11. Riscos e Mitigações (do PRD)

| Risco | Probabilidade | Impacto | Mitigação |
|---|---|---|---|
| Sem baseline de métricas | Alta | Médio | GA + Hotjar antes do go-live → baseline a partir do lançamento |
| Tradução EN/ES atrasa | Alta | Baixo | Lançar só PT; estrutura multilingue pronta (já implementada) |
| Conteúdo (redação/fotos) atrasa | Alta | Alto | Mapear por página na semana 1; data-limite por marco |
| Equipe interna Inaitec reverte aprovações de Diego | Média | Médio | Documentar aprovações; reprocessar com Diego |
| Programas descontinuados/renomeados | Baixa | Médio | Lista de 9 congelada no Marco 2 |
| Imagens sem otimização | Média | Alto | Specs entregues no Marco 3 |
| Migração de posts do site atual | Média | Alto | Estratégia (export + canonicals + redirects) antes do dev |

---

## 12. Estado Atual da Implementação (snapshot 2026-05-13)

### 12.1 Marcos concluídos
- ✅ **Marco 1** — Foundation, Personas, Benchmarking validados.
- ✅ **Marco 2** — Sitemap e jornadas aprovados (PRD v1.1).
- ✅ **Marco 3** — UI Concept aprovado (Conceito 1 Verde & Laranja).
- 🟡 **Marco 4** — UI Design Completo em desenvolvimento (já implementado direto em código, não em Figma estático — consequência da mudança de stack).
- 🟡 **Marco 5** — Desenvolvimento em curso (próximo: integrações de form + Analytics).
- ⏳ **Marco 6** — Entrega final pendente.

### 12.2 Páginas com rota implementada
| Rota | Status | Componente principal |
|---|---|---|
| `/` | ✅ Home completa com 11 seções | `InaitecWebsite.tsx` |
| `/programas` | ✅ Catálogo com filtros | `ProgramasCatalogo.tsx` |
| `/programas/[slug]` | ✅ 9 programas com sticky bar + timeline | `ProgramaStickyBar.tsx` + `TimelineEtapas.tsx` |
| `/sobre` | ✅ Quem somos / história / governança | — |
| `/solucoes` | ✅ Hub de soluções | — |
| `/solucoes/empresas-instaladas` | ✅ Dark mode aplicado | `EmpresasInstaladas.tsx` |
| `/traga-sua-empresa` | ✅ Relocation Page | — |
| `/chamadas` | ✅ Lista filtrável | `ChamadasLista.tsx` |
| `/conteudo` | ✅ Hub unificado | `ConteudoHub.tsx` |
| `/conteudo/[slug]` | ✅ Post individual | — |
| `/conteudo/autor/[slug]` | ✅ Página de autor | — |
| `/banco-de-talentos` | ✅ Explicativa | — |
| `/banco-de-talentos/vagas` | ✅ Lista de vagas | — |
| `/fale-conosco` | ✅ Form com perfil | — |
| `/login` | ✅ Split-screen premium | `Dropdown.tsx` |
| `/design-system` | ✅ Manual interativo (oculto) | `LayoutShell.tsx` |

### 12.3 Infra técnica
- **Next.js 15 + App Router** em produção (Vercel).
- **`/[locale]/` ativo** com PT/EN/ES (mensagens em `messages/`).
- **Tailwind v4 + tokens canônicos** em `globals.css`.
- **TypeScript strict**.
- **next/font** para Plus Jakarta carregada via variável CSS.

### 12.4 Pendências críticas
- [ ] Instrumentar **Google Analytics + Hotjar** antes do go-live (G-05, R-01).
- [ ] Integrar formulários ao **RD Station** (FR-012) + e-mail de confirmação (FR-009).
- [ ] Integrar **newsletter** ao provedor do cliente (FR-014).
- [ ] **Tradução EN/ES** do cliente para destravar locales.
- [ ] **Conteúdo editorial** (redação final, fotos do parque, cases industriais para FR-004) — pendente do cliente.
- [ ] **Migração de posts** do site atual com canonicals e redirects (R-07).
- [ ] Refactor de hard-codes `#FA8400` → `var(--color-brand-orange)` (dívida visual identificada no §7.5).
- [ ] Definir e implementar **Conceitos 2 e 3** (placeholders no `ConceptSwitcher`).
- [ ] Coletar **referências visuais positivas/negativas** do cliente (gap aberto desde Foundation).

---

## 13. Estratégias-chave Adotadas (consolidado)

1. **Arquitetura hub-and-spoke** — Home centraliza narrativa; cada perfil tem jornada própria a ≤3 cliques do form.
2. **Jornada por valor, não por estrutura interna** — Sitemap reorganizado por público, não por departamento.
3. **Pedra Branca como protagonista visual** — território usado como identidade (modelo STATION F).
4. **Status de inscrição em destaque** — resolve a dor #1 da Sofia e diferencia de todos os concorrentes nacionais.
5. **Programa de Políticas Públicas como posicionamento** — único moat institucional sem equivalente.
6. **Hub de Conteúdo unificado** — Blog + Comunicação numa única página com filtros (FR-006).
7. **Investidores e Governo na Home** (sem páginas dedicadas v1) — aproveita 80% do impacto com 20% do escopo.
8. **Design System como contrato vivo** — `/design-system` é a fonte única de verdade; reduz divergência entre código e documentação.
9. **Stack moderno (Next.js + Tailwind v4)** trocado do SoW para destravar SSG/SSR, SEO e DX.
10. **i18n preparado mas desligado** — estrutura completa para EN/ES; ativação condicionada à tradução do cliente.
11. **Componentização do que se repete** — `Dropdown`, `Timeline`, `CountdownTimer`, `AnimatedCounter` para evitar dívida visual.
12. **Refactor visual incremental do Acelera Pedra Branca** — imagem oficial centralizada no dataset e propagada para todos os pontos de exibição.

---

## 14. Próximas decisões a tomar

1. **Definir Conceito 2 e Conceito 3** (ConceptSwitcher) — ou descontinuar a estrutura A/B se cliente confirmou Conceito 1 como final.
2. **Decidir provedor de e-mail marketing** para newsletter (FR-014).
3. **Confirmar integrações de form** (RD Station vs. alternativas).
4. **Definir estratégia de migração de posts** do site atual.
5. **Coletar referências visuais** do cliente (pendência desde Foundation).
6. **Aprovar copy final** das 9 páginas de programa.
7. **Validar cases industriais** com o cliente para FR-004 (Ricardo).
8. **Confirmar data de tradução EN/ES** para destravar `/[locale]/`.

---

## 15. Stakeholders e Aprovação

| Papel | Nome | Autoridade |
|---|---|---|
| Aprovador único | **Diego Chierighini** (Diretor Executivo, Inaitec) | Aprovação final |
| Equipe interna Inaitec | — | Influencia Diego, sem autoridade formal |
| PM (Atomsix) | João Felipe | Conduz projeto |
| Designer (Atomsix/Atom6) | Robson Galdino | Executa design + DS |
| Dev (Atomsix) | João Felipe (lead) + Codex/Claude (assistido) | Executa Next.js |

---

## 16. Referências dentro do projeto

- [docs/pm/Foundation.md](pm/Foundation.md) — diagnóstico e escopo
- [docs/pm/Prd.md](pm/Prd.md) — requisitos funcionais v1.1
- [docs/ux/Benchmarking.md](ux/Benchmarking.md) — 10 concorrentes + SWOT
- [docs/ux/Personas.md](ux/Personas.md) — Sofia, Ricardo, André, Carlos
- [docs/ux/Sitemap.md](ux/Sitemap.md) — IA completa
- [docs/logs/decisions.md](logs/decisions.md) — decisões granulares por data
- [docs/logs/concept-spec.md](logs/concept-spec.md) — Conceitos 1/2/3
- [docs/logs/design-tokens.md](logs/design-tokens.md) — histórico de tokens CSS
- [docs/logs/changelog.md](logs/changelog.md) — arquivos criados/editados
- [CLAUDE.md](../CLAUDE.md) — guia do projeto
- [.claude/ProjectGuidelines.md](../.claude/ProjectGuidelines.md) — framework de fases

---

*Documento gerado em 2026-05-13 a partir de todos os artefatos do projeto. Atualizar quando houver mudanças de marca, escopo ou estratégia.*
