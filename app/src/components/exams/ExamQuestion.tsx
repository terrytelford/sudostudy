'use client'

import { cn } from '@/lib/utils'
import type { Question, AnswerKey } from '@/types'

interface ExamQuestionProps {
  question: Question
  selected: AnswerKey | null
  onSelect: (key: AnswerKey) => void
  reviewMode?: boolean
}

const LABELS: AnswerKey[] = ['A', 'B', 'C', 'D']

export default function ExamQuestion({
  question,
  selected,
  onSelect,
  reviewMode = false,
}: ExamQuestionProps) {
  function getOptionStyle(key: AnswerKey) {
    if (!reviewMode) {
      return selected === key
        ? 'border-accent-green bg-accent-green/10 text-text-primary'
        : 'border-border hover:border-accent-green/50 text-text-primary cursor-pointer'
    }
    if (key === question.correctAnswer) {
      return 'border-success bg-success/10 text-success'
    }
    if (key === selected && key !== question.correctAnswer) {
      return 'border-error bg-error/10 text-error'
    }
    return 'border-border text-text-muted opacity-50'
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-3">
        <span className="font-mono text-xs text-text-muted shrink-0 mt-1 uppercase tracking-widest">
          {question.domain.replace(/-/g, ' ')}
        </span>
      </div>

      <p className="text-base leading-relaxed text-text-primary font-medium">
        {question.question}
      </p>

      <div className="flex flex-col gap-3">
        {LABELS.map((key) => (
          <button
            key={key}
            onClick={() => !reviewMode && onSelect(key)}
            disabled={reviewMode}
            className={cn(
              'flex items-start gap-3 rounded-lg border p-4 text-left transition-colors',
              getOptionStyle(key)
            )}
          >
            <span className="font-mono text-sm font-bold shrink-0 w-6 text-center">
              {key}
            </span>
            <span className="text-sm leading-relaxed">{question.options[key]}</span>
          </button>
        ))}
      </div>

      {reviewMode && (
        <div className="rounded-lg border border-accent-cyan/30 bg-accent-cyan/5 p-4">
          <p className="font-mono text-xs text-accent-cyan mb-2 uppercase tracking-widest">
            Explanation
          </p>
          <p className="text-sm text-text-primary leading-relaxed">{question.explanation}</p>
        </div>
      )}
    </div>
  )
}
