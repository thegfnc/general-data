import type { PreviewProps } from 'sanity'
import { Card, Flex, Heading, Stack, Text } from '@sanity/ui'
import ReactPlayer from 'react-player'

export function VideoFilePreview(props: PreviewProps) {
  const { media: url, subtitle: caption } = props

  return (
    <Card overflow="auto" padding={4}>
      <Stack space={4}>
        <Heading size={0}>Video File</Heading>
        <Flex padding={3} align="center" justify="center">
          {typeof url === 'string' ? (
            <ReactPlayer url={url} controls={true} />
          ) : (
            <Stack space={3}>
              <Text align="center">Upload a video file</Text>
              <Text align="center" muted size={1}>
                This is only for video file uploads. For embedding outside services, use the Embed
                URL or Embed Code field.
              </Text>
            </Stack>
          )}
        </Flex>
        {caption && (
          <Text align="center" muted size={0}>
            {String(caption)}
          </Text>
        )}
      </Stack>
    </Card>
  )
}
