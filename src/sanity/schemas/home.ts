import { defineType, defineField } from 'sanity'
import { HomeIcon } from '@sanity/icons'

export default defineType({
  name: 'home',
  title: 'Home',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'language',
      title: 'Idioma',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: 'video',
          title: 'Vídeo de fundo',
          description: 'MP4 em loop, sem áudio. Recomendado: 1920×1080, até 10 MB.',
          type: 'file',
          options: { accept: 'video/mp4,video/webm' },
        }),
        defineField({
          name: 'titleStart',
          title: 'Título — primeira parte',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'titleHighlight',
          title: 'Título — destaque (renderizado em itálico laranja)',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'subtitle',
          title: 'Subtítulo',
          type: 'text',
          rows: 3,
        }),
        defineField({
          name: 'ctaPrimary',
          title: 'CTA Primário',
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Texto do botão', type: 'string' }),
            defineField({ name: 'href', title: 'Link', type: 'string' }),
          ],
        }),
        defineField({
          name: 'ctaSecondary',
          title: 'CTA Secundário',
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Texto do botão', type: 'string' }),
            defineField({ name: 'href', title: 'Link', type: 'string' }),
          ],
        }),
        defineField({
          name: 'metrics',
          title: 'Métricas (4 itens)',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'value', title: 'Valor', type: 'string' },
                { name: 'label', title: 'Label', type: 'string' },
              ],
              preview: {
                select: { title: 'value', subtitle: 'label' },
              },
            },
          ],
          validation: (Rule) => Rule.max(4),
        }),
      ],
    }),
    defineField({
      name: 'parceiros',
      title: 'Parceiros',
      type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({
          name: 'title',
          title: 'Título — primeira parte',
          type: 'string',
        }),
        defineField({
          name: 'titleHighlight',
          title: 'Título — destaque (itálico laranja)',
          type: 'string',
        }),
        defineField({
          name: 'groups',
          title: 'Grupos de parceiros',
          description: 'Ex.: Mantenedores, Apoiadores',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'parceiroGroup',
              fields: [
                {
                  name: 'label',
                  title: 'Nome do grupo',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: 'logos',
                  title: 'Logos',
                  type: 'array',
                  of: [
                    {
                      type: 'object',
                      name: 'parceiroLogo',
                      fields: [
                        {
                          name: 'alt',
                          title: 'Texto alternativo',
                          type: 'string',
                          validation: (Rule) => Rule.required(),
                        },
                        {
                          name: 'image',
                          title: 'Imagem',
                          type: 'image',
                          options: { hotspot: false },
                          validation: (Rule) => Rule.required(),
                        },
                      ],
                      preview: {
                        select: { title: 'alt', media: 'image' },
                      },
                    },
                  ],
                },
              ],
              preview: {
                select: { title: 'label', logosCount: 'logos.length' },
                prepare({ title, logosCount }) {
                  return {
                    title: title || 'Grupo',
                    subtitle: logosCount ? `${logosCount} logo(s)` : '',
                  }
                },
              },
            },
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'hero.titleStart',
      highlight: 'hero.titleHighlight',
      language: 'language',
    },
    prepare({ title, highlight, language }) {
      const langLabel = language ? `[${String(language).toUpperCase()}]` : ''
      const fullTitle = [title, highlight].filter(Boolean).join(' ')
      return {
        title: fullTitle || 'Home',
        subtitle: langLabel,
      }
    },
  },
})
