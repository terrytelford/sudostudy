export type SecurityPlusDomain =
  | 'general-security-concepts'
  | 'threats-vulnerabilities-mitigations'
  | 'security-architecture'
  | 'security-operations'
  | 'security-program-management'

export type DifficultyLevel = 'easy' | 'medium' | 'hard'

export type AnswerKey = 'A' | 'B' | 'C' | 'D'

export interface Question {
  id: string
  domain: SecurityPlusDomain
  question: string
  options: Record<AnswerKey, string>
  correctAnswer: AnswerKey
  explanation: string
  difficulty: DifficultyLevel
}

export interface GlossaryTerm {
  id: string
  term: string
  definition: string
  category: GlossaryCategory
  relatedTerms?: string[]
  acronym?: string
}

export type GlossaryCategory =
  | 'cryptography'
  | 'network-security'
  | 'access-control'
  | 'threats-attacks'
  | 'identity-management'
  | 'cloud-security'
  | 'compliance'
  | 'incident-response'
  | 'physical-security'
  | 'protocols'
  | 'tools'
  | 'architecture'

export interface ExamSession {
  examId: string
  answers: Record<string, AnswerKey | null>
  startedAt: number
  completedAt?: number
  currentQuestion: number
}

export interface ExamResult {
  examId: string
  totalQuestions: number
  correctCount: number
  score: number
  passed: boolean
  domainScores: Record<SecurityPlusDomain, { correct: number; total: number }>
  answers: Record<string, { userAnswer: AnswerKey | null; correct: boolean }>
  completedAt: number
  timeSpentSeconds: number
}

export interface FlashcardProgress {
  [questionId: string]: 'unseen' | 'known' | 'review'
}

export interface ExamMeta {
  id: string
  title: string
  description: string
  questionCount: number
  estimatedMinutes: number
  difficulty: DifficultyLevel
  domainFocus: string
}

export const DOMAIN_LABELS: Record<SecurityPlusDomain, string> = {
  'general-security-concepts': 'General Security Concepts',
  'threats-vulnerabilities-mitigations': 'Threats, Vulnerabilities & Mitigations',
  'security-architecture': 'Security Architecture',
  'security-operations': 'Security Operations',
  'security-program-management': 'Security Program Management & Oversight',
}

export const DOMAIN_WEIGHTS: Record<SecurityPlusDomain, number> = {
  'general-security-concepts': 12,
  'threats-vulnerabilities-mitigations': 22,
  'security-architecture': 18,
  'security-operations': 28,
  'security-program-management': 20,
}

export const PASSING_SCORE = 83
export const EXAM_PASSING_SCALED = 750
export const EXAM_MAX_SCALED = 900
