import { ArrowRight, Check } from 'lucide-react'
import { industries } from '@/data/industries'
import { useSeo } from '@/hooks/useSeo'
import { Button } from '@/components/ui/Button'
import { PageHero } from '@/components/ui/PageHero'
import { Container, Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { CtaBand } from '@/components/ui/CtaBand'

export default function Solutions() {
  useSeo({
    title: 'Solutions',
    description:
      'How Kavelis works with startups, SaaS companies, e-commerce businesses, SMEs, and operations-heavy organizations.',
    path: '/solutions',
  })

  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title="Built around how your business operates"
        description="Different businesses need different combinations of product engineering, automation, and integration. These are the engagement patterns we see most often."
      >
        <Button to="/contact" className="group">
          Talk through your situation
          <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Button>
      </PageHero>

      <Section>
        <Container>
          <Reveal className="mb-12 max-w-3xl">
            <p className="text-sm leading-relaxed text-charcoal-500">
              The profiles below describe typical fit and approach — not a claim of past client
              experience in each industry. If your situation is different, describe it and we will
              tell you honestly whether we can help.
            </p>
          </Reveal>

          <div className="space-y-6">
            {industries.map((industry, index) => (
              <Reveal key={industry.id} delayMs={index * 60}>
                <article
                  id={industry.id}
                  className="card grid gap-8 p-7 sm:p-9 lg:grid-cols-[1fr_1fr_1fr] lg:gap-10"
                >
                  <div>
                    <h2 className="text-xl font-bold tracking-tight text-navy-950">
                      {industry.title}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-charcoal-600">
                      {industry.description}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-charcoal-500">
                      Typical needs
                    </h3>
                    <ul className="mt-3 space-y-2.5">
                      {industry.needs.map((need) => (
                        <li
                          key={need}
                          className="flex items-start gap-2 text-sm leading-relaxed text-charcoal-700"
                        >
                          <Check
                            aria-hidden="true"
                            className="mt-0.5 h-4 w-4 shrink-0 text-electric-600"
                          />
                          {need}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-charcoal-500">
                      How we engage
                    </h3>
                    <ul className="mt-3 space-y-2.5">
                      {industry.approaches.map((approach) => (
                        <li
                          key={approach}
                          className="flex items-start gap-2 text-sm leading-relaxed text-charcoal-700"
                        >
                          <Check
                            aria-hidden="true"
                            className="mt-0.5 h-4 w-4 shrink-0 text-electric-600"
                          />
                          {approach}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand
        title="Does one of these match your situation?"
        description="Send a short brief. We will respond with the most relevant service combination and a suggested first step."
        secondaryLabel="Explore services"
        secondaryTo="/services"
      />
    </>
  )
}
