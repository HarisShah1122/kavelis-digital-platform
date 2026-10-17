import { cn } from '@/lib/utils'

/**
 * CSS/SVG dashboard preview with illustrative sample data.
 * Used for BI service showcase and Data & BI marketplace products.
 * No claims are made — all figures are labeled as sample data.
 */
export function BiDashboard({ className }: { className?: string }) {
  const kpis = [
    { label: 'Revenue', value: '$84.2k', delta: '+12%' },
    { label: 'Orders', value: '1,248', delta: '+6%' },
    { label: 'Avg. order', value: '$67', delta: '-2%' },
  ]

  const bars = [42, 58, 47, 72, 65, 81, 74, 90]
  const barLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']
  const maxBar = Math.max(...bars)

  const points = '0,64 40,52 80,58 120,34 160,40 200,22 240,28 280,12'

  return (
    <div
      className={cn(
        'overflow-hidden rounded-2xl border border-navy-800 bg-navy-950 shadow-lift',
        className,
      )}
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-2 border-b border-navy-800 bg-navy-900 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-navy-700" />
        <span className="h-2.5 w-2.5 rounded-full bg-navy-700" />
        <span className="h-2.5 w-2.5 rounded-full bg-navy-700" />
        <span className="ml-3 truncate text-xs text-navy-400">app.example.com/dashboard</span>
      </div>

      <div className="space-y-5 p-5 sm:p-6">
        {/* KPI row */}
        <div className="grid grid-cols-3 gap-3">
          {kpis.map((kpi) => (
            <div key={kpi.label} className="rounded-lg border border-navy-800 bg-navy-900 p-3">
              <p className="text-[11px] uppercase tracking-wide text-navy-400">{kpi.label}</p>
              <p className="mt-1 text-lg font-bold text-white sm:text-xl">{kpi.value}</p>
              <p
                className={cn(
                  'mt-0.5 text-[11px] font-medium',
                  kpi.delta.startsWith('+') ? 'text-gold-400' : 'text-navy-400',
                )}
              >
                {kpi.delta} vs last period
              </p>
            </div>
          ))}
        </div>

        <div className="grid gap-5 md:grid-cols-5">
          {/* Bar chart */}
          <div className="rounded-lg border border-navy-800 bg-navy-900 p-4 md:col-span-3">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs font-semibold text-white">Monthly revenue</p>
              <div className="flex items-center gap-3 text-[10px] text-navy-400">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-sm bg-gold-500" /> This year
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-sm bg-navy-500" /> Last year
                </span>
              </div>
            </div>
            <div className="flex h-32 items-end gap-2 sm:gap-3">
              {bars.map((bar, index) => (
                <div key={barLabels[index]} className="flex flex-1 flex-col items-center gap-1.5">
                  <div className="flex w-full flex-1 items-end gap-0.5">
                    <div
                      className="flex-1 rounded-t-sm bg-gold-500"
                      style={{ height: `${(bar / maxBar) * 100}%` }}
                    />
                    <div
                      className="flex-1 rounded-t-sm bg-navy-500"
                      style={{ height: `${((bar * 0.78) / maxBar) * 100}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-navy-400">{barLabels[index]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Trend + breakdown */}
          <div className="space-y-5 md:col-span-2">
            <div className="rounded-lg border border-navy-800 bg-navy-900 p-4">
              <p className="mb-2 text-xs font-semibold text-white">Active customers</p>
              <svg viewBox="0 0 280 72" className="h-16 w-full" aria-hidden="true">
                <polyline
                  points={points}
                  fill="none"
                  stroke="#C58D3E"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
                <polyline
                  points={`${points} 280,72 0,72`}
                  fill="url(#trendFill)"
                  stroke="none"
                />
                <defs>
                  <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#C58D3E" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#C58D3E" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className="rounded-lg border border-navy-800 bg-navy-900 p-4">
              <p className="mb-2.5 text-xs font-semibold text-white">Channel mix</p>
              <ul className="space-y-2">
                {[
                  { name: 'Direct', pct: 46 },
                  { name: 'Search', pct: 32 },
                  { name: 'Referral', pct: 22 },
                ].map((row) => (
                  <li key={row.name}>
                    <div className="mb-1 flex justify-between text-[10px] text-navy-300">
                      <span>{row.name}</span>
                      <span>{row.pct}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-navy-800">
                      <div
                        className="h-1.5 rounded-full bg-gold-500"
                        style={{ width: `${row.pct}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <p className="text-right text-[10px] uppercase tracking-wide text-navy-500">
          Illustrative sample data
        </p>
      </div>
    </div>
  )
}
