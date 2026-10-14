import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface BadgeProps {
  children: ReactNode
  className?: string
  tone?: 'brand' | 'neutral' | 'warning'
}

const tones: Record<NonNullable<BadgeProps['tone']>, string> = {
  brand: 'bg-gold-50 text-gold-700 ring-gold-200',
  neutral: 'bg-navy-50 text-navy-700 ring-navy-200',
  warning: 'bg-warning/10 text-warning ring-warning/30',
}

export function Badge({ children, className, tone = 'brand' }: BadgeProps) {
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
