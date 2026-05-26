# Inaitec — Redesign de Site

## Visão Geral do Projeto

- **Nome:** Inaitec — Redesign de Site
- **Tipo:** Site institucional
- **Idioma padrão:** Português
- **Pasta de inputs:** [docs/inputs/](docs/inputs/)

O Inaitec é um hub brasileiro de inovação e tecnologia focado em aceleração de startups e desenvolvimento de ecossistema. Este projeto cobre o **redesign completo do site institucional**, com base em um Statement of Work (SoW) formal para produção.

## Objetivo

Redesenhar e reconstruir o site do Inaitec para comunicar melhor a proposta de valor do hub, os programas de aceleração (ex.: Acelera Pedra Branca) e os serviços oferecidos a startups, parceiros e investidores.

## Documentos de Referência

Todos os inputs estão em [docs/inputs/](docs/inputs/):

- `Apresentação INaitec revDIEGO 2026.pdf` — apresentação de marca e pitch
- `Atomsix_Inaitec_Imersão.pdf` — relatório de imersão e descoberta da agência
- `Inaitec - Revisão site.docx.pdf` — revisão do site atual e notas de conteúdo
- `Onboarding Participantes Acelera Pedra Branca.pdf` — detalhes do programa de aceleração
- `Roadmap Acelera Pedra Branca.pdf` — roadmap do programa de aceleração
- `[Inaitec] Website Redesign - SoW (Produção).pdf` — escopo, entregáveis e cronograma

## Logs do Projeto

- [docs/logs/changelog.md](docs/logs/changelog.md) — arquivos criados/editados (automático via hook)
- [docs/logs/decisions.md](docs/logs/decisions.md) — decisões validadas por fase
- [docs/logs/tokens.md](docs/logs/tokens.md) — uso de tokens de API e custo estimado por sessão (automático via hook)
- [docs/logs/design-tokens.md](docs/logs/design-tokens.md) — design tokens CSS detectados nos arquivos (automático via hook)
- [docs/logs/prompts.md](docs/logs/prompts.md) — prompts usados em gerações AI e número de iterações

## Framework de Skills

Este projeto segue um sistema de skills por fase — da Discovery ao Deploy. O arquivo de referência base do framework é:

- [.claude/ProjectGuidelines.md](.claude/ProjectGuidelines.md) — guidelines completas de cada fase, personas, critérios de bloqueio, inputs/outputs e estrutura de arquivos

**Consulte o ProjectGuidelines.md antes de criar qualquer skill ou iniciar uma nova fase.**

## Convenções de Trabalho

- Projeto VibeCoding — desenvolvimento assistido por IA, iteração rápida, revisão humana.
- Consultar os PDFs em `docs/inputs/` antes de fazer suposições sobre marca, conteúdo ou escopo.
- **Ao finalizar qualquer tarefa relevante, registrar a decisão tomada em [docs/logs/decisions.md](docs/logs/decisions.md).**
- [docs/logs/design-tokens.md](docs/logs/design-tokens.md) é atualizado automaticamente quando arquivos CSS/JS com custom properties são editados.

---

## Stack Técnica

- **Framework:** Next.js 16 (App Router) + **TypeScript** (`.ts` / `.tsx`)
- **i18n:** `next-intl` v4 — locales `pt` (default), `en`, `es` (`localePrefix: 'as-needed'`)
- **Estilização:** Tailwind CSS v4
- **Fonte:** Plus Jakarta Sans (via `next/font/google`)
- **Ícones:** `lucide-react` (manter — não migrar para Phosphor)
- **CMS:** Sanity (a configurar — ver seção abaixo)

---

## Design Tokens — Cores

Todas as cores principais ficam como CSS variables no `@theme` do Tailwind v4, em [src/app/globals.css](src/app/globals.css). **Mudar uma cor é uma única edição** — todas as ocorrências no site refletem.

### Tokens disponíveis (`@theme`)

| Variável CSS | Valor | Uso |
|---|---|---|
| `--color-brand-orange` | `#FA8400` | Cor principal de destaque, CTAs, highlights italic |
| `--color-brand-teal` | `#00C08B` | Verde da marca (pilar empresas) |
| `--color-brand-dark` | `#004E69` | Dark navy-teal (textos de heading no light mode) |
| `--color-brand-navy` | `#0D2E38` | Fundo escuro principal |
| `--color-surface` | `#FFFFFF` | Branco |
| `--color-surface-soft` | `#F5F4EF` | Fundo claro (light sections) |
| `--color-border` | `#E8E6E1` | Borda padrão (light mode) |
| `--color-text-heading` | `#004E69` | Títulos no light mode |
| `--color-text-body` | `#4B6472` | Corpo de texto |
| `--color-text-muted` | `#8A9FAD` | Labels, metadados |

### Convenção de uso no Tailwind

Cada variável `--color-X` vira automaticamente classes utilitárias:

```tsx
// ✅ Use a classe nomeada — consome a variável CSS
<div className="bg-brand-orange text-white" />
<p className="text-brand-navy/65">  {/* opacidade funciona */}
<span className="border-border" />

// ✅ Em inline styles, use a variável CSS
<div style={{ background: 'var(--color-brand-orange)' }} />

// ❌ Nunca use bracket notation com hex direto
<div className="bg-[#FA8400]" />   // bypass do @theme
<div style={{ color: '#FA8400' }} />
```

### Regras

- **Adicionar nova cor recorrente:** edita [globals.css:63-78](src/app/globals.css#L63) (bloco `@theme`) e adiciona `--color-<nome>: #RRGGBB;`. Depois use `bg-<nome>`, `text-<nome>`, `border-<nome>` etc.
- **Mudar uma cor existente:** edita o valor da variável em `globals.css` — todas as ocorrências refletem.
- **Cores semânticas únicas** (verde sucesso `#15803d`, vermelho erro `#dc2626`, paleta categórica como pilares Universidades `#4A9EE0` / Investidores `#E9A84A`) podem ficar como bracket notation até virarem recorrentes — quando passarem de ~10 usos, promover ao `@theme`.

### Casos especiais (refactor pendente)

Esses casos ainda usam hex literal porque exigem lógica mais elaborada — não bloqueiam, mas vale lembrar pra futura limpeza:

- **Alpha-hex de 8 dígitos** (`#FA840018`) — `var()` não suporta esse formato concatenado. Ver [src/data/empresas.ts:50-52](src/data/empresas.ts#L50-L52). Alternativa: separar `bg` (com alpha) de `text` (cor sólida via var).
- **Gradients em inline style** (`'radial-gradient(circle, #FA8400 0%, transparent 65%)'`) — string composta dificulta o swap. Ver [EcosystemAccordion.tsx](src/components/EcosystemAccordion.tsx) e [InaitecWebsite.tsx](src/components/InaitecWebsite.tsx).
- **Documentação visual** (`<code>#FA8400</code>` em [design-system/page.tsx](src/app/[locale]/design-system/page.tsx)) — intencional, mostra a paleta literal.

---

## Migração para Sanity CMS — Plano e Padrões

O site atual tem todo o conteúdo hardcoded em três lugares: `messages/{pt,en,es}.json`, `src/data/*.ts` (programas, conteudo, empresas) e arrays inline dentro das `page.tsx` (ex.: conselhos em `sobre/page.tsx`). A meta é migrar todo o **conteúdo editorial** para o Sanity, mantendo o `next-intl` apenas para nav/microcopy fixo.

### Divisão i18n × Sanity (decisão validada)

- **Permanece no `next-intl` (`messages/*.json`):**
  - Labels de navegação do Header e Footer
  - Microcopy de UI (botões "Anterior/Próximo", placeholders genéricos, aria-labels, status "Carregando", "min de leitura", labels técnicos)
  - Qualquer string que não seja conteúdo editorial
- **Vai para Sanity (botão "Translations" no Studio cuida das versões PT/EN/ES):**
  - Todo conteúdo editorial: Home (hero, parceiros, ecossistema, programas, chamadas, notícias, contato, resultados, FAQ, CTA banner), páginas internas (Sobre, Fale Conosco, Traga sua Empresa, Banco de Talentos, Soluções), coleções (Programas, Conteúdo/Posts, Empresas)

### i18n no Sanity — 3 idiomas (PT + EN + ES)

O cliente quer suporte aos 3 idiomas no CMS. Usar o plugin `@sanity/document-internationalization`:

- Cada documento existe em **3 versões** com IDs `<schemaType>__i18n_pt`, `<schemaType>__i18n_en`, `<schemaType>__i18n_es`
- Campo `language` (string, `readOnly`, `hidden`) preenchido em cada versão
- Documento `translation.metadata` com array `translations` contendo **3 itens** — cada item obrigatoriamente com `_type: "internationalizedArrayReferenceValue"` e o campo `language` correto:

```json
{
  "_type": "translation.metadata",
  "translations": [
    { "_key": "doc-pt", "_type": "internationalizedArrayReferenceValue", "language": "pt", "value": { "_ref": "ID_PT", "_type": "reference" } },
    { "_key": "doc-en", "_type": "internationalizedArrayReferenceValue", "language": "en", "value": { "_ref": "ID_EN", "_type": "reference" } },
    { "_key": "doc-es", "_type": "internationalizedArrayReferenceValue", "language": "es", "value": { "_ref": "ID_ES", "_type": "reference" } }
  ]
}
```

- `sanity.config.ts` configura `supportedLanguages: [{id:'pt',title:'Português'},{id:'en',title:'English'},{id:'es',title:'Español'}]` e `defaultLanguages: ['pt']`

### Estrutura de pastas Sanity

```
src/sanity/
├── client.ts                → createClient (next-sanity)
├── image.ts                 → urlFor (imageUrlBuilder)
├── lib/
│   └── live.ts              → sanityFetch helper com tags
├── queries/
│   ├── home.ts              → groq + getHome({ locale })
│   ├── sobre.ts
│   └── ...                  → uma query por página
└── schemas/
    ├── index.ts             → exporta schemaTypes
    ├── home.ts
    ├── programa.ts
    └── ...

sanity.config.ts             → na raiz; plugins: [structureTool(), documentInternationalization(...)]

src/app/studio/[[...tool]]/page.tsx   → Studio embutido em /studio
```

### Padrão obrigatório por página (3 camadas)

1. **Query** (`src/sanity/queries/[pagina].ts`):
   ```ts
   import { sanityFetch } from '@/sanity/lib/live'
   import { groq } from 'next-sanity'

   export const homeQuery = groq`*[_type == "home" && language == $language][0]{ ... }`

   export async function getHome({ locale }: { locale: string }) {
     return sanityFetch({ query: homeQuery, params: { language: locale }, tags: ['home'] })
   }
   ```
2. **Page** (`src/app/[locale]/[rota]/page.tsx`) — Server Component **thin**, só faz fetch e passa data. Nada de `'use client'`, nada de render aqui.
3. **Client Component** (`src/components/[rota]/[Pagina]ClientComponent.tsx`) — recebe `data` como prop, contém `'use client'`, hooks, eventos, render.

### Regras gerais Sanity (espelha o padrão Super Terminais)

- **Sempre** Server Components para fetch — nunca `useEffect` para chamar Sanity
- **Sempre** filtrar por `language == $language` em queries de documentos com i18n
- **Sempre** usar projeções GROQ — nunca buscar o documento inteiro
- **Sempre** `groq\`...\`` template tag (não string simples)
- **Nunca** fallback de texto hardcoded (`?? "texto fixo"`) — use renderização condicional com `&&`
- **Nunca** importar `client.fetch` ou queries em Client Components
- Imagens **sempre** via `urlFor(image).width(N).url()`
- `apiVersion` fixa (ex.: `"2024-01-01"`) — nunca `new Date().toISOString()`
- `useCdn: true` em produção; `false` apenas em preview
- Schemas em `.ts` (não converter para `.js` — projeto é TypeScript)
- Em produção, trocar `cache: "no-store"` por `{ revalidate: 60 }` no `sanityFetch`

### Variáveis de ambiente (`.env.local`)

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=                # somente servidor, NUNCA com NEXT_PUBLIC_
```

A organização Sanity será nova, criada dentro da conta da empresa (Atomsix) com nome `inaitec-website`, para futura transferência ao cliente.

### Sanity MCP — obrigatório quando configurado

Sempre que for criar/popular conteúdo no Sanity, usar **exclusivamente** as ferramentas `mcp_sanity_*`. Nunca usar scripts manuais ou `sanity import`.

Fluxo obrigatório ao criar documento com i18n:
1. Criar **3 documentos** (PT, EN, ES) via `mcp_sanity_create_documents_from_json` — o MCP gera UUIDs aleatórios (ignora `_id` proposto)
2. Consultar os IDs reais via `mcp_sanity_query_documents`
3. Criar o `translation.metadata` com a estrutura completa (`_type: internationalizedArrayReferenceValue` + `language`)
4. Publicar com `mcp_sanity_publish_documents`
5. Se for um documento singleton referenciado por ID no `sanity.config.ts`, atualizar com os UUIDs reais (nunca usar IDs `__i18n_*` planejados sem confirmar que existem)

**Status atual:** MCP **ainda não está configurado**. Antes da primeira criação de schema/documento, adicionar as credenciais MCP no `.claude/settings.json`.

### Ordem de migração (faseada — um passo de cada vez)

1. **Setup base**
   - Configurar `.env.local` com credenciais da nova org Sanity
   - Instalar dependências (`next-sanity`, `@sanity/image-url`, `sanity`, `@sanity/document-internationalization`, `styled-components` se necessário pelo Studio)
   - Criar `sanity.config.ts`, `src/sanity/{client,image,lib/live}.ts`, `src/app/studio/[[...tool]]/page.tsx`
   - Configurar Sanity MCP no `.claude/settings.json`
2. **Home** (primeira página a migrar)
   - Inventário de campos da Home (`InaitecWebsite.tsx` + bloco `Home` do `messages/pt.json`)
   - Criar schema `home` (com sub-objetos: hero, parceiros, ecossistema, programas, chamadas, noticias, contato, resultados, faq, ctaBanner)
   - Criar query `getHome`
   - Refatorar `src/app/[locale]/page.tsx` em Server thin + `HomeClientComponent`
   - Popular documentos PT/EN/ES via MCP + `translation.metadata`
   - Remover bloco `Home` do `messages/*.json`
3. **Demais páginas internas** — uma por vez, mesma sequência (Sobre, Fale Conosco, Traga sua Empresa, Banco de Talentos, Soluções)
4. **Coleções** — Programas (com slug), Conteúdo/Posts (com autor + slug), Empresas
5. **Globais** — Header dinâmico (se houver conteúdo editável), Footer dinâmico, CTA global
6. **Limpeza final** — `messages/*.json` fica só com nav/microcopy; remover `src/data/*.ts` migrados

### Refatoração obrigatória durante a migração

Páginas e componentes grandes precisam ser quebrados ao migrar:
- `InaitecWebsite.tsx` (994l) → vira `HomeClientComponent` enxuto consumindo `data`
- `programas/[slug]/page.tsx` (763l) → Server thin (busca programa por slug) + `ProgramaClientComponent`
- `sobre/page.tsx` (728l) → Server thin + `SobreClientComponent`
- Arrays inline (`VALORES`, `HISTORIA`, `CONSELHO_DELIBERATIVO`, etc.) viram campos do schema
- `src/data/programas.ts`, `src/data/empresas.ts`, `src/data/conteudo.ts` são deletados após a migração da coleção correspondente
