import { ArrowRight, Check } from 'lucide-react'
import { services } from '@/data/services'
import { useSeo } from '@/hooks/useSeo'
import { Button } from '@/components/ui/Button'
import { PageHero } from '@/components/ui/PageHero'
import { Container, Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { CtaBand } from '@/components/ui/CtaBand'

export default function Services() {
  useSeo({
    title: 'Services',
    description:
      'SaaS product development, business automation, e-commerce, custom web applications, API integrations, AI-enabled solutions, and ongoing technical support.',
    path: '/services',
  })

  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Product engineering across the full lifecycle"
        description="Kavelis partners with businesses to design, build, integrate, and maintain the software their operations depend on. Each service can stand alone or combine into a longer engagement."
      >
        <Button to="/contact" className="group">
          Discuss Your Project
          <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Button>
      </PageHero>

      <Section className="border-b border-navy-100 bg-white">
        <Container>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <li key={service.id}>
                <a
                  href={`#${service.id}`}
                  className="block rounded-xl border border-navy-100 bg-canvas px-4 py-3 text-sm font-medium text-navy-800 transition-colors hover:border-teal-200 hover:bg-teal-50 hover:text-teal-800"
                >
                  {service.title}
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {services.map((service, index) => {
        const Icon = service.icon
        return (
          <Section
            key={service.id}
            id={service.id}
            className={index % 2 === 1 ? 'border-y border-navy-100 bg-white' : ''}
          >
            <Container>
              <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
                <Reveal>
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <h2 className="mt-5 text-3xl font-bold tracking-tight text-navy-950 sm:text-4xl">
                    {service.title}
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-charcoal-500 sm:text-lg">
                    {service.description}
                  </p>

                  <div className="mt-8">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-charcoal-500">
                      Engagement options
                    </h3>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {service.engagementOptions.map((option) => (
                        <li
                          key={option}
                          className="rounded-full bg-teal-50 px-3.5 py-1.5 text-xs font-semibold text-teal-800"
                        >
                          {option}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8">
                    <Button to="/contact">Discuss this service</Button>
                  </div>
                </Reveal>

                <Reveal delayMs={100} className="space-y-8">
                  {[
                    { heading: 'Business outcomes', items: service.outcomes },
                    { heading: 'Typical deliverables', items: service.deliverables },
                    { heading: 'Common use cases', items: service.useCases },
                  ].map((block) => (
                    <div key={block.heading} className="card p-6">
                      <h3 className="text-base font-semibold text-navy-950">{block.heading}</h3>
                      <ul className="mt-4 space-y-2.5">
                        {block.items.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2.5 text-sm leading-relaxed text-charcoal-500"
                          >
                            <Check
                              aria-hidden="true"
                              className="mt-0.5 h-4 w-4 shrink-0 text-teal-600"
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </Reveal>
              </div>
            </Container>
          </Section>
        )
      })}

      <CtaBand
        title="Not sure which service fits?"
        description="Describe the business problem — we will tell you whether it needs a product build, an integration, automation, or something simpler."
        secondaryLabel="See solutions"
        secondaryTo="/solutions"
      />
    </>
  )
}
