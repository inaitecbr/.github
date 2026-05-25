import imageUrlBuilder from '@sanity/image-url'
import type { Image } from 'sanity'

const builder = imageUrlBuilder({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
})

export function urlFor(source: Image) {
  return builder.image(source)
}
