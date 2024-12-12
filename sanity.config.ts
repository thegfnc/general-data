import { defineConfig } from 'sanity'

import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { assist } from '@sanity/assist'

import { structure, defaultDocumentNode } from './src/structureTool'
import { studio } from './src/studio'

import { schemaTypes } from './schemaTypes'
import { media } from 'sanity-plugin-media'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'
import { codeInput } from '@sanity/code-input'
import { tags } from 'sanity-plugin-tags'

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
    media(),
    visionTool(),
    assist(),
    unsplashImageAsset(),
    codeInput(),
    tags()
  ],

  schema: {
    types: schemaTypes,
  },

  studio,
})
