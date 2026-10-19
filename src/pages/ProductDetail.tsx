import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check, RefreshCw, Settings2, Wrench } from 'lucide-react'
import {
  formatPrice,
  getMarketplaceCategoryById,
  getMarketplaceProductById,
} from '@/data/marketplace'
import { getServiceById } from '@/data/services'
import { useSeo } from '@/hooks/useSeo'
import { Button } from '@/components/ui/Button'
import { Container, Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { CtaBand } from '@/components/ui/CtaBand'
import { BiDashboard } from '@/components/ui/BiDashboard'
import { ProductThumb } from '@/components/ui/ProductThumb'
import NotFound from '@/pages/NotFound'

export default function ProductDetail() {
  const { productId } = useParams<{ productId: string }>()
  const product = productId ? getMarketplaceProductById(productId) : undefined

  useSeo({
    title: product ? product.name : 'Product not found',
    description: product?.description,
    path: `/products/${productId ?? ''}`,
    noindex: !product,
  })

  if (!product) {
    return <NotFound />
  }

  const category = getMarketplaceCategoryById(product.categoryId)
  const relatedService = getServiceById(product.relatedServiceId)
  const showBiDashboard =
    !product.image && (product.visual === 'analytics' || product.visual === 'dashboard')

  return (
    <>
      <section className="border-b border-navy-100 bg-gold-50">
        <Container className="section-tight">
          <Reveal>
            <Link
              to="/products"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-charcoal-500 transition-colors hover:text-gold-700"
            >
              <ArrowLeft aria-hidden="true" className="h-4 w-4" />
              All products
            </Link>
            <div className="mt-6 grid items-start gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
              <div>
                <p className="eyebrow">{category?.title}</p>
                <h1 className="mt-3 text-4xl font-bold tracking-tight text-navy-950 sm:text-5xl">
                  {product.name}
                </h1>
                <p className="lead mt-5">{product.description}</p>

                <div className="mt-7 rounded-2xl border border-gold-200 bg-white p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-charcoal-400">
                    Starting at
                  </p>
                  <p className="mt-1 text-3xl font-bold tracking-tight text-navy-950">
                    {formatPrice(product.startingPrice)}
                    <span className="ml-2 text-sm font-medium text-charcoal-400">one-time</span>
                  </p>
                  <p className="mt-1.5 text-xs text-charcoal-500">
                    Base scope only. Add-ons, hosting, and optional support are quoted separately.
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Button to={`/contact?product=${product.id}`} className="group">
                    Get This Product
                    <ArrowRight
                      aria-hidden="true"
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    />
                  </Button>
                  {relatedService ? (
                    <Button to={`/services/${relatedService.id}`} variant="secondary">
                      Related service: {relatedService.title}
                    </Button>
                  ) : null}
                </div>
              </div>

              {showBiDashboard ? (
                <BiDashboard className="lg:mt-2" />
              ) : (
                <ProductThumb
                  visual={product.visual}
                  image={product.image}
                  className="h-56 lg:mt-2"
                />
              )}
            </div>
          </Reveal>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="grid gap-8 lg:grid-cols-3">
            <Reveal className="lg:col-span-2">
              <div className="rounded-2xl border border-gold-100 bg-gold-50/70 p-7 sm:p-8">
                <h2 className="text-xl font-bold text-navy-950">The problem it solves</h2>
                <p className="mt-4 text-sm leading-relaxed text-charcoal-600 sm:text-base">
                  {product.problem}
                </p>
              </div>
            </Reveal>

            <Reveal delayMs={80}>
              <div className="card h-full p-7">
                <h2 className="text-xl font-bold text-navy-950">What&apos;s included</h2>
                <ul className="mt-5 space-y-3">
                  {product.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-charcoal-600"
                    >
                      <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <Reveal>
              <div className="card h-full p-7">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gold-50 text-gold-700">
                  <Settings2 aria-hidden="true" className="h-5 w-5" />
                </span>
                <h2 className="mt-4 text-lg font-bold text-navy-950">Customization options</h2>
                <ul className="mt-4 space-y-3">
                  {product.customization.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-charcoal-600"
                    >
                      <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delayMs={80}>
              <div className="card h-full p-7">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gold-50 text-gold-700">
                  <Wrench aria-hidden="true" className="h-5 w-5" />
                </span>
                <h2 className="mt-4 text-lg font-bold text-navy-950">Implementation</h2>
                <ul className="mt-4 space-y-3">
                  {product.implementation.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-charcoal-600"
                    >
                      <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          {/* Pricing detail */}
          <Reveal className="mt-8">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="card p-7">
                <h2 className="text-lg font-bold text-navy-950">Available add-ons</h2>
                <ul className="mt-4 divide-y divide-navy-100">
                  {product.addons.map((addon) => (
                    <li key={addon.name} className="flex items-baseline justify-between gap-4 py-3">
                      <span className="text-sm text-charcoal-600">{addon.name}</span>
                      <span className="shrink-0 text-sm font-semibold text-navy-950">
                        {addon.price}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card p-7">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gold-50 text-gold-700">
                  <RefreshCw aria-hidden="true" className="h-5 w-5" />
                </span>
                <h2 className="mt-4 text-lg font-bold text-navy-950">Recurring costs</h2>
                <p className="mt-1 text-xs text-charcoal-400">
                  Not included in the one-time starting price.
                </p>
                <ul className="mt-4 space-y-3">
                  {product.recurringCosts.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-charcoal-600"
                    >
                      <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      <CtaBand
        title={`Ready to get ${product.name}?`}
        description="Request the product and we will confirm scope, customizations, and the final quote before any work begins."
        secondaryLabel="Compare subscriptions"
        secondaryTo="/pricing"
      />
    </>
  )
}
