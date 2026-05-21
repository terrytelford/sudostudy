'use client'

import { cn } from '@/lib/utils'

interface AdSlotProps {
  type: 'banner' | 'sidebar' | 'inline'
  className?: string
  adClient?: string
  adSlot?: string
}

export default function AdSlot({ type, className, adClient, adSlot }: AdSlotProps) {
  const sizes = {
    banner:  'h-24 w-full',
    sidebar: 'h-64 w-full',
    inline:  'h-20 w-full',
  }

  if (adClient && adSlot) {
    return (
      <div className={cn('overflow-hidden', sizes[type], className)}>
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={adClient}
          data-ad-slot={adSlot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    )
  }

  return (
    <div
      className={cn(
        'flex items-center justify-center rounded border border-dashed border-border bg-bg-secondary text-text-muted text-xs font-mono',
        sizes[type],
        className
      )}
    >
      [ advertisement ]
    </div>
  )
}
