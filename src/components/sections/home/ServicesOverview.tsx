import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { services } from '@/data/services'
import { Container, Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'

/** Services as an editorial numbered list — avoids the eight-identical-cards look. */
export function ServicesOverview() {
  return (
    <Section id="capabilities">
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">Services</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy-950 sm:text-4xl">
              Eight services covering the full product lifecycle
            </h2>
            <p className="mt-4 text-base leading-relaxed text-charcoal-600">
              From first architecture decision to post-launch support and analytics — engage one
              service or several together.
            </p>
          </Reveal>
          <Reveal>
            <Link
              to="/services"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-700 hover:text-gold-800"
            >
              All services
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        <ul className="mt-12 divide-y divide-navy-100 border-y border-navy-100">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <Reveal key={service.id} delayMs={index * 40}>
                <li>
                  <Link
                    to={`/services/${service.id}`}
                    className="group flex items-start gap-5 py-6 transition-colors hover:bg-gold-50/60 sm:gap-8"
                  >
                    <span className="w-8 shrink-0 pt-1 text-sm font-bold text-charcoal-400 tabular-nums">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="mt-0.5 hidden h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold-50 text-gold-700 sm:flex">
                      <Icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <span className="flex-1">
                      <span className="flex items-center gap-2">
                        <span className="text-base font-semibold text-navy-950">
                          {service.title}
                        </span>
                        <ArrowRight
                          aria-hidden="true"
                          className="h-3.5 w-3.5 text-charcoal-400 transition-transform group-hover:translate-x-0.5 group-hover:text-gold-700"
                        />
                      </span>
                      <span className="mt-1 block text-sm leading-relaxed text-charcoal-600">
                        {service.shortDescription}
                      </span>
                    </span>
                  </Link>
                </li>
              </Reveal>
            )
          })}
        </ul>
      </Container>
    </Section>
  )
}
