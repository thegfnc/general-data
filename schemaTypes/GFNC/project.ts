import { defineField, defineType } from 'sanity'

const schema = defineType({
  title: 'Project',
  name: 'GFNC_project',
  type: 'document',
  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'string',
      description: 'The title of the project.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'Subtitle',
      name: 'subtitle',
      type: 'string',
      description: 'Use this field to optionally catch the overflow for long titles.',
    }),
    defineField({
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: 'name',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'Type',
      name: 'type',
      type: 'string',
      options: {
        list: [
          { title: 'Web', value: 'web' },
          { title: 'Video', value: 'video' },
          { title: 'Photo', value: 'photo' },
          { title: 'Audio', value: 'audio' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'Date Completed',
      name: 'dateCompleted',
      type: 'date',
      description:
        'The date the project was completed. Used for sorting on the projects list page.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'Members Involved',
      name: 'membersInvolved',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'GFNC_member' }],
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'Featured Image',
      name: 'featuredImage',
      type: 'image',
      description:
        'This image is used as the thumbnail on the projects list page and the banner on the individual project page.',
      validation: (Rule) => Rule.required().assetRequired(),
      options: {
        aiAssist: {
          imageDescriptionField: 'caption',
        },
        hotspot: true,
      },
      fields: [
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
          description: 'This is only used for accessiblity and will not be displayed on the site.',
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      title: 'Summary',
      name: 'summary',
      type: 'text',
      description:
        "A brief summary of the project to use under the thumbnail on the projects list page and the homepage if it's featured. It is typically a more concise version of the overview.",
      validation: (Rule) => Rule.required().max(500),
      rows: 3,
    }),
    defineField({
      title: 'Overview',
      name: 'overview',
      type: 'text',
      description:
        'This appears on the project page, below the featured image and above the case study.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'Photo Gallery',
      name: 'photoGallery',
      type: 'array',
      description:
        'This is an optional gallery of images that will appear above the case study. This should mainly be used for photo projects.',
      of: [
        {
          type: 'image',
          options: {
            aiAssist: {
              imageDescriptionField: 'caption',
            },
            hotspot: true,
          },
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
              description:
                'This is only used for accessiblity and will not be displayed on the site.',
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    }),
    defineField({
      title: 'Case Study',
      name: 'caseStudy',
      type: 'array',
      description:
        'This is the main content for project pages, appearing below the overview. This is optional for photo projects.',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: {
            aiAssist: {
              imageDescriptionField: 'caption',
            },
            hotspot: true,
          },
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
              description:
                'This is only used for accessiblity and will not be displayed on the site.',
              validation: (Rule) => Rule.required(),
            },
          ],
        },
        { type: 'youtube' },
      ],
    }),
  ],
})

export default schema
