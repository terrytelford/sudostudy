'use client'

import { useEffect } from 'react'
import { cn } from '@/lib/utils'
import { ADSENSE_CLIENT, ADSENSE_SLOTS } from '@/lib/ads'

declare global {
  interface Window {
    adsbygoogle?: Array<Record<string, unknown>>
  }
}

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

  const adClientId = adClient ?? ADSENSE_CLIENT
  const adSlotId = adSlot ?? ADSENSE_SLOTS[type]

  useEffect(() => {
    if (adClientId && adSlotId && typeof window !== 'undefined') {
      try {
        ;(window.adsbygoogle = window.adsbygoogle || []).push({})
      } catch (error) {
        console.warn('Adsense initialization failed:', error)
      }
    }
  }, [adClientId, adSlotId])

  if (adClientId && adSlotId) {
    return (
      <div className={cn('overflow-hidden', sizes[type], className)}>
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={adClientId}
          data-ad-slot={adSlotId}
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
