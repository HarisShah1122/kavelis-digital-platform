import type { ProcessStep } from '@/types'

/**
 * The four-stage delivery process, used on English-only pages such as the
 * service detail pages. Translated copy for the same steps lives in the i18n
 * dictionaries under `home.process.steps`.
 */
export const processSteps: ProcessStep[] = [
  {
    id: 'discover',
    number: '01',
    title: 'Discover',
    description:
      'Understand your business, objectives, current processes, and challenges — and define what is genuinely worth building.',
  },
  {
    id: 'design',
    number: '02',
    title: 'Design',
    description:
      'Create the solution architecture, user experience, technical direction, and a project roadmap you can review before heavy build.',
  },
  {
    id: 'build',
    number: '03',
    title: 'Build',
    description:
      'Develop, integrate, test, and refine in short cycles — with working software to review at every milestone.',
  },
  {
    id: 'launch',
    number: '04',
    title: 'Launch & Support',
    description:
      'Deploy, hand over documentation and credentials, monitor the system, and keep improving it after release.',
  },
]
