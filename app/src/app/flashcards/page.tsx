'use client'

import { useState, useMemo, useEffect } from 'react'
import { ALL_QUESTIONS, EXAMS } from '@/data/exams'
import FlashCard from '@/components/flashcards/FlashCard'
import DeckSelector, { type DeckFilter } from '@/components/flashcards/DeckSelector'
import { shuffle } from '@/lib/utils'
import {
  loadFlashcardProgress,
  saveFlashcardProgress,
  clearFlashcardProgress,
} from '@/lib/exam-state'
import type { Question, SecurityPlusDomain } from '@/types'

export default function FlashcardsPage() {
  const [filter, setFilter] = useState<DeckFilter>({ type: 'all', value: '' })
  const [deck, setDeck] = useState<Question[]>([])
  const [index, setIndex] = useState(0)
  const [gotIt, setGotIt] = useState(0)
  const [reviewed, setReviewed] = useState(0)
  const [sessionDone, setSessionDone] = useState(false)
  const [round, setRound] = useState(1)
  const [reviewPile, setReviewPile] = useState<Question[]>([])

  const filteredQuestions = useMemo(() => {
    if (filter.type === 'all') return ALL_QUESTIONS
    if (filter.type === 'exam') {
      const exam = EXAMS.find((e) => e.id === filter.value)
      return exam ? exam.questions : ALL_QUESTIONS
    }
    if (filter.type === 'domain') {
      return ALL_QUESTIONS.filter((q) => q.domain === (filter.value as SecurityPlusDomain))
    }
    return ALL_QUESTIONS
  }, [filter])

  useEffect(() => {
    const progress = loadFlashcardProgress()
    const shuffled = shuffle([...filteredQuestions])
    const reviewIds = new Set(
      Object.entries(progress)
        .filter(([, v]) => v === 'review')
        .map(([k]) => k)
    )
    const prioritized = [
      ...shuffled.filter((q) => reviewIds.has(q.id)),
      ...shuffled.filter((q) => !reviewIds.has(q.id)),
    ]
    setDeck(prioritized)
    setIndex(0)
    setGotIt(0)
    setReviewed(0)
    setSessionDone(false)
    setRound(1)
    setReviewPile([])
  }, [filter, filteredQuestions])

  function handleRate(rating: 'got-it' | 'review') {
    const progress = loadFlashcardProgress()
    progress[deck[index].id] = rating
    saveFlashcardProgress(progress)

    if (rating === 'got-it') setGotIt((n) => n + 1)
    setReviewed((n) => n + 1)

    const nextReviewPile = rating === 'review' ? [...reviewPile, deck[index]] : reviewPile
    const isLastCard = index + 1 >= deck.length

    if (isLastCard) {
      if (nextReviewPile.length > 0 && round === 1) {
        setRound(2)
        setDeck(shuffle([...nextReviewPile]))
        setReviewPile([])
        setIndex(0)
      } else {
        setSessionDone(true)
      }
    } else {
      setReviewPile(nextReviewPile)
      setIndex((i) => i + 1)
    }
  }

  function handleRestart() {
    const progress = loadFlashcardProgress()
    const shuffled = shuffle([...filteredQuestions])
    const reviewIds = new Set(
      Object.entries(progress)
        .filter(([, v]) => v === 'review')
        .map(([k]) => k)
    )
    const prioritized = [
      ...shuffled.filter((q) => reviewIds.has(q.id)),
      ...shuffled.filter((q) => !reviewIds.has(q.id)),
    ]
    setDeck(prioritized)
    setIndex(0)
    setGotIt(0)
    setReviewed(0)
    setSessionDone(false)
    setRound(1)
    setReviewPile([])
  }

  const pctCorrect = reviewed > 0 ? Math.round((gotIt / reviewed) * 100) : 0

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <p className="font-mono text-accent-green text-xs uppercase tracking-widest">
          Study
        </p>
        <h1 className="font-mono text-3xl font-bold text-text-primary">Flashcards</h1>
        <p className="text-text-muted text-sm">
          500 cards drawn from all practice exams. Tap a card to flip.
        </p>
      </div>

      <DeckSelector
        selected={filter}
        onSelect={(f) => setFilter(f)}
        cardCount={filteredQuestions.length}
      />

      {/* Round indicator */}
      {!sessionDone && deck.length > 0 && (
        <div className="flex items-center gap-4 font-mono text-xs text-text-muted">
          <span>
            ◉ Round {round} — {round === 1 ? 'full deck' : 'review-only'}
          </span>
          {reviewed > 0 && (
            <>
              <span>·</span>
              <span>
                <span className="text-text-primary">{index + 1}</span> / {deck.length}
              </span>
              <span>·</span>
              <span className="text-success">{gotIt} got it</span>
              <span>·</span>
              <span className="text-error">{reviewed - gotIt} review</span>
            </>
          )}
        </div>
      )}

      {/* Deck done */}
      {sessionDone ? (
        <div className="rounded-xl border border-border bg-bg-secondary p-10 text-center flex flex-col items-center gap-6">
          <p className="font-mono text-text-muted text-xs uppercase tracking-widest">
            Session Complete
          </p>
          <p className="font-mono text-5xl font-bold text-accent-green">{pctCorrect}%</p>
          <p className="text-text-muted text-sm">
            {gotIt} / {reviewed} cards correct
          </p>
          <div className="flex gap-3">
            <button
              onClick={handleRestart}
              className="font-mono text-sm px-5 py-2 rounded border border-accent-green text-accent-green hover:bg-accent-green hover:text-bg-primary transition-colors"
            >
              Restart Deck
            </button>
            <button
              onClick={() => {
                clearFlashcardProgress()
                handleRestart()
              }}
              className="font-mono text-sm px-5 py-2 rounded border border-border text-text-muted hover:border-accent-cyan hover:text-accent-cyan transition-colors"
            >
              Clear Progress
            </button>
          </div>
        </div>
      ) : deck.length > 0 ? (
        <FlashCard question={deck[index]} onRate={handleRate} />
      ) : (
        <p className="font-mono text-text-muted text-center py-12">No cards in this deck.</p>
      )}

      {/* Progress bar */}
      {deck.length > 0 && !sessionDone && (
        <div className="h-1 rounded-full bg-bg-tertiary overflow-hidden">
          <div
            className="h-full rounded-full bg-accent-green transition-all duration-300"
            style={{ width: `${(index / deck.length) * 100}%` }}
          />
        </div>
      )}
    </div>
  )
}
