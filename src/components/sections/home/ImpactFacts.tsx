import { caseStudies } from '@/data/caseStudies'
import { marketplaceProducts } from '@/data/marketplace'
import { portfolioEntries } from '@/data/portfolio'
import { services } from '@/data/services'
import { useI18n } from '@/i18n'
import { Container, Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { Counter } from '@/components/ui/Counter'

/**
 * Section 11 — verified figures only. Every number is counted from data that
 * is published on this site, so it can never drift from what visitors can see.
 */
export function ImpactFacts() {
  const { t } = useI18n()
  const copy = t.home.impact

  const stats = [
    { id: 'storefronts', value: portfolioEntries.filter((entry) => entry.classification === 'client-work').length },
    { id: 'dashboards', value: caseStudies.length },
    { id: 'products', value: marketplaceProducts.length },
    { id: 'services', value: services.length },
  ] as const

  return (
    <Section className="border-y border-navy-100 bg-gold-50">
      <Container>
        <Reveal className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div className="max-w-xl">
            <p className="eyebrow">{copy.eyebrow}</p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-navy-950 sm:text-5xl">{copy.title}</h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-charcoal-600">{copy.note}</p>
        </Reveal>

        <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-gold-200 bg-gold-200 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Reveal key={stat.id} delayMs={index * 70} className="flex flex-col bg-gold-50 p-6 sm:p-8">
              <dt className="order-2 mt-3 text-sm leading-relaxed text-charcoal-600">{copy.stats[stat.id]}</dt>
              <dd className="order-1 font-display text-6xl leading-none text-navy-950 sm:text-7xl">
                <Counter value={stat.value} />
              </dd>
            </Reveal>
          ))}
        </dl>
      </Container>
    </Section>
  )
}
