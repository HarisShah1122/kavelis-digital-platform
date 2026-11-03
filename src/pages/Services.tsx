import { Link } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import { services } from '@/data/services'
import { pillars, processOrder, type ServiceId } from '@/data/home'
import { useSeo } from '@/hooks/useSeo'
import { useI18n } from '@/i18n'
import { Button } from '@/components/ui/Button'
import { PageHero } from '@/components/ui/PageHero'
import { Container, Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { CtaBand } from '@/components/ui/CtaBand'

const arrowClass =
  'h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5'

export default function Services() {
  const { t } = useI18n()
  const copy = t.servicesPage

  useSeo({
    title: copy.seoTitle,
    description: copy.seoDescription,
    path: '/services',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: services.map((service, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Service',
          name: service.title,
          description: service.shortDescription,
          url: `https://kavelis.llc/services/${service.id}`,
          provider: { '@type': 'Organization', name: 'Kavelis Solutions' },
        },
      })),
    },
  })

  return (
    <>
      <PageHero eyebrow={copy.eyebrow} title={copy.title} description={copy.description}>
        <div className="flex flex-wrap gap-3">
          <Button to="/contact" className="group">
            {t.common.startProject}
            <ArrowRight aria-hidden="true" className={arrowClass} />
          </Button>
          <Button to="/pricing" variant="secondary">
            {copy.viewPricing}
          </Button>
        </div>
      </PageHero>

      {/* Services grouped under the four practices */}
      {pillars.map((pillar, pillarIndex) => (
        <Section key={pillar.id} className={pillarIndex % 2 === 1 ? 'border-y border-navy-100 bg-white' : undefined}>
          <Container>
            <Reveal className="grid gap-4 lg:grid-cols-[1fr_1.4fr] lg:items-end">
              <div>
                <p className="font-display text-4xl leading-none text-gold-500">0{pillarIndex + 1}</p>
                <h2 className="mt-4 text-2xl font-bold tracking-tight text-navy-950 sm:text-3xl">
                  {t.home.whatWeDo.pillars[pillar.id].title}
                </h2>
              </div>
              <p className="text-base leading-relaxed text-charcoal-600">
                {t.home.whatWeDo.pillars[pillar.id].description}
              </p>
            </Reveal>

            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {pillar.serviceIds.map((serviceId: ServiceId, index) => {
                const service = services.find((item) => item.id === serviceId)
                const item = t.services[serviceId]
                if (!service) return null
                const Icon = service.icon
                return (
                  <Reveal key={serviceId} delayMs={index * 70} className="h-full">
                    <article className="card card-hover group flex h-full flex-col p-7">
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gold-50 text-gold-700">
                        <Icon aria-hidden="true" className="h-5 w-5" />
                      </span>
                      <h3 className="mt-5 text-xl font-bold tracking-tight text-navy-950">
                        <Link to={`/services/${serviceId}`} className="rounded focus-visible:ring-2 focus-visible:ring-gold-600">
                          {item.title}
                        </Link>
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-charcoal-500">{item.short}</p>
                      <ul className="mt-5 flex-1 space-y-2.5">
                        {item.outcomes.map((outcome) => (
                          <li key={outcome} className="flex items-start gap-2.5 text-sm leading-relaxed text-charcoal-600">
                            <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                            {outcome}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-6 flex flex-wrap gap-2">
                        {item.engagement.map((option) => (
                          <span key={option} className="rounded-full bg-gold-50 px-3 py-1 text-xs font-semibold text-gold-800">
                            {option}
                          </span>
                        ))}
                      </div>
                      <Link
                        to={`/services/${serviceId}`}
                        className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-700 hover:text-gold-800"
                      >
                        {copy.viewService}
                        <ArrowRight aria-hidden="true" className={arrowClass} />
                      </Link>
                    </article>
                  </Reveal>
                )
              })}
            </div>
          </Container>
        </Section>
      ))}

      <Section className="border-t border-navy-100 bg-white">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">{copy.processEyebrow}</p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-navy-950 sm:text-3xl">{copy.processTitle}</h2>
            </div>
            <Link to="/about#process" className="group inline-flex items-center gap-1.5 text-sm font-semibold text-gold-700 hover:text-gold-800">
              {copy.processLink}
              <ArrowRight aria-hidden="true" className={arrowClass} />
            </Link>
          </div>
          <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {processOrder.map((stepId, index) => (
              <li key={stepId} className="rounded-xl border border-navy-100 bg-canvas p-5">
                <p className="text-xs font-semibold text-gold-600">0{index + 1}</p>
                <p className="mt-1.5 text-sm font-semibold leading-snug text-navy-900">{t.home.process.steps[stepId].title}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <CtaBand
        title={copy.ctaTitle}
        description={copy.ctaDescription}
        primaryLabel={t.common.startProject}
        secondaryLabel={copy.ctaSecondary}
        secondaryTo="/solutions"
      />
    </>
  )
}
