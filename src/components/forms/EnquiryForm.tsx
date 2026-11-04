import { useRef, useState, type FormEvent } from 'react'
import { AlertCircle, CheckCircle2, Info, Send, Tag, X } from 'lucide-react'
import { services } from '@/data/services'
import { useI18n } from '@/i18n'
import type { Dictionary } from '@/i18n/en'
import { siteConfig, submitContactForm } from '@/lib/site'
import { cn, isEmail } from '@/lib/utils'
import type { ContactFormData, ContactFormErrors, ContactStatus } from '@/types'
import { Button } from '@/components/ui/Button'
import { SelectField, TextField, TextareaField } from '@/components/ui/FormFields'

const emptyForm: ContactFormData = {
  name: '',
  email: '',
  company: '',
  service: '',
  budget: '',
  timeline: '',
  message: '',
}

const budgets = ['Under $1,000', '$1,000 – $5,000', '$5,000 – $10,000', '$10,000 – $25,000', '$25,000+']

function validate(data: ContactFormData, errors: Dictionary['form']['errors']): ContactFormErrors {
  const result: ContactFormErrors = {}
  if (!data.name.trim()) result.name = errors.name
  if (!data.email.trim()) result.email = errors.email
  else if (!isEmail(data.email)) result.email = errors.emailInvalid
  if (!data.service) result.service = errors.service
  if (!data.message.trim()) result.message = errors.message
  else if (data.message.trim().length < 20) result.message = errors.messageShort
  return result
}

interface EnquiryFormProps {
  /** `full` adds budget and timeline (contact page). */
  variant?: 'compact' | 'full'
  /** Plan or product the visitor arrived from, shown as a removable chip. */
  reference?: { label: string; detail: string; /** English text sent to the inbox. */ inbox: string } | null
  onClearReference?: () => void
  onDark?: boolean
}

/**
 * Project enquiry form. Submits to the real Formspree endpoint (server-side
 * validation and spam filtering happen there) and never reports success
 * unless the endpoint accepted the submission. Option values stay in English
 * so the shared inbox reads consistently whichever language the visitor used.
 */
export function EnquiryForm({ variant = 'compact', reference, onClearReference, onDark = false }: EnquiryFormProps) {
  const { t, lang } = useI18n()
  const f = t.form
  const [formData, setFormData] = useState<ContactFormData>(emptyForm)
  const [errors, setErrors] = useState<ContactFormErrors>({})
  const [status, setStatus] = useState<ContactStatus>('idle')
  const gotchaRef = useRef<HTMLInputElement>(null)

  const serviceOptions = [
    { value: '', label: f.selectService },
    ...services.map((service) => ({
      value: service.title,
      label: t.services[service.id as keyof Dictionary['services']]?.title ?? service.title,
    })),
    { value: 'Not sure yet', label: f.notSure },
  ]
  const budgetOptions = [
    { value: '', label: f.selectBudget },
    ...budgets.map((value) => ({ value, label: value === 'Under $1,000' ? f.budgetUnder : value })),
    { value: 'Not sure yet', label: f.notSure },
  ]
  const timelineOptions = [
    { value: '', label: f.selectTimeline },
    { value: 'As soon as possible', label: f.timelines.asap },
    { value: '1 – 3 months', label: f.timelines.short },
    { value: '3 – 6 months', label: f.timelines.medium },
    { value: '6+ months', label: f.timelines.long },
    { value: 'Exploring options', label: f.timelines.exploring },
  ]

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
    const validationErrors = validate(formData, f.errors)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      const firstErrorId = Object.keys(validationErrors)[0]
      if (firstErrorId) document.getElementById(firstErrorId)?.focus()
      return
    }
    if (!siteConfig.contactEndpoint) {
      setStatus('unconfigured')
      return
    }
    setStatus('submitting')
    try {
      await submitContactForm(formData, reference?.inbox, gotchaRef.current?.value, lang)
      setStatus('success')
      setFormData(emptyForm)
      setErrors({})
    } catch {
      setStatus('error')
    }
  }

  const statusInfo = status === 'idle' || status === 'submitting' ? null : { tone: status, ...f.status[status] }

  return (
    <div className={cn(onDark && 'rounded-2xl bg-white p-6 text-navy-950 shadow-lift sm:p-8')}>
      {statusInfo ? (
        <div
          role="status"
          className={cn(
            'mb-6 flex items-start gap-3 rounded-xl border p-4',
            statusInfo.tone === 'success' && 'border-success/20 bg-success/10',
            statusInfo.tone === 'error' && 'border-error/20 bg-error/10',
            statusInfo.tone === 'unconfigured' && 'border-navy-100 bg-canvas',
          )}
        >
          {statusInfo.tone === 'success' ? (
            <CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-success" />
          ) : statusInfo.tone === 'error' ? (
            <AlertCircle aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-error" />
          ) : (
            <Info aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-navy-700" />
          )}
          <div>
            <p className="text-sm font-semibold text-navy-950">{statusInfo.title}</p>
            <p className="mt-1 text-sm leading-relaxed text-charcoal-600">{statusInfo.body}</p>
          </div>
        </div>
      ) : null}

      {reference ? (
        <div role="status" className="mb-6 flex items-start justify-between gap-3 rounded-xl border border-gold-200 bg-gold-50 p-4">
          <div className="flex items-start gap-3">
            <Tag aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-gold-700" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-gold-700">{f.selection}</p>
              <p className="mt-0.5 text-sm font-semibold text-navy-950">{reference.label}</p>
              <p className="text-sm text-charcoal-600">{reference.detail}</p>
            </div>
          </div>
          {onClearReference ? (
            <button
              type="button"
              onClick={onClearReference}
              aria-label={f.clearSelection}
              className="rounded-lg p-1.5 text-charcoal-400 transition-colors hover:bg-white hover:text-navy-900"
            >
              <X aria-hidden="true" className="h-4 w-4" />
            </button>
          ) : null}
        </div>
      ) : null}

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            id="name"
            label={f.name}
            autoComplete="name"
            required
            value={formData.name}
            error={errors.name}
            onChange={(event) => updateField('name', event.target.value)}
          />
          <TextField
            id="email"
            label={f.email}
            type="email"
            dir="ltr"
            autoComplete="email"
            required
            value={formData.email}
            error={errors.email}
            onChange={(event) => updateField('email', event.target.value)}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            id="company"
            label={f.company}
            optionalLabel={f.optional}
            autoComplete="organization"
            value={formData.company}
            onChange={(event) => updateField('company', event.target.value)}
          />
          <SelectField
            id="service"
            label={f.service}
            required
            options={serviceOptions}
            value={formData.service}
            error={errors.service}
            onChange={(event) => updateField('service', event.target.value)}
          />
        </div>

        {variant === 'full' ? (
          <div className="grid gap-5 sm:grid-cols-2">
            <SelectField
              id="budget"
              label={f.budget}
              optionalLabel={f.optional}
              options={budgetOptions}
              value={formData.budget}
              onChange={(event) => updateField('budget', event.target.value)}
            />
            <SelectField
              id="timeline"
              label={f.timeline}
              optionalLabel={f.optional}
              options={timelineOptions}
              value={formData.timeline}
              onChange={(event) => updateField('timeline', event.target.value)}
            />
          </div>
        ) : null}

        <TextareaField
          id="message"
          label={f.message}
          required
          rows={variant === 'full' ? 6 : 4}
          placeholder={f.messagePlaceholder}
          value={formData.message}
          error={errors.message}
          onChange={(event) => updateField('message', event.target.value)}
        />

        {/* Honeypot — hidden from people, sent as Formspree's _gotcha field. */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="_gotcha">Leave this field empty</label>
          <input ref={gotchaRef} id="_gotcha" name="_gotcha" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="flex flex-wrap items-center gap-4 pt-1">
          <Button type="submit" disabled={status === 'submitting'} className="group">
            {status === 'submitting' ? (
              f.submitting
            ) : (
              <>
                {f.submit}
                <Send aria-hidden="true" className="h-4 w-4 rtl:-scale-x-100" />
              </>
            )}
          </Button>
          <p className="text-xs leading-relaxed text-charcoal-500">
            {f.replyNote} {f.privacyNote}
          </p>
        </div>
      </form>
    </div>
  )
}
