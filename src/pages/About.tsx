import { ArrowRight } from 'lucide-react'
import { differentiators, processSteps } from '@/data/content'
import { useSeo } from '@/hooks/useSeo'
import { Button } from '@/components/ui/Button'
import { PageHero } from '@/components/ui/PageHero'
import { Container, Section, SectionHeader } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { CtaBand } from '@/components/ui/CtaBand'

const principles = [
  {
    title: 'Clarity over jargon',
    description:
      'Technical decisions are explained in business terms. You should always understand the trade-offs you are paying for.',
  },
  {
    title: 'Scope honesty',
    description:
      'If a request will not move the metric it is meant to move, we say so before it becomes an invoice.',
  },
  {
    title: 'Craft in the details',
    description:
      'Accessibility, performance, error states, and documentation are part of the work — not extras added at the end.',
  },
  {
    title: 'Respect for your time',
    description:
      'Async-first communication, prepared demos, and fewer but better meetings keep projects moving.',
  },
]

export default function About() {
  useSeo({
    title: 'About',
    description:
      'Kavelis is a technology partner focused on SaaS products, automation, and custom software — built with engineering discipline and transparent delivery.',
    path: '/about',
  })

  return (
    <>
      <PageHero
        eyebrow="About"
        title="A technology partner for companies that take software seriously"
        description="Kavelis exists to help businesses launch products, automate operations, improve customer experiences, and scale their digital operations — with software that stays maintainable long after launch."
      />

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <Reveal>
              <p className="eyebrow">Mission</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy-950 sm:text-4xl">
                Engineering that serves the business
              </h2>
            </Reveal>
            <Reveal delayMs={80} className="space-y-5">
              <p className="text-base leading-relaxed text-charcoal-700 sm:text-lg">
                Too much software is built to impress rather than to work. Kavelis takes the
                opposite approach: understand the business problem first, design the smallest
                system that genuinely solves it, then build it with the quality needed to operate
                it for years.
              </p>
              <p className="text-base leading-relaxed text-charcoal-700 sm:text-lg">
                We work with founders, product teams, and operators — as a focused engineering
                partner rather than a body shop. That means caring about architecture, delivery
                discipline, and the day-to-day experience of the people who will use what we ship.
              </p>
              <Button to="/contact" className="group mt-2">
                Work with us
                <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section className="border-y border-navy-100 bg-navy-50/40">
        <Container>
          <SectionHeader
            eyebrow="Principles"
            title="How we work"
            description="Four commitments that shape every engagement."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {principles.map((principle, index) => (
              <Reveal key={principle.title} delayMs={index * 60}>
                <div className="card h-full p-6">
                  <h3 className="text-lg font-semibold text-navy-950">{principle.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal-600">
                    {principle.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader
            eyebrow="Delivery"
            title="Collaboration without the black box"
            description="You are never guessing where a project stands. Here is the process every engagement follows."
          />
          <ol className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
            {processSteps.map((step, index) => (
              <Reveal key={step.id} as="li" delayMs={index * 50} className="h-full">
                <div className="card h-full p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-electric-600">
                    {step.number}
                  </p>
                  <h3 className="mt-3 text-base font-semibold text-navy-950">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal-600">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      <Section className="border-t border-navy-100">
        <Container>
          <SectionHeader
            eyebrow="Engineering quality"
            title="What “done” means at Kavelis"
            description="We hold our work to a standard that survives handover, audits, and the inevitable next feature."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {differentiators.map((item, index) => (
              <Reveal key={item.id} delayMs={index * 60}>
                <div className="card h-full p-6">
                  <h3 className="text-lg font-semibold text-navy-950">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal-600">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand
        title="Let’s build something that lasts"
        description="Whether you are launching a new product or fixing a system that has outgrown its foundations, we would like to hear about it."
        secondaryLabel="See our work"
        secondaryTo="/work"
      />
    </>
  )
}
