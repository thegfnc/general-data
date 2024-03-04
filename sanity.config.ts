import {defineConfig} from 'sanity'

import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {assist} from '@sanity/assist'

import {structure} from './src/structure'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'The Good for Nothings Club - General Data',

  projectId: 'ojzttvlq',
  dataset: 'production',

  plugins: [
    structureTool({
      structure,
    }),
    visionTool(),
    assist(),
  ],

  schema: {
    types: schemaTypes,
  },
})
