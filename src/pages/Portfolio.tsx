import { useState } from 'react'
import { ArrowRight, ArrowUpRight, ExternalLink, Layers } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { PortfolioClassification, PortfolioEntry } from '@/data/portfolio'
import { useWork } from '@/i18n/data/work'
import type { Widen } from '@/i18n/en'
import { usePageCopy } from '@/i18n/localize'
import { workCopy } from '@/i18n/pages/work'
import { useSeo } from '@/hooks/useSeo'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { PageHero } from '@/components/ui/PageHero'
import { Container, Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { Picture } from '@/components/ui/Picture'
import { CtaBand } from '@/components/ui/CtaBand'
import { cn } from '@/lib/utils'

type Copy = Widen<typeof workCopy.en>

const classificationTone: Record<PortfolioClassification, 'brand' | 'neutral' | 'warning'> = {
  'client-work': 'brand',
  'internal-product': 'neutral',
  'design-study': 'warning',
}

const arrow = 'h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5'

function StudyBlock({ entry, index, copy }: { entry: PortfolioEntry; index: number; copy: Copy }) {
  const flipped = index % 2 === 1

  return (
    <div id={entry.id} className="scroll-mt-32 border-t border-navy-100 py-14 first:border-t-0 first:pt-0">
      <Reveal as="article">
        <div className={cn('grid items-start gap-10 lg:grid-cols-2 lg:gap-14', flipped && 'lg:[&>*:first-child]:order-2')}>
          <div className="lg:sticky lg:top-32">
            {entry.image ? (
              <figure className="overflow-hidden rounded-xl border border-navy-200 bg-white shadow-card">
                <div className="flex items-center gap-2 border-b border-navy-100 bg-navy-50 px-3 py-2">
                  <span className="h-2 w-2 rounded-full bg-navy-300" />
                  <span className="h-2 w-2 rounded-full bg-navy-300" />
                  <span className="h-2 w-2 rounded-full bg-navy-300" />
                  <span dir="ltr" className="ms-2 truncate rounded-md bg-white px-2.5 py-0.5 text-[10px] font-medium text-charcoal-500">
                    {entry.brandUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                  </span>
                </div>
                <Picture
                  src={entry.image}
                  alt={entry.imageAlt ?? entry.brand}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="aspect-[16/10] w-full object-cover object-top"
                />
              </figure>
            ) : null}
            <p className="mt-3 text-xs text-charcoal-400">{copy.screenshotCaption(entry.brand)}</p>
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-3">
              <Badge tone={classificationTone[entry.classification]}>{entry.classificationLabel}</Badge>
              <p className="text-xs font-semibold uppercase tracking-wider text-charcoal-400">{entry.category}</p>
            </div>
            <h2 className="section-heading mt-4 text-3xl sm:text-4xl">{entry.title}</h2>
            <p className="lead mt-4">{entry.summary}</p>
            <p className="prose-measure mt-4 text-sm leading-relaxed text-charcoal-600">{entry.overview}</p>

            <h3 className="mt-8 text-sm font-bold uppercase tracking-[0.14em] text-navy-950">{copy.designHighlights}</h3>
            <dl className="mt-4 space-y-4">
              {entry.designObservations.map((observation) => (
                <div key={observation.title} className="border-s-2 border-gold-500 ps-4">
                  <dt className="text-sm font-bold text-navy-950">{observation.title}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-charcoal-600">{observation.description}</dd>
                </div>
              ))}
            </dl>

            <h3 className="mt-8 text-sm font-bold uppercase tracking-[0.14em] text-navy-950">{copy.commercePatterns}</h3>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {entry.commercePatterns.map((pattern) => (
                <li key={pattern} className="flex items-start gap-2 text-sm leading-relaxed text-charcoal-600">
                  <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />
                  {pattern}
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-2xl border border-navy-100 bg-white p-5 shadow-card">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-700">{copy.contributed}</p>
              <p className="mt-2 text-sm leading-relaxed text-charcoal-600">{entry.contribution}</p>
            </div>

            <a href={entry.brandUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary mt-6">
              {entry.linkLabel}
              <ExternalLink aria-hidden="true" className="h-4 w-4" />
            </a>
          </div>
        </div>
      </Reveal>
    </div>
  )
}

type Filter = 'all' | 'ecommerce' | 'analytics'

export default function Portfolio() {
  const copy = usePageCopy(workCopy)
  const { entries, studies, classifications } = useWork()
  const [filter, setFilter] = useState<Filter>('all')

  useSeo({ title: copy.portfolioSeoTitle, description: copy.portfolioSeoDescription, path: '/portfolio' })

  const filters: Array<{ id: Filter; label: string; count: number }> = [
    { id: 'all', label: copy.filterAll, count: entries.length + studies.length },
    { id: 'ecommerce', label: copy.filterEcommerce, count: entries.length },
    { id: 'analytics', label: copy.filterAnalytics, count: studies.length },
  ]
  const classes: PortfolioClassification[] = ['client-work', 'internal-product', 'design-study']

  return (
    <>
      <PageHero eyebrow={copy.portfolioEyebrow} title={copy.portfolioTitle} description={copy.portfolioDescription}>
        <Button to="/work" className="group">
          {copy.analyticsSamples}
          <ArrowRight aria-hidden="true" className={arrow} />
        </Button>
      </PageHero>

      <Section className="border-b border-navy-100 bg-white">
        <Container>
          <Reveal className="max-w-3xl">
            <p className="eyebrow">{copy.labelsEyebrow}</p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-navy-950 sm:text-3xl">{copy.labelsTitle}</h2>
          </Reveal>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {classes.map((key, index) => (
              <Reveal key={key} delayMs={index * 60}>
                <div className="h-full rounded-2xl border border-navy-100 bg-canvas p-6">
                  <Badge tone={classificationTone[key]}>{copy.classificationNames[key]}</Badge>
                  <p className="mt-4 text-sm leading-relaxed text-charcoal-600">{classifications[key]}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <div className="sticky top-16 z-raised border-b border-navy-100 bg-canvas/95 backdrop-blur">
        <Container>
          <div role="group" aria-label={copy.filterLabel} className="no-scrollbar flex gap-2 overflow-x-auto py-4">
            {filters.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={filter === item.id}
                onClick={() => setFilter(item.id)}
                className={cn(
                  'inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors',
                  filter === item.id
                    ? 'border-navy-950 bg-navy-950 text-white'
                    : 'border-navy-200 text-charcoal-600 hover:border-gold-400 hover:text-navy-950',
                )}
              >
                {item.label}
                <span className={cn('text-xs', filter === item.id ? 'text-gold-300' : 'text-charcoal-400')}>{item.count}</span>
              </button>
            ))}
          </div>
        </Container>
      </div>

      {filter !== 'analytics' ? (
        <Section>
          <Container>
            <Reveal className="mb-12 max-w-3xl">
              <p className="eyebrow">{copy.ecommerceEyebrow}</p>
              <h2 className="section-heading mt-3">{copy.ecommerceTitle}</h2>
              <p className="lead mt-4">{copy.ecommerceDescription}</p>
            </Reveal>
            {entries.map((entry, index) => (
              <StudyBlock key={entry.id} entry={entry} index={index} copy={copy} />
            ))}
          </Container>
        </Section>
      ) : null}

      {filter !== 'ecommerce' ? (
        <Section className="border-y border-navy-100 bg-white">
          <Container>
            <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
              <Reveal>
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold-50 text-gold-700">
                    <Layers aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <p className="eyebrow">{copy.analyticsEyebrow}</p>
                </div>
                <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy-950 sm:text-4xl">{copy.analyticsTitle}</h2>
                <p className="mt-4 text-base leading-relaxed text-charcoal-600">{copy.analyticsDescription}</p>
                <Button to="/work" className="group mt-6">
                  {copy.viewAnalytics}
                  <ArrowRight aria-hidden="true" className={arrow} />
                </Button>
              </Reveal>

              <div className="grid gap-4 sm:grid-cols-3">
                {studies.map((study, index) => (
                  <Reveal key={study.id} delayMs={index * 60} className="h-full">
                    <Link
                      to={`/work/${study.id}`}
                      className="card card-hover group flex h-full flex-col overflow-hidden p-0"
                      aria-label={copy.openSample(study.title)}
                    >
                      {study.image ? (
                        <div className="h-24 overflow-hidden bg-navy-950">
                          <Picture src={study.image} alt="" sizes="240px" className="h-full w-full object-cover object-top" />
                        </div>
                      ) : null}
                      <div className="flex flex-1 flex-col p-4">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-gold-600">{study.category}</p>
                        <h3 className="mt-1.5 text-sm font-bold leading-snug text-navy-950">{study.title}</h3>
                        <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-gold-700">
                          {copy.readSample}
                          <ArrowUpRight aria-hidden="true" className="h-3 w-3 rtl:-scale-x-100" />
                        </span>
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          </Container>
        </Section>
      ) : null}

      <CtaBand
        title={copy.portfolioCtaTitle}
        description={copy.portfolioCtaDescription}
        secondaryLabel={copy.portfolioCtaSecondary}
        secondaryTo="/services/ecommerce-development"
      />
    </>
  )
}
