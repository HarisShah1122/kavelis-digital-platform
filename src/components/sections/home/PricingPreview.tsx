import { ArrowRight, Check, Info } from 'lucide-react'
import { Link } from 'react-router-dom'
import { pricingTiers } from '@/data/pricing'
import { Button } from '@/components/ui/Button'
import { Container, Section, SectionHeader } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { cn } from '@/lib/utils'

export function PricingPreview() {
  return (
    <Section className="border-t border-navy-100 bg-white">
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeader
            eyebrow="Pricing"
            title="Engagements shaped to the work"
            description="Fixed-scope builds, ongoing product teams, or maintenance retainers — commercial details are confirmed after discovery, when scope is understood."
          />
          <Reveal>
            <Link
              to="/pricing"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700 hover:text-teal-800"
            >
              View pricing
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {pricingTiers.map((tier, index) => (
            <Reveal key={tier.id} delayMs={index * 70} className="h-full">
              <div
                className={cn(
                  'card flex h-full flex-col p-6',
                  tier.featured && 'border-2 border-teal-600',
                )}
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-base font-bold text-navy-950">{tier.name}</h3>
                  {tier.featured ? (
                    <span className="rounded-full bg-teal-600 px-2.5 py-1 text-xs font-semibold text-white">
                      Most common
                    </span>
                  ) : null}
                </div>
                <p className="mt-4 text-xl font-bold tracking-tight text-navy-950">
                  {tier.price}
                </p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-charcoal-600">
                  {tier.description}
                </p>
                <ul className="mt-4 space-y-2">
                  {tier.scope.slice(0, 3).map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm text-charcoal-600"
                    >
                      <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-5">
                  <Button to="/pricing" variant={tier.featured ? 'primary' : 'secondary'} className="w-full">
                    View details
                  </Button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-6">
          <p className="flex items-start gap-2.5 text-sm text-charcoal-500">
            <Info aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
            All prices are inquiry-based until commercial terms are confirmed — see the{' '}
            <Link to="/pricing" className="font-semibold text-teal-700 hover:text-teal-800">
              pricing page
            </Link>{' '}
            for details.
          </p>
        </Reveal>
      </Container>
    </Section>
  )
}
