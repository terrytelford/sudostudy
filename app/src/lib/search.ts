import Fuse from 'fuse.js'
import type { GlossaryTerm } from '@/types'

let fuse: Fuse<GlossaryTerm> | null = null

export function initSearch(terms: GlossaryTerm[]) {
  fuse = new Fuse(terms, {
    keys: [
      { name: 'term', weight: 0.6 },
      { name: 'acronym', weight: 0.3 },
      { name: 'definition', weight: 0.1 },
    ],
    threshold: 0.35,
    includeScore: true,
    minMatchCharLength: 2,
  })
}

export function searchTerms(query: string, terms: GlossaryTerm[]): GlossaryTerm[] {
  if (!query.trim()) return terms
  if (!fuse) initSearch(terms)
  return fuse!.search(query).map(r => r.item)
}
