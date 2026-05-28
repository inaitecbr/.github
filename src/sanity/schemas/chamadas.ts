import { defineField, defineType } from 'sanity'
import { SearchIcon } from '@sanity/icons'
import { ctaFinalFields } from './empresasInstaladas'

export default defineType({
  name: 'chamadas',
  title: 'Chamadas Abertas (página)',
  type: 'document',
  icon: SearchIcon,
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
        defineField({ name: 'desc', type: 'text', title: 'Descrição', rows: 3 }),
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
        title: 'Chamadas Abertas',
        subtitle: language ? `[${String(language).toUpperCase()}]` : '',
      }
    },
  },
})
