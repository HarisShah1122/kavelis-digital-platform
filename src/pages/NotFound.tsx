import { Compass } from 'lucide-react'
import { useSeo } from '@/hooks/useSeo'
import { Button } from '@/components/ui/Button'
import { Container, Section } from '@/components/ui/Section'

export default function NotFound() {
  useSeo({
    title: 'Page not found',
    description: 'The page you are looking for does not exist.',
    path: '/404',
    noindex: true,
  })

  return (
    <Section className="flex min-h-[60vh] items-center">
      <Container className="py-10 text-center">
        <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-xl bg-navy-50 text-navy-700">
          <Compass aria-hidden="true" className="h-6 w-6" />
        </span>
        <p className="eyebrow mt-6">404</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-navy-950 sm:text-4xl">
          Page not found
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-charcoal-600">
          The page you are looking for may have been moved or does not exist. Try one of the links
          below instead.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button to="/">Back to home</Button>
          <Button to="/services" variant="secondary">
            Explore services
          </Button>
          <Button to="/contact" variant="secondary">
            Contact
          </Button>
        </div>
      </Container>
    </Section>
  )
}
