import { defineType, defineField } from 'sanity'
import { StringRule } from '@sanity/types'

import {
  group as isWeedLegalHereGroup,
  createField as createIsWeedLegalHereField,
} from './common/isWeedLegalHere'

const schema = defineType({
  title: 'Administrative Area Level 2 (US County)',
  name: 'IIHD_administrativeAreaLevel2',
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
      description: 'The name of the administrative area level 2 location (county in the US).',
      group: 'general',
      validation: (Rule: StringRule) => Rule.required(),
    }),
    createIsWeedLegalHereField(),
  ],
})

export default schema
