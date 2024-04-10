import type { PreviewProps } from 'sanity'
import { Card, Code, Container, Flex, Heading, Stack, Text } from '@sanity/ui'
import ReactPlayer from 'react-player'

export function EmbedCodePreview(props: PreviewProps) {
  const { title } = props

  if (typeof title !== 'string') {
    return <Text>Unsupported embed code</Text>
  }

  return (
    <Card overflow="auto" padding={4}>
      <Stack space={4}>
        <Heading size={0}>Embedded Code</Heading>
        <Code size={1} style={{ textWrap: 'wrap' }}>
          {title}
        </Code>
      </Stack>
    </Card>
  )
}
