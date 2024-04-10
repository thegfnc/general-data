import { defineField, defineType } from 'sanity'

const schema = defineType({
  title: 'Project',
  name: 'GFNC_project',
  type: 'document',
  preview: {
    select: {
      title: 'title',
      subtitle: 'clientName',
      media: 'mainImage',
    },
  },
  fields: [
    defineField({
      title: 'Project Title',
      name: 'title',
      type: 'string',
      description: 'The title of the project.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'Client Name',
      name: 'clientName',
      type: 'string',
      description:
        'This field is called client name for lack of a better term. It serves as the subject of the project, internal or external, and can repeat across multiple projects.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: (doc) => `${doc.clientName}-${doc.title}`,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'Type',
      name: 'type',
      type: 'string',
      options: {
        list: ['Web', 'Video', 'Photo', 'Audio'],
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
      title: 'Featured Project?',
      name: 'featured',
      type: 'boolean',
      description: 'If checked, this project will be featured on the homepage.',
    }),
    defineField({
      title: 'Main Image',
      name: 'mainImage',
      type: 'image',
      description:
        'This image is used as the thumbnail on list pages (Projects, Homepage) and the banner on the project detail page.',
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
          description: 'This is only used for accessiblity and will not be displayed on the site.',
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      title: 'Summary',
      name: 'summary',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          lists: [],
          marks: {
            decorators: [],
            annotations: [],
          },
        },
      ],
      description:
        "A brief summary of the project to use under the thumbnail on the projects list page and the homepage if it's featured. It is typically a more concise version of the overview.",
      validation: (Rule) => Rule.required().max(500),
    }),
    defineField({
      title: 'Overview',
      name: 'overview',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          lists: [],
        },
      ],
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
            storeOriginalFilename: false,
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
            storeOriginalFilename: false,
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
        { type: 'embedUrl' },
        { type: 'embedCode' },
      ],
    }),
  ],
})

export default schema
