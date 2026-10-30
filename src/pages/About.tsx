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

const team = [
  {
    name: 'Haris Shah',
    role: 'Senior Full Stack Developer',
    bio: 'Architecture, full-stack delivery, and client communication — working directly with clients.',
  },
  {
    name: 'Ihtisham',
    role: 'Web Developer',
    bio: 'Building and maintaining the web applications and storefronts Kavelis delivers.',
  },
]

export default function About() {
  useSeo({
    title: 'About',
    description:
      'Kavelis is a focused software studio building custom software, automation, and e-commerce — with engineering discipline, transparent delivery, and maintainable code.',
    path: '/about',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: 'About Kavelis',
      url: 'https://kavelis.llc/about',
      description:
        'Kavelis is a focused software studio building custom software, automation, and e-commerce for growing businesses.',
    },
  })

  return (
    <>
      <PageHero
        eyebrow="About"
        title="A software studio for companies that take software seriously"
        description="Kavelis exists to help businesses launch products, automate operations, improve customer experiences, and scale their digital operations — with software that stays maintainable long after launch."
      />

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <Reveal>
              <p className="eyebrow">Mission</p>
              <h2 className="section-heading mt-3">Engineering that serves the business</h2>
            </Reveal>
            <Reveal delayMs={80} className="space-y-5">
              <p className="prose-measure text-base leading-relaxed text-charcoal-700 sm:text-lg">
                Too much software is built to impress rather than to work. Kavelis takes the
                opposite approach: understand the business problem first, design the smallest
                system that genuinely solves it, then build it with the quality needed to operate
                it for years.
              </p>
              <p className="prose-measure text-base leading-relaxed text-charcoal-700 sm:text-lg">
                We work with founders, product teams, and operators — as a focused engineering
                partner rather than a body shop. That means caring about architecture, delivery
                discipline, and the day-to-day experience of the people who will use what we ship.
              </p>
              <Button to="/contact" className="group mt-2">
                Work with us
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                />
              </Button>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section className="border-y border-navy-100 bg-white">
        <Container>
          <SectionHeader
            eyebrow="The team"
            title="Built by the people you talk to"
            description="Kavelis is a small, senior studio. The team stays close to the work — from the first scoping conversation to support after launch."
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:max-w-3xl">
            {team.map((member, index) => (
              <Reveal key={member.name} delayMs={index * 70} className="h-full">
                <div className="card flex h-full items-center gap-5 p-6">
                  <span
                    aria-hidden="true"
                    className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-navy-950 font-display text-2xl text-gold-400"
                  >
                    {member.name
                      .split(' ')
                      .map((part) => part[0])
                      .join('')}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-navy-950">{member.name}</h3>
                    <p className="mt-0.5 text-sm font-medium text-gold-700">{member.role}</p>
                    <p className="mt-2 text-sm leading-relaxed text-charcoal-600">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
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

      <Section className="border-t border-navy-100 bg-white">
        <Container>
          <SectionHeader
            eyebrow="Delivery"
            title="Collaboration without the black box"
            description="You are never guessing where a project stands. Here is the process every engagement follows."
          />
          <ol className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
            {processSteps.map((step, index) => (
              <Reveal key={step.id} as="li" delayMs={index * 50} className="h-full">
                <div className="border-t-2 border-gold-500 pt-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-700">
                    {step.number}
                  </p>
                  <h3 className="mt-3 text-lg font-semibold leading-snug text-navy-950">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal-600">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      <Section>
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
        secondaryLabel="See our portfolio"
        secondaryTo="/portfolio"
      />
    </>
  )
}
