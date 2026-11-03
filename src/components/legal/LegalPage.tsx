import { useSeo } from '@/hooks/useSeo'
import { usePageCopy } from '@/i18n/localize'
import { miscCopy } from '@/i18n/pages/misc'
import { PageHero } from '@/components/ui/PageHero'
import { Container, Section } from '@/components/ui/Section'

/** Shared layout for the Privacy Policy and Terms of Service pages. */
export function LegalPage({ doc, path }: { doc: 'privacy' | 'terms'; path: string }) {
  const legal = usePageCopy(miscCopy).legal
  const page = legal[doc]

  useSeo({ title: page.title, description: page.seoDescription, path, noindex: true })

  return (
    <>
      <PageHero eyebrow={legal.eyebrow} title={page.title} description={legal.updated} />
      <Section>
        <Container className="max-w-3xl">
          <div className="space-y-10">
            {page.sections.map((section) => (
              <div key={section.title}>
                <h2 className="font-sans text-xl font-semibold text-navy-950">{section.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-charcoal-600 sm:text-base">{section.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  )
}
