import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { pillars } from '@/data/home'
import { useI18n } from '@/i18n'
import { cn } from '@/lib/utils'
import { Container, Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { Picture } from '@/components/ui/Picture'

/** Section 04 — the four practices as alternating editorial rows. */
export function WhatWeDo() {
  const { t } = useI18n()
  const copy = t.home.whatWeDo

  return (
    <Section>
      <Container>
        <Reveal className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div>
            <p className="eyebrow">{copy.eyebrow}</p>
            <h2 className="section-heading mt-4">{copy.title}</h2>
          </div>
          <p className="text-base leading-relaxed text-charcoal-600 sm:text-lg">{copy.description}</p>
        </Reveal>

        <div className="mt-16 space-y-6">
          {pillars.map((pillar, index) => {
            const item = copy.pillars[pillar.id]
            const flipped = index % 2 === 1
            return (
              <Reveal key={pillar.id} as="article">
                <div className="group grid overflow-hidden rounded-[1.75rem] border border-navy-100 bg-white transition-shadow duration-400 hover:shadow-lift lg:grid-cols-2">
                  <div className={cn('flex flex-col p-8 sm:p-10 lg:p-12', flipped && 'lg:order-2')}>
                    <div className="flex items-baseline gap-4">
                      <span className="font-display text-5xl leading-none text-gold-500">0{index + 1}</span>
                      <span className="h-px flex-1 bg-navy-100" />
                    </div>
                    <h3 className="mt-8 text-2xl font-bold tracking-tight text-navy-950 sm:text-3xl">{item.title}</h3>
                    <p className="mt-4 max-w-md text-base leading-relaxed text-charcoal-600">{item.description}</p>

                    <ul className="mt-7 grid grid-cols-2 gap-x-6 gap-y-3">
                      {item.capabilities.map((capability) => (
                        <li key={capability} className="flex items-center gap-2 text-sm font-medium text-navy-900">
                          <span aria-hidden="true" className="h-px w-4 shrink-0 bg-gold-500" />
                          {capability}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto pt-10">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-charcoal-400">{copy.related}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {pillar.serviceIds.map((serviceId) => (
                          <Link
                            key={serviceId}
                            to={`/services/${serviceId}`}
                            className="rounded-full border border-navy-100 px-3 py-1 text-xs font-medium text-charcoal-600 transition-colors hover:border-gold-400 hover:text-navy-950"
                          >
                            {t.services[serviceId].title}
                          </Link>
                        ))}
                      </div>
                      <Link
                        to={pillar.to}
                        className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-navy-950"
                      >
                        <span className="link-underline">{copy.explore}</span>
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-500 text-navy-950 transition-transform duration-400 group-hover:rotate-45 rtl:group-hover:-rotate-45">
                          <ArrowUpRight aria-hidden="true" className="h-4 w-4 rtl:-scale-x-100" />
                        </span>
                      </Link>
                    </div>
                  </div>

                  <div className={cn('relative min-h-[16rem] overflow-hidden bg-navy-950 lg:min-h-full', flipped && 'lg:order-1')}>
                    <div className="clip-reveal absolute inset-0">
                      <Picture
                        src={pillar.image}
                        alt={item.imageAlt}
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className={cn('h-full w-full object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.04]', pillar.imagePosition)}
                      />
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
