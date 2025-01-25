import studio from '@sanity/eslint-config-studio'

export default [
  {
    ignores: ['scripts/'], // messy migration scripts
  },
  ...studio,
]
