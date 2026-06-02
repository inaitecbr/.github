import { defineArrayMember, defineField, defineType } from 'sanity'

/**
 * Coleção editorial de Notícias / Conteúdo (Portal de Conteúdo — /conteudo).
 *
 * i18n via @sanity/document-internationalization (PT padrão; EN/ES pelo botão "Translations").
 * O conteúdo real é migrado do site antigo (inaitec.com.br/noticias) via scripts/migrate-noticias.ts.
 *
 * O campo `body` é Portable Text rico — o cliente edita H1/H2/H3/H4, negrito, itálico,
 * listas, citações, links e imagens inline diretamente no Studio.
 */
export default defineType({
  name: 'post',
  title: 'Notícia / Conteúdo',
  type: 'document',
  fields: [
    defineField({
      name: 'language',
      title: 'Idioma',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (igual em todos os idiomas)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: async (slug, context) => {
          const { document, getClient } = context
          const client = getClient({ apiVersion: '2024-01-01' })
          const id = document?._id?.replace(/^drafts\./, '') ?? ''
          const lang = (document as { language?: string } | undefined)?.language ?? 'pt'
          const count = await client.fetch<number>(
            'count(*[_type == $type && language == $lang && slug.current == $slug && !(_id in [$id, "drafts." + $id])])',
            { type: document?._type ?? 'post', lang, slug, id },
          )
          return count === 0
        },
      },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'category',
      title: 'Categoria',
      type: 'string',
      description: 'Usada nos filtros e badges do Portal de Conteúdo.',
      options: {
        list: [
          { title: 'Notícias', value: 'Notícias' },
          { title: 'Cases', value: 'Cases' },
          { title: 'Conquistas', value: 'Conquistas' },
          { title: 'Eventos', value: 'Eventos' },
        ],
      },
      initialValue: 'Notícias',
    }),
    defineField({
      name: 'mainImage',
      title: 'Imagem de capa',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Texto alternativo', type: 'string' })],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Data de publicação',
      type: 'datetime',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Resumo',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'author',
      title: 'Autor',
      type: 'string',
      description: 'Opcional. Nome do autor (quando informado).',
    }),
    defineField({
      name: 'featured',
      title: 'Destaque',
      type: 'boolean',
      description: 'Aparece como card grande no topo do Portal de Conteúdo.',
      initialValue: false,
    }),
    defineField({
      name: 'body',
      title: 'Corpo',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'Parágrafo', value: 'normal' },
            { title: 'Título 1', value: 'h1' },
            { title: 'Título 2', value: 'h2' },
            { title: 'Título 3', value: 'h3' },
            { title: 'Título 4', value: 'h4' },
            { title: 'Citação', value: 'blockquote' },
          ],
          lists: [
            { title: 'Lista', value: 'bullet' },
            { title: 'Lista numerada', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Negrito', value: 'strong' },
              { title: 'Itálico', value: 'em' },
              { title: 'Sublinhado', value: 'underline' },
            ],
            annotations: [
              defineArrayMember({
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  defineField({
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (R) =>
                      R.uri({ scheme: ['http', 'https', 'mailto', 'tel'] }),
                  }),
                ],
              }),
            ],
          },
        }),
        defineArrayMember({
          type: 'image',
          title: 'Imagem',
          options: { hotspot: true },
          fields: [defineField({ name: 'alt', title: 'Texto alternativo', type: 'string' })],
        }),
      ],
    }),
    defineField({
      name: 'legacyId',
      title: 'ID legado',
      type: 'number',
      readOnly: true,
      description: 'ID numérico do artigo no site antigo (rastreio da migração).',
    }),
    defineField({
      name: 'legacyUrl',
      title: 'URL legada',
      type: 'url',
      readOnly: true,
    }),
  ],
  orderings: [
    {
      title: 'Data (mais recente)',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'category', media: 'mainImage' },
  },
})
