import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import nodemailer, { type Transporter } from 'nodemailer'
import type Mail from 'nodemailer/lib/mailer'

/**
 * Nodemailer configuration. Every value comes from environment variables set
 * in the Netlify dashboard (or a local .env for `netlify dev`) — credentials
 * are never bundled into the frontend.
 *
 *   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS   SMTP account (required)
 *   SMTP_SECURE        "true" for port 465 (implicit TLS); default: port === 465
 *   MAIL_FROM          From for client mail,  e.g. "Kavelis Solutions <info@kavelis.llc>"
 *   CAREERS_FROM       From for careers mail, e.g. "Kavelis Careers <careers@kavelis.llc>"
 *   CONTACT_INBOX      Where project enquiries are delivered (default info@kavelis.llc)
 *   CAREERS_INBOX      Where applications are delivered (default careers@kavelis.llc)
 *   SITE_URL           Public origin used in links (default https://kavelis.llc)
 */
export interface MailConfig {
  from: string
  careersFrom: string
  contactInbox: string
  careersInbox: string
  siteUrl: string
}

export class MailNotConfiguredError extends Error {
  constructor(missing: string[]) {
    super(`SMTP is not configured. Missing: ${missing.join(', ')}`)
  }
}

let cachedTransport: Transporter | null = null

function required(): { host: string; port: number; user: string; pass: string } {
  const env = process.env
  const missing = ['SMTP_HOST', 'SMTP_USER', 'SMTP_PASS'].filter((key) => !env[key])
  if (missing.length > 0) throw new MailNotConfiguredError(missing)
  return {
    host: env.SMTP_HOST as string,
    port: Number(env.SMTP_PORT ?? 587),
    user: env.SMTP_USER as string,
    pass: env.SMTP_PASS as string,
  }
}

export function getMailConfig(): MailConfig {
  const env = process.env
  const user = env.SMTP_USER ?? 'info@kavelis.llc'
  const from = env.MAIL_FROM ?? `Kavelis Solutions <${user}>`
  return {
    from,
    careersFrom: env.CAREERS_FROM ?? from,
    contactInbox: env.CONTACT_INBOX ?? 'info@kavelis.llc',
    careersInbox: env.CAREERS_INBOX ?? 'careers@kavelis.llc',
    siteUrl: (env.SITE_URL ?? 'https://kavelis.llc').replace(/\/$/, ''),
  }
}

/**
 * One transport per warm instance, deliberately without connection pooling: a
 * frozen serverless instance can thaw holding a dead socket, which would fail
 * a real enquiry. Timeouts stay inside the function's execution limit so a
 * slow SMTP server produces a clean error instead of a killed request.
 */
export function getTransport(): Transporter {
  if (cachedTransport) return cachedTransport
  const { host, port, user, pass } = required()
  cachedTransport = nodemailer.createTransport({
    host,
    port,
    secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : port === 465,
    auth: { user, pass },
    connectionTimeout: 5_000,
    greetingTimeout: 5_000,
    socketTimeout: 8_000,
  })
  return cachedTransport
}

export type SignatureKind = 'info' | 'careers'

/** Content-ID the templates reference as <img src="cid:…">. */
export const signatureCid = (kind: SignatureKind) => `kavelis-signature-${kind}@kavelis.llc`

/**
 * The signature PNG, attached inline so it displays without the recipient
 * having to allow remote images. netlify.toml ships public/email/* with the
 * functions; if the file is somehow missing, templates fall back to the copy
 * hosted on the website.
 */
export function signatureAttachment(kind: SignatureKind): Mail.Attachment | null {
  const file = resolve(process.cwd(), 'public', 'email', `kavelis-signature-${kind}.png`)
  if (!existsSync(file)) return null
  return {
    filename: `kavelis-signature-${kind}.png`,
    content: readFileSync(file),
    contentType: 'image/png',
    cid: signatureCid(kind),
    contentDisposition: 'inline',
  }
}

export function signatureSrc(kind: SignatureKind, inline: boolean, siteUrl: string): string {
  return inline ? `cid:${signatureCid(kind)}` : `${siteUrl}/email/kavelis-signature-${kind}.png`
}
