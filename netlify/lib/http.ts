import type { MailLang } from '../emails/layout'

const MAX_BODY_BYTES = 20_000

export function json(status: number, body: Record<string, unknown>): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  })
}

/**
 * Only accept browser posts from the site itself (and local dev). This is not
 * authentication — it keeps casual cross-site spam off the endpoint.
 */
export function isAllowedOrigin(request: Request): boolean {
  const origin = request.headers.get('origin')
  if (!origin) return false
  const site = (process.env.SITE_URL ?? 'https://kavelis.llc').replace(/\/$/, '')
  const allowed = [site, site.replace('://', '://www.'), process.env.URL, process.env.DEPLOY_PRIME_URL]
  if (allowed.includes(origin)) return true
  return /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin)
}

/** Parses a JSON object body, rejecting oversized or malformed payloads. */
export async function readJson(request: Request): Promise<Record<string, unknown> | null> {
  const raw = await request.text()
  if (raw.length > MAX_BODY_BYTES) return null
  try {
    const parsed: unknown = JSON.parse(raw)
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? (parsed as Record<string, unknown>) : null
  } catch {
    return null
  }
}

/**
 * Best-effort rate limit: a few submissions per IP per window. State lives in
 * the warm function instance, so it resets on cold starts — enough to blunt
 * a burst, not a substitute for a WAF.
 */
const hits = new Map<string, number[]>()
export function rateLimited(ip: string, limit = 5, windowMs = 10 * 60_000): boolean {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((time) => now - time < windowMs)
  recent.push(now)
  hits.set(ip, recent)
  return recent.length > limit
}

// ——— Field validation ———

export type FieldErrors = Record<string, string>

/** Trims, strips control characters (header injection), and caps length. */
export function cleanText(value: unknown, max: number, multiline = false): string {
  if (typeof value !== 'string') return ''
  const stripped = multiline
    ? value.replace(/\r\n/g, '\n').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    : value.replace(/[\u0000-\u001F\u007F]/g, ' ')
  return stripped.trim().slice(0, max)
}

export const isEmail = (value: string) => value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

export function isWebUrl(value: string): boolean {
  try {
    const url = new URL(value)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

export const toLang = (value: unknown): MailLang => (value === 'ar' ? 'ar' : 'en')

/** True when the hidden honeypot was filled in — treat as a bot. */
export const isBot = (body: Record<string, unknown>) => typeof body._gotcha === 'string' && body._gotcha.trim() !== ''
