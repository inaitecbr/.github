import { defineField, defineType } from 'sanity'

/**
 * Setor de atuação das empresas instaladas.
 *
 * Documento único compartilhado pelos 3 idiomas (nomes como "FinTech" e
 * "AgTech" não são traduzidos). O cliente adiciona/remove setores direto
 * no Studio; a exclusão de um setor ainda referenciado por empresas é
 * bloqueada pelo Sanity até que as empresas sejam reatribuídas.
 */
export default defineType({
  name: 'setor',
  title: 'Setor',
  type: 'document',
  fields: [
    defineField({
      name: 'nome',
      title: 'Nome',
      type: 'string',
      validation: (R) => R.required(),
    }),
  ],
  preview: {
    select: { title: 'nome' },
  },
  orderings: [
    { title: 'Nome A→Z', name: 'nomeAsc', by: [{ field: 'nome', direction: 'asc' }] },
  ],
})
