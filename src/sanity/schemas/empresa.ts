import { defineField, defineType } from 'sanity'

const SETORES = [
  'AgTech',
  'FinTech',
  'HealthTech',
  'EdTech',
  'RetailTech',
  'B2B SaaS',
  'CleanTech',
  'LogTech',
  'GovTech',
  'Cibersegurança',
] as const

const ESTAGIOS = ['Startup', 'Scale-up', 'Corporação'] as const

const STATUSES = ['Ativa', 'Em expansão', 'Recém-investida'] as const

export default defineType({
  name: 'empresa',
  title: 'Empresa',
  type: 'document',
  fields: [
    defineField({
      name: 'nome',
      title: 'Nome',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'nome' },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'setor',
      title: 'Setor',
      type: 'string',
      options: { list: SETORES.map((s) => ({ title: s, value: s })) },
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
    select: { title: 'nome', subtitle: 'setor', media: 'logo' },
  },
  orderings: [
    { title: 'Nome A→Z', name: 'nomeAsc', by: [{ field: 'nome', direction: 'asc' }] },
    { title: 'Fundação (mais recente)', name: 'fundadaDesc', by: [{ field: 'fundada', direction: 'desc' }] },
  ],
})
