import { AlertTriangle, ArrowRight, Check, HelpCircle } from 'lucide-react'
import { pricingTiers, engagementModels } from '@/data/pricing'
import { homeFaqs } from '@/data/content'
import { useSeo } from '@/hooks/useSeo'
import { Button } from '@/components/ui/Button'
import { Container, Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { PageHero } from '@/components/ui/PageHero'
import { Accordion } from '@/components/ui/Accordion'
import { CtaBand } from '@/components/ui/CtaBand'
import { cn } from '@/lib/utils'

const pricingFaqs = homeFaqs.filter((faq) =>
  ['pricing-models', 'starting-a-project', 'project-timeline', 'code-ownership', 'post-launch-support'].includes(
    faq.id,
  ),
)

export default function Pricing() {
  useSeo({
    title: 'Pricing',
    description:
      'Engagement models and pricing structure for Kavelis projects — fixed-scope builds, product teams, and maintenance retainers.',
    path: '/pricing',
  })

  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Engagements shaped to the work"
        description="Kavelis prices projects by engagement model — a fixed-scope build, an ongoing product team, or a maintenance retainer. Commercial details are confirmed after discovery, when scope is actually understood."
      >
        <div className="flex flex-wrap gap-3">
          <Button to="/contact" className="group">
            Discuss Your Project
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            />
          </Button>
          <Button to="/services" variant="secondary">
            Explore services
          </Button>
        </div>
      </PageHero>

      <div className="border-b border-amber-200 bg-amber-50">
        <Container className="py-3.5">
          <p className="flex items-start gap-2.5 text-sm text-amber-800">
            <AlertTriangle aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
            <span>
              <strong className="font-semibold">Pricing placeholders.</strong> Commercial terms are
              not confirmed. Every tier below shows inquiry-based pricing until real package details
              are approved and this notice is removed.
            </span>
          </p>
        </Container>
      </div>

      <Section>
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">
            {pricingTiers.map((tier, index) => (
              <Reveal key={tier.id} delayMs={index * 70}>
                <div
                  className={cn(
                    'card flex h-full flex-col p-7',
                    tier.featured && 'border-2 border-teal-600 shadow-card',
                  )}
                >
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="text-lg font-bold text-navy-950">{tier.name}</h2>
                    {tier.featured ? (
                      <span className="rounded-full bg-teal-600 px-2.5 py-1 text-xs font-semibold text-white">
                        Most common
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-2 text-sm font-medium text-teal-700">{tier.audience}</p>
                  <p className="mt-4 text-sm leading-relaxed text-charcoal-600">
                    {tier.description}
                  </p>

                  <div className="mt-6 border-t border-navy-100 pt-5">
                    <p className="text-2xl font-bold tracking-tight text-navy-950">
                      {tier.price}
                    </p>
                    <p className="mt-1 text-xs text-charcoal-500">{tier.timeline}</p>
                  </div>

                  <ul className="mt-5 flex-1 space-y-3">
                    {tier.scope.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-sm leading-relaxed text-charcoal-600"
                      >
                        <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-7">
                    <Button
                      to="/contact"
                      variant={tier.featured ? 'primary' : 'secondary'}
                      className="w-full"
                    >
                      Request pricing
                    </Button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-y border-navy-100 bg-white">
        <Container>
          <p className="eyebrow">How we work together</p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-navy-950 sm:text-3xl">
            Engagement models
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {engagementModels.map((model, index) => (
              <Reveal key={model.id} delayMs={index * 70}>
                <div className="card h-full p-6">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                    <HelpCircle aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-navy-950">{model.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal-500">
                    {model.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <p className="eyebrow">FAQ</p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-navy-950 sm:text-3xl">
                Pricing questions, answered honestly
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-charcoal-600">
                If something you need is not covered here, ask us directly — we would rather give a
                precise answer than a generic one.
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
        title="Ready to scope your project?"
        description="Tell us what you are building. We will respond with clarifying questions and engagement options that fit the actual work."
        secondaryLabel="See our work"
        secondaryTo="/work"
      />
    </>
  )
}
