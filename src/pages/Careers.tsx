import { useState } from 'react'
import { ArrowRight, Briefcase, Code2, Mail, MapPin, Users } from 'lucide-react'
import { jobListings, type JobListing } from '@/data/careers'
import { useCareers } from '@/i18n/data/careers'
import type { Widen } from '@/i18n/en'
import { usePageCopy } from '@/i18n/localize'
import { careersCopy } from '@/i18n/pages/careers'
import { siteConfig, mailtoLink } from '@/lib/site'
import { useSeo } from '@/hooks/useSeo'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { PageHero } from '@/components/ui/PageHero'
import { Container, Section, SectionHeader } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { CtaBand } from '@/components/ui/CtaBand'
import { ApplicationForm, GENERAL_APPLICATION } from '@/components/careers/ApplicationForm'

type Copy = Widen<typeof careersCopy.en>
const whyIcons = [Code2, Users, Briefcase, MapPin]
const arrow = 'h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5'

/**
 * Fallback mailto: draft for candidates who prefer to attach a CV by email.
 * The draft stays in English because it goes to the hiring inbox.
 */
function applyLink(role?: string): string {
  const isGeneral = !role || role === GENERAL_APPLICATION
  const subject = isGeneral ? 'General application — Kavelis' : `Application — ${role}`
  const lines = ['Hello Kavelis hiring team,', '']
  lines.push(isGeneral ? 'I would like to send my details for future opportunities at Kavelis.' : `I would like to apply for the ${role} position.`)
  lines.push('', 'Experience:', '- ', '', 'Relevant links:', '- GitHub: ', '- Portfolio: ', '- LinkedIn: ', '', 'My CV is attached.', '', 'Kind regards,')
  return mailtoLink({ to: siteConfig.careersEmail, subject, body: lines.join('\n') })
}

/** Scrolls the application form into view, respecting reduced-motion settings. */
function scrollToApply(): void {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  document.getElementById('apply')?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
}

function DotList({ items, muted = false }: { items: string[]; muted?: boolean }) {
  return (
    <ul className="mt-4 space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-charcoal-600">
          <span aria-hidden="true" className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${muted ? 'bg-navy-300' : 'bg-gold-500'}`} />
          {item}
        </li>
      ))}
    </ul>
  )
}

function JobCard({ job, copy, onApply }: { job: JobListing; copy: Copy; onApply: () => void }) {
  const meta = [
    { label: copy.employmentType, value: job.employmentType },
    { label: copy.workArrangement, value: job.workArrangement },
    { label: copy.experience, value: job.experience },
  ]
  const heading = 'font-sans text-sm font-bold uppercase tracking-[0.14em] text-navy-950'

  return (
    <article className="card overflow-hidden">
      <div className="border-b border-navy-100 bg-gold-50/70 p-7 sm:p-8">
        <div className="flex flex-wrap items-center gap-3">
          <Badge>{copy.openPosition}</Badge>
          <p className="text-xs font-semibold uppercase tracking-wider text-charcoal-400">
            {job.employmentType} · {job.workArrangement}
          </p>
        </div>
        <h3 className="mt-4 text-2xl font-bold tracking-tight text-navy-950 sm:text-3xl">{job.title}</h3>
        <p className="prose-measure mt-3 text-sm leading-relaxed text-charcoal-600">{job.summary}</p>
        <dl className="mt-6 grid gap-4 sm:grid-cols-3">
          {meta.map((item) => (
            <div key={item.label} className="border-s-2 border-gold-500 ps-4">
              <dt className="text-xs font-semibold uppercase tracking-wide text-charcoal-400">{item.label}</dt>
              <dd className="mt-1 text-sm font-semibold text-navy-950">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="grid gap-8 p-7 sm:p-8 lg:grid-cols-2">
        <div>
          <h4 className={heading}>{copy.responsibilities}</h4>
          <DotList items={job.responsibilities} />
        </div>
        <div className="space-y-8">
          <div>
            <h4 className={heading}>{copy.requiredSkills}</h4>
            <DotList items={job.requiredSkills} />
          </div>
          <div>
            <h4 className={heading}>{copy.preferred}</h4>
            <DotList items={job.preferredQualifications} muted />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 border-t border-navy-100 bg-canvas p-7 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <p className="prose-measure text-sm leading-relaxed text-charcoal-600">
          <strong className="font-semibold text-navy-950">{copy.howToApply}</strong> {job.applicationNote}
        </p>
        <Button onClick={onApply} className="group shrink-0">
          {copy.applyRole}
          <ArrowRight aria-hidden="true" className={arrow} />
        </Button>
      </div>
    </article>
  )
}

export default function Careers() {
  const copy = usePageCopy(careersCopy)
  const { jobs, generalNote } = useCareers()

  useSeo({
    fullTitle: copy.seoFullTitle,
    title: copy.seoTitle,
    description: copy.seoDescription,
    path: '/careers',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Careers at Kavelis | Join Our Team',
      description: 'Explore open positions at Kavelis and apply to build custom software, automation, and e-commerce products.',
      url: 'https://kavelis.llc/careers',
      employer: { '@type': 'Organization', name: 'Kavelis Solutions', email: siteConfig.careersEmail },
      ...(jobListings.length > 0
        ? {
            hasPart: jobListings.map((job) => ({
              '@type': 'JobPosting',
              title: job.title,
              description: job.summary,
              employmentType: job.employmentType.toUpperCase().replace(/-/g, '_'),
              hiringOrganization: { '@type': 'Organization', name: 'Kavelis Solutions', email: siteConfig.careersEmail },
              jobLocationType: 'TELECOMMUTE',
              applicantLocationRequirements: { '@type': 'Country', name: 'Worldwide' },
            })),
          }
        : {}),
    },
  })

  const [applyRole, setApplyRole] = useState<string>(GENERAL_APPLICATION)

  /** Prefills the role (English title, for the inbox) and scrolls to the form. */
  const handleApply = (role: string) => {
    setApplyRole(role)
    scrollToApply()
  }

  return (
    <>
      <PageHero eyebrow={copy.eyebrow} title={copy.title} description={copy.description}>
        <div className="flex flex-wrap gap-3">
          <Button href="#open-positions" className="group">
            {copy.explore}
            <ArrowRight aria-hidden="true" className={arrow} />
          </Button>
          <Button onClick={() => handleApply(GENERAL_APPLICATION)} variant="secondary">
            {copy.sendCv}
            <Mail aria-hidden="true" className="h-4 w-4" />
          </Button>
        </div>
      </PageHero>

      <Section>
        <Container>
          <SectionHeader eyebrow={copy.whyEyebrow} title={copy.whyTitle} description={copy.whyDescription} />
          <div className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2">
            {copy.why.map((item, index) => {
              const Icon = whyIcons[index] ?? Code2
              return (
                <Reveal key={item.title} delayMs={index * 60}>
                  <div className="flex items-start gap-4">
                    <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold-50 text-gold-700">
                      <Icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold text-navy-950">{item.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-charcoal-600">{item.description}</p>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </Container>
      </Section>

      <Section id="open-positions" className="scroll-mt-24 border-y border-navy-100 bg-white">
        <Container>
          <SectionHeader
            eyebrow={copy.positionsEyebrow}
            title={jobs.length > 0 ? copy.hiringTitle : copy.noneTitle}
            description={jobs.length > 0 ? copy.hiringDescription : copy.noneDescription}
          />
          {jobs.length > 0 ? (
            <div className="mt-12 space-y-8">
              {jobs.map((job) => {
                const englishTitle = jobListings.find((item) => item.id === job.id)?.title ?? job.title
                return (
                  <Reveal key={job.id}>
                    <JobCard job={job} copy={copy} onApply={() => handleApply(englishTitle)} />
                  </Reveal>
                )
              })}
            </div>
          ) : (
            <Reveal className="mt-12">
              <div className="card flex flex-col items-start gap-6 p-8 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-xl font-bold text-navy-950">{copy.noneCardTitle}</h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-charcoal-600">{copy.noneCardBody}</p>
                </div>
                <Button onClick={() => handleApply(GENERAL_APPLICATION)} className="shrink-0">
                  {copy.sendCv}
                </Button>
              </div>
            </Reveal>
          )}
        </Container>
      </Section>

      <Section id="apply" className="scroll-mt-24 border-t border-navy-100 bg-white">
        <Container>
          <SectionHeader eyebrow={copy.applyEyebrow} title={copy.applyTitle} description={copy.applyDescription} />
          <div className="mt-12 grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-14">
            <Reveal>
              <ApplicationForm role={applyRole} onRoleChange={setApplyRole} />
            </Reveal>
            <Reveal delayMs={80} className="space-y-6">
              <div className="card p-7 sm:p-8">
                <h3 className="text-lg font-semibold text-navy-950">{copy.includeTitle}</h3>
                <DotList items={copy.include} />
              </div>
              <div className="card p-7 sm:p-8">
                <h3 className="text-lg font-semibold text-navy-950">{copy.noRoleTitle}</h3>
                <p className="mt-3 text-sm leading-relaxed text-charcoal-600">
                  {generalNote} {copy.noRoleBody}
                </p>
                <div className="mt-5 border-t border-navy-100 pt-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-charcoal-400">{copy.recruitmentEmail}</p>
                  <a
                    href={applyLink(applyRole)}
                    className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-gold-700 hover:text-gold-800"
                  >
                    <Mail aria-hidden="true" className="h-4 w-4" />
                    {siteConfig.careersEmail}
                  </a>
                  <p className="mt-3 text-xs leading-relaxed text-charcoal-500">
                    {copy.emailNote}{' '}
                    <a
                      href={`mailto:${siteConfig.businessEmail}`}
                      className="font-medium text-navy-900 underline decoration-gold-300 underline-offset-4 hover:text-gold-800"
                    >
                      {siteConfig.businessEmail}
                    </a>
                    .
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <CtaBand
        title={copy.ctaTitle}
        description={copy.ctaDescription}
        primaryLabel={copy.sendCv}
        primaryHref="#apply"
        secondaryLabel={copy.ctaSecondary}
        secondaryTo="/about"
      />
    </>
  )
}
