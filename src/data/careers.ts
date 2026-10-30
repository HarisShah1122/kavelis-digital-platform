/**
 * Open positions at Kavelis.
 *
 * Only roles that are currently approved and open may appear here. When there
 * are none, leave the array empty — the Careers page automatically renders the
 * "No current openings" state, so an expired listing never stays published by
 * accident.
 */
export interface JobListing {
  id: string
  title: string
  /** e.g. Full-time, Contract */
  employmentType: string
  /** e.g. Remote */
  workArrangement: string
  /** e.g. 5+ years */
  experience: string
  summary: string
  responsibilities: string[]
  requiredSkills: string[]
  preferredQualifications: string[]
  /** Short note shown above the apply button. */
  applicationNote: string
}

export const jobListings: JobListing[] = [
  {
    id: 'full-stack-developer-mern',
    title: 'Full Stack Developer — MERN Stack',
    employmentType: 'Full-time',
    workArrangement: 'Remote',
    experience: '5+ years',
    summary:
      'Kavelis is looking for an experienced full stack developer to build and maintain web applications, automation tools, and e-commerce platforms for international clients. You will work across the full lifecycle — from requirements and architecture through delivery and support.',
    responsibilities: [
      'Build and maintain full stack web applications using MongoDB, Express, React, and Node.js',
      'Translate business requirements into technical designs, data models, and API contracts',
      'Develop and integrate REST APIs, third-party services, payment providers, and automation workflows',
      'Write clear, tested, maintainable code and review the work of other developers',
      'Collaborate directly with clients and stakeholders on scope, progress, and trade-offs',
      'Debug, monitor, and improve applications already running in production',
    ],
    requiredSkills: [
      '5+ years of professional full stack development experience',
      'Strong working knowledge of the MERN stack (MongoDB, Express, React, Node.js)',
      'TypeScript or JavaScript ES6+ across frontend and backend',
      'Experience designing relational or document databases and data models',
      'Experience with REST API design, authentication, and third-party integrations',
      'Comfort with Git, code review, and collaborative delivery workflows',
      'Clear written and spoken English for client communication',
    ],
    preferredQualifications: [
      'Experience with e-commerce platforms or payment integrations',
      'Experience with business intelligence, reporting, or data pipelines',
      'Familiarity with cloud deployment, CI/CD, and monitoring',
      'Experience scoping and estimating client projects',
    ],
    applicationNote:
      'Applications are reviewed on a rolling basis. Include a CV and, where available, links to GitHub, a portfolio, or LinkedIn.',
  },
]

export const generalApplicationNote =
  'Do not see your role? If you build reliable software and communicate clearly, we would still like to hear from you.'
