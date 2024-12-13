import { defineField, defineType } from 'sanity'

const schema = defineType({
  title: 'Blog Post',
  name: 'DIMR_blogPost',
  type: 'document',
  preview: {
    select: {
      title: 'title',
      subtitle: 'author.fullName',
      media: 'featuredImage',
    },
  },
  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'string',
      description: 'The title of the blog post.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title'
      },
      description:
        'NOTE: Changing this after publishing the first time will break links to this page. If you definitely want to change this, reach out to Jason to implement a redirect, transferring the SEO juice.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'Featured Image',
      name: 'featuredImage',
      type: 'image',
      description:
        'This image is used as the banner at the top of the page and the thumbanil in the post lists.',
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
            'This is used for accessibility and displayed under the image',
          validation: (Rule) => Rule.required(),
        },
        ],
    }),
    defineField({
      title: 'Content',
      name: 'content',
      type: 'array',
      description:
        'This is the main body content for the blog post. This supports rich text and embedded media.',
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
        { type: 'videoFile' },
        { type: 'embedUrl' },
        { type: 'embedCode' },
      ],
    }),
    defineField({
      title: 'Category',
      name: 'type',
      type: 'string',
      options: {
        list: [
          {
            title: 'Digital Nomads',
            value: 'digital-nomads',
          },
          {
            title: 'Home Buying',
            value: 'home-buying',
          },
          {
            title: 'House Hacking',
            value: 'house-hacking',
          },
          {
            title: 'Personal Finance',
            value: 'personal-finance',
          },
          {
            title: 'RV & Van Life',
            value: 'rv-van-life',
          },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'tags',
      options: {
        includeFromRelated: 'tags'
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'DIMR_author' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      description: 'Leave blank until ready to publish.',
      validation: (Rule) => Rule.required(),
    }),
  ],
})

export default schema
