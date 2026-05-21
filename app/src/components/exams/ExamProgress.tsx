'use client'

import { formatTime } from '@/lib/utils'

interface ExamProgressProps {
  current: number
  total: number
  answered: number
  timeRemaining: number | null
}

export default function ExamProgress({
  current,
  total,
  answered,
  timeRemaining,
}: ExamProgressProps) {
  const pct = Math.round((current / total) * 100)
  const isLowTime = timeRemaining !== null && timeRemaining < 300

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between font-mono text-xs text-text-muted">
        <span>
          Question <span className="text-text-primary font-semibold">{current}</span> of {total}
        </span>
        <div className="flex items-center gap-4">
          <span>{answered} answered</span>
          {timeRemaining !== null && (
            <span className={isLowTime ? 'text-error animate-pulse font-semibold' : ''}>
              {formatTime(timeRemaining)}
            </span>
          )}
        </div>
      </div>

      <div className="h-1.5 rounded-full bg-bg-tertiary overflow-hidden">
        <div
          className="h-full rounded-full bg-accent-green transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
