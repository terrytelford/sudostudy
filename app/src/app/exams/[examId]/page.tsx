'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { getExamById } from '@/data/exams'
import ExamQuestion from '@/components/exams/ExamQuestion'
import ExamProgress from '@/components/exams/ExamProgress'
import {
  loadSession,
  saveSession,
  clearSession,
  saveResult,
  setAnswer,
} from '@/lib/exam-state'
import { shuffle, scoreToScaled } from '@/lib/utils'
import { PASSING_SCORE } from '@/types'
import type { ExamSession, AnswerKey, SecurityPlusDomain } from '@/types'

const TIMER_SECONDS = 90 * 60

export default function ActiveExamPage() {
  const { examId } = useParams<{ examId: string }>()
  const router = useRouter()
  const exam = getExamById(examId)

  const [started, setStarted] = useState(false)
  const [session, setSession] = useState<ExamSession | null>(null)
  const [currentIdx, setCurrentIdx] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState<number>(TIMER_SECONDS)
  const [timerActive, setTimerActive] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Check for an existing in-progress session on mount
  useEffect(() => {
    if (!exam) return
    const saved = loadSession(examId)
    if (saved) {
      setSession(saved)
      setCurrentIdx(saved.currentQuestion)
      setTimeRemaining(saved.timeRemaining ?? TIMER_SECONDS)
      setStarted(true)
      if (saved.timed) setTimerActive(true)
    }
  }, [examId, exam]) // eslint-disable-line react-hooks/exhaustive-deps

  // Timer
  useEffect(() => {
    if (!timerActive || submitted) return
    timerRef.current = setInterval(() => {
      setTimeRemaining((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current!)
          handleSubmit()
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current!)
  }, [timerActive, submitted])

  // Persist time remaining
  useEffect(() => {
    if (!session) return
    saveSession({ ...session, timeRemaining })
  }, [timeRemaining]) // eslint-disable-line react-hooks/exhaustive-deps

  function handleStart(timed: boolean) {
    if (!exam) return
    const shuffled = shuffle([...exam.questions])
    const newSession: ExamSession = {
      examId,
      questions: shuffled,
      answers: {},
      startedAt: Date.now(),
      currentQuestion: 0,
      timeRemaining: TIMER_SECONDS,
      timed,
    }
    setSession(newSession)
    saveSession(newSession)
    setStarted(true)
    if (timed) setTimerActive(true)
  }

  const handleAnswer = useCallback(
    (key: AnswerKey) => {
      if (!session) return
      const questionId = session.questions[currentIdx].id
      const updated = setAnswer(session, questionId, key)
      setSession(updated)
    },
    [session, currentIdx, examId]
  )

  const handleNext = useCallback(() => {
    if (!session) return
    const next = Math.min(currentIdx + 1, session.questions.length - 1)
    setCurrentIdx(next)
    const updated = { ...session, currentQuestion: next }
    setSession(updated)
    saveSession(updated)
  }, [session, currentIdx, examId])

  const handleSubmit = useCallback(() => {
    if (!session || submitted) return
    clearInterval(timerRef.current!)
    setSubmitted(true)

    let correct = 0
    const domainCorrect: Record<string, number> = {}
    const domainTotal: Record<string, number> = {}

    for (const q of session.questions) {
      const userAnswer = session.answers[q.id]
      const d = q.domain
      domainTotal[d] = (domainTotal[d] ?? 0) + 1
      if (userAnswer === q.correctAnswer) {
        correct++
        domainCorrect[d] = (domainCorrect[d] ?? 0) + 1
      }
    }

    const score = Math.round((correct / session.questions.length) * 100)
    const domainScores: Record<SecurityPlusDomain, number> = {} as Record<SecurityPlusDomain, number>
    for (const [d, total] of Object.entries(domainTotal)) {
      const c = domainCorrect[d] ?? 0
      domainScores[d as SecurityPlusDomain] = Math.round((c / total) * 100)
    }

    const result = {
      examId,
      score,
      passed: score >= PASSING_SCORE,
      scaledScore: scoreToScaled(score),
      totalQuestions: session.questions.length,
      correctAnswers: correct,
      domainScores,
      completedAt: Date.now(),
      answers: session.answers,
      questions: session.questions,
    }

    saveResult(result)
    clearSession(examId)
    router.push(`/exams/${examId}/results`)
  }, [session, submitted, examId, router])

  if (!exam) {
    return <p className="font-mono text-error text-center py-16">Exam not found.</p>
  }

  // Start screen — shown for new exams only (resuming skips this)
  if (!started) {
    return (
      <div className="max-w-2xl mx-auto flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <p className="font-mono text-accent-green text-xs uppercase tracking-widest">
            {exam.title}
          </p>
          <h1 className="font-mono text-2xl font-bold text-text-primary">{exam.subtitle}</h1>
          <p className="text-text-muted text-sm">{exam.description}</p>
        </div>

        <div className="rounded-xl border border-border bg-bg-secondary p-6 flex flex-col gap-4">
          <p className="font-mono text-sm text-text-primary font-semibold">Choose your mode</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => handleStart(true)}
              className="flex flex-col gap-2 rounded-lg border border-accent-green/40 bg-bg-primary p-5 text-left hover:border-accent-green hover:bg-accent-green/5 transition-colors group"
            >
              <span className="font-mono text-sm font-semibold text-accent-green">Timed</span>
              <span className="text-xs text-text-muted leading-relaxed">
                90-minute countdown, just like the real exam. Auto-submits when time runs out.
              </span>
            </button>
            <button
              onClick={() => handleStart(false)}
              className="flex flex-col gap-2 rounded-lg border border-accent-cyan/40 bg-bg-primary p-5 text-left hover:border-accent-cyan hover:bg-accent-cyan/5 transition-colors group"
            >
              <span className="font-mono text-sm font-semibold text-accent-cyan">Untimed</span>
              <span className="text-xs text-text-muted leading-relaxed">
                No time limit. Study at your own pace without the pressure.
              </span>
            </button>
          </div>
          <p className="font-mono text-xs text-text-muted">
            {exam.questions.length} questions · passing score 750/900
          </p>
        </div>
      </div>
    )
  }

  if (!session) {
    return <p className="font-mono text-text-muted text-center py-16 animate-pulse">Loading exam...</p>
  }

  const currentQuestion = session.questions[currentIdx]
  const selectedAnswer = (session.answers[currentQuestion.id] as AnswerKey) ?? null
  const answeredCount = Object.keys(session.answers).length
  const isLast = currentIdx === session.questions.length - 1

  return (
    <div className="flex flex-col gap-8 max-w-2xl mx-auto">
      <div className="flex items-center justify-between">
        <p className="font-mono text-xs text-text-muted uppercase tracking-widest">
          {exam.title} — {exam.subtitle}
        </p>
        <button
          onClick={() => {
            if (confirm('Submit the exam now? Unanswered questions will be marked wrong.')) {
              handleSubmit()
            }
          }}
          className="font-mono text-xs text-text-muted border border-border rounded px-3 py-1.5 hover:border-warning hover:text-warning transition-colors"
        >
          Submit
        </button>
      </div>

      <ExamProgress
        current={currentIdx + 1}
        total={session.questions.length}
        answered={answeredCount}
        timeRemaining={session.timed ? timeRemaining : null}
      />

      <ExamQuestion
        question={currentQuestion}
        selected={selectedAnswer}
        onSelect={handleAnswer}
      />

      <div className="flex justify-between">
        <button
          onClick={() => setCurrentIdx((i) => Math.max(0, i - 1))}
          disabled={currentIdx === 0}
          className="font-mono text-sm px-4 py-2 rounded border border-border text-text-muted hover:border-accent-green/50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          ← Back
        </button>

        {isLast ? (
          <button
            onClick={() => {
              if (confirm(`Submit exam? You've answered ${answeredCount} of ${session.questions.length} questions.`)) {
                handleSubmit()
              }
            }}
            className="font-mono text-sm px-6 py-2 rounded border border-accent-green text-accent-green hover:bg-accent-green hover:text-bg-primary transition-colors"
          >
            Submit Exam
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="font-mono text-sm px-4 py-2 rounded border border-border text-text-muted hover:border-accent-green/50 transition-colors"
          >
            Next →
          </button>
        )}
      </div>
    </div>
  )
}
