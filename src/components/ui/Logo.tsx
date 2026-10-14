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
      {/* Kavelis logo asset from public/favicon.svg */}
      <img
        src="/favicon.svg"
        alt=""
        aria-hidden="true"
        width={36}
        height={36}
        className={cn(
          'h-9 w-9 shrink-0 rounded-[10px]',
          onDark && 'ring-1 ring-white/15',
        )}
      />
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
