import type {
  ApplicationFormData,
  ApplicationPayload,
  ContactFormData,
  ContactPayload,
} from '@/types'

/**
 * Verified public business information.
 *
 * Only details that are confirmed may appear here — this object is rendered
 * across the site (footer, contact, careers) and injected into SEO metadata.
 */
export const siteConfig = {
  name: 'Kavelis',
  slogan: 'Build Smarter. Automate Better. Scale Faster.',
  tagline: 'Custom software, automation, and e-commerce for growing businesses',
  description:
    'Kavelis designs, builds, and maintains custom software, business automation, e-commerce experiences, and data-driven solutions for growing businesses.',
  /** Production origin. Used for canonical URLs, Open Graph tags, and the sitemap. */
  url: import.meta.env.VITE_SITE_URL ?? 'https://kavelis.llc',
  /** Verified public business email — used for project inquiries. */
  businessEmail: 'info@kavelis.llc',
  /** Verified recruitment email — used on the Careers page only. */
  careersEmail: 'careers@kavelis.llc',
  /** Existing verified WhatsApp contact. */
  whatsappUrl: 'https://wa.me/923135002818',
  whatsappLabel: '+92 313 5002818',
  /** Verified business phone numbers. `display` is rendered LTR in both languages. */
  phones: [
    { id: 'uae', tel: '+971507221495', display: '+971 50 722 1495' },
    { id: 'ksa', tel: '+966559645341', display: '+966 55 964 5341' },
  ],
  /**
   * POST endpoint for project enquiries: Formspree, or "/api/contact" for the
   * Nodemailer backend in netlify/functions once SMTP is configured.
   */
  contactEndpoint: import.meta.env.VITE_CONTACT_ENDPOINT ?? '',
  /** POST endpoint for job applications ("/api/careers" with the Nodemailer backend). Falls back to the contact endpoint. */
  applicationEndpoint: import.meta.env.VITE_APPLICATION_ENDPOINT ?? import.meta.env.VITE_CONTACT_ENDPOINT ?? '',
  startPath: '/contact',
} as const

/** Absolute URL for the site origin (used for canonical and social tags). */
export function absoluteUrl(path = '/'): string {
  const origin = siteConfig.url.replace(/\/$/, '')
  return `${origin}${path.startsWith('/') ? path : `/${path}`}`
}

export function buildContactPayload(
  data: ContactFormData,
  reference?: string,
  gotcha?: string,
  lang: 'en' | 'ar' = 'en',
): ContactPayload {
  return {
    ...data,
    ...(reference ? { reference } : {}),
    ...(gotcha ? { _gotcha: gotcha } : {}),
    _subject: `Project enquiry — ${data.service || 'General'}`,
    lang,
    submittedAt: new Date().toISOString(),
  }
}

/**
 * Sends a project enquiry to the configured endpoint (Formspree or the
 * Nodemailer backend). Both validate server-side; `_gotcha` is the honeypot
 * and must stay empty for human submissions. `lang` picks the language of
 * the confirmation email.
 */
export async function submitContactForm(
  data: ContactFormData,
  reference?: string,
  gotcha?: string,
  lang: 'en' | 'ar' = 'en',
): Promise<void> {
  const endpoint = siteConfig.contactEndpoint
  if (!endpoint) {
    throw new Error('CONTACT_ENDPOINT_MISSING')
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(buildContactPayload(data, reference, gotcha, lang)),
  })

  if (!response.ok) {
    throw new Error('CONTACT_SUBMIT_FAILED')
  }
}

/**
 * Sends a job application to the application endpoint (the careers backend,
 * or the shared Formspree form). The payload is tagged with
 * `form: 'application'` and a role-based subject so applications can be told
 * apart from project inquiries in a shared inbox.
 */
export async function submitApplicationForm(
  data: ApplicationFormData,
  gotcha?: string,
  lang: 'en' | 'ar' = 'en',
): Promise<void> {
  const endpoint = siteConfig.applicationEndpoint
  if (!endpoint) {
    throw new Error('CONTACT_ENDPOINT_MISSING')
  }

  const payload: ApplicationPayload = {
    ...data,
    ...(gotcha ? { _gotcha: gotcha } : {}),
    _subject: data.role ? `Application — ${data.role}` : 'General application — Kavelis',
    form: 'application',
    lang,
    submittedAt: new Date().toISOString(),
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error('APPLICATION_SUBMIT_FAILED')
  }
}

/** Builds a mailto: link with a pre-filled subject and body. */
export function mailtoLink({
  to,
  subject,
  body,
}: {
  to: string
  subject?: string
  body?: string
}): string {
  const params = new URLSearchParams()
  if (subject) params.set('subject', subject)
  if (body) params.set('body', body)
  const query = params.toString()
  return `mailto:${to}${query ? `?${query}` : ''}`
}
