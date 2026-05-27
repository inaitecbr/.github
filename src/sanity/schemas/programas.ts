import { defineField, defineType } from 'sanity'
import { RocketIcon } from '@sanity/icons'
import { ctaFinalFields } from './empresasInstaladas'

export default defineType({
  name: 'programas',
  title: 'Programas (página)',
  type: 'document',
  icon: RocketIcon,
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
        defineField({ name: 'titleStart', type: 'string', title: 'Título (início) — ex.: "12 programas, 4 pilares."' }),
        defineField({ name: 'titleHighlight', type: 'string', title: 'Título (destaque itálico) — ex.: "Um ecossistema"' }),
        defineField({ name: 'subtitle', type: 'text', title: 'Subtítulo', rows: 3 }),
        defineField({
          name: 'heroImage',
          title: 'Imagem hero',
          type: 'image',
          options: { hotspot: true },
        }),
      ],
    }),

    // ── CTA Final ────────────────────────────────────────────────────
    defineField({
      name: 'ctaFinal',
      title: 'CTA Final',
      type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: ctaFinalFields,
    }),
  ],
  preview: {
    select: { language: 'language' },
    prepare({ language }) {
      return {
        title: 'Programas',
        subtitle: language ? `[${String(language).toUpperCase()}]` : '',
      }
    },
  },
})
