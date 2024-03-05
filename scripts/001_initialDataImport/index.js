import {createClient} from '@sanity/client'
import PQueue from 'p-queue'

import legalityByCountry from './legalityByCountryData.js'

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

const importData = async () => {
  ////////////////////////
  // COUNTRIES
  ////////////////////////
  const countries = Object.keys(legalityByCountry)
  for (const country of countries) {
    const countryData = legalityByCountry[country]
    const administrativeAreaLevel1Refs = []

    if (countryData.administrativeAreaLevel1) {
      ////////////////////////
      // STATES
      ////////////////////////
      const administrativeAreasLevel1 = Object.keys(countryData.administrativeAreaLevel1)
      for (const state of administrativeAreasLevel1) {
        const administrativeAreaLevel1Data = countryData.administrativeAreaLevel1[state]
        const administrativeAreaLevel2Refs = []
        const localityRefs = []

        if (administrativeAreaLevel1Data.administrativeAreaLevel2) {
          ////////////////////////
          // Counties
          ////////////////////////
          const counties = Object.keys(administrativeAreaLevel1Data.administrativeAreaLevel2)
          for (const county of counties) {
            const administrativeAreaLevel2Data =
              administrativeAreaLevel1Data.administrativeAreaLevel2[county]

            const countyDocument = await queue.add(() => {
              console.log(
                '        ',
                county,
                administrativeAreaLevel2Data.MEDICINAL,
                administrativeAreaLevel2Data.RECREATIONAL,
                administrativeAreaLevel2Data.QUANTITY,
              )

              return client.create({
                _type: 'IIHD_administrativeAreaLevel2',
                name: county,
                isWeedLegalHere: {
                  medicinal: {
                    legalStatus: administrativeAreaLevel2Data.MEDICINAL,
                  },
                  recreational: {
                    legalStatus: administrativeAreaLevel2Data.RECREATIONAL,
                    quantity:
                      administrativeAreaLevel2Data.QUANTITY === null
                        ? undefined
                        : administrativeAreaLevel2Data.QUANTITY,
                  },
                },
              })
            })

            administrativeAreaLevel2Refs.push({
              _type: 'reference',
              _ref: countyDocument._id,
            })
          }
        }

        if (administrativeAreaLevel1Data.locality) {
          ////////////////////////
          // Cities
          ////////////////////////
          const cities = Object.keys(administrativeAreaLevel1Data.locality)
          for (const city of cities) {
            const localityData = administrativeAreaLevel1Data.locality[city]

            const cityDocument = await queue.add(() => {
              console.log(
                '        ',
                city,
                localityData.MEDICINAL,
                localityData.RECREATIONAL,
                localityData.QUANTITY,
              )

              return client.create({
                _type: 'IIHD_locality',
                name: city,
                isWeedLegalHere: {
                  medicinal: {
                    legalStatus: localityData.MEDICINAL,
                  },
                  recreational: {
                    legalStatus: localityData.RECREATIONAL,
                    quantity: localityData.QUANTITY === null ? undefined : localityData.QUANTITY,
                  },
                },
              })
            })

            localityRefs.push({
              _type: 'reference',
              _ref: cityDocument._id,
            })
          }
        }

        const stateDocument = await queue.add(() => {
          console.log(
            '    ',
            state,
            administrativeAreaLevel1Data.MEDICINAL,
            administrativeAreaLevel1Data.RECREATIONAL,
            administrativeAreaLevel1Data.QUANTITY,
          )

          return client.create({
            _type: 'IIHD_administrativeAreaLevel1',
            name: state,
            administrativeAreaLevel2: {
              children: administrativeAreaLevel2Refs,
            },
            locality: {
              children: localityRefs,
            },
            isWeedLegalHere: {
              medicinal: {
                legalStatus: administrativeAreaLevel1Data.MEDICINAL,
              },
              recreational: {
                legalStatus: administrativeAreaLevel1Data.RECREATIONAL,
                quantity:
                  administrativeAreaLevel1Data.QUANTITY === null
                    ? undefined
                    : administrativeAreaLevel1Data.QUANTITY,
              },
            },
          })
        })

        administrativeAreaLevel1Refs.push({
          _type: 'reference',
          _ref: stateDocument._id,
        })
      }
    }

    await queue.add(() => {
      console.log(country, countryData.MEDICINAL, countryData.RECREATIONAL, countryData.QUANTITY)

      return client.create({
        _type: 'IIHD_country',
        name: country,
        administrativeAreaLevel1: {
          children: administrativeAreaLevel1Refs,
        },
        isWeedLegalHere: {
          medicinal: {
            legalStatus: countryData.MEDICINAL,
          },
          recreational: {
            legalStatus: countryData.RECREATIONAL,
            quantity: countryData.QUANTITY === null ? undefined : countryData.QUANTITY,
          },
        },
      })
    })
  }
}

console.log('Starting import...')

await importData()

console.log('Import finished')
