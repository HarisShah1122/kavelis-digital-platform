import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'

interface CtaBandProps {
  title?: string
  description?: string
  primaryLabel?: string
  primaryTo?: string
  /** Optional external (mailto:) action — used when a page has no route target. */
  primaryHref?: string
  secondaryLabel?: string
  secondaryTo?: string
  secondaryHref?: string
}

export function CtaBand({
  title = 'Have a product to build or a process to fix?',
  description = 'Tell us what you are working on. We will respond with honest scoping questions, realistic options, and a clear next step.',
  primaryLabel = 'Discuss Your Project',
  primaryTo = '/contact',
  primaryHref,
  secondaryLabel = 'Explore services',
  secondaryTo = '/services',
  secondaryHref,
}: CtaBandProps) {
  return (
    <section className="section-tight bg-navy-900">
      <Container>
        <Reveal className="flex flex-col items-start justify-between gap-8 rounded-2xl bg-navy-950 p-8 sm:p-10 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">{title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-navy-300 sm:text-base">{description}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {primaryHref ? (
              <Button href={primaryHref} className="group">
                {primaryLabel}
                <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            ) : (
              <Button to={primaryTo} className="group">
                {primaryLabel}
                <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            )}
            {secondaryHref ? (
              <Button href={secondaryHref} variant="ghost-light">
                {secondaryLabel}
              </Button>
            ) : (
              <Button to={secondaryTo} variant="ghost-light">
                {secondaryLabel}
              </Button>
            )}
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
