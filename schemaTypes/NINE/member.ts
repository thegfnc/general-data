import { defineField, defineType } from 'sanity'

const schema = defineType({
  title: 'Member',
  name: 'NINE_member',
  type: 'document',
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
    },
  },
  fields: [
    defineField({
      title: 'Name',
      name: 'name',
      type: 'string',
      description: 'The name of the member.',
      validation: (Rule) => Rule.required().min(1).max(200),
    }),
    defineField({
      title: 'Role',
      name: 'role',
      type: 'string',
      description: 'The role of the member.',
      validation: (Rule) => Rule.required().min(1).max(200),
    }),
    defineField({
      title: 'Biography',
      name: 'biography',
      type: 'text',
      description: 'A short biography of the member.',
      validation: (Rule) => Rule.required(),
    }),
  ],
})

export default schema
