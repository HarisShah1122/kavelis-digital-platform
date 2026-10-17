import { useMemo, useState, type FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AlertCircle, CheckCircle2, Info, Mail, Send, Tag, X } from 'lucide-react'
import { services } from '@/data/services'
import { getPlanById } from '@/data/pricing'
import { formatPrice, getMarketplaceProductById } from '@/data/marketplace'
import { useSeo } from '@/hooks/useSeo'
import { siteConfig, submitContactForm } from '@/lib/site'
import { isEmail } from '@/lib/utils'
import type { ContactFormErrors, ContactFormData, ContactStatus } from '@/types'
import { Button } from '@/components/ui/Button'
import { PageHero } from '@/components/ui/PageHero'
import { SelectField, TextField, TextareaField } from '@/components/ui/FormFields'
import { Container, Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'

const emptyForm: ContactFormData = {
  name: '',
  email: '',
  company: '',
  service: '',
  budget: '',
  timeline: '',
  message: '',
}

const serviceOptions = [
  { value: '', label: 'Select a service' },
  ...services.map((service) => ({ value: service.title, label: service.title })),
  { value: 'Not sure yet', label: 'Not sure yet' },
]

const budgetOptions = [
  { value: '', label: 'Select a range (optional)' },
  { value: 'Under $10k', label: 'Under $10k' },
  { value: '$10k – $25k', label: '$10k – $25k' },
  { value: '$25k – $50k', label: '$25k – $50k' },
  { value: '$50k – $100k', label: '$50k – $100k' },
  { value: '$100k+', label: '$100k+' },
  { value: 'Prefer to discuss', label: 'Prefer to discuss' },
]

const timelineOptions = [
  { value: '', label: 'Select a timeline (optional)' },
  { value: 'As soon as possible', label: 'As soon as possible' },
  { value: '1 – 3 months', label: '1 – 3 months' },
  { value: '3 – 6 months', label: '3 – 6 months' },
  { value: '6+ months', label: '6+ months' },
  { value: 'Exploring options', label: 'Exploring options' },
]

function validate(data: ContactFormData): ContactFormErrors {
  const errors: ContactFormErrors = {}

  if (!data.name.trim()) {
    errors.name = 'Please enter your name.'
  }
  if (!data.email.trim()) {
    errors.email = 'Please enter your business email.'
  } else if (!isEmail(data.email)) {
    errors.email = 'Please enter a valid email address.'
  }
  if (!data.service) {
    errors.service = 'Please select a service interest.'
  }
  if (!data.message.trim()) {
    errors.message = 'Please describe your project.'
  } else if (data.message.trim().length < 20) {
    errors.message = 'Please add a little more detail (at least 20 characters).'
  }

  return errors
}

const statusMessages: Record<Exclude<ContactStatus, 'idle' | 'submitting'>, { tone: 'success' | 'error' | 'info'; title: string; body: string }> = {
  success: {
    tone: 'success',
    title: 'Inquiry received',
    body: 'Thank you — your project details have been submitted. We will review them and respond as soon as possible.',
  },
  error: {
    tone: 'error',
    title: 'Something went wrong',
    body: 'Your inquiry could not be sent. Please try again, or contact us directly if the problem persists.',
  },
  unconfigured: {
    tone: 'info',
    title: 'Form delivery is not connected yet',
    body: 'This form is ready, but no submission endpoint has been configured for this deployment. Configure VITE_CONTACT_ENDPOINT (see .env.example) to enable delivery. In the meantime, please reach out using the contact email shown on this page once it has been published by the team.',
  },
}

export default function Contact() {
  useSeo({
    title: 'Contact',
    description:
      'Discuss a SaaS product, automation project, e-commerce build, or custom web application with the Kavelis team.',
    path: '/contact',
  })

  const [searchParams, setSearchParams] = useSearchParams()
  const [formData, setFormData] = useState<ContactFormData>(emptyForm)
  const [errors, setErrors] = useState<ContactFormErrors>({})
  const [status, setStatus] = useState<ContactStatus>('idle')

  // Plan or product prefill from CTA links (?plan=growth or ?product=crm-software)
  const reference = useMemo(() => {
    const planId = searchParams.get('plan')
    if (planId) {
      const plan = getPlanById(planId)
      if (plan) {
        return {
          id: `plan-${plan.id}`,
          label: `${plan.name} plan`,
          detail: `${plan.price}/month`,
        }
      }
    }
    const productId = searchParams.get('product')
    if (productId) {
      const product = getMarketplaceProductById(productId)
      if (product) {
        return {
          id: `product-${product.id}`,
          label: product.name,
          detail: `Starting at ${formatPrice(product.startingPrice)}`,
        }
      }
    }
    return null
  }, [searchParams])

  const referenceText = reference ? `${reference.label} — ${reference.detail}` : undefined

  const clearReference = () => {
    const next = new URLSearchParams(searchParams)
    next.delete('plan')
    next.delete('product')
    setSearchParams(next, { replace: true })
  }

  const updateField = (field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => {
      if (!prev[field]) return prev
      const next = { ...prev }
      delete next[field]
      return next
    })
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const validationErrors = validate(formData)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      const firstErrorId = Object.keys(validationErrors)[0]
      if (firstErrorId) {
        document.getElementById(firstErrorId)?.focus()
      }
      return
    }

    if (!siteConfig.contactEndpoint) {
      setStatus('unconfigured')
      return
    }

    setStatus('submitting')
    try {
      await submitContactForm(formData, referenceText)
      setStatus('success')
      setFormData(emptyForm)
      setErrors({})
    } catch {
      setStatus('error')
    }
  }

  const statusInfo = status === 'idle' || status === 'submitting' ? null : statusMessages[status]

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Tell us what you want to build"
        description="Share a few details about your project. We will respond with clarifying questions, realistic options, and a clear recommended next step."
      />

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
            <Reveal>
              {statusInfo ? (
                <div
                  role="status"
                  className={`mb-8 flex items-start gap-3 rounded-2xl border p-5 ${
                    statusInfo.tone === 'success'
                      ? 'border-success/20 bg-success/10'
                      : statusInfo.tone === 'error'
                        ? 'border-error/20 bg-error/10'
                        : 'border-navy-100 bg-white'
                  }`}
                >
                  {statusInfo.tone === 'success' ? (
                    <CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                  ) : statusInfo.tone === 'error' ? (
                    <AlertCircle aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-error" />
                  ) : (
                    <Info aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-navy-700" />
                  )}
                  <div>
                    <h2
                      className={`text-sm font-semibold ${
                        statusInfo.tone === 'success'
                          ? 'text-success'
                          : statusInfo.tone === 'error'
                            ? 'text-error'
                            : 'text-navy-900'
                      }`}
                    >
                      {statusInfo.title}
                    </h2>
                    <p
                      className={`mt-1 text-sm leading-relaxed ${
                        statusInfo.tone === 'success'
                          ? 'text-success/90'
                          : statusInfo.tone === 'error'
                            ? 'text-error/90'
                            : 'text-charcoal-600'
                      }`}
                    >
                      {statusInfo.body}
                    </p>
                  </div>
                </div>
              ) : null}

              {reference ? (
                <div
                  role="status"
                  className="mb-6 flex items-start justify-between gap-3 rounded-2xl border border-gold-200 bg-gold-50 p-4"
                >
                  <div className="flex items-start gap-3">
                    <Tag aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-gold-700" />
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-gold-700">
                        Your selection
                      </p>
                      <p className="mt-0.5 text-sm font-semibold text-navy-950">
                        {reference.label}
                      </p>
                      <p className="text-sm text-charcoal-600">{reference.detail}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={clearReference}
                    aria-label="Clear selection and send a general inquiry"
                    className="rounded-lg p-1.5 text-charcoal-400 transition-colors hover:bg-white hover:text-navy-900"
                  >
                    <X aria-hidden="true" className="h-4 w-4" />
                  </button>
                </div>
              ) : null}

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <TextField
                    id="name"
                    label="Full name"
                    autoComplete="name"
                    required
                    value={formData.name}
                    error={errors.name}
                    onChange={(event) => updateField('name', event.target.value)}
                  />
                  <TextField
                    id="email"
                    label="Business email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    error={errors.email}
                    onChange={(event) => updateField('email', event.target.value)}
                  />
                </div>

                <TextField
                  id="company"
                  label="Company"
                  autoComplete="organization"
                  value={formData.company}
                  error={errors.company}
                  onChange={(event) => updateField('company', event.target.value)}
                />

                <div className="grid gap-5 sm:grid-cols-2">
                  <SelectField
                    id="service"
                    label="Service interest"
                    required
                    options={serviceOptions}
                    value={formData.service}
                    error={errors.service}
                    onChange={(event) => updateField('service', event.target.value)}
                  />
                  <SelectField
                    id="budget"
                    label="Estimated budget"
                    options={budgetOptions}
                    value={formData.budget}
                    error={errors.budget}
                    onChange={(event) => updateField('budget', event.target.value)}
                  />
                </div>

                <SelectField
                  id="timeline"
                  label="Timeline"
                  options={timelineOptions}
                  value={formData.timeline}
                  error={errors.timeline}
                  onChange={(event) => updateField('timeline', event.target.value)}
                />

                <TextareaField
                  id="message"
                  label="Project details"
                  required
                  rows={6}
                  placeholder="What are you trying to build or improve? Who is it for? Are there deadlines or systems it needs to work with?"
                  value={formData.message}
                  error={errors.message}
                  onChange={(event) => updateField('message', event.target.value)}
                />

                {/* Honeypot field — hidden from humans, catches naive bots. */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="group"
                  >
                    {status === 'submitting' ? (
                      'Sending…'
                    ) : (
                      <>
                        Send project inquiry
                        <Send aria-hidden="true" className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                  <p className="text-xs text-charcoal-500">
                    We reply to serious inquiries — usually within two business days.
                  </p>
                </div>
              </form>
            </Reveal>

            <Reveal delayMs={100} className="space-y-6">
              <div className="card p-6">
                <h2 className="text-base font-semibold text-navy-950">What happens next</h2>
                <ol className="mt-4 space-y-3 text-sm leading-relaxed text-charcoal-600">
                  <li>
                    <span className="font-semibold text-navy-900">1. Review —</span> We read your
                    brief and identify the key questions.
                  </li>
                  <li>
                    <span className="font-semibold text-navy-900">2. Conversation —</span> A short
                    call or async thread to align on goals, constraints, and fit.
                  </li>
                  <li>
                    <span className="font-semibold text-navy-900">3. Proposal —</span> A clear
                    scope, approach, timeline range, and investment level.
                  </li>
                </ol>
              </div>

              {siteConfig.contactEmail ? (
                <div className="card p-6">
                  <h2 className="text-base font-semibold text-navy-950">Direct email</h2>
                  <a
                    href={`mailto:${siteConfig.contactEmail}`}
                    className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-gold-700 hover:text-gold-800"
                  >
                    <Mail aria-hidden="true" className="h-4 w-4" />
                    {siteConfig.contactEmail}
                  </a>
                </div>
              ) : (
                <div className="card p-6">
                  <h2 className="text-base font-semibold text-navy-950">Contact details</h2>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal-600">
                    A public contact email has not been published for this deployment yet. Use the
                    inquiry form — it is the fastest way to reach the team.
                  </p>
                </div>
              )}

              <div className="card p-6">
                <h2 className="text-base font-semibold text-navy-950">Good to include</h2>
                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-charcoal-600">
                  <li>The business problem, not just the feature list</li>
                  <li>Who will use the product</li>
                  <li>Existing tools or systems involved</li>
                  <li>Any hard deadlines or budget boundaries</li>
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  )
}
