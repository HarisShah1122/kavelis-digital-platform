import { useState, type FormEvent } from 'react'
import { AlertCircle, CheckCircle2, Info, Mail, Send } from 'lucide-react'
import { jobListings } from '@/data/careers'
import { siteConfig, submitApplicationForm } from '@/lib/site'
import { isEmail } from '@/lib/utils'
import type {
  ApplicationFormErrors,
  ApplicationFormData,
  ApplicationStatus,
} from '@/types'
import { Button } from '@/components/ui/Button'
import { SelectField, TextField, TextareaField } from '@/components/ui/FormFields'

/** Role value used when the applicant is not applying to a specific listing. */
export const GENERAL_APPLICATION = 'General application'

const roleOptions = [
  ...jobListings.map((job) => ({ value: job.title, label: job.title })),
  { value: GENERAL_APPLICATION, label: 'General application — no specific role' },
]

type LinkFields = 'github' | 'portfolio' | 'linkedin'

type LinkOnly = Pick<ApplicationFormData, LinkFields>

const emptyLinks: LinkOnly = {
  github: '',
  portfolio: '',
  linkedin: '',
}

function isWebUrl(value: string): boolean {
  try {
    const url = new URL(value)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

function validate(data: ApplicationFormData): ApplicationFormErrors {
  const errors: ApplicationFormErrors = {}

  if (!data.name.trim()) {
    errors.name = 'Please enter your name.'
  }
  if (!data.email.trim()) {
    errors.email = 'Please enter your email address.'
  } else if (!isEmail(data.email)) {
    errors.email = 'Please enter a valid email address.'
  }
  if (!data.role.trim()) {
    errors.role = 'Please select the role you are applying for.'
  }
  if (!data.message.trim()) {
    errors.message = 'Please tell us about your experience.'
  } else if (data.message.trim().length < 20) {
    errors.message = 'Please add a little more detail (at least 20 characters).'
  }

  const links: LinkFields[] = ['github', 'portfolio', 'linkedin']
  for (const field of links) {
    const value = data[field].trim()
    if (value && !isWebUrl(value)) {
      errors[field] = 'Please enter a full URL, starting with https://'
    }
  }

  return errors
}

const statusMessages: Record<
  Exclude<ApplicationStatus, 'idle' | 'submitting'>,
  { tone: 'success' | 'error' | 'info'; title: string; body: string }
> = {
  success: {
    tone: 'success',
    title: 'Application received',
    body: 'Thank you — your application has been submitted. Applications are reviewed on a rolling basis, and we will get in touch if your experience matches a role we are hiring for.',
  },
  error: {
    tone: 'error',
    title: 'Something went wrong',
    body: 'Your application could not be sent. Please try again, or email careers@kavelis.llc directly if the problem persists.',
  },
  unconfigured: {
    tone: 'info',
    title: 'Form delivery is not connected yet',
    body: `This form is ready, but no submission endpoint has been configured for this deployment. In the meantime, send your application to ${siteConfig.careersEmail} — the address is shown below.`,
  },
}

interface ApplicationFormProps {
  /** Currently selected role — controlled by the Careers page so apply buttons can prefill it. */
  role: string
  onRoleChange: (role: string) => void
}

/**
 * Job application form for /careers.
 *
 * Posts JSON to the same Formspree endpoint as the contact form, tagged so
 * applications are distinguishable from project inquiries. The recruitment
 * email stays available as a fallback for candidates who prefer to attach
 * their CV directly.
 */
export function ApplicationForm({ role, onRoleChange }: ApplicationFormProps) {
  const [fields, setFields] = useState<ApplicationFormData>({
    name: '',
    email: '',
    role,
    message: '',
    ...emptyLinks,
  })
  const [errors, setErrors] = useState<ApplicationFormErrors>({})
  const [status, setStatus] = useState<ApplicationStatus>('idle')
  const [gotcha, setGotcha] = useState('')

  const data: ApplicationFormData = { ...fields, role }

  const updateField = (field: keyof ApplicationFormData, value: string) => {
    setFields((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => {
      if (!prev[field]) return prev
      const next = { ...prev }
      delete next[field]
      return next
    })
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const validationErrors = validate(data)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      const firstErrorId = Object.keys(validationErrors)[0]
      if (firstErrorId) {
        document.getElementById(firstErrorId)?.focus()
      }
      return
    }

    // Hidden honeypot filled in — a bot. Pretend success without sending.
    if (gotcha.trim()) {
      setStatus('success')
      setFields({ name: '', email: '', role, message: '', ...emptyLinks })
      setErrors({})
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
      setFields({ name: '', email: '', role, message: '', ...emptyLinks })
      setErrors({})
    } catch {
      setStatus('error')
    }
  }

  const statusInfo =
    status === 'idle' || status === 'submitting' ? null : statusMessages[status]

  return (
    <div>
      {statusInfo ? (
        <div
          role="status"
          className={`mb-6 flex items-start gap-3 rounded-2xl border p-5 ${
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
            <h3
              className={`text-sm font-semibold ${
                statusInfo.tone === 'success'
                  ? 'text-success'
                  : statusInfo.tone === 'error'
                    ? 'text-error'
                    : 'text-navy-900'
              }`}
            >
              {statusInfo.title}
            </h3>
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
            {statusInfo.tone === 'success' ? (
              <a
                href={`mailto:${siteConfig.careersEmail}`}
                className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-success hover:underline"
              >
                <Mail aria-hidden="true" className="h-4 w-4" />
                Attach a CV by email instead
              </a>
            ) : null}
          </div>
        </div>
      ) : null}

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            id="name"
            label="Full name"
            autoComplete="name"
            required
            value={fields.name}
            error={errors.name}
            onChange={(event) => updateField('name', event.target.value)}
          />
          <TextField
            id="email"
            label="Email"
            type="email"
            autoComplete="email"
            required
            value={fields.email}
            error={errors.email}
            onChange={(event) => updateField('email', event.target.value)}
          />
        </div>

        <SelectField
          id="role"
          label="Applying for"
          required
          options={roleOptions}
          value={role}
          error={errors.role}
          onChange={(event) => onRoleChange(event.target.value)}
        />

        <TextareaField
          id="message"
          label="Experience and cover note"
          required
          rows={6}
          placeholder="What kind of work do you do best? Describe your recent experience with the stack in this listing, and anything you would want us to know."
          hint="A few sentences are enough — links to your work carry the rest."
          value={fields.message}
          error={errors.message}
          onChange={(event) => updateField('message', event.target.value)}
        />

        <div className="grid gap-5 sm:grid-cols-3">
          <TextField
            id="github"
            label="GitHub"
            type="url"
            inputMode="url"
            placeholder="https://github.com/you"
            value={fields.github}
            error={errors.github}
            onChange={(event) => updateField('github', event.target.value)}
          />
          <TextField
            id="portfolio"
            label="Portfolio"
            type="url"
            inputMode="url"
            placeholder="https://yourwork.example"
            value={fields.portfolio}
            error={errors.portfolio}
            onChange={(event) => updateField('portfolio', event.target.value)}
          />
          <TextField
            id="linkedin"
            label="LinkedIn"
            type="url"
            inputMode="url"
            placeholder="https://linkedin.com/in/you"
            value={fields.linkedin}
            error={errors.linkedin}
            onChange={(event) => updateField('linkedin', event.target.value)}
          />
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
              'Sending…'
            ) : (
              <>
                Submit application
                <Send aria-hidden="true" className="h-4 w-4" />
              </>
            )}
          </Button>
          <p className="text-xs text-charcoal-500">
            Applications are reviewed on a rolling basis.
          </p>
        </div>

        <p className="text-xs leading-relaxed text-charcoal-500">
          Prefer to attach your CV as a file? Email it to{' '}
          <a
            href={`mailto:${siteConfig.careersEmail}`}
            className="font-medium text-gold-700 hover:text-gold-800"
          >
            {siteConfig.careersEmail}
          </a>
          {' '}— the link is pre-filled with the role you selected.
        </p>
      </form>
    </div>
  )
}
