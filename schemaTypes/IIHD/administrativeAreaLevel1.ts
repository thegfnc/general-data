import { defineType, defineField, defineArrayMember } from 'sanity'
import { StringRule } from '@sanity/types'

import {
  group as isWeedLegalHereGroup,
  createField as createIsWeedLegalHereField,
} from './common/isWeedLegalHere'

const schema = defineType({
  title: 'Administrative Area Level 1 (US State)',
  name: 'IIHD_administrativeAreaLevel1',
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
      description: 'The name of the administrative area level 1 location (state in the US).',
      group: 'general',
      validation: (Rule: StringRule) => Rule.required(),
    }),
    defineField({
      title: 'Administrative Area Level 2',
      name: 'administrativeAreaLevel2',
      type: 'object',
      group: 'general',
      options: {
        collapsible: true,
      },
      fields: [
        defineField({
          title: 'Contained Administrative Area Level 2 Locations',
          name: 'children',
          type: 'array',
          description:
            'The administrative area level 2 locations contained within this administrative area level 1 location.',
          of: [
            defineArrayMember({
              type: 'reference',
              to: [{ type: 'IIHD_administrativeAreaLevel2' }],
            }),
          ],
        }),
      ],
    }),
    defineField({
      title: 'Locality',
      name: 'locality',
      type: 'object',
      group: 'general',
      options: {
        collapsible: true,
      },
      fields: [
        defineField({
          title: 'Contained Localities',
          name: 'children',
          type: 'array',
          description: 'The localities contained within this administrative area level 1 location.',
          of: [
            defineArrayMember({
              type: 'reference',
              to: [{ type: 'IIHD_locality' }],
            }),
          ],
        }),
      ],
    }),
    createIsWeedLegalHereField([
      {
        title: 'Nearest Legal Administrative area Level 1 Locations',
        name: 'nearestLegalLocations',
        type: 'array',
        description:
          'The administrative area level 1 locations nearest to this one where cannabis is legal. Only fill out this field for administrative area level 1 locations where cannabis is illegal or only decriminalized.',
        of: [
          {
            type: 'reference',
            to: [{ type: 'IIHD_administrativeAreaLevel1' }],
          },
        ],
      },
    ]),
  ],
})

export default schema
