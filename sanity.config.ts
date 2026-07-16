import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { documentInternationalization } from '@sanity/document-internationalization'
import { schemaTypes } from './src/sanity/schemas'
import { structure } from './src/sanity/structure'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION!

export const supportedLanguages = [
  { id: 'pt', title: 'Português' },
  { id: 'en', title: 'English' },
  { id: 'es', title: 'Español' },
] as const

// Nomes dos schemas que terão suporte a i18n (PT/EN/ES via botão "Translations").
// Adicionar aqui cada novo schema editorial conforme for criado.
const i18nSchemaTypes: string[] = ['home', 'programa', 'programas', 'chamadas', 'bancoDeTalentos', 'ctaBanner', 'sobre', 'tragaSuaEmpresa', 'empresasInstaladas', 'empresa', 'faleConosco', 'post', 'portalConteudo']

export default defineConfig({
  name: 'inaitec-website',
  title: 'Inaitec',
  projectId,
  dataset,
  basePath: '/studio',
  plugins: [
    structureTool({ structure }),
    ...(i18nSchemaTypes.length > 0
      ? [
          documentInternationalization({
            supportedLanguages: supportedLanguages.map(({ id, title }) => ({ id, title })),
            schemaTypes: i18nSchemaTypes,
            // Sem templates por idioma no menu "+" das listas: criar um doc
            // "English empresa" solto não vincula ao PT e some da listagem.
            // Fluxo correto: "+" cria a versão PT (initialValue no campo
            // language) e EN/ES nascem pelo botão "Translations" do editor.
            addTemplates: false,
          }),
        ]
      : []),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  schema: {
    types: schemaTypes,
  },
})
