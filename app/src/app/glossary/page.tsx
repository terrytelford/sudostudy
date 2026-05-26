import type { Metadata } from 'next'
import GlossarySearch from '@/components/glossary/GlossarySearch'
import YubiKeySquareAd from '@/components/ads/YubiKeySquareAd'

export const metadata: Metadata = {
  title: 'Cybersecurity Glossary | SudoStudy',
  description: '200+ cybersecurity terms for CompTIA Security+ SY0-701. Searchable definitions, acronyms, and related concepts.',
}

export default function GlossaryPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <p className="font-mono text-accent-green text-xs uppercase tracking-widest">
          Reference
        </p>
        <h1 className="font-mono text-3xl font-bold text-text-primary">Glossary</h1>
        <p className="text-text-muted text-sm">
          200+ Security+ terms. Search by name, acronym, or definition.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main content */}
        <main className="flex-1 min-w-0">
          <GlossarySearch />
        </main>

        {/* Sidebar ads */}
        <aside className="w-full lg:w-64 shrink-0">
          <div className="sticky top-24 flex flex-col gap-6">
            <YubiKeySquareAd />
          </div>
        </aside>
      </div>
    </div>
  )
}
