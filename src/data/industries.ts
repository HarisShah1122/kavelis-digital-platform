import type { Industry } from '@/types'

/**
 * Industries Kavelis is positioned to serve.
 * These describe typical fit and engagement patterns — not claimed client history.
 */
export const industries: Industry[] = [
  {
    id: 'startups-saas',
    title: 'Startups & SaaS companies',
    description:
      'Founders and product teams who need a reliable engineering partner to ship an MVP, harden an early product, or extend a roadmap without building a large in-house team first.',
    needs: [
      'Fast, staged delivery toward a launchable product',
      'Architecture that can grow past the first customers',
      'Clear trade-off guidance on scope, cost, and timeline',
    ],
    approaches: [
      'Discovery sprint followed by milestone-based builds',
      'Subscription, auth, and billing foundations built in from day one',
      'Handover documentation so an internal team can take over when ready',
    ],
  },
  {
    id: 'ecommerce-businesses',
    title: 'E-commerce businesses',
    description:
      'Online retailers and brands that need storefronts, commerce platforms, and back-office integrations that perform under real operational load.',
    needs: [
      'Fast, accessible shopping experiences that convert',
      'Reliable connections between store, payments, inventory, and fulfilment',
      'Ongoing iteration after launch — promotions, landing pages, and CRO',
    ],
    approaches: [
      'Commerce builds on modern stacks or headless architectures',
      'Operational dashboards for orders, catalog, and returns',
      'Post-launch improvement sprints focused on measurable friction',
    ],
  },
  {
    id: 'smes-growing-enterprises',
    title: 'SMEs & growing enterprises',
    description:
      'Established businesses investing in digital tools to professionalize operations, serve customers online, and reduce reliance on manual processes.',
    needs: [
      'Custom software shaped around existing operations',
      'Integrations with the systems already in place',
      'A partner who explains technical decisions in business terms',
    ],
    approaches: [
      'Process mapping before any code is written',
      'Phased rollouts that minimize disruption to daily operations',
      'Training and documentation for internal teams',
    ],
  },
  {
    id: 'operations-heavy-businesses',
    title: 'Operations-heavy businesses',
    description:
      'Organizations where scheduling, dispatch, field work, compliance, or high-volume back-office processes can benefit from automation and internal tooling.',
    needs: [
      'Fewer manual handoffs and data re-entry steps',
      'Real-time visibility into work in progress',
      'Auditability and controls for regulated or multi-step processes',
    ],
    approaches: [
      'Internal tools and workflow engines tailored to the process',
      'Exception handling designed with the people who run the process',
      'Monitoring and alerting so failures surface before customers do',
    ],
  },
]
