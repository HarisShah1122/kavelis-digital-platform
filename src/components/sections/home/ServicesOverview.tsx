import { ArrowRight } from 'lucide-react'
import { services } from '@/data/services'
import { Container, Section, SectionHeader } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { Link } from 'react-router-dom'

export function ServicesOverview() {
  return (
    <Section id="capabilities">
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeader
            eyebrow="Services"
            title="Everything needed to ship and run digital products"
            description="From first architecture decision to post-launch support, Kavelis covers the full lifecycle of product engineering and operations software."
          />
          <Reveal>
            <Link
              to="/services"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-electric-700 hover:text-electric-800"
            >
              All services
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <Reveal key={service.id} delayMs={index * 50}>
                <Link
                  to={`/services#${service.id}`}
                  className="card card-hover group flex h-full flex-col p-6"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-electric-50 text-electric-700">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-navy-950">{service.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-charcoal-600">
                    {service.shortDescription}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-electric-700">
                    Learn more
                    <ArrowRight
                      aria-hidden="true"
                      className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
