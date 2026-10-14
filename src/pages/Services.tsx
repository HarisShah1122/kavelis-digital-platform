import { Link } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import { services } from '@/data/services'
import { processSteps } from '@/data/content'
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
        <div className="flex flex-wrap gap-3">
          <Button to="/contact" className="group">
            Discuss Your Project
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            />
          </Button>
          <Button to="/pricing" variant="secondary">
            View pricing
          </Button>
        </div>
      </PageHero>

      <Section>
        <Container>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <Reveal key={service.id} delayMs={(index % 3) * 70} className="h-full">
                  <article className="card card-hover flex h-full flex-col p-7">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                      <Icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <h2 className="mt-5 text-xl font-bold tracking-tight text-navy-950">
                      <a href={`/services/${service.id}`} className="focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 rounded">
                        {service.title}
                      </a>
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-charcoal-500">
                      {service.shortDescription}
                    </p>

                    <ul className="mt-5 flex-1 space-y-2.5">
                      {service.outcomes.slice(0, 2).map((outcome) => (
                        <li
                          key={outcome}
                          className="flex items-start gap-2.5 text-sm leading-relaxed text-charcoal-600"
                        >
                          <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
                          {outcome}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {service.engagementOptions.slice(0, 2).map((option) => (
                        <span
                          key={option}
                          className="rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-800"
                        >
                          {option}
                        </span>
                      ))}
                    </div>

                    <a
                      href={`/services/${service.id}`}
                      className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700 hover:text-teal-800"
                    >
                      View service
                      <ArrowRight aria-hidden="true" className="h-4 w-4" />
                    </a>
                  </article>
                </Reveal>
              )
            })}
          </div>
        </Container>
      </Section>

      <Section className="border-y border-navy-100 bg-white">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">How we work</p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-navy-950 sm:text-3xl">
                One disciplined process, from first call to launch
              </h2>
            </div>
            <Link to="/about" className="text-sm font-semibold text-teal-700 hover:text-teal-800">
              Full process details →
            </Link>
          </div>
          <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
            {processSteps.map((step) => (
              <li key={step.id} className="rounded-xl border border-navy-100 bg-canvas p-4 text-center">
                <p className="text-xs font-semibold text-teal-600">{step.number}</p>
                <p className="mt-1.5 text-xs font-semibold leading-snug text-navy-900">
                  {step.title}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <CtaBand
        title="Not sure which service fits?"
        description="Describe the business problem — we will tell you whether it needs a product build, an integration, automation, or something simpler."
        secondaryLabel="See solutions"
        secondaryTo="/solutions"
      />
    </>
  )
}
