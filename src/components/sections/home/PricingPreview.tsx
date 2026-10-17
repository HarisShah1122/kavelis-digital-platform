import { ArrowRight, Info } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Container, Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { PricingComparison } from '@/components/sections/pricing/PricingComparison'

/** Homepage pricing band — real comparison, not teaser cards. */
export function PricingPreview() {
  return (
    <Section className="border-t border-navy-100 bg-white">
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">Pricing</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy-950 sm:text-4xl">
              Subscriptions from $950 a month
            </h2>
            <p className="mt-4 text-base leading-relaxed text-charcoal-600">
              Continuous development work on a predictable monthly price. One-time digital
              products start at $199, and larger custom builds are quoted after discovery.
            </p>
          </Reveal>
          <Reveal>
            <Link
              to="/pricing"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-700 hover:text-gold-800"
            >
              Full pricing details
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-12">
          <PricingComparison />
        </div>

        <Reveal className="mt-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="flex items-start gap-2.5 text-sm text-charcoal-500">
            <Info aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
            Not sure a subscription fits? Products and custom projects cover the rest — see all
            three models on the pricing page.
          </p>
          <Button to="/pricing" variant="secondary">
            Compare all options
          </Button>
        </Reveal>
      </Container>
    </Section>
  )
}
