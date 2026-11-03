import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ArrowUpRight, Mail, Phone } from 'lucide-react'
import { getPlanById } from '@/data/pricing'
import { formatPrice, getMarketplaceProductById } from '@/data/marketplace'
import { getInternalProductById } from '@/data/internalProducts'
import { useSeo } from '@/hooks/useSeo'
import { useI18n } from '@/i18n'
import { siteConfig } from '@/lib/site'
import { PageHero } from '@/components/ui/PageHero'
import { Container, Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { EnquiryForm } from '@/components/forms/EnquiryForm'

export default function Contact() {
  const { t } = useI18n()
  const copy = t.contactPage
  const f = t.form

  useSeo({
    title: copy.seoTitle,
    description: copy.seoDescription,
    path: '/contact',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'Contact Kavelis Solutions',
      url: 'https://kavelis.llc/contact',
    },
  })

  const [searchParams, setSearchParams] = useSearchParams()

  // Plan or product prefill from CTA links (?plan=growth or ?product=crm-software).
  // Product names stay as published; only the labels around them are translated.
  const reference = useMemo(() => {
    const planId = searchParams.get('plan')
    const plan = planId ? getPlanById(planId) : undefined
    if (plan) return { label: `${plan.name} ${f.plan}`, detail: `${plan.price}${f.perMonth}` }

    const productId = searchParams.get('product')
    if (!productId) return null
    const product = getMarketplaceProductById(productId)
    if (product) return { label: product.name, detail: `${f.startingAt} ${formatPrice(product.startingPrice)}` }
    const internal = getInternalProductById(productId)
    if (internal) return { label: internal.name, detail: f.interest }
    return null
  }, [searchParams, f])

  const clearReference = () => {
    const next = new URLSearchParams(searchParams)
    next.delete('plan')
    next.delete('product')
    setSearchParams(next, { replace: true })
  }

  const phoneLabels = { uae: t.footer.uae, ksa: t.footer.ksa }

  return (
    <>
      <PageHero eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
            <Reveal>
              <EnquiryForm variant="full" reference={reference} onClearReference={clearReference} />
            </Reveal>

            <Reveal delayMs={100} className="space-y-6">
              <div className="card p-6">
                <h2 className="text-base font-semibold text-navy-950">{copy.nextTitle}</h2>
                <ol className="mt-4 space-y-3 text-sm leading-relaxed text-charcoal-600">
                  {copy.next.map((step, index) => (
                    <li key={step.title}>
                      <span className="font-semibold text-navy-900">
                        {index + 1}. {step.title} —
                      </span>{' '}
                      {step.body}
                    </li>
                  ))}
                </ol>
              </div>

              <div className="card p-6">
                <h2 className="text-base font-semibold text-navy-950">{copy.phoneTitle}</h2>
                <ul className="mt-3 space-y-3">
                  {siteConfig.phones.map((phone) => (
                    <li key={phone.id}>
                      <a href={`tel:${phone.tel}`} className="group inline-flex items-start gap-2.5">
                        <Phone aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                        <span>
                          <span dir="ltr" className="block text-sm font-semibold text-navy-950 group-hover:text-gold-700">
                            {phone.display}
                          </span>
                          <span className="block text-xs text-charcoal-500">{phoneLabels[phone.id]}</span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-sm leading-relaxed text-charcoal-600">{copy.phoneBody}</p>
              </div>

              <div className="card p-6">
                <h2 className="text-base font-semibold text-navy-950">{copy.emailTitle}</h2>
                <a
                  href={`mailto:${siteConfig.businessEmail}`}
                  className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-gold-700 hover:text-gold-800"
                >
                  <Mail aria-hidden="true" className="h-4 w-4" />
                  {siteConfig.businessEmail}
                </a>
                <p className="mt-3 text-sm leading-relaxed text-charcoal-600">{copy.emailBody}</p>
              </div>

              <div className="card p-6">
                <h2 className="text-base font-semibold text-navy-950">{copy.whatsappTitle}</h2>
                <a
                  href={siteConfig.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-gold-700 hover:text-gold-800"
                >
                  {copy.whatsappLink}
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4 rtl:-scale-x-100" />
                </a>
                <p className="mt-3 text-sm leading-relaxed text-charcoal-600">{copy.whatsappBody}</p>
              </div>

              <div className="card p-6">
                <h2 className="text-base font-semibold text-navy-950">{copy.includeTitle}</h2>
                <ul className="mt-3 list-disc space-y-1.5 ps-5 text-sm text-charcoal-600">
                  {copy.include.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  )
}
