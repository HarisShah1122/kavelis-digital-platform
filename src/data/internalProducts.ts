/**
 * Kavelis internal products.
 *
 * Honesty rules for this file:
 * - Only list a product publicly when there is something real to show.
 * - Never publish feature lists, screenshots, integrations, customer counts, or
 *   production-readiness claims that have not been verified.
 * - Products still being built are published with `status: 'in-development'`,
 *   which renders a clearly labelled "in development" state and an interest CTA
 *   instead of a demo request.
 *
 * When a product reaches a publishable state, add its verified feature list,
 * screenshots, and an appropriate status here — the pages pick it up directly.
 */
export type InternalProductStatus = 'in-development' | 'available-for-demo'

export interface InternalProduct {
  id: string
  name: string
  /** Product category, used for grouping on the homepage and products page. */
  category: string
  /** One-line description of the problem domain. No capability claims. */
  summary: string
  status: InternalProductStatus
  statusLabel: string
  /** Verified feature list. Empty until capabilities are confirmed for publication. */
  features: string[]
  /** Who the product is intended for, once verified. */
  intendedUsers?: string
  /** Screenshot served from /public. Only add genuine captures. */
  image?: string
}

export const internalProducts: InternalProduct[] = [
  {
    id: 'fleetflow-tms',
    name: 'FleetFlow TMS',
    category: 'Transport & logistics',
    summary:
      'A transport management system in the Kavelis product pipeline, aimed at fleet operators who need trips, vehicles, and operating costs in one place instead of separate spreadsheets.',
    status: 'in-development',
    statusLabel: 'In development',
    features: [],
    intendedUsers: 'Fleet operators and transport businesses',
  },
  {
    id: 'peoplenexus-hrms',
    name: 'PeopleNexus HRMS',
    category: 'Human resources',
    summary:
      'A human resource management system in the Kavelis product pipeline, aimed at teams that want employee records, attendance, and routine HR workflows handled in a single internal tool.',
    status: 'in-development',
    statusLabel: 'In development',
    features: [],
    intendedUsers: 'HR teams and growing businesses',
  },
]

export const getInternalProductById = (id: string): InternalProduct | undefined =>
  internalProducts.find((product) => product.id === id)
