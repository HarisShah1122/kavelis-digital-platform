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
    clientLabel: 'Placeholder — replace with verified project',
    challenge:
      'A service business needed to move from manual invoicing and email-based onboarding to a structured subscription experience for its customers.',
    solution:
      'A multi-tenant web application with customer accounts, plan management, invoicing hooks, and an internal operations dashboard.',
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    outcomes: [],
    isPlaceholder: true,
  },
  {
    id: 'operations-automation-template',
    title: 'Operations automation for a multi-team workflow',
    clientLabel: 'Placeholder — replace with verified project',
    challenge:
      'Repetitive data entry and handoffs between a CRM, spreadsheet tracking, and finance tools created delays and error-prone reconciliation.',
    solution:
      'An event-driven integration layer with an internal workflow console, approvals, and monitoring for failed runs.',
    technologies: ['TypeScript', 'REST APIs', 'Message queues', 'Cloud functions'],
    outcomes: [],
    isPlaceholder: true,
  },
]
