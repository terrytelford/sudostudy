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
import { PASSING_SCORE, DOMAIN_WEIGHTS } from '@/types'
import type { ExamSession, AnswerKey, SecurityPlusDomain } from '@/types'

const TIMER_SECONDS = 90 * 60

export default function ActiveExamPage() {
  const { examId } = useParams<{ examId: string }>()
  const router = useRouter()
  const exam = getExamById(examId)

  const [session, setSession] = useState<ExamSession | null>(null)
  const [currentIdx, setCurrentIdx] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState<number>(TIMER_SECONDS)
  const [timerActive, setTimerActive] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Load or create session
  useEffect(() => {
    if (!exam) return
    const saved = loadSession(examId)
    if (saved) {
      setSession(saved)
      setCurrentIdx(saved.currentQuestion)
      setTimeRemaining(saved.timeRemaining ?? TIMER_SECONDS)
    } else {
      const shuffled = shuffle([...exam.questions])
      const newSession: ExamSession = {
        examId,
        questions: shuffled,
        answers: {},
        startedAt: Date.now(),
        currentQuestion: 0,
        timeRemaining: TIMER_SECONDS,
      }
      setSession(newSession)
      saveSession(examId, newSession)
    }
    setTimerActive(true)
  }, [examId, exam])

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
    const updated = { ...session, timeRemaining }
    saveSession(examId, updated)
  }, [timeRemaining])

  const handleAnswer = useCallback(
    (key: AnswerKey) => {
      if (!session) return
      const questionId = session.questions[currentIdx].id
      const updated = setAnswer(examId, session, questionId, key)
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
    saveSession(examId, updated)
  }, [session, currentIdx, examId])

  const handleSubmit = useCallback(() => {
    if (!session || submitted) return
    clearInterval(timerRef.current!)
    setSubmitted(true)

    // Calculate score
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

    saveResult(examId, result)
    clearSession(examId)
    router.push(`/exams/${examId}/results`)
  }, [session, submitted, examId, router])

  if (!exam) {
    return (
      <p className="font-mono text-error text-center py-16">
        Exam not found.
      </p>
    )
  }

  if (!session) {
    return (
      <p className="font-mono text-text-muted text-center py-16 animate-pulse">
        Loading exam...
      </p>
    )
  }

  const currentQuestion = session.questions[currentIdx]
  const selectedAnswer = (session.answers[currentQuestion.id] as AnswerKey) ?? null
  const answeredCount = Object.keys(session.answers).length
  const isLast = currentIdx === session.questions.length - 1

  return (
    <div className="flex flex-col gap-8 max-w-2xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-mono text-xs text-text-muted uppercase tracking-widest">
            {exam.title} — {exam.subtitle}
          </p>
        </div>
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
        timeRemaining={timeRemaining}
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
