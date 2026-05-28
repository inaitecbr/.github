import { defineField, defineType } from 'sanity'
import { UsersIcon } from '@sanity/icons'

export default defineType({
  name: 'bancoDeTalentos',
  title: 'Banco de Talentos (página)',
  type: 'document',
  icon: UsersIcon,
  groups: [
    { name: 'hero', title: 'Hero', default: true },
    { name: 'oQueE', title: 'O que é' },
    { name: 'candidatos', title: 'Para candidatos' },
    { name: 'empresas', title: 'Para empresas' },
    { name: 'numeros', title: 'Números' },
    { name: 'cta', title: 'CTA Final' },
  ],
  fields: [
    defineField({
      name: 'language',
      title: 'Idioma',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),

    // ── Hero ──────────────────────────────────────────────────────────
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
        defineField({ name: 'titleEnd', type: 'string', title: 'Título (fim)' }),
        defineField({ name: 'desc', type: 'text', title: 'Descrição', rows: 3 }),
        defineField({ name: 'ctaLabelCandidato', type: 'string', title: 'CTA label — "Sou candidato"' }),
        defineField({ name: 'ctaLabelEmpresa', type: 'string', title: 'CTA label — "Sou empresa"' }),
      ],
    }),

    // ── O que é ───────────────────────────────────────────────────────
    defineField({
      name: 'oQueE',
      title: 'O que é',
      type: 'object',
      group: 'oQueE',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({ name: 'eyebrow', type: 'string', title: 'Eyebrow' }),
        defineField({ name: 'titleStart', type: 'string', title: 'Título (início)' }),
        defineField({ name: 'titleHighlight', type: 'string', title: 'Título (destaque itálico)' }),
        defineField({ name: 'titleEnd', type: 'string', title: 'Título (fim)' }),
        defineField({
          name: 'paragraphs',
          title: 'Parágrafos',
          type: 'array',
          of: [{ type: 'text', rows: 4 }],
        }),
        defineField({ name: 'perfisBuscadosLabel', type: 'string', title: 'Label "Perfis mais buscados"' }),
        defineField({
          name: 'perfisBuscados',
          title: 'Perfis mais buscados',
          type: 'array',
          of: [{ type: 'string' }],
        }),
      ],
    }),

    // ── Para candidatos ───────────────────────────────────────────────
    defineField({
      name: 'paraCandidatos',
      title: 'Para candidatos',
      type: 'object',
      group: 'candidatos',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({ name: 'eyebrow', type: 'string', title: 'Eyebrow' }),
        defineField({ name: 'titleStart', type: 'string', title: 'Título (início)' }),
        defineField({ name: 'titleHighlight', type: 'string', title: 'Título (destaque itálico)' }),
        defineField({ name: 'titleEnd', type: 'string', title: 'Título (fim)' }),
        defineField({ name: 'desc', type: 'text', title: 'Descrição', rows: 3 }),
        defineField({ name: 'ctaLabelCurriculo', type: 'string', title: 'CTA label — "Cadastrar currículo"' }),
        defineField({ name: 'ctaLabelVagas', type: 'string', title: 'CTA label — "Ver vagas"' }),
        defineField({ name: 'ctaVagasTag', type: 'string', title: 'Tag do botão vagas (ex.: "Em breve")' }),
        defineField({
          name: 'passos',
          title: 'Passos (3 etapas)',
          type: 'array',
          of: [{
            type: 'object',
            name: 'passo',
            fields: [
              defineField({ name: 'titulo', type: 'string', title: 'Título' }),
              defineField({ name: 'desc', type: 'text', title: 'Descrição', rows: 2 }),
            ],
            preview: { select: { title: 'titulo', subtitle: 'desc' } },
          }],
        }),
      ],
    }),

    // ── Para empresas ─────────────────────────────────────────────────
    defineField({
      name: 'paraEmpresas',
      title: 'Para empresas',
      type: 'object',
      group: 'empresas',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({ name: 'eyebrow', type: 'string', title: 'Eyebrow' }),
        defineField({ name: 'titleStart', type: 'string', title: 'Título (início)' }),
        defineField({ name: 'titleHighlight', type: 'string', title: 'Título (destaque itálico)' }),
        defineField({ name: 'desc', type: 'text', title: 'Descrição', rows: 3 }),
        defineField({ name: 'ctaLabel', type: 'string', title: 'CTA label — "Cadastrar empresa"' }),
        defineField({
          name: 'passos',
          title: 'Passos (3 etapas)',
          type: 'array',
          of: [{
            type: 'object',
            name: 'passo',
            fields: [
              defineField({ name: 'titulo', type: 'string', title: 'Título' }),
              defineField({ name: 'desc', type: 'text', title: 'Descrição', rows: 2 }),
            ],
            preview: { select: { title: 'titulo', subtitle: 'desc' } },
          }],
        }),
        defineField({
          name: 'vantagens',
          title: 'Vantagens (cards)',
          type: 'array',
          of: [{
            type: 'object',
            name: 'vantagem',
            fields: [
              defineField({ name: 'titulo', type: 'string', title: 'Título' }),
              defineField({ name: 'desc', type: 'text', title: 'Descrição', rows: 2 }),
            ],
            preview: { select: { title: 'titulo', subtitle: 'desc' } },
          }],
        }),
      ],
    }),

    // ── Números ───────────────────────────────────────────────────────
    defineField({
      name: 'numeros',
      title: 'Números do programa',
      type: 'object',
      group: 'numeros',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({ name: 'eyebrow', type: 'string', title: 'Eyebrow' }),
        defineField({ name: 'titleStart', type: 'string', title: 'Título (início)' }),
        defineField({ name: 'titleHighlight', type: 'string', title: 'Título (destaque itálico)' }),
        defineField({ name: 'desc', type: 'text', title: 'Descrição', rows: 2 }),
        defineField({
          name: 'items',
          title: 'Números',
          type: 'array',
          of: [{
            type: 'object',
            name: 'numero',
            fields: [
              defineField({ name: 'valor', type: 'string', title: 'Valor (ex.: "+2.500")' }),
              defineField({ name: 'label', type: 'string', title: 'Label' }),
            ],
            preview: { select: { title: 'valor', subtitle: 'label' } },
          }],
        }),
      ],
    }),

    // ── CTA Final ─────────────────────────────────────────────────────
    defineField({
      name: 'ctaFinal',
      title: 'CTA Final',
      type: 'object',
      group: 'cta',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({ name: 'titleStart', type: 'string', title: 'Título (início)' }),
        defineField({ name: 'titleHighlight', type: 'string', title: 'Título (destaque itálico)' }),
        defineField({ name: 'titleEnd', type: 'string', title: 'Título (fim)' }),
        defineField({ name: 'desc', type: 'text', title: 'Descrição', rows: 2 }),
        defineField({ name: 'labelCandidato', type: 'string', title: 'Label CTA candidato' }),
        defineField({ name: 'labelEmpresa', type: 'string', title: 'Label CTA empresa' }),
      ],
    }),
  ],
  preview: {
    select: { language: 'language' },
    prepare({ language }) {
      return {
        title: 'Banco de Talentos',
        subtitle: language ? `[${String(language).toUpperCase()}]` : '',
      }
    },
  },
})
