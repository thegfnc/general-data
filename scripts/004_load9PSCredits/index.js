import { promises as fs } from 'fs'
import path from 'path'

import { createClient } from '@sanity/client'
import { parse } from 'csv-parse/sync'
import PQueue from 'p-queue'

const client = createClient({
  projectId: 'ojzttvlq',
  dataset: 'production',
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion: '2025-06-30', // use current date (YYYY-MM-DD) to target the latest API version
  token: process.env.SANITY_SECRET_TOKEN, // Only if you want to update content with the client
})

const queue = new PQueue({
  concurrency: 1,
  interval: 1000 / 25,
})

const content = await fs.readFile(
  './scripts/004_load9PSCredits/greg_giorgio_credits Final for Web 6.25.25 - 9 Point Web, more weeded out.csv',
  'utf-8',
)
const records = parse(content, { bom: true })

// Function to find album cover image
const findAlbumCover = async (artist, album) => {
  const albumCoversPath = './scripts/004_load9PSCredits/Album Covers'

  try {
    const files = await fs.readdir(albumCoversPath)
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp']

    // Try exact match first
    const exactMatch = files.find((file) => {
      const name = path.parse(file).name.toLowerCase()
      const albumLower = album?.toLowerCase()
      const artistLower = artist?.toLowerCase()

      return (
        imageExtensions.includes(path.extname(file).toLowerCase()) &&
        (name.includes(albumLower) ||
          name.includes(artistLower) ||
          name === `${artistLower} - ${albumLower}` ||
          name === `${albumLower}`)
      )
    })

    if (exactMatch) {
      return path.join(albumCoversPath, exactMatch)
    }

    return null
  } catch (error) {
    console.log('Error reading album covers directory:', error.message)
    return null
  }
}

// Function to upload image to Sanity
const uploadImageToSanity = async (imagePath, artist, album) => {
  try {
    const imageBuffer = await fs.readFile(imagePath)
    const filename = path.basename(imagePath)

    const asset = await client.assets.upload('image', imageBuffer, {
      filename,
      title: `${artist} - ${album}`,
    })

    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id,
      },
      alt: `Album cover for ${album} by ${artist}`,
    }
  } catch (error) {
    console.log(`Error uploading image ${imagePath}:`, error.message)
    return null
  }
}

const importData = async () => {
  for (const record of records) {
    const [year, artist, album, role] = record

    const creditDocument = await queue.add(async () => {
      console.log('        ', year, artist, album, role)

      // Search for album cover
      let albumCoverImage = null
      if (artist && album) {
        const imagePath = await findAlbumCover(artist, album)
        if (imagePath) {
          console.log(`        Found image: ${path.basename(imagePath)}`)
          albumCoverImage = await uploadImageToSanity(imagePath, artist, album)
        }
      }

      return client.create({
        _type: 'NINE_credit',
        year: year ? parseInt(year, 10) : undefined,
        artist: artist || undefined,
        album: album || undefined,
        role: role || undefined,
        albumCover: albumCoverImage,
      })
    })
  }
}

console.log('Starting import...')

await importData()

console.log('Import finished')
