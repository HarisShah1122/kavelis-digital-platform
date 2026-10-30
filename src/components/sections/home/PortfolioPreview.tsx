import { ArrowRight, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'
import { portfolioEntries } from '@/data/portfolio'
import { Container, Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { StudyVisual } from '@/components/ui/StudyVisual'

/**
 * Homepage preview of the e-commerce portfolio.
 * Each card links to the portfolio page, which carries the full write-up.
 */
export function PortfolioPreview() {
  return (
    <Section className="border-t border-navy-100">
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">E-commerce portfolio</p>
            <h2 className="section-heading mt-3">Four storefronts, designed and built</h2>
            <p className="mt-4 text-base leading-relaxed text-charcoal-600">
              E-commerce projects delivered by Kavelis — premium accessories, consumer snacks,
              online grocery, and technical apparel. Each entry links to the live public store.
            </p>
          </Reveal>
          <Reveal>
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-700 hover:text-gold-800"
            >
              Full portfolio
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {portfolioEntries.map((entry, index) => (
            <Reveal key={entry.id} delayMs={index * 70} className="h-full">
              <article className="card card-hover group flex h-full flex-col overflow-hidden p-0">
                {entry.image ? (
                  <div className="h-44 overflow-hidden bg-navy-950">
                    <img
                      src={entry.image}
                      alt={entry.imageAlt ?? `${entry.brand} storefront screenshot`}
                      loading="lazy"
                      className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                ) : (
                  <div className="p-5 pb-0">
                    <StudyVisual visual={entry.visual} />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gold-600">
                      {entry.category}
                    </p>
                    <span className="rounded-full bg-gold-50 px-2.5 py-0.5 text-[11px] font-semibold text-gold-700 ring-1 ring-inset ring-gold-200">
                      {entry.classificationLabel}
                    </span>
                  </div>
                  <h3 className="mt-2.5 text-lg font-bold tracking-tight text-navy-950">
                    {entry.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-charcoal-600">
                    {entry.summary}
                  </p>
                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-navy-100 pt-4">
                    <Link
                      to="/portfolio"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-700 hover:text-gold-800"
                    >
                      Read the case
                      <ArrowRight
                        aria-hidden="true"
                        className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                      />
                    </Link>
                    <a
                      href={entry.brandUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-charcoal-500 transition-colors hover:text-navy-950"
                    >
                      {entry.brand}
                      <ExternalLink aria-hidden="true" className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}
