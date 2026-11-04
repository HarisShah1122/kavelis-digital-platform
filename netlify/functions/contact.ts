import { clientConfirmation, clientNotification, type ContactSubmission } from '../emails/client'
import { deliver } from '../lib/deliver'
import { cleanText, isAllowedOrigin, isBot, isEmail, json, rateLimited, readJson, toLang, type FieldErrors } from '../lib/http'
import { getMailConfig, MailNotConfiguredError } from '../lib/mailer'

/** POST /api/contact — project enquiries from the contact page and homepage. */
export default async function handler(request: Request, context: { ip?: string }): Promise<Response> {
  if (request.method !== 'POST') return json(405, { ok: false, error: 'METHOD_NOT_ALLOWED' })
  if (!isAllowedOrigin(request)) return json(403, { ok: false, error: 'FORBIDDEN' })
  if (rateLimited(context.ip ?? 'unknown')) return json(429, { ok: false, error: 'TOO_MANY_REQUESTS' })

  const body = await readJson(request)
  if (!body) return json(400, { ok: false, error: 'INVALID_BODY' })
  // Honeypot filled: answer like a success so bots learn nothing, send nothing.
  if (isBot(body)) return json(200, { ok: true })

  const data: ContactSubmission = {
    name: cleanText(body.name, 120),
    email: cleanText(body.email, 254),
    company: cleanText(body.company, 160),
    service: cleanText(body.service, 120),
    budget: cleanText(body.budget, 60),
    timeline: cleanText(body.timeline, 60),
    message: cleanText(body.message, 5000, true),
    reference: cleanText(body.reference, 300),
    lang: toLang(body.lang),
  }

  const errors: FieldErrors = {}
  if (!data.name) errors.name = 'REQUIRED'
  if (!isEmail(data.email)) errors.email = 'INVALID_EMAIL'
  if (!data.service) errors.service = 'REQUIRED'
  if (data.message.length < 20) errors.message = 'TOO_SHORT'
  if (Object.keys(errors).length > 0) return json(422, { ok: false, error: 'VALIDATION', fields: errors })

  const config = getMailConfig()
  try {
    await deliver({
      signature: 'info',
      from: config.from,
      inbox: config.contactInbox,
      submitter: { name: data.name, email: data.email },
      render: (ctx) => ({ notification: clientNotification(data, ctx), confirmation: clientConfirmation(data, ctx) }),
    })
    return json(200, { ok: true })
  } catch (error) {
    if (error instanceof MailNotConfiguredError) {
      console.error('[contact]', error.message)
      return json(503, { ok: false, error: 'MAIL_NOT_CONFIGURED' })
    }
    console.error('[contact] send failed', error)
    return json(502, { ok: false, error: 'SEND_FAILED' })
  }
}

export const config = { path: '/api/contact' }
