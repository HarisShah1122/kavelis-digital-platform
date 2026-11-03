import { ArrowRight, Info } from 'lucide-react'
import { usePricing } from '@/i18n/data/pricing'
import { usePageCopy } from '@/i18n/localize'
import { pricingCopy } from '@/i18n/pages/pricing'
import { useSeo } from '@/hooks/useSeo'
import { Button } from '@/components/ui/Button'
import { Container, Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { PageHero } from '@/components/ui/PageHero'
import { Accordion } from '@/components/ui/Accordion'
import { CtaBand } from '@/components/ui/CtaBand'
import { PricingComparison } from '@/components/sections/pricing/PricingComparison'
import { cn } from '@/lib/utils'

const arrow = 'h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5'

export default function Pricing() {
  const copy = usePageCopy(pricingCopy)
  const { steps, faqs } = usePricing()

  useSeo({ title: copy.seoTitle, description: copy.seoDescription, path: '/pricing' })

  const models = [
    { key: 'products', to: '/products', featured: false },
    { key: 'subscriptions', to: '/contact?plan=growth', featured: true },
    { key: 'custom', to: '/contact', featured: false },
  ] as const

  return (
    <>
      <PageHero eyebrow={copy.eyebrow} title={copy.title} description={copy.description}>
        <div className="flex flex-wrap gap-3">
          <Button to="/contact" className="group">
            {copy.talk}
            <ArrowRight aria-hidden="true" className={arrow} />
          </Button>
          <Button to="/products" variant="secondary">
            {copy.browse}
          </Button>
        </div>
      </PageHero>

      <Section>
        <Container>
          <Reveal className="mb-10 max-w-2xl">
            <p className="eyebrow">{copy.plansEyebrow}</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy-950 sm:text-4xl">{copy.plansTitle}</h2>
            <p className="mt-4 text-base leading-relaxed text-charcoal-600">{copy.plansDescription}</p>
          </Reveal>
          <PricingComparison />
          <Reveal className="mt-8">
            <p className="flex items-start gap-2.5 text-sm text-charcoal-500">
              <Info aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
              <span>{copy.plansNote}</span>
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section className="border-y border-navy-100 bg-white">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
            <Reveal>
              <p className="eyebrow">{copy.howEyebrow}</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy-950 sm:text-4xl">{copy.howTitle}</h2>
              <p className="mt-4 text-base leading-relaxed text-charcoal-600">{copy.howDescription}</p>
              <Button to="/contact" variant="secondary" className="mt-6">
                {copy.askSubscriptions}
              </Button>
            </Reveal>
            <ol className="space-y-4">
              {steps.map((step, index) => (
                <Reveal key={step.id} as="li" delayMs={index * 70}>
                  <div className="flex gap-4 rounded-2xl border border-navy-100 bg-canvas p-5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy-950 text-sm font-bold text-gold-400">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-navy-950">{step.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-charcoal-600">{step.description}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <Reveal className="mb-10 max-w-2xl">
            <p className="eyebrow">{copy.modelsEyebrow}</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy-950 sm:text-4xl">{copy.modelsTitle}</h2>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {models.map((model, index) => {
              const item = copy.models[model.key]
              return (
                <Reveal key={model.key} delayMs={index * 70}>
                  <article className={cn('card flex h-full flex-col p-6', model.featured && 'border-gold-500')}>
                    <h3 className="text-base font-bold text-navy-950">{item.title}</h3>
                    <p className="mt-1 text-sm font-semibold text-gold-700">{item.price}</p>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-charcoal-600">{item.body}</p>
                    <Button to={model.to} variant={model.featured ? 'primary' : 'secondary'} className="mt-5 w-full">
                      {item.cta}
                    </Button>
                  </article>
                </Reveal>
              )
            })}
          </div>
        </Container>
      </Section>

      <Section className="border-y border-navy-100 bg-white">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <p className="eyebrow">{copy.faqEyebrow}</p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-navy-950 sm:text-3xl">{copy.faqTitle}</h2>
              <p className="mt-4 text-sm leading-relaxed text-charcoal-600">{copy.faqDescription}</p>
              <Button to="/contact" variant="secondary" className="mt-6">
                {copy.ask}
              </Button>
            </div>
            <Reveal>
              <Accordion items={faqs} />
            </Reveal>
          </div>
        </Container>
      </Section>

      <CtaBand title={copy.ctaTitle} description={copy.ctaDescription} secondaryLabel={copy.browse} secondaryTo="/products" />
    </>
  )
}
