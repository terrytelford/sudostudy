'use client'

import type { ExamSession, ExamResult, AnswerKey, FlashcardProgress } from '@/types'

const SESSION_PREFIX = 'sudostudy:exam:'
const RESULT_PREFIX = 'sudostudy:result:'
const FLASHCARD_KEY = 'sudostudy:flashcards'

export function saveSession(session: ExamSession) {
  if (typeof window === 'undefined') return
  localStorage.setItem(`${SESSION_PREFIX}${session.examId}`, JSON.stringify(session))
}

export function loadSession(examId: string): ExamSession | null {
  if (typeof window === 'undefined') return null
  const raw = localStorage.getItem(`${SESSION_PREFIX}${examId}`)
  return raw ? JSON.parse(raw) : null
}

export function clearSession(examId: string) {
  if (typeof window === 'undefined') return
  localStorage.removeItem(`${SESSION_PREFIX}${examId}`)
}

export function saveResult(result: ExamResult) {
  if (typeof window === 'undefined') return
  localStorage.setItem(`${RESULT_PREFIX}${result.examId}`, JSON.stringify(result))
}

export function loadResult(examId: string): ExamResult | null {
  if (typeof window === 'undefined') return null
  const raw = localStorage.getItem(`${RESULT_PREFIX}${examId}`)
  return raw ? JSON.parse(raw) : null
}

export function setAnswer(session: ExamSession, questionId: string, answer: AnswerKey): ExamSession {
  const updated = { ...session, answers: { ...session.answers, [questionId]: answer } }
  saveSession(updated)
  return updated
}

export function loadFlashcardProgress(): FlashcardProgress {
  if (typeof window === 'undefined') return {}
  const raw = localStorage.getItem(FLASHCARD_KEY)
  return raw ? JSON.parse(raw) : {}
}

export function saveFlashcardProgress(progress: FlashcardProgress) {
  if (typeof window === 'undefined') return
  localStorage.setItem(FLASHCARD_KEY, JSON.stringify(progress))
}

export function clearFlashcardProgress() {
  if (typeof window === 'undefined') return
  localStorage.removeItem(FLASHCARD_KEY)
}
