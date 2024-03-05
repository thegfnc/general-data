import {promises as fs} from 'fs'

import {createClient} from '@sanity/client'
import {parse} from 'csv-parse/sync'
import PQueue from 'p-queue'

const client = createClient({
  projectId: 'ojzttvlq',
  dataset: 'production',
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion: '2024-03-04', // use current date (YYYY-MM-DD) to target the latest API version
  token: process.env.SANITY_SECRET_TOKEN, // Only if you want to update content with the client
})

const queue = new PQueue({
  concurrency: 1,
  interval: 1000 / 25,
})

const content = await fs.readFile(
  './scripts/002_loadUSCountiesFromSheet/USCountiesLegalityData.csv',
  'utf-8',
)
const records = parse(content, {bom: true})

const importData = async () => {
  let currentStateDocument = null
  let currentAdministrativeAreaLevel2Refs = []

  for (const record of records) {
    const [state, county, city, medicinal, recreational, quantity] = record

    if (city) {
      continue
    }

    if (state) {
      console.log(state, '---------------------------------------')

      if (currentStateDocument) {
        await client
          .patch(currentStateDocument[0]._id)
          .set({
            administrativeAreaLevel2: {
              children: currentAdministrativeAreaLevel2Refs,
            },
          })
          .commit()

        currentAdministrativeAreaLevel2Refs = []
      }

      currentStateDocument = await client.fetch(
        '*[_type == "IIHD_administrativeAreaLevel1" && name == $state]',
        {
          state,
        },
      )

      if (currentStateDocument.length === 0) {
        throw new Error('State not found')
      }

      continue
    }

    if (county) {
      const countyDocument = await queue.add(() => {
        console.log('        ', county, medicinal, recreational, quantity)

        return client.create({
          _type: 'IIHD_administrativeAreaLevel2',
          name: county,
          isWeedLegalHere: {
            medicinal: {
              legalStatus: medicinal.toLowerCase(),
            },
            recreational: {
              legalStatus: recreational.toLowerCase(),
              quantity: quantity ? quantity : undefined,
            },
          },
        })
      })

      currentAdministrativeAreaLevel2Refs.push({
        _type: 'reference',
        _ref: countyDocument._id,
      })
    }
  }
}

console.log('Starting import...')

await importData()

console.log('Import finished')
