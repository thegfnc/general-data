import { defineType, defineField } from 'sanity'
import { StringRule } from '@sanity/types'

import {
  group as isWeedLegalHereGroup,
  createField as createIsWeedLegalHereField,
} from './common/isWeedLegalHere'

const schema = defineType({
  title: 'Locality (US City)',
  name: 'IIHD_locality',
  type: 'document',
  groups: [
    {
      title: 'General',
      name: 'general',
    },
    isWeedLegalHereGroup,
  ],
  fields: [
    defineField({
      title: 'Name',
      name: 'name',
      type: 'string',
      description: 'The name of the locality (city in the US).',
      group: 'general',
      validation: (Rule: StringRule) => Rule.required(),
    }),
    createIsWeedLegalHereField(),
  ],
})

export default schema
