import type { StructureResolver } from 'sanity/structure'
import { BellIcon, DocumentsIcon, HomeIcon, InfoOutlineIcon, PinIcon, RocketIcon, StarIcon, ThLargeIcon, UsersIcon } from '@sanity/icons'

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
  sobre: 'eb1f1e75-726c-4f5f-8a7d-d0b36e8cb530', // versão PT — Translations para EN/ES
  tragaSuaEmpresa: '0bde9e07-f843-4125-b53f-1f28a35976be', // PT — Translations para EN/ES
  empresasInstaladas: 'b9e088f6-abe6-47fb-8513-2ee82941cbe7', // PT — Translations para EN/ES
  programas: 'd04849c7-4759-4bbe-bbf6-f023c04b8981', // PT — Translations para EN/ES
  chamadas: '1e50f2ca-8234-4f95-9fbb-32dada5f9217', // PT — Translations para EN/ES
  bancoDeTalentos: 'c08c4584-1d91-44ac-ab2e-12248af5afa2', // PT — Translations para EN/ES
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

              S.listItem()
                .title('Sobre')
                .icon(InfoOutlineIcon)
                .child(
                  S.document()
                    .documentId(SINGLETONS.sobre)
                    .schemaType('sobre'),
                ),

              S.listItem()
                .title('Traga sua empresa')
                .icon(ThLargeIcon)
                .child(
                  S.document()
                    .documentId(SINGLETONS.tragaSuaEmpresa)
                    .schemaType('tragaSuaEmpresa'),
                ),

              S.listItem()
                .title('Empresas Instaladas')
                .icon(UsersIcon)
                .child(
                  S.document()
                    .documentId(SINGLETONS.empresasInstaladas)
                    .schemaType('empresasInstaladas'),
                ),

              S.listItem()
                .title('Programas')
                .icon(RocketIcon)
                .child(
                  S.document()
                    .documentId(SINGLETONS.programas)
                    .schemaType('programas'),
                ),

              S.listItem()
                .title('Chamadas Abertas')
                .icon(BellIcon)
                .child(
                  S.document()
                    .documentId(SINGLETONS.chamadas)
                    .schemaType('chamadas'),
                ),

              S.listItem()
                .title('Banco de Talentos')
                .icon(PinIcon)
                .child(
                  S.document()
                    .documentId(SINGLETONS.bancoDeTalentos)
                    .schemaType('bancoDeTalentos'),
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

      // ── Coleção: Empresas Instaladas ──────────────────────────────────
      S.listItem()
        .title('Empresas Instaladas')
        .icon(UsersIcon)
        .child(
          S.documentTypeList('empresa')
            .title('Empresas')
            .defaultOrdering([{ field: 'nome', direction: 'asc' }]),
        ),
    ])
