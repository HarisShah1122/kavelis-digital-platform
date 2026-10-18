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
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-white hover:text-gold-300"
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
                <Link to={siteConfig.startPath} className="font-semibold text-white hover:text-gold-300">
                  Send a project inquiry
                </Link>
                .
              </p>
            )}

            <a
              href="https://wa.me/923135002818"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with Kavelis on WhatsApp: +92 313 5002818"
              className="whatsapp-link group mt-5 inline-flex items-center gap-3"
            >
              <span className="whatsapp-icon flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#25D366]">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-5 w-5 fill-navy-950"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413" />
                </svg>
              </span>
              <span className="text-left">
                <span className="block text-[11px] font-semibold uppercase tracking-wider text-navy-400">
                  WhatsApp
                </span>
                <span className="block text-sm font-semibold text-white transition-colors group-hover:text-gold-300">
                  +92 313 5002818
                </span>
              </span>
            </a>

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
