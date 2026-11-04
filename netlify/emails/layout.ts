/**
 * Shared email layout.
 *
 * Email clients ignore most modern CSS, so this uses the conservative recipe:
 * 600px tables, inline styles, web-safe fonts, a "bulletproof" table button,
 * and no SVG (Gmail and Outlook drop it — the signature is a PNG).
 */

export type MailLang = 'en' | 'ar'

const COLORS = {
  navy: '#111629',
  gold: '#C58D3E',
  goldDark: '#8C5E22',
  text: '#3D4450',
  muted: '#8D95A2',
  line: '#E7E9ED',
  canvas: '#F4F5F7',
}

const escapeMap: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }

/** Escapes user input before it is placed in HTML. Every dynamic value goes through this. */
export function esc(value: string): string {
  return value.replace(/[&<>"']/g, (char) => escapeMap[char] ?? char)
}

/** Escapes and keeps the sender's line breaks. */
export function escMultiline(value: string): string {
  return esc(value).replace(/\r?\n/g, '<br>')
}

export function paragraph(html: string, lang: MailLang): string {
  return `<p style="margin:0 0 16px;font-size:16px;line-height:1.65;color:${COLORS.text};text-align:${lang === 'ar' ? 'right' : 'left'};">${html}</p>`
}

/** Label / value rows. Values must already be escaped. */
export function detailsTable(rows: Array<[label: string, valueHtml: string]>, lang: MailLang): string {
  const align = lang === 'ar' ? 'right' : 'left'
  const body = rows
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding:12px 0;border-bottom:1px solid ${COLORS.line};vertical-align:top;width:34%;font-size:12px;font-weight:bold;letter-spacing:${lang === 'ar' ? '0' : '0.08em'};text-transform:uppercase;color:${COLORS.goldDark};text-align:${align};">${esc(label)}</td>
        <td style="padding:12px 0;border-bottom:1px solid ${COLORS.line};vertical-align:top;font-size:15px;line-height:1.55;color:${COLORS.navy};text-align:${align};">${value}</td>
      </tr>`,
    )
    .join('')
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin:8px 0 24px;border-top:1px solid ${COLORS.line};">${body}</table>`
}

export function numberedSteps(title: string, steps: Array<[title: string, body: string]>, lang: MailLang): string {
  const align = lang === 'ar' ? 'right' : 'left'
  const items = steps
    .map(
      ([stepTitle, body], index) => `
      <tr>
        <td style="width:36px;padding:0 0 14px;vertical-align:top;">
          <div style="width:26px;height:26px;border-radius:13px;background:${COLORS.navy};color:${COLORS.gold};font-size:13px;font-weight:bold;line-height:26px;text-align:center;">${index + 1}</div>
        </td>
        <td style="padding:2px 0 14px;vertical-align:top;font-size:15px;line-height:1.55;color:${COLORS.text};text-align:${align};">
          <strong style="color:${COLORS.navy};">${esc(stepTitle)}</strong> — ${esc(body)}
        </td>
      </tr>`,
    )
    .join('')
  return `
    <p style="margin:8px 0 12px;font-size:13px;font-weight:bold;letter-spacing:${lang === 'ar' ? '0' : '0.08em'};text-transform:uppercase;color:${COLORS.goldDark};text-align:${align};">${esc(title)}</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 20px;">${items}</table>`
}

/** Table-based button — renders in Outlook, Gmail, and Apple Mail. */
export function button(label: string, href: string): string {
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:8px 0 28px;">
      <tr>
        <td style="border-radius:8px;background:${COLORS.gold};">
          <a href="${esc(href)}" style="display:inline-block;padding:13px 26px;font-size:15px;font-weight:bold;color:${COLORS.navy};text-decoration:none;border-radius:8px;">${esc(label)}</a>
        </td>
      </tr>
    </table>`
}

export interface LayoutOptions {
  lang: MailLang
  /** Hidden preview line shown next to the subject in the inbox. */
  preheader: string
  /** Small label above the heading, e.g. "Project enquiry". */
  eyebrow: string
  heading: string
  /** Pre-built, already-escaped body HTML. */
  body: string
  signatureSrc: string
  signatureAlt: string
  footer: string
  siteUrl: string
}

export function layout(options: LayoutOptions): string {
  const { lang, preheader, eyebrow, heading, body, signatureSrc, signatureAlt, footer, siteUrl } = options
  const dir = lang === 'ar' ? 'rtl' : 'ltr'
  const align = lang === 'ar' ? 'right' : 'left'
  const font = lang === 'ar' ? "Tahoma, 'Segoe UI', Arial, sans-serif" : "'Segoe UI', Helvetica, Arial, sans-serif"

  return `<!doctype html>
<html lang="${lang}" dir="${dir}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="light only">
  <meta name="supported-color-schemes" content="light">
  <title>${esc(heading)}</title>
</head>
<body style="margin:0;padding:0;background:${COLORS.canvas};font-family:${font};">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${esc(preheader)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${COLORS.canvas};">
    <tr>
      <td align="center" style="padding:32px 12px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" dir="${dir}" style="width:100%;max-width:600px;background:#FFFFFF;border-radius:14px;overflow:hidden;border:1px solid ${COLORS.line};">
          <tr>
            <td style="background:${COLORS.navy};padding:22px 32px;text-align:${align};">
              <a href="${esc(siteUrl)}" style="font-size:18px;font-weight:bold;letter-spacing:0.02em;color:#FFFFFF;text-decoration:none;" dir="ltr">Kavelis<span style="color:${COLORS.gold};"> Solutions</span></a>
            </td>
          </tr>
          <tr><td style="height:4px;line-height:4px;font-size:0;background:${COLORS.gold};">&nbsp;</td></tr>
          <tr>
            <td style="padding:36px 32px 8px;text-align:${align};">
              <p style="margin:0 0 10px;font-size:12px;font-weight:bold;letter-spacing:${lang === 'ar' ? '0' : '0.14em'};text-transform:uppercase;color:${COLORS.gold};">${esc(eyebrow)}</p>
              <h1 style="margin:0 0 22px;font-size:26px;line-height:1.3;font-weight:bold;color:${COLORS.navy};">${esc(heading)}</h1>
              ${body}
            </td>
          </tr>
          <tr>
            <td style="padding:8px 32px 28px;border-top:1px solid ${COLORS.line};" dir="ltr">
              <a href="${esc(siteUrl)}" style="display:block;text-decoration:none;"><img src="${signatureSrc}" width="520" height="220" alt="${esc(signatureAlt)}" style="display:block;width:100%;max-width:520px;height:auto;border:0;margin-top:20px;"></a>
            </td>
          </tr>
          <tr>
            <td style="background:${COLORS.canvas};padding:18px 32px;font-size:12px;line-height:1.6;color:${COLORS.muted};text-align:${align};">
              ${footer}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

/** Plain-text twin of an email, for clients and filters that prefer text. */
export function plainText(lines: Array<string | null | undefined>): string {
  return lines.filter((line): line is string => line !== null && line !== undefined).join('\n')
}
