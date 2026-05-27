import { defineField, defineType } from "sanity";

/**
 * ctaBanner — Documento global singleton (PT/EN/ES).
 *
 * Usado em todas as páginas. O conteúdo padrão (título, desc, botões) fica aqui.
 * Páginas que precisam de um título diferente passam um `titleOverride` via seu
 * próprio campo e o componente CtaBannerSection aplica o override.
 */
export default defineType({
  name: "ctaBanner",
  title: "CTA Banner",
  type: "document",
  fields: [
    defineField({
      name: "language",
      title: "Idioma",
      type: "string",
      readOnly: true,
      hidden: true,
    }),

    // ── Eyebrow ─────────────────────────────────────────────────────────
    defineField({
      name: "eyebrow",
      title: 'Eyebrow (ex.: "Pronto para começar?")',
      type: "string",
    }),

    // ── Título padrão ────────────────────────────────────────────────────
    defineField({
      name: "titleStart",
      title: "Título — primeira parte",
      description: "Texto antes do destaque em itálico laranja.",
      type: "string",
    }),
    defineField({
      name: "titleHighlight",
      title: "Título — destaque (itálico laranja)",
      type: "string",
    }),
    defineField({
      name: "titleEnd",
      title: "Título — parte final (após o destaque)",
      type: "string",
    }),

    // ── Descrição ────────────────────────────────────────────────────────
    defineField({
      name: "desc",
      title: "Descrição",
      type: "text",
      rows: 2,
    }),

    // ── Botões ───────────────────────────────────────────────────────────
    defineField({
      name: "ctaPrimary",
      title: "Botão primário (laranja)",
      type: "object",
      fields: [
        defineField({ name: "label", title: "Texto", type: "string" }),
        defineField({ name: "href", title: "Link (ex.: /fale-conosco)", type: "string" }),
      ],
    }),
    defineField({
      name: "ctaSecondary",
      title: "Botão secundário (outline)",
      type: "object",
      fields: [
        defineField({ name: "label", title: "Texto", type: "string" }),
        defineField({ name: "href", title: "Link (ex.: /programas)", type: "string" }),
      ],
    }),
  ],
  preview: {
    select: {
      titleStart: "titleStart",
      titleHighlight: "titleHighlight",
      language: "language",
    },
    prepare({ titleStart, titleHighlight, language }) {
      const lang = language ? `[${String(language).toUpperCase()}]` : "";
      return {
        title: [titleStart, titleHighlight].filter(Boolean).join(" ") || "CTA Banner",
        subtitle: lang,
      };
    },
  },
});
