import type { LucideIcon } from 'lucide-react'

export interface NavLinkItem {
  label: string
  to: string
}

export interface NavDropdownItem extends NavLinkItem {
  description: string
}

export interface NavItem {
  label: string
  to?: string
  children?: NavDropdownItem[]
}

export interface ServiceOffering {
  title: string
  description: string
}

export interface Service {
  id: string
  title: string
  shortDescription: string
  description: string
  icon: LucideIcon
  outcomes: string[]
  deliverables: string[]
  useCases: string[]
  engagementOptions: string[]
  /** Optional detailed offering breakdown (e.g. Business Intelligence). */
  offerings?: ServiceOffering[]
}

export interface CaseStudy {
  id: string
  title: string
  category: string
  summary: string
  clientLabel: string
  overview: string
  challenge: string
  solution: string
  features: string[]
  approach: string[]
  technologies: string[]
  outcomes: string[]
  /** Optional link to a dashboard export or similar artifact (served from /public). */
  reportUrl?: string
  isPlaceholder: boolean
}

export interface SubscriptionPlan {
  id: string
  name: string
  /** Monthly price in USD, formatted for display (e.g. "$950"). */
  price: string
  priceValue: number
  period: 'month'
  audience: string
  features: string[]
  ctaLabel: string
  featured?: boolean
}

export interface MarketplaceCategory {
  id: string
  title: string
  description: string
}

export type ProductVisual =
  | 'dashboard'
  | 'storefront'
  | 'portal'
  | 'automation'
  | 'analytics'
  | 'mobile'

export interface ProductAddon {
  name: string
  price: string
}

export interface MarketplaceProduct {
  id: string
  name: string
  categoryId: string
  description: string
  problem: string
  features: string[]
  customization: string[]
  implementation: string[]
  /** Starting price in USD for the defined base scope. */
  startingPrice: number
  addons: ProductAddon[]
  recurringCosts: string[]
  visual: ProductVisual
  /** Related Kavelis service for cross-linking. */
  relatedServiceId: string
  /** Proposed pricing example — confirm before launch. */
  isPlaceholder: boolean
}

export interface TrustItem {
  id: string
  title: string
  description: string
}

export interface Industry {
  id: string
  title: string
  description: string
  needs: string[]
  approaches: string[]
}

export interface ProcessStep {
  id: string
  number: string
  title: string
  description: string
}

export interface FaqItem {
  id: string
  question: string
  answer: string
}

export interface Differentiator {
  id: string
  title: string
  description: string
}

export type ContactStatus = 'idle' | 'submitting' | 'success' | 'error' | 'unconfigured'

export interface ContactFormData {
  name: string
  email: string
  company: string
  service: string
  budget: string
  timeline: string
  message: string
}

export type ContactFormErrors = Partial<Record<keyof ContactFormData, string>>

export interface ContactPayload extends ContactFormData {
  /** Prefilled plan or product reference, when arriving from a CTA. */
  reference?: string
  submittedAt: string
}
