import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { processOrder } from '@/data/home'
import { useI18n } from '@/i18n'
import { useServices } from '@/i18n/data/services'
import { usePageCopy } from '@/i18n/localize'
import { miscCopy } from '@/i18n/pages/misc'
import { useSeo } from '@/hooks/useSeo'
import { Button } from '@/components/ui/Button'
import { Container, Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { CtaBand } from '@/components/ui/CtaBand'
import { BiDashboard } from '@/components/ui/BiDashboard'
import { Picture } from '@/components/ui/Picture'
import NotFound from '@/pages/NotFound'

const arrow = 'h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5'

function CheckList({ items, large = false }: { items: string[]; large?: boolean }) {
  return (
    <ul className="mt-5 space-y-3">
      {items.map((item) => (
        <li key={item} className={`flex items-start gap-3 leading-relaxed text-charcoal-600 ${large ? 'text-sm sm:text-base' : 'text-sm'}`}>
          <Check aria-hidden="true" className={`mt-0.5 shrink-0 text-gold-600 ${large ? 'h-5 w-5' : 'h-4 w-4'}`} />
          {item}
        </li>
      ))}
    </ul>
  )
}

export default function ServiceDetail() {
  const { serviceId } = useParams<{ serviceId: string }>()
  const { t } = useI18n()
  const copy = usePageCopy(miscCopy).service
  const services = useServices()
  const service = services.find((item) => item.id === serviceId)

  useSeo({
    title: service ? service.title : copy.notFound,
    description: service?.shortDescription,
    path: `/services/${serviceId ?? ''}`,
    noindex: !service,
    jsonLd: service
      ? {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: service.title,
          description: service.shortDescription,
          url: `https://kavelis.llc/services/${service.id}`,
          provider: { '@type': 'Organization', name: 'Kavelis Solutions', url: 'https://kavelis.llc/' },
        }
      : undefined,
  })

  if (!service) return <NotFound />

  const Icon = service.icon
  const related = services.filter((item) => item.id !== service.id).slice(0, 3)

  return (
    <>
      <section className="border-b border-navy-100 bg-gold-50">
        <Container className="section-tight">
          <Reveal>
            <Link
              to="/services"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-charcoal-500 transition-colors hover:text-gold-700"
            >
              <ArrowLeft aria-hidden="true" className="h-4 w-4 rtl:-scale-x-100" />
              {copy.all}
            </Link>
            <div className="mt-6 flex items-start gap-5">
              <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-gold-700 shadow-card sm:flex">
                <Icon aria-hidden="true" className="h-6 w-6" />
              </span>
              <div className="max-w-3xl">
                <p className="eyebrow">{copy.eyebrow}</p>
                <h1 className="mt-3 text-4xl font-bold tracking-tight text-navy-950 sm:text-5xl">{service.title}</h1>
                <p className="lead mt-5">{service.description}</p>
              </div>
            </div>
            <Button to="/contact" className="group mt-8">
              {t.common.startProject}
              <ArrowRight aria-hidden="true" className={arrow} />
            </Button>
            {service.image ? (
              <div className="mt-8 aspect-[21/9] overflow-hidden rounded-2xl">
                <Picture src={service.image} alt="" sizes="(min-width: 1280px) 1200px, 100vw" className="h-full w-full object-cover" />
              </div>
            ) : null}
          </Reveal>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="grid gap-8 lg:grid-cols-3">
            <Reveal className="lg:col-span-2">
              <div className="rounded-2xl border border-gold-100 bg-gold-50/70 p-7 sm:p-8">
                <h2 className="font-sans text-xl font-bold text-navy-950">{copy.outcomes}</h2>
                <CheckList items={service.outcomes} large />
              </div>
            </Reveal>
            <Reveal delayMs={80}>
              <div className="card h-full p-7">
                <h2 className="font-sans text-xl font-bold text-navy-950">{copy.engagement}</h2>
                <ul className="mt-5 space-y-3">
                  {service.engagementOptions.map((option) => (
                    <li key={option} className="rounded-xl border border-navy-100 bg-canvas px-4 py-3 text-sm font-medium text-navy-800">
                      {option}
                    </li>
                  ))}
                </ul>
                <Button to="/pricing" variant="secondary" className="mt-6 w-full">
                  {copy.pricing}
                </Button>
              </div>
            </Reveal>
          </div>

          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <Reveal>
              <div className="card h-full p-7">
                <h2 className="font-sans text-lg font-bold text-navy-950">{copy.deliverables}</h2>
                <CheckList items={service.deliverables} />
              </div>
            </Reveal>
            <Reveal delayMs={80}>
              <div className="card h-full p-7">
                <h2 className="font-sans text-lg font-bold text-navy-950">{copy.useCases}</h2>
                <CheckList items={service.useCases} />
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {service.offerings ? (
        <Section dark>
          <Container>
            <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
              <Reveal>
                <p className="eyebrow text-gold-300">{copy.includedEyebrow}</p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">{copy.includedTitle}</h2>
                <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  {service.offerings.map((offering) => (
                    <li key={offering.title} className="rounded-xl border border-navy-800 bg-navy-900 p-4">
                      <h3 className="text-sm font-semibold text-white">{offering.title}</h3>
                      <p className="mt-1.5 text-xs leading-relaxed text-navy-300">{offering.description}</p>
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delayMs={100}>
                <BiDashboard />
              </Reveal>
            </div>
          </Container>
        </Section>
      ) : null}

      <Section className="border-y border-navy-100 bg-white">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">{copy.processEyebrow}</p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-navy-950 sm:text-3xl">{copy.processTitle}</h2>
            </div>
            <Link to="/about#process" className="group inline-flex items-center gap-1 text-sm font-semibold text-gold-700 hover:text-gold-800">
              {copy.processLink}
              <ArrowRight aria-hidden="true" className={arrow} />
            </Link>
          </div>
          <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {processOrder.map((stepId, index) => (
              <li key={stepId} className="rounded-xl border border-navy-100 bg-canvas p-4 text-center">
                <p className="text-xs font-semibold text-gold-600">0{index + 1}</p>
                <p className="mt-1.5 text-sm font-semibold leading-snug text-navy-900">{t.home.process.steps[stepId].title}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-2xl font-bold tracking-tight text-navy-950 sm:text-3xl">{copy.related}</h2>
            <Link to="/services" className="group inline-flex items-center gap-1 text-sm font-semibold text-gold-700 hover:text-gold-800">
              {copy.viewAll}
              <ArrowRight aria-hidden="true" className={arrow} />
            </Link>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {related.map((item) => {
              const RelatedIcon = item.icon
              return (
                <Link key={item.id} to={`/services/${item.id}`} className="card card-hover group flex h-full flex-col p-6">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gold-50 text-gold-700">
                    <RelatedIcon aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-navy-950">{item.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-charcoal-500">{item.shortDescription}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-gold-700">
                    {copy.learnMore}
                    <ArrowRight aria-hidden="true" className={arrow} />
                  </span>
                </Link>
              )
            })}
          </div>
        </Container>
      </Section>

      <CtaBand
        title={copy.ctaTitle(service.title)}
        description={copy.ctaDescription}
        secondaryLabel={copy.ctaSecondary}
        secondaryTo="/work"
      />
    </>
  )
}
