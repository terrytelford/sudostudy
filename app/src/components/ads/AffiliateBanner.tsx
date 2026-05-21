import Link from 'next/link'

interface AffiliateBannerProps {
  tag: string
  tagColor?: 'green' | 'cyan' | 'warning'
  title: string
  description: string
  price: string
  cta: string
  href: string
}

const TAG_COLORS = {
  green:   'text-accent-green border-accent-green/30 bg-accent-green/5',
  cyan:    'text-accent-cyan border-accent-cyan/30 bg-accent-cyan/5',
  warning: 'text-warning border-warning/30 bg-warning/5',
}

export default function AffiliateBanner({
  tag,
  tagColor = 'green',
  title,
  description,
  price,
  cta,
  href,
}: AffiliateBannerProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-lg border border-border bg-bg-secondary hover:border-accent-green/40 transition-colors px-5 py-4 group"
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 min-w-0">
        <div className="flex items-center gap-3 shrink-0">
          <span className={`font-mono text-xs border px-1.5 py-0.5 rounded ${TAG_COLORS[tagColor]}`}>
            {tag}
          </span>
          <span className="font-mono text-xs text-text-muted">{price}</span>
        </div>
        <div className="flex flex-col gap-0.5 min-w-0">
          <span className="font-mono font-semibold text-sm text-text-primary leading-snug">
            {title}
          </span>
          <span className="text-xs text-text-muted leading-relaxed">{description}</span>
        </div>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <span className="font-mono text-xs px-4 py-2 rounded border border-accent-green text-accent-green group-hover:bg-accent-green group-hover:text-bg-primary transition-colors whitespace-nowrap">
          {cta} ↗
        </span>
        <span className="font-mono text-xs text-text-muted hidden sm:inline">affiliate</span>
      </div>
    </Link>
  )
}
