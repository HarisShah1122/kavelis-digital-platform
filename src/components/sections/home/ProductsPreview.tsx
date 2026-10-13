import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { products } from '@/data/products'
import { Badge } from '@/components/ui/Badge'
import { Container, Section, SectionHeader } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'

const statusLabels: Record<string, string> = {
  placeholder: 'Placeholder',
  'in-development': 'In development',
  beta: 'Beta',
  live: 'Live',
}

export function ProductsPreview() {
  return (
    <Section className="border-t border-navy-100 bg-navy-50/40">
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeader
            eyebrow="Products"
            title="A growing product portfolio"
            description="Alongside client work, Kavelis develops its own products. Entries below are editable placeholders until verified product details are published."
          />
          <Reveal>
            <Link
              to="/products"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-electric-700 hover:text-electric-800"
            >
              View products
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {products.map((product, index) => (
            <Reveal key={product.id} delayMs={index * 80}>
              <article className="card card-hover flex h-full flex-col p-7">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl font-semibold text-navy-950">{product.name}</h3>
                  <Badge tone={product.isPlaceholder ? 'warning' : 'blue'}>
                    {statusLabels[product.status] ?? product.status}
                  </Badge>
                </div>
                <p className="mt-2 text-sm font-medium text-electric-700">{product.tagline}</p>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-charcoal-600">
                  {product.description}
                </p>
                <Link
                  to={product.ctaTo}
                  className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-navy-900 hover:text-electric-700"
                >
                  {product.ctaLabel}
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}
