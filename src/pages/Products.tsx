import { useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import {
  formatPrice,
  getMarketplaceCategoryById,
  marketplaceCategories,
  marketplaceProducts,
} from '@/data/marketplace'
import { useSeo } from '@/hooks/useSeo'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { PageHero } from '@/components/ui/PageHero'
import { Container, Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { CtaBand } from '@/components/ui/CtaBand'
import { ProductThumb } from '@/components/ui/ProductThumb'
import { cn } from '@/lib/utils'

const ALL = 'all'

export default function Products() {
  useSeo({
    title: 'Digital Products',
    description:
      'Ready-made digital products — inventory systems, e-commerce stores, BI dashboards, and workflow automation — with one-time starting prices from $199.',
    path: '/products',
  })

  const [activeCategory, setActiveCategory] = useState(ALL)

  const filtered =
    activeCategory === ALL
      ? marketplaceProducts
      : marketplaceProducts.filter((product) => product.categoryId === activeCategory)

  const filterButtons = [
    { id: ALL, label: 'All products', count: marketplaceProducts.length },
    ...marketplaceCategories.map((category) => ({
      id: category.id,
      label: category.title,
      count: marketplaceProducts.filter((p) => p.categoryId === category.id).length,
    })),
  ]

  return (
    <>
      <PageHero
        eyebrow="Digital products"
        title="Ready-made software with listed starting prices"
        description="When a custom build is more than you need, start from a proven product. Each product has a defined base scope, a one-time starting price, and clear customization options — no subscription required to own it."
      >
        <div className="flex flex-wrap gap-3">
          <Button to="/pricing" className="group">
            Compare with subscriptions
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            />
          </Button>
        </div>
      </PageHero>

      {/* Category intro — editorial row, not cards */}
      <Section className="border-b border-navy-100 bg-white">
        <Container>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {marketplaceCategories.map((category) => {
              const count = marketplaceProducts.filter(
                (product) => product.categoryId === category.id,
              ).length
              return (
                <div key={category.id} className="border-l-2 border-gold-500 pl-4">
                  <h2 className="text-sm font-bold text-navy-950">{category.title}</h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-charcoal-500">
                    {category.description}
                  </p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-charcoal-400">
                    {count} product{count === 1 ? '' : 's'}
                  </p>
                </div>
              )
            })}
          </div>
        </Container>
      </Section>

      {/* Filters + grid */}
      <Section>
        <Container>
          <Reveal className="mb-8">
            <div
              className="flex flex-wrap gap-2"
              role="group"
              aria-label="Filter products by category"
            >
              {filterButtons.map((button) => (
                <button
                  key={button.id}
                  type="button"
                  onClick={() => setActiveCategory(button.id)}
                  aria-pressed={activeCategory === button.id}
                  className={cn(
                    'rounded-full border px-4 py-2 text-sm font-semibold transition-colors',
                    activeCategory === button.id
                      ? 'border-navy-950 bg-navy-950 text-white'
                      : 'border-navy-100 bg-white text-charcoal-600 hover:border-gold-300 hover:text-navy-950',
                  )}
                >
                  {button.label}
                  <span
                    className={cn(
                      'ml-1.5 text-xs',
                      activeCategory === button.id ? 'text-gold-400' : 'text-charcoal-400',
                    )}
                  >
                    {button.count}
                  </span>
                </button>
              ))}
            </div>
          </Reveal>

          {activeCategory !== ALL ? (
            <p className="mb-6 text-sm text-charcoal-500">
              {getMarketplaceCategoryById(activeCategory)?.description}
            </p>
          ) : null}

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((product, index) => (
              <Reveal key={product.id} delayMs={(index % 3) * 60} className="h-full">
                <article className="card card-hover flex h-full flex-col p-6">
                  <ProductThumb visual={product.visual} />
                  <div className="mt-5 flex items-start justify-between gap-3">
                    <h3 className="text-base font-bold leading-snug tracking-tight text-navy-950">
                      {product.name}
                    </h3>
                    {product.isPlaceholder ? <Badge tone="warning">Example</Badge> : null}
                  </div>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-charcoal-500">
                    {product.description}
                  </p>

                  <ul className="mt-4 space-y-2">
                    {product.features.slice(0, 3).map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 text-xs leading-relaxed text-charcoal-600"
                      >
                        <Check aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-600" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex items-center justify-between border-t border-navy-100 pt-4">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-charcoal-400">
                        Starting at
                      </p>
                      <p className="text-lg font-bold text-navy-950">
                        {formatPrice(product.startingPrice)}
                        <span className="ml-1 text-xs font-medium text-charcoal-400">one-time</span>
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <Button to={`/products/${product.id}`} variant="secondary" className="flex-1">
                      View details
                    </Button>
                    <Button to={`/contact?product=${product.id}`} className="flex-1">
                      Get This Product
                    </Button>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* How products work */}
      <Section className="border-y border-navy-100 bg-white">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
            <Reveal>
              <p className="eyebrow">How it works</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy-950 sm:text-4xl">
                From product page to working software
              </h2>
              <p className="mt-4 text-base leading-relaxed text-charcoal-600">
                Products are not instant downloads. Each one is deployed, configured, and
                customized for your business — the listed starting price covers the defined base
                scope.
              </p>
            </Reveal>
            <ol className="space-y-4">
              {[
                {
                  title: 'Pick a product and request it',
                  description:
                    'Use “Get This Product” on any product page. Your selection is attached to the inquiry automatically.',
                },
                {
                  title: 'Confirm scope and customizations',
                  description:
                    'We walk through the base scope, your required customizations, add-ons, and any recurring costs (hosting, licenses) before anything is built.',
                },
                {
                  title: 'Deploy, configure, hand over',
                  description:
                    'The product is deployed, configured with your data, and handed over with documentation and training.',
                },
              ].map((step, index) => (
                <Reveal key={step.title} delayMs={index * 70}>
                  <li className="flex gap-4 rounded-2xl border border-navy-100 bg-canvas p-5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy-950 text-sm font-bold text-gold-400">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-navy-950">{step.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-charcoal-600">
                        {step.description}
                      </p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      <CtaBand
        title="Need something the catalog does not cover?"
        description="Custom builds and monthly subscriptions sit alongside the product catalog. Tell us the problem — we will recommend the model that actually fits."
        secondaryLabel="See pricing"
        secondaryTo="/pricing"
      />
    </>
  )
}
