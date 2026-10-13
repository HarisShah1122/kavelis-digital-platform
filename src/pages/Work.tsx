import { ArrowRight, FolderKanban } from 'lucide-react'
import { caseStudies } from '@/data/caseStudies'
import { useSeo } from '@/hooks/useSeo'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { PageHero } from '@/components/ui/PageHero'
import { Container, Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { CtaBand } from '@/components/ui/CtaBand'

export default function Work() {
  useSeo({
    title: 'Work',
    description:
      'Selected Kavelis engagements and case studies — business challenge, solution delivered, and the technologies involved.',
    path: '/work',
  })

  return (
    <>
      <PageHero
        eyebrow="Work"
        title="Case studies from real engagements"
        description="A structured view of the problems we solve and how we deliver. Client details are kept private unless publication is agreed."
      >
        <Button to="/contact" className="group">
          Discuss a similar project
          <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Button>
      </PageHero>

      <Section>
        <Container>
          <Reveal className="mb-10 flex items-start gap-4 rounded-2xl border border-navy-200 bg-navy-50 p-5">
            <FolderKanban aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-navy-700" />
            <div>
              <h2 className="text-sm font-semibold text-navy-900">Case study templates</h2>
              <p className="mt-1 text-sm leading-relaxed text-charcoal-600">
                The entries below are structural templates. Replace them with verified project
                write-ups in{' '}
                <code className="rounded bg-white px-1.5 py-0.5 text-xs">
                  src/data/caseStudies.ts
                </code>{' '}
                — only include outcomes you can evidence, and never publish confidential client
                information without permission.
              </p>
            </div>
          </Reveal>

          <div className="space-y-6">
            {caseStudies.map((study, index) => (
              <Reveal key={study.id} delayMs={index * 80}>
                <article className="card p-7 sm:p-9">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-2xl font-bold tracking-tight text-navy-950">
                      {study.title}
                    </h2>
                    {study.isPlaceholder ? <Badge tone="warning">Template</Badge> : null}
                  </div>
                  <p className="mt-1.5 text-sm text-charcoal-500">{study.clientLabel}</p>

                  <div className="mt-7 grid gap-7 md:grid-cols-2">
                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-charcoal-500">
                        Business challenge
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-charcoal-700">
                        {study.challenge}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-charcoal-500">
                        Solution delivered
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-charcoal-700">
                        {study.solution}
                      </p>
                    </div>
                  </div>

                  <div className="mt-7">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-charcoal-500">
                      Technologies
                    </h3>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {study.technologies.map((tech) => (
                        <li
                          key={tech}
                          className="rounded-full bg-navy-50 px-3 py-1 text-xs font-semibold text-navy-700"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {study.outcomes.length > 0 ? (
                    <div className="mt-7">
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-charcoal-500">
                        Outcomes
                      </h3>
                      <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-charcoal-700">
                        {study.outcomes.map((outcome) => (
                          <li key={outcome}>{outcome}</li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p className="mt-7 text-xs italic text-charcoal-400">
                      Outcomes are intentionally omitted until supported by verified project
                      evidence.
                    </p>
                  )}
                </article>
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
