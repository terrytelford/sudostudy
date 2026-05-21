'use client'

import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { getExamById } from '@/data/exams'
import ExamResults from '@/components/exams/ExamResults'
import ExamQuestion from '@/components/exams/ExamQuestion'
import { loadResult } from '@/lib/exam-state'
import type { ExamResult, AnswerKey } from '@/types'
import Link from 'next/link'

export default function ResultsPage() {
  const { examId } = useParams<{ examId: string }>()
  const searchParams = useSearchParams()
  const reviewMode = searchParams.get('review') === '1'
  const exam = getExamById(examId)
  const [result, setResult] = useState<ExamResult | null>(null)

  useEffect(() => {
    const r = loadResult(examId)
    setResult(r)
  }, [examId])

  if (!exam) {
    return <p className="font-mono text-error text-center py-16">Exam not found.</p>
  }

  if (!result) {
    return (
      <div className="text-center py-16 flex flex-col gap-4 items-center">
        <p className="font-mono text-text-muted">No results found for this exam.</p>
        <Link
          href={`/exams/${examId}`}
          className="font-mono text-sm text-accent-green border border-accent-green/30 rounded px-4 py-2 hover:bg-accent-green/10 transition-colors"
        >
          Start {exam.title}
        </Link>
      </div>
    )
  }

  if (reviewMode && result.questions) {
    return (
      <div className="flex flex-col gap-10 max-w-2xl mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="font-mono text-lg font-bold text-text-primary">
            {exam.title} — Review
          </h1>
          <Link
            href={`/exams/${examId}/results`}
            className="font-mono text-xs text-text-muted border border-border rounded px-3 py-1.5 hover:border-accent-cyan hover:text-accent-cyan transition-colors"
          >
            ← Summary
          </Link>
        </div>

        {result.questions.map((q, i) => (
          <div key={q.id} className="flex flex-col gap-3">
            <p className="font-mono text-xs text-text-muted">
              Q{i + 1} &nbsp;·&nbsp;
              <span className={result.answers[q.id] === q.correctAnswer ? 'text-success' : 'text-error'}>
                {result.answers[q.id] === q.correctAnswer ? '✓ Correct' : '✗ Incorrect'}
              </span>
            </p>
            <ExamQuestion
              question={q}
              selected={(result.answers[q.id] as AnswerKey) ?? null}
              onSelect={() => {}}
              reviewMode
            />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <ExamResults
        result={result}
        examId={examId}
        examTitle={`${exam.title}: ${exam.subtitle}`}
      />
    </div>
  )
}
