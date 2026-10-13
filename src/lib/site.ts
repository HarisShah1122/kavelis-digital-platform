import type { ContactFormData, ContactPayload } from '@/types'

export const siteConfig = {
  name: 'Kavelis',
  tagline: 'SaaS, automation, and custom software for growing businesses',
  description:
    'Kavelis designs, builds, and maintains SaaS products, custom web applications, automation systems, and digital commerce platforms for growing businesses.',
  /** Production origin. Leave empty until the final domain is confirmed. */
  url: import.meta.env.VITE_SITE_URL ?? '',
  /** Public business email. Rendered only when configured. */
  contactEmail: import.meta.env.VITE_CONTACT_EMAIL ?? '',
  /** Optional POST endpoint for project inquiries. */
  contactEndpoint: import.meta.env.VITE_CONTACT_ENDPOINT ?? '',
  startPath: '/contact',
} as const

export function buildContactPayload(data: ContactFormData): ContactPayload {
  return {
    ...data,
    submittedAt: new Date().toISOString(),
  }
}

export async function submitContactForm(data: ContactFormData): Promise<void> {
  const endpoint = siteConfig.contactEndpoint
  if (!endpoint) {
    throw new Error('CONTACT_ENDPOINT_MISSING')
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(buildContactPayload(data)),
  })

  if (!response.ok) {
    throw new Error('CONTACT_SUBMIT_FAILED')
  }
}
