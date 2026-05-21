import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: { default: 'SudoStudy - CompTIA Security+ Exam Prep', template: '%s | SudoStudy' },
  description: 'Free CompTIA Security+ SY0-701 practice exams, interactive flashcards, and cybersecurity glossary. Elevate your prep.',
  metadataBase: new URL('https://sudostudy.online'),
  openGraph: {
    title: 'SudoStudy - CompTIA Security+ Exam Prep',
    description: 'Free CompTIA Security+ SY0-701 practice exams, interactive flashcards, and cybersecurity glossary.',
    url: 'https://sudostudy.online',
    siteName: 'SudoStudy',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SudoStudy - CompTIA Security+ Exam Prep',
    description: 'Free CompTIA Security+ SY0-701 practice exams, interactive flashcards, and cybersecurity glossary.',
  },
  robots: { index: true, follow: true },
  other: { 'impact-site-verification': '54b14d4a-df41-41fa-9092-de8a1d823b31' },
  manifest: '/manifest.json',
  themeColor: '#0d1117',
  icons: { icon: '/favicon.gif' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen flex flex-col bg-bg-primary text-text-primary antialiased">
        <Navbar />
        <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
