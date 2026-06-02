# Migração de Notícias — site antigo → Sanity

Migra todas as notícias de `inaitec.com.br/noticias` (CMS PHP custom, sem API) para a
coleção `post` do Sanity, via scraping da parte pública.

## O que faz

1. Coleta as URLs de artigo da listagem `/noticias/` (≈58 artigos, IDs não sequenciais).
2. Para cada artigo: parseia título, capa, data, autor (quando há byline "por …"), resumo (do card da listagem) e corpo.
3. Converte o corpo HTML → **Portable Text** (preserva H2/H3, **negrito**, _itálico_, listas, citações; imagens inline viram blocos de imagem).
4. Sobe a capa (e imagens inline, se houver) como **assets no Sanity**, com dedup por URL de origem.
5. Grava com `createOrReplace` e `_id` estável `noticia-{id}` → **rodar de novo atualiza, não duplica**.
6. Cria o `translation.metadata` (i18n) pra o botão **Translations** do Studio gerar EN/ES.

## Pré-requisitos

Variáveis em `.env.local` (já presentes no projeto):

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=...
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=...        # token com permissão de escrita (somente servidor)
```

Dependências (já instaladas): `cheerio`, `@sanity/client`, `@sanity/block-tools`,
`@sanity/schema`, `jsdom`, `dotenv`, `tsx`.

## Como rodar

```bash
# 1) DRY-RUN — processa tudo e salva JSON local em scripts/.noticias-dump/, SEM escrever no Sanity
npx tsx scripts/migrate-noticias.ts --dry-run

# dry-run de 1 artigo (validação rápida)
npx tsx scripts/migrate-noticias.ts --dry-run --only=151

# dry-run dos N primeiros
npx tsx scripts/migrate-noticias.ts --dry-run --limit=5

# 2) IMPORT REAL — escreve no Sanity (sobe assets + grava docs)
npx tsx scripts/migrate-noticias.ts

# reprocessar um artigo específico (ex.: capa que falhou)
npx tsx scripts/migrate-noticias.ts --only=141
```

## Notas

- **Scraping educado**: 1s de delay entre requests + retry com backoff em falha de rede.
- **`featured`**: o artigo mais recente vira destaque no Portal de Conteúdo. Só é
  recalculado em import COMPLETO; em `--only`/`--limit` o `featured` atual é preservado.
- **Data**: `dd/mm/aaaa` → ISO ao meio-dia UTC (evita virar o dia por fuso).
- **Resumo**: vem do card da listagem; fallback no 1º parágrafo do corpo.
- **Autor**: extraído da assinatura "por <Nome>" (quando existe) e removido do corpo.
- O schema da coleção é `src/sanity/schemas/post.ts`. Após mudar o schema:
  `npx sanity@latest schema deploy`.

## Frontend

O Portal de Conteúdo lê do Sanity:
- Listagem: `src/app/[locale]/conteudo/page.tsx` → `ConteudoHub` (client)
- Artigo: `src/app/[locale]/conteudo/[slug]/page.tsx` → renderiza o corpo com
  `src/components/PortableTextRenderer.tsx`
- Queries: `src/sanity/queries/posts.ts`
