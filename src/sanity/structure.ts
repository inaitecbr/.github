import type { StructureResolver } from 'sanity/structure'
import { DocumentsIcon, HomeIcon, RocketIcon, StarIcon } from '@sanity/icons'

/**
 * Estrutura customizada do Studio.
 *
 * Páginas singleton com i18n: cada item abre direto o editor do doc PT
 * (versão canônica). O botão "Translations" no topo do editor abre as
 * versões EN/ES em split-view.
 *
 * Coleções com i18n: lista filtrada por language=='pt' — o editor abre
 * a versão PT e usa "Translations" para acessar EN/ES.
 */

const SINGLETONS = {
  home: '08a4cb0a-f98b-4dd7-9185-8c5516c39943',
  ctaBanner: 'e54d7186-5a3e-4a73-9419-bab31926c7db', // versão PT — Translations para EN/ES
} as const

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Conteúdo')
    .items([
      // ── Grupo: Páginas ─────────────────────────────────────────────────
      S.listItem()
        .title('Páginas')
        .icon(DocumentsIcon)
        .child(
          S.list()
            .title('Páginas')
            .items([
              S.listItem()
                .title('Home')
                .icon(HomeIcon)
                .child(
                  S.document()
                    .documentId(SINGLETONS.home)
                    .schemaType('home'),
                ),

              // ── Componentes globais (usados em todas as páginas) ──────
              S.listItem()
                .title('CTA Banner')
                .icon(StarIcon)
                .child(
                  S.document()
                    .documentId(SINGLETONS.ctaBanner)
                    .schemaType('ctaBanner'),
                ),
            ]),
        ),

      // ── Coleção: Programas (lista PT — Translations no editor) ────────
      S.listItem()
        .title('Programas')
        .icon(RocketIcon)
        .child(
          S.documentTypeList('programa')
            .title('Programas (PT)')
            .filter('_type == "programa" && language == "pt"'),
        ),
    ])
