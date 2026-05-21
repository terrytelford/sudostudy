'use client'

import { useState, useMemo } from 'react'
import { searchTerms } from '@/lib/search'
import GlossaryEntry from './GlossaryEntry'
import glossaryTerms from '@/data/glossary'
import type { GlossaryTerm } from '@/types'

const CATEGORIES = Array.from(new Set(glossaryTerms.map((t) => t.category))).sort()

const displayLabel = (t: GlossaryTerm) => t.acronym || t.term

export default function GlossarySearch() {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [activeLetter, setActiveLetter] = useState<string | null>(null)

  const results: GlossaryTerm[] = useMemo(() => {
    let items = glossaryTerms

    if (query.trim().length > 0) {
      items = searchTerms(query, glossaryTerms)
    } else {
      if (activeCategory) {
        items = items.filter((t) => t.category === activeCategory)
      }
      if (activeLetter) {
        items = items.filter((t) => displayLabel(t)[0].toUpperCase() === activeLetter)
      }
      items = [...items].sort((a, b) => displayLabel(a).localeCompare(displayLabel(b)))
    }

    return items
  }, [query, activeCategory, activeLetter])

  const letters = useMemo(
    () => Array.from(new Set(glossaryTerms.map((t) => displayLabel(t)[0].toUpperCase()))).sort(),
    []
  )

  return (
    <div className="flex flex-col gap-6">
      {/* Search input */}
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-accent-green text-sm select-none">
          &gt;
        </span>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setActiveLetter(null)
          }}
          placeholder="search terms, acronyms, definitions..."
          className="w-full bg-bg-secondary border border-border rounded-lg pl-9 pr-4 py-3 font-mono text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-green transition-colors"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary text-xs font-mono"
          >
            clear
          </button>
        )}
      </div>

      {/* Filters */}
      {!query && (
        <div className="flex flex-col gap-3">
          {/* Category filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory(null)}
              className={`font-mono text-xs px-3 py-1 rounded border transition-colors ${
                !activeCategory
                  ? 'border-accent-green bg-accent-green/10 text-accent-green'
                  : 'border-border text-text-muted hover:border-accent-green/50'
              }`}
            >
              All
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                className={`font-mono text-xs px-3 py-1 rounded border transition-colors ${
                  activeCategory === cat
                    ? 'border-accent-cyan bg-accent-cyan/10 text-accent-cyan'
                    : 'border-border text-text-muted hover:border-accent-cyan/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* A-Z letter filter */}
          <div className="flex flex-wrap gap-1">
            {letters.map((letter) => (
              <button
                key={letter}
                onClick={() => setActiveLetter(activeLetter === letter ? null : letter)}
                className={`font-mono text-xs w-7 h-7 rounded border transition-colors ${
                  activeLetter === letter
                    ? 'border-accent-green bg-accent-green/10 text-accent-green'
                    : 'border-border text-text-muted hover:border-accent-green/50'
                }`}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results count */}
      <p className="font-mono text-xs text-text-muted">
        {results.length} term{results.length !== 1 ? 's' : ''}
        {query && <span className="ml-1">for &quot;{query}&quot;</span>}
      </p>

      {/* Term list */}
      <div className="flex flex-col gap-3">
        {results.length === 0 ? (
          <p className="font-mono text-sm text-text-muted text-center py-8">
            No terms found. Try a different search.
          </p>
        ) : (
          results.map((term) => <GlossaryEntry key={term.id} term={term} />)
        )}
      </div>
    </div>
  )
}
