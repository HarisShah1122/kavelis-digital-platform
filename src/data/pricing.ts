import type { FaqItem, SubscriptionPlan } from '@/types'

/**
 * Monthly development subscription plans.
 * Names, prices, and inclusions are fixed commercial offers — keep in sync
 * with the Pricing page copy exactly.
 */
export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: '$950',
    priceValue: 950,
    period: 'month',
    audience: 'For Small Businesses',
    features: [
      'One active request at a time.',
      'Website setup using any CMS, up to 5 pages.',
      'Low-code theme customization.',
      'Basic integrations.',
      'Mobile optimization.',
      'Communication via Slack and email.',
    ],
    ctaLabel: 'Get Started with Starter',
  },
  {
    id: 'growth',
    name: 'Growth',
    price: '$1,500',
    priceValue: 1500,
    period: 'month',
    audience: 'For Growing Teams',
    features: [
      'One active request at a time.',
      'Fully customized design.',
      'Advanced feature implementation.',
      'API integrations.',
      'CRM or e-commerce configuration.',
      'Performance optimization.',
      'Communication via Slack and email.',
      'One week of post-launch support.',
    ],
    ctaLabel: 'Get Started with Growth',
    featured: true,
  },
  {
    id: 'scale',
    name: 'Scale',
    price: '$3,000',
    priceValue: 3000,
    period: 'month',
    audience: 'For Large Companies',
    features: [
      'Two active requests at a time.',
      'Advanced custom theme development.',
      'Custom application development.',
      'Advanced automation workflows.',
      'Multi-platform integrations.',
      'Advanced performance optimization.',
      'Dedicated technical support.',
      'Communication via Slack and email.',
    ],
    ctaLabel: 'Get Started with Scale',
  },
]

export const getPlanById = (id: string): SubscriptionPlan | undefined =>
  subscriptionPlans.find((plan) => plan.id === id)

/** How the subscription request system works — derived only from plan inclusions. */
export const requestSystemSteps = [
  {
    id: 'submit',
    title: 'Submit a request',
    description:
      'Send your next website, feature, or integration request through Slack or email — whichever your plan includes.',
  },
  {
    id: 'one-at-a-time',
    title: 'One active request at a time',
    description:
      'Your team works through requests one at a time (two at a time on Scale), so priorities stay clear and progress stays visible.',
  },
  {
    id: 'review',
    title: 'Review working software',
    description:
      'You review each piece of work as it is completed, with changes folded into the next request in the queue.',
  },
  {
    id: 'continue',
    title: 'Continue every month',
    description:
      'The subscription continues monthly. Plan details, pausing, and any scope questions are agreed in writing before you start.',
  },
] as const

export const pricingFaqs: FaqItem[] = [
  {
    id: 'pricing-active-requests',
    question: 'What does “one active request at a time” mean?',
    answer:
      'Your plan includes one request in progress at any moment (two on Scale). When that request is delivered, the next one in your queue starts. This is how the listed prices stay predictable — it is not an unlimited-requests service.',
  },
  {
    id: 'pricing-scope',
    question: 'What kind of work fits these plans?',
    answer:
      'Starter covers CMS website setup up to 5 pages with low-code theme work and basic integrations. Growth adds fully customized design, advanced features, API integrations, and CRM or e-commerce configuration. Scale adds custom application development, advanced automation, and multi-platform integrations. Work outside a plan’s listed scope is quoted separately as a project.',
  },
  {
    id: 'pricing-communication',
    question: 'How do we communicate during the subscription?',
    answer:
      'All three plans include communication via Slack and email. Response expectations and working hours are confirmed when you start, based on your team’s location and availability.',
  },
  {
    id: 'pricing-billing',
    question: 'How does billing work?',
    answer:
      'Each plan is a monthly subscription at the listed USD price. Payment method, invoicing schedule, and the start date of your first month are confirmed in the agreement before any work begins. This site does not process payments automatically.',
  },
  {
    id: 'pricing-support',
    question: 'What support is included?',
    answer:
      'Support is included through the Slack and email channels listed in your plan. Growth additionally includes one week of post-launch support after a launch. Ongoing maintenance beyond the listed inclusions can be discussed separately.',
  },
  {
    id: 'pricing-not-included',
    question: 'What is not included in the monthly price?',
    answer:
      'Hosting accounts, third-party software licenses, paid APIs, and ad spend are not included unless explicitly agreed. Source-code ownership transfers to you for work delivered under the engagement terms — this is confirmed in your agreement.',
  },
  {
    id: 'pricing-vs-projects',
    question: 'Is a subscription the right fit, or should I scope a project?',
    answer:
      'If your needs are continuous and vary month to month, a subscription fits well. If you have a fixed, well-defined deliverable (for example a ready-made product from our catalog or a large one-off build), a fixed-scope project or a marketplace product may cost less. Ask — we will say so honestly.',
  },
]
