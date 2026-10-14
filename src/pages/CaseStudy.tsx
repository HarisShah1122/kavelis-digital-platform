import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, AlertTriangle } from 'lucide-react'
import { caseStudies, getCaseStudyById } from '@/data/caseStudies'
import { useSeo } from '@/hooks/useSeo'
import { Container, Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { CtaBand } from '@/components/ui/CtaBand'
import NotFound from '@/pages/NotFound'

export default function CaseStudy() {
  const { caseStudyId } = useParams<{ caseStudyId: string }>()
  const study = caseStudyId ? getCaseStudyById(caseStudyId) : undefined

  useSeo({
    title: study ? study.title : 'Case study not found',
    description: study?.summary,
    path: `/work/${caseStudyId ?? ''}`,
    noindex: !study || study.isPlaceholder,
  })

  if (!study) {
    return <NotFound />
  }

  const related = caseStudies.filter((item) => item.id !== study.id).slice(0, 2)

  return (
    <>
      <section className="border-b border-navy-100 bg-gold-50">
        <Container className="section-tight">
          <Reveal>
            <Link
              to="/work"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-charcoal-500 transition-colors hover:text-gold-700"
            >
              <ArrowLeft aria-hidden="true" className="h-4 w-4" />
              All work
            </Link>
            <p className="eyebrow mt-6">{study.category}</p>
            <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight text-navy-950 sm:text-5xl">
              {study.title}
            </h1>
            <p className="lead mt-5 max-w-3xl">{study.overview}</p>
            <p className="mt-6 text-sm font-medium text-charcoal-500">{study.clientLabel}</p>
          </Reveal>
        </Container>
      </section>

      {study.isPlaceholder ? (
        <div className="border-b border-warning/25 bg-warning/10">
          <Container className="py-3.5">
            <p className="flex items-start gap-2.5 text-sm text-warning">
              <AlertTriangle aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
              <span>
                <strong className="font-semibold">Placeholder case study.</strong> This entry is a
                structural template. Replace it with verified project details and real outcomes
                before publishing.
              </span>
            </p>
          </Container>
        </div>
      ) : null}

      <Section>
        <Container>
          <div className="grid gap-8 lg:grid-cols-2">
            <Reveal>
              <div className="card h-full p-7 sm:p-8">
                <p className="eyebrow">Challenge</p>
                <p className="mt-4 text-base leading-relaxed text-charcoal-600">
                  {study.challenge}
                </p>
              </div>
            </Reveal>
            <Reveal delayMs={80}>
              <div className="card h-full border-gold-100 bg-gold-50/60 p-7 sm:p-8">
                <p className="eyebrow">Solution</p>
                <p className="mt-4 text-base leading-relaxed text-charcoal-600">{study.solution}</p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section className="border-y border-navy-100 bg-white">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            <Reveal>
              <div>
                <h2 className="text-xl font-bold text-navy-950">Key features</h2>
                <ul className="mt-5 space-y-3">
                  {study.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm leading-relaxed text-charcoal-600"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delayMs={80}>
              <div>
                <h2 className="text-xl font-bold text-navy-950">Implementation approach</h2>
                <ol className="mt-5 space-y-4">
                  {study.approach.map((step, index) => (
                    <li key={step} className="flex items-start gap-4">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-gold-50 text-xs font-semibold text-gold-700">
                        {index + 1}
                      </span>
                      <span className="text-sm leading-relaxed text-charcoal-600">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          </div>

          <div className="mt-10 rounded-2xl border border-navy-100 bg-canvas p-7 sm:p-8">
            <h2 className="text-lg font-bold text-navy-950">Technologies</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {study.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg border border-navy-100 bg-white px-3 py-1.5 text-sm font-medium text-navy-800"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="max-w-3xl rounded-2xl border border-gold-100 bg-gold-50/70 p-7 sm:p-8">
            <h2 className="text-xl font-bold text-navy-950">Outcomes</h2>
            {study.outcomes.length > 0 ? (
              <ul className="mt-5 space-y-3">
                {study.outcomes.map((outcome) => (
                  <li
                    key={outcome}
                    className="flex items-start gap-3 text-sm leading-relaxed text-charcoal-600"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500"
                    />
                    {outcome}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-sm leading-relaxed text-charcoal-600">
                Measurable outcomes are intentionally left empty. Kavelis only publishes results
                supported by project evidence — this section will be completed once verified metrics
                are available for the real project this template is replaced with.
              </p>
            )}
          </div>

          {related.length > 0 ? (
            <div className="mt-12">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <h2 className="text-2xl font-bold tracking-tight text-navy-950 sm:text-3xl">
                  More work
                </h2>
                <Link
                  to="/work"
                  className="text-sm font-semibold text-gold-700 hover:text-gold-800"
                >
                  All case studies →
                </Link>
              </div>
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                {related.map((item) => (
                  <Link
                    key={item.id}
                    to={`/work/${item.id}`}
                    className="card card-hover group flex h-full flex-col p-6"
                  >
                    <p className="text-xs font-semibold uppercase tracking-wider text-gold-600">
                      {item.category}
                    </p>
                    <h3 className="mt-3 text-lg font-semibold text-navy-950">{item.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-charcoal-500">
                      {item.summary}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-gold-700">
                      Read case study
                      <ArrowRight
                        aria-hidden="true"
                        className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                      />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </Container>
      </Section>

      <CtaBand
        title="Have a similar challenge?"
        description="Tell us about your project. We will respond with clarifying questions and a realistic first step."
        secondaryLabel="Explore services"
        secondaryTo="/services"
      />
    </>
  )
}
