import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'portalConteudo',
  title: 'Portal de Conteúdo',
  type: 'document',
  groups: [{ name: 'hero', title: 'Hero', default: true }],
  fields: [
    defineField({
      name: 'language',
      title: 'Idioma',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),

    // ── Hero ──────────────────────────────────────────────────────────────────
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      group: 'hero',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({ name: 'eyebrow', type: 'string', title: 'Eyebrow' }),
        defineField({ name: 'titleStart', type: 'string', title: 'Título (início)' }),
        defineField({ name: 'titleHighlight', type: 'string', title: 'Título (destaque itálico)' }),
        defineField({ name: 'desc', type: 'text', rows: 2, title: 'Descrição' }),
      ],
    }),
  ],
  preview: {
    select: { language: 'language' },
    prepare: ({ language }: { language?: string }) => ({
      title: 'Portal de Conteúdo',
      subtitle: language?.toUpperCase() ?? 'PT',
    }),
  },
})
