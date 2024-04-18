import { defineType, defineField } from 'sanity'
import { PlugIcon } from '@sanity/icons'
import { EmbedURLPreview } from './EmbedURLPreview'

export default defineType({
  name: 'embedUrl',
  type: 'object',
  title: 'Embed URL',
  icon: PlugIcon,
  fields: [
    defineField({
      name: 'url',
      type: 'url',
      title: 'Embed URL',
      description:
        'Supports YouTube, Facebook, Twitch, SoundCloud, Streamable, Vimeo, Wistia, Mixcloud, DailyMotion and Kaltura. If your media not in this list, use Embed Code block instead.',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { media: 'url' },
  },
  components: {
    preview: EmbedURLPreview,
  },
})
