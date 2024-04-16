import type { PreviewProps } from 'sanity'
import { Card, Code, Heading, Stack, Text } from '@sanity/ui'

export function EmbedCodePreview(props: PreviewProps) {
  const { title } = props

  if (typeof title !== 'string') {
    return <Text>Unsupported embed code</Text>
  }

  return (
    <Card overflow="auto" padding={4}>
      <Stack space={4}>
        <Heading size={0}>Embed Code</Heading>
        <Code size={1} style={{ textWrap: 'wrap' }}>
          {title}
        </Code>
      </Stack>
    </Card>
  )
}
