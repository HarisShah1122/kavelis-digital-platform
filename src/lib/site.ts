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
  /** Optional POST endpoint for form submissions (Formspree) — inquiries and applications. */
  contactEndpoint: import.meta.env.VITE_CONTACT_ENDPOINT ?? '',
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
): ContactPayload {
  return {
    ...data,
    ...(reference ? { reference } : {}),
    submittedAt: new Date().toISOString(),
  }
}

export async function submitContactForm(data: ContactFormData, reference?: string): Promise<void> {
  const endpoint = siteConfig.contactEndpoint
  if (!endpoint) {
    throw new Error('CONTACT_ENDPOINT_MISSING')
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(buildContactPayload(data, reference)),
  })

  if (!response.ok) {
    throw new Error('CONTACT_SUBMIT_FAILED')
  }
}

/**
 * Sends a job application to the shared Formspree endpoint.
 * The payload is tagged with `form: 'application'` and a role-based subject
 * so applications can be told apart from project inquiries in one inbox.
 */
export async function submitApplicationForm(
  data: ApplicationFormData,
  gotcha?: string,
): Promise<void> {
  const endpoint = siteConfig.contactEndpoint
  if (!endpoint) {
    throw new Error('CONTACT_ENDPOINT_MISSING')
  }

  const payload: ApplicationPayload = {
    ...data,
    ...(gotcha ? { _gotcha: gotcha } : {}),
    _subject: data.role ? `Application — ${data.role}` : 'General application — Kavelis',
    form: 'application',
    submittedAt: new Date().toISOString(),
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
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
