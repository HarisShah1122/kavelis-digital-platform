import type { CSSProperties, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface MarqueeProps {
  items: string[]
  /** Accessible label for the list (the duplicate copy is hidden from assistive tech). */
  label: string
  reverse?: boolean
  /** Seconds per full loop. */
  duration?: number
  className?: string
  renderItem?: (item: string) => ReactNode
  separator?: ReactNode
}

/**
 * Seamless infinite marquee (CSS only — see `.marquee` in index.css).
 * The list renders twice; the track translates by exactly -50%, so the loop
 * never shows a gap. Pauses on hover/focus and stops under reduced motion.
 */
export function Marquee({
  items,
  label,
  reverse = false,
  duration = 40,
  className,
  renderItem = (item) => item,
  separator,
}: MarqueeProps) {
  const copy = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} aria-label={hidden ? undefined : label} className="flex shrink-0 items-center">
      {items.map((item) => (
        <li key={item} className="flex shrink-0 items-center">
          {renderItem(item)}
          {separator}
        </li>
      ))}
    </ul>
  )

  return (
    <div className={cn('marquee', className)}>
      <div
        dir="ltr"
        data-reverse={reverse}
        className="marquee-track"
        style={{ '--marquee-duration': `${duration}s` } as CSSProperties}
      >
        {copy(false)}
        {copy(true)}
      </div>
    </div>
  )
}
