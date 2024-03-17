import { defineType, defineField, defineArrayMember } from 'sanity'
import { StringRule } from '@sanity/types'
import {
  group as isWeedLegalHereGroup,
  createField as createIsWeedLegalHereField,
} from './common/isWeedLegalHere'

const schema = defineType({
  title: 'Country',
  name: 'IIHD_country',
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
      description: 'The name of the country.',
      group: 'general',
      validation: (Rule: StringRule) => Rule.required(),
    }),
    defineField({
      title: 'Labels',
      name: 'labels',
      type: 'object',
      group: 'general',
      options: {
        collapsible: true,
      },
      fields: [
        defineField({
          title: 'Administrative Area Level 1',
          name: 'administrativeAreaLevel1',
          type: 'object',
          description:
            'The singular and pluralized local name of administrative area level 1 locations in this country (e.g. "states" in the US). Used to build phrases such as "Browse States" in the UI.',
          options: {
            collapsible: true,
            columns: 2,
          },
          fields: [
            defineField({
              title: 'Singular',
              name: 'singular',
              type: 'string',
            }),
            defineField({
              title: 'Plural',
              name: 'plural',
              type: 'string',
            }),
          ],
        }),
        defineField({
          title: 'Administrative Area Level 2',
          name: 'administrativeAreaLevel2',
          type: 'object',
          description:
            'The singular and pluralized local name of administrative area level 2 locations in this country (e.g. "counties" in the US). Used to build phrases such as "Browse Counties" in the UI.',
          options: {
            collapsible: true,
            columns: 2,
          },
          fields: [
            defineField({
              title: 'Singular',
              name: 'singular',
              type: 'string',
            }),
            defineField({
              title: 'Plural',
              name: 'plural',
              type: 'string',
            }),
          ],
        }),
        defineField({
          title: 'Locality',
          name: 'locality',
          type: 'object',
          description:
            'The singular and pluralized local name of localities in this country (e.g. "cities" in the US). Used to build phrases such as "Browse Cities" in the UI.',
          options: {
            collapsible: true,
            columns: 2,
          },
          fields: [
            defineField({
              title: 'Singular',
              name: 'singular',
              type: 'string',
            }),
            defineField({
              title: 'Plural',
              name: 'plural',
              type: 'string',
            }),
          ],
        }),
      ],
    }),
    defineField({
      title: 'Administrative Area Level 1',
      name: 'administrativeAreaLevel1',
      type: 'object',
      group: 'general',
      options: {
        collapsible: true,
      },
      fields: [
        defineField({
          title: 'Contained Administrative Area Level 1 Locations',
          name: 'children',
          type: 'array',
          description: 'The administrative area level 1 locations contained within this country.',
          of: [
            defineArrayMember({
              type: 'reference',
              to: [{ type: 'IIHD_administrativeAreaLevel1' }],
            }),
          ],
        }),
      ],
    }),
    createIsWeedLegalHereField([
      {
        title: 'Nearest Legal Countries',
        name: 'nearestLegalLocations',
        type: 'array',
        description:
          'The countries nearest to this one where cannabis is legal. Only fill out this field for countries where cannabis is illegal or only decriminalized.',
        of: [
          {
            type: 'reference',
            to: [{ type: 'IIHD_country' }],
          },
        ],
      },
    ]),
  ],
})

export default schema
