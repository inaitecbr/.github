import { HomeIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "home",
  title: "Home",
  type: "document",
  icon: HomeIcon,
  fields: [
    defineField({
      name: "language",
      title: "Idioma",
      type: "string",
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: "video",
          title: "Vídeo de fundo",
          description: "MP4 em loop, sem áudio. Recomendado: 1920×1080, até 10 MB.",
          type: "file",
          options: { accept: "video/mp4,video/webm" },
        }),
        defineField({
          name: "titleStart",
          title: "Título — primeira parte",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "titleHighlight",
          title: "Título — destaque (renderizado em itálico laranja)",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "subtitle",
          title: "Subtítulo",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "ctaPrimary",
          title: "CTA Primário",
          type: "object",
          fields: [
            defineField({ name: "label", title: "Texto do botão", type: "string" }),
            defineField({ name: "href", title: "Link", type: "string" }),
          ],
        }),
        defineField({
          name: "ctaSecondary",
          title: "CTA Secundário",
          type: "object",
          fields: [
            defineField({ name: "label", title: "Texto do botão", type: "string" }),
            defineField({ name: "href", title: "Link", type: "string" }),
          ],
        }),
        defineField({
          name: "metrics",
          title: "Métricas (4 itens)",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "value", title: "Valor", type: "string" },
                { name: "label", title: "Label", type: "string" },
              ],
              preview: {
                select: { title: "value", subtitle: "label" },
              },
            },
          ],
          validation: (Rule) => Rule.max(4),
        }),
      ],
    }),
    defineField({
      name: "parceiros",
      title: "Parceiros",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({
          name: "title",
          title: "Título — primeira parte",
          type: "string",
        }),
        defineField({
          name: "titleHighlight",
          title: "Título — destaque (itálico laranja)",
          type: "string",
        }),
        defineField({
          name: "groups",
          title: "Grupos de parceiros",
          description: "Ex.: Mantenedores, Apoiadores",
          type: "array",
          of: [
            {
              type: "object",
              name: "parceiroGroup",
              fields: [
                {
                  name: "label",
                  title: "Nome do grupo",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: "logos",
                  title: "Logos",
                  type: "array",
                  of: [
                    {
                      type: "object",
                      name: "parceiroLogo",
                      fields: [
                        {
                          name: "alt",
                          title: "Texto alternativo",
                          type: "string",
                          validation: (Rule) => Rule.required(),
                        },
                        {
                          name: "image",
                          title: "Imagem",
                          type: "image",
                          options: { hotspot: false },
                          validation: (Rule) => Rule.required(),
                        },
                      ],
                      preview: {
                        select: { title: "alt", media: "image" },
                      },
                    },
                  ],
                },
              ],
              preview: {
                select: { title: "label", logosCount: "logos.length" },
                prepare({ title, logosCount }) {
                  return {
                    title: title || "Grupo",
                    subtitle: logosCount ? `${logosCount} logo(s)` : "",
                  };
                },
              },
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "ecossistema",
      title: "Ecossistema",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({
          name: "eyebrow",
          title: "Eyebrow (label acima do título)",
          type: "string",
        }),
        defineField({
          name: "titleStart",
          title: "Título — primeira parte",
          type: "string",
        }),
        defineField({
          name: "titleHighlight",
          title: "Título — destaque (itálico laranja)",
          type: "string",
        }),
        defineField({
          name: "p1",
          title: "Parágrafo 1",
          type: "text",
          rows: 4,
        }),
        defineField({
          name: "p2",
          title: "Parágrafo 2",
          type: "text",
          rows: 4,
        }),
        defineField({
          name: "ctaLabel",
          title: "CTA — Texto do link",
          type: "string",
        }),
        defineField({
          name: "ctaHref",
          title: "CTA — URL (ex.: /sobre)",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "timeline",
      title: "Linha do Tempo",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({
          name: "marcoLabel",
          title: "Label do marco (use {year} para inserir o ano)",
          description: 'Ex.: "Marco {year}"',
          type: "string",
        }),
        defineField({
          name: "imageAlt",
          title: "Texto alternativo da imagem lateral",
          type: "string",
        }),
        defineField({
          name: "events",
          title: "Eventos",
          type: "array",
          of: [
            {
              type: "object",
              name: "timelineEvent",
              fields: [
                {
                  name: "year",
                  title: "Ano",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: "title",
                  title: "Título do marco",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: "desc",
                  title: "Descrição",
                  type: "text",
                  rows: 3,
                },
                {
                  name: "metrics",
                  title: "Métricas (3 itens)",
                  type: "array",
                  of: [
                    {
                      type: "object",
                      name: "timelineMetric",
                      fields: [
                        { name: "value", title: 'Valor (ex.: "+300")', type: "string" },
                        {
                          name: "label",
                          title: 'Label (ex.: "startups aceleradas")',
                          type: "string",
                        },
                      ],
                      preview: { select: { title: "value", subtitle: "label" } },
                    },
                  ],
                  validation: (Rule) => Rule.max(3),
                },
              ],
              preview: {
                select: { title: "year", subtitle: "title" },
              },
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "pilares",
      title: "4 Pilares do Ecossistema",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
        defineField({ name: "titleStart", title: "Título — primeira parte", type: "string" }),
        defineField({
          name: "titleHighlight",
          title: "Título — destaque (itálico laranja)",
          type: "string",
        }),
        defineField({ name: "desc", title: "Descrição da seção", type: "text", rows: 2 }),
        defineField({
          name: "pillars",
          title: "Pilares (ordem fixa: Startups → Empresas → Universidades → Investidores)",
          description:
            "Não reordene — a ordem define o design visual (cor, ícone, href) de cada pilar.",
          type: "array",
          validation: (Rule) => Rule.length(4),
          of: [
            {
              type: "object",
              name: "ecosystemPillar",
              fields: [
                {
                  name: "label",
                  title: "Nome do pilar",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                },
                { name: "subtitle", title: "Subtítulo (categoria)", type: "string" },
                { name: "metric", title: 'Métrica principal (ex.: "+300")', type: "string" },
                { name: "metricLabel", title: "Label da métrica", type: "string" },
                { name: "desc", title: "Descrição", type: "text", rows: 3 },
                {
                  name: "tags",
                  title: "Tags (máx. 3)",
                  type: "array",
                  of: [{ type: "string" }],
                  validation: (Rule) => Rule.max(3),
                },
                { name: "ctaLabel", title: "Texto do CTA", type: "string" },
              ],
              preview: {
                select: { title: "label", subtitle: "subtitle" },
              },
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "programas",
      title: "Conheça nossos Programas (seção)",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
        defineField({ name: "titleStart", title: "Título — primeira parte", type: "string" }),
        defineField({
          name: "titleHighlight",
          title: "Título — destaque (itálico laranja)",
          type: "string",
        }),
        defineField({ name: "desc", title: "Descrição da seção", type: "text", rows: 2 }),
        defineField({ name: "verTodosLabel", title: 'Texto do link "Ver todos"', type: "string" }),
        defineField({
          name: "destaques",
          title: "Programas em destaque (4 referências)",
          description:
            "Selecione exatamente 4 programas — o filtro mostra apenas programas do mesmo idioma desta home.",
          type: "array",
          validation: (Rule) => Rule.length(4),
          of: [
            {
              type: "reference",
              to: [{ type: "programa" }],
              options: {
                filter: ({ document }: { document: { language?: string } }) => ({
                  filter: '_type == "programa" && language == $lang',
                  params: { lang: document.language ?? "pt" },
                }),
              },
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "chamadas",
      title: "Chamadas em destaque (seção)",
      description:
        'A lista de chamadas é montada automaticamente a partir dos programas com status "aberta" ou "em breve".',
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({
          name: "eyebrow",
          title: 'Eyebrow (ex.: "Próximas chamadas")',
          type: "string",
        }),
        defineField({ name: "titleStart", title: "Título — primeira parte", type: "string" }),
        defineField({
          name: "titleHighlight",
          title: "Título — destaque (itálico laranja)",
          type: "string",
        }),
        defineField({ name: "desc", title: "Descrição da seção", type: "text", rows: 2 }),
      ],
    }),
    defineField({
      name: "resultados",
      title: "Resultados — Empresas instaladas",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow (label acima do título)", type: "string" }),
        defineField({ name: "titleStart", title: "Título — primeira parte", type: "string" }),
        defineField({
          name: "titleHighlight",
          title: "Título — destaque (itálico laranja)",
          type: "string",
        }),
        defineField({
          name: "ctaInstalacaoLabel",
          title: 'CTA — Texto do botão "Instalar empresa"',
          type: "string",
        }),
        defineField({
          name: "yearRange",
          title: 'Intervalo de anos (ex.: "De 2019 a 2025")',
          type: "string",
        }),
        defineField({
          name: "ctaPartnersStart",
          title: 'Parceiros — início do título (ex.: "Garanta benefícios")',
          type: "string",
        }),
        defineField({
          name: "ctaPartnersHighlight",
          title: 'Parceiros — destaque do título (ex.: "exclusivos do ecossistema")',
          type: "string",
        }),
        defineField({
          name: "items",
          title: "Cases de sucesso",
          type: "array",
          of: [
            {
              type: "object",
              name: "resultadoCase",
              fields: [
                {
                  name: "company",
                  title: "Empresa",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                },
                { name: "sector", title: "Setor", type: "string" },
                { name: "quote", title: "Quote", type: "text", rows: 3 },
                { name: "person", title: "Nome da pessoa", type: "string" },
                { name: "role", title: "Cargo", type: "string" },
                {
                  name: "logo",
                  title: "Logo da empresa",
                  type: "image",
                  options: { hotspot: false },
                },
                {
                  name: "photo",
                  title: "Foto da pessoa",
                  type: "image",
                  options: { hotspot: true },
                },
                {
                  name: "metrics",
                  title: "Métricas (máx. 2)",
                  type: "array",
                  of: [
                    {
                      type: "object",
                      name: "caseMetric",
                      fields: [
                        { name: "label", title: "Label", type: "string" },
                        { name: "value", title: "Valor", type: "string" },
                      ],
                      preview: { select: { title: "value", subtitle: "label" } },
                    },
                  ],
                  validation: (Rule) => Rule.max(2),
                },
              ],
              preview: {
                select: { title: "company", subtitle: "sector", media: "logo" },
              },
            },
          ],
        }),
        defineField({
          name: "parceiros",
          title: "Logos de parceiros (strip animada)",
          description: "Logos que aparecem no carrossel animado abaixo dos cases",
          type: "array",
          of: [
            {
              type: "object",
              name: "parceiroBeneficio",
              fields: [
                {
                  name: "alt",
                  title: "Texto alternativo",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: "image",
                  title: "Logo",
                  type: "image",
                  options: { hotspot: false },
                  validation: (Rule) => Rule.required(),
                },
              ],
              preview: { select: { title: "alt", media: "image" } },
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "faq",
      title: "FAQ — Perguntas frequentes",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({
          name: "eyebrow",
          title: 'Eyebrow (ex.: "Perguntas frequentes")',
          type: "string",
        }),
        defineField({
          name: "titleStart",
          title: "Título — primeira parte",
          type: "string",
        }),
        defineField({
          name: "titleHighlight",
          title: "Título — destaque (itálico laranja)",
          type: "string",
        }),
        defineField({
          name: "desc",
          title: "Descrição abaixo do título",
          type: "text",
          rows: 2,
        }),
        defineField({
          name: "items",
          title: "Perguntas e respostas",
          type: "array",
          of: [
            {
              type: "object",
              name: "faqItem",
              fields: [
                {
                  name: "q",
                  title: "Pergunta",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: "a",
                  title: "Resposta",
                  type: "text",
                  rows: 4,
                  validation: (Rule) => Rule.required(),
                },
              ],
              preview: {
                select: { title: "q", subtitle: "a" },
              },
            },
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "hero.titleStart",
      highlight: "hero.titleHighlight",
      language: "language",
    },
    prepare({ title, highlight, language }) {
      const langLabel = language ? `[${String(language).toUpperCase()}]` : "";
      const fullTitle = [title, highlight].filter(Boolean).join(" ");
      return {
        title: fullTitle || "Home",
        subtitle: langLabel,
      };
    },
  },
});
