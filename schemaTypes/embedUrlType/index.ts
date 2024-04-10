import { defineType, defineField } from 'sanity'
import { PlayIcon } from '@sanity/icons'
import { EmbedURLPreview } from './EmbedURLPreview'

export default defineType({
  name: 'embedUrl',
  type: 'object',
  title: 'Embed URL',
  icon: PlayIcon,
  fields: [
    defineField({
      name: 'url',
      type: 'url',
      title: 'Embed URL',
      description:
        'Supports YouTube, Facebook, Twitch, SoundCloud, Streamable, Vimeo, Wistia, Mixcloud, DailyMotion and Kaltura. If your media not in this list, use Embed Code block instead.',
    }),
  ],
  preview: {
    select: { title: 'url' },
  },
  components: {
    preview: EmbedURLPreview,
  },
})
