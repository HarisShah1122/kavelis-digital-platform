import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import kavelisLogo from '@/assets/kavelis-logo.jpeg'

interface LogoProps {
  className?: string
  /** Inverts colors for dark surfaces (footer, dark sections). */
  onDark?: boolean
  linked?: boolean
}

export function Logo({ className, onDark = false, linked = true }: LogoProps) {
  const content = onDark ? (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <img
        src="/favicon.svg"
        alt=""
        aria-hidden="true"
        width={36}
        height={36}
        className="h-9 w-9 shrink-0 rounded-[10px] ring-1 ring-white/15"
      />
      <span className="text-lg font-semibold tracking-tight text-white">Kavelis</span>
    </span>
  ) : (
    <span className={cn('inline-flex items-center', className)}>
      <img
        src={kavelisLogo}
        alt="Kavelis"
        width={125}
        height={36}
        className="h-9 w-auto shrink-0"
      />
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
