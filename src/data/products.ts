import type { Product } from '@/types'

/**
 * Product portfolio.
 *
 * The entries below are clearly marked editable placeholders. Replace them with
 * verified Kavelis products (real names, features, screenshots, and status)
 * before publishing. Do not present placeholders as launched products.
 */
export const products: Product[] = [
  {
    id: 'client-portal-suite',
    name: 'Client Portal Suite',
    tagline: 'Membership, billing, and self-service in one customer-facing portal.',
    description:
      'A configurable portal where customers manage accounts, subscriptions, invoices, documents, and support requests — designed for service businesses that want self-service without building from scratch.',
    problem:
      'Service businesses often juggle scattered tools for billing, document sharing, and customer communication, creating avoidable support load.',
    features: [
      'Customer account and profile management',
      'Subscription and invoice visibility',
      'Secure document exchange',
      'Support request tracking',
      'Admin console for team operations',
    ],
    targetUsers: ['Subscription businesses', 'Professional services firms', 'Membership organizations'],
    status: 'placeholder',
    ctaLabel: 'Discuss this product',
    ctaTo: '/contact',
    isPlaceholder: true,
  },
  {
    id: 'flowdesk-automation',
    name: 'Flowdesk Automation',
    tagline: 'A workspace for designing, running, and monitoring business workflows.',
    description:
      'An operations workspace for building automated workflows across your existing tools — with approvals, exception handling, and a clear audit trail for every run.',
    problem:
      'Operations teams rely on fragile spreadsheets, email chains, and tribal knowledge to move work between systems.',
    features: [
      'Visual workflow builder',
      'Approvals and escalation paths',
      'Run history and error visibility',
      'Notifications and scheduled triggers',
      'Integration-ready architecture',
    ],
    targetUsers: ['Operations teams', 'Growing SMEs', 'Multi-team service organizations'],
    status: 'placeholder',
    ctaLabel: 'Discuss this product',
    ctaTo: '/contact',
    isPlaceholder: true,
  },
]

export const hasVerifiedProducts = products.some((product) => !product.isPlaceholder)
