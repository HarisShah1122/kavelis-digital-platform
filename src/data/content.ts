import type { Differentiator, FaqItem, ProcessStep, TrustItem } from '@/types'

export const processSteps: ProcessStep[] = [
  {
    id: 'discovery',
    number: '01',
    title: 'Discovery & requirements',
    description:
      'We start with your goals, users, constraints, and existing systems — defining scope, success criteria, and what is genuinely worth building.',
  },
  {
    id: 'planning',
    number: '02',
    title: 'Planning & architecture',
    description:
      'We shape the solution: system architecture, data models, integration points, and a milestone plan you can track against.',
  },
  {
    id: 'design',
    number: '03',
    title: 'UI/UX design',
    description:
      'Information architecture, user flows, and interface design come before heavy implementation — so the product is validated visually and logically early.',
  },
  {
    id: 'development',
    number: '04',
    title: 'Development & integrations',
    description:
      'Iterative build in short cycles with working software, regular demos, and third-party integrations wired in as they are agreed.',
  },
  {
    id: 'testing',
    number: '05',
    title: 'Testing & quality assurance',
    description:
      'Functional testing, accessibility checks, performance passes, and edge-case review — issues are found before your users find them.',
  },
  {
    id: 'deployment',
    number: '06',
    title: 'Deployment & launch',
    description:
      'Deployment pipelines, monitoring, and a launch plan go in before release. Go-live is prepared, not improvised.',
  },
  {
    id: 'maintenance',
    number: '07',
    title: 'Maintenance & improvement',
    description:
      'After release we track real usage, fix issues, apply security updates, and prioritize improvements through a retainer or planned cycles.',
  },
]

export const differentiators: Differentiator[] = [
  {
    id: 'product-minded-engineering',
    title: 'Business-focused product development',
    description:
      'We question scope, challenge assumptions, and design for the business outcome — not just the ticket list. You get a partner invested in whether the software works in the real world.',
  },
  {
    id: 'modern-maintainable-stacks',
    title: 'Maintainable software architecture',
    description:
      'TypeScript across the stack, well-tested services, and clear project structure. The codebase is designed to be handed over, extended, and supported without archaeology.',
  },
  {
    id: 'transparent-delivery',
    title: 'Reliable communication',
    description:
      'Clear milestones, visible progress, and direct communication. No black-box development, no surprise invoices at the end of an open-ended engagement.',
  },
  {
    id: 'long-term-partnership',
    title: 'Long-term product improvement',
    description:
      'Documentation, monitoring, and maintainability are part of the definition of done — because most of a product’s life happens after launch.',
  },
  {
    id: 'thoughtful-ux',
    title: 'Thoughtful user experience',
    description:
      'Interfaces are designed for the people who use them daily — clear hierarchy, accessible interaction, and fewer clicks on the paths that matter.',
  },
  {
    id: 'practical-integrations',
    title: 'Practical integrations',
    description:
      'We connect the tools you already pay for — CRMs, ERPs, payment providers, and analytics — with proper error handling and monitoring instead of fragile glue.',
  },
  {
    id: 'scalable-solutions',
    title: 'Scalable solutions',
    description:
      'Architecture choices are matched to real growth expectations, so early decisions do not become expensive rewrites at the worst possible moment.',
  },
]

/**
 * Trust section — no fabricated testimonials. These are working principles
 * the collaboration is actually built on.
 */
export const trustItems: TrustItem[] = [
  {
    id: 'code-ownership',
    title: 'You own the code',
    description:
      'Source code, documentation, and infrastructure credentials belong to you. Handover is planned from day one, not negotiated at the end.',
  },
  {
    id: 'written-communication',
    title: 'Everything important is written down',
    description:
      'Decisions, scope changes, and progress are documented in shared channels — so nothing critical lives only in someone’s inbox.',
  },
  {
    id: 'demo-driven-progress',
    title: 'Working software every cycle',
    description:
      'You review demonstrable progress at regular intervals. If a timeline needs to change, you hear it early with options — not at the deadline.',
  },
  {
    id: 'no-lock-in',
    title: 'No vendor lock-in',
    description:
      'We build on mainstream, well-supported technology and keep systems understandable to other competent engineers.',
  },
]

export const homeFaqs: FaqItem[] = [
  {
    id: 'what-kavelis-does',
    question: 'What services does Kavelis offer?',
    answer:
      'SaaS product development, custom software and web applications, business automation, AI-assisted solutions, e-commerce, API development and third-party integrations, and ongoing maintenance and technical support.',
  },
  {
    id: 'starting-a-project',
    question: 'How do I start a project?',
    answer:
      'Send a project inquiry through the contact page with as much context as you have. We respond with clarifying questions, and if there is a fit, a short discovery phase defines scope before any commitment to build.',
  },
  {
    id: 'requirements-planning',
    question: 'What if my requirements are not fully defined yet?',
    answer:
      'That is normal. Discovery exists for exactly this — we help turn business goals into a concrete scope, identify the must-haves, and stage the rest so you can start delivering value sooner.',
  },
  {
    id: 'project-timeline',
    question: 'How long does a typical project take?',
    answer:
      'Timelines depend on scope. A focused automation or integration project may take a few weeks; an MVP or custom platform usually takes several months in staged releases. After discovery you get a realistic plan with milestones rather than a single optimistic date.',
  },
  {
    id: 'pricing-models',
    question: 'How does pricing work?',
    answer:
      'Engagements are priced as fixed-scope projects, ongoing product-team arrangements, or maintenance retainers. Commercial details are confirmed after discovery, once scope is understood — we do not publish generic price lists that would not reflect your actual needs.',
  },
  {
    id: 'code-ownership',
    question: 'Who owns the source code and intellectual property?',
    answer:
      'You do. On delivery, the source code, documentation, and related assets are yours, with handover planned as part of the engagement rather than an afterthought.',
  },
  {
    id: 'third-party-integrations',
    question: 'Can you integrate with our existing tools and third parties?',
    answer:
      'Yes. Payment providers, CRMs, ERPs, accounting systems, communication tools, and custom APIs are common parts of our work. We design integrations with error handling, retries, and monitoring so failures surface early.',
  },
  {
    id: 'saas-development',
    question: 'Do you build SaaS products from scratch?',
    answer:
      'Yes — from architecture and billing foundations to dashboards, onboarding, and admin tooling. We can also join an existing SaaS product mid-flight to extend or stabilize it.',
  },
  {
    id: 'ecommerce-solutions',
    question: 'Can you build or replatform our online store?',
    answer:
      'Yes. We build and improve storefronts, catalogs, checkout flows, promotions, and the operational tooling behind them — balancing customer experience with inventory, payments, and fulfilment realities.',
  },
  {
    id: 'post-launch-support',
    question: 'What happens after launch?',
    answer:
      'Maintenance and support retainers cover monitoring, bug fixes, dependency and security updates, and iterative improvements — so the product keeps working and evolving after release.',
  },
]
