'use client'

import Link from 'next/link'
import { scoreToScaled } from '@/lib/utils'
import { PASSING_SCORE, DOMAIN_LABELS, DOMAIN_WEIGHTS } from '@/types'
import type { ExamResult, SecurityPlusDomain } from '@/types'

interface ExamResultsProps {
  result: ExamResult
  examId: string
  examTitle: string
}

export default function ExamResults({ result, examId, examTitle }: ExamResultsProps) {
  const { score, passed, domainScores, totalQuestions, correctAnswers } = result
  const scaled = scoreToScaled(score)

  return (
    <div className="flex flex-col gap-8">
      {/* Score hero */}
      <div className="rounded-xl border border-border bg-bg-secondary p-8 text-center flex flex-col items-center gap-4">
        <p className="font-mono text-sm text-text-muted uppercase tracking-widest">
          {examTitle} — Results
        </p>
        <div
          className={`text-7xl font-mono font-bold ${passed ? 'text-accent-green' : 'text-error'}`}
        >
          {score}%
        </div>
        <p className="font-mono text-text-muted text-sm">
          Scaled: <span className="text-text-primary">{scaled}</span> / 900 &nbsp;·&nbsp;
          Passing: 750
        </p>
        <div
          className={`font-mono text-sm font-semibold px-4 py-1.5 rounded border ${
            passed
              ? 'border-success/40 bg-success/10 text-success'
              : 'border-error/40 bg-error/10 text-error'
          }`}
        >
          {passed ? '✓ PASS' : '✗ FAIL — ' + (750 - scaled) + ' pts needed'}
        </div>
        <p className="text-text-muted text-sm">
          {correctAnswers} correct out of {totalQuestions} questions
        </p>
      </div>

      {/* Domain breakdown */}
      <div className="rounded-lg border border-border bg-bg-secondary p-6 flex flex-col gap-5">
        <h2 className="font-mono text-sm text-text-muted uppercase tracking-widest">
          Domain Breakdown
        </h2>
        {(Object.entries(domainScores) as [SecurityPlusDomain, number][]).map(
          ([domain, pct]) => (
            <div key={domain} className="flex flex-col gap-1.5">
              <div className="flex justify-between font-mono text-xs text-text-muted">
                <span>{DOMAIN_LABELS[domain]}</span>
                <span className="text-text-primary">{pct}%</span>
              </div>
              <div className="h-2 rounded-full bg-bg-tertiary overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    pct >= 83 ? 'bg-accent-green' : pct >= 60 ? 'bg-warning' : 'bg-error'
                  }`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <p className="font-mono text-xs text-text-muted">
                Weight: {DOMAIN_WEIGHTS[domain]}% of exam
              </p>
            </div>
          )
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href={`/exams/${examId}/results?review=1`}
          className="flex-1 text-center font-mono text-sm font-semibold py-3 rounded border border-accent-cyan text-accent-cyan hover:bg-accent-cyan hover:text-bg-primary transition-colors"
        >
          Review All Questions
        </Link>
        <Link
          href={`/exams/${examId}`}
          className="flex-1 text-center font-mono text-sm py-3 rounded border border-border text-text-muted hover:border-accent-green hover:text-accent-green transition-colors"
        >
          Retake Exam
        </Link>
        <Link
          href="/exams"
          className="flex-1 text-center font-mono text-sm py-3 rounded border border-border text-text-muted hover:border-accent-green hover:text-accent-green transition-colors"
        >
          All Exams
        </Link>
      </div>
    </div>
  )
}
