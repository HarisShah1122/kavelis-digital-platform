import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Reveal } from '@/components/ui/Reveal'

export function Container({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return <div className={cn('container-page', className)}>{children}</div>
}

interface SectionProps {
  children: ReactNode
  className?: string
  id?: string
  /** Renders the section on the dark navy surface. */
  dark?: boolean
}

export function Section({ children, className, id, dark = false }: SectionProps) {
  return (
    <section
      id={id}
      className={cn('section', dark ? 'bg-navy-950 text-white' : 'bg-white', className)}
    >
      {children}
    </section>
  )
}

interface SectionHeaderProps {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  className?: string
  /** Set to true on dark section backgrounds. */
  onDark?: boolean
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
  onDark = false,
}: SectionHeaderProps) {
  return (
    <Reveal
      className={cn(
        'max-w-2xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {eyebrow ? <p className={cn('eyebrow', onDark && 'text-electric-300')}>{eyebrow}</p> : null}
      <h2
        className={cn(
          'mt-3 text-3xl font-bold tracking-tight sm:text-4xl',
          onDark ? 'text-white' : 'text-navy-950',
        )}
      >
        {title}
      </h2>
      {description ? (
        <p className={cn('mt-4 text-base leading-relaxed sm:text-lg', onDark ? 'text-navy-200' : 'text-charcoal-600')}>
          {description}
        </p>
      ) : null}
    </Reveal>
  )
}
