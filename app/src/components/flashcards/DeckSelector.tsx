'use client'

import type { SecurityPlusDomain } from '@/types'
import { DOMAIN_LABELS } from '@/types'
import { EXAMS } from '@/data/exams'

export interface DeckFilter {
  type: 'all' | 'exam' | 'domain'
  value: string
}

interface DeckSelectorProps {
  selected: DeckFilter
  onSelect: (filter: DeckFilter) => void
  cardCount: number
}

export default function DeckSelector({ selected, onSelect, cardCount }: DeckSelectorProps) {
  function isActive(filter: DeckFilter) {
    return selected.type === filter.type && selected.value === filter.value
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <p className="font-mono text-xs text-text-muted uppercase tracking-widest">Deck</p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onSelect({ type: 'all', value: '' })}
            className={`font-mono text-xs px-3 py-1.5 rounded border transition-colors ${
              selected.type === 'all'
                ? 'border-accent-green bg-accent-green/10 text-accent-green'
                : 'border-border text-text-muted hover:border-accent-green/50'
            }`}
          >
            All 500
          </button>
          {EXAMS.map((exam) => (
            <button
              key={exam.id}
              onClick={() => onSelect({ type: 'exam', value: exam.id })}
              className={`font-mono text-xs px-3 py-1.5 rounded border transition-colors ${
                isActive({ type: 'exam', value: exam.id })
                  ? 'border-accent-cyan bg-accent-cyan/10 text-accent-cyan'
                  : 'border-border text-text-muted hover:border-accent-cyan/50'
              }`}
            >
              {exam.title}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="font-mono text-xs text-text-muted uppercase tracking-widest">By Domain</p>
        <div className="flex flex-wrap gap-2">
          {(Object.entries(DOMAIN_LABELS) as [SecurityPlusDomain, string][]).map(
            ([domain, label]) => (
              <button
                key={domain}
                onClick={() => onSelect({ type: 'domain', value: domain })}
                className={`font-mono text-xs px-3 py-1.5 rounded border transition-colors ${
                  isActive({ type: 'domain', value: domain })
                    ? 'border-warning bg-warning/10 text-warning'
                    : 'border-border text-text-muted hover:border-warning/50'
                }`}
              >
                {label}
              </button>
            )
          )}
        </div>
      </div>

      <p className="font-mono text-xs text-text-muted">
        <span className="text-text-primary">{cardCount}</span> cards in deck
      </p>
    </div>
  )
}
