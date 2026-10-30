import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { caseStudies } from '@/data/caseStudies'
import { useSeo } from '@/hooks/useSeo'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { PageHero } from '@/components/ui/PageHero'
import { Container, Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { CtaBand } from '@/components/ui/CtaBand'
import { cn } from '@/lib/utils'

/** Dashboard screenshot served from /public. */
function WorkImage({
  src,
  title,
  className,
}: {
  src: string
  title: string
  className?: string
}) {
  return (
    <div
      className={cn('overflow-hidden bg-navy-950 rounded-t-2xl', className)}
    >
      <img
        src={src}
        alt={`${title} dashboard preview`}
        loading="lazy"
        className="h-52 w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03] lg:h-full"
      />
    </div>
  )
}

/** CSS-only visual placeholders — used only when a study has no screenshot. */
function WorkThumb({
  variant,
  title,
  className,
}: {
  variant: number
  title: string
  className?: string
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'relative overflow-hidden border-b border-navy-100 p-5',
        variant === 0 && 'bg-navy-950',
        variant === 1 && 'bg-navy-900',
        variant === 2 && 'bg-canvas',
        'rounded-t-2xl',
        className,
      )}
    >
      <div
        className={cn(
          'mx-auto max-w-md rounded-xl border p-4 shadow-card',
          variant === 2 ? 'border-navy-100 bg-white' : 'border-white/10 bg-white/5',
        )}
      >
        <div className="mb-3 flex items-center gap-1.5">
          <span
            className={cn('h-2 w-2 rounded-full', variant === 2 ? 'bg-navy-200' : 'bg-white/25')}
          />
          <span
            className={cn('h-2 w-2 rounded-full', variant === 2 ? 'bg-navy-200' : 'bg-white/25')}
          />
          <span className="ml-2 h-2 w-20 rounded-full bg-gold-500/70" />
        </div>

        {variant === 0 ? (
          <div className="grid grid-cols-4 gap-3">
            <div className="col-span-1 space-y-2">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={cn('h-2 rounded-full', i === 0 ? 'bg-gold-400/70' : 'bg-white/15')}
                  style={{ width: `${[90, 70, 80, 60][i] ?? 70}%` }}
                />
              ))}
            </div>
            <div className="col-span-3">
              <div className="flex h-20 items-end gap-2">
                {[45, 70, 55, 85, 62, 92, 74].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t bg-gold-500/60"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
              <div className="mt-3 h-2 w-3/4 rounded-full bg-white/15" />
            </div>
          </div>
        ) : variant === 1 ? (
          <div className="flex items-center justify-between gap-2 py-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex flex-1 items-center gap-2">
                <div className="h-9 flex-1 rounded-lg bg-white/10" />
                {i < 2 ? <span className="h-0.5 w-4 bg-gold-400/70" /> : null}
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-2.5">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="space-y-1.5">
                <div className={cn('h-10 rounded-lg', i % 3 === 1 ? 'bg-gold-100' : 'bg-navy-100')} />
                <div className="h-1.5 w-3/4 rounded-full bg-navy-100" />
              </div>
            ))}
          </div>
        )}
      </div>
      <p className="mt-4 text-center text-[10px] uppercase tracking-widest text-navy-500">
        {title} dashboard preview
      </p>
    </div>
  )
}

export default function Work() {
  useSeo({
    title: 'Analytics Work Samples',
    description:
      'Power BI reports by Kavelis covering fleet operations and sales analytics — dashboard design, data modelling, and reporting capability.',
    path: '/work',
  })

  const spans = ['lg:col-span-4', 'lg:col-span-2', 'lg:col-span-6']

  return (
    <>
      <PageHero
        eyebrow="Analytics work"
        title="Dashboards and reporting work samples"
        description="Power BI reports covering fleet operations and sales analytics — published to show how Kavelis models data and designs reporting. Figures shown come from the dashboard datasets. No client, deployment, or business-result claims are made."
      >
        <div className="flex flex-wrap gap-3">
          <Button to="/contact" className="group">
            Discuss a similar project
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            />
          </Button>
          <Button to="/portfolio" variant="secondary">
            E-commerce portfolio
          </Button>
        </div>
      </PageHero>

      <Section>
        <Container>
          <div className="grid gap-6 lg:grid-cols-6">
            {caseStudies.map((study, index) => (
              <Reveal
                key={study.id}
                delayMs={index * 80}
                className={cn('h-full', spans[index] ?? 'lg:col-span-6')}
              >
                <Link
                  to={`/work/${study.id}`}
                  className={cn(
                    'card card-hover group flex h-full flex-col overflow-hidden p-0',
                    index === 2 && 'lg:flex-row',
                  )}
                >
                  {study.image ? (
                    <WorkImage
                      src={study.image}
                      title={study.title}
                      className={
                        index === 2
                          ? 'lg:w-1/3 lg:shrink-0 lg:rounded-bl-2xl lg:rounded-t-none lg:border-b-0 lg:border-r'
                          : undefined
                      }
                    />
                  ) : (
                    <WorkThumb
                      variant={index % 3}
                      title={study.category}
                      className={
                        index === 2
                          ? 'lg:w-1/3 lg:shrink-0 lg:rounded-bl-2xl lg:rounded-t-none lg:border-b-0 lg:border-r'
                          : undefined
                      }
                    />
                  )}
                  <div
                    className={cn(
                      'flex flex-1 flex-col p-6 sm:p-7',
                      index === 2 && 'sm:p-7',
                    )}
                  >
                    <div className="flex flex-wrap items-center gap-3">
                      <p className="text-xs font-semibold uppercase tracking-wider text-gold-600">
                        {study.category}
                      </p>
                      {study.isPlaceholder ? <Badge tone="warning">Template</Badge> : null}
                    </div>
                    <h2 className="mt-3 text-xl font-bold tracking-tight text-navy-950 sm:text-2xl">
                      {study.title}
                    </h2>
                    <p className="mt-1 text-xs text-charcoal-400">{study.clientLabel}</p>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-charcoal-600">
                      {study.summary}
                    </p>

                    <ul className="mt-4 flex flex-wrap gap-2">
                      {study.technologies.slice(0, 4).map((tech) => (
                        <li
                          key={tech}
                          className="rounded-full bg-navy-50 px-3 py-1 text-xs font-semibold text-navy-700"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>

                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-700">
                      Read case study
                      <ArrowRight
                        aria-hidden="true"
                        className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                      />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand
        title="Planning a similar project?"
        description="Share your challenge and constraints. We will tell you honestly whether we are the right partner and what a sensible first phase looks like."
        secondaryLabel="About Kavelis"
        secondaryTo="/about"
      />
    </>
  )
}
