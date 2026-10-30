import { ArrowRight, Info } from 'lucide-react'
import { pricingFaqs, requestSystemSteps } from '@/data/pricing'
import { useSeo } from '@/hooks/useSeo'
import { Button } from '@/components/ui/Button'
import { Container, Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { PageHero } from '@/components/ui/PageHero'
import { Accordion } from '@/components/ui/Accordion'
import { CtaBand } from '@/components/ui/CtaBand'
import { PricingComparison } from '@/components/sections/pricing/PricingComparison'

export default function Pricing() {
  useSeo({
    title: 'Pricing',
    description:
      'Monthly development subscriptions from $950/month, one-time digital products from $199, and custom project quotes — transparent ways to work with Kavelis.',
    path: '/pricing',
  })

  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Three ways to work with us"
        description="Monthly subscriptions for continuous development work, ready-made digital products at listed one-time prices, and custom quotes for larger builds. Pick the model that fits the job — not a one-size plan."
      >
        <div className="flex flex-wrap gap-3">
          <Button to="/contact" className="group">
            Talk to us
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            />
          </Button>
          <Button to="/products" variant="secondary">
            Browse products
          </Button>
        </div>
      </PageHero>

      {/* Subscription plans */}
      <Section>
        <Container>
          <Reveal className="mb-10 max-w-2xl">
            <p className="eyebrow">Monthly subscriptions</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy-950 sm:text-4xl">
              Ongoing development, one price per month
            </h2>
            <p className="mt-4 text-base leading-relaxed text-charcoal-600">
              For teams that need continuous website, feature, and integration work without
              scoping every task as a separate project. Prices in USD, billed monthly.
            </p>
          </Reveal>

          <PricingComparison />

          <Reveal className="mt-8">
            <p className="flex items-start gap-2.5 text-sm text-charcoal-500">
              <Info aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
              <span>
                Subscriptions cover the work listed in each plan. Large fixed-scope builds and
                anything outside the listed inclusions are quoted as custom projects — ask and we
                will say so honestly.
              </span>
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* How the request system works */}
      <Section className="border-y border-navy-100 bg-white">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
            <Reveal>
              <p className="eyebrow">How it works</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy-950 sm:text-4xl">
                The request system, explained
              </h2>
              <p className="mt-4 text-base leading-relaxed text-charcoal-600">
                Subscriptions are not unlimited-requests service. Work moves through a clear
                queue, so priorities stay honest and progress stays visible.
              </p>
              <div className="mt-6">
                <Button to="/contact" variant="secondary">
                  Ask about subscriptions
                </Button>
              </div>
            </Reveal>

            <ol className="space-y-4">
              {requestSystemSteps.map((step, index) => (
                <Reveal key={step.id} delayMs={index * 70}>
                  <li className="flex gap-4 rounded-2xl border border-navy-100 bg-canvas p-5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy-950 text-sm font-bold text-gold-400">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-navy-950">{step.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-charcoal-600">
                        {step.description}
                      </p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      {/* Products vs subscriptions vs custom */}
      <Section>
        <Container>
          <Reveal className="mb-10 max-w-2xl">
            <p className="eyebrow">Which model fits</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy-950 sm:text-4xl">
              Products, subscriptions, and custom projects
            </h2>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            <Reveal delayMs={0}>
              <article className="card flex h-full flex-col p-6">
                <h3 className="text-base font-bold text-navy-950">Digital products</h3>
                <p className="mt-1 text-sm font-semibold text-gold-700">From $199 · one-time</p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-charcoal-600">
                  Ready-made software with a defined base scope — inventory systems, stores,
                  dashboards, automation. Bought outright and deployed for your business. The
                  fastest and most predictable route when the base scope fits.
                </p>
                <div className="mt-5">
                  <Button to="/products" variant="secondary" className="w-full">
                    Browse the catalog
                  </Button>
                </div>
              </article>
            </Reveal>

            <Reveal delayMs={70}>
              <article className="card flex h-full flex-col border-gold-500 p-6">
                <h3 className="text-base font-bold text-navy-950">Subscriptions</h3>
                <p className="mt-1 text-sm font-semibold text-gold-700">
                  $950 – $3,000 · monthly
                </p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-charcoal-600">
                  Ongoing development capacity through a request queue — website, feature, and
                  integration work, month to month. Not a one-off website purchase: there is no
                  fixed deliverable attached, and the price stays predictable because requests move
                  through the queue one at a time.
                </p>
                <div className="mt-5">
                  <Button to="/contact?plan=growth" className="w-full">
                    Get Started with Growth
                  </Button>
                </div>
              </article>
            </Reveal>

            <Reveal delayMs={140}>
              <article className="card flex h-full flex-col p-6">
                <h3 className="text-base font-bold text-navy-950">Custom projects</h3>
                <p className="mt-1 text-sm font-semibold text-gold-700">Quoted after discovery</p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-charcoal-600">
                  Large builds, complex integrations, and enterprise work with genuinely variable
                  scope. You get a fixed proposal after a short discovery — no generic price list
                  pretending to fit everyone.
                </p>
                <div className="mt-5">
                  <Button to="/contact" variant="secondary" className="w-full">
                    Request a project quote
                  </Button>
                </div>
              </article>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section className="border-y border-navy-100 bg-white">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <p className="eyebrow">FAQ</p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-navy-950 sm:text-3xl">
                Pricing questions, answered honestly
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-charcoal-600">
                If something you need is not covered here, ask us directly — we would rather give
                a precise answer than a generic one.
              </p>
              <div className="mt-6">
                <Button to="/contact" variant="secondary">
                  Ask a question
                </Button>
              </div>
            </div>
            <Reveal>
              <Accordion items={pricingFaqs} />
            </Reveal>
          </div>
        </Container>
      </Section>

      <CtaBand
        title="Not sure which model fits?"
        description="Describe the work in plain language. We will point you to a product, a subscription, or a custom quote — whichever genuinely costs less for what you need."
        secondaryLabel="Browse products"
        secondaryTo="/products"
      />
    </>
  )
}
