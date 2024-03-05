import {createClient} from '@sanity/client'

const client = createClient({
  projectId: 'ojzttvlq',
  dataset: 'production',
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion: '2024-03-04', // use current date (YYYY-MM-DD) to target the latest API version
  token: process.env.SANITY_SECRET_TOKEN, // Only if you want to update content with the client
})

const wyomingAdministrativeAreaLevel1 = await client.fetch(
  '*[_type == "IIHD_administrativeAreaLevel1" && name == "Wyoming"]',
)

console.log(wyomingAdministrativeAreaLevel1)

const administrativeAreaLevel2Refs = []

const wyomingAdministrativeAreasLevel2 = await client.fetch(
  '*[_type == "IIHD_administrativeAreaLevel2"] | order(_createdAt desc) [0..22]',
)

for (const county of wyomingAdministrativeAreasLevel2.sort((a, b) =>
  a.name.localeCompare(b.name),
)) {
  administrativeAreaLevel2Refs.push({_type: 'reference', _ref: county._id})
}

console.log(administrativeAreaLevel2Refs)

const newWyomingAdministrativeAreaLevel1 = await client
  .patch(wyomingAdministrativeAreaLevel1[0]._id)
  .set({
    administrativeAreaLevel2: {
      children: administrativeAreaLevel2Refs,
    },
    locality: {
      children: undefined,
    },
  })
  .commit()

console.log(newWyomingAdministrativeAreaLevel1)
