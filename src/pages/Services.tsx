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
          Discuss your project
          <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Button>
      </PageHero>

      <Section className="border-b border-navy-100">
        <Container>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <li key={service.id}>
                <a
                  href={`#${service.id}`}
                  className="block rounded-xl border border-navy-100 bg-white px-4 py-3 text-sm font-medium text-navy-800 transition-colors hover:border-electric-200 hover:bg-electric-50/50 hover:text-electric-800"
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
        const isDark = index % 2 === 1
        return (
          <Section
            key={service.id}
            id={service.id}
            dark={isDark}
            className={isDark ? '' : 'border-b border-navy-100'}
          >
            <Container>
              <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
                <Reveal>
                  <span
                    className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${
                      isDark ? 'bg-white/10 text-electric-300' : 'bg-electric-50 text-electric-700'
                    }`}
                  >
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <h2
                    className={`mt-5 text-3xl font-bold tracking-tight sm:text-4xl ${
                      isDark ? 'text-white' : 'text-navy-950'
                    }`}
                  >
                    {service.title}
                  </h2>
                  <p
                    className={`mt-4 text-base leading-relaxed sm:text-lg ${
                      isDark ? 'text-navy-200' : 'text-charcoal-600'
                    }`}
                  >
                    {service.description}
                  </p>

                  <div className="mt-8">
                    <h3
                      className={`text-sm font-semibold uppercase tracking-wider ${
                        isDark ? 'text-navy-300' : 'text-charcoal-500'
                      }`}
                    >
                      Engagement options
                    </h3>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {service.engagementOptions.map((option) => (
                        <li
                          key={option}
                          className={`rounded-full px-3.5 py-1.5 text-xs font-semibold ${
                            isDark
                              ? 'bg-white/10 text-navy-100'
                              : 'bg-navy-50 text-navy-700'
                          }`}
                        >
                          {option}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8">
                    <Button to="/contact" variant={isDark ? 'dark' : 'primary'}>
                      Discuss {service.title.toLowerCase()}
                    </Button>
                  </div>
                </Reveal>

                <Reveal delayMs={100} className="space-y-8">
                  {[
                    { heading: 'Business outcomes', items: service.outcomes },
                    { heading: 'Typical deliverables', items: service.deliverables },
                    { heading: 'Common use cases', items: service.useCases },
                  ].map((block) => (
                    <div
                      key={block.heading}
                      className={`rounded-2xl border p-6 ${
                        isDark
                          ? 'border-white/10 bg-white/5'
                          : 'border-navy-100 bg-navy-50/50'
                      }`}
                    >
                      <h3
                        className={`text-base font-semibold ${
                          isDark ? 'text-white' : 'text-navy-950'
                        }`}
                      >
                        {block.heading}
                      </h3>
                      <ul className="mt-4 space-y-2.5">
                        {block.items.map((item) => (
                          <li
                            key={item}
                            className={`flex items-start gap-2.5 text-sm leading-relaxed ${
                              isDark ? 'text-navy-200' : 'text-charcoal-600'
                            }`}
                          >
                            <Check
                              aria-hidden="true"
                              className={`mt-0.5 h-4 w-4 shrink-0 ${
                                isDark ? 'text-electric-400' : 'text-electric-600'
                              }`}
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
