import { useSeo } from '@/hooks/useSeo'
import { PageHero } from '@/components/ui/PageHero'
import { Container, Section } from '@/components/ui/Section'

const sections = [
  {
    title: 'Overview',
    body: 'These Terms of Service govern use of the Kavelis website and, where a separate signed agreement exists, that agreement governs the commercial relationship for project work. This page is a template for review by qualified legal counsel before publication — it is not legal advice.',
  },
  {
    title: 'Website use',
    body: 'You may browse this website and submit project inquiries. You agree not to misuse the site, attempt unauthorized access, or submit false or malicious content through its forms.',
  },
  {
    title: 'No formation of engagement',
    body: 'Submitting an inquiry through this website does not create a client relationship, contract, or obligation for either party. Engagements begin only through a separately agreed and signed proposal or statement of work.',
  },
  {
    title: 'Intellectual property',
    body: 'Website content, branding, and code on this site are the property of Kavelis unless otherwise stated. Client work, product names, and third-party materials remain subject to their respective agreements and licenses.',
  },
  {
    title: 'Disclaimer',
    body: 'The website is provided on an “as is” basis. Information about services and products is general in nature and may change. Specific deliverables, warranties, and liabilities are defined solely in the applicable project agreement.',
  },
  {
    title: 'Limitation of liability',
    body: 'To the maximum extent permitted by law, Kavelis is not liable for indirect or consequential damages arising from use of this website. Any liability related to professional services is governed by the executed project agreement.',
  },
  {
    title: 'Changes',
    body: 'These terms may be revised as the website evolves. Continued use of the site after changes are posted constitutes acceptance of the revised terms.',
  },
]

export default function Terms() {
  useSeo({
    title: 'Terms of Service',
    description: 'Terms governing use of the Kavelis website.',
    path: '/terms',
    noindex: true,
  })

  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of Service"
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
