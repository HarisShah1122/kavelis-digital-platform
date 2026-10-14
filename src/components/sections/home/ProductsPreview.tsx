import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { productCategories } from '@/data/productCategories'
import { Container, Section, SectionHeader } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'

export function ProductsPreview() {
  return (
    <Section className="border-t border-navy-100 bg-white">
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeader
            eyebrow="Products"
            title="Product categories we build"
            description="From multi-tenant SaaS to operations dashboards and commerce systems — product-grade software shaped around how your business runs."
          />
          <Reveal>
            <Link
              to="/products"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700 hover:text-teal-800"
            >
              View products
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {productCategories.map((category, index) => (
            <Reveal key={category.id} delayMs={(index % 3) * 60} className="h-full">
              <Link
                to="/products"
                className="card card-hover group flex h-full flex-col p-6"
              >
                <span className="inline-flex items-center justify-center rounded-lg bg-teal-50 px-2 py-1 text-[10px] font-semibold uppercase tracking-widest text-teal-800">
                  Product
                </span>
                <h3 className="mt-4 text-base font-semibold text-navy-950">{category.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-charcoal-600">
                  {category.description}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {category.capabilities.map((capability) => (
                    <li
                      key={capability}
                      className="rounded-full bg-canvas px-2.5 py-1 text-xs font-medium text-charcoal-500"
                    >
                      {capability}
                    </li>
                  ))}
                </ul>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-teal-700">
                  Explore
                  <ArrowRight
                    aria-hidden="true"
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                  />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}
