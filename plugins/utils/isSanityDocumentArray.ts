import { SanityDocument } from 'sanity'

export function isSanityDocumentArray(value: unknown): value is SanityDocument[] {
  if (!Array.isArray(value)) {
    return false
  }

  return value.every((item): item is SanityDocument => {
    if (!item || typeof item !== 'object') {
      return false
    }

    const candidate = item as Partial<SanityDocument>

    return typeof candidate._id === 'string' && typeof candidate._type === 'string'
  })
}
