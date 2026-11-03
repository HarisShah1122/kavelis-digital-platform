import { caseStudies } from '@/data/caseStudies'
import { portfolioEntries } from '@/data/portfolio'
import type { Dictionary } from '@/i18n/en'

export type WorkItemId = keyof Dictionary['home']['work']['items']

export interface WorkSlide {
  id: WorkItemId
  image: string
  /** Browser-bar label for the screenshot frame. */
  frameLabel: string
  to: string
  externalUrl?: string
}

/** Featured work — sourced from the verified portfolio and case-study data. */
export const workSlides: WorkSlide[] = [
  ...portfolioEntries.map((entry) => ({
    id: entry.id as WorkItemId,
    image: entry.image ?? '',
    frameLabel: entry.brandUrl.replace(/^https?:\/\//, '').replace(/\/$/, ''),
    to: `/portfolio#${entry.id}`,
    externalUrl: entry.brandUrl,
  })),
  ...caseStudies.map((study) => ({
    id: study.id as WorkItemId,
    image: study.image ?? '',
    frameLabel: 'Power BI',
    to: `/work/${study.id}`,
  })),
].filter((slide) => slide.image)
