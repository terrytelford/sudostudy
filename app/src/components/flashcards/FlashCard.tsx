'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { Question, AnswerKey } from '@/types'

interface FlashCardProps {
  question: Question
  onRate: (rating: 'got-it' | 'review') => void
}

const KEYS: AnswerKey[] = ['A', 'B', 'C', 'D']

export default function FlashCard({ question, onRate }: FlashCardProps) {
  const [flipped, setFlipped] = useState(false)

  function handleRate(rating: 'got-it' | 'review') {
    setFlipped(false)
    setTimeout(() => onRate(rating), 250)
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div
        className="flip-container w-full max-w-2xl cursor-pointer"
        onClick={() => setFlipped((v) => !v)}
      >
        <div className={cn('flip-card', flipped && 'flipped')}>

          {/* Front — question + all options */}
          <div className="flip-card-front rounded-xl border border-border bg-bg-secondary p-6 flex flex-col gap-4">
            <span className="font-mono text-xs text-text-muted uppercase tracking-widest">
              {question.domain.replace(/-/g, ' ')}
            </span>
            <p className="text-base leading-relaxed text-text-primary font-medium">
              {question.question}
            </p>
            <div className="flex flex-col gap-2">
              {KEYS.map((key) => (
                <div
                  key={key}
                  className="flex gap-3 rounded-lg border border-border bg-bg-tertiary/50 px-4 py-2.5"
                >
                  <span className="font-mono text-xs text-text-muted w-4 shrink-0 mt-0.5">{key}</span>
                  <span className="text-sm text-text-muted">{question.options[key]}</span>
                </div>
              ))}
            </div>
            <p className="font-mono text-xs text-text-muted text-center pt-1">
              tap to reveal answer
            </p>
          </div>

          {/* Back — options with correct highlighted + explanation */}
          <div className="flip-card-back rounded-xl border border-accent-green/30 bg-bg-secondary p-6 flex flex-col gap-4">
            <span className="font-mono text-xs text-accent-green uppercase tracking-widest">
              Answer: {question.correctAnswer}
            </span>
            <div className="flex flex-col gap-2">
              {KEYS.map((key) => {
                const isCorrect = key === question.correctAnswer
                return (
                  <div
                    key={key}
                    className={cn(
                      'flex gap-3 rounded-lg border px-4 py-2.5',
                      isCorrect
                        ? 'border-success/50 bg-success/10'
                        : 'border-border bg-bg-tertiary/30 opacity-50'
                    )}
                  >
                    <span className={cn('font-mono text-xs w-4 shrink-0 mt-0.5', isCorrect ? 'text-success' : 'text-text-muted')}>
                      {key}
                    </span>
                    <span className={cn('text-sm', isCorrect ? 'text-text-primary font-medium' : 'text-text-muted')}>
                      {question.options[key]}
                    </span>
                  </div>
                )
              })}
            </div>
            <p className="text-sm text-text-muted leading-relaxed border-t border-border pt-3">
              {question.explanation}
            </p>
            <p className="font-mono text-xs text-text-muted text-center">
              tap to flip back
            </p>
          </div>

        </div>
      </div>

      {flipped && (
        <div className="flex gap-4 w-full max-w-2xl animate-fade-in">
          <button
            onClick={() => handleRate('review')}
            className="flex-1 font-mono text-sm py-3 rounded border border-error text-error hover:bg-error hover:text-bg-primary transition-colors"
          >
            Review Again
          </button>
          <button
            onClick={() => handleRate('got-it')}
            className="flex-1 font-mono text-sm py-3 rounded border border-success text-success hover:bg-success hover:text-bg-primary transition-colors"
          >
            Got It
          </button>
        </div>
      )}
    </div>
  )
}
