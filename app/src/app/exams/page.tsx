'use client'

import { useEffect, useState } from 'react'
import { EXAMS } from '@/data/exams'
import ExamCard from '@/components/exams/ExamCard'
import AdSlot from '@/components/ads/AdSlot'
import { loadResult } from '@/lib/exam-state'

export default function ExamsPage() {
  const [results, setResults] = useState<
    Record<string, { score: number; passed: boolean } | null>
  >({})

  useEffect(() => {
    const loaded: Record<string, { score: number; passed: boolean } | null> = {}
    for (const exam of EXAMS) {
      const result = loadResult(exam.id)
      loaded[exam.id] = result
        ? { score: result.score, passed: result.passed }
        : null
    }
    setResults(loaded)
  }, [])

  const completedCount = Object.values(results).filter(Boolean).length

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <p className="font-mono text-accent-green text-xs uppercase tracking-widest">
          Practice
        </p>
        <h1 className="font-mono text-3xl font-bold text-text-primary">Practice Exams</h1>
        <p className="text-text-muted text-sm">
          5 exams · 100 questions each · 90 minutes · Covers all SY0-701 domains
        </p>
        {completedCount > 0 && (
          <p className="font-mono text-xs text-accent-green">
            {completedCount} of {EXAMS.length} completed
          </p>
        )}
      </div>

      <AdSlot type="banner" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {EXAMS.map((exam) => (
          <ExamCard key={exam.id} exam={exam} result={results[exam.id] ?? null} />
        ))}
      </div>

      <div className="rounded-lg border border-border bg-bg-secondary p-5 flex flex-col gap-2">
        <p className="font-mono text-xs text-text-muted uppercase tracking-widest">
          Passing Score
        </p>
        <p className="text-sm text-text-primary">
          The real Security+ exam is scored 100–900. You need <span className="text-accent-green font-semibold">750</span> to pass (83%). These practice exams use the same threshold.
        </p>
      </div>
    </div>
  )
}
