import type { MarketplaceCategory, MarketplaceProduct } from '@/types'

/**
 * Digital product marketplace — one-time starting prices in USD.
 *
 * All entries are PROPOSED pricing examples (`isPlaceholder: true`).
 * Confirm commercial terms, delivery scope, and screenshots before launch.
 * "Starting at" prices cover the defined base scope only; hosting, licenses,
 * and ongoing support are listed separately per product.
 */
export const marketplaceCategories: MarketplaceCategory[] = [
  {
    id: 'business-management',
    title: 'Business & Management Software',
    description: 'Ready-made systems for inventory, people, customers, and billing.',
  },
  {
    id: 'ecommerce-online-business',
    title: 'E-commerce & Online Business',
    description: 'Stores, business websites, and booking platforms for selling online.',
  },
  {
    id: 'data-business-intelligence',
    title: 'Data & Business Intelligence',
    description: 'Dashboards and reporting tools that make business data readable.',
  },
  {
    id: 'automation-integrations',
    title: 'Automation & Integrations',
    description: 'Workflow automation and API packages that connect your tools.',
  },
]

export const marketplaceProducts: MarketplaceProduct[] = [
  // ——— Business & Management Software ———
  {
    id: 'inventory-management-system',
    name: 'Inventory Management System',
    categoryId: 'business-management',
    description:
      'Track stock levels, locations, and movements in one system — built for small warehouses and retail operations.',
    problem:
      'Stock lives in spreadsheets or paper, leading to overselling, dead inventory, and time-consuming stock counts.',
    features: [
      'Product and SKU catalog with categories',
      'Stock-in, stock-out, and transfer tracking',
      'Low-stock alerts and reorder lists',
      'Simple reporting on holdings and movement',
      'Role-based access for staff',
    ],
    customization: [
      'Warehouse or multi-location structure',
      'Barcode or QR-code workflows',
      'Fields and categories specific to your products',
    ],
    implementation: [
      'Hosted web application — works on modern browsers',
      'Data import from spreadsheets available',
      'User accounts and permissions set up during onboarding',
    ],
    startingPrice: 499,
    addons: [
      { name: 'Barcode scanning module', price: 'Starting at $149' },
      { name: 'Spreadsheet data import setup', price: 'Starting at $99' },
    ],
    recurringCosts: [
      'Hosting and server costs (quoted separately)',
      'Optional ongoing maintenance and support',
    ],
    visual: 'dashboard',
    relatedServiceId: 'custom-web-applications',
    isPlaceholder: true,
  },
  {
    id: 'hr-employee-management-system',
    name: 'HR & Employee Management System',
    categoryId: 'business-management',
    description:
      'Manage employee records, leave, and basic HR workflows in a secure internal system.',
    problem:
      'Employee information is scattered across files and inboxes, making leave tracking and record-keeping slow and error-prone.',
    features: [
      'Employee profiles and document storage',
      'Leave requests and approval workflow',
      'Organizational structure and roles',
      'Onboarding checklists',
      'HR activity log',
    ],
    customization: [
      'Leave types and approval chains',
      'Departments and reporting lines',
      'Custom fields for your industry',
    ],
    implementation: [
      'Internal web application with secure login',
      'Works in any modern browser; mobile-friendly',
      'Admin training included at handover',
    ],
    startingPrice: 799,
    addons: [
      { name: 'Payroll export integration', price: 'Starting at $199' },
      { name: 'Employee self-service portal', price: 'Starting at $249' },
    ],
    recurringCosts: ['Hosting (quoted separately)', 'Optional maintenance'],
    visual: 'portal',
    relatedServiceId: 'custom-web-applications',
    isPlaceholder: true,
  },
  {
    id: 'crm-software',
    name: 'CRM Software',
    categoryId: 'business-management',
    description:
      'A customer relationship system for contacts, deals, and follow-ups — shaped around your sales process.',
    problem:
      'Sales activity lives in personal inboxes and spreadsheets, so pipeline visibility depends on individual discipline.',
    features: [
      'Contact and company records',
      'Deal pipeline with stages you define',
      'Activity and follow-up tracking',
      'Task reminders and notes',
      'Pipeline and activity reports',
    ],
    customization: [
      'Pipeline stages and win/loss reasons',
      'Fields for your products and services',
      'Team roles and visibility rules',
    ],
    implementation: [
      'Cloud or self-hosted deployment options',
      'Import from spreadsheets or existing tools',
      'Optional email integration setup',
    ],
    startingPrice: 699,
    addons: [
      { name: 'Email sync integration', price: 'Starting at $199' },
      { name: 'Lead capture forms', price: 'Starting at $149' },
    ],
    recurringCosts: ['Hosting (quoted separately)', 'Optional support retainer'],
    visual: 'dashboard',
    relatedServiceId: 'custom-web-applications',
    isPlaceholder: true,
  },
  {
    id: 'invoicing-billing-system',
    name: 'Invoicing & Billing System',
    categoryId: 'business-management',
    description:
      'Create invoices, track payments, and manage billing records without juggling spreadsheets.',
    problem:
      'Manual invoicing is slow, inconsistent, and hard to reconcile — late payments slip through the cracks.',
    features: [
      'Professional invoice generation',
      'Client and item management',
      'Payment status tracking and reminders',
      'Expense and payment records',
      'Basic financial reports',
    ],
    customization: [
      'Invoice templates with your branding',
      'Tax rules for your region',
      'Payment terms and late-fee logic',
    ],
    implementation: [
      'Web application accessible to your team',
      'PDF export for invoices and statements',
      'User roles for admins and staff',
    ],
    startingPrice: 399,
    addons: [
      { name: 'Online payment link integration', price: 'Starting at $149' },
      { name: 'Accounting software export', price: 'Starting at $99' },
    ],
    recurringCosts: ['Hosting (quoted separately)', 'Optional maintenance'],
    visual: 'portal',
    relatedServiceId: 'business-automation',
    isPlaceholder: true,
  },

  // ——— E-commerce & Online Business ———
  {
    id: 'starter-ecommerce-website',
    name: 'Starter E-commerce Website',
    categoryId: 'ecommerce-online-business',
    description:
      'A clean, conversion-focused online store for small catalogs — designed to launch quickly.',
    problem:
      'New sellers need a professional store without the cost and timeline of a fully custom build.',
    features: [
      'Product catalog with categories and search',
      'Shopping cart and checkout flow',
      'Payment provider integration',
      'Order management dashboard',
      'Mobile-responsive storefront',
    ],
    customization: [
      'Theme colors and layout to match your brand',
      'Shipping rules and zones',
      'Up to a defined catalog size (confirmed at scoping)',
    ],
    implementation: [
      'Hosted storefront with admin access',
      'Payment account setup assistance',
      'Launch checklist and handover',
    ],
    startingPrice: 599,
    addons: [
      { name: 'Extra page templates', price: 'Starting at $79 each' },
      { name: 'Email marketing setup', price: 'Starting at $149' },
    ],
    recurringCosts: [
      'Hosting and platform fees (where applicable)',
      'Payment provider transaction fees',
      'Optional maintenance',
    ],
    visual: 'storefront',
    relatedServiceId: 'ecommerce-development',
    isPlaceholder: true,
  },
  {
    id: 'professional-ecommerce-store',
    name: 'Professional E-commerce Store',
    categoryId: 'ecommerce-online-business',
    description:
      'A fully customized online store with merchandising tools, promotions, and operational dashboards.',
    problem:
      'Growing sellers have outgrown basic templates and need a store that supports real merchandising and operations.',
    features: [
      'Fully customized storefront design',
      'Advanced catalog and merchandising tools',
      'Promotions, discounts, and coupons',
      'Order, inventory, and customer operations views',
      'Analytics and conversion tracking setup',
    ],
    customization: [
      'Bespoke design and interaction patterns',
      'Loyalty or membership mechanics',
      'B2B pricing or wholesale features',
    ],
    implementation: [
      'Design phase followed by staged build',
      'Data migration from an existing store available',
      'Staff training on the operations dashboard',
    ],
    startingPrice: 1499,
    addons: [
      { name: 'Existing-store migration', price: 'Starting at $399' },
      { name: 'Multi-currency setup', price: 'Starting at $249' },
    ],
    recurringCosts: [
      'Hosting and platform fees',
      'Payment provider fees',
      'Optional support and improvement retainers',
    ],
    visual: 'storefront',
    relatedServiceId: 'ecommerce-development',
    isPlaceholder: true,
  },
  {
    id: 'custom-business-website',
    name: 'Custom Business Website',
    categoryId: 'ecommerce-online-business',
    description:
      'A professional marketing website designed around your brand, services, and customer journey.',
    problem:
      'A template site looks like everyone else’s and cannot explain what makes your business different.',
    features: [
      'Custom design based on your brand',
      'Core pages: home, services, about, contact',
      'Contact and inquiry forms',
      'On-page SEO fundamentals',
      'Mobile and performance optimization',
    ],
    customization: [
      'Additional pages and content sections',
      'Blog or resource center',
      'Multi-language structure',
    ],
    implementation: [
      'Content workshop before design',
      'Deployment to your hosting account',
      'Editor handover so your team can update content',
    ],
    startingPrice: 799,
    addons: [
      { name: 'Copywriting support', price: 'Starting at $249' },
      { name: 'CMS editor training session', price: 'Starting at $99' },
    ],
    recurringCosts: ['Hosting (your account or ours)', 'Optional content updates'],
    visual: 'mobile',
    relatedServiceId: 'custom-web-applications',
    isPlaceholder: true,
  },
  {
    id: 'booking-appointment-platform',
    name: 'Booking & Appointment Platform',
    categoryId: 'ecommerce-online-business',
    description:
      'Let customers book appointments online with availability, reminders, and a staff calendar.',
    problem:
      'Phone and chat bookings create double-bookings, no-shows, and constant back-and-forth scheduling.',
    features: [
      'Public booking page with live availability',
      'Staff calendars and schedules',
      'Automated email reminders',
      'Booking management dashboard',
      'Cancellation and rescheduling flows',
    ],
    customization: [
      'Service durations, buffers, and capacity rules',
      'Staff members and locations',
      'Branded booking flow',
    ],
    implementation: [
      'Hosted platform with admin access',
      'Calendar integrations available as add-on',
      'Setup of services and staff schedules included',
    ],
    startingPrice: 699,
    addons: [
      { name: 'SMS reminders', price: 'Starting at $149 + SMS fees' },
      { name: 'Online payment at booking', price: 'Starting at $149' },
    ],
    recurringCosts: ['Hosting (quoted separately)', 'SMS fees (if enabled)', 'Optional support'],
    visual: 'portal',
    relatedServiceId: 'custom-web-applications',
    isPlaceholder: true,
  },

  // ——— Data & Business Intelligence ———
  {
    id: 'business-kpi-dashboard',
    name: 'Business KPI Dashboard',
    categoryId: 'data-business-intelligence',
    description:
      'A single screen with the numbers that matter — revenue, customers, operations, and goals at a glance.',
    problem:
      'Leadership decisions wait on reports that take days to assemble, and by then the numbers are stale.',
    features: [
      'KPI scorecards you define with us',
      'Trend charts with time-period filters',
      'Target vs. actual tracking',
      'Role-based views for management vs. teams',
      'Export to CSV and PDF',
    ],
    customization: [
      'KPI definitions matched to your business',
      'Layout and drill-down paths',
      'Branded color scheme',
    ],
    implementation: [
      'Connects to your existing data sources or spreadsheets',
      'Initial data-source setup session included',
      'Dashboard training for your team',
    ],
    startingPrice: 499,
    addons: [
      { name: 'Extra data source connection', price: 'Starting at $149' },
      { name: 'Scheduled email delivery of dashboards', price: 'Starting at $99' },
    ],
    recurringCosts: ['Hosting (quoted separately)', 'Optional updates as metrics evolve'],
    visual: 'analytics',
    relatedServiceId: 'business-intelligence-analytics',
    isPlaceholder: true,
  },
  {
    id: 'sales-analytics-dashboard',
    name: 'Sales Analytics Dashboard',
    categoryId: 'data-business-intelligence',
    description:
      'Track pipeline, revenue, and sales-team performance with reports built for sales leaders.',
    problem:
      'Sales data is scattered across CRM exports and spreadsheets, so pattern-spotting happens too late.',
    features: [
      'Revenue and pipeline trend charts',
      'Win-rate and cycle-time metrics',
      'Rep and team performance views',
      'Product or service breakdowns',
      'Monthly comparison reports',
    ],
    customization: [
      'Metrics matched to your sales process',
      'Integration with your CRM or POS data',
      'Forecast views based on your stages',
    ],
    implementation: [
      'Data connection setup during onboarding',
      'Works alongside your existing CRM — no forced migration',
      'Optional scheduled report distribution',
    ],
    startingPrice: 699,
    addons: [
      { name: 'CRM two-way sync', price: 'Starting at $249' },
      { name: 'Custom forecast model', price: 'Starting at $399' },
    ],
    recurringCosts: ['Hosting (quoted separately)', 'Optional ongoing analytics support'],
    visual: 'analytics',
    relatedServiceId: 'business-intelligence-analytics',
    isPlaceholder: true,
  },
  {
    id: 'custom-bi-solution',
    name: 'Custom Business Intelligence Solution',
    categoryId: 'data-business-intelligence',
    description:
      'A tailored analytics system for complex data: multiple sources, custom metrics, and department-specific reporting.',
    problem:
      'Off-the-shelf BI tools bend badly around unusual data models, leaving teams with manual workarounds.',
    features: [
      'Data model designed around your operations',
      'ETL or sync pipelines from multiple systems',
      'Custom metrics and calculated fields',
      'Department-specific dashboards and reports',
      'Access control and audit considerations',
    ],
    customization: [
      'Virtually every metric, layout, and source',
      'Embedding into internal tools where needed',
      'White-label options',
    ],
    implementation: [
      'Discovery and data audit first',
      'Phased delivery: core metrics, then expansion',
      'Documentation and team training',
    ],
    startingPrice: 1499,
    addons: [
      { name: 'Additional data warehouse setup', price: 'Starting at $499' },
      { name: 'Embedded analytics in an existing app', price: 'Starting at $599' },
    ],
    recurringCosts: [
      'Hosting and data-storage costs',
      'Third-party data tool licenses (if used)',
      'Optional maintenance and evolution retainer',
    ],
    visual: 'dashboard',
    relatedServiceId: 'business-intelligence-analytics',
    isPlaceholder: true,
  },

  // ——— Automation & Integrations ———
  {
    id: 'business-workflow-automation',
    name: 'Business Workflow Automation',
    categoryId: 'automation-integrations',
    description:
      'Automate a defined business process end-to-end — approvals, notifications, and handoffs included.',
    problem:
      'The same data gets copied between tools by hand every week, wasting hours and introducing errors.',
    features: [
      'Workflow mapping for one defined process',
      'Triggers, conditions, and approval steps',
      'Email or Slack notifications',
      'Run history and failure alerts',
      'Admin console for exceptions',
    ],
    customization: [
      'Steps and rules matched to your process',
      'Notification templates and recipients',
      'Escalation paths',
    ],
    implementation: [
      'Process audit session before build',
      'Runs on your infrastructure or ours',
      'Runbook documentation for your team',
    ],
    startingPrice: 299,
    addons: [
      { name: 'Additional workflow in the same system', price: 'Starting at $149' },
      { name: 'Advanced approval chains', price: 'Starting at $149' },
    ],
    recurringCosts: ['Hosting or automation-platform fees', 'Optional monitoring support'],
    visual: 'automation',
    relatedServiceId: 'business-automation',
    isPlaceholder: true,
  },
  {
    id: 'api-integration-package',
    name: 'API Integration Package',
    categoryId: 'automation-integrations',
    description:
      'Connect two specific systems — CRM, accounting, marketing, or custom APIs — with reliable, monitored sync.',
    problem:
      'Tools that should share data don’t, so staff re-enter information and reports disagree with each other.',
    features: [
      'Integration between two named systems',
      'Field mapping and data transformation',
      'Error handling with retry logic',
      'Sync monitoring and failure alerts',
      'Documentation of the data flow',
    ],
    customization: [
      'Direction and frequency of sync',
      'Which records and fields are included',
      'Filter and validation rules',
    ],
    implementation: [
      'API access to both systems required',
      'Staged rollout with test data first',
      'Monitoring dashboard for your ops team',
    ],
    startingPrice: 199,
    addons: [
      { name: 'Each additional system in the flow', price: 'Starting at $149' },
      { name: 'Historical data backfill', price: 'Starting at $199' },
    ],
    recurringCosts: [
      'Third-party API or platform fees',
      'Hosting for the integration layer',
      'Optional support',
    ],
    visual: 'automation',
    relatedServiceId: 'api-system-integrations',
    isPlaceholder: true,
  },
  {
    id: 'custom-reporting-automation',
    name: 'Custom Reporting Automation',
    categoryId: 'automation-integrations',
    description:
      'Scheduled reports built once and delivered automatically — replacing manual spreadsheet assembly.',
    problem:
      'Someone on your team spends hours every week compiling the same report from multiple sources.',
    features: [
      'Report definition for one recurring report',
      'Scheduled data pulls from named sources',
      'Automated PDF or email delivery',
      'Historical report archive',
      'Alerts when data is missing or late',
    ],
    customization: [
      'Report layout and metrics',
      'Recipients and distribution schedule',
      'Additional formats (CSV, Excel)',
    ],
    implementation: [
      'Source systems must expose data via API or export',
      'Two-week parallel run against the manual report',
      'Handover with change instructions',
    ],
    startingPrice: 399,
    addons: [
      { name: 'Each additional report type', price: 'Starting at $149' },
      { name: 'Dashboard companion view', price: 'Starting at $249' },
    ],
    recurringCosts: [
      'Hosting for the automation',
      'Third-party data fees (if any)',
      'Optional maintenance',
    ],
    visual: 'analytics',
    relatedServiceId: 'business-intelligence-analytics',
    isPlaceholder: true,
  },
  {
    id: 'email-journey-automation',
    name: 'Email & Customer Journey Automation',
    categoryId: 'automation-integrations',
    description:
      'Automated customer journeys — welcome series, follow-ups, and lifecycle emails triggered by real behavior, not manual lists.',
    problem:
      'Marketing emails are sent by hand from static lists, so customers get irrelevant messages and nobody has time to build real sequences.',
    features: [
      'Trigger-based journey builder (signups, purchases, inactivity)',
      'Email templates matched to your brand',
      'Segmentation by customer behavior',
      'Performance stats: opens, clicks, conversions',
      'Suppression and preference handling',
    ],
    customization: [
      'Journey logic and timing per segment',
      'Template design to match your brand',
      'Integration with your store or CRM data',
    ],
    implementation: [
      'Connects to your existing email platform or a recommended one',
      'Initial journey map workshop included',
      'Team training on editing journeys after handover',
    ],
    startingPrice: 349,
    addons: [
      { name: 'Additional journey in the same system', price: 'Starting at $129' },
      { name: 'Custom template pack (5 templates)', price: 'Starting at $199' },
    ],
    recurringCosts: [
      'Email platform fees (per subscriber/volume)',
      'Optional journey optimization support',
    ],
    visual: 'automation',
    relatedServiceId: 'business-automation',
    isPlaceholder: true,
  },
]

export const getMarketplaceProductById = (id: string): MarketplaceProduct | undefined =>
  marketplaceProducts.find((product) => product.id === id)

export const getMarketplaceCategoryById = (id: string): MarketplaceCategory | undefined =>
  marketplaceCategories.find((category) => category.id === id)

export const formatPrice = (value: number): string => `$${value.toLocaleString('en-US')}`
