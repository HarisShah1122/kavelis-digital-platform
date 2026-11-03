/**
 * English dictionary — the source of truth for every translated string.
 * `ar.ts` is type-checked against this shape, so a missing Arabic key fails
 * the build instead of rendering blank text.
 *
 * Copy rules: only verified facts. No invented metrics, clients, testimonials,
 * partnerships, or results.
 */
export const en = {
  common: {
    skipToContent: 'Skip to content',
    loading: 'Loading page',
    startProject: 'Start a Project',
    exploreWork: 'Explore Our Work',
    letsWorkTogether: 'Let’s Work Together',
    previous: 'Previous',
    next: 'Next',
    goToSlide: 'Go to slide',
    of: 'of',
    englishOnly:
      'This page is currently available in English only. Navigation and contact details remain in Arabic.',
    switchTo: 'العربية',
    switchLabel: 'Switch language to Arabic',
    slogan: 'Build smarter. Automate better. Scale faster.',
  },

  nav: {
    primary: 'Primary',
    mobile: 'Mobile',
    home: 'Home',
    services: 'Services',
    solutions: 'Solutions',
    work: 'Our Work',
    about: 'About Us',
    contact: 'Contact',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    homeLabel: 'Kavelis home',
    allServices: 'View all services',
    servicesIntro: 'Four practices, one engineering team — from first scope to long-term support.',
    solutionsIntro: 'Ready-made systems and reusable platforms, deployed and configured for you.',
    solutionLinks: {
      hr: { title: 'HR Management', description: 'Employee records, leave approvals, onboarding.' },
      inventory: { title: 'Inventory Management', description: 'Stock levels, locations, low-stock alerts.' },
      kpi: { title: 'Business KPI Dashboards', description: 'The numbers that matter, on one screen.' },
      saas: { title: 'Custom SaaS & Business Platforms', description: 'Subscription products built to sell and scale.' },
    },
    solutionsFooter: {
      catalog: 'Product catalogue',
      industries: 'Industries we serve',
      pricing: 'Pricing',
    },
  },

  /** Localized names for the existing service pages (URLs unchanged). */
  services: {
    'saas-product-development': {
      title: 'SaaS Product Development',
      short: 'Design, build, and launch subscription software from concept to release.',
      outcomes: [
        'A shippable SaaS product with clear release milestones',
        'Subscription-ready account, billing, and access structures',
      ],
      engagement: ['Fixed-scope MVP build', 'Dedicated product team (monthly)'],
    },
    'business-automation': {
      title: 'Business Automation',
      short: 'Remove repetitive work with reliable, observable workflows.',
      outcomes: [
        'Fewer manual handoffs and copy-paste steps between systems',
        'Faster processing times for routine operations',
      ],
      engagement: ['Automation discovery sprint', 'Build and integrate engagement'],
    },
    'ecommerce-development': {
      title: 'E-commerce Development',
      short: 'Digital commerce experiences built for conversion and operations.',
      outcomes: [
        'A fast, accessible storefront that supports your catalog and brand',
        'Checkout flows integrated with your payment and shipping providers',
      ],
      engagement: ['New store build', 'Replatform and migration'],
    },
    'custom-web-applications': {
      title: 'Custom Web Applications',
      short: 'Purpose-built platforms for operations, customers, and internal teams.',
      outcomes: [
        'Software shaped to your processes instead of forcing process around software',
        'Role-based experiences for staff, customers, or partners',
      ],
      engagement: ['Discovery-to-delivery project', 'Embedded engineering team'],
    },
    'api-system-integrations': {
      title: 'API & System Integrations',
      short: 'Connect the tools your business depends on.',
      outcomes: [
        'Data flows reliably between systems without manual reconciliation',
        'Faster onboarding of new tools and partners through clear API contracts',
      ],
      engagement: ['Focused integration project', 'API platform build'],
    },
    'ai-enabled-solutions': {
      title: 'AI-Enabled Business Solutions',
      short: 'Practical AI features embedded in real workflows.',
      outcomes: [
        'Reduced time spent on repetitive reading, routing, and data entry',
        'Faster access to knowledge across documents and systems',
      ],
      engagement: ['AI discovery workshop', 'Pilot feature build'],
    },
    'business-intelligence-analytics': {
      title: 'Business Intelligence & Data Analytics',
      short: 'Dashboards, reporting, and analytics that make business data usable.',
      outcomes: [
        'Faster access to the numbers that drive daily and monthly decisions',
        'Shared source of truth across teams instead of conflicting spreadsheets',
      ],
      engagement: ['BI discovery and data audit', 'Dashboard build engagement'],
    },
    'maintenance-support': {
      title: 'Product Maintenance & Technical Support',
      short: 'Keep products stable, secure, and improving after launch.',
      outcomes: [
        'Predictable handling of bugs, incidents, and security updates',
        'Continuous small improvements instead of costly rewrites',
      ],
      engagement: ['Monthly support retainer', 'Business-hours support plan'],
    },
  },

  footer: {
    positioning:
      'Kavelis Solutions designs, builds, and maintains custom software, business automation, data dashboards, and e-commerce — built to keep working long after launch.',
    services: 'Services',
    solutions: 'Solutions',
    company: 'Company',
    contact: 'Contact',
    legal: 'Legal',
    language: 'Language',
    portfolio: 'Portfolio',
    caseStudies: 'Analytics case studies',
    products: 'Products',
    pricing: 'Pricing',
    careers: 'Careers',
    founder: 'Founder & leadership',
    process: 'Our process',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    hiring: 'Hiring inquiries',
    whatsapp: 'Message us on WhatsApp',
    uae: 'United Arab Emirates',
    ksa: 'Saudi Arabia',
    rights: 'All rights reserved.',
  },

  home: {
    seoTitle: 'Custom Software, Automation & Business Dashboards',
    seoDescription:
      'Kavelis Solutions builds custom software, automates business operations, and turns scattered data into intelligent business systems and dashboards.',
    hero: {
      eyebrow: 'Software studio · Kavelis Solutions',
      lines: ['Turn complex business', 'challenges into smarter', 'digital solutions.'],
      accentLine: 2,
      lead: 'Kavelis Solutions builds custom software, automates business operations, and transforms scattered data into intelligent business systems.',
      visualCaption: 'Regional sales overview — a Power BI report designed by Kavelis.',
      visualAlt:
        'Regional sales overview dashboard built in Power BI by Kavelis — year-over-year sales, profit, and quantity by region',
      chipLabel: 'Live work sample',
      chipValue: 'Power BI · DAX',
      scroll: 'Scroll to explore',
      points: ['Custom software', 'Automation', 'Dashboards', 'E-commerce'],
    },
    capabilities: [
      'Custom Software',
      'Business Automation',
      'SaaS Platforms',
      'Business Dashboards',
      'API Integrations',
      'E-commerce',
      'Digital Transformation',
    ],
    capabilitiesLabel: 'What Kavelis builds',
    whatWeDo: {
      eyebrow: 'What we do',
      title: 'Four practices. One accountable team.',
      description:
        'Every engagement draws on the same engineering discipline — whether the job is a new platform, an automated workflow, or a dashboard leadership can trust.',
      explore: 'Explore service',
      related: 'Related services',
      pillars: {
        software: {
          title: 'Custom Software Development',
          description:
            'Custom web applications, SaaS platforms, ERP systems, business portals, and tailored digital products.',
          capabilities: ['Web applications', 'SaaS platforms', 'ERP & business portals', 'Tailored digital products'],
          imageAlt: 'Custom business web application shown on a laptop',
        },
        automation: {
          title: 'Business Automation',
          description:
            'Workflow automation, system integrations, API connections, and operational process optimization.',
          capabilities: ['Workflow automation', 'System integrations', 'API connections', 'Process optimization'],
          imageAlt: 'Business workflow automation console shown on a laptop',
        },
        data: {
          title: 'Data Analytics & Dashboards',
          description:
            'Business intelligence, KPI dashboards, reporting systems, data visualization, and operational insights.',
          capabilities: ['Business intelligence', 'KPI dashboards', 'Reporting systems', 'Data visualization'],
          imageAlt: 'Regional sales overview dashboard built in Power BI by Kavelis',
        },
        management: {
          title: 'Business Management Solutions',
          description:
            'HR management systems, inventory platforms, e-commerce solutions, and business operations software.',
          capabilities: ['HR management', 'Inventory platforms', 'E-commerce', 'Operations software'],
          imageAlt: 'Inventory management system dashboard shown on a laptop',
        },
      },
    },
    work: {
      eyebrow: 'Featured work',
      title: 'Selected work, live and public',
      description:
        'Client storefronts in production and Power BI work samples — each described factually, with links to the live sites.',
      viewCase: 'View case study',
      visitSite: 'Visit live site',
      allWork: 'Full portfolio',
      carouselLabel: 'Featured projects',
      focusLabel: 'Focus',
      items: {
        'show-tote': {
          title: 'Show Tote',
          category: 'Premium accessories e-commerce',
          summary:
            'A premium leather and clear-bag store organised around venue bag policies, with a venue search that tells shoppers which bags are allowed.',
          tags: ['Storefront design', 'E-commerce build', 'Venue search'],
        },
        skinnydipped: {
          title: 'SkinnyDipped',
          category: 'Consumer brand e-commerce',
          summary:
            'A snack brand storefront where packaging, ingredient transparency, and retail availability work together as a second funnel.',
          tags: ['Brand storefront', 'Product pages', 'Repeat purchase'],
        },
        'halal-world-depot': {
          title: 'Halal World Depot',
          category: 'Online grocery e-commerce',
          summary:
            'An online grocery store with bundles that reduce decision load, legible freight costs, and subscriptions for perishables.',
          tags: ['Grocery catalogue', 'Bundles', 'Subscriptions'],
        },
        'inkline-apparel': {
          title: 'Inkline Apparel',
          category: 'Performance apparel e-commerce',
          summary:
            'A technical apparel store where kit-first merchandising and specification-led copy help shoppers buy the right size first time.',
          tags: ['Apparel catalogue', 'Kit merchandising', 'Size guidance'],
        },
        'fleet-cost-maintenance-dashboard': {
          title: 'Fleet Cost & Maintenance Dashboard',
          category: 'Power BI work sample',
          summary:
            'A four-page executive report covering fleet operating cost, vehicle performance, maintenance spend, and downtime health.',
          tags: ['Power BI', 'DAX', 'Data modeling'],
        },
        'regional-sales-dashboard': {
          title: 'Regional Sales Overview',
          category: 'Power BI work sample',
          summary:
            'A one-page sales overview comparing current and previous-year revenue, profit, and quantity across four regions.',
          tags: ['Power BI', 'DAX', 'Data modeling'],
        },
        'sales-growth-forecast-dashboard': {
          title: 'Sales Growth & Forecast',
          category: 'Power BI work sample',
          summary:
            'Product and category sales growth tracked against budget, with a multi-year trend and forecast in one view.',
          tags: ['Power BI', 'DAX', 'Forecasting'],
        },
      },
    },
    tech: {
      eyebrow: 'Technology',
      title: 'Mainstream, well-supported tools — no lock-in',
      note: 'Technologies our team works with day to day. Listed for transparency — not as partnerships or certifications.',
    },
    process: {
      eyebrow: 'Our development process',
      title: 'Four stages. No black box.',
      description:
        'Every engagement follows the same structure, so you always know what is happening, what comes next, and what you will receive.',
      stepLabel: 'Step',
      steps: {
        discover: {
          title: 'Discover',
          description:
            'Understand your business, objectives, current processes, and challenges — and define what is genuinely worth building.',
          preview: ['Goals & success criteria', 'Current workflow map', 'Constraints & systems', 'Scope recommendation'],
          previewTitle: 'Discovery brief',
        },
        design: {
          title: 'Design',
          description:
            'Create the solution architecture, user experience, technical direction, and a project roadmap you can review before heavy build.',
          preview: ['Architecture & data model', 'User flows', 'Interface design', 'Milestone roadmap'],
          previewTitle: 'Solution blueprint',
        },
        build: {
          title: 'Build',
          description:
            'Develop, integrate, test, and refine in short cycles — with working software to review at every milestone.',
          preview: ['Iterative development', 'Integrations wired in', 'Testing & accessibility', 'Milestone demos'],
          previewTitle: 'Build cycle',
        },
        launch: {
          title: 'Launch & Support',
          description:
            'Deploy, hand over documentation and credentials, monitor the system, and keep improving it after release.',
          preview: ['Deployment & monitoring', 'Documentation & handover', 'Security updates', 'Improvement backlog'],
          previewTitle: 'Launch checklist',
        },
      },
    },
    products: {
      eyebrow: 'Products & solutions',
      title: 'Ready-made business software, configured for you',
      description:
        'Defined base scopes with listed starting prices — a faster route than a full custom build when the base fits your workflow.',
      problem: 'The problem',
      solves: 'What it does',
      modules: 'Main modules',
      users: 'Built for',
      cta: 'View product details',
      ask: 'Ask for a walkthrough',
      previewNote: 'Illustrative product preview.',
      tabsLabel: 'Products',
      pipelineTitle: 'In development',
      pipelineNote:
        'Kavelis’s own products in the pipeline. Features and screenshots are published only once they are ready.',
      register: 'Register interest',
      items: {
        'hr-employee-management-system': {
          name: 'HR Management',
          problem:
            'Employee information is scattered across files and inboxes, making leave tracking and record-keeping slow and error-prone.',
          solves: 'Manages employee records, leave, and routine HR workflows in one secure internal system.',
          modules: [
            'Employee profiles and document storage',
            'Leave requests and approval workflow',
            'Organizational structure and roles',
            'Onboarding checklists',
          ],
          users: 'HR teams and growing businesses',
        },
        'inventory-management-system': {
          name: 'Inventory Management',
          problem:
            'Stock lives in spreadsheets or paper, leading to overselling, dead inventory, and time-consuming stock counts.',
          solves: 'Tracks stock levels, locations, and movements in one system for warehouses and retail operations.',
          modules: [
            'Product and SKU catalog',
            'Stock-in, stock-out, and transfer tracking',
            'Low-stock alerts and reorder lists',
            'Role-based access for staff',
          ],
          users: 'Small warehouses and retail operations',
        },
        'business-kpi-dashboard': {
          name: 'Business KPI Dashboard',
          problem:
            'Leadership decisions wait on reports that take days to assemble, and by then the numbers are stale.',
          solves: 'Puts revenue, customers, operations, and goals on a single screen, connected to your data.',
          modules: [
            'KPI scorecards defined with you',
            'Trend charts with period filters',
            'Target vs. actual tracking',
            'Export to CSV and PDF',
          ],
          users: 'Owners, leadership, and operations managers',
        },
        'business-workflow-automation': {
          name: 'Workflow Automation',
          problem:
            'The same data gets copied between tools by hand every week, wasting hours and introducing errors.',
          solves: 'Automates one defined business process end-to-end — approvals, notifications, and handoffs included.',
          modules: [
            'Triggers, conditions, and approval steps',
            'Email or Slack notifications',
            'Run history and failure alerts',
            'Admin console for exceptions',
          ],
          users: 'Operations, finance, and admin teams',
        },
      },
      pipeline: {
        'fleetflow-tms': { category: 'Transport & logistics', summary: 'A transport management system for fleet operators.' },
        'peoplenexus-hrms': { category: 'Human resources', summary: 'A human resource management system for growing teams.' },
      },
    },
    why: {
      eyebrow: 'Why Kavelis',
      title: 'How we earn long-term trust',
      items: [
        { title: 'Business-focused software', description: 'We start from the business outcome and challenge scope that will not move it.' },
        { title: 'Clear, transparent delivery', description: 'Visible milestones, written decisions, and early warning if a timeline needs to change.' },
        { title: 'Built on your real workflows', description: 'Solutions are designed around how your team actually works — not a generic template.' },
        { title: 'You own everything from day one', description: 'Source code, documentation, and credentials belong to you. Handover is planned, not negotiated.' },
        { title: 'Structured development & testing', description: 'Short build cycles, functional testing, and accessibility checks before anything reaches users.' },
        { title: 'Maintenance, monitoring & handover', description: 'Monitoring, security updates, and documentation are part of the definition of done.' },
        { title: 'Long-term partnership', description: 'Most of a product’s life happens after launch. We stay to keep it working and improving.' },
      ],
    },
    impact: {
      eyebrow: 'In numbers',
      title: 'Facts you can check on this website',
      note: 'Every figure below is counted from work published on this site — no estimates, no rounded-up claims.',
      stats: {
        storefronts: 'Live client storefronts in the portfolio',
        dashboards: 'Power BI work samples with full write-ups',
        products: 'Ready-made products in the catalogue',
        services: 'Service lines, each with its own detail page',
      },
    },
    faq: {
      eyebrow: 'FAQ',
      title: 'Questions businesses ask before they start',
      items: [
        {
          question: 'What services does Kavelis provide?',
          answer:
            'Custom software and web applications, SaaS product development, business automation, API and system integrations, business intelligence and dashboards, e-commerce, AI-enabled solutions, and ongoing maintenance and support. We also offer ready-made business software with listed starting prices.',
        },
        {
          question: 'What types of businesses do you work with?',
          answer:
            'Startups and SaaS companies, e-commerce businesses, small and growing enterprises, and operations-heavy businesses that have outgrown spreadsheets and manual processes. If your situation is different, describe it and we will tell you honestly whether we are a good fit.',
        },
        {
          question: 'How does your software development process work?',
          answer:
            'Four stages: Discover, Design, Build, and Launch & Support. Discovery defines scope before any commitment to build, design settles architecture and user experience, development runs in short cycles with regular demos, and launch includes documentation, handover, and monitoring.',
        },
        {
          question: 'Can you build custom business software?',
          answer:
            'Yes. Customer portals, operations platforms, booking systems, ERP-style tools, and dashboards are built around how your business actually works when off-the-shelf tools do not fit.',
        },
        {
          question: 'Who owns the source code?',
          answer:
            'You do. Source code, documentation, and infrastructure credentials belong to you, with handover planned from the start of the engagement.',
        },
        {
          question: 'Do you provide maintenance and support?',
          answer:
            'Yes. Maintenance and support retainers cover monitoring, bug fixes, dependency and security updates, and planned improvements after launch.',
        },
        {
          question: 'How can a business request a consultation?',
          answer:
            'Send an enquiry through the form below or the contact page, email info@kavelis.llc, or call or message us on our UAE or Saudi Arabia numbers. We reply with clarifying questions and a recommended next step.',
        },
      ],
    },
    contact: {
      eyebrow: 'Start a project',
      title: 'Let’s Build Something That Moves Your Business Forward.',
      description:
        'Tell us what you want to build or fix. We respond with honest scoping questions, realistic options, and a clear next step.',
      direct: 'Prefer to talk directly?',
    },
  },

  form: {
    name: 'Full name',
    email: 'Business email',
    company: 'Company name',
    optional: 'optional',
    service: 'Service required',
    budget: 'Estimated budget',
    timeline: 'Timeline',
    message: 'Project description',
    messagePlaceholder:
      'What are you trying to build or improve? Who is it for? Are there deadlines or systems it needs to work with?',
    selectService: 'Select a service',
    notSure: 'Not sure yet',
    selectBudget: 'Select a range (optional)',
    selectTimeline: 'Select a timeline (optional)',
    timelines: {
      asap: 'As soon as possible',
      short: '1 – 3 months',
      medium: '3 – 6 months',
      long: '6+ months',
      exploring: 'Exploring options',
    },
    submit: 'Send project enquiry',
    submitting: 'Sending…',
    replyNote: 'We reply to every serious enquiry — usually within two business days.',
    privacyNote: 'Your details are used only to respond to this enquiry.',
    errors: {
      name: 'Please enter your name.',
      email: 'Please enter your business email.',
      emailInvalid: 'Please enter a valid email address.',
      service: 'Please select a service.',
      message: 'Please describe your project.',
      messageShort: 'Please add a little more detail (at least 20 characters).',
    },
    status: {
      success: {
        title: 'Enquiry received',
        body: 'Thank you — your project details have been submitted. We will review them and respond as soon as possible.',
      },
      error: {
        title: 'Something went wrong',
        body: 'Your enquiry could not be sent. Please try again, or email info@kavelis.llc directly.',
      },
      unconfigured: {
        title: 'Form delivery is not connected',
        body: 'This deployment has no submission endpoint configured, so nothing was sent. Please email info@kavelis.llc directly.',
      },
    },
    selection: 'Your selection',
    clearSelection: 'Clear selection and send a general enquiry',
    startingAt: 'Starting at',
    perMonth: '/month',
    interest: 'interest registration',
    plan: 'plan',
  },

  contactPage: {
    seoTitle: 'Contact',
    seoDescription:
      'Discuss custom software, automation, dashboards, or e-commerce with Kavelis Solutions. Email info@kavelis.llc or call our UAE and Saudi Arabia numbers.',
    eyebrow: 'Contact',
    title: 'Tell us what you want to build',
    description:
      'Share a few details about your project. We will respond with clarifying questions, realistic options, and a clear recommended next step.',
    nextTitle: 'What happens next',
    next: [
      { title: 'Review', body: 'We read your brief and identify the key questions.' },
      { title: 'Conversation', body: 'A short call or written thread to align on goals, constraints, and fit.' },
      { title: 'Proposal', body: 'A clear scope, approach, timeline range, and investment level.' },
    ],
    emailTitle: 'Direct email',
    emailBody: 'Prefer to write? Email works just as well as the form — include as much context as you can.',
    phoneTitle: 'Call us',
    phoneBody: 'Speak to the team directly during business hours.',
    whatsappTitle: 'WhatsApp',
    whatsappLink: 'Message the Kavelis team',
    whatsappBody: 'For quick questions before you commit to a full brief.',
    includeTitle: 'Good to include',
    include: [
      'The business problem, not just the feature list',
      'Who will use the product',
      'Existing tools or systems involved',
      'Any hard deadlines or budget boundaries',
    ],
  },

  founder: {
    eyebrow: 'Leadership',
    title: 'A Message from the Founder',
    name: 'Asad Ullah Khan',
    role: 'Founder & CEO',
    company: 'Kavelis Solutions',
    portraitAlt: 'Portrait of Asad Ullah Khan, Founder & CEO of Kavelis Solutions',
    paragraphs: [
      'I founded Kavelis Solutions with a simple vision: to help businesses turn complex challenges into smarter, practical technology solutions.',
      'I believe technology should do more than support business operations. It should simplify workflows, eliminate repetitive tasks, improve decision-making, and create opportunities for growth.',
      'At Kavelis Solutions, we focus on building custom software, business automation systems, web applications, and intelligent dashboards that solve real business problems.',
      'My goal is to build long-term partnerships based on trust, innovation, transparency, and delivering solutions that create measurable value.',
      'We are committed to helping businesses work smarter, automate better, and scale with confidence.',
    ],
    closing: 'Let’s build something meaningful together.',
  },

  about: {
    seoTitle: 'About',
    seoDescription:
      'Kavelis Solutions is a focused software studio building custom software, automation, dashboards, and e-commerce — led by founder and CEO Asad Ullah Khan.',
    eyebrow: 'About',
    title: 'A software studio for companies that take software seriously',
    description:
      'Kavelis exists to help businesses launch products, automate operations, improve customer experiences, and scale — with software that stays maintainable long after launch.',
    missionEyebrow: 'Mission',
    missionTitle: 'Engineering that serves the business',
    mission: [
      'Too much software is built to impress rather than to work. Kavelis takes the opposite approach: understand the business problem first, design the smallest system that genuinely solves it, then build it with the quality needed to operate it for years.',
      'We work with founders, product teams, and operators — as a focused engineering partner rather than a body shop. That means caring about architecture, delivery discipline, and the day-to-day experience of the people who will use what we ship.',
    ],
    workWithUs: 'Work with us',
    teamEyebrow: 'The team',
    teamTitle: 'Built by the people you talk to',
    teamDescription:
      'Kavelis is a small, senior studio. The team stays close to the work — from the first scoping conversation to support after launch.',
    team: [
      { name: 'Asad Ullah Khan', role: 'Founder & CEO', bio: 'Founded Kavelis Solutions to help businesses turn complex challenges into practical technology solutions.', initials: 'AK' },
      { name: 'Haris Shah', role: 'Senior Full Stack Developer', bio: 'Architecture, full-stack delivery, and client communication — working directly with clients.', initials: 'HS' },
      { name: 'Ihtisham', role: 'Web Developer', bio: 'Building and maintaining the web applications and storefronts Kavelis delivers.', initials: 'I' },
    ],
    principlesEyebrow: 'Principles',
    principlesTitle: 'How we work',
    principlesDescription: 'Four commitments that shape every engagement.',
    principles: [
      { title: 'Clarity over jargon', description: 'Technical decisions are explained in business terms. You should always understand the trade-offs you are paying for.' },
      { title: 'Scope honesty', description: 'If a request will not move the metric it is meant to move, we say so before it becomes an invoice.' },
      { title: 'Craft in the details', description: 'Accessibility, performance, error states, and documentation are part of the work — not extras added at the end.' },
      { title: 'Respect for your time', description: 'Async-first communication, prepared demos, and fewer but better meetings keep projects moving.' },
    ],
    deliveryEyebrow: 'Delivery',
    deliveryTitle: 'Collaboration without the black box',
    deliveryDescription: 'You are never guessing where a project stands. Here is the process every engagement follows.',
    ctaTitle: 'Let’s build something that lasts',
    ctaDescription:
      'Whether you are launching a new product or fixing a system that has outgrown its foundations, we would like to hear about it.',
    ctaSecondary: 'See our portfolio',
  },

  servicesPage: {
    seoTitle: 'Services',
    seoDescription:
      'Custom software, SaaS development, business automation, API integrations, business intelligence dashboards, e-commerce, AI-enabled solutions, and ongoing technical support.',
    eyebrow: 'Services',
    title: 'Product engineering across the full lifecycle',
    description:
      'Kavelis partners with businesses to design, build, integrate, and maintain the software their operations depend on. Each service can stand alone or combine into a longer engagement.',
    viewPricing: 'View pricing',
    viewService: 'View service',
    processEyebrow: 'How we work',
    processTitle: 'One disciplined process, from first call to launch',
    processLink: 'Full process details',
    ctaTitle: 'Not sure which service fits?',
    ctaDescription:
      'Describe the business problem — we will tell you whether it needs a product build, an integration, automation, or something simpler.',
    ctaSecondary: 'See solutions',
  },
}

/** Recursively widens literal types so translations are not pinned to English text. */
type Widen<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends readonly (infer U)[]
      ? Widen<U>[]
      : { [K in keyof T]: Widen<T[K]> }

export type Dictionary = Widen<typeof en>
