import { useState, type FormEvent } from 'react'
import { AlertCircle, CheckCircle2, Info, Mail, Send } from 'lucide-react'
import { jobListings } from '@/data/careers'
import { useCareers } from '@/i18n/data/careers'
import { usePageCopy } from '@/i18n/localize'
import { careersCopy } from '@/i18n/pages/careers'
import { siteConfig, submitApplicationForm } from '@/lib/site'
import { cn, isEmail } from '@/lib/utils'
import type { ApplicationFormData, ApplicationFormErrors, ApplicationStatus } from '@/types'
import { Button } from '@/components/ui/Button'
import { SelectField, TextField, TextareaField } from '@/components/ui/FormFields'

/** Role value used when the applicant is not applying to a specific listing. */
export const GENERAL_APPLICATION = 'General application'

type LinkFields = 'github' | 'portfolio' | 'linkedin'
const linkFields: LinkFields[] = ['github', 'portfolio', 'linkedin']
const emptyLinks: Pick<ApplicationFormData, LinkFields> = { github: '', portfolio: '', linkedin: '' }

function isWebUrl(value: string): boolean {
  try {
    const url = new URL(value)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

interface ApplicationFormProps {
  /** Selected role (English job title, so the inbox reads consistently). Controlled by the Careers page. */
  role: string
  onRoleChange: (role: string) => void
}

/**
 * Job application form for /careers.
 *
 * Posts JSON to the same Formspree endpoint as the contact form, tagged so
 * applications are distinguishable from project inquiries. Role values stay
 * in English; only the visible labels are translated.
 */
export function ApplicationForm({ role, onRoleChange }: ApplicationFormProps) {
  const copy = usePageCopy(careersCopy).form
  const { jobs } = useCareers()
  const [fields, setFields] = useState<ApplicationFormData>({ name: '', email: '', role, message: '', ...emptyLinks })
  const [errors, setErrors] = useState<ApplicationFormErrors>({})
  const [status, setStatus] = useState<ApplicationStatus>('idle')
  const [gotcha, setGotcha] = useState('')

  const data: ApplicationFormData = { ...fields, role }
  const roleOptions = [
    ...jobListings.map((job) => ({ value: job.title, label: jobs.find((item) => item.id === job.id)?.title ?? job.title })),
    { value: GENERAL_APPLICATION, label: copy.general },
  ]

  const validate = (values: ApplicationFormData): ApplicationFormErrors => {
    const result: ApplicationFormErrors = {}
    if (!values.name.trim()) result.name = copy.errors.name
    if (!values.email.trim()) result.email = copy.errors.email
    else if (!isEmail(values.email)) result.email = copy.errors.emailInvalid
    if (!values.role.trim()) result.role = copy.errors.role
    if (!values.message.trim()) result.message = copy.errors.message
    else if (values.message.trim().length < 20) result.message = copy.errors.messageShort
    for (const field of linkFields) {
      const value = values[field].trim()
      if (value && !isWebUrl(value)) result[field] = copy.errors.url
    }
    return result
  }

  const updateField = (field: keyof ApplicationFormData, value: string) => {
    setFields((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => {
      if (!prev[field]) return prev
      const next = { ...prev }
      delete next[field]
      return next
    })
  }

  const reset = () => {
    setFields({ name: '', email: '', role, message: '', ...emptyLinks })
    setErrors({})
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const validationErrors = validate(data)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      const firstErrorId = Object.keys(validationErrors)[0]
      if (firstErrorId) document.getElementById(firstErrorId)?.focus()
      return
    }
    // Hidden honeypot filled in — a bot. Pretend success without sending.
    if (gotcha.trim()) {
      setStatus('success')
      reset()
      return
    }
    if (!siteConfig.contactEndpoint) {
      setStatus('unconfigured')
      return
    }
    setStatus('submitting')
    try {
      await submitApplicationForm(data, gotcha)
      setStatus('success')
      reset()
    } catch {
      setStatus('error')
    }
  }

  const statusInfo = status === 'idle' || status === 'submitting' ? null : { tone: status, ...copy.status[status] }

  return (
    <div>
      {statusInfo ? (
        <div
          role="status"
          className={cn(
            'mb-6 flex items-start gap-3 rounded-2xl border p-5',
            statusInfo.tone === 'success' && 'border-success/20 bg-success/10',
            statusInfo.tone === 'error' && 'border-error/20 bg-error/10',
            statusInfo.tone === 'unconfigured' && 'border-navy-100 bg-white',
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
            {statusInfo.tone === 'success' ? (
              <a
                href={`mailto:${siteConfig.careersEmail}`}
                className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-success hover:underline"
              >
                <Mail aria-hidden="true" className="h-4 w-4" />
                {copy.attachInstead}
              </a>
            ) : null}
          </div>
        </div>
      ) : null}

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            id="name"
            label={copy.name}
            autoComplete="name"
            required
            value={fields.name}
            error={errors.name}
            onChange={(event) => updateField('name', event.target.value)}
          />
          <TextField
            id="email"
            label={copy.email}
            type="email"
            dir="ltr"
            autoComplete="email"
            required
            value={fields.email}
            error={errors.email}
            onChange={(event) => updateField('email', event.target.value)}
          />
        </div>

        <SelectField
          id="role"
          label={copy.role}
          required
          options={roleOptions}
          value={role}
          error={errors.role}
          onChange={(event) => onRoleChange(event.target.value)}
        />

        <TextareaField
          id="message"
          label={copy.message}
          required
          rows={6}
          placeholder={copy.messagePlaceholder}
          hint={copy.messageHint}
          value={fields.message}
          error={errors.message}
          onChange={(event) => updateField('message', event.target.value)}
        />

        <div className="grid gap-5 sm:grid-cols-3">
          {(
            [
              ['github', 'GitHub', 'https://github.com/you'],
              ['portfolio', 'Portfolio', 'https://yourwork.example'],
              ['linkedin', 'LinkedIn', 'https://linkedin.com/in/you'],
            ] as const
          ).map(([field, label, placeholder]) => (
            <TextField
              key={field}
              id={field}
              label={label}
              optionalLabel={copy.optional}
              type="url"
              dir="ltr"
              inputMode="url"
              placeholder={placeholder}
              value={fields[field]}
              error={errors[field]}
              onChange={(event) => updateField(field, event.target.value)}
            />
          ))}
        </div>

        {/* Honeypot field — hidden from humans, catches naive bots. */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="_gotcha">Website</label>
          <input
            id="_gotcha"
            name="_gotcha"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={gotcha}
            onChange={(event) => setGotcha(event.target.value)}
          />
        </div>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <Button type="submit" disabled={status === 'submitting'} className="group">
            {status === 'submitting' ? (
              copy.submitting
            ) : (
              <>
                {copy.submit}
                <Send aria-hidden="true" className="h-4 w-4 rtl:-scale-x-100" />
              </>
            )}
          </Button>
          <p className="text-xs text-charcoal-500">{copy.rolling}</p>
        </div>

        <p className="text-xs leading-relaxed text-charcoal-500">
          {copy.attachNote}{' '}
          <a href={`mailto:${siteConfig.careersEmail}`} className="font-medium text-gold-700 hover:text-gold-800">
            {siteConfig.careersEmail}
          </a>{' '}
          {copy.attachNoteEnd}
        </p>
      </form>
    </div>
  )
}
