import { defineField, defineType } from 'sanity'

const ESTAGIOS = ['Startup', 'Scale-up', 'Corporação'] as const

const STATUSES = ['Ativa', 'Em expansão', 'Recém-investida'] as const

export default defineType({
  name: 'empresa',
  title: 'Empresa',
  type: 'document',
  fields: [
    defineField({
      name: 'language',
      title: 'Idioma',
      type: 'string',
      readOnly: true,
      hidden: true,
      // Sem isso, empresas criadas pelo "+" da lista do Studio nascem sem
      // idioma e somem da listagem (que filtra language == "pt").
      initialValue: 'pt',
    }),
    defineField({
      name: 'nome',
      title: 'Nome',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (igual em todos os idiomas)',
      type: 'slug',
      options: {
        source: 'nome',
        // Slug deve ser único POR IDIOMA — versões PT/EN/ES da mesma empresa compartilham o slug.
        isUnique: async (slug, context) => {
          const { document, getClient } = context
          const client = getClient({ apiVersion: '2024-01-01' })
          const id = document?._id?.replace(/^drafts\./, '') ?? ''
          const lang = (document as { language?: string } | undefined)?.language ?? 'pt'
          const count = await client.fetch<number>(
            'count(*[_type == $type && language == $lang && slug.current == $slug && !(_id in [$id, "drafts." + $id])])',
            { type: document?._type ?? 'empresa', lang, slug, id },
          )
          return count === 0
        },
      },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'setor',
      title: 'Setor',
      description: 'Setores são gerenciados na seção "Setores" do Studio — adicione novos por lá.',
      type: 'reference',
      to: [{ type: 'setor' }],
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'estagio',
      title: 'Estágio',
      type: 'string',
      options: { list: ESTAGIOS.map((e) => ({ title: e, value: e })) },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'fundada',
      title: 'Ano de fundação',
      type: 'number',
      validation: (R) => R.required().min(1900).max(2100),
    }),
    defineField({
      name: 'desc',
      title: 'Descrição curta (card)',
      type: 'text',
      rows: 3,
      validation: (R) => R.required().max(200),
    }),
    defineField({
      name: 'longDesc',
      title: 'Descrição completa (modal)',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'website',
      title: 'Website',
      type: 'url',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: { list: STATUSES.map((s) => ({ title: s, value: s })) },
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: false },
    }),
    defineField({
      name: 'foto',
      title: 'Foto do fundador/equipe',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'fundador',
      title: 'Fundador',
      type: 'object',
      fields: [
        defineField({ name: 'nome', title: 'Nome', type: 'string' }),
        defineField({ name: 'titulo', title: 'Título', type: 'string' }),
      ],
    }),
    defineField({
      name: 'investimento',
      title: 'Investimento inicial',
      type: 'object',
      fields: [
        defineField({ name: 'rodada', title: 'Rodada', type: 'string' }),
        defineField({ name: 'ano', title: 'Ano', type: 'number' }),
      ],
    }),
    defineField({
      name: 'investidores',
      title: 'Investidores',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
  preview: {
    select: { title: 'nome', subtitle: 'setor.nome', media: 'logo' },
  },
  orderings: [
    { title: 'Nome A→Z', name: 'nomeAsc', by: [{ field: 'nome', direction: 'asc' }] },
    { title: 'Fundação (mais recente)', name: 'fundadaDesc', by: [{ field: 'fundada', direction: 'desc' }] },
  ],
})
