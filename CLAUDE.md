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
│   ├── ctaBanner.ts         → groq + getCtaBanner({ locale }) — componente global
│   └── ...                  → uma query por página
├── schemas/
│   ├── index.ts             → exporta schemaTypes
│   ├── home.ts
│   ├── programa.ts
│   ├── ctaBanner.ts         → documento global (singleton PT/EN/ES)
│   └── ...
└── structure.ts             → estrutura customizada do Studio (sidebar, singletons)

sanity.config.ts             → na raiz; plugins: [structureTool({ structure }), documentInternationalization(...)]

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

### Uma seção Sanity = um componente próprio (obrigatório)

Para cada seção/bloco que vem do Sanity, criar um componente dedicado em `src/components/[rota]/[NomeDaSecao]Section.tsx`. O `[Pagina]ClientComponent.tsx` vira **apenas um orquestrador thin** que importa e compõe as seções, passando a fatia de `data` correspondente como prop.

```tsx
// src/components/home/HeroSection.tsx
'use client'
import type { HomeHero } from '@/sanity/queries/home'

type Props = { hero?: HomeHero }

export default function HeroSection({ hero }: Props) {
  return <section>...</section>
}

// src/components/home/HomeClientComponent.tsx — orquestrador
'use client'
import HeroSection from './HeroSection'
import ParceirosSection from './ParceirosSection'
import type { HomeData } from '@/sanity/queries/home'

export default function HomeClientComponent({ data }: { data: HomeData }) {
  return (
    <main>
      <HeroSection hero={data?.hero} />
      <ParceirosSection parceiros={data?.parceiros} />
    </main>
  )
}
```

**Regras:**
- Cada componente recebe **apenas a fatia de `data`** de que precisa (`hero`, `parceiros`, `ecossistema`, etc.), não o `data` inteiro
- Os tipos do prop vêm de `@/sanity/queries/[pagina]` (`HomeHero`, `HomeParceiros`, etc.)
- Cada componente é responsável pelo seu próprio early-return quando a fatia de data está vazia (`if (!parceiros) return null`)
- O `[Pagina]ClientComponent.tsx` fica enxuto — só `<main>` (ou wrapper equivalente) + lista de seções + elementos decorativos que pertencem ao container (orbs, gradientes globais, etc.)
- Nomenclatura: `<NomeDaSecao>Section.tsx` (ex.: `HeroSection`, `ParceirosSection`, `EcossistemaSection`)

### Componentes compartilhados — nunca duplicar

Antes de criar qualquer seção nova, verificar se já existe um componente compartilhado em `src/components/` que atenda ao caso:

| Componente | Arquivo | Uso |
|---|---|---|
| CTA Final (dark, com gradiente laranja) | `src/components/CtaFinalSection.tsx` | CTA ao final de todas as páginas internas — recebe `data?: CtaFinalData` |
| CTA Banner (global, com título override) | `src/components/CtaBannerSection.tsx` | Banner global com título personalizável por página |

**Regra:** Nunca criar um componente `CtaFinalSection.tsx` ou `CtaBannerSection.tsx` dentro de `src/components/[pagina]/`. Sempre importar de `@/components/CtaFinalSection` ou `@/components/CtaBannerSection`.

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

**Status atual:** MCP **configurado e operacional**. CLI autenticado (`sanity login` feito). Para deploy de schema, usar sempre `npx sanity@latest schema deploy` (nunca o MCP `deploy_schema` — temos Studio local).

**`workspaceName` obrigatório:** Todas as chamadas MCP devem incluir `workspaceName: 'inaitec-website'` (o workspace padrão `"default"` não existe neste projeto).

### CTA Banner — componente global com título por página

O `ctaBanner` é um **documento Sanity global** (singleton PT/EN/ES), não um sub-objeto de página. Armazena eyebrow, desc e botões — que são iguais em todas as páginas. Cada página fornece apenas seu título via `titleOverride`.

**Arquivos:**
- Schema: `src/sanity/schemas/ctaBanner.ts`
- Query: `src/sanity/queries/ctaBanner.ts` → `getCtaBanner({ locale })`
- Componente compartilhado: `src/components/CtaBannerSection.tsx`

**IDs dos singletons publicados:**
| Language | ID |
|---|---|
| PT | `e54d7186-5a3e-4a73-9419-bab31926c7db` |
| EN | `1f583a00-813e-4904-a904-ebb0a83e2460` |
| ES | `4cb2c011-f5ee-4535-9add-86c38ead71b2` |

**Padrão de uso em cada página:**

```tsx
// page.tsx — busca ctaBanner em paralelo com os dados da página
const [data, ctaBanner] = await Promise.all([
  getMinhaPage({ locale }),
  getCtaBanner({ locale }),
])
return <MinhaPageClientComponent data={data} ctaBanner={ctaBanner} />
```

```tsx
// ClientComponent.tsx
// Sem título customizado (usa padrão do doc global):
<CtaBannerSection data={ctaBanner} />

// Com título próprio da página (só titleStart/Highlight/End mudam):
<CtaBannerSection
  data={ctaBanner}
  titleOverride={data?.ctaBannerTitle}
/>
```

**Schema por página** — quando precisar de título diferente, adicionar ao schema da página:

```ts
defineField({
  name: 'ctaBannerTitle',
  title: 'CTA Banner — Título personalizado',
  description: 'Deixe vazio para usar o título padrão do CTA Banner global.',
  type: 'object',
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({ name: 'titleStart',     type: 'string' }),
    defineField({ name: 'titleHighlight', type: 'string' }),
    defineField({ name: 'titleEnd',       type: 'string' }),
  ],
})
```

**Regra:** `ctaBanner` **nunca** é sub-objeto de página. É sempre documento separado buscado via `getCtaBanner()`.

---

### Studio structure.ts — adicionar novas páginas

A estrutura do Studio fica em `src/sanity/structure.ts`. Ao migrar uma nova página singleton:

1. Adicionar o ID do documento PT em `SINGLETONS`
2. Adicionar `S.listItem()` correspondente dentro do grupo correto
3. Adicionar o tipo em `i18nSchemaTypes` no `sanity.config.ts`
4. Rodar `npx sanity@latest schema deploy`

**Singletons registrados:**

| Singleton | ID (PT) | Schema type |
|---|---|---|
| Home | `08a4cb0a-f98b-4dd7-9185-8c5516c39943` | `home` |
| CTA Banner | `e54d7186-5a3e-4a73-9419-bab31926c7db` | `ctaBanner` |
| Sobre | `eb1f1e75-726c-4f5f-8a7d-d0b36e8cb530` | `sobre` |
| Traga sua Empresa | `0bde9e07-f843-4125-b53f-1f28a35976be` | `tragaSuaEmpresa` |
| Empresas Instaladas | `b9e088f6-abe6-47fb-8513-2ee82941cbe7` | `empresasInstaladas` |
| Programas (catálogo) | `d04849c7-4759-4bbe-bbf6-f023c04b8981` | `programas` |
| Fale Conosco | `c7c526f3-bcee-4c16-ad06-dbb1f523b4ca` | `faleConosco` |

---

### FAQ — padrão por página

O FAQ é um **sub-objeto do schema de cada página** (não um documento separado), pois cada página tem seu próprio conjunto de perguntas/respostas.

Campos do objeto `faq`: `eyebrow`, `titleStart`, `titleHighlight`, `desc`, `items[]` (`q` + `a`).

O link "Entrar em contato" dentro do FAQ é **microcopy** — fica em `messages/{pt,en,es}.json` na chave `Faq.ctaLabel`, com href `/fale-conosco` hardcoded no componente. Não vai para o Sanity.

---

### i18n de componentes (labels estruturais)

Labels que **não são conteúdo editorial** (não editáveis pelo cliente no Sanity), mas mudam por idioma → ficam em `messages/*.json`.

**Namespaces adicionados:**

| Namespace | Onde é usado | Keys principais |
|---|---|---|
| `Sobre` | `sobre/HeroSection`, `QuemSomosSection`, `RelatorioSection`, `LiderancaSection` | `navQuemSomos…navEstrutura`, `missaoLabel`, `visaoLabel`, `valoresLabel`, `relatorioCardLabel`, `relatorioDownload`, `fotoEmBreve` |
| `ProgramaDetalhe` | `programas/ProgramaClientComponent` | `breadcrumb`, `publico.*`, `status*`, `cta*`, todos os eyebrows e títulos de seção estruturais da página de detalhe |

**Padrão para Server Components:**
```ts
import { getTranslations } from 'next-intl/server'
// componente precisa ser async:
export default async function MinhaSection({ data }: Props) {
  const t = await getTranslations('NomeNamespace')
  return <div>{t('minhaKey')}</div>
}
```

**Regra:** Texto que o cliente precisa editar → Sanity. Texto que muda por idioma mas é estrutural → i18n. Texto que é igual em todos idiomas e não muda → pode ficar no código.

---

### Ordem de migração (faseada — um passo de cada vez)

1. ✅ **Setup base** — concluído
2. ✅ **Home** — concluída
   - Schemas: `hero`, `parceiros`, `ecossistema`, `timeline`, `pilares`, `programas`, `chamadas`, `resultados`, `faq`
   - Seções ainda no código (não migradas para Sanity por decisão): `noticias` (pendente), `contato` (i18n)
   - Bloco `Home` removido do `messages/*.json` (exceto microcopy: `Faq.ctaLabel`)
3. ✅ **CTA Banner** — documento global criado (ver seção acima)
4. **Demais páginas internas** — uma por vez:
   - ✅ **Sobre** — concluída
     - Schema: `sobre.ts` com 8 seções (hero, quemSomos, historia, lideranca, relatorio, mediaKit, estrutura, ctaFinal)
     - IDs: PT `eb1f1e75-726c-4f5f-8a7d-d0b36e8cb530` · EN `466378bb-99df-4f48-b112-be3351a2cf34` · ES `77a982b9-5ae9-43ec-86df-80f9ae1612c1`
     - Imagens: team photos + inaitec7/8.jpg → assets Sanity (ver `scripts/upload-sobre-images.ts`)
     - `sobre/page.tsx` → Server thin; seções em `src/components/sobre/`; ctaFinal próprio (NÃO usa shared CtaBannerSection)
   - ✅ **Traga sua Empresa** — concluída
     - Schema: `tragaSuaEmpresa.ts` com 6 seções (hero, perks, beneficios, infraestrutura, porQue, ctaFinal)
     - IDs: PT `0bde9e07-f843-4125-b53f-1f28a35976be` · EN `9cf202c9-3622-44c3-9762-dee56f7f7aa7` · ES `8dda440c-74d8-4657-90b5-317882a64114`
     - Imagens: inaitec1 (hero), inaitec8 (porQue), estrutura1/3/3-1/4 (espaços), 8 logos de perks → assets Sanity (ver `scripts/upload-traga-images.ts`)
     - `traga-sua-empresa/page.tsx` → Server thin; seções em `src/components/traga-sua-empresa/`; ctaFinal próprio
     - Nota: PerksSection renderiza TANTO perks (logos) QUANTO benefícios (check cards) — ambos ficam no mesmo `<section id="beneficios">` conforme layout original
     - Nota: números dos `razoes` (porQue) são calculados por index (`String(i+1).padStart(2,'0')`) — não armazenados no Sanity
   - ✅ **Empresas Instaladas** — concluída
     - Schema: `empresasInstaladas.ts` com `hero` + `ctaFinal` (+ `language` oculto)
     - IDs: PT `b9e088f6-abe6-47fb-8513-2ee82941cbe7` · EN/ES via plugin i18n
     - HeroSection recebe `hero?` do Sanity; sem fallback hardcoded
   - ✅ **Programas (catálogo)** — concluída
     - Schema: `programas.ts` com `hero` (inclui `heroImage`) + `ctaFinal` + `language`
     - IDs: PT `d04849c7-4759-4bbe-bbf6-f023c04b8981` · EN `72d44ab2-0ef2-4563-a416-744fca7fa9bc` · ES `0bbd6087-9387-4c3b-895a-6e2ae21626d2`
     - HeroSection aceita `hero?` + `count` (count é dinâmico, vem dos documentos `programa`); `titleStart` suporta `{count}` como placeholder
   - ✅ **Programa detalhe (`/programas/[slug]`)** — concluída
     - `ProgramaClientComponent` usa `getTranslations('ProgramaDetalhe')` para todos os labels estruturais
     - Seções condicionais: `oQueE`, `stats/quickFacts`, `paraQuem`, `beneficios`, `etapas`, `cases`, `faq` só aparecem quando Sanity tem dados (sem fallback hardcoded)
     - `empresasVinculadas[]` referencia coleção `empresa` — prioridade sobre `cases[]` embutidos
   - ✅ **Fale Conosco** — concluída
     - Schema: `faleConosco.ts` com 4 seções (hero, canais, endereco, faq)
     - IDs: PT `c7c526f3-bcee-4c16-ad06-dbb1f523b4ca` · EN `20916345-e654-4626-8e39-2b49760ba40f` · ES `3f39aa79-f9d4-4f54-a30f-7d27f50ebdf4`
     - Form permanece no código com i18n (`FaleConosco.form.*`) via `ContactForm.tsx` (`'use client'`)
     - Canais: `iconName` string → mapeado para Lucide em `CanaisSection.tsx`
     - Banco de Talentos, Soluções — pendentes
5. **Coleções** — Programas (com slug), Conteúdo/Posts (com autor + slug), Empresas
6. **Globais** — Header dinâmico (se houver conteúdo editável), Footer dinâmico
7. **Limpeza final** — `messages/*.json` fica só com nav/microcopy; remover `src/data/*.ts` migrados

### Refatoração obrigatória durante a migração

Páginas e componentes grandes precisam ser quebrados ao migrar:
- `InaitecWebsite.tsx` (994l) → vira `HomeClientComponent` enxuto consumindo `data`
- `programas/[slug]/page.tsx` (763l) → Server thin (busca programa por slug) + `ProgramaClientComponent`
- ✅ `sobre/page.tsx` (728l) → Server thin + `SobreClientComponent` (concluído)
- Arrays inline (`VALORES`, `HISTORIA`, `CONSELHO_DELIBERATIVO`, etc.) → campos do schema `sobre.ts` (concluído)
- `src/data/programas.ts`, `src/data/empresas.ts`, `src/data/conteudo.ts` são deletados após a migração da coleção correspondente
