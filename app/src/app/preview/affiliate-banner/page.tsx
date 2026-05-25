import AffiliateTopBanner from '@/components/ads/AffiliateTopBanner'

export default function PreviewAffiliateBannerPage() {
  return (
    <main className="min-h-screen bg-bg-primary px-4 py-10 text-text-primary">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <div className="space-y-3">
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent-cyan">
            Advertisement preview
          </p>
          <h1 className="font-mono text-4xl font-semibold text-text-primary">
            Udemy Security+ Top Banner Preview
          </h1>
          <p className="max-w-2xl text-sm text-text-muted leading-relaxed">
            This is a live preview of the responsive top-position affiliate banner for your site. Review the text, layout, and call to action before it is added to the production pages.
          </p>
        </div>

        <div className="rounded-3xl border border-border bg-bg-secondary p-6">
          <AffiliateTopBanner />
        </div>

        <div className="rounded-3xl border border-border bg-bg-secondary p-6 text-sm text-text-muted">
          <p>
            The banner is intentionally styled to match your dark terminal-inspired theme, with a clean responsive layout for desktop, tablet, and phone.
          </p>
          <p className="mt-3">
            When you approve it, I can place this at the top of the homepage or on any other landing page you choose.
          </p>
        </div>
      </div>
    </main>
  )
}
