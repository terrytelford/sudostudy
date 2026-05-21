'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const links = [
  { href: '/glossary',   label: 'Glossary' },
  { href: '/exams',      label: 'Practice Exams' },
  { href: '/flashcards', label: 'Flashcards' },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 bg-bg-primary/95 backdrop-blur border-b border-border">
      <nav className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center group">
          <Image
            src="/logo.png"
            alt="SudoStudy"
            width={140}
            height={40}
            priority
            className="h-8 w-auto"
          />
        </Link>

        <div className="flex items-center gap-1">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'px-3 py-1.5 rounded text-sm font-mono transition-colors',
                pathname?.startsWith(link.href)
                  ? 'bg-bg-tertiary text-accent-green'
                  : 'text-text-muted hover:text-text-primary hover:bg-bg-secondary'
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  )
}
