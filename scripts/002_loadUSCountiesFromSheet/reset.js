import {createClient} from '@sanity/client'

const client = createClient({
  projectId: 'ojzttvlq',
  dataset: 'production',
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion: '2024-03-04', // use current date (YYYY-MM-DD) to target the latest API version
  token: process.env.SANITY_SECRET_TOKEN, // Only if you want to update content with the client
})

client
  .fetch(
    '*[_type == "IIHD_administrativeAreaLevel1" && name != "Australian Capital Territory"]{_id, name} | order(name asc)',
  )
  .then((administrativeAreaLevel1) => {
    for (const state of administrativeAreaLevel1) {
      client.patch(state._id).unset(['administrativeAreaLevel2.children']).commit()
    }
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
