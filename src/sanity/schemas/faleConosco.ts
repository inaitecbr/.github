import { defineField, defineType } from 'sanity'
import { EnvelopeIcon } from '@sanity/icons'

export default defineType({
  name: 'faleConosco',
  title: 'Fale Conosco (página)',
  type: 'document',
  icon: EnvelopeIcon,
  groups: [
    { name: 'hero', title: 'Hero', default: true },
    { name: 'canais', title: 'Canais de contato' },
    { name: 'endereco', title: 'Endereço / Mapa' },
    { name: 'faq', title: 'FAQ' },
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
        defineField({ name: 'desc', type: 'text', title: 'Descrição', rows: 3 }),
        defineField({ name: 'emailContato', type: 'string', title: 'E-mail de contato (exibido abaixo da desc)' }),
      ],
    }),

    // ── Canais de contato ─────────────────────────────────────────────
    defineField({
      name: 'canais',
      title: 'Canais de contato',
      type: 'object',
      group: 'canais',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({ name: 'eyebrow', type: 'string', title: 'Eyebrow' }),
        defineField({ name: 'titleStart', type: 'string', title: 'Título (início)' }),
        defineField({ name: 'titleHighlight', type: 'string', title: 'Título (destaque itálico)' }),
        defineField({ name: 'titleEnd', type: 'string', title: 'Título (fim)' }),
        defineField({ name: 'desc', type: 'text', title: 'Descrição', rows: 2 }),
        defineField({
          name: 'items',
          title: 'Canais',
          type: 'array',
          of: [{
            type: 'object',
            name: 'canal',
            fields: [
              defineField({ name: 'titulo', type: 'string', title: 'Título' }),
              defineField({ name: 'desc', type: 'text', title: 'Descrição', rows: 2 }),
              defineField({ name: 'email', type: 'string', title: 'E-mail' }),
              defineField({ name: 'whatsapp', type: 'string', title: 'WhatsApp (opcional, ex.: +55 48 3234-5678)' }),
              defineField({ name: 'horario', type: 'string', title: 'Horário' }),
              defineField({
                name: 'iconName',
                type: 'string',
                title: 'Ícone',
                options: {
                  list: [
                    { title: 'MessageCircle (Atendimento geral)', value: 'MessageCircle' },
                    { title: 'Newspaper (Imprensa)', value: 'Newspaper' },
                    { title: 'Users (Parcerias)', value: 'Users' },
                    { title: 'Building2 (Empresas instaladas)', value: 'Building2' },
                  ],
                },
              }),
            ],
            preview: { select: { title: 'titulo', subtitle: 'email' } },
          }],
        }),
      ],
    }),

    // ── Endereço / Mapa ───────────────────────────────────────────────
    defineField({
      name: 'endereco',
      title: 'Endereço / Mapa',
      type: 'object',
      group: 'endereco',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({ name: 'eyebrow', type: 'string', title: 'Eyebrow' }),
        defineField({ name: 'titleStart', type: 'string', title: 'Título (início)' }),
        defineField({ name: 'titleHighlight', type: 'string', title: 'Título (destaque itálico)' }),
        defineField({ name: 'desc', type: 'text', title: 'Descrição', rows: 3 }),
        defineField({ name: 'logradouro', type: 'string', title: 'Logradouro (ex.: Av. Pedra Branca, 25)' }),
        defineField({ name: 'complemento', type: 'string', title: 'Complemento (ex.: Cidade Universitária · Palhoça — SC)' }),
        defineField({ name: 'mapaEmbedUrl', type: 'url', title: 'URL do embed do Google Maps' }),
        defineField({ name: 'mapaTitle', type: 'string', title: 'Título acessível do iframe do mapa' }),
      ],
    }),

    // ── FAQ ───────────────────────────────────────────────────────────
    defineField({
      name: 'faq',
      title: 'FAQ',
      type: 'object',
      group: 'faq',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({ name: 'eyebrow', type: 'string', title: 'Eyebrow' }),
        defineField({ name: 'titleStart', type: 'string', title: 'Título (início)' }),
        defineField({ name: 'titleHighlight', type: 'string', title: 'Título (destaque itálico)' }),
        defineField({ name: 'desc', type: 'text', title: 'Descrição', rows: 2 }),
        defineField({
          name: 'items',
          title: 'Perguntas e Respostas',
          type: 'array',
          of: [{
            type: 'object',
            name: 'faqItem',
            fields: [
              defineField({ name: 'q', type: 'string', title: 'Pergunta' }),
              defineField({ name: 'a', type: 'text', title: 'Resposta', rows: 3 }),
            ],
            preview: { select: { title: 'q' } },
          }],
        }),
      ],
    }),
  ],
  preview: {
    select: { language: 'language' },
    prepare({ language }) {
      return {
        title: 'Fale Conosco',
        subtitle: language ? `[${String(language).toUpperCase()}]` : '',
      }
    },
  },
})
