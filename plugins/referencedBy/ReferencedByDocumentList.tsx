import React, { useCallback } from 'react'
import { Box, Button, Stack, Flex, Spinner, Card, Heading } from '@sanity/ui'
import { fromString as pathFromString } from '@sanity/util/paths'
import { Preview, useSchema, DefaultPreview, SanityDocument, ListenQueryParams } from 'sanity'
import { usePaneRouter } from 'sanity/structure'
import { WarningOutlineIcon } from '@sanity/icons'
import { Feedback, useListeningQuery } from 'sanity-plugin-utils'

type ReferencedByDocumentListProps = {
  document: Partial<SanityDocument>
  depth?: number
}

const query = `*[references($id)]`

const getHeadingForDocumentType = (type: string) => {
  switch (type) {
    case 'IIHD_country':
      return 'Country'
    case 'IIHD_administrativeAreaLevel1':
      return 'Administrative Area Level 1'
    case 'IIHD_administrativeAreaLevel2':
      return 'Administrative Area Level 2'
    case 'IIHD_locality':
      return 'Locality'
  }
}

export default function ReferencedByDocumentList(props: ReferencedByDocumentListProps) {
  const { document, depth = 0 } = props
  const { routerPanesState, groupIndex, handleEditReference } = usePaneRouter()
  const schema = useSchema()

  const params: ListenQueryParams = document._id ? { id: document._id } : {}

  const { loading, error, data } = useListeningQuery<SanityDocument[]>(query, {
    params,
    initialValue: [],
    options: { perspective: 'previewDrafts' },
  })

  const handleClick = useCallback(
    (id: string, type: string) => {
      const childParams = routerPanesState[groupIndex + 1]?.[0].params || {}
      const { parentRefPath } = childParams

      handleEditReference({
        id,
        type,
        // Uncertain that this works as intended
        parentRefPath: parentRefPath ? pathFromString(parentRefPath) : [``],
        template: { id },
      })
    },
    [routerPanesState, groupIndex, handleEditReference],
  )

  if (!params) {
    return (
      <Stack padding={4} space={5}>
        <Feedback>
          Parameters for this query could not be resolved. This may mean the document does not yet
          exist, or is incomplete.
        </Feedback>
      </Stack>
    )
  }

  if (loading) {
    return (
      <Box padding={4}>
        <Flex justify="center" align="center">
          <Spinner muted />
        </Flex>
      </Box>
    )
  }

  if (error) {
    return (
      <Stack padding={4} space={5}>
        <Feedback>There was en error performing this query</Feedback>
      </Stack>
    )
  }

  if (depth === 0 && !data?.length) {
    return (
      <>
        <Stack padding={4} space={5}>
          <Feedback>No Documents found</Feedback>
        </Stack>
      </>
    )
  }

  if (!data?.length) {
    return null
  }

  return (
    <>
      <Stack padding={2} space={1}>
        <Box padding={2}>
          <Heading as="h2" size={2}>
            {getHeadingForDocumentType(data[0]._type)}
          </Heading>
        </Box>
        {data.map((doc) => {
          const schemaType = schema.get(doc._type)

          // Fixes display issue with document preview when perspective is 'previewDrafts'
          if ('_originalId' in doc && typeof doc._originalId === 'string') {
            doc._id = doc._originalId
          }

          return schemaType ? (
            <Button
              key={doc._id}
              onClick={() => handleClick(doc._id, doc._type)}
              padding={2}
              mode="bleed"
            >
              <Preview value={doc} schemaType={schemaType} />
            </Button>
          ) : (
            <Card radius={2} tone="caution" data-ui="Alert" padding={2} key={doc._id}>
              <DefaultPreview
                media={<WarningOutlineIcon />}
                title="Unknown schema type found"
                subtitle={`Encountered type "${doc._type}" that is not defined in the schema.`}
              />
            </Card>
          )
        })}
      </Stack>
      <ReferencedByDocumentList document={data[0]} depth={depth + 1} />
    </>
  )
}
