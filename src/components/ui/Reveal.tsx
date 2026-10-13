import type { ReactNode } from 'react'
import { useReveal } from '@/hooks/useReveal'
import { cn } from '@/lib/utils'

interface RevealProps {
  children: ReactNode
  className?: string
  delayMs?: number
  as?: 'div' | 'li' | 'article' | 'section'
}

export function Reveal({ children, className, delayMs = 0, as = 'div' }: RevealProps) {
  const { visible, setNode } = useReveal<HTMLElement>()
  const classes = cn('reveal', visible && 'reveal-visible', className)
  const style = delayMs > 0 ? { transitionDelay: `${delayMs}ms` } : undefined

  if (as === 'li') {
    return (
      <li ref={setNode} className={classes} style={style}>
        {children}
      </li>
    )
  }

  if (as === 'article') {
    return (
      <article ref={setNode} className={classes} style={style}>
        {children}
      </article>
    )
  }

  if (as === 'section') {
    return (
      <section ref={setNode} className={classes} style={style}>
        {children}
      </section>
    )
  }

  return (
    <div ref={setNode} className={classes} style={style}>
      {children}
    </div>
  )
}
