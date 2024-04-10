import type { PreviewProps } from 'sanity'
import { Flex, Text } from '@sanity/ui'
import ReactPlayer from 'react-player'

export function EmbedURLPreview(props: PreviewProps) {
  const { title: url } = props

  return (
    <Flex padding={3} align="center" justify="center">
      {typeof url === 'string' ? <ReactPlayer url={url} /> : <Text>Add an embed URL</Text>}
    </Flex>
  )
}
