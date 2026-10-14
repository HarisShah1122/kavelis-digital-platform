import { Check } from 'lucide-react'
import { Container } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'

const columns = [
  {
    title: 'SaaS engineering',
    items: [
      'Multi-tenant product architecture',
      'Subscriptions, plans, and billing flows',
      'Customer dashboards and admin consoles',
      'Onboarding, roles, and permissions',
      'Usage analytics and reporting surfaces',
    ],
  },
  {
    title: 'Automation systems',
    items: [
      'Process mapping and workflow design',
      'Approvals, escalations, and audit trails',
      'Scheduled jobs and event-driven pipelines',
      'Internal tools for operations teams',
      'Monitoring, alerts, and failure recovery',
    ],
  },
]

export function CapabilitiesBand() {
  return (
    <section className="section bg-navy-950 text-white">
      <Container>
          <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <Reveal>
              <p className="eyebrow text-gold-300">SaaS & automation</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Software that earns its place in daily operations
              </h2>
              <p className="mt-4 text-base leading-relaxed text-navy-300 sm:text-lg">
                The products we build are measured by what they remove from someone&rsquo;s
                workload — manual entry, tool-switching, and guesswork. We engineer for reliability,
                observability, and the people who run the process every day.
              </p>
            </Reveal>

            <div className="grid gap-8 sm:grid-cols-2">
              {columns.map((column, columnIndex) => (
                <Reveal key={column.title} delayMs={columnIndex * 80}>
                  <h3 className="text-base font-semibold text-white">{column.title}</h3>
                  <ul className="mt-4 space-y-3">
                    {column.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-navy-200">
                        <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
    </section>
  )
}
