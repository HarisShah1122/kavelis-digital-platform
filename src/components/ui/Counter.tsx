import { useEffect, useState } from 'react'
import { useReveal } from '@/hooks/useReveal'

/**
 * Counts up to `value` once it scrolls into view. The final number is what
 * screen readers see; reduced motion skips the animation. Western digits are
 * used in both languages, matching the rest of the site.
 */
export function Counter({ value, className }: { value: number; className?: string }) {
  const { visible, setNode } = useReveal<HTMLSpanElement>(0.4)
  // Start at 0 so the count-up never flashes the final value first.
  const [display, setDisplay] = useState(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ? value : 0,
  )

  useEffect(() => {
    if (!visible || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(value)
      return
    }
    const duration = 1100
    const start = performance.now()
    let frame = 0
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration)
      setDisplay(Math.round(value * (1 - Math.pow(1 - progress, 3))))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [visible, value])

  return (
    <span ref={setNode} className={className}>
      <span aria-hidden="true">{display.toLocaleString('en-US')}</span>
      <span className="sr-only">{value}</span>
    </span>
  )
}
