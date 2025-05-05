import { ImageIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

const schema = defineType({
  title: 'Project',
  name: 'GFNC_project',
  type: 'document',
  preview: {
    select: {
      title: 'title',
      subtitle: 'clientName',
      media: 'mainMedia',
    },
    prepare(selection) {
      return {
        title: selection.title,
        subtitle: selection.subtitle,
        media: selection.media?.find((media: { _type: string }) => media._type === 'image'),
      }
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
      description:
        'NOTE: Changing this after publishing for the first time will break existing links to this page. If you definitely want to change this, reach out to Jason so he can implement a redirect to transfer the SEO juice.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'Type',
      name: 'type',
      type: 'string',
      options: {
        list: ['Audio', 'Build', 'Event', 'Photo', 'Video', 'Web'],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'Status',
      name: 'status',
      type: 'string',
      options: {
        list: ['In Progress', 'Completed', 'Paused', 'Canceled'],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'Date Started',
      name: 'dateStarted',
      type: 'date',
      description: 'The date the project was started. Used for sorting on the projects list page.',
    }),
    defineField({
      title: 'Date Ended',
      name: 'dateCompleted',
      type: 'date',
      description:
        'The date the project was completed, paused, or canceled. Used for sorting on the projects list page.',
    }),
    defineField({
      title: 'Members Involved',
      name: 'membersInvolved',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'GFNC_member' }],
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'Featured Project?',
      name: 'featured',
      type: 'boolean',
      description: 'If checked, this project will be featured on the homepage.',
      initialValue: false,
    }),
    defineField({
      title: 'Main Media',
      name: 'mainMedia',
      type: 'array',
      description:
        'This media is used as the thumbnail on list pages (Projects, Homepage), the banner on the project detail page, and the social media share image. You must add an image but you can add a video as well. If you add both media types, the video will be used on the website and the image will be used for social media share thumbnail.',
      of: [
        defineArrayMember({ type: 'videoFile' }),
        defineArrayMember({
          type: 'image',
          title: 'Image',
          icon: ImageIcon,
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
                'This is only used for accessiblity and will not be displayed on the site.',
              validation: (Rule) => Rule.required(),
            },
          ],
        }),
      ],
      // validation: (Rule) => Rule.required().min(1).max(2),
      validation: (Rule) =>
        Rule.min(1)
          .max(2)
          .custom((mainMedia: Array<{ _type: string }> = []) => {
            const imageCount = mainMedia.filter((media) => media._type === 'image').length

            if (imageCount === 0) {
              return 'The array must contain at least one image.'
            }

            if (imageCount > 1) {
              return 'The array must contain only one image.'
            }

            return true
          }),
    }),
    defineField({
      title: 'Summary',
      name: 'summary',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          lists: [],
          marks: {
            decorators: [],
            annotations: [],
          },
        }),
      ],
      description:
        "A brief summary of the project to use under the thumbnail on the projects list page and the homepage if it's featured. It is typically a more concise, less formatted version of the overview.",
      validation: (Rule) => Rule.required().max(500),
    }),
    defineField({
      title: 'Overview',
      name: 'overview',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          lists: [],
        }),
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
        defineArrayMember({
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
        }),
      ],
    }),
    defineField({
      title: 'Case Study',
      name: 'caseStudy',
      type: 'array',
      description:
        'This is the main content for project pages, appearing below the overview. This is optional for photo projects.',
      of: [
        defineArrayMember({ type: 'block' }),
        defineArrayMember({
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
        }),
        defineArrayMember({ type: 'videoFile' }),
        defineArrayMember({ type: 'embedUrl' }),
        defineArrayMember({ type: 'embedCode' }),
      ],
    }),
  ],
})

export default schema
