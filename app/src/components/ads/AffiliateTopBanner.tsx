import Link from 'next/link'

export default function AffiliateTopBanner() {
  return (
    <Link
      href="https://trk.udemy.com/X4njJa"
      target="_blank"
      rel="noopener noreferrer"
      className="group block overflow-hidden rounded-3xl border border-border bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 shadow-[0_16px_60px_-40px_rgba(0,255,136,0.33)] transition-transform hover:-translate-y-0.5"
    >
      <div className="flex flex-col gap-6 rounded-3xl bg-bg-secondary p-5 sm:p-6 md:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-3 min-w-0">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent-cyan/20 bg-accent-cyan/10 px-3 py-1 text-xs font-mono uppercase tracking-[0.18em] text-accent-cyan">
              Udemy Bestseller
            </div>
            <div className="min-w-0">
              <h2 className="font-mono text-2xl sm:text-3xl font-semibold text-text-primary leading-tight">
                CompTIA Security+ (SY0-701) Complete Course & Practice Exam
              </h2>
              <p className="mt-3 max-w-xl text-sm text-text-muted sm:text-base leading-relaxed">
                31 hours of on-demand video, 1 practice test, and expert exam prep for Security+. Includes a 30-day money-back guarantee and coupon savings.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-start gap-3 sm:items-end">
            <span className="inline-flex rounded-full border border-accent-green/25 bg-accent-green/5 px-3 py-1 text-xs font-mono uppercase tracking-[0.18em] text-accent-green">
              Save 89% with coupon
            </span>
            <span className="font-mono text-xs text-text-muted">Coupon code applied automatically</span>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-3xl border border-border bg-bg-primary/80 p-4">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-text-muted">Course length</p>
            <p className="mt-3 text-lg font-semibold text-text-primary">31 hours</p>
          </div>
          <div className="rounded-3xl border border-border bg-bg-primary/80 p-4">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-text-muted">Practice test</p>
            <p className="mt-3 text-lg font-semibold text-text-primary">1 full exam</p>
          </div>
          <div className="rounded-3xl border border-border bg-bg-primary/80 p-4">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-text-muted">Rating</p>
            <p className="mt-3 text-lg font-semibold text-text-primary">4.6 · 118k reviews</p>
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <p className="text-sm text-text-muted">
              Learn from a top-rated instructor and get exam-ready with course content that covers all SY0-701 domains.
            </p>
            <p className="text-xs text-text-muted">
              Secure link: affiliate partner offer via Udemy.
            </p>
          </div>

          <span className="inline-flex w-full justify-center rounded-2xl border border-accent-green bg-accent-green px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-bg-primary shadow-[0_8px_0_rgba(0,255,136,0.14)] transition-colors hover:bg-accent-green/90 sm:w-auto">
            Enroll now ↗
          </span>
        </div>
      </div>
    </Link>
  )
}
