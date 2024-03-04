import {defineType, defineField} from 'sanity'
import {StringRule} from '@sanity/types'

import {
  group as isWeedLegalHereGroup,
  createField as createIsWeedLegalHereField,
} from './common/isWeedLegalHere'

const schema = defineType({
  title: 'Administrative area Level 2 (US County)',
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
    createIsWeedLegalHereField([
      {
        title: 'Nearest Legal Administrative area Level 2 Locations',
        name: 'nearestLegalLocations',
        type: 'array',
        description:
          'The administrative area level 2 locations nearest to this one where cannabis is legal. Only fill out this field for administrative area level 2 locations where cannabis is illegal or only decriminalized.',
        of: [
          {
            type: 'reference',
            to: [{type: 'IIHD_administrativeAreaLevel2'}],
          },
        ],
      },
    ]),
  ],
})

export default schema
