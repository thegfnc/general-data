import type { PreviewProps } from 'sanity'
import { Card, Flex, Heading, Stack, Text } from '@sanity/ui'
import ReactPlayer from 'react-player'

export function EmbedURLPreview(props: PreviewProps) {
  const { media: url } = props

  return (
    <Card overflow="auto" padding={4}>
      <Stack space={4}>
        <Heading size={0}>Embed URL</Heading>
        <Flex padding={3} align="center" justify="center">
          {typeof url === 'string' ? <ReactPlayer src={url} /> : <Text>Add an embed URL</Text>}
        </Flex>
      </Stack>
    </Card>
  )
}
