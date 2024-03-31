import { defineField, defineType } from 'sanity'

const schema = defineType({
  title: 'Member',
  name: 'GFNC_member',
  type: 'document',
  fields: [
    defineField({
      title: 'Full Name',
      name: 'fullName',
      type: 'string',
      description: 'The full name of the member.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: 'fullName',
      },
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
      title: 'Roles',
      name: 'roles',
      type: 'array',
      of: [
        {
          type: 'string',
          options: {
            list: [
              { title: 'Musician', value: 'musician' },
              { title: 'Software Engineer', value: 'softwareEngineer' },
              { title: 'Copywriter', value: 'copywriter' },
              { title: 'Videographer', value: 'videographer' },
              { title: 'Photographer', value: 'photographer' },
              { title: 'Designer', value: 'designer' },
              { title: 'Business Development', value: 'businessDevelopment' },
            ],
          },
        },
      ],
      description: "If you need new role added that isn't represented here, contact Jason.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'Start Date',
      name: 'startDate',
      type: 'date',
      description: 'The date the member joined the club.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'Member Number',
      name: 'memberNumber',
      type: 'number',
      description: 'The order in which the member joined the club.',
      validation: (Rule) => Rule.required(),
    }),
  ],
})

export default schema
