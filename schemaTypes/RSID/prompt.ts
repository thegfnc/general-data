import { defineField, defineType } from 'sanity'

const schema = defineType({
  title: 'Prompt',
  name: 'RSID_prompt',
  type: 'document',
  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
    },
  },
  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'string',
      description: 'This is an internal title for the prompt. It will not be displayed to users.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      description:
        'NOTE: Do not change the slug after initial creation, unless having consulted with Jason, as this may break app connections to the prompt.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'Content',
      name: 'content',
      type: 'array',
      description:
        'This is the main body content for the prompt. Write the prompt as rich text and it will be converted to markdown for the app.',
      of: [{ type: 'block' }],
    }),
  ],
})

export default schema
