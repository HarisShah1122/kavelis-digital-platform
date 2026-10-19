import type { ProductVisual } from '@/types'
import { cn } from '@/lib/utils'

const labels: Record<ProductVisual, string> = {
  dashboard: 'Dashboard',
  storefront: 'Storefront',
  portal: 'Portal',
  automation: 'Workflow',
  analytics: 'Analytics',
  mobile: 'Website',
}

/** Product card visual — real screenshot when available, otherwise a CSS miniature. */
export function ProductThumb({
  visual,
  image,
  className,
}: {
  visual: ProductVisual
  image?: string
  className?: string
}) {
  if (image) {
    return (
      <div
        className={cn(
          'relative h-40 overflow-hidden rounded-xl border border-navy-100 bg-navy-950',
          className,
        )}
        aria-hidden="true"
      >
        <img
          src={image}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
    )
  }

  return (
    <div
      className={cn(
        'relative flex h-40 flex-col overflow-hidden rounded-xl border border-navy-100 bg-navy-950 p-3',
        className,
      )}
      aria-hidden="true"
    >
      <div className="mb-2.5 flex items-center justify-between">
        <div className="flex gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-navy-600" />
          <span className="h-1.5 w-1.5 rounded-full bg-navy-600" />
          <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
        </div>
        <span className="text-[9px] font-semibold uppercase tracking-wider text-navy-400">
          {labels[visual]}
        </span>
      </div>

      {visual === 'dashboard' || visual === 'analytics' ? (
        <div className="flex flex-1 gap-2">
          <div className="flex flex-1 flex-col gap-2">
            <div className="flex gap-2">
              <div className="h-8 flex-1 rounded bg-navy-900 p-1.5">
                <div className="h-1 w-6 rounded bg-navy-600" />
                <div className="mt-1 h-1.5 w-9 rounded bg-gold-500" />
              </div>
              <div className="h-8 flex-1 rounded bg-navy-900 p-1.5">
                <div className="h-1 w-5 rounded bg-navy-600" />
                <div className="mt-1 h-1.5 w-8 rounded bg-navy-400" />
              </div>
            </div>
            <div className="flex flex-1 items-end gap-1 rounded bg-navy-900 p-2">
              {[40, 65, 50, 80, 60, 90, 70].map((h, i) => (
                <div
                  key={i}
                  className={cn('flex-1 rounded-sm', i % 2 === 0 ? 'bg-gold-500' : 'bg-navy-500')}
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
          <div className="w-1/4 rounded bg-navy-900 p-2">
            <div className="mb-1.5 h-1 w-6 rounded bg-navy-600" />
            {[70, 45, 85].map((w, i) => (
              <div key={i} className="mb-1.5 h-1 rounded bg-navy-700" style={{ width: `${w}%` }} />
            ))}
          </div>
        </div>
      ) : null}

      {visual === 'storefront' ? (
        <div className="flex flex-1 gap-2">
          <div className="flex-1 rounded bg-navy-900 p-2">
            <div className="mb-2 h-2 w-10 rounded bg-gold-500" />
            <div className="mb-2 h-1 w-16 rounded bg-navy-500" />
            <div className="grid grid-cols-3 gap-1.5">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="rounded bg-navy-800 p-1">
                  <div className="h-4 rounded bg-navy-700" />
                  <div className="mt-1 h-1 w-3/4 rounded bg-navy-500" />
                </div>
              ))}
            </div>
          </div>
          <div className="w-1/3 rounded bg-navy-900 p-2">
            <div className="mb-1.5 h-1.5 w-8 rounded bg-gold-500" />
            <div className="mb-1 h-1 w-full rounded bg-navy-600" />
            <div className="mb-1 h-1 w-2/3 rounded bg-navy-600" />
            <div className="mt-3 h-3 w-full rounded bg-navy-700" />
          </div>
        </div>
      ) : null}

      {visual === 'portal' ? (
        <div className="flex flex-1 gap-2">
          <div className="w-1/4 rounded bg-navy-900 p-2">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={cn('mb-1.5 h-1 rounded', i === 0 ? 'w-full bg-gold-500' : 'w-3/4 bg-navy-600')}
              />
            ))}
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <div className="h-5 rounded bg-navy-900 p-1.5">
              <div className="h-1.5 w-12 rounded bg-navy-500" />
            </div>
            <div className="flex-1 rounded bg-navy-900 p-2">
              <div className="mb-1.5 h-1 w-10 rounded bg-navy-600" />
              {[0, 1, 2].map((i) => (
                <div key={i} className="mb-1 flex items-center gap-1.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-gold-500" />
                  <div className="h-1 flex-1 rounded bg-navy-700" />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {visual === 'automation' ? (
        <div className="flex flex-1 items-center justify-between gap-1 rounded bg-navy-900 p-3">
          {['Trigger', 'Check', 'Action', 'Notify'].map((step, i) => (
            <div key={step} className="flex items-center gap-1">
              <div
                className={cn(
                  'rounded px-1.5 py-2 text-[8px] font-semibold',
                  i === 0 ? 'bg-gold-500 text-navy-950' : 'bg-navy-800 text-navy-300',
                )}
              >
                {step}
              </div>
              {i < 3 ? <span className="text-[10px] text-navy-500">→</span> : null}
            </div>
          ))}
        </div>
      ) : null}

      {visual === 'mobile' ? (
        <div className="flex flex-1 justify-center gap-2">
          <div className="w-20 rounded-lg border-2 border-navy-700 bg-navy-900 p-1.5">
            <div className="mb-1.5 h-1 w-6 self-center rounded bg-navy-600" />
            <div className="mb-1.5 h-2 w-full rounded bg-gold-500" />
            <div className="mb-1 h-1 w-3/4 rounded bg-navy-500" />
            <div className="mb-1 h-1 w-1/2 rounded bg-navy-600" />
            <div className="mt-2 h-3 w-full rounded bg-navy-700" />
          </div>
          <div className="hidden w-28 flex-col rounded-lg border border-navy-700 bg-navy-900 p-2 sm:flex">
            <div className="mb-1.5 h-1 w-8 rounded bg-gold-500" />
            <div className="mb-1 h-1 w-full rounded bg-navy-600" />
            <div className="mb-1 h-1 w-2/3 rounded bg-navy-600" />
            <div className="mt-auto h-2 w-10 rounded bg-navy-700" />
          </div>
        </div>
      ) : null}
    </div>
  )
}
