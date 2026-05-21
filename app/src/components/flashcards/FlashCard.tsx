'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { Question } from '@/types'

interface FlashCardProps {
  question: Question
  onRate: (rating: 'got-it' | 'review') => void
}

export default function FlashCard({ question, onRate }: FlashCardProps) {
  const [flipped, setFlipped] = useState(false)

  function handleRate(rating: 'got-it' | 'review') {
    setFlipped(false)
    // small delay so the flip-back animation plays before advancing
    setTimeout(() => onRate(rating), 250)
  }

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Card */}
      <div
        className="flip-container w-full max-w-2xl cursor-pointer"
        style={{ height: '280px' }}
        onClick={() => setFlipped((v) => !v)}
      >
        <div className={cn('flip-card', flipped && 'flipped')}>
          {/* Front */}
          <div className="flip-card-front rounded-xl border border-border bg-bg-secondary p-8 flex flex-col justify-between">
            <span className="font-mono text-xs text-text-muted uppercase tracking-widest">
              {question.domain.replace(/-/g, ' ')}
            </span>
            <p className="text-base leading-relaxed text-text-primary font-medium text-center">
              {question.question}
            </p>
            <p className="font-mono text-xs text-text-muted text-center">
              tap to reveal answer
            </p>
          </div>

          {/* Back */}
          <div className="flip-card-back rounded-xl border border-accent-green/30 bg-bg-secondary p-8 flex flex-col justify-between">
            <span className="font-mono text-xs text-accent-green uppercase tracking-widest">
              Answer: {question.correctAnswer}
            </span>
            <div className="flex flex-col gap-2">
              <p className="text-base font-semibold text-text-primary text-center">
                {question.options[question.correctAnswer]}
              </p>
              <p className="text-sm text-text-muted leading-relaxed text-center">
                {question.explanation}
              </p>
            </div>
            <p className="font-mono text-xs text-text-muted text-center">
              tap to flip back
            </p>
          </div>
        </div>
      </div>

      {/* Rating buttons — only show when flipped */}
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
