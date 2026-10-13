import {
  Blocks,
  Bot,
  Headphones,
  ShoppingCart,
  Code2,
  Workflow,
  Layers,
} from 'lucide-react'
import type { Service } from '@/types'

export const services: Service[] = [
  {
    id: 'saas-product-development',
    title: 'SaaS Product Development',
    shortDescription: 'Design, build, and launch subscription software from concept to release.',
    description:
      'We help founders and product teams turn SaaS concepts into production-ready applications. From multi-tenant architecture and billing foundations to dashboards, onboarding flows, and admin tooling, we build products that are ready to sell, support, and scale.',
    icon: Layers,
    outcomes: [
      'A shippable SaaS product with clear release milestones',
      'Subscription-ready account, billing, and access structures',
      'Admin and customer-facing interfaces designed for daily use',
    ],
    deliverables: [
      'Product discovery and scope definition',
      'UX flows and interface design',
      'Full-stack application development',
      'Authentication, roles, and billing integrations',
      'Testing, deployment, and handover documentation',
    ],
    useCases: [
      'Launching a first commercial SaaS product',
      'Replacing spreadsheets and manual workflows with software',
      'Adding a subscription tier to an existing business',
    ],
    engagementOptions: [
      'Fixed-scope MVP build',
      'Dedicated product team (monthly)',
      'Architecture review and build support',
    ],
  },
  {
    id: 'business-automation',
    title: 'Business Automation',
    shortDescription: 'Remove repetitive work with reliable, observable workflows.',
    description:
      'We map the manual processes that slow your team down and automate them with well-designed workflows, internal tools, and integrations. The result is fewer errors, faster cycle times, and staff freed to focus on higher-value work.',
    icon: Workflow,
    outcomes: [
      'Fewer manual handoffs and copy-paste steps between systems',
      'Faster processing times for routine operations',
      'Clearer visibility into workflow status and exceptions',
    ],
    deliverables: [
      'Process audit and automation opportunity map',
      'Workflow design and approval logic',
      'Internal tools and operations dashboards',
      'Scheduled jobs, alerts, and reporting',
      'Team training and runbooks',
    ],
    useCases: [
      'Automating onboarding, invoicing, or reporting chains',
      'Connecting a CRM, ERP, and finance stack without custom glue code everywhere',
      'Standardizing operations across multiple locations or teams',
    ],
    engagementOptions: [
      'Automation discovery sprint',
      'Build and integrate engagement',
      'Ongoing optimization retainer',
    ],
  },
  {
    id: 'ecommerce-development',
    title: 'E-commerce Development',
    shortDescription: 'Digital commerce experiences built for conversion and operations.',
    description:
      'We build and improve online stores and commerce platforms — storefronts, product catalogs, checkout flows, promotions, and the operational tooling behind them. Every build balances customer experience with the realities of inventory, payments, and fulfilment.',
    icon: ShoppingCart,
    outcomes: [
      'A fast, accessible storefront that supports your catalog and brand',
      'Checkout flows integrated with your payment and shipping providers',
      'Operational tooling that keeps orders and inventory manageable',
    ],
    deliverables: [
      'Storefront design and development',
      'Product catalog and merchandising setup',
      'Payment, tax, and shipping integrations',
      'Promotions, discounts, and loyalty mechanics',
      'Analytics and conversion tracking setup',
    ],
    useCases: [
      'Launching a new direct-to-consumer store',
      'Replatforming a slow or hard-to-manage shop',
      'Adding B2B pricing, accounts, or portal features',
    ],
    engagementOptions: [
      'New store build',
      'Replatform and migration',
      'Conversion-focused improvement sprints',
    ],
  },
  {
    id: 'custom-web-applications',
    title: 'Custom Web Applications',
    shortDescription: 'Purpose-built platforms for operations, customers, and internal teams.',
    description:
      'When off-the-shelf tools do not fit, we build custom web applications tailored to your processes — customer portals, operations platforms, booking systems, dashboards, and more. Designed around how your business actually works.',
    icon: Code2,
    outcomes: [
      'Software shaped to your processes instead of forcing process around software',
      'Role-based experiences for staff, customers, or partners',
      'A maintainable codebase your team (or ours) can extend',
    ],
    deliverables: [
      'Requirements and domain modelling',
      'UX/UI design and interactive prototypes',
      'Frontend and backend development',
      'Role-based access and audit trails',
      'Deployment pipeline and documentation',
    ],
    useCases: [
      'Customer or partner self-service portals',
      'Internal operations and resource-planning tools',
      'Industry-specific scheduling, booking, or case-management apps',
    ],
    engagementOptions: [
      'Discovery-to-delivery project',
      'Embedded engineering team',
      'Legacy rebuild in modern stack',
    ],
  },
  {
    id: 'api-system-integrations',
    title: 'API & System Integrations',
    shortDescription: 'Connect the tools your business depends on.',
    description:
      'We design and build APIs and integrations that keep your systems in sync — payments, CRMs, ERPs, accounting, communications, and third-party services. Clean contracts, proper error handling, and monitoring included.',
    icon: Blocks,
    outcomes: [
      'Data flows reliably between systems without manual reconciliation',
      'Faster onboarding of new tools and partners through clear API contracts',
      'Fewer production incidents thanks to monitoring and retry strategies',
    ],
    deliverables: [
      'Integration architecture and data mapping',
      'REST/GraphQL API design and implementation',
      'Webhook and event-driven pipelines',
      'Third-party service integrations',
      'Documentation and monitoring dashboards',
    ],
    useCases: [
      'Syncing orders, customers, and inventory across platforms',
      'Building public or partner-facing APIs',
      'Modernizing legacy systems behind a stable API layer',
    ],
    engagementOptions: [
      'Focused integration project',
      'API platform build',
      'Ongoing integration support',
    ],
  },
  {
    id: 'ai-enabled-solutions',
    title: 'AI-Enabled Business Solutions',
    shortDescription: 'Practical AI features embedded in real workflows.',
    description:
      'We apply AI where it creates measurable leverage — document processing, content assistance, intelligent search, summarization, and workflow triage. Every feature is scoped for reliability, reviewability, and cost control, not novelty.',
    icon: Bot,
    outcomes: [
      'Reduced time spent on repetitive reading, routing, and data entry',
      'Faster access to knowledge across documents and systems',
      'Human-in-the-loop controls so AI output stays accountable',
    ],
    deliverables: [
      'Opportunity assessment and feasibility review',
      'Prompt, retrieval, and model integration design',
      'AI-assisted features inside your product or internal tools',
      'Evaluation, guardrails, and usage monitoring',
      'Iteration based on real usage feedback',
    ],
    useCases: [
      'AI-assisted support triage and response drafting',
      'Document extraction and data entry automation',
      'Internal knowledge search over company content',
    ],
    engagementOptions: [
      'AI discovery workshop',
      'Pilot feature build',
      'Production rollout and monitoring',
    ],
  },
  {
    id: 'maintenance-support',
    title: 'Product Maintenance & Technical Support',
    shortDescription: 'Keep products stable, secure, and improving after launch.',
    description:
      'Launch is a milestone, not the finish line. We provide ongoing maintenance, monitoring, bug fixes, dependency updates, and iterative improvements so your product stays reliable as your business and user base grow.',
    icon: Headphones,
    outcomes: [
      'Predictable handling of bugs, incidents, and security updates',
      'Continuous small improvements instead of costly rewrites',
      'A clear support channel with defined response expectations',
    ],
    deliverables: [
      'Monitoring and alerting setup',
      'Bug triage and fix cycles',
      'Dependency and security updates',
      'Performance and reliability improvements',
      'Monthly reporting and roadmap input',
    ],
    useCases: [
      'Post-launch care for a product built by Kavelis',
      'Stabilizing a codebase inherited from another team',
      'Adding a reliable maintenance layer without hiring in-house yet',
    ],
    engagementOptions: [
      'Monthly support retainer',
      'Business-hours support plan',
      'Project-based modernization sprints',
    ],
  },
]

export const getServiceById = (id: string): Service | undefined =>
  services.find((service) => service.id === id)
