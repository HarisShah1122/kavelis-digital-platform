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
}

export type ProductStatus = 'placeholder' | 'in-development' | 'beta' | 'live'

export interface Product {
  id: string
  name: string
  tagline: string
  description: string
  problem: string
  features: string[]
  targetUsers: string[]
  status: ProductStatus
  ctaLabel: string
  ctaTo: string
  isPlaceholder: boolean
}

export interface CaseStudy {
  id: string
  title: string
  clientLabel: string
  challenge: string
  solution: string
  technologies: string[]
  outcomes: string[]
  isPlaceholder: boolean
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
  submittedAt: string
}
