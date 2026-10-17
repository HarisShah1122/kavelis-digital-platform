import { Check } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { subscriptionPlans } from '@/data/pricing'
import { cn } from '@/lib/utils'

/**
 * Subscription plan comparison. Used on /pricing and the homepage.
 * CTA links preselect the plan on /contact via ?plan=<id>.
 */
export function PricingComparison({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'grid gap-6 lg:grid-cols-3 lg:items-stretch',
        className,
      )}
    >
      {subscriptionPlans.map((plan) => (
        <article
          key={plan.id}
          className={cn(
            'flex flex-col rounded-2xl border bg-white p-6 sm:p-8',
            plan.featured
              ? 'border-gold-500 shadow-lift lg:shadow-lift'
              : 'border-navy-100 shadow-card',
          )}
        >
          <div className="mb-5">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-lg font-bold text-navy-950">{plan.name}</h3>
              {plan.featured ? (
                <span className="rounded-full bg-gold-500 px-3 py-1 text-xs font-semibold text-navy-950">
                  Most chosen
                </span>
              ) : null}
            </div>
            <p className="mt-1 text-sm text-charcoal-500">{plan.audience}</p>
          </div>

          <div className="mb-6 border-b border-navy-100 pb-6">
            <p className="flex items-baseline gap-1.5">
              <span className="text-4xl font-bold tracking-tight text-navy-950">{plan.price}</span>
              <span className="text-sm font-medium text-charcoal-500">/month</span>
            </p>
            <p className="mt-1.5 text-xs text-charcoal-400">USD · billed monthly</p>
          </div>

          <ul className="mb-8 flex-1 space-y-3">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2.5 text-sm text-charcoal-600">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" aria-hidden="true" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <Button
            to={`/contact?plan=${plan.id}`}
            variant={plan.featured ? 'primary' : 'secondary'}
            className="w-full"
          >
            {plan.ctaLabel}
          </Button>
        </article>
      ))}
    </div>
  )
}
