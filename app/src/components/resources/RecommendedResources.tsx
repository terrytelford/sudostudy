import Link from 'next/link'

type ResourceTag = 'Book' | 'Course' | 'Exam Voucher' | 'Hardware'

interface Resource {
  tag: ResourceTag
  title: string
  author: string
  description: string
  price: string
  cta: string
  href: string
}

const TAG_STYLES: Record<ResourceTag, string> = {
  'Book':         'text-accent-green border-accent-green/30 bg-accent-green/5',
  'Course':       'text-accent-cyan border-accent-cyan/30 bg-accent-cyan/5',
  'Exam Voucher': 'text-warning border-warning/30 bg-warning/5',
  'Hardware':     'text-text-muted border-border bg-transparent',
}

// Replace href values with your affiliate links after signing up:
//   Amazon Associates:  https://affiliate-program.amazon.com
//   Udemy:              https://www.udemy.com/affiliate
//   CompTIA vouchers:   https://www.cj.com (search "CompTIA")
const RESOURCES: Resource[] = [
  {
    tag: 'Book',
    title: 'CompTIA Security+ SY0-701 Study Guide',
    author: 'Mike Chapple & David Seidl',
    description: 'The Sybex official guide. Covers all five domains with practice questions and a full exam at the end.',
    price: '~$35',
    cta: 'View on Amazon',
    href: 'https://www.amazon.com/s?k=comptia+security+sy0-701+study+guide',  // replace with your affiliate link
  },
  {
    tag: 'Book',
    title: 'CompTIA Security+ Practice Tests',
    author: 'Mike Chapple',
    description: '1,000+ practice questions organized by domain. Great companion to any study guide or course.',
    price: '~$28',
    cta: 'View on Amazon',
    href: 'https://www.amazon.com/s?k=comptia+security+practice+tests+sy0-701',  // replace with your affiliate link
  },
  {
    tag: 'Course',
    title: "Professor Messer's SY0-701 Video Course",
    author: 'Professor Messer',
    description: 'Free video course covering every exam objective. The most popular free resource for Security+ students.',
    price: 'Free',
    cta: 'Watch Free',
    href: 'https://www.professormesser.com/security-plus/sy0-701/sy0-701-video/sy0-701-comptia-security-plus-course/',
  },
  {
    tag: 'Course',
    title: 'CompTIA Security+ (SY0-701) — Udemy',
    author: 'Jason Dion',
    description: 'Top-rated video course with practice exams built in. Frequently on sale for under $20.',
    price: '~$15–20',
    cta: 'View on Udemy',
    href: 'https://www.udemy.com/course/securityplus/',  // replace with your Udemy affiliate link
  },
  {
    tag: 'Exam Voucher',
    title: 'CompTIA Security+ Exam Voucher',
    author: 'CompTIA',
    description: 'Official exam voucher. Buy when you are ready - valid for 12 months from purchase.',
    price: '~$392',
    cta: 'Buy Voucher',
    href: 'https://www.comptia.org/certifications/security',  // replace with your CJ affiliate link
  },
]

export default function RecommendedResources() {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="font-mono text-text-muted text-xs uppercase tracking-widest">
          Recommended resources
        </h2>
        <p className="text-text-muted text-sm">
          Handpicked books, courses, and tools used by Security+ students.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {RESOURCES.map((r) => (
          <Link
            key={r.title}
            href={r.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col gap-3 rounded-lg border border-border bg-bg-secondary p-5 hover:border-accent-green/30 transition-colors group"
          >
            <div className="flex items-center justify-between gap-2">
              <span className={`font-mono text-xs border px-1.5 py-0.5 rounded ${TAG_STYLES[r.tag]}`}>
                {r.tag}
              </span>
              <span className="font-mono text-xs text-text-muted">{r.price}</span>
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <h3 className="font-mono font-semibold text-text-primary text-sm leading-snug">
                {r.title}
              </h3>
              <p className="font-mono text-xs text-text-muted">{r.author}</p>
            </div>
            <p className="text-sm text-text-muted leading-relaxed">{r.description}</p>
            <span className="font-mono text-xs text-accent-green group-hover:underline">
              {r.cta} ↗
            </span>
          </Link>
        ))}
      </div>

      <p className="font-mono text-xs text-text-muted">
        * Some links are affiliate links. We may earn a small commission at no extra cost to you.
      </p>
    </section>
  )
}
