import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'tragaSuaEmpresa',
  type: 'document',
  title: 'Traga sua empresa',
  fields: [
    defineField({ name: 'language', type: 'string', readOnly: true, hidden: true }),

    // ── 1. Hero ──────────────────────────────────────────────────────────────
    defineField({
      name: 'hero',
      type: 'object',
      title: 'Hero',
      fields: [
        defineField({ name: 'titleStart', type: 'string', title: 'Título (início)' }),
        defineField({ name: 'titleHighlight', type: 'string', title: 'Título (destaque itálico)' }),
        defineField({ name: 'titleEnd', type: 'string', title: 'Título (fim)' }),
        defineField({ name: 'subtitle', type: 'text', title: 'Subtítulo', rows: 3 }),
        defineField({
          name: 'ctaPrimary',
          type: 'object',
          title: 'CTA Primário',
          fields: [
            defineField({ name: 'label', type: 'string' }),
            defineField({ name: 'href', type: 'string' }),
          ],
        }),
        defineField({
          name: 'ctaSecondary',
          type: 'object',
          title: 'CTA Secundário',
          fields: [
            defineField({ name: 'label', type: 'string' }),
            defineField({ name: 'href', type: 'string' }),
          ],
        }),
        defineField({
          name: 'heroImage',
          type: 'image',
          title: 'Imagem hero',
          options: { hotspot: true },
        }),
        defineField({ name: 'heroBadgeLabel', type: 'string', title: 'Badge da imagem (ex: Vagas disponíveis)' }),
      ],
    }),

    // ── 2. Perks ─────────────────────────────────────────────────────────────
    defineField({
      name: 'perks',
      type: 'object',
      title: 'Perks exclusivos',
      fields: [
        defineField({ name: 'eyebrow', type: 'string', title: 'Eyebrow' }),
        defineField({ name: 'titleStart', type: 'string', title: 'Título (início)' }),
        defineField({ name: 'titleHighlight', type: 'string', title: 'Título (destaque itálico)' }),
        defineField({ name: 'titleEnd', type: 'string', title: 'Título (fim)' }),
        defineField({ name: 'desc', type: 'text', title: 'Descrição', rows: 3 }),
        defineField({
          name: 'items',
          type: 'array',
          title: 'Itens de perks',
          of: [{
            type: 'object',
            fields: [
              { name: 'nome', type: 'string' as const, title: 'Nome da ferramenta' },
              { name: 'logo', type: 'image' as const, title: 'Logo', options: { hotspot: false } },
              { name: 'desc', type: 'string' as const, title: 'Descrição do benefício' },
            ],
            preview: { select: { title: 'nome', subtitle: 'desc' } },
          }],
        }),
      ],
    }),

    // ── 3. Benefícios ────────────────────────────────────────────────────────
    defineField({
      name: 'beneficios',
      type: 'object',
      title: 'Benefícios da residência',
      fields: [
        defineField({ name: 'eyebrow', type: 'string', title: 'Eyebrow' }),
        defineField({ name: 'titleStart', type: 'string', title: 'Título (início)' }),
        defineField({ name: 'titleHighlight', type: 'string', title: 'Título (destaque itálico)' }),
        defineField({ name: 'titleEnd', type: 'string', title: 'Título (fim)' }),
        defineField({
          name: 'items',
          type: 'array',
          title: 'Benefícios',
          of: [{
            type: 'object',
            fields: [
              { name: 'titulo', type: 'string' as const, title: 'Título' },
              { name: 'desc', type: 'text' as const, title: 'Descrição', rows: 2 },
            ],
            preview: { select: { title: 'titulo' } },
          }],
        }),
      ],
    }),

    // ── 4. Infraestrutura ────────────────────────────────────────────────────
    defineField({
      name: 'infraestrutura',
      type: 'object',
      title: 'Infraestrutura',
      fields: [
        defineField({ name: 'eyebrow', type: 'string', title: 'Eyebrow' }),
        defineField({ name: 'titleStart', type: 'string', title: 'Título (início)' }),
        defineField({ name: 'titleHighlight', type: 'string', title: 'Título (destaque itálico)' }),
        defineField({ name: 'titleEnd', type: 'string', title: 'Título (fim)' }),
        defineField({ name: 'desc', type: 'text', title: 'Descrição', rows: 3 }),
        defineField({ name: 'tourCtaLabel', type: 'string', title: 'Label CTA tour' }),
        defineField({ name: 'tourCtaHref', type: 'string', title: 'URL CTA tour' }),
        defineField({
          name: 'espacos',
          type: 'array',
          title: 'Espaços',
          of: [{
            type: 'object',
            fields: [
              { name: 'nome', type: 'string' as const, title: 'Nome' },
              { name: 'metragem', type: 'string' as const, title: 'Metragem / Capacidade' },
              { name: 'desc', type: 'text' as const, title: 'Descrição', rows: 2 },
              { name: 'foto', type: 'image' as const, title: 'Foto', options: { hotspot: true } },
            ],
            preview: { select: { title: 'nome', subtitle: 'metragem' } },
          }],
        }),
        defineField({
          name: 'localizacao',
          type: 'object',
          title: 'Bloco de localização',
          fields: [
            defineField({ name: 'eyebrow', type: 'string', title: 'Eyebrow' }),
            defineField({ name: 'endereco', type: 'string', title: 'Endereço' }),
            defineField({ name: 'distancias', type: 'string', title: 'Distâncias' }),
            defineField({ name: 'ctaLabel', type: 'string', title: 'Label do botão' }),
            defineField({ name: 'ctaHref', type: 'string', title: 'URL do botão' }),
          ],
        }),
      ],
    }),

    // ── 5. Por que ───────────────────────────────────────────────────────────
    defineField({
      name: 'porQue',
      type: 'object',
      title: 'Por que fazer parte',
      fields: [
        defineField({ name: 'eyebrow', type: 'string', title: 'Eyebrow' }),
        defineField({ name: 'titleStart', type: 'string', title: 'Título (início)' }),
        defineField({ name: 'titleHighlight', type: 'string', title: 'Título (destaque itálico)' }),
        defineField({ name: 'titleEnd', type: 'string', title: 'Título (fim)' }),
        defineField({
          name: 'porQueImage',
          type: 'image',
          title: 'Imagem da coluna esquerda',
          options: { hotspot: true },
        }),
        defineField({
          name: 'testimonial',
          type: 'object',
          title: 'Depoimento sobre a imagem',
          fields: [
            defineField({ name: 'quote', type: 'text', title: 'Citação', rows: 3 }),
            defineField({ name: 'nome', type: 'string', title: 'Nome' }),
            defineField({ name: 'cargo', type: 'string', title: 'Cargo' }),
            defineField({ name: 'empresa', type: 'string', title: 'Empresa' }),
          ],
        }),
        defineField({
          name: 'razoes',
          type: 'array',
          title: 'Razões (numeradas automaticamente)',
          of: [{
            type: 'object',
            fields: [
              { name: 'titulo', type: 'string' as const, title: 'Título' },
              { name: 'desc', type: 'text' as const, title: 'Descrição', rows: 3 },
            ],
            preview: { select: { title: 'titulo' } },
          }],
        }),
      ],
    }),

    // ── 6. CTA Final ─────────────────────────────────────────────────────────
    defineField({
      name: 'ctaFinal',
      type: 'object',
      title: 'CTA Final',
      fields: [
        defineField({ name: 'titleStart', type: 'string', title: 'Título (início)' }),
        defineField({ name: 'titleHighlight', type: 'string', title: 'Título (destaque itálico)' }),
        defineField({ name: 'titleEnd', type: 'string', title: 'Título (fim)' }),
        defineField({ name: 'desc', type: 'text', title: 'Descrição', rows: 2 }),
        defineField({
          name: 'ctaPrimary',
          type: 'object',
          title: 'CTA Primário',
          fields: [
            defineField({ name: 'label', type: 'string' }),
            defineField({ name: 'href', type: 'string' }),
          ],
        }),
        defineField({
          name: 'ctaSecondary',
          type: 'object',
          title: 'CTA Secundário',
          fields: [
            defineField({ name: 'label', type: 'string' }),
            defineField({ name: 'href', type: 'string' }),
          ],
        }),
      ],
    }),
  ],
})
