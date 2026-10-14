import type { ProductCategory } from '@/types'

/**
 * Product capability categories shown on the homepage and products page.
 * These describe what Kavelis can build — not launched products.
 * Replace the placeholder flag only when paired with real product assets.
 */
export const productCategories: ProductCategory[] = [
  {
    id: 'saas-applications',
    title: 'SaaS applications',
    description:
      'Multi-tenant subscription products with accounts, billing, dashboards, and admin tooling — ready to sell and support.',
    capabilities: ['Subscriptions & billing', 'Role-based access', 'Usage analytics'],
    visual: 'dashboard',
    isPlaceholder: true,
  },
  {
    id: 'business-management',
    title: 'Business management platforms',
    description:
      'Internal platforms that run operations — resource planning, case management, scheduling, and reporting in one place.',
    capabilities: ['Operations dashboards', 'Workflows & approvals', 'Reporting'],
    visual: 'analytics',
    isPlaceholder: true,
  },
  {
    id: 'subscription-products',
    title: 'Subscription products',
    description:
      'Membership, portal, and recurring-billing experiences where customers self-serve and teams retain full control.',
    capabilities: ['Customer portals', 'Recurring billing', 'Renewal & dunning flows'],
    visual: 'portal',
    isPlaceholder: true,
  },
  {
    id: 'ecommerce-platforms',
    title: 'E-commerce platforms',
    description:
      'Storefronts and commerce back-offices with catalog management, checkout, promotions, and order operations.',
    capabilities: ['Storefront & checkout', 'Catalog & promotions', 'Order operations'],
    visual: 'commerce',
    isPlaceholder: true,
  },
  {
    id: 'automation-dashboards',
    title: 'Automation dashboards',
    description:
      'Workflow consoles that automate repetitive work — triggers, approvals, monitoring, and exception handling.',
    capabilities: ['Visual workflows', 'Run monitoring', 'Integrations'],
    visual: 'automation',
    isPlaceholder: true,
  },
  {
    id: 'enterprise-applications',
    title: 'Custom enterprise applications',
    description:
      'Tailored web applications around specific business processes, built to integrate with the systems already in use.',
    capabilities: ['Custom domains & rules', 'System integration', 'Audit & permissions'],
    visual: 'mobile',
    isPlaceholder: true,
  },
]
