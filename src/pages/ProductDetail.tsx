import type { ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check, RefreshCw, Settings2, Wrench } from 'lucide-react'
import { formatPrice } from '@/data/marketplace'
import { useMarketplace } from '@/i18n/data/marketplace'
import { useServices } from '@/i18n/data/services'
import { usePageCopy } from '@/i18n/localize'
import { productsCopy } from '@/i18n/pages/products'
import { useSeo } from '@/hooks/useSeo'
import { Button } from '@/components/ui/Button'
import { Container, Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { CtaBand } from '@/components/ui/CtaBand'
import { Picture } from '@/components/ui/Picture'
import NotFound from '@/pages/NotFound'

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-charcoal-600">
          <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
          {item}
        </li>
      ))}
    </ul>
  )
}

function IconCard({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <div className="card h-full p-7">
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gold-50 text-gold-700">{icon}</span>
      <h2 className="mt-4 font-sans text-lg font-bold text-navy-950">{title}</h2>
      {children}
    </div>
  )
}

export default function ProductDetail() {
  const { productId } = useParams<{ productId: string }>()
  const copy = usePageCopy(productsCopy)
  const { getProduct, getCategory } = useMarketplace()
  const services = useServices()
  const product = productId ? getProduct(productId) : undefined

  useSeo({
    title: product ? product.name : copy.notFound,
    description: product?.description,
    path: `/products/${productId ?? ''}`,
    noindex: !product,
  })

  if (!product) return <NotFound />

  const category = getCategory(product.categoryId)
  const relatedService = services.find((service) => service.id === product.relatedServiceId)

  return (
    <>
      <section className="border-b border-navy-100 bg-gold-50">
        <Container className="section-tight">
          <Reveal>
            <Link
              to="/products"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-charcoal-500 transition-colors hover:text-gold-700"
            >
              <ArrowLeft aria-hidden="true" className="h-4 w-4 rtl:-scale-x-100" />
              {copy.allProducts}
            </Link>
            <div className="mt-6 grid items-start gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
              <div>
                <p className="eyebrow">{category?.title}</p>
                <h1 className="mt-3 text-4xl font-bold tracking-tight text-navy-950 sm:text-5xl">{product.name}</h1>
                <p className="lead mt-5">{product.description}</p>

                <div className="mt-7 rounded-2xl border border-gold-200 bg-white p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-charcoal-400">{copy.startingAt}</p>
                  <p className="mt-1 text-3xl font-bold tracking-tight text-navy-950">
                    <span dir="ltr">{formatPrice(product.startingPrice)}</span>
                    <span className="ms-2 text-sm font-medium text-charcoal-400">{copy.oneTime}</span>
                  </p>
                  <p className="mt-1.5 text-xs text-charcoal-500">{copy.baseScope}</p>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Button to={`/contact?product=${product.id}`} className="group">
                    {copy.getProduct}
                    <ArrowRight
                      aria-hidden="true"
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5"
                    />
                  </Button>
                  {relatedService ? (
                    <Button to={`/services/${relatedService.id}`} variant="secondary">
                      {copy.relatedService} {relatedService.title}
                    </Button>
                  ) : null}
                </div>
              </div>

              {product.image ? (
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-navy-950 lg:mt-2">
                  <Picture
                    src={product.image}
                    alt={copy.previewAlt(product.name)}
                    loading="eager"
                    sizes="(min-width: 1024px) 480px, 100vw"
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : null}
            </div>
          </Reveal>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="grid gap-8 lg:grid-cols-3">
            <Reveal className="lg:col-span-2">
              <div className="rounded-2xl border border-gold-100 bg-gold-50/70 p-7 sm:p-8">
                <h2 className="font-sans text-xl font-bold text-navy-950">{copy.problem}</h2>
                <p className="mt-4 text-sm leading-relaxed text-charcoal-600 sm:text-base">{product.problem}</p>
              </div>
            </Reveal>
            <Reveal delayMs={80}>
              <div className="card h-full p-7">
                <h2 className="font-sans text-xl font-bold text-navy-950">{copy.included}</h2>
                <CheckList items={product.features} />
              </div>
            </Reveal>
          </div>

          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <Reveal>
              <IconCard icon={<Settings2 aria-hidden="true" className="h-5 w-5" />} title={copy.customization}>
                <CheckList items={product.customization} />
              </IconCard>
            </Reveal>
            <Reveal delayMs={80}>
              <IconCard icon={<Wrench aria-hidden="true" className="h-5 w-5" />} title={copy.implementation}>
                <CheckList items={product.implementation} />
              </IconCard>
            </Reveal>
          </div>

          <Reveal className="mt-8">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="card p-7">
                <h2 className="font-sans text-lg font-bold text-navy-950">{copy.addons}</h2>
                <ul className="mt-4 divide-y divide-navy-100">
                  {product.addons.map((addon) => (
                    <li key={addon.name} className="flex items-baseline justify-between gap-4 py-3">
                      <span className="text-sm text-charcoal-600">{addon.name}</span>
                      <span className="shrink-0 text-sm font-semibold text-navy-950">{addon.price}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <IconCard icon={<RefreshCw aria-hidden="true" className="h-5 w-5" />} title={copy.recurring}>
                <p className="mt-1 text-xs text-charcoal-400">{copy.recurringNote}</p>
                <CheckList items={product.recurringCosts} />
              </IconCard>
            </div>
          </Reveal>
        </Container>
      </Section>

      <CtaBand
        title={copy.detailCtaTitle(product.name)}
        description={copy.detailCtaDescription}
        primaryLabel={copy.getProduct}
        primaryTo={`/contact?product=${product.id}`}
        secondaryLabel={copy.detailCtaSecondary}
        secondaryTo="/pricing"
      />
    </>
  )
}
