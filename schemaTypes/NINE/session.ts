import { defineField, defineType } from 'sanity'

const schema = defineType({
  title: 'Session',
  name: 'NINE_session',
  type: 'document',
  preview: {
    select: {
      title: 'artist',
      subtitle: 'dateStreamed',
      media: 'videoPosterImage',
    },
  },
  fields: [
    defineField({
      title: 'Artist',
      name: 'artist',
      type: 'string',
      description: 'The artist of the song.',
      validation: (Rule) => Rule.required().min(1).max(200),
    }),
    defineField({
      title: 'Description',
      name: 'description',
      type: 'text',
      description: 'A brief description of the session.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'Date Streamed',
      name: 'dateStreamed',
      type: 'date',
      description: 'The date when the session was streamed.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'Video',
      name: 'video',
      type: 'file',
      description: 'The video file for the session.',
      options: {
        accept: 'video/mp4',
      },
      validation: (Rule) => Rule.required().assetRequired(),
    }),
    defineField({
      title: 'Video Poster Image',
      name: 'videoPosterImage',
      type: 'image',
      description: 'The poster image for the video.',
      options: {
        hotspot: true,
        storeOriginalFilename: false,
      },
      validation: (Rule) => Rule.required().assetRequired(),
    }),
  ],
})

export default schema
