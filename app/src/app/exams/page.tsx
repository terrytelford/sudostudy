'use client'

import { useEffect, useState } from 'react'
import { EXAMS } from '@/data/exams'
import ExamCard from '@/components/exams/ExamCard'
import AdSlot from '@/components/ads/AdSlot'
import AffiliateBanner from '@/components/ads/AffiliateBanner'
import { loadResult } from '@/lib/exam-state'

export default function ExamsPage() {
  const [results, setResults] = useState<
    Record<string, { score: number; passed: boolean } | null>
  >({})

  useEffect(() => {
    const loaded: Record<string, { score: number; passed: boolean } | null> = {}
    for (const exam of EXAMS) {
      const result = loadResult(exam.id)
      loaded[exam.id] = result
        ? { score: result.score, passed: result.passed }
        : null
    }
    setResults(loaded)
  }, [])

  const completedCount = Object.values(results).filter(Boolean).length

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <p className="font-mono text-accent-green text-xs uppercase tracking-widest">
          Practice
        </p>
        <h1 className="font-mono text-3xl font-bold text-text-primary">Practice Exams</h1>
        <p className="text-text-muted text-sm">
          5 exams · 100 questions each · 90 minutes · Covers all SY0-701 domains
        </p>
        {completedCount > 0 && (
          <p className="font-mono text-xs text-accent-green">
            {completedCount} of {EXAMS.length} completed
          </p>
        )}
      </div>

      <AdSlot type="banner" />

      <AffiliateBanner
        tag="Hardware"
        tagColor="cyan"
        title="YubiKey Security Key"
        description="Touch to verify. No app, no code, no phone. The MFA hardware used by security professionals."
        price="$41–$137"
        cta="View on Amazon"
        href="https://www.amazon.ca/stores/page/12C906A0-DCE4-44D9-B3C8-6072418D073D?_encoding=UTF8&pd_rd_plhdr=t&pd_rd_i=B07HBCTYP1&store_ref=SBV_A03446803C0Z2Y0CIRBQ5-A042588835L5YGIX5JXSR&lp_asins=B07HBCTYP1&pd_rd_w=P1jWc&content-id=amzn1.sym.4d83b9b7-b781-428b-aa24-c9ca5f477ffc%3Aamzn1.sym.4d83b9b7-b781-428b-aa24-c9ca5f477ffc&pf_rd_p=4d83b9b7-b781-428b-aa24-c9ca5f477ffc&pf_rd_r=X1MZTS19YSPH3BETVRG1&pd_rd_wg=LBxLf&pd_rd_r=c2c957ef-19c9-4e25-87c6-0afb891191a1&linkCode=ll2&tag=terrytelford-20&linkId=eb45cafed5ec0fe53d4fa3845d530c47&ref_=as_li_ss_tl"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {EXAMS.map((exam) => (
          <ExamCard key={exam.id} exam={exam} result={results[exam.id] ?? null} />
        ))}
      </div>

      <div className="rounded-lg border border-border bg-bg-secondary p-5 flex flex-col gap-2">
        <p className="font-mono text-xs text-text-muted uppercase tracking-widest">
          Passing Score
        </p>
        <p className="text-sm text-text-primary">
          The real Security+ exam is scored 100–900. You need <span className="text-accent-green font-semibold">750</span> to pass (83%). These practice exams use the same threshold.
        </p>
      </div>
    </div>
  )
}
