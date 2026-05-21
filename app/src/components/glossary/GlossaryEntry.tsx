'use client'

import { useState } from 'react'
import type { GlossaryTerm, GlossaryCategory } from '@/types'

interface GlossaryEntryProps {
  term: GlossaryTerm
}

const CATEGORY_STYLES: Record<GlossaryCategory, string> = {
  'Concepts':             'text-accent-green border-accent-green/30 bg-accent-green/5',
  'Frameworks':           'text-accent-green border-accent-green/30 bg-accent-green/5',
  'Identity & Access':    'text-accent-cyan border-accent-cyan/30 bg-accent-cyan/5',
  'Access Control':       'text-accent-cyan border-accent-cyan/30 bg-accent-cyan/5',
  'Cryptography':         'text-accent-cyan border-accent-cyan/30 bg-accent-cyan/5',
  'Network Security':     'text-success border-success/30 bg-success/5',
  'Cloud Security':       'text-success border-success/30 bg-success/5',
  'Application Security': 'text-success border-success/30 bg-success/5',
  'Security Operations':  'text-warning border-warning/30 bg-warning/5',
  'Security Controls':    'text-warning border-warning/30 bg-warning/5',
  'Security Assessment':  'text-warning border-warning/30 bg-warning/5',
  'Threats':              'text-error border-error/30 bg-error/5',
  'Vulnerabilities':      'text-error border-error/30 bg-error/5',
  'Compliance':           'text-text-muted border-border bg-transparent',
  'Risk & Compliance':    'text-text-muted border-border bg-transparent',
}

export default function GlossaryEntry({ term }: GlossaryEntryProps) {
  const [expanded, setExpanded] = useState(false)
  const categoryStyle = CATEGORY_STYLES[term.category] ?? 'text-text-muted border-border bg-transparent'

  return (
    <div className="rounded-lg border border-border bg-bg-secondary hover:border-accent-green/30 transition-colors">
      <button
        className="w-full flex items-start justify-between gap-4 p-4 text-left"
        onClick={() => setExpanded((v) => !v)}
      >
        <div className="flex items-center gap-3 min-w-0 flex-wrap">
          {term.acronym ? (
            <>
              <span className="font-mono font-semibold text-accent-green text-sm shrink-0">
                {term.acronym}
              </span>
              <span className="font-mono text-xs text-text-muted shrink-0">·</span>
              <span className="font-mono text-sm text-text-primary truncate">
                {term.term}
              </span>
            </>
          ) : (
            <span className="font-mono font-semibold text-text-primary text-sm truncate">
              {term.term}
            </span>
          )}
          <span className={`shrink-0 font-mono text-xs border px-1.5 py-0.5 rounded hidden sm:inline ${categoryStyle}`}>
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
