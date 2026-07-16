import { defineField, defineType } from 'sanity'

// ── Reutilizável: campos de pessoa ───────────────────────────────────────────
const pessoaFields = [
  { name: 'nome', type: 'string' as const, title: 'Nome' },
  { name: 'cargo', type: 'string' as const, title: 'Cargo' },
  { name: 'foto', type: 'image' as const, title: 'Foto', options: { hotspot: true } },
]
const pessoaPreview = { select: { title: 'nome', subtitle: 'cargo' } }

// ── Helper: campos de um conselho ────────────────────────────────────────────
function conselhoFields(titulo: string) {
  return [
    defineField({ name: 'titulo', type: 'string', title: 'Título', initialValue: titulo }),
    defineField({ name: 'desc', type: 'text', title: 'Descrição', rows: 2 }),
    defineField({
      name: 'membros',
      type: 'array',
      title: 'Membros',
      of: [{ type: 'object', fields: pessoaFields, preview: pessoaPreview }],
    }),
  ]
}

// ── Schema principal ─────────────────────────────────────────────────────────
export default defineType({
  name: 'sobre',
  type: 'document',
  title: 'Sobre',
  fields: [
    defineField({ name: 'language', type: 'string', readOnly: true, hidden: true }),

    // ── 1. Hero ──────────────────────────────────────────────────────────────
    defineField({
      name: 'hero',
      type: 'object',
      title: 'Hero',
      fields: [
        defineField({ name: 'eyebrow', type: 'string', title: 'Eyebrow' }),
        defineField({ name: 'titleStart', type: 'string', title: 'Título (início)' }),
        defineField({ name: 'titleHighlight', type: 'string', title: 'Título (destaque itálico)' }),
        defineField({ name: 'subtitle', type: 'text', title: 'Subtítulo', rows: 3 }),
        defineField({
          name: 'heroImage',
          type: 'image',
          title: 'Imagem hero',
          options: { hotspot: true },
        }),
      ],
    }),

    // ── 2. Quem somos ────────────────────────────────────────────────────────
    defineField({
      name: 'quemSomos',
      type: 'object',
      title: 'Quem somos',
      fields: [
        defineField({ name: 'eyebrow', type: 'string', title: 'Eyebrow' }),
        defineField({ name: 'titleStart', type: 'string', title: 'Título (início)' }),
        defineField({ name: 'titleHighlight', type: 'string', title: 'Título (destaque itálico)' }),
        defineField({ name: 'titleEnd', type: 'string', title: 'Título (fim)' }),
        defineField({ name: 'desc', type: 'text', title: 'Descrição', rows: 4 }),
        defineField({ name: 'missao', type: 'text', title: 'Missão', rows: 3 }),
        defineField({ name: 'visao', type: 'text', title: 'Visão', rows: 3 }),
        defineField({
          name: 'valores',
          type: 'array',
          title: 'Valores',
          of: [{
            type: 'object',
            fields: [
              { name: 'titulo', type: 'string' as const, title: 'Título' },
              { name: 'desc', type: 'text' as const, title: 'Descrição', rows: 2 },
            ],
            preview: { select: { title: 'titulo' } },
          }],
        }),
      ],
    }),

    // ── 3. Nossa história ────────────────────────────────────────────────────
    defineField({
      name: 'historia',
      type: 'object',
      title: 'Nossa história',
      fields: [
        defineField({ name: 'eyebrow', type: 'string', title: 'Eyebrow' }),
        defineField({ name: 'titleStart', type: 'string', title: 'Título (início)' }),
        defineField({ name: 'titleHighlight', type: 'string', title: 'Título (destaque itálico)' }),
        defineField({ name: 'titleEnd', type: 'string', title: 'Título (fim)' }),
        defineField({ name: 'desc', type: 'text', title: 'Descrição', rows: 3 }),
        defineField({
          name: 'eventos',
          type: 'array',
          title: 'Eventos da linha do tempo',
          of: [{
            type: 'object',
            fields: [
              { name: 'ano', type: 'string' as const, title: 'Ano' },
              { name: 'titulo', type: 'string' as const, title: 'Título' },
              { name: 'desc', type: 'text' as const, title: 'Descrição', rows: 2 },
            ],
            preview: { select: { title: 'ano', subtitle: 'titulo' } },
          }],
        }),
      ],
    }),

    // ── 4. Liderança ─────────────────────────────────────────────────────────
    defineField({
      name: 'lideranca',
      type: 'object',
      title: 'Liderança',
      fields: [
        defineField({ name: 'eyebrow', type: 'string', title: 'Eyebrow' }),
        defineField({ name: 'titleStart', type: 'string', title: 'Título (início)' }),
        defineField({ name: 'titleHighlight', type: 'string', title: 'Título (destaque itálico)' }),
        defineField({ name: 'desc', type: 'text', title: 'Descrição geral', rows: 3 }),

        // Sub-seção Diretoria
        defineField({ name: 'diretoriaLabel', type: 'string', title: 'Label diretoria' }),
        defineField({ name: 'diretoriaTitulo', type: 'string', title: 'Título diretoria' }),
        defineField({ name: 'diretoriaDesc', type: 'text', title: 'Descrição diretoria', rows: 2 }),
        defineField({
          name: 'diretoria',
          type: 'array',
          title: 'Diretoria executiva e gerências',
          of: [{ type: 'object', fields: pessoaFields, preview: pessoaPreview }],
        }),

        // Sub-seção Conselhos
        defineField({ name: 'conselhosLabel', type: 'string', title: 'Label conselhos' }),
        defineField({ name: 'conselhosTitulo', type: 'string', title: 'Título conselhos' }),
        defineField({ name: 'conselhosDesc', type: 'text', title: 'Descrição conselhos', rows: 2 }),

        defineField({
          name: 'conselhoDeliberativo',
          type: 'object',
          title: 'Conselho Deliberativo',
          fields: conselhoFields('Conselho Deliberativo'),
        }),
        defineField({
          name: 'conselhoFiscal',
          type: 'object',
          title: 'Conselho Fiscal',
          fields: conselhoFields('Conselho Fiscal'),
        }),
        defineField({
          name: 'conselhoTecnico',
          type: 'object',
          title: 'Conselho Técnico',
          fields: conselhoFields('Conselho Técnico'),
        }),
        defineField({
          name: 'juridico',
          type: 'object',
          title: 'Jurídico',
          fields: conselhoFields('Jurídico'),
        }),
      ],
    }),

    // ── 5. Relatório de atividades ───────────────────────────────────────────
    defineField({
      name: 'relatorio',
      type: 'object',
      title: 'Relatório de atividades',
      fields: [
        defineField({ name: 'eyebrow', type: 'string', title: 'Eyebrow' }),
        defineField({ name: 'titleStart', type: 'string', title: 'Título (início)' }),
        defineField({ name: 'titleHighlight', type: 'string', title: 'Título (destaque itálico)' }),
        defineField({ name: 'desc', type: 'text', title: 'Descrição', rows: 3 }),
        defineField({
          name: 'bigNumbers',
          type: 'array',
          title: 'Big numbers',
          of: [{
            type: 'object',
            fields: [
              { name: 'value', type: 'string' as const, title: 'Valor' },
              { name: 'label', type: 'string' as const, title: 'Label' },
            ],
            preview: { select: { title: 'value', subtitle: 'label' } },
          }],
        }),
        defineField({
          name: 'relatorios',
          type: 'array',
          title: 'Relatórios anuais',
          of: [{
            type: 'object',
            fields: [
              { name: 'ano', type: 'string' as const, title: 'Ano' },
              { name: 'destaque', type: 'string' as const, title: 'Destaque' },
              { name: 'resumo', type: 'text' as const, title: 'Resumo', rows: 2 },
              { name: 'pdfUrl', type: 'string' as const, title: 'URL do PDF' },
            ],
            preview: { select: { title: 'ano', subtitle: 'destaque' } },
          }],
        }),
      ],
    }),

    // ── 5b. Media Kit ────────────────────────────────────────────────────────
    defineField({
      name: 'mediaKit',
      type: 'object',
      title: 'Media Kit',
      fields: [
        defineField({ name: 'eyebrow', type: 'string', title: 'Eyebrow' }),
        defineField({ name: 'titleStart', type: 'string', title: 'Título (início)' }),
        defineField({ name: 'titleHighlight', type: 'string', title: 'Título (destaque itálico)' }),
        defineField({ name: 'desc', type: 'text', title: 'Descrição', rows: 3 }),
        defineField({ name: 'ctaLabel', type: 'string', title: 'Label do botão' }),
        defineField({
          name: 'ctaFile',
          type: 'file',
          title: 'Arquivo do mídia kit (.zip)',
          description: 'Envie o arquivo aqui — o botão passa a baixá-lo. Tem prioridade sobre a URL abaixo.',
          options: { accept: '.zip' },
        }),
        defineField({
          name: 'ctaHref',
          type: 'string',
          title: 'URL do download (alternativa)',
          description: 'Usada apenas se nenhum arquivo for enviado acima.',
        }),
      ],
    }),

    // ── 6. Estrutura ─────────────────────────────────────────────────────────
    defineField({
      name: 'estrutura',
      type: 'object',
      title: 'Estrutura',
      fields: [
        defineField({ name: 'eyebrow', type: 'string', title: 'Eyebrow' }),
        defineField({ name: 'titleStart', type: 'string', title: 'Título (início)' }),
        defineField({ name: 'titleHighlight', type: 'string', title: 'Título (destaque itálico)' }),
        defineField({ name: 'desc', type: 'text', title: 'Descrição', rows: 3 }),
        defineField({ name: 'badgeLabel', type: 'string', title: 'Badge label' }),
        defineField({
          name: 'estruturaImage',
          type: 'image',
          title: 'Imagem do edifício',
          options: { hotspot: true },
        }),
        defineField({ name: 'enderecoLabel', type: 'string', title: 'Label endereço' }),
        defineField({ name: 'enderecoLinhas', type: 'text', title: 'Endereço (uma linha por parágrafo)', rows: 3 }),
        defineField({
          name: 'items',
          type: 'array',
          title: 'Métricas da estrutura',
          of: [{
            type: 'object',
            fields: [
              { name: 'area', type: 'string' as const, title: 'Área / Métrica' },
              { name: 'desc', type: 'text' as const, title: 'Descrição', rows: 2 },
            ],
            preview: { select: { title: 'area', subtitle: 'desc' } },
          }],
        }),
      ],
    }),

    // ── 7. CTA Final ─────────────────────────────────────────────────────────
    defineField({
      name: 'ctaFinal',
      type: 'object',
      title: 'CTA Final',
      fields: [
        defineField({ name: 'eyebrow', type: 'string', title: 'Eyebrow' }),
        defineField({ name: 'titleStart', type: 'string', title: 'Título (início)' }),
        defineField({ name: 'titleHighlight', type: 'string', title: 'Título (destaque itálico)' }),
        defineField({ name: 'titleEnd', type: 'string', title: 'Título (fim)' }),
        defineField({ name: 'desc', type: 'text', title: 'Descrição', rows: 3 }),
        defineField({
          name: 'ctaPrimary',
          type: 'object',
          title: 'CTA Primário',
          fields: [
            defineField({ name: 'label', type: 'string', title: 'Label' }),
            defineField({ name: 'href', type: 'string', title: 'URL' }),
          ],
        }),
        defineField({
          name: 'ctaSecondary',
          type: 'object',
          title: 'CTA Secundário',
          fields: [
            defineField({ name: 'label', type: 'string', title: 'Label' }),
            defineField({ name: 'href', type: 'string', title: 'URL' }),
          ],
        }),
      ],
    }),
  ],
})
