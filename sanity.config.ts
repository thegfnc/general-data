import { defineConfig } from 'sanity'

import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { assist } from '@sanity/assist'

import { structure, defaultDocumentNode } from './src/structureTool'
import { studio } from './src/studio'

import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'The Good for Nothings Club - General Data',

  projectId: 'ojzttvlq',
  dataset: 'production',

  plugins: [
    structureTool({
      structure,
      defaultDocumentNode,
    }),
    visionTool(),
    assist(),
  ],

  schema: {
    types: schemaTypes,
  },

  studio,
})
