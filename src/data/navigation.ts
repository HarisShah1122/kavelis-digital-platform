import { services } from '@/data/services'
import type { NavItem } from '@/types'

export const navItems: NavItem[] = [
  {
    label: 'Services',
    to: '/services',
    children: services.map((service) => ({
      label: service.title,
      to: `/services/${service.id}`,
      description: service.shortDescription,
    })),
  },
  { label: 'Products', to: '/products' },
  { label: 'Work', to: '/work' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'About', to: '/about' },
]

export const footerServiceLinks = services.map((service) => ({
  label: service.title,
  to: `/services/${service.id}`,
}))

export const footerCompanyLinks = [
  { label: 'Products', to: '/products' },
  { label: 'Work', to: '/work' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Solutions', to: '/solutions' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export const footerLegalLinks = [
  { label: 'Privacy Policy', to: '/privacy' },
  { label: 'Terms of Service', to: '/terms' },
]
