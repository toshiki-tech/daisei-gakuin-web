import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './schemas'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export default defineConfig({
  name: 'daisei-gakuin',
  title: '大成学院 CMS',
  projectId,
  dataset,
  basePath: '/studio',
  plugins: [
    structureTool(),
  ],
  schema: {
    types: schemaTypes,
  },
})

