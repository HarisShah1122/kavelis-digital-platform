import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface BadgeProps {
  children: ReactNode
  className?: string
  tone?: 'blue' | 'neutral' | 'warning'
}

const tones: Record<NonNullable<BadgeProps['tone']>, string> = {
  blue: 'bg-teal-50 text-teal-700 ring-teal-200',
  neutral: 'bg-navy-50 text-navy-700 ring-navy-200',
  warning: 'bg-amber-50 text-amber-800 ring-amber-200',
}

export function Badge({ children, className, tone = 'blue' }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}
