import { defineField, defineType } from 'sanity'

const schema = defineType({
  title: 'Equipment',
  name: 'NINE_equipment',
  type: 'document',
  preview: {
    select: {
      title: 'album',
      subtitle: 'artist',
      media: 'albumCover',
    },
  },
  fields: [
    defineField({
      title: 'Year',
      name: 'year',
      type: 'number',
      description: 'The year the album was released.',
      validation: (Rule) => Rule.required().min(1900).max(new Date().getFullYear()),
    }),
    defineField({
      title: 'Artist',
      name: 'artist',
      type: 'string',
      description: 'The name of the artist or band.',
      validation: (Rule) => Rule.required().min(1).max(100),
    }),
    defineField({
      title: 'Album',
      name: 'album',
      type: 'string',
      description: 'The title of the album.',
      validation: (Rule) => Rule.required().min(1).max(200),
    }),
    defineField({
      title: 'Album Cover',
      name: 'albumCover',
      type: 'image',
      description: 'The cover image of the album.',
      options: {
        hotspot: true,
        storeOriginalFilename: false,
      },
      validation: (Rule) => Rule.required().assetRequired(),
    }),
    defineField({
      title: 'Role',
      name: 'role',
      type: 'string',
      description:
        'The role of the person in the credit (e.g. mixing, producer, engineering, etc).',
      validation: (Rule) => Rule.required().min(1).max(100),
    }),
  ],
})

export default schema
