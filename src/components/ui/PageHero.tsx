import type { ReactNode } from 'react'
import { Container } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'

interface PageHeroProps {
  eyebrow?: string
  title: string
  description: string
  children?: ReactNode
}

export function PageHero({ eyebrow, title, description, children }: PageHeroProps) {
  return (
    <section className="border-b border-navy-100 bg-teal-50">
      <Container className="section-tight">
        <Reveal className="max-w-3xl">
          {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-navy-950 sm:text-5xl">
            {title}
          </h1>
          <p className="lead mt-5">{description}</p>
          {children ? <div className="mt-8">{children}</div> : null}
        </Reveal>
      </Container>
    </section>
  )
}
