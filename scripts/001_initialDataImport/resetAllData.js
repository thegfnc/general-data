import {createClient} from '@sanity/client'

const client = createClient({
  projectId: 'ojzttvlq',
  dataset: 'production',
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion: '2024-03-04', // use current date (YYYY-MM-DD) to target the latest API version
  token: process.env.SANITY_SECRET_TOKEN, // Only if you want to update content with the client
})

client
  .delete({query: '*[_type == "IIHD_administrativeAreaLevel2"][0..500]'})
  .then(() => {
    console.log(
      'The documents matching *[_type == "IIHD_administrativeAreaLevel2"][0..500] was deleted',
    )
  })
  .catch((err) => {
    console.error('Delete failed: ', err.message)
  })
  .finally(() => {
    client
      .fetch('*[_type == "IIHD_administrativeAreaLevel2"]{_id, name}')
      .then((administrativeAreaLevel2) => {
        console.log(administrativeAreaLevel2)
      })
  })

client
  .delete({query: '*[_type == "IIHD_locality"][0..500]'})
  .then(() => {
    console.log('The documents matching *[_type == "IIHD_locality"][0..500] was deleted')
  })
  .catch((err) => {
    console.error('Delete failed: ', err.message)
  })
  .finally(() => {
    client.fetch('*[_type == "IIHD_locality"]{_id, name}').then((locality) => {
      console.log(locality)
    })
  })

client
  .delete({query: '*[_type == "IIHD_administrativeAreaLevel1"][0..500]'})
  .then(() => {
    console.log(
      'The documents matching *[_type == "IIHD_administrativeAreaLevel1"][0..500] was deleted',
    )
  })
  .catch((err) => {
    console.error('Delete failed: ', err.message)
  })
  .finally(() => {
    client
      .fetch('*[_type == "IIHD_administrativeAreaLevel1"]{_id, name}')
      .then((administrativeAreaLevel1) => {
        console.log(administrativeAreaLevel1)
      })
  })

client
  .delete({query: '*[_type == "IIHD_country"][0..500]'})
  .then(() => {
    console.log('The documents matching *[_type == "IIHD_country"][0..500] was deleted')
  })
  .catch((err) => {
    console.error('Delete failed: ', err.message)
  })
  .finally(() => {
    client.fetch('*[_type == "IIHD_country"]{_id, name}').then((country) => {
      console.log(country)
    })
  })
