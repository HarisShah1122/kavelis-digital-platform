import type { CaseStudy } from '@/types'

/**
 * Case study portfolio.
 *
 * Entries with `isPlaceholder: true` are structural templates for verified
 * projects. Replace them with real client work (with permission) before
 * publishing. Outcomes must only be included when supported by project evidence.
 */
export const caseStudies: CaseStudy[] = [
  {
    id: 'subscription-platform-template',
    title: 'Subscription platform for a service business',
    category: 'SaaS product',
    summary:
      'A multi-tenant subscription application replacing manual invoicing with customer self-service.',
    clientLabel: 'Placeholder — replace with verified project',
    overview:
      'A structured template case study showing how a service business can move from manual, spreadsheet-driven billing to a proper subscription product with customer accounts and an operations dashboard.',
    challenge:
      'A service business needed to move from manual invoicing and email-based onboarding to a structured subscription experience for its customers.',
    solution:
      'A multi-tenant web application with customer accounts, plan management, invoicing hooks, and an internal operations dashboard.',
    features: [
      'Customer account and profile management',
      'Plan and subscription lifecycle views',
      'Invoicing and payment status surfaces',
      'Role-based operations dashboard',
      'Onboarding and notification flows',
    ],
    approach: [
      'Discovery workshops to map billing and onboarding processes',
      'Domain model and multi-tenant architecture design',
      'Iterative delivery with working demos each cycle',
      'Handover documentation and team training',
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    outcomes: [],
    isPlaceholder: true,
  },
  {
    id: 'operations-automation-template',
    title: 'Operations automation for a multi-team workflow',
    category: 'Business automation',
    summary:
      'Event-driven integrations and a workflow console replacing manual data entry between systems.',
    clientLabel: 'Placeholder — replace with verified project',
    overview:
      'A template showing how an operations-heavy business can connect its CRM, tracking spreadsheets, and finance tools with monitored, event-driven workflows.',
    challenge:
      'Repetitive data entry and handoffs between a CRM, spreadsheet tracking, and finance tools created delays and error-prone reconciliation.',
    solution:
      'An event-driven integration layer with an internal workflow console, approvals, and monitoring for failed runs.',
    features: [
      'Visual workflow definitions with approval steps',
      'Run history, retries, and failure alerting',
      'CRM and finance tool connectors',
      'Exception queue for human review',
      'Audit trail for compliance',
    ],
    approach: [
      'Process audit with the people who run the workflow daily',
      'Integration architecture and data mapping',
      'Phased rollout with parallel running',
      'Monitoring dashboards and runbooks',
    ],
    technologies: ['TypeScript', 'REST APIs', 'Message queues', 'Cloud functions'],
    outcomes: [],
    isPlaceholder: true,
  },
  {
    id: 'commerce-replatform-template',
    title: 'E-commerce replatform for a growing brand',
    category: 'E-commerce',
    summary:
      'A faster storefront and calmer operations behind a modern commerce stack.',
    clientLabel: 'Placeholder — replace with verified project',
    overview:
      'A template for documenting a storefront replatform — from catalog and checkout redesign to the operational tooling behind it.',
    challenge:
      'A slow, hard-to-manage storefront limited conversion and forced the team into manual order and catalog work.',
    solution:
      'A rebuilt storefront with structured product management, payment and shipping integrations, and an operations dashboard for orders.',
    features: [
      'Fast, accessible product catalog and search',
      'Streamlined checkout with payment integration',
      'Promotions and merchandising tools',
      'Order and inventory operations views',
      'Analytics and conversion tracking',
    ],
    approach: [
      'Performance and conversion audit of the existing store',
      'Information architecture and checkout flow design',
      'Incremental migration to protect SEO and operations',
      'Post-launch conversion improvement sprints',
    ],
    technologies: ['React', 'TypeScript', 'Headless commerce', 'Payments API'],
    outcomes: [],
    isPlaceholder: true,
  },
]

export const getCaseStudyById = (id: string): CaseStudy | undefined =>
  caseStudies.find((study) => study.id === id)
