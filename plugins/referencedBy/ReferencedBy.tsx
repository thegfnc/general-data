import React from 'react'

import ReferencedByDocumentList from './ReferencedByDocumentList'
import { SanityDocument } from 'sanity'

type ReferencedByProps = {
  document: {
    draft: SanityDocument | null
    displayed: Partial<SanityDocument>
    historical: Partial<SanityDocument> | null
    published: SanityDocument | null
  }
}

export default function ReferencedBy({ document }: ReferencedByProps) {
  return <ReferencedByDocumentList document={document.displayed} />
}
