import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Security+ Practice Exams | SudoStudy',
  description: '5 free CompTIA Security+ SY0-701 practice exams — 500 questions across all domains. Timed mode, scoring, and full answer review. No account required.',
  alternates: { canonical: 'https://sudostudy.online/exams' },
  openGraph: {
    title: '5 Free Security+ SY0-701 Practice Exams',
    description: '500 questions across all five SY0-701 domains. Timed and untimed modes, passing score tracker, and full answer review.',
    url: 'https://sudostudy.online/exams',
  },
}

export default function ExamsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
