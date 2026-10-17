import { ArrowRight, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatPrice, marketplaceProducts } from '@/data/marketplace'
import { Container, Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { ProductThumb } from '@/components/ui/ProductThumb'

const featuredIds = [
  'inventory-management-system',
  'business-kpi-dashboard',
  'starter-ecommerce-website',
]

/** Three featured marketplace products with listed starting prices. */
export function ProductsPreview() {
  const featured = featuredIds
    .map((id) => marketplaceProducts.find((product) => product.id === id))
    .filter((product) => product !== undefined)

  return (
    <Section className="border-t border-navy-100 bg-white">
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">Digital products</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy-950 sm:text-4xl">
              Ready-made software, one-time starting prices
            </h2>
            <p className="mt-4 text-base leading-relaxed text-charcoal-600">
              When a full custom build is more than you need, start from a product in the
              catalog — deployed and configured for your business, with the price on the page.
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

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((product, index) => (
            <Reveal key={product.id} delayMs={index * 70} className="h-full">
              <article className="card card-hover flex h-full flex-col p-6">
                <ProductThumb visual={product.visual} />
                <h3 className="mt-5 text-base font-bold tracking-tight text-navy-950">
                  {product.name}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-charcoal-500">
                  {product.description}
                </p>
                <ul className="mt-4 space-y-2">
                  {product.features.slice(0, 2).map((feature) => (
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
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}
