import type { RenderedEmail, TemplateContext } from './client'
import { button, detailsTable, esc, escMultiline, layout, numberedSteps, paragraph, plainText, type MailLang } from './layout'

export interface ApplicationSubmission {
  name: string
  email: string
  /** English job title, or "General application". */
  role: string
  message: string
  github: string
  portfolio: string
  linkedin: string
  lang: MailLang
}

const GENERAL = 'General application'

const copy = {
  en: {
    subject: (role: string) => (role === GENERAL ? 'We received your application — Kavelis Careers' : `We received your application for ${role} — Kavelis Careers`),
    preheader: 'Thank you for applying to Kavelis. Here is how our review works.',
    eyebrow: 'Careers · Application received',
    heading: (name: string) => `Thank you for applying, ${name}.`,
    intro: (role: string) =>
      role === GENERAL
        ? 'Your open application has reached the Kavelis hiring team. We keep strong profiles on file and contact candidates when a role that matches their experience opens.'
        : `Your application for the ${role} role has reached the Kavelis hiring team.`,
    nextTitle: 'How our review works',
    steps: [
      ['Review', 'applications are reviewed on a rolling basis by the people you would work with.'],
      ['Conversation', 'if your experience matches, we contact you to arrange a call.'],
      ['On file', 'if there is no match right now, we keep your details for roles that fit your experience.'],
    ] as Array<[string, string]>,
    summary: 'What you sent us',
    labels: { role: 'Role', github: 'GitHub', portfolio: 'Portfolio', linkedin: 'LinkedIn', message: 'Cover note' },
    general: 'General application',
    cvHint: 'Want to attach your CV as a file? Reply to this email with it attached and we will add it to your application.',
    cta: 'Learn about Kavelis',
    signatureAlt: 'Kavelis Solutions | Careers — careers@kavelis.llc — kavelis.llc',
    footer: 'You are receiving this email because you applied through kavelis.llc/careers. This address is monitored for hiring only.',
  },
  ar: {
    subject: (role: string) => (role === GENERAL ? 'تم استلام طلبك — الوظائف في Kavelis' : `تم استلام طلبك لوظيفة ${role} — الوظائف في Kavelis`),
    preheader: 'شكرًا لتقديمك إلى Kavelis. إليك كيف نراجع الطلبات.',
    eyebrow: 'الوظائف · تم استلام الطلب',
    heading: (name: string) => `شكرًا لتقديمك، ${name}.`,
    intro: (role: string) =>
      role === GENERAL
        ? 'وصل طلبك المفتوح إلى فريق التوظيف في Kavelis. نحتفظ بالملفات المميزة ونتواصل مع المرشحين عند فتح دور يطابق خبرتهم.'
        : `وصل طلبك لوظيفة ${role} إلى فريق التوظيف في Kavelis.`,
    nextTitle: 'كيف نراجع الطلبات',
    steps: [
      ['المراجعة', 'تُراجَع الطلبات باستمرار من قِبل الأشخاص الذين ستعمل معهم.'],
      ['المحادثة', 'إذا طابقت خبرتك الدور، نتواصل معك لترتيب مكالمة.'],
      ['في ملفاتنا', 'إذا لم يتوفر دور مناسب الآن، نحتفظ ببياناتك للأدوار التي تطابق خبرتك.'],
    ] as Array<[string, string]>,
    summary: 'ما أرسلته إلينا',
    labels: { role: 'الدور', github: 'GitHub', portfolio: 'معرض الأعمال', linkedin: 'LinkedIn', message: 'رسالة التعريف' },
    general: 'طلب عام',
    cvHint: 'تريد إرفاق سيرتك الذاتية كملف؟ ردّ على هذه الرسالة مع إرفاقها وسنضيفها إلى طلبك.',
    cta: 'تعرّف على Kavelis',
    signatureAlt: 'Kavelis Solutions | Careers — careers@kavelis.llc — kavelis.llc',
    footer: 'تصلك هذه الرسالة لأنك قدّمت طلبًا عبر kavelis.llc/careers. هذا العنوان مخصّص للتوظيف فقط.',
  },
}

const link = (url: string) => `<a href="${esc(url)}" style="color:#8C5E22;" dir="ltr">${esc(url)}</a>`

function fields(data: ApplicationSubmission, t: (typeof copy)['en']) {
  const role = data.role === GENERAL ? t.general : data.role
  const links: Array<[string, string]> = [
    [t.labels.github, data.github],
    [t.labels.portfolio, data.portfolio],
    [t.labels.linkedin, data.linkedin],
  ]
  const present = links.filter(([, url]) => url)
  return {
    html: [
      [t.labels.role, esc(role)],
      ...present.map(([label, url]): [string, string] => [label, link(url)]),
      [t.labels.message, escMultiline(data.message)],
    ] as Array<[string, string]>,
    text: [`${t.labels.role}: ${role}`, ...present.map(([label, url]) => `${label}: ${url}`), '', `${t.labels.message}:`, data.message],
  }
}

/** Template 2 — confirmation sent to the applicant, in the language they used on the site. */
export function careersConfirmation(data: ApplicationSubmission, ctx: TemplateContext): RenderedEmail {
  const t = copy[data.lang]
  const firstName = data.name.trim().split(/\s+/)[0] ?? data.name
  const summary = fields(data, t)

  return {
    subject: t.subject(data.role),
    html: layout({
      lang: data.lang,
      preheader: t.preheader,
      eyebrow: t.eyebrow,
      heading: t.heading(firstName),
      body: [
        paragraph(esc(t.intro(data.role)), data.lang),
        numberedSteps(t.nextTitle, t.steps, data.lang),
        paragraph(`<strong style="color:#111629;">${esc(t.summary)}</strong>`, data.lang),
        detailsTable(summary.html, data.lang),
        paragraph(esc(t.cvHint), data.lang),
        button(t.cta, `${ctx.siteUrl}/about`),
      ].join(''),
      signatureSrc: ctx.signatureSrc,
      signatureAlt: t.signatureAlt,
      footer: t.footer,
      siteUrl: ctx.siteUrl,
    }),
    text: plainText([
      t.heading(firstName),
      '',
      t.intro(data.role),
      '',
      `${t.nextTitle}:`,
      ...t.steps.map(([title, text], index) => `${index + 1}. ${title} — ${text}`),
      '',
      `${t.summary}:`,
      ...summary.text,
      '',
      t.cvHint,
      '',
      'Kavelis Solutions | Careers — careers@kavelis.llc — https://kavelis.llc',
    ]),
  }
}

/** Internal notification delivered to the careers inbox (always English). Reply goes straight to the applicant. */
export function careersNotification(data: ApplicationSubmission, ctx: TemplateContext): RenderedEmail {
  const t = copy.en
  const summary = fields(data, t)
  const rows: Array<[string, string]> = [
    ['Name', esc(data.name)],
    ['Email', `<a href="mailto:${esc(data.email)}" style="color:#8C5E22;">${esc(data.email)}</a>`],
    ...summary.html,
    ['Site language', data.lang === 'ar' ? 'Arabic' : 'English'],
  ]
  const role = data.role === GENERAL ? 'General application' : data.role

  return {
    subject: `New application — ${role} — ${data.name}`.slice(0, 180),
    html: layout({
      lang: 'en',
      preheader: `${data.name} applied for ${role}.`,
      eyebrow: 'Careers · New application',
      heading: `${data.name} applied for ${role}`,
      body: [
        paragraph('A new application arrived through the careers page. Reply to this email to contact the applicant directly.', 'en'),
        detailsTable(rows, 'en'),
        button(`Reply to ${data.name.split(/\s+/)[0] ?? data.name}`, `mailto:${data.email}`),
      ].join(''),
      signatureSrc: ctx.signatureSrc,
      signatureAlt: t.signatureAlt,
      footer: 'Sent automatically by the kavelis.llc careers form. The applicant received a confirmation email.',
      siteUrl: ctx.siteUrl,
    }),
    text: plainText([
      'New application from kavelis.llc/careers',
      '',
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Site language: ${data.lang === 'ar' ? 'Arabic' : 'English'}`,
      ...summary.text,
    ]),
  }
}
