import { defineField, defineType } from 'sanity'

// Campos reutilizáveis para ctaFinal — usados aqui e em outros schemas
export const ctaFinalFields = [
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
]

export default defineType({
  name: 'empresasInstaladas',
  title: 'Empresas Instaladas',
  type: 'document',
  fields: [
    defineField({
      name: 'language',
      title: 'Idioma',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),

    // ── Hero ─────────────────────────────────────────────────────────
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({ name: 'eyebrow', type: 'string', title: 'Eyebrow' }),
        defineField({ name: 'titleStart', type: 'string', title: 'Título (início)' }),
        defineField({ name: 'titleHighlight', type: 'string', title: 'Título (destaque itálico)' }),
        defineField({ name: 'subtitle', type: 'text', title: 'Subtítulo', rows: 3 }),
      ],
    }),

    // ── CTA Final ────────────────────────────────────────────────────
    defineField({
      name: 'ctaFinal',
      type: 'object',
      title: 'CTA Final',
      options: { collapsible: true, collapsed: true },
      fields: ctaFinalFields,
    }),
  ],
  preview: {
    select: { language: 'language' },
    prepare({ language }) {
      return {
        title: 'Empresas Instaladas',
        subtitle: language ? `[${String(language).toUpperCase()}]` : '',
      }
    },
  },
})
