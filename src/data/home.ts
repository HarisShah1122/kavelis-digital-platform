import type { Dictionary } from '@/i18n/en'

/**
 * Non-translatable homepage configuration: ordering, links, and images.
 * All visible copy lives in the i18n dictionaries under matching keys.
 */

export type PillarId = keyof Dictionary['home']['whatWeDo']['pillars']
export type ServiceId = keyof Dictionary['services']

export interface PillarConfig {
  id: PillarId
  to: string
  image: string
  imageWidth: number
  imageHeight: number
  /** object-position utility for the cropped image. */
  imagePosition?: string
  /** Existing service pages grouped under this practice. */
  serviceIds: ServiceId[]
}

export const pillars: PillarConfig[] = [
  {
    id: 'software',
    to: '/services/custom-web-applications',
    image: '/custom-business-website.jpg',
    imageWidth: 1024,
    imageHeight: 1024,
    serviceIds: ['custom-web-applications', 'saas-product-development', 'ai-enabled-solutions'],
  },
  {
    id: 'automation',
    to: '/services/business-automation',
    image: '/business-workflow-automation.jpg',
    imageWidth: 4818,
    imageHeight: 3215,
    serviceIds: ['business-automation', 'api-system-integrations'],
  },
  {
    id: 'data',
    to: '/services/business-intelligence-analytics',
    image: '/sales-overview.png',
    imageWidth: 1170,
    imageHeight: 661,
    imagePosition: 'object-left-top',
    serviceIds: ['business-intelligence-analytics'],
  },
  {
    id: 'management',
    to: '/products',
    image: '/inventory-management-system.jpg',
    imageWidth: 800,
    imageHeight: 533,
    serviceIds: ['ecommerce-development', 'maintenance-support'],
  },
]

/** Technologies the team works with (from published roles and delivered work). */
export const technologies = [
  'React',
  'TypeScript',
  'JavaScript',
  'Node.js',
  'Express',
  'MongoDB',
  'REST APIs',
  'Tailwind CSS',
  'Vite',
  'Power BI',
  'DAX',
  'Data modeling',
]

export type ProcessStepId = keyof Dictionary['home']['process']['steps']
export const processOrder: ProcessStepId[] = ['discover', 'design', 'build', 'launch']

export type ShowcaseProductId = keyof Dictionary['home']['products']['items']
export const showcaseProducts: ShowcaseProductId[] = [
  'hr-employee-management-system',
  'inventory-management-system',
  'business-kpi-dashboard',
  'business-workflow-automation',
]

export const solutionLinks = [
  { id: 'hr', to: '/products/hr-employee-management-system' },
  { id: 'inventory', to: '/products/inventory-management-system' },
  { id: 'kpi', to: '/products/business-kpi-dashboard' },
  { id: 'saas', to: '/services/saas-product-development' },
] as const

export type HeroSlideId = keyof Dictionary['home']['hero']['slides']

export interface HeroSlide {
  id: HeroSlideId
  image: string
  /** object-position utility for the full-bleed crop. */
  imagePosition: string
  to: string
}

export const heroSlides: HeroSlide[] = [
  { id: 'overview', image: '/business-kpi-dashboard.jpg', imagePosition: 'object-center', to: '/portfolio' },
  { id: 'software', image: '/custom-business-website.jpg', imagePosition: 'object-center', to: '/services/custom-web-applications' },
  { id: 'automation', image: '/business-workflow-automation.jpg', imagePosition: 'object-center', to: '/services/business-automation' },
  { id: 'ecommerce', image: '/show-tote.png', imagePosition: 'object-[88%_center]', to: '/portfolio#show-tote' },
]

/** Autoplay interval for the hero slider, in milliseconds. */
export const HERO_INTERVAL = 6500
