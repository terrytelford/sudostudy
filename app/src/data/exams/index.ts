import type { Question } from '@/types'
import { DOMAIN_LABELS, DOMAIN_WEIGHTS } from '@/types'
import exam1 from './exam-1'
import exam2 from './exam-2'
import exam3 from './exam-3'
import exam4 from './exam-4'
import exam5 from './exam-5'

export interface ExamMeta {
  id: string
  title: string
  subtitle: string
  description: string
  questionCount: number
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert' | 'Elite'
  focusDomains: string[]
  questions: Question[]
  timeLimit: number // minutes
  badgeColor: string
}

export const EXAMS: ExamMeta[] = [
  {
    id: 'exam-1',
    title: 'Exam 1',
    subtitle: 'Foundations',
    description: 'Core security concepts, cryptography fundamentals, and threat awareness. Covers all domains with an emphasis on terminology and basic principles.',
    questionCount: 100,
    difficulty: 'Beginner',
    focusDomains: Object.values(DOMAIN_LABELS),
    questions: exam1,
    timeLimit: 90,
    badgeColor: 'text-accent-green border-accent-green',
  },
  {
    id: 'exam-2',
    title: 'Exam 2',
    subtitle: 'Applied Concepts',
    description: 'PKI, network architecture, advanced cryptography, SIEM operations, and compliance frameworks. Builds on Exam 1 with applied scenarios.',
    questionCount: 100,
    difficulty: 'Intermediate',
    focusDomains: Object.values(DOMAIN_LABELS),
    questions: exam2,
    timeLimit: 90,
    badgeColor: 'text-accent-cyan border-accent-cyan',
  },
  {
    id: 'exam-3',
    title: 'Exam 3',
    subtitle: 'Access & Application',
    description: 'Identity federation, secure coding, web application security, DevSecOps, and business continuity. Heavy on Security Operations and Program Management.',
    questionCount: 100,
    difficulty: 'Intermediate',
    focusDomains: Object.values(DOMAIN_LABELS),
    questions: exam3,
    timeLimit: 90,
    badgeColor: 'text-accent-cyan border-accent-cyan',
  },
  {
    id: 'exam-4',
    title: 'Exam 4',
    subtitle: 'Scenario-Based',
    description: 'Harder scenario questions covering advanced attacks, forensics, APT techniques, and complex compliance scenarios. Mirrors real exam difficulty.',
    questionCount: 100,
    difficulty: 'Advanced',
    focusDomains: Object.values(DOMAIN_LABELS),
    questions: exam4,
    timeLimit: 90,
    badgeColor: 'text-warning border-warning',
  },
  {
    id: 'exam-5',
    title: 'Exam 5',
    subtitle: 'Expert Challenge',
    description: 'The hardest questions in the set. Post-quantum cryptography, advanced threat hunting, memory forensics, cloud architecture, and nuanced regulatory analysis.',
    questionCount: 100,
    difficulty: 'Elite',
    focusDomains: Object.values(DOMAIN_LABELS),
    questions: exam5,
    timeLimit: 90,
    badgeColor: 'text-error border-error',
  },
]

export const ALL_QUESTIONS: Question[] = [
  ...exam1,
  ...exam2,
  ...exam3,
  ...exam4,
  ...exam5,
]

export function getExamById(id: string): ExamMeta | undefined {
  return EXAMS.find((e) => e.id === id)
}

export { exam1, exam2, exam3, exam4, exam5, DOMAIN_LABELS, DOMAIN_WEIGHTS }
