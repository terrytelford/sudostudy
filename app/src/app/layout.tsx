import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import Script from 'next/script'
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
  manifest: '/manifest.json',
  themeColor: '#0d1117',
  icons: { icon: '/favicon.gif' },
  other: {
    'google-adsense-account': 'ca-pub-5369366415795554',
  },
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'SudoStudy',
  url: 'https://sudostudy.online',
  description: 'Free CompTIA Security+ SY0-701 practice exams, flashcards, and glossary.',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://sudostudy.online/glossary?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'SudoStudy',
  url: 'https://sudostudy.online',
  description: 'Free CompTIA Security+ SY0-701 exam prep — 500 practice questions, flashcards, and a searchable cybersecurity glossary.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-bg-primary text-text-primary antialiased">
        <Navbar />
        <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">{children}</main>
        <Footer />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5369366415795554"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
