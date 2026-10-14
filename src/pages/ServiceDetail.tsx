import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { getServiceById, services } from '@/data/services'
import { processSteps } from '@/data/content'
import { useSeo } from '@/hooks/useSeo'
import { Button } from '@/components/ui/Button'
import { Container, Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { CtaBand } from '@/components/ui/CtaBand'
import NotFound from '@/pages/NotFound'

export default function ServiceDetail() {
  const { serviceId } = useParams<{ serviceId: string }>()
  const service = serviceId ? getServiceById(serviceId) : undefined

  useSeo({
    title: service ? service.title : 'Service not found',
    description: service?.shortDescription,
    path: `/services/${serviceId ?? ''}`,
    noindex: !service,
  })

  if (!service) {
    return <NotFound />
  }

  const Icon = service.icon
  const related = services.filter((s) => s.id !== service.id).slice(0, 3)

  return (
    <>
      <section className="border-b border-navy-100 bg-teal-50">
        <Container className="section-tight">
          <Reveal>
            <Link
              to="/services"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-charcoal-500 transition-colors hover:text-teal-700"
            >
              <ArrowLeft aria-hidden="true" className="h-4 w-4" />
              All services
            </Link>
            <div className="mt-6 flex items-start gap-5">
              <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-teal-700 shadow-card sm:flex">
                <Icon aria-hidden="true" className="h-6 w-6" />
              </span>
              <div className="max-w-3xl">
                <p className="eyebrow">Service</p>
                <h1 className="mt-3 text-4xl font-bold tracking-tight text-navy-950 sm:text-5xl">
                  {service.title}
                </h1>
                <p className="lead mt-5">{service.description}</p>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button to="/contact" className="group">
                Discuss Your Project
                <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="grid gap-8 lg:grid-cols-3">
            <Reveal className="lg:col-span-2">
              <div className="rounded-2xl border border-teal-100 bg-teal-50/70 p-7 sm:p-8">
                <h2 className="text-xl font-bold text-navy-950">Business outcomes</h2>
                <ul className="mt-5 space-y-3.5">
                  {service.outcomes.map((outcome) => (
                    <li
                      key={outcome}
                      className="flex items-start gap-3 text-sm leading-relaxed text-charcoal-600 sm:text-base"
                    >
                      <Check aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" />
                      {outcome}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delayMs={80}>
              <div className="card h-full p-7">
                <h2 className="text-xl font-bold text-navy-950">Engagement options</h2>
                <ul className="mt-5 space-y-3">
                  {service.engagementOptions.map((option) => (
                    <li
                      key={option}
                      className="rounded-xl border border-navy-100 bg-canvas px-4 py-3 text-sm font-medium text-navy-800"
                    >
                      {option}
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <Button to="/pricing" variant="secondary" className="w-full">
                    View pricing
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <Reveal>
              <div className="card h-full p-7">
                <h2 className="text-lg font-bold text-navy-950">Typical deliverables</h2>
                <ul className="mt-5 space-y-3">
                  {service.deliverables.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm leading-relaxed text-charcoal-600"
                    >
                      <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delayMs={80}>
              <div className="card h-full p-7">
                <h2 className="text-lg font-bold text-navy-950">Common use cases</h2>
                <ul className="mt-5 space-y-3">
                  {service.useCases.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm leading-relaxed text-charcoal-600"
                    >
                      <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section className="border-y border-navy-100 bg-white">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">How we work</p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-navy-950 sm:text-3xl">
                Every service follows the same disciplined process
              </h2>
            </div>
            <Link
              to="/about"
              className="text-sm font-semibold text-teal-700 hover:text-teal-800"
            >
              Full process details →
            </Link>
          </div>
          <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-7">
            {processSteps.map((step) => (
              <li
                key={step.id}
                className="rounded-xl border border-navy-100 bg-canvas p-4 text-center"
              >
                <p className="text-xs font-semibold text-teal-600">{step.number}</p>
                <p className="mt-1.5 text-xs font-semibold leading-snug text-navy-900">
                  {step.title}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-2xl font-bold tracking-tight text-navy-950 sm:text-3xl">
              Related services
            </h2>
            <Link to="/services" className="text-sm font-semibold text-teal-700 hover:text-teal-800">
              View all services →
            </Link>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {related.map((item) => {
              const RelatedIcon = item.icon
              return (
                <Link
                  key={item.id}
                  to={`/services/${item.id}`}
                  className="card card-hover group flex h-full flex-col p-6"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                    <RelatedIcon aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-navy-950">{item.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-charcoal-500">
                    {item.shortDescription}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-teal-700">
                    Learn more
                    <ArrowRight
                      aria-hidden="true"
                      className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              )
            })}
          </div>
        </Container>
      </Section>

      <CtaBand
        title={`Ready to discuss ${service.title.toLowerCase()}?`}
        description="Share your goals and constraints. We will respond with clarifying questions and a realistic first step."
        secondaryLabel="See our work"
        secondaryTo="/work"
      />
    </>
  )
}
