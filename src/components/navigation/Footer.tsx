import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { footerCompanyLinks, footerLegalLinks, footerServiceLinks } from '@/data/navigation'
import { siteConfig } from '@/lib/site'
import { formatYear } from '@/lib/utils'
import { Logo } from '@/components/ui/Logo'

export function Footer() {
  const email = siteConfig.contactEmail

  return (
    <footer className="bg-navy-950 text-navy-200">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo onDark />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-navy-300">
              Kavelis designs, builds, and maintains SaaS products, custom platforms, automation
              systems, and digital commerce for growing businesses.
            </p>
            <Link
              to={siteConfig.startPath}
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-white hover:text-teal-300"
            >
              Discuss Your Project
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>

          <nav aria-label="Footer services" className="lg:col-span-3">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-white">Services</h2>
            <ul className="mt-4 space-y-2.5">
              {footerServiceLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-navy-300 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer company" className="lg:col-span-2">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-white">Company</h2>
            <ul className="mt-4 space-y-2.5">
              {footerCompanyLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-navy-300 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-white">Contact</h2>
            {email ? (
              <a
                href={`mailto:${email}`}
                className="mt-4 inline-block text-sm text-navy-300 transition-colors hover:text-white"
              >
                {email}
              </a>
            ) : (
              <p className="mt-4 text-sm text-navy-300">
                Prefer to start with a conversation?{' '}
                <Link to={siteConfig.startPath} className="font-semibold text-white hover:text-teal-300">
                  Send a project inquiry
                </Link>
                .
              </p>
            )}

            <nav aria-label="Footer legal" className="mt-6">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-white">Legal</h2>
              <ul className="mt-4 space-y-2.5">
                {footerLegalLinks.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-sm text-navy-300 transition-colors hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-navy-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {formatYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-navy-500">Build smarter. Automate better. Scale faster.</p>
        </div>
      </div>
    </footer>
  )
}
