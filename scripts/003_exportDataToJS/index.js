import {promises as fs} from 'fs'
import {createClient} from '@sanity/client'

const client = createClient({
  projectId: 'ojzttvlq',
  dataset: 'production',
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion: '2024-03-04', // use current date (YYYY-MM-DD) to target the latest API version
  token: process.env.SANITY_SECRET_TOKEN, // Only if you want to update content with the client
})

const allData = await client.fetch(`*[_type == 'IIHD_country'] | order(name) {
  name,
  isWeedLegalHere,
  labels,
  administrativeAreaLevel1 {
    children[]-> {
      name,
      isWeedLegalHere,
      administrativeAreaLevel2 {
        children[] | order(name) -> {
          name,
          isWeedLegalHere
        }
      },
      locality {
        children[] | order(name) -> {
          name,
          isWeedLegalHere
        }
      }
    }
  }
}`)

const transformedData = {}

for (const document of allData) {
  transformedData[document.name] = {
    MEDICINAL: document.isWeedLegalHere.medicinal.legalStatus,
    RECREATIONAL: document.isWeedLegalHere.recreational.legalStatus,
    QUANTITY: document.isWeedLegalHere.recreational.quantity || null,
    labels: document.labels,
    administrativeAreaLevel1: {},
  }

  if (document.administrativeAreaLevel1) {
    for (const administrativeAreaLevel1 of document.administrativeAreaLevel1.children) {
      transformedData[document.name].administrativeAreaLevel1[administrativeAreaLevel1.name] = {
        MEDICINAL: administrativeAreaLevel1.isWeedLegalHere.medicinal.legalStatus,
        RECREATIONAL: administrativeAreaLevel1.isWeedLegalHere.recreational.legalStatus,
        QUANTITY: administrativeAreaLevel1.isWeedLegalHere.recreational.quantity || null,
        administrativeAreaLevel2: {},
        locality: {},
      }

      if (administrativeAreaLevel1.administrativeAreaLevel2) {
        for (const administrativeAreaLevel2 of administrativeAreaLevel1.administrativeAreaLevel2
          .children) {
          transformedData[document.name].administrativeAreaLevel1[
            administrativeAreaLevel1.name
          ].administrativeAreaLevel2[administrativeAreaLevel2.name] = {
            MEDICINAL: administrativeAreaLevel2.isWeedLegalHere.medicinal.legalStatus,
            RECREATIONAL: administrativeAreaLevel2.isWeedLegalHere.recreational.legalStatus,
            QUANTITY: administrativeAreaLevel2.isWeedLegalHere.recreational.quantity || null,
          }
        }
      }

      if (administrativeAreaLevel1.locality) {
        for (const locality of administrativeAreaLevel1.locality.children) {
          transformedData[document.name].administrativeAreaLevel1[
            administrativeAreaLevel1.name
          ].locality[locality.name] = {
            MEDICINAL: locality.isWeedLegalHere.medicinal.legalStatus,
            RECREATIONAL: locality.isWeedLegalHere.recreational.legalStatus,
            QUANTITY: locality.isWeedLegalHere.recreational.quantity || null,
          }
        }
      }
    }
  }
}

await fs.writeFile(
  './scripts/003_exportDataToJS/data.ts',
  `export default ${JSON.stringify(transformedData, null, 2)}`,
)
