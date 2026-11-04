import { button, detailsTable, esc, escMultiline, layout, numberedSteps, paragraph, plainText, type MailLang } from './layout'

export interface ContactSubmission {
  name: string
  email: string
  company: string
  service: string
  budget: string
  timeline: string
  message: string
  /** Product or plan the visitor came from, if any. */
  reference: string
  lang: MailLang
}

export interface TemplateContext {
  siteUrl: string
  signatureSrc: string
}

export interface RenderedEmail {
  subject: string
  html: string
  text: string
}

const PHONES = 'UAE +971 50 722 1495 · KSA +966 55 964 5341'

const copy = {
  en: {
    subject: 'We received your project enquiry — Kavelis Solutions',
    preheader: 'Thank you for contacting Kavelis. Here is what happens next.',
    eyebrow: 'Project enquiry',
    heading: (name: string) => `Thank you, ${name}.`,
    intro:
      'Your enquiry has reached the Kavelis team. We read every brief carefully and will reply with clarifying questions, realistic options, and a clear recommended next step — usually within two business days.',
    summary: 'A copy of what you sent',
    labels: { service: 'Service', company: 'Company', budget: 'Budget', timeline: 'Timeline', reference: 'Selection', message: 'Project description' },
    nextTitle: 'What happens next',
    steps: [
      ['Review', 'we read your brief and identify the key questions.'],
      ['Conversation', 'a short call or written thread to align on goals, constraints, and fit.'],
      ['Proposal', 'a clear scope, approach, timeline range, and investment level.'],
    ] as Array<[string, string]>,
    replyHint: 'Want to add files or more context? Simply reply to this email.',
    cta: 'See our work',
    signatureAlt: 'Kavelis Solutions — info@kavelis.llc — kavelis.llc',
    footer: `You are receiving this email because you sent an enquiry through kavelis.llc.<br>${PHONES}`,
  },
  ar: {
    subject: 'تم استلام استفسار مشروعك — Kavelis Solutions',
    preheader: 'شكرًا لتواصلك مع Kavelis. إليك ما سيحدث بعد ذلك.',
    eyebrow: 'استفسار مشروع',
    heading: (name: string) => `شكرًا لك، ${name}.`,
    intro:
      'وصل استفسارك إلى فريق Kavelis. نقرأ كل ملخص بعناية، وسنردّ بأسئلة توضيحية وخيارات واقعية وخطوة تالية واضحة نوصي بها — عادةً خلال يومي عمل.',
    summary: 'نسخة مما أرسلته',
    labels: { service: 'الخدمة', company: 'الشركة', budget: 'الميزانية', timeline: 'الإطار الزمني', reference: 'اختيارك', message: 'وصف المشروع' },
    nextTitle: 'ماذا يحدث بعد ذلك',
    steps: [
      ['المراجعة', 'نقرأ ملخصك ونحدّد الأسئلة الأساسية.'],
      ['المحادثة', 'مكالمة قصيرة أو مراسلة مكتوبة للاتفاق على الأهداف والقيود ومدى الملاءمة.'],
      ['العرض', 'نطاق واضح، ومنهجية، ونطاق زمني، ومستوى الاستثمار.'],
    ] as Array<[string, string]>,
    replyHint: 'تريد إضافة ملفات أو مزيد من التفاصيل؟ ما عليك سوى الرد على هذه الرسالة.',
    cta: 'شاهد أعمالنا',
    signatureAlt: 'Kavelis Solutions — info@kavelis.llc — kavelis.llc',
    footer: `تصلك هذه الرسالة لأنك أرسلت استفسارًا عبر kavelis.llc.<br><span dir="ltr">${PHONES}</span>`,
  },
}

/** The submitted fields as [label, raw value] pairs, skipping empty optional ones. */
function summaryFields(data: ContactSubmission, labels: (typeof copy)['en']['labels']): Array<[string, string]> {
  const fields: Array<[string, string]> = [
    [labels.service, data.service],
    [labels.reference, data.reference],
    [labels.company, data.company],
    [labels.budget, data.budget],
    [labels.timeline, data.timeline],
  ]
  return [...fields.filter(([, value]) => value), [labels.message, data.message]]
}

const htmlRows = (fields: Array<[string, string]>): Array<[string, string]> =>
  fields.map(([label, value]) => [label, escMultiline(value)])

const textRows = (fields: Array<[string, string]>): string[] =>
  fields.map(([label, value]) => (value.includes('\n') ? `${label}:\n${value}` : `${label}: ${value}`))

/** Template 1 — confirmation sent to the client, in the language they used on the site. */
export function clientConfirmation(data: ContactSubmission, ctx: TemplateContext): RenderedEmail {
  const t = copy[data.lang]
  const firstName = data.name.trim().split(/\s+/)[0] ?? data.name
  const body = [
    paragraph(esc(t.intro), data.lang),
    numberedSteps(t.nextTitle, t.steps, data.lang),
    paragraph(`<strong style="color:#111629;">${esc(t.summary)}</strong>`, data.lang),
    detailsTable(htmlRows(summaryFields(data, t.labels)), data.lang),
    paragraph(esc(t.replyHint), data.lang),
    button(t.cta, `${ctx.siteUrl}/portfolio`),
  ].join('')

  return {
    subject: t.subject,
    html: layout({
      lang: data.lang,
      preheader: t.preheader,
      eyebrow: t.eyebrow,
      heading: t.heading(firstName),
      body,
      signatureSrc: ctx.signatureSrc,
      signatureAlt: t.signatureAlt,
      footer: t.footer,
      siteUrl: ctx.siteUrl,
    }),
    text: plainText([
      t.heading(firstName),
      '',
      t.intro,
      '',
      `${t.nextTitle}:`,
      ...t.steps.map(([title, text], index) => `${index + 1}. ${title} — ${text}`),
      '',
      `${t.summary}:`,
      ...textRows(summaryFields(data, t.labels)),
      '',
      t.replyHint,
      '',
      'Kavelis Solutions — info@kavelis.llc — https://kavelis.llc',
      PHONES,
    ]),
  }
}

/** Internal notification delivered to the Kavelis inbox (always English). Reply goes straight to the client. */
export function clientNotification(data: ContactSubmission, ctx: TemplateContext): RenderedEmail {
  const t = copy.en
  const rows: Array<[string, string]> = [
    ['Name', esc(data.name)],
    ['Email', `<a href="mailto:${esc(data.email)}" style="color:#8C5E22;">${esc(data.email)}</a>`],
    ...htmlRows(summaryFields(data, t.labels)),
    ['Site language', data.lang === 'ar' ? 'Arabic' : 'English'],
  ]
  const subject = `New project enquiry — ${data.service} — ${data.name}`.slice(0, 180)

  return {
    subject,
    html: layout({
      lang: 'en',
      preheader: `${data.name} sent an enquiry about ${data.service}.`,
      eyebrow: 'New website enquiry',
      heading: `${data.name} wants to talk about ${data.service}`,
      body: [
        paragraph('A new project enquiry arrived through the website. Reply to this email to answer the client directly.', 'en'),
        detailsTable(rows, 'en'),
        button(`Reply to ${data.name.split(/\s+/)[0] ?? data.name}`, `mailto:${data.email}`),
      ].join(''),
      signatureSrc: ctx.signatureSrc,
      signatureAlt: t.signatureAlt,
      footer: 'Sent automatically by the kavelis.llc contact form. The client received a confirmation email.',
      siteUrl: ctx.siteUrl,
    }),
    text: plainText([
      'New project enquiry from kavelis.llc',
      '',
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Service: ${data.service}`,
      data.reference ? `Selection: ${data.reference}` : null,
      data.company ? `Company: ${data.company}` : null,
      data.budget ? `Budget: ${data.budget}` : null,
      data.timeline ? `Timeline: ${data.timeline}` : null,
      `Site language: ${data.lang === 'ar' ? 'Arabic' : 'English'}`,
      '',
      'Project description:',
      data.message,
    ]),
  }
}
