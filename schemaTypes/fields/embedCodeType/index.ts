import { defineType, defineField } from 'sanity'
import { CodeIcon } from '@sanity/icons'
import { EmbedCodePreview } from './EmbedCodePreview'

export default defineType({
  name: 'embedCode',
  type: 'object',
  title: 'Embed Code',
  icon: CodeIcon,
  fields: [
    defineField({
      name: 'code',
      type: 'code',
      title: 'Embed Code',
      description: 'Paste the HTML snippet below.',
      options: {
        language: 'html',
        languageAlternatives: [{ title: 'HTML', value: 'html' }],
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: 'code' },
    prepare(selection) {
      return {
        title: selection.title ? selection.title.code : 'Add embed code snippet',
      }
    },
  },
  components: {
    preview: EmbedCodePreview,
  },
})
