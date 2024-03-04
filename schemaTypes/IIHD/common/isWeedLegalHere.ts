import {defineField, defineArrayMember, FieldGroupDefinition, FieldDefinition} from 'sanity'

export const group: FieldGroupDefinition = {
  title: 'Is weed legal here?',
  name: 'isWeedLegalHere',
}

export const createField = (additionalFields: FieldDefinition[] = []) =>
  defineField({
    title: 'Is weed legal here?',
    name: 'isWeedLegalHere',
    type: 'object',
    group: 'isWeedLegalHere',
    options: {
      collapsible: true,
    },
    fields: [
      defineField({
        title: 'Overview',
        name: 'overview',
        type: 'array',
        of: [
          defineArrayMember({
            type: 'block',
            styles: [],
          }),
        ],
        description: 'Long form overview of the legal status of cannabis in this location.',
      }),
      defineField({
        title: 'Medicinal',
        name: 'medicinal',
        type: 'object',
        options: {
          columns: 2,
        },
        fields: [
          defineField({
            title: 'Legal Status',
            name: 'legalStatus',
            type: 'string',
            options: {
              list: ['legal', 'illegal', 'unknown'],
            },
          }),
          defineField({
            title: 'Quantity',
            name: 'quantity',
            type: 'string',
            description: 'Amount that is legal to possess (e.g. "7 ounces").',
          }),
        ],
      }),
      defineField({
        title: 'Recreational',
        name: 'recreational',
        type: 'object',
        options: {
          columns: 2,
        },
        fields: [
          defineField({
            title: 'Legal Status',
            name: 'legalStatus',
            type: 'string',
            options: {
              list: ['legal', 'decriminalized', 'illegal', 'unknown'],
            },
          }),
          defineField({
            title: 'Quantity',
            name: 'quantity',
            type: 'string',
            description: 'Amount that is legal to possess (e.g. "7 ounces").',
          }),
        ],
      }),
      defineField({
        title: 'THCA',
        name: 'thca',
        type: 'object',
        options: {
          columns: 2,
        },
        fields: [
          defineField({
            title: 'Legal Status',
            name: 'legalStatus',
            type: 'string',
            options: {
              list: ['legal', 'decriminalized', 'illegal', 'unknown'],
            },
          }),
          defineField({
            title: 'Quantity',
            name: 'quantity',
            type: 'string',
            description: 'Amount that is legal to possess (e.g. "7 ounces").',
          }),
        ],
      }),
      defineField({
        title: 'Delta 9',
        name: 'delta9',
        type: 'object',
        options: {
          columns: 2,
        },
        fields: [
          defineField({
            title: 'Legal Status',
            name: 'legalStatus',
            type: 'string',
            options: {
              list: ['legal', 'decriminalized', 'illegal', 'unknown'],
            },
          }),
          defineField({
            title: 'Quantity',
            name: 'quantity',
            type: 'string',
            description: 'Amount that is legal to possess (e.g. "7 ounces").',
          }),
        ],
      }),
      defineField({
        title: 'Delta 8',
        name: 'delta8',
        type: 'object',
        options: {
          columns: 2,
        },
        fields: [
          defineField({
            title: 'Legal Status',
            name: 'legalStatus',
            type: 'string',
            options: {
              list: ['legal', 'decriminalized', 'illegal', 'unknown'],
            },
          }),
          defineField({
            title: 'Quantity',
            name: 'quantity',
            type: 'string',
            description: 'Amount that is legal to possess (e.g. "7 ounces").',
          }),
        ],
      }),
      defineField({
        title: 'CBD',
        name: 'cbd',
        type: 'object',
        options: {
          columns: 2,
        },
        fields: [
          defineField({
            title: 'Legal Status',
            name: 'legalStatus',
            type: 'string',
            options: {
              list: ['legal', 'decriminalized', 'illegal', 'unknown'],
            },
          }),
          defineField({
            title: 'Quantity',
            name: 'quantity',
            type: 'string',
            description: 'Amount that is legal to possess (e.g. "7 ounces").',
          }),
        ],
      }),
      ...additionalFields,
    ],
  })
