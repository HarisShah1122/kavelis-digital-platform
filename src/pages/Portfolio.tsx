import { ArrowRight, ArrowUpRight, ExternalLink, Layers } from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  classificationExplanations,
  portfolioEntries,
  type PortfolioEntry,
} from '@/data/portfolio'
import { caseStudies } from '@/data/caseStudies'
import { useSeo } from '@/hooks/useSeo'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { PageHero } from '@/components/ui/PageHero'
import { Container, Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { StudyVisual } from '@/components/ui/StudyVisual'
import { CtaBand } from '@/components/ui/CtaBand'
import { cn } from '@/lib/utils'

const classificationTone: Record<PortfolioEntry['classification'], 'brand' | 'neutral' | 'warning'> = {
  'client-work': 'brand',
  'internal-product': 'neutral',
  'design-study': 'warning',
}

function StudyBlock({ entry, index }: { entry: PortfolioEntry; index: number }) {
  const flipped = index % 2 === 1

  return (
    <Reveal as="article" className="border-t border-navy-100 py-14 first:border-t-0 first:pt-0">
      <div
        className={cn(
          'grid items-start gap-10 lg:grid-cols-2 lg:gap-14',
          flipped && 'lg:[&>*:first-child]:order-2',
        )}
      >
        <div className="lg:sticky lg:top-24">
          {entry.image ? (
            <figure className="overflow-hidden rounded-xl border border-navy-200 bg-white shadow-card">
              <div className="flex items-center gap-2 border-b border-navy-100 bg-navy-50 px-3 py-2">
                <span className="h-2 w-2 rounded-full bg-navy-300" />
                <span className="h-2 w-2 rounded-full bg-navy-300" />
                <span className="h-2 w-2 rounded-full bg-navy-300" />
                <span className="ml-2 truncate rounded-md bg-white px-2.5 py-0.5 text-[10px] font-medium text-charcoal-500">
                  {entry.brandUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                </span>
              </div>
              <img
                src={entry.image}
                alt={entry.imageAlt ?? `${entry.brand} storefront screenshot`}
                loading="lazy"
                className="aspect-[16/10] w-full object-cover object-top"
              />
            </figure>
          ) : (
            <StudyVisual visual={entry.visual} />
          )}
          <p className="mt-3 text-xs text-charcoal-400">
            Screenshot of the live {entry.brand} storefront.
          </p>
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-3">
            <Badge tone={classificationTone[entry.classification]}>
              {entry.classificationLabel}
            </Badge>
            <p className="text-xs font-semibold uppercase tracking-wider text-charcoal-400">
              {entry.category}
            </p>
          </div>

          <h2 className="section-heading mt-4 text-3xl sm:text-4xl">{entry.title}</h2>

          <p className="lead mt-4">{entry.summary}</p>
          <p className="prose-measure mt-4 text-sm leading-relaxed text-charcoal-600">
            {entry.overview}
          </p>

          <h3 className="mt-8 text-sm font-bold uppercase tracking-[0.14em] text-navy-950">
            Design highlights
          </h3>
          <dl className="mt-4 space-y-4">
            {entry.designObservations.map((observation) => (
              <div key={observation.title} className="border-l-2 border-gold-500 pl-4">
                <dt className="text-sm font-bold text-navy-950">{observation.title}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-charcoal-600">
                  {observation.description}
                </dd>
              </div>
            ))}
          </dl>

          <h3 className="mt-8 text-sm font-bold uppercase tracking-[0.14em] text-navy-950">
            Commerce patterns noted
          </h3>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {entry.commercePatterns.map((pattern) => (
              <li
                key={pattern}
                className="flex items-start gap-2 text-sm leading-relaxed text-charcoal-600"
              >
                <span
                  aria-hidden="true"
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500"
                />
                {pattern}
              </li>
            ))}
          </ul>

          <div className="mt-8 rounded-2xl border border-navy-100 bg-white p-5 shadow-card">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-700">
              What Kavelis contributed
            </p>
            <p className="mt-2 text-sm leading-relaxed text-charcoal-600">{entry.contribution}</p>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <a
              href={entry.brandUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              {entry.linkLabel}
              <ExternalLink aria-hidden="true" className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </Reveal>
  )
}

export default function Portfolio() {
  useSeo({
    title: 'E-commerce Portfolio',
    description:
      'E-commerce projects by Kavelis — premium accessories, consumer brands, online grocery, and technical apparel storefronts, each linked to its live public site.',
    path: '/portfolio',
  })

  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="E-commerce work, classified honestly"
        description="Four e-commerce storefronts designed and developed by Kavelis, alongside our analytics work samples. Every entry links to the live public site, and every label states whether the work is client delivery, an internal product, or an independent design study."
      >
        <Button to="/work" className="group">
          Analytics work samples
          <ArrowRight
            aria-hidden="true"
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
          />
        </Button>
      </PageHero>

      <Section className="border-b border-navy-100 bg-white">
        <Container>
          <Reveal className="max-w-3xl">
            <p className="eyebrow">How entries are labelled</p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-navy-950 sm:text-3xl">
              Three classifications, used strictly
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {(
              [
                ['client-work', 'Client work'],
                ['internal-product', 'Internal product'],
                ['design-study', 'Design study'],
              ] as const
            ).map(([key, label], index) => (
              <Reveal key={key} delayMs={index * 60}>
                <div className="h-full rounded-2xl border border-navy-100 bg-canvas p-6">
                  <Badge tone={classificationTone[key]}>{label}</Badge>
                  <p className="mt-4 text-sm leading-relaxed text-charcoal-600">
                    {classificationExplanations[key]}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <Reveal className="mb-12 max-w-3xl">
            <p className="eyebrow">E-commerce projects</p>
            <h2 className="section-heading mt-3">Four storefronts, designed and built</h2>
            <p className="lead mt-4">
              Each project is a live public store: how it merchandises, how the catalogue is
              structured, and how the shopping experience handles the specific problem of its
              category.
            </p>
          </Reveal>

          {portfolioEntries.map((entry, index) => (
            <StudyBlock key={entry.id} entry={entry} index={index} />
          ))}
        </Container>
      </Section>

      <Section className="border-y border-navy-100 bg-white">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold-50 text-gold-700">
                  <Layers aria-hidden="true" className="h-5 w-5" />
                </span>
                <p className="eyebrow">Analytics work</p>
              </div>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy-950 sm:text-4xl">
                Power BI reports and dashboards
              </h2>
              <p className="mt-4 text-base leading-relaxed text-charcoal-600">
                Kavelis builds dashboards and reporting for fleet operations, sales analytics,
                and business KPIs. Figures published in those studies come from the dashboard
                datasets — no client, deployment, or business-result claims are attached to them.
              </p>
              <div className="mt-6">
                <Button to="/work" className="group">
                  View analytics work samples
                  <ArrowRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  />
                </Button>
              </div>
            </Reveal>

            <div className="grid gap-4 sm:grid-cols-3">
              {caseStudies.map((study, index) => (
                <Reveal key={study.id} delayMs={index * 60} className="h-full">
                  <Link
                    to={`/work/${study.id}`}
                    className="card card-hover group flex h-full flex-col overflow-hidden p-0"
                    aria-label={`${study.title} — open the analytics work sample`}
                  >
                    {study.image ? (
                      <div className="h-24 overflow-hidden bg-navy-950">
                        <img
                          src={study.image}
                          alt=""
                          loading="lazy"
                          className="h-full w-full object-cover object-top"
                        />
                      </div>
                    ) : null}
                    <div className="flex flex-1 flex-col p-4">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-gold-600">
                        {study.category}
                      </p>
                      <h3 className="mt-1.5 text-sm font-bold leading-snug text-navy-950">
                        {study.title}
                      </h3>
                      <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-gold-700">
                        Read sample
                        <ArrowUpRight aria-hidden="true" className="h-3 w-3" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <CtaBand
        title="Planning an e-commerce project?"
        description="Tell us about the catalogue, the platform, and the operational constraints. We will come back with a realistic scope and a clear first phase."
        secondaryLabel="E-commerce development"
        secondaryTo="/services/ecommerce-development"
      />
    </>
  )
}
