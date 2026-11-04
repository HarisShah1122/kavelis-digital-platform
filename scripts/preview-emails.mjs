/**
 * Renders every email template to email-previews/*.html so they can be opened
 * in a browser. Nothing is sent. Run with: npm run email:preview
 */
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { build } from 'esbuild'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const out = join(root, 'email-previews')
mkdirSync(out, { recursive: true })

const bundle = join(out, '.templates.mjs')
await build({
  stdin: {
    contents: `export * from './netlify/emails/client'; export * from './netlify/emails/careers'`,
    resolveDir: root,
    loader: 'ts',
  },
  bundle: true,
  platform: 'node',
  format: 'esm',
  outfile: bundle,
  logLevel: 'error',
})
const t = await import(pathToFileURL(bundle).href)

const ctx = (kind) => ({
  siteUrl: 'https://kavelis.llc',
  signatureSrc: `../public/email/kavelis-signature-${kind}.png`,
})

const message =
  'We run three warehouses and track stock in spreadsheets.\nWe need one system with low-stock alerts and role-based access.'
const client = {
  name: 'Sara Ahmed',
  email: 'sara@example.com',
  company: 'Acme Trading',
  service: 'Custom Web Applications',
  budget: '$5,000 – $10,000',
  timeline: '1 – 3 months',
  message,
  reference: '',
  lang: 'en',
}
const applicant = {
  name: 'Omar Khan',
  email: 'omar@example.com',
  role: 'Full Stack Developer — MERN Stack',
  message: 'Six years building React and Node.js applications, most recently a multi-tenant SaaS platform.',
  github: 'https://github.com/omar',
  portfolio: 'https://omar.example',
  linkedin: '',
  lang: 'en',
}

const emails = {
  'client-confirmation-en': t.clientConfirmation(client, ctx('info')),
  'client-confirmation-ar': t.clientConfirmation(
    { ...client, name: 'سارة أحمد', message: 'لدينا ثلاثة مستودعات ونتابع المخزون في جداول. نحتاج إلى نظام واحد مع تنبيهات النقص.', lang: 'ar' },
    ctx('info'),
  ),
  'client-notification': t.clientNotification(client, ctx('info')),
  'careers-confirmation-en': t.careersConfirmation(applicant, ctx('careers')),
  'careers-confirmation-ar': t.careersConfirmation(
    { ...applicant, name: 'عمر خان', message: 'خبرة ست سنوات في بناء تطبيقات React وNode.js.', lang: 'ar' },
    ctx('careers'),
  ),
  'careers-notification': t.careersNotification(applicant, ctx('careers')),
}

for (const [name, email] of Object.entries(emails)) {
  writeFileSync(join(out, `${name}.html`), email.html)
  writeFileSync(join(out, `${name}.txt`), `Subject: ${email.subject}\n\n${email.text}\n`)
}
console.log(`[email:preview] wrote ${Object.keys(emails).length} emails to email-previews/`)
