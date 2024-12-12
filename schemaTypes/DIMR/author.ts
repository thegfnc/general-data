import { defineField, defineType } from 'sanity'

const schema = defineType({
  title: 'Author',
  name: 'DIMR_author',
  type: 'document',
  preview: {
    select: {
      title: 'title',
      media: 'mainMedia',
    },
  },
  fields: [
    defineField({
      title: 'Full Name',
      name: 'fullName',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'Title',
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'Profile Picture',
      name: 'profilePicture',
      type: 'image',
      validation: (Rule) => Rule.required().assetRequired(),
      options: {
        aiAssist: {
          imageDescriptionField: 'caption',
        },
        hotspot: true,
        storeOriginalFilename: false,
      },
      fields: [
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
          description:
            'This is used for accessibility only and will not be displayed on the site.',
          validation: (Rule) => Rule.required(),
        },
        ],
    }),
    defineField({
      title: 'Bio',
      name: 'bio',
      type: 'text',
      validation: (Rule) => Rule.required(),
      description: 'A brief biography of the author.',
    }),
  ],
})

export default schema
