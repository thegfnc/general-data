import { defineField, defineType } from 'sanity'

const schema = defineType({
  title: 'Song',
  name: 'NINE_song',
  type: 'document',
  preview: {
    select: {
      title: 'songTitle',
      subtitle: 'artist',
      media: 'albumCover',
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
      validation: (Rule) => Rule.required().min(1).max(200),
    }),
    defineField({
      title: 'Auxiliary Credits',
      name: 'auxiliaryCredits',
      type: 'string',
      description: 'The auxiliary credits for contributors outside of 9 Point Studios.',
    }),
    defineField({
      title: 'WAV File',
      name: 'wavFile',
      type: 'file',
      description: 'The WAV file for the song.',
      validation: (Rule) => Rule.required().assetRequired(),
    }),
    defineField({
      title: 'Track Length',
      name: 'trackLength',
      type: 'string',
      description: 'The length of the track in the format MM:SS.',
      validation: (Rule) => Rule.required().min(1).max(10),
    }),
    defineField({
      title: 'Album Cover',
      name: 'albumCover',
      type: 'image',
      description: 'The album cover image for the song.',
      options: {
        hotspot: true,
        storeOriginalFilename: false,
      },
      validation: (Rule) => Rule.required().assetRequired(),
    }),
  ],
})

export default schema
