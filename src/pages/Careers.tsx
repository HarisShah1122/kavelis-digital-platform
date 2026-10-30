import { ArrowRight, Briefcase, Code2, Mail, MapPin, Users } from 'lucide-react'
import { jobListings, generalApplicationNote, type JobListing } from '@/data/careers'
import { siteConfig, mailtoLink } from '@/lib/site'
import { useSeo } from '@/hooks/useSeo'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { PageHero } from '@/components/ui/PageHero'
import { Container, Section, SectionHeader } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { CtaBand } from '@/components/ui/CtaBand'

const whyWorkHere = [
  {
    icon: Code2,
    title: 'Practical software, real users',
    description:
      'The work is custom software, automation, and e-commerce for businesses that use it every day. You will solve operational problems, not build demos.',
  },
  {
    icon: Users,
    title: 'Full lifecycle ownership',
    description:
      'Engineers take work from requirements and architecture through build, testing, deployment, and support — with the context to understand why a system exists.',
  },
  {
    icon: Briefcase,
    title: 'Modern web technologies',
    description:
      'The stack centres on React, Node.js, TypeScript, and MongoDB, alongside BI and reporting work in Power BI. You will work with current, mainstream tooling.',
  },
  {
    icon: MapPin,
    title: 'Remote-first collaboration',
    description:
      'Work is coordinated asynchronously with written communication and prepared demos, so progress is visible without constant meetings.',
  },
]

function applyLink(jobTitle?: string): string {
  const subject = jobTitle ? `Application — ${jobTitle}` : 'General application — Kavelis'
  const lines = ['Hello Kavelis hiring team,', '']
  if (jobTitle) {
    lines.push(`I would like to apply for the ${jobTitle} position.`)
  } else {
    lines.push('I would like to send my details for future opportunities at Kavelis.')
  }
  lines.push(
    '',
    'Experience:',
    '- ',
    '',
    'Relevant links:',
    '- GitHub: ',
    '- Portfolio: ',
    '- LinkedIn: ',
    '',
    'My CV is attached.',
    '',
    'Kind regards,',
  )
  return mailtoLink({ to: siteConfig.careersEmail, subject, body: lines.join('\n') })
}

function JobCard({ job }: { job: JobListing }) {
  const meta = [
    { label: 'Employment type', value: job.employmentType },
    { label: 'Work arrangement', value: job.workArrangement },
    { label: 'Experience', value: job.experience },
  ]

  return (
    <article className="card overflow-hidden">
      <div className="border-b border-navy-100 bg-gold-50/70 p-7 sm:p-8">
        <div className="flex flex-wrap items-center gap-3">
          <Badge>Open position</Badge>
          <p className="text-xs font-semibold uppercase tracking-wider text-charcoal-400">
            {job.employmentType} · {job.workArrangement}
          </p>
        </div>
        <h3 className="mt-4 text-2xl font-bold tracking-tight text-navy-950 sm:text-3xl">
          {job.title}
        </h3>
        <p className="prose-measure mt-3 text-sm leading-relaxed text-charcoal-600">
          {job.summary}
        </p>

        <dl className="mt-6 grid gap-4 sm:grid-cols-3">
          {meta.map((item) => (
            <div key={item.label} className="border-l-2 border-gold-500 pl-4">
              <dt className="text-xs font-semibold uppercase tracking-wide text-charcoal-400">
                {item.label}
              </dt>
              <dd className="mt-1 text-sm font-semibold text-navy-950">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="grid gap-8 p-7 sm:p-8 lg:grid-cols-2">
        <div>
          <h4 className="text-sm font-bold uppercase tracking-[0.14em] text-navy-950">
            Responsibilities
          </h4>
          <ul className="mt-4 space-y-2.5">
            {job.responsibilities.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 text-sm leading-relaxed text-charcoal-600"
              >
                <span
                  aria-hidden="true"
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-8">
          <div>
            <h4 className="text-sm font-bold uppercase tracking-[0.14em] text-navy-950">
              Required skills
            </h4>
            <ul className="mt-4 space-y-2.5">
              {job.requiredSkills.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm leading-relaxed text-charcoal-600"
                >
                  <span
                    aria-hidden="true"
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-[0.14em] text-navy-950">
              Preferred qualifications
            </h4>
            <ul className="mt-4 space-y-2.5">
              {job.preferredQualifications.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm leading-relaxed text-charcoal-600"
                >
                  <span
                    aria-hidden="true"
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-navy-300"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 border-t border-navy-100 bg-canvas p-7 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <p className="prose-measure text-sm leading-relaxed text-charcoal-600">
          <strong className="font-semibold text-navy-950">How to apply:</strong>{' '}
          {job.applicationNote}
        </p>
        <Button href={applyLink(job.title)} className="shrink-0 group">
          Apply for this role
          <ArrowRight
            aria-hidden="true"
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
          />
        </Button>
      </div>
    </article>
  )
}

export default function Careers() {
  useSeo({
    fullTitle: 'Careers at Kavelis | Join Our Team',
    title: 'Careers',
    description:
      'Build meaningful digital products at Kavelis — custom software, business automation, and e-commerce for real business problems. Explore open positions and apply.',
    path: '/careers',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Careers at Kavelis | Join Our Team',
      description:
        'Explore open positions at Kavelis and apply to build custom software, automation, and e-commerce products.',
      url: 'https://kavelis.llc/careers',
      employer: { '@type': 'Organization', name: 'Kavelis', email: siteConfig.careersEmail },
      ...(jobListings.length > 0
        ? {
            hasPart: jobListings.map((job) => ({
              '@type': 'JobPosting',
              title: job.title,
              description: job.summary,
              employmentType: job.employmentType.toUpperCase().replace(/-/g, '_'),
              hiringOrganization: {
                '@type': 'Organization',
                name: 'Kavelis',
                email: siteConfig.careersEmail,
              },
              jobLocationType: 'TELECOMMUTE',
              applicantLocationRequirements: {
                '@type': 'Country',
                name: 'Worldwide',
              },
            })),
          }
        : {}),
    },
  })

  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Build Your Future with Kavelis"
        description="Work on meaningful digital products, solve real business challenges, and help build software that makes work smarter."
      >
        <div className="flex flex-wrap gap-3">
          <Button href="#open-positions" className="group">
            Explore Open Positions
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            />
          </Button>
          <Button href={applyLink()} variant="secondary">
            Send Your CV
            <Mail aria-hidden="true" className="h-4 w-4" />
          </Button>
        </div>
      </PageHero>

      <Section>
        <Container>
          <SectionHeader
            eyebrow="Why work with Kavelis"
            title="Serious engineering work, explained in plain language"
            description="Kavelis is a focused software studio. These are the honest facts about what the work is — we do not publish perks, culture claims, or development guarantees we cannot stand behind."
          />

          <div className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2">
            {whyWorkHere.map((item, index) => {
              const Icon = item.icon
              return (
                <Reveal key={item.title} delayMs={index * 60}>
                  <div className="flex items-start gap-4">
                    <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold-50 text-gold-700">
                      <Icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold text-navy-950">{item.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-charcoal-600">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </Container>
      </Section>

      <Section id="open-positions" className="border-y border-navy-100 bg-white">
        <Container>
          <SectionHeader
            eyebrow="Open positions"
            title={jobListings.length > 0 ? 'Roles we are hiring for' : 'No current openings'}
            description={
              jobListings.length > 0
                ? 'Each listing states exactly what the role involves. Applications are reviewed as they arrive.'
                : 'There are no approved openings at the moment. If you build reliable software and communicate clearly, we would still like to receive your details for future roles.'
            }
          />

          {jobListings.length > 0 ? (
            <div className="mt-12 space-y-8">
              {jobListings.map((job) => (
                <Reveal key={job.id}>
                  <JobCard job={job} />
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal className="mt-12">
              <div className="card flex flex-col items-start gap-6 p-8 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-xl font-bold text-navy-950">No open positions today</h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-charcoal-600">
                    We do not publish roles that are not live. Send your CV and links anyway —
                    strong engineers are contacted when a matching role opens.
                  </p>
                </div>
                <Button href={applyLink()} className="shrink-0">
                  Send Your CV
                </Button>
              </div>
            </Reveal>
          )}
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <Reveal>
              <p className="eyebrow">General application</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy-950 sm:text-4xl">
                No suitable role listed?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-charcoal-600">
                {generalApplicationNote} Send an open application and we will keep your details
                for roles that match your experience.
              </p>
              <div className="mt-6">
                <Button href={applyLink()} className="group">
                  Send an open application
                  <ArrowRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  />
                </Button>
              </div>
            </Reveal>

            <Reveal delayMs={80} className="card p-7 sm:p-8">
              <h3 className="text-lg font-semibold text-navy-950">What to include</h3>
              <ul className="mt-4 space-y-3">
                {[
                  'Your CV, attached to the email',
                  'Links to GitHub, a portfolio, or LinkedIn where available',
                  'A short note on the kind of work you do best',
                  'Your availability and preferred work arrangement',
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm leading-relaxed text-charcoal-600"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500"
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-6 border-t border-navy-100 pt-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-charcoal-400">
                  Recruitment email
                </p>
                <a
                  href={`mailto:${siteConfig.careersEmail}`}
                  className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-gold-700 hover:text-gold-800"
                >
                  <Mail aria-hidden="true" className="h-4 w-4" />
                  {siteConfig.careersEmail}
                </a>
                <p className="mt-3 text-xs leading-relaxed text-charcoal-500">
                  This address is monitored for hiring only. For project inquiries, write to{' '}
                  <a
                    href={`mailto:${siteConfig.businessEmail}`}
                    className="font-medium text-navy-900 underline decoration-gold-300 underline-offset-4 hover:text-gold-800"
                  >
                    {siteConfig.businessEmail}
                  </a>
                  .
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <CtaBand
        title="Interested in working with us long-term?"
        description="Tell us what you build best. We keep in touch with engineers whose experience matches the work we take on."
        primaryLabel="Send Your CV"
        primaryHref={mailtoLink({
          to: siteConfig.careersEmail,
          subject: 'General application — Kavelis',
        })}
        secondaryLabel="About Kavelis"
        secondaryTo="/about"
      />
    </>
  )
}
