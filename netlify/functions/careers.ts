import { careersConfirmation, careersNotification, type ApplicationSubmission } from '../emails/careers'
import { deliver } from '../lib/deliver'
import { cleanText, isAllowedOrigin, isBot, isEmail, isWebUrl, json, rateLimited, readJson, toLang, type FieldErrors } from '../lib/http'
import { getMailConfig, MailNotConfiguredError } from '../lib/mailer'

/** POST /api/careers — job applications from the careers page. */
export default async function handler(request: Request, context: { ip?: string }): Promise<Response> {
  if (request.method !== 'POST') return json(405, { ok: false, error: 'METHOD_NOT_ALLOWED' })
  if (!isAllowedOrigin(request)) return json(403, { ok: false, error: 'FORBIDDEN' })
  if (rateLimited(context.ip ?? 'unknown')) return json(429, { ok: false, error: 'TOO_MANY_REQUESTS' })

  const body = await readJson(request)
  if (!body) return json(400, { ok: false, error: 'INVALID_BODY' })
  if (isBot(body)) return json(200, { ok: true })

  const data: ApplicationSubmission = {
    name: cleanText(body.name, 120),
    email: cleanText(body.email, 254),
    role: cleanText(body.role, 160),
    message: cleanText(body.message, 5000, true),
    github: cleanText(body.github, 300),
    portfolio: cleanText(body.portfolio, 300),
    linkedin: cleanText(body.linkedin, 300),
    lang: toLang(body.lang),
  }

  const errors: FieldErrors = {}
  if (!data.name) errors.name = 'REQUIRED'
  if (!isEmail(data.email)) errors.email = 'INVALID_EMAIL'
  if (!data.role) errors.role = 'REQUIRED'
  if (data.message.length < 20) errors.message = 'TOO_SHORT'
  for (const field of ['github', 'portfolio', 'linkedin'] as const) {
    if (data[field] && !isWebUrl(data[field])) errors[field] = 'INVALID_URL'
  }
  if (Object.keys(errors).length > 0) return json(422, { ok: false, error: 'VALIDATION', fields: errors })

  const config = getMailConfig()
  try {
    await deliver({
      signature: 'careers',
      from: config.careersFrom,
      inbox: config.careersInbox,
      submitter: { name: data.name, email: data.email },
      render: (ctx) => ({ notification: careersNotification(data, ctx), confirmation: careersConfirmation(data, ctx) }),
    })
    return json(200, { ok: true })
  } catch (error) {
    if (error instanceof MailNotConfiguredError) {
      console.error('[careers]', error.message)
      return json(503, { ok: false, error: 'MAIL_NOT_CONFIGURED' })
    }
    console.error('[careers] send failed', error)
    return json(502, { ok: false, error: 'SEND_FAILED' })
  }
}

export const config = { path: '/api/careers' }
