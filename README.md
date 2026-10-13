# Kavelis — Digital Platform

Corporate website for **Kavelis**, a technology partner building SaaS products, custom web applications, business automation, digital commerce, and API integrations for growing businesses.

Built with **React 18**, **TypeScript (strict)**, **Vite**, **Tailwind CSS**, **React Router**, and **Lucide React**.

## Pages

| Route | Purpose |
|-------|---------|
| `/` | Home — hero, services, products, capabilities, process, FAQs, CTA |
| `/services` | Full service catalog with outcomes, deliverables, use cases, engagement options |
| `/products` | Product portfolio (editable placeholders until verified products are published) |
| `/work` | Case-study layout (structural templates until verified projects are added) |
| `/solutions` | Industry / business-type engagement patterns |
| `/about` | Mission, principles, delivery process, engineering quality |
| `/contact` | Project inquiry form with validation and honest submission states |
| `/privacy` | Privacy policy template (requires legal review before publication) |
| `/terms` | Terms of service template (requires legal review before publication) |
| `*` | 404 page |

## Getting started

### Prerequisites

- Node.js 18+ (20 LTS recommended)
- npm 9+

### Installation

```bash
git clone <repository-url>
cd kavelis-digital-platform
npm install
```

### Development

```bash
npm run dev
```

Vite serves the app at `http://localhost:5173` with hot module replacement.

### Type checking

```bash
npm run typecheck
```

Runs the TypeScript project build (`tsc -b`) in strict mode with `noUnusedLocals`, `noUnusedParameters`, and `noUncheckedIndexedAccess`.

### Production build

```bash
npm run build
```

Outputs the static site to `dist/`. Preview it locally with:

```bash
npm run preview
```

## Environment variables

Copy `.env.example` to `.env` and fill in values as they become available:

| Variable | Purpose |
|----------|---------|
| `VITE_SITE_URL` | Production origin for canonical URLs and Open Graph tags. Leave empty until the domain is confirmed. |
| `VITE_CONTACT_EMAIL` | Public business email. Rendered on the contact page and footer only when set. |
| `VITE_CONTACT_ENDPOINT` | HTTP endpoint accepting `POST` JSON project inquiries. When unset, the contact form shows an honest “not connected” state. |

### Contact form integration

The frontend does **not** pretend to submit successfully. Behavior:

1. **Endpoint configured** — the form POSTs JSON to `VITE_CONTACT_ENDPOINT` and reports success only on a successful response.
2. **Endpoint missing** — the form displays a clear “form delivery is not connected yet” message.

To enable delivery, deploy any endpoint that accepts:

```json
{
  "name": "string",
  "email": "string",
  "company": "string",
  "service": "string",
  "budget": "string",
  "timeline": "string",
  "message": "string",
  "submittedAt": "ISO-8601 timestamp"
}
```

Options include a transactional-email service (e.g. Resend, Postmark, AWS SES) behind a serverless function, or a form provider (e.g. Formspree) — wire the chosen provider to `VITE_CONTACT_ENDPOINT`. The previous repository contained an unused Express/Nodemailer prototype with unrelated default credentials; it has been removed intentionally.

## Project structure

```
src/
  app/                 # App shell, entry point, routing (lazy-loaded pages)
  components/
    layout/            # Layout primitives (reserved)
    navigation/        # Navbar, Footer
    sections/home/     # Home page sections
    ui/                # Button, Badge, Reveal, Accordion, form fields, etc.
  pages/               # Route-level pages
  data/                # Centralized, typed content (services, products, FAQs…)
  types/               # Shared TypeScript interfaces
  hooks/               # useSeo, useReveal, useScrollManager
  lib/                 # Utilities and site configuration
  styles/              # Global styles and design tokens (Tailwind entry)
public/                # Static assets (favicon)
```

## Content editing

All business content is centralized and typed:

- **Services** — `src/data/services.ts`
- **Products** — `src/data/products.ts` (entries marked `isPlaceholder: true` must be replaced with verified products before publishing)
- **Case studies** — `src/data/caseStudies.ts` (templates only; add outcomes only with evidence)
- **Industries** — `src/data/industries.ts`
- **Process, FAQs, differentiators** — `src/data/content.ts`
- **Navigation** — `src/data/navigation.ts`

## Design system

Brand tokens live in `tailwind.config.js`, derived from the Kavelis identity:

| Token | Value | Role |
|-------|-------|------|
| `navy-950` | `#101629` | Primary text, dark sections, footer |
| `teal-800` | `#075B66` | Dark teal — logo mark, brand anchor |
| `teal-600` | `#0E8482` | Primary buttons (WCAG AA with white text) |
| `teal-500` | `#159A98` | Brand teal — accents, data viz |
| `mint-400` | `#62D6B0` | Highlight accents on dark surfaces |
| `canvas` | `#FAF9F6` | Soft off-white page background |
| `charcoal-500` | `#687385` | Muted secondary text |
| `teal-50` | `#E8F6F2` | Light teal section and hover backgrounds |

Additional principles:

- Inter typography, generous spacing, card-based layouts on an off-white canvas
- White content surfaces; light teal accents; dark navy reserved for feature bands and footer
- No neon gradients, glassmorphism, or particle effects
- Reduced-motion support and visible focus states

## Deployment

### Netlify

`netlify.toml` is configured:

- Build command: `npm run build`
- Publish directory: `dist`
- SPA redirect: `/* → /index.html`
- Security headers and immutable asset caching

### Vercel / static hosts

Import the repository, framework preset **Vite**, and set the SPA fallback to serve `index.html` for unknown paths.

## Pre-launch checklist

- [ ] Set `VITE_SITE_URL` to the confirmed production domain
- [ ] Set `VITE_CONTACT_EMAIL` to the confirmed business email (or leave empty to hide)
- [ ] Connect `VITE_CONTACT_ENDPOINT` to a real form backend and test end-to-end
- [ ] Replace product placeholders in `src/data/products.ts` with verified products
- [ ] Replace case-study templates in `src/data/caseStudies.ts` with approved write-ups
- [ ] Have legal counsel review `/privacy` and `/terms` before publishing
- [ ] Add verified structured data (Organization JSON-LD) once the legal entity details are confirmed

## License

Private project. All rights reserved.
