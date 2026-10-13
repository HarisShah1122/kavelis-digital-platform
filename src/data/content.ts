import type { Differentiator, FaqItem, ProcessStep } from '@/types'

export const processSteps: ProcessStep[] = [
  {
    id: 'discover',
    number: '01',
    title: 'Discover',
    description:
      'We start with your goals, users, constraints, and existing systems. Together we define scope, success criteria, and a realistic delivery plan.',
  },
  {
    id: 'design',
    number: '02',
    title: 'Design',
    description:
      'Information architecture, user flows, and interface design come before heavy implementation — so the product is validated visually and logically early.',
  },
  {
    id: 'build',
    number: '03',
    title: 'Build',
    description:
      'Iterative development in short cycles with working software, regular demos, and transparent progress. You see the product take shape continuously.',
  },
  {
    id: 'launch',
    number: '04',
    title: 'Launch',
    description:
      'Testing, performance checks, deployment pipelines, and monitoring go in before release. Launch is planned, not improvised.',
  },
  {
    id: 'iterate',
    number: '05',
    title: 'Iterate & support',
    description:
      'After release we track real usage, fix issues, and prioritize improvements — either through a support retainer or planned evolution sprints.',
  },
]

export const differentiators: Differentiator[] = [
  {
    id: 'product-minded-engineering',
    title: 'Product-minded engineering',
    description:
      'We question scope, challenge assumptions, and design for the business outcome — not just the ticket list. You get a partner invested in whether the software works in the real world.',
  },
  {
    id: 'modern-maintainable-stacks',
    title: 'Modern, maintainable stacks',
    description:
      'TypeScript across the stack, well-tested services, and clear project structure. The codebase is designed to be handed over, extended, and supported without archaeology.',
  },
  {
    id: 'transparent-delivery',
    title: 'Transparent delivery',
    description:
      'Clear milestones, visible progress, and direct communication. No black-box development, no surprise invoices at the end of an open-ended engagement.',
  },
  {
    id: 'long-term-partnership',
    title: 'Built for the long term',
    description:
      'Documentation, monitoring, and maintainability are part of the definition of done — because most of a product\'s life happens after launch.',
  },
]

export const homeFaqs: FaqItem[] = [
  {
    id: 'what-kavelis-does',
    question: 'What does Kavelis build?',
    answer:
      'Kavelis designs, builds, and maintains SaaS products, custom web applications, e-commerce platforms, business automation workflows, and API integrations. We also add practical AI features where they create real leverage in a workflow.',
  },
  {
    id: 'engagement-models',
    question: 'How do engagements typically work?',
    answer:
      'Most work starts with a short discovery phase to define scope and priorities. From there we offer fixed-scope project builds, monthly dedicated team arrangements, and ongoing maintenance retainers — depending on whether you are launching something new or evolving an existing product.',
  },
  {
    id: 'project-timeline',
    question: 'How long does a typical project take?',
    answer:
      'Timelines depend on scope. A focused automation or integration project may take a few weeks; an MVP or custom platform usually takes several months in staged releases. After discovery we give you a realistic plan with milestones rather than a single optimistic date.',
  },
  {
    id: 'working-remotely',
    question: 'Do you work with international clients?',
    answer:
      'Yes. Kavelis works with clients remotely across time zones, using structured async communication, regular demos, and clear written documentation to keep projects moving.',
  },
  {
    id: 'existing-codebase',
    question: 'Can you work with an existing codebase?',
    answer:
      'Yes. We take over, stabilize, and modernize existing products — including codebases built by other teams. We start with an audit so you understand risks and priorities before any large changes.',
  },
  {
    id: 'post-launch-support',
    question: 'What happens after launch?',
    answer:
      'We offer maintenance and support retainers covering monitoring, bug fixes, dependency and security updates, and iterative improvements. Many clients continue with us well beyond the initial release.',
  },
]
