import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
  /** Inverts colors for dark surfaces (footer, dark sections). */
  onDark?: boolean
  linked?: boolean
}

export function Logo({ className, onDark = false, linked = true }: LogoProps) {
  const content = (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <span
        aria-hidden="true"
        className={cn(
          'grid h-9 w-9 shrink-0 place-items-center rounded-[10px] text-base font-bold tracking-tight',
          onDark ? 'bg-white text-navy-950' : 'bg-navy-950 text-gold-400',
        )}
      >
        K
      </span>
      <span
        className={cn(
          'text-lg font-semibold tracking-tight',
          onDark ? 'text-white' : 'text-navy-950',
        )}
      >
        Kavelis
      </span>
    </span>
  )

  if (!linked) {
    return content
  }

  return (
    <Link to="/" className="rounded-md" aria-label="Kavelis home">
      {content}
    </Link>
  )
}
