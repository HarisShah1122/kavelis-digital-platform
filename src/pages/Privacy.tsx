import { useSeo } from '@/hooks/useSeo'
import { PageHero } from '@/components/ui/PageHero'
import { Container, Section } from '@/components/ui/Section'

const sections = [
  {
    title: 'Information we collect',
    body: 'When you contact Kavelis through the project inquiry form, we collect the information you provide — such as your name, business email, company, service interest, budget range, timeline, and project details. This website does not require accounts and does not intentionally collect sensitive personal data.',
  },
  {
    title: 'How we use information',
    body: 'Submitted information is used only to respond to your inquiry, assess project fit, and — if an engagement follows — to deliver and support the agreed services. We do not sell personal information.',
  },
  {
    title: 'Storage and service providers',
    body: 'Inquiry submissions are processed through the endpoint configured for this deployment (for example, a transactional email service or form provider). The specific provider and data-retention practices should be documented here once the production form integration is finalized.',
  },
  {
    title: 'Cookies and analytics',
    body: 'This website is built to function without non-essential tracking cookies. If analytics or marketing tools are added later, this policy must be updated to describe them before they are enabled.',
  },
  {
    title: 'Your rights',
    body: 'Depending on your jurisdiction, you may have rights regarding access, correction, or deletion of personal data held about you. Contact the Kavelis team through the project inquiry form to make such a request.',
  },
  {
    title: 'Changes to this policy',
    body: 'This policy may be updated as the website and its integrations evolve. The “last updated” date below reflects the most recent revision.',
  },
]

export default function Privacy() {
  useSeo({
    title: 'Privacy Policy',
    description: 'How Kavelis handles information submitted through this website.',
    path: '/privacy',
    noindex: true,
  })

  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description="Last updated: October 2026. This document is a template for review by qualified legal counsel before publication — it is not legal advice."
      />
      <Section>
        <Container className="max-w-3xl">
          <div className="space-y-10">
            {sections.map((section) => (
              <div key={section.title}>
                <h2 className="text-xl font-semibold text-navy-950">{section.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-charcoal-600 sm:text-base">
                  {section.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  )
}
