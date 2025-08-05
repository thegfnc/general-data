import { defineField, defineType } from 'sanity'

const schema = defineType({
  title: 'Video',
  name: 'NINE_video',
  type: 'document',
  preview: {
    select: {
      title: 'songTitle',
      subtitle: 'artist',
      media: 'thumbnailImage',
      trackNumber: 'trackNumber',
    },
    prepare(selection) {
      return {
        title: selection.trackNumber + ' - ' + selection.title,
        subtitle: selection.subtitle,
        media: selection.media,
      }
    },
  },
  fields: [
    defineField({
      title: 'Track Number',
      name: 'trackNumber',
      type: 'number',
      description: 'The track number of the song in the playlist.',
      validation: (Rule) => Rule.required().min(1).max(100),
    }),
    defineField({
      title: 'Artist',
      name: 'artist',
      type: 'string',
      description: 'The artist of the song.',
      validation: (Rule) => Rule.required().min(1).max(200),
    }),
    defineField({
      title: 'Song Title',
      name: 'songTitle',
      type: 'string',
      description: 'The title of the song.',
      validation: (Rule) => Rule.required().min(1).max(200),
    }),
    defineField({
      title: 'Credits',
      name: 'credits',
      type: 'string',
      description: 'The credits for the song.',
    }),
    defineField({
      title: 'Auxiliary Credits',
      name: 'auxiliaryCredits',
      type: 'string',
      description: 'The auxiliary credits for contributors outside of 9 Point Studios.',
    }),
    defineField({
      title: 'Youtube URL',
      name: 'youtubeUrl',
      type: 'url',
      description: 'The embeddable URL of the Youtube video.',
      validation: (Rule) => Rule.required().uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      title: 'Thumbnail Image',
      name: 'thumbnailImage',
      type: 'image',
      description: 'The thumbnail image for the video.',
      options: {
        hotspot: true,
        storeOriginalFilename: false,
      },
      validation: (Rule) => Rule.required().assetRequired(),
    }),
  ],
})

export default schema
