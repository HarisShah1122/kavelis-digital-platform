import { Compass } from 'lucide-react'
import { useSeo } from '@/hooks/useSeo'
import { usePageCopy } from '@/i18n/localize'
import { miscCopy } from '@/i18n/pages/misc'
import { Button } from '@/components/ui/Button'
import { Container, Section } from '@/components/ui/Section'

export default function NotFound() {
  const copy = usePageCopy(miscCopy).notFound

  useSeo({ title: copy.seoTitle, description: copy.seoDescription, path: '/404', noindex: true })

  return (
    <Section className="flex min-h-[60vh] items-center">
      <Container className="py-10 text-center">
        <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gold-50 text-gold-800">
          <Compass aria-hidden="true" className="h-6 w-6" />
        </span>
        <p className="eyebrow mt-6 justify-center">404</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-navy-950 sm:text-4xl">{copy.title}</h1>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-charcoal-600">{copy.description}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button to="/">{copy.home}</Button>
          <Button to="/services" variant="secondary">
            {copy.services}
          </Button>
          <Button to="/contact" variant="secondary">
            {copy.contact}
          </Button>
        </div>
      </Container>
    </Section>
  )
}
