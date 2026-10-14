import type { PricingTier } from '@/types'

/**
 * Engagement and pricing options.
 *
 * Commercial terms (prices, contracts, guarantees) are NOT confirmed.
 * Every entry uses inquiry-based pricing and is flagged as a placeholder
 * until real package details are approved. Edit this file to publish them.
 */
export const pricingTiers: PricingTier[] = [
  {
    id: 'starter-projects',
    name: 'Starter Projects',
    mode: 'fixed-scope',
    audience: 'Startups and SMEs with a defined, focused problem to solve',
    description:
      'A fixed-scope engagement for a well-bounded deliverable — a landing platform, an internal tool, an integration, or an MVP first release.',
    scope: [
      'Discovery and scope definition',
      'Design and development of the agreed scope',
      'Testing, deployment, and handover',
      'Documentation for the delivered work',
    ],
    timeline: 'Confirmed after discovery',
    price: 'Inquiry-based',
    isPlaceholder: true,
  },
  {
    id: 'growth-solutions',
    name: 'Growth Solutions',
    mode: 'ongoing',
    audience: 'Growing businesses building or evolving a core product',
    description:
      'A continuing product engagement — design, build, and iterate on SaaS products, platforms, or commerce systems in regular cycles.',
    scope: [
      'Dedicated design and engineering capacity',
      'Roadmap planning and regular releases',
      'Integrations, automation, and analytics',
      'Priority support and iteration',
    ],
    timeline: 'Ongoing, reviewed each cycle',
    price: 'Inquiry-based',
    isPlaceholder: true,
    featured: true,
  },
  {
    id: 'enterprise-engagements',
    name: 'Custom Enterprise Engagements',
    mode: 'fixed-scope',
    audience: 'Established companies with complex, multi-system requirements',
    description:
      'A tailored engagement for platform modernization, large-scale builds, or multi-team delivery with formal planning and governance.',
    scope: [
      'Architecture and solution planning',
      'Phased delivery with milestone reviews',
      'System integrations and modernization',
      'Training, documentation, and support options',
    ],
    timeline: 'Defined per engagement',
    price: 'Inquiry-based',
    isPlaceholder: true,
  },
]

export const engagementModels = [
  {
    id: 'fixed-scope',
    title: 'Fixed-scope development',
    description:
      'A defined scope, milestone plan, and deliverable. Best when the problem and requirements are clear.',
  },
  {
    id: 'dedicated-team',
    title: 'Ongoing product team',
    description:
      'Monthly design and engineering capacity that works as an extension of your team, shipping in regular cycles.',
  },
  {
    id: 'maintenance-retainer',
    title: 'Maintenance subscription',
    description:
      'Recurring support covering monitoring, fixes, security updates, and continuous product improvements.',
  },
] as const
