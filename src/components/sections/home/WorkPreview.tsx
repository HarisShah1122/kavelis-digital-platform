import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { caseStudies } from '@/data/caseStudies'
import { Badge } from '@/components/ui/Badge'
import { Container, Section, SectionHeader } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { cn } from '@/lib/utils'

function WorkThumb({ variant }: { variant: number }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'rounded-t-2xl border-b border-navy-100 p-4',
        variant === 0 && 'bg-navy-950',
        variant === 1 && 'bg-teal-800',
        variant === 2 && 'bg-canvas',
      )}
    >
      <div
        className={cn(
          'rounded-lg border p-3',
          variant === 2 ? 'border-navy-100 bg-white' : 'border-white/10 bg-white/5',
        )}
      >
        <div className="mb-2.5 flex items-center gap-1.5">
          <span className={cn('h-1.5 w-1.5 rounded-full', variant === 2 ? 'bg-navy-200' : 'bg-white/25')} />
          <span className={cn('h-1.5 w-1.5 rounded-full', variant === 2 ? 'bg-navy-200' : 'bg-white/25')} />
          <span className="ml-1.5 h-1.5 w-14 rounded-full bg-teal-500/70" />
        </div>
        {variant === 1 ? (
          <div className="flex items-center gap-2 py-1">
            <div className="h-7 flex-1 rounded bg-white/10" />
            <span className="h-0.5 w-3 bg-teal-400/70" />
            <div className="h-7 flex-1 rounded bg-white/10" />
            <span className="h-0.5 w-3 bg-teal-400/70" />
            <div className="h-7 flex-1 rounded bg-teal-500/25" />
          </div>
        ) : variant === 2 ? (
          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="space-y-1">
                <div className={`h-8 rounded ${i === 1 ? 'bg-teal-100' : 'bg-navy-100'}`} />
                <div className="h-1 w-3/4 rounded-full bg-navy-100" />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex h-14 items-end gap-1.5">
            {[42, 66, 52, 84, 60, 90, 72].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t bg-teal-500/60"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export function WorkPreview() {
  return (
    <Section className="border-t border-navy-100">
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeader
            eyebrow="Selected work"
            title="Case studies behind the capability"
            description="A structured view of the problems we solve and how we deliver. Client details stay private unless publication is agreed."
          />
          <Reveal>
            <Link
              to="/work"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700 hover:text-teal-800"
            >
              All case studies
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {caseStudies.map((study, index) => (
            <Reveal key={study.id} delayMs={index * 70} className="h-full">
              <Link
                to={`/work/${study.id}`}
                className="card card-hover group flex h-full flex-col overflow-hidden p-0"
              >
                <WorkThumb variant={index % 3} />
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-xs font-semibold uppercase tracking-wider text-teal-600">
                      {study.category}
                    </p>
                    {study.isPlaceholder ? <Badge tone="warning">Template</Badge> : null}
                  </div>
                  <h3 className="mt-2.5 text-lg font-bold tracking-tight text-navy-950">
                    {study.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-charcoal-600">
                    {study.summary}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-teal-700">
                    Read case study
                    <ArrowRight
                      aria-hidden="true"
                      className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                    />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}
