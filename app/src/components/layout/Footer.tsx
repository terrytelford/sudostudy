import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-border bg-bg-primary mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <p className="font-mono text-text-primary font-semibold">
              <span className="text-accent-green">$</span> SudoStudy
            </p>
            <p className="text-text-muted text-sm mt-1">
              CompTIA Security+ SY0-701 study resource. Not affiliated with CompTIA.
            </p>
          </div>
          <nav className="flex flex-wrap gap-4 text-sm text-text-muted">
            <Link href="/glossary"   className="hover:text-text-primary transition-colors">Glossary</Link>
            <Link href="/exams"      className="hover:text-text-primary transition-colors">Practice Exams</Link>
            <Link href="/flashcards" className="hover:text-text-primary transition-colors">Flashcards</Link>
          </nav>
        </div>
        <p className="text-text-muted text-xs mt-6">
          © {new Date().getFullYear()} sudostudy.online - For educational purposes only.
          CompTIA® and Security+® are registered trademarks of CompTIA, Inc.
        </p>
      </div>
    </footer>
  )
}
