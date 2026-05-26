import { defineType, defineField } from 'sanity'
import { RocketIcon } from '@sanity/icons'

const PUBLICOS = [
  { title: 'Startups e Pequenas Empresas', value: 'startups' },
  { title: 'Grandes e Médias Empresas', value: 'empresas' },
  { title: 'Universidades e Governo', value: 'universidades' },
  { title: 'Investidores', value: 'investidores' },
]

const ESTAGIOS = [
  { title: 'Ideação', value: 'ideacao' },
  { title: 'Pré-aceleração', value: 'pre-aceleracao' },
  { title: 'Aceleração', value: 'aceleracao' },
  { title: 'Crescimento', value: 'crescimento' },
  { title: 'Internacionalização', value: 'internacionalizacao' },
  { title: 'Pesquisa', value: 'pesquisa' },
  { title: 'Operação', value: 'operacao' },
]

const ENTRADAS = [
  { title: 'Edital', value: 'edital' },
  { title: 'Inscrição contínua', value: 'inscricao-continua' },
  { title: 'Convite', value: 'convite' },
  { title: 'Parceria', value: 'parceria' },
]

const STATUSES = [
  { title: 'Inscrições abertas', value: 'aberta' },
  { title: 'Inscrições em breve', value: 'em-breve' },
  { title: 'Inscrições encerradas', value: 'fechada' },
  { title: 'Fluxo contínuo', value: 'fluxo-continuo' },
]

export default defineType({
  name: 'programa',
  title: 'Programa',
  type: 'document',
  icon: RocketIcon,
  groups: [
    { name: 'catalog', title: 'Catálogo (card + filtros)', default: true },
    { name: 'detail', title: 'Página de detalhe' },
  ],
  fields: [
    defineField({
      name: 'language',
      title: 'Idioma',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),

    // ─── Catálogo (card + filtros) ───
    defineField({
      name: 'slug',
      title: 'Slug (igual em todos os idiomas)',
      description: 'Identificador único na URL — ex.: acelera-pedra-branca',
      type: 'slug',
      group: 'catalog',
      options: {
        source: 'name',
        maxLength: 80,
        // Slug deve ser único POR IDIOMA — versões PT/EN/ES do mesmo programa compartilham o slug.
        isUnique: async (slug, context) => {
          const { document, getClient } = context
          const client = getClient({ apiVersion: '2024-01-01' })
          const id = document?._id?.replace(/^drafts\./, '') ?? ''
          const lang = (document as { language?: string } | undefined)?.language ?? 'pt'
          const count = await client.fetch<number>(
            'count(*[_type == $type && language == $lang && slug.current == $slug && !(_id in [$id, "drafts." + $id])])',
            { type: document?._type ?? 'programa', lang, slug, id },
          )
          return count === 0
        },
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'name',
      title: 'Nome do programa',
      type: 'string',
      group: 'catalog',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'desc',
      title: 'Descrição curta (card)',
      description: '1–2 linhas — usado no card do catálogo e na home.',
      type: 'text',
      rows: 3,
      group: 'catalog',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Imagem do programa',
      description: 'Recomendado: 1200×800. Faça upload aqui — substitui o asset estático.',
      type: 'image',
      group: 'catalog',
      options: { hotspot: true },
    }),
    defineField({
      name: 'publicoKey',
      title: 'Público',
      description: 'Define a cor do badge e o pilar do programa.',
      type: 'string',
      group: 'catalog',
      options: { list: PUBLICOS, layout: 'dropdown' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'estagioKey',
      title: 'Estágio',
      type: 'string',
      group: 'catalog',
      options: { list: ESTAGIOS, layout: 'dropdown' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'entradaKey',
      title: 'Modelo de entrada',
      type: 'string',
      group: 'catalog',
      options: { list: ENTRADAS, layout: 'dropdown' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'statusKey',
      title: 'Status das inscrições',
      type: 'string',
      group: 'catalog',
      options: { list: STATUSES, layout: 'dropdown' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'deadline',
      title: 'Deadline (apenas se status = Inscrições abertas)',
      description: 'Usado pelo countdown na seção "Chamadas em destaque".',
      type: 'datetime',
      group: 'catalog',
      hidden: ({ parent }) => parent?.statusKey !== 'aberta',
    }),

    // ─── Página de detalhe ───
    defineField({
      name: 'longDesc',
      title: 'Descrição estendida (hero da página)',
      description: 'Pitch longo usado no hero — fallback: usa "Descrição curta".',
      type: 'text',
      rows: 4,
      group: 'detail',
    }),
    defineField({
      name: 'quickFacts',
      title: 'Quick facts (barra abaixo do hero)',
      type: 'array',
      group: 'detail',
      of: [
        {
          type: 'object',
          name: 'quickFact',
          fields: [
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'value', title: 'Valor', type: 'string' },
          ],
          preview: { select: { title: 'label', subtitle: 'value' } },
        },
      ],
    }),
    defineField({
      name: 'oQueE',
      title: 'O que é o programa (parágrafos)',
      type: 'array',
      group: 'detail',
      of: [{ type: 'text', rows: 4 }],
    }),
    defineField({
      name: 'highlight',
      title: 'Frase de impacto / quote em destaque',
      type: 'text',
      rows: 2,
      group: 'detail',
    }),
    defineField({
      name: 'paraQuem',
      title: 'Para quem é (critérios)',
      type: 'array',
      group: 'detail',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'beneficios',
      title: 'Benefícios — O que você ganha',
      type: 'array',
      group: 'detail',
      of: [
        {
          type: 'object',
          name: 'beneficio',
          fields: [
            { name: 'titulo', title: 'Título', type: 'string' },
            { name: 'desc', title: 'Descrição', type: 'text', rows: 2 },
          ],
          preview: { select: { title: 'titulo', subtitle: 'desc' } },
        },
      ],
    }),
    defineField({
      name: 'etapas',
      title: 'Etapas do processo / jornada',
      type: 'array',
      group: 'detail',
      of: [
        {
          type: 'object',
          name: 'etapa',
          fields: [
            { name: 'titulo', title: 'Título', type: 'string' },
            { name: 'desc', title: 'Descrição', type: 'text', rows: 2 },
            { name: 'duracao', title: 'Duração', type: 'string' },
          ],
          preview: { select: { title: 'titulo', subtitle: 'duracao' } },
        },
      ],
    }),
    defineField({
      name: 'stats',
      title: 'Stats / track record',
      type: 'array',
      group: 'detail',
      of: [
        {
          type: 'object',
          name: 'stat',
          fields: [
            { name: 'value', title: 'Valor (ex.: "+120")', type: 'string' },
            { name: 'label', title: 'Label', type: 'string' },
          ],
          preview: { select: { title: 'value', subtitle: 'label' } },
        },
      ],
    }),
    defineField({
      name: 'cases',
      title: 'Cases de empresas',
      type: 'array',
      group: 'detail',
      of: [
        {
          type: 'object',
          name: 'programaCase',
          fields: [
            { name: 'nome', title: 'Nome da empresa', type: 'string' },
            { name: 'setor', title: 'Setor', type: 'string' },
            { name: 'logo', title: 'Logo', type: 'image' },
            { name: 'foto', title: 'Foto da pessoa', type: 'image' },
            { name: 'quote', title: 'Quote', type: 'text', rows: 3 },
            { name: 'pessoa', title: 'Nome da pessoa', type: 'string' },
            { name: 'cargo', title: 'Cargo', type: 'string' },
            {
              name: 'metricas',
              title: 'Métricas',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'caseMetrica',
                  fields: [
                    { name: 'label', title: 'Label', type: 'string' },
                    { name: 'value', title: 'Valor', type: 'string' },
                  ],
                  preview: { select: { title: 'value', subtitle: 'label' } },
                },
              ],
            },
          ],
          preview: { select: { title: 'nome', subtitle: 'setor', media: 'logo' } },
        },
      ],
    }),
    defineField({
      name: 'faq',
      title: 'FAQ específico do programa',
      type: 'array',
      group: 'detail',
      of: [
        {
          type: 'object',
          name: 'programaFaq',
          fields: [
            { name: 'q', title: 'Pergunta', type: 'string' },
            { name: 'a', title: 'Resposta', type: 'text', rows: 3 },
          ],
          preview: { select: { title: 'q', subtitle: 'a' } },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'publicoKey',
      language: 'language',
      media: 'image',
    },
    prepare({ title, subtitle, language, media }) {
      const langLabel = language ? `[${String(language).toUpperCase()}]` : ''
      const publico = PUBLICOS.find((p) => p.value === subtitle)?.title ?? subtitle
      return {
        title: title || 'Programa',
        subtitle: [langLabel, publico].filter(Boolean).join(' · '),
        media,
      }
    },
  },
})
