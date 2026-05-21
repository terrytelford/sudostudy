'use client'

import { useState } from 'react'
import type { GlossaryTerm } from '@/types'

interface GlossaryEntryProps {
  term: GlossaryTerm
}

export default function GlossaryEntry({ term }: GlossaryEntryProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      className="rounded-lg border border-border bg-bg-secondary hover:border-accent-green/30 transition-colors"
    >
      <button
        className="w-full flex items-start justify-between gap-4 p-4 text-left"
        onClick={() => setExpanded((v) => !v)}
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="font-mono font-semibold text-text-primary text-sm truncate">
            {term.term}
          </span>
          {term.acronym && (
            <span className="shrink-0 font-mono text-xs text-accent-green border border-accent-green/30 px-1.5 py-0.5 rounded">
              {term.acronym}
            </span>
          )}
          <span className="shrink-0 font-mono text-xs text-text-muted border border-border px-1.5 py-0.5 rounded hidden sm:inline">
            {term.category}
          </span>
        </div>
        <span className="shrink-0 font-mono text-xs text-text-muted mt-0.5">
          {expanded ? '▲' : '▼'}
        </span>
      </button>

      {expanded && (
        <div className="px-4 pb-4 flex flex-col gap-3">
          <p className="text-sm text-text-primary leading-relaxed">{term.definition}</p>
          {term.relatedTerms && term.relatedTerms.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <span className="font-mono text-xs text-text-muted">Related:</span>
              {term.relatedTerms.map((rel) => (
                <span
                  key={rel}
                  className="font-mono text-xs text-accent-cyan border border-accent-cyan/20 px-1.5 py-0.5 rounded"
                >
                  {rel}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
