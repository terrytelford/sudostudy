import Link from 'next/link'
import AffiliateBanner from '@/components/ads/AffiliateBanner'
import AffiliateTopBanner from '@/components/ads/AffiliateTopBanner'
import RecommendedResources from '@/components/resources/RecommendedResources'

export default function HomePage() {
  return (
    <div className="flex flex-col gap-16">
      {/* Hero */}
      <section className="flex flex-col gap-6 pt-8">
        <div className="flex flex-col gap-3">
          <p className="font-mono text-accent-green text-sm">
            &gt; CompTIA Security+ SY0-701 Prep_
          </p>
          <h1 className="font-mono text-4xl sm:text-5xl font-bold text-text-primary leading-tight">
            Pass the CompTIA Security+ Exam<br />
            <span className="text-accent-green">on your first try.</span>
          </h1>
          <p className="text-text-muted text-base leading-relaxed max-w-xl">
            500 practice questions, a searchable glossary, and interactive flashcards — built by a security student, for security students. Free. No account required.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/exams"
            className="font-mono text-sm font-semibold px-6 py-3 rounded border border-accent-green bg-accent-green text-bg-primary hover:bg-accent-green/90 transition-colors"
          >
            Start Practicing
          </Link>
          <Link
            href="/glossary"
            className="font-mono text-sm px-6 py-3 rounded border border-border text-text-muted hover:border-accent-cyan hover:text-accent-cyan transition-colors"
          >
            Browse Glossary
          </Link>
        </div>
      </section>

      <AffiliateBanner
        tag="Hardware"
        tagColor="cyan"
        title="YubiKey Security Key"
        description="Touch to verify. No app, no code, no phone. The MFA hardware used by security professionals."
        price="$41–$137"
        cta="View on Amazon"
        href="https://www.amazon.ca/stores/page/12C906A0-DCE4-44D9-B3C8-6072418D073D?_encoding=UTF8&pd_rd_plhdr=t&pd_rd_i=B07HBCTYP1&store_ref=SBV_A03446803C0Z2Y0CIRBQ5-A042588835L5YGIX5JXSR&lp_asins=B07HBCTYP1&pd_rd_w=P1jWc&content-id=amzn1.sym.4d83b9b7-b781-428b-aa24-c9ca5f477ffc%3Aamzn1.sym.4d83b9b7-b781-428b-aa24-c9ca5f477ffc&pf_rd_p=4d83b9b7-b781-428b-aa24-c9ca5f477ffc&pf_rd_r=X1MZTS19YSPH3BETVRG1&pd_rd_wg=LBxLf&pd_rd_r=c2c957ef-19c9-4e25-87c6-0afb891191a1&linkCode=ll2&tag=terrytelford-20&linkId=eb45cafed5ec0fe53d4fa3845d530c47&ref_=as_li_ss_tl"
      />

      {/* Feature cards */}
      <section className="flex flex-col gap-6">
        <h2 className="font-mono text-text-muted text-xs uppercase tracking-widest">
          What&apos;s included
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <FeatureCard
            href="/exams"
            icon="[exam]"
            title="5 Practice Exams"
            description="500 SY0-701 questions across all five domains. One question at a time — just like the real exam. Timed, scored, and reviewed."
            cta="Start an exam"
            color="accent-green"
          />
          <FeatureCard
            href="/glossary"
            icon="[def]"
            title="Glossary"
            description="200 cybersecurity terms with definitions, acronyms, and related concepts. Fuzzy search finds what you need in seconds."
            cta="Search terms"
            color="accent-cyan"
          />
          <FeatureCard
            href="/flashcards"
            icon="[flip]"
            title="Flashcards"
            description="Every exam question in flashcard form. Filter by exam or domain. Rate cards to track your weak areas."
            cta="Study cards"
            color="warning"
          />
        </div>
      </section>

      {/* Domain coverage */}
      <section className="flex flex-col gap-6">
        <h2 className="font-mono text-text-muted text-xs uppercase tracking-widest">
          Exam domain coverage
        </h2>
        <div className="rounded-lg border border-border bg-bg-secondary divide-y divide-border">
          {DOMAINS.map((d) => (
            <div key={d.name} className="flex items-center justify-between px-5 py-3">
              <span className="text-sm text-text-primary">{d.name}</span>
              <div className="flex items-center gap-3">
                <div className="hidden sm:block w-32 h-1.5 rounded-full bg-bg-tertiary overflow-hidden">
                  <div
                    className="h-full rounded-full bg-accent-green"
                    style={{ width: `${(d.weight / 28) * 100}%` }}
                  />
                </div>
                <span className="font-mono text-xs text-text-muted w-8 text-right">
                  {d.weight}%
                </span>
              </div>
            </div>
          ))}
        </div>
        <p className="font-mono text-xs text-text-muted">
          Questions distributed proportionally across all exams.
        </p>
      </section>

      <RecommendedResources />

      <AffiliateBanner
        tag="Book"
        tagColor="green"
        title="CompTIA Security+ SY0-701 Study Guide with Practice Tests"
        description="The official Sybex guide. Covers all five domains with 1,000+ practice questions and full exams."
        price="~$35"
        cta="View on Amazon"
        href="https://www.amazon.ca/Security-Practice-Tests-SY0-701-CertMike/dp/B0DHC632CY?dib=eyJ2IjoiMSJ9.cEgxVQi1TTld0XQJF2c_9uxDIeoYZB7MenxI6RkpIrXfIs1olnSGbRmBs9D-P8JrIYbk8r6K7KAvY5-nrso7t6XsqK-DsbcbWyDOsCpxx3fzcFn61aHXNp6iA_k09QVck_IQllmBvJ6zztn_-vRYQVsVqmA6Pj2462XSZ9rx0UKeOZJjD1NK8BNo3xpHAHwt5ZRG70AFhQ7oRdJQOXbcBwC-9CbQY7iqzd3zThXI28o9mECTcpQEYX1IrottiyFYubG7d0uPHnb4qzDxH-fpY6lJFLP_Uapt6x6-8HAls4Q.Q5mYzhrG6civTGe_VmnUIGKUh4H6Bl-8NXDLeoj6W8w&dib_tag=se&keywords=comptia+security+%2B&qid=1779378494&sr=8-38&linkCode=ll2&tag=terrytelford-20&linkId=76cd05d1fa075b7084f11cda24e65b2b&ref_=as_li_ss_tl"
      />

      <AffiliateTopBanner />

      {/* Disclaimer */}
      <section className="border-t border-border pt-6">
        <p className="text-xs text-text-muted leading-relaxed">
          SudoStudy is an independent study resource. CompTIA® and Security+® are registered trademarks of CompTIA, Inc. This site is not affiliated with or endorsed by CompTIA.
        </p>
      </section>
    </div>
  )
}

function FeatureCard({
  href,
  icon,
  title,
  description,
  cta,
  color,
}: {
  href: string
  icon: string
  title: string
  description: string
  cta: string
  color: 'accent-green' | 'accent-cyan' | 'warning'
}) {
  const borderHover = {
    'accent-green': 'hover:border-accent-green/50',
    'accent-cyan': 'hover:border-accent-cyan/50',
    warning: 'hover:border-warning/50',
  }[color]

  const ctaColor = {
    'accent-green': 'text-accent-green',
    'accent-cyan': 'text-accent-cyan',
    warning: 'text-warning',
  }[color]

  return (
    <Link
      href={href}
      className={`flex flex-col gap-3 rounded-lg border border-border bg-bg-secondary p-6 ${borderHover} transition-colors group`}
    >
      <span className={`font-mono text-sm ${ctaColor}`}>{icon}</span>
      <h3 className="font-mono font-semibold text-text-primary">{title}</h3>
      <p className="text-sm text-text-muted leading-relaxed flex-1">{description}</p>
      <span className={`font-mono text-xs ${ctaColor} group-hover:underline`}>
        {cta} →
      </span>
    </Link>
  )
}

const DOMAINS = [
  { name: '1. General Security Concepts', weight: 12 },
  { name: '2. Threats, Vulnerabilities & Mitigations', weight: 22 },
  { name: '3. Security Architecture', weight: 18 },
  { name: '4. Security Operations', weight: 28 },
  { name: '5. Security Program Management & Oversight', weight: 20 },
]
