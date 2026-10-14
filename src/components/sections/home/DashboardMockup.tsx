import { BarChart3, CreditCard, LayoutDashboard, ShieldCheck, Users } from 'lucide-react'

const bars = [42, 68, 54, 80, 62, 90, 74]

export function DashboardMockup() {
  return (
    <div
      aria-hidden="true"
      className="mx-auto w-full max-w-xl overflow-hidden rounded-2xl border border-navy-800 bg-navy-950 shadow-lift"
    >
      <div className="flex items-center gap-1.5 border-b border-white/10 bg-navy-900 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="ml-3 truncate text-xs text-navy-300">app.kavelis.example / operations</span>
      </div>

      <div className="grid grid-cols-[auto_1fr]">
        <aside className="hidden w-14 flex-col items-center gap-4 border-r border-white/10 py-5 sm:flex">
          <LayoutDashboard className="h-4 w-4 text-gold-400" />
          <BarChart3 className="h-4 w-4 text-white/40" />
          <Users className="h-4 w-4 text-white/40" />
          <CreditCard className="h-4 w-4 text-white/40" />
          <ShieldCheck className="h-4 w-4 text-white/40" />
        </aside>

        <div className="space-y-4 p-4 sm:p-5">
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Active plans', value: '1,284' },
              { label: 'MRR', value: '$48.2k' },
              { label: 'Open tasks', value: '17' },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl bg-white/5 p-3">
                <p className="text-[10px] uppercase tracking-wider text-navy-400">{stat.label}</p>
                <p className="mt-1 text-sm font-semibold text-white sm:text-base">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="rounded-xl bg-white/5 p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs font-medium text-navy-200">Subscription activity</p>
              <p className="text-[10px] text-navy-400">Last 7 periods</p>
            </div>
            <div className="flex h-24 items-end gap-2">
              {bars.map((height, index) => (
                <div
                  key={index}
                  className={`flex-1 rounded-t ${
                    index === bars.length - 2 ? 'bg-gold-400' : 'bg-gold-500/50'
                  }`}
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
          </div>

          <div className="rounded-xl bg-white/5 p-4">
            <p className="mb-3 text-xs font-medium text-navy-200">Workflow runs</p>
            <ul className="space-y-2.5">
              {[
                { name: 'Invoice sync → ledger', status: 'Completed' },
                { name: 'Onboarding sequence', status: 'Running' },
                { name: 'Weekly ops digest', status: 'Queued' },
              ].map((row) => (
                <li key={row.name} className="flex items-center justify-between text-xs">
                  <span className="text-navy-200">{row.name}</span>
                  <span
                    className={
                      row.status === 'Completed'
                        ? 'text-gold-400'
                        : row.status === 'Running'
                          ? 'text-gold-400'
                          : 'text-navy-400'
                    }
                  >
                    {row.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
