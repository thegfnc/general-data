import { defineType, defineField } from 'sanity'
import { PlayIcon } from '@sanity/icons'
import { VideoFilePreview } from './VideoFilePreview'

export default defineType({
  name: 'videoFile',
  type: 'file',
  title: 'Video',
  icon: PlayIcon,
  options: {
    accept: 'video/mp4',
    storeOriginalFilename: false,
  },
  description:
    'This is only for video file uploads. For embedding outside services, use the Embed URL or Embed Code field.',
  validation: (Rule) => Rule.required().assetRequired(),
  fields: [
    defineField({
      name: 'playing',
      type: 'boolean',
      title: 'Auto Play',
      description: 'Automatically start playing the video when the page loads.',
      initialValue: true,
    }),
    defineField({
      name: 'loop',
      type: 'boolean',
      title: 'Loop',
      description: 'Restart the video from the beginning when it reaches the end.',
      initialValue: true,
    }),
    defineField({
      name: 'controls',
      type: 'boolean',
      title: 'Show Controls',
      description: 'Display the video player controls.',
      initialValue: true,
    }),
    defineField({
      name: 'caption',
      type: 'string',
      title: 'Caption',
      description: 'This is only used for accessiblity and will not be displayed on the site.',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      media: 'asset.url',
      subtitle: 'caption',
    },
  },
  components: {
    preview: VideoFilePreview,
  },
})
