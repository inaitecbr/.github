import type { StructureResolver } from 'sanity/structure'
import { DocumentsIcon, HomeIcon } from '@sanity/icons'

/**
 * Estrutura customizada do Studio.
 *
 * Páginas singleton com i18n: cada item abre direto o editor do doc PT
 * (versão canônica). O botão "Translations" no topo do editor abre as
 * versões EN/ES em split-view.
 */

// IDs dos documentos singleton (versão PT — canônica).
// Os outros idiomas são acessados via botão "Translations".
const SINGLETONS = {
  home: '08a4cb0a-f98b-4dd7-9185-8c5516c39943',
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
              // Adicionar próximas páginas aqui: Sobre, Fale Conosco, etc.
            ]),
        ),
      // Futuros grupos: Vagas, Candidaturas, Programas, Conteúdo (posts), Empresas
    ])
