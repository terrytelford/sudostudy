'use client'

import Link from 'next/link'
import type { ExamMeta } from '@/data/exams'

interface ExamCardProps {
  exam: ExamMeta
  result?: { score: number; passed: boolean } | null
}

const DIFFICULTY_BADGE: Record<ExamMeta['difficulty'], string> = {
  Beginner: 'border-accent-green text-accent-green',
  Intermediate: 'border-accent-cyan text-accent-cyan',
  Advanced: 'border-warning text-warning',
  Expert: 'border-error text-error',
  Elite: 'border-error text-error',
}

export default function ExamCard({ exam, result }: ExamCardProps) {
  return (
    <div className="rounded-lg border border-border bg-bg-secondary p-6 flex flex-col gap-4 hover:border-accent-green/50 transition-colors">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs text-text-muted uppercase tracking-widest mb-1">
            {exam.title}
          </p>
          <h2 className="font-mono text-xl font-bold text-text-primary">
            {exam.subtitle}
          </h2>
        </div>
        <span
          className={`shrink-0 font-mono text-xs border rounded px-2 py-0.5 ${DIFFICULTY_BADGE[exam.difficulty]}`}
        >
          {exam.difficulty}
        </span>
      </div>

      <p className="text-sm text-text-muted leading-relaxed">{exam.description}</p>

      <div className="flex flex-wrap gap-3 text-xs font-mono text-text-muted">
        <span>{exam.questionCount} questions</span>
        <span>·</span>
        <span>{exam.timeLimit} min</span>
      </div>

      {result && (
        <div
          className={`rounded border px-3 py-2 text-xs font-mono flex items-center gap-2 ${
            result.passed
              ? 'border-success/30 bg-success/10 text-success'
              : 'border-error/30 bg-error/10 text-error'
          }`}
        >
          <span>{result.passed ? '✓ Passed' : '✗ Failed'}</span>
          <span>—</span>
          <span>{result.score}%</span>
        </div>
      )}

      <div className="flex gap-3 mt-auto">
        <Link
          href={`/exams/${exam.id}`}
          className="flex-1 text-center font-mono text-sm font-semibold py-2 rounded border border-accent-green text-accent-green hover:bg-accent-green hover:text-bg-primary transition-colors"
        >
          {result ? 'Retake' : 'Start Exam'}
        </Link>
        {result && (
          <Link
            href={`/exams/${exam.id}/results`}
            className="flex-1 text-center font-mono text-sm py-2 rounded border border-border text-text-muted hover:border-accent-cyan hover:text-accent-cyan transition-colors"
          >
            Review
          </Link>
        )}
      </div>
    </div>
  )
}
