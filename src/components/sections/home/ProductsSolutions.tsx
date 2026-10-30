import { ArrowRight, Check, Hammer } from 'lucide-react'
import { Link } from 'react-router-dom'
import { internalProducts } from '@/data/internalProducts'
import { formatPrice, marketplaceProducts } from '@/data/marketplace'
import { Container, Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { Badge } from '@/components/ui/Badge'
import { ProductThumb } from '@/components/ui/ProductThumb'

const featuredIds = [
  'inventory-management-system',
  'business-kpi-dashboard',
  'starter-ecommerce-website',
]

/** Internal products in development, plus featured catalog products. */
export function ProductsSolutions() {
  const featured = featuredIds
    .map((id) => marketplaceProducts.find((product) => product.id === id))
    .filter((product) => product !== undefined)

  return (
    <Section className="border-t border-navy-100 bg-white">
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">Products & solutions</p>
            <h2 className="section-heading mt-3">Own products, ready-made systems</h2>
            <p className="mt-4 text-base leading-relaxed text-charcoal-600">
              Alongside client work, Kavelis builds its own products. Some are available to deploy
              today; others are still being built — and we say which is which.
            </p>
          </Reveal>
          <Reveal>
            <Link
              to="/products"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-700 hover:text-gold-800"
            >
              View all products
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        {/* Internal products — clearly labelled by availability */}
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {internalProducts.map((product, index) => (
            <Reveal key={product.id} delayMs={index * 70} className="h-full">
              <article className="card flex h-full flex-col p-7">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge tone="warning">{product.statusLabel}</Badge>
                  <p className="text-xs font-semibold uppercase tracking-wider text-charcoal-400">
                    {product.category}
                  </p>
                </div>

                <h3 className="mt-4 text-2xl font-bold tracking-tight text-navy-950">
                  {product.name}
                </h3>
                <p className="prose-measure mt-3 flex-1 text-sm leading-relaxed text-charcoal-600">
                  {product.summary}
                </p>

                {product.features.length > 0 ? (
                  <ul className="mt-5 space-y-2">
                    {product.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 text-sm text-charcoal-600"
                      >
                        <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-5 flex items-start gap-2 rounded-lg border border-navy-100 bg-canvas p-3 text-xs leading-relaxed text-charcoal-500">
                    <Hammer aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-600" />
                    <span>
                      Still in development — feature list, screenshots, and demo access are
                      published once the product is ready. No capability claims are made before
                      then.
                    </span>
                  </p>
                )}

                <div className="mt-6 border-t border-navy-100 pt-5">
                  <Link
                    to={`/contact?product=${product.id}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-700 hover:text-gold-800"
                  >
                    Register your interest
                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Catalog products */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((product, index) => (
            <Reveal key={product.id} delayMs={index * 70} className="h-full">
              <article className="card card-hover group flex h-full flex-col overflow-hidden p-0">
                {product.image ? (
                  <div className="h-48 overflow-hidden bg-navy-950">
                    <img
                      src={product.image}
                      alt={`${product.name} preview`}
                      loading="lazy"
                      className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                ) : (
                  <div className="p-6 pb-0">
                    <ProductThumb visual={product.visual} />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-base font-bold tracking-tight text-navy-950">
                    {product.name}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-charcoal-500">
                    {product.description}
                  </p>
                  <div className="mt-5 flex items-center justify-between border-t border-navy-100 pt-4">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-charcoal-400">
                        Starting at
                      </p>
                      <p className="text-lg font-bold text-navy-950">
                        {formatPrice(product.startingPrice)}
                        <span className="ml-1.5 text-xs font-medium text-charcoal-400">
                          one-time
                        </span>
                      </p>
                    </div>
                    <Link
                      to={`/products/${product.id}`}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-gold-700 hover:text-gold-800"
                    >
                      Details
                      <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}
