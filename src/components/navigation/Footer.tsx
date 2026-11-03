import { Link } from 'react-router-dom'
import { ArrowUpRight, Mail, Phone } from 'lucide-react'
import { pillars, solutionLinks } from '@/data/home'
import { useI18n } from '@/i18n'
import { siteConfig } from '@/lib/site'
import { formatYear } from '@/lib/utils'
import { Logo } from '@/components/ui/Logo'
import { LanguageSwitch } from '@/components/navigation/LanguageSwitch'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'

const linkClass = 'link-underline text-sm text-navy-300 transition-colors hover:text-white'
const headingClass = 'font-sans text-xs font-semibold uppercase tracking-[0.18em] text-gold-300'

export function Footer() {
  const { t } = useI18n()
  const phoneLabels = { uae: t.footer.uae, ksa: t.footer.ksa }

  const companyLinks = [
    { to: '/about', label: t.nav.about },
    { to: '/about#founder', label: t.footer.founder },
    { to: '/about#process', label: t.footer.process },
    { to: '/portfolio', label: t.footer.portfolio },
    { to: '/work', label: t.footer.caseStudies },
    { to: '/careers', label: t.footer.careers },
    { to: '/contact', label: t.nav.contact },
  ]

  const solutionsColumn = [
    ...solutionLinks.map((link) => ({ to: link.to, label: t.nav.solutionLinks[link.id].title })),
    { to: '/products', label: t.footer.products },
    { to: '/pricing', label: t.footer.pricing },
  ]

  return (
    <footer className="relative overflow-hidden bg-navy-950 text-navy-200">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-48 end-[-12rem] h-[30rem] w-[30rem] rounded-full bg-gold-500/10 blur-3xl"
      />

      <div className="container-page relative pt-16 sm:pt-20">
        {/* Closing statement */}
        <div className="flex flex-col gap-8 border-b border-white/10 pb-12 lg:flex-row lg:items-end lg:justify-between">
          <p className="max-w-3xl font-display text-4xl leading-[1.05] text-white sm:text-5xl lg:text-6xl">
            {t.common.slogan}
          </p>
          <Link
            to={siteConfig.startPath}
            className="group inline-flex shrink-0 items-center gap-3 self-start rounded-full border border-gold-500/50 py-2 pe-2 ps-6 text-sm font-semibold text-white transition-colors hover:bg-gold-500 hover:text-navy-950 lg:self-auto"
          >
            {t.common.startProject}
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-500 text-navy-950 transition-transform duration-400 group-hover:rotate-45 rtl:group-hover:-rotate-45">
              <ArrowUpRight aria-hidden="true" className="h-5 w-5 rtl:-scale-x-100" />
            </span>
          </Link>
        </div>

        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo onDark />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-navy-300">{t.footer.positioning}</p>
            <div className="mt-6">
              <p className={headingClass}>{t.footer.language}</p>
              <LanguageSwitch onDark className="mt-3" />
            </div>
          </div>

          <nav aria-label={t.footer.services} className="lg:col-span-2">
            <h2 className={headingClass}>{t.footer.services}</h2>
            <ul className="mt-5 space-y-3">
              {pillars.map((pillar) => (
                <li key={pillar.id}>
                  <Link to={pillar.to} className={linkClass}>
                    {t.home.whatWeDo.pillars[pillar.id].title}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/services" className={linkClass}>
                  {t.nav.allServices}
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label={t.footer.solutions} className="lg:col-span-2">
            <h2 className={headingClass}>{t.footer.solutions}</h2>
            <ul className="mt-5 space-y-3">
              {solutionsColumn.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={t.footer.company} className="lg:col-span-2">
            <h2 className={headingClass}>{t.footer.company}</h2>
            <ul className="mt-5 space-y-3">
              {companyLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-2">
            <h2 className={headingClass}>{t.footer.contact}</h2>
            <ul className="mt-5 space-y-4 text-sm">
              <li>
                <a href={`mailto:${siteConfig.businessEmail}`} className="inline-flex items-center gap-2 text-white hover:text-gold-300">
                  <Mail aria-hidden="true" className="h-4 w-4 shrink-0 text-gold-500" />
                  {siteConfig.businessEmail}
                </a>
              </li>
              {siteConfig.phones.map((phone) => (
                <li key={phone.id}>
                  <a href={`tel:${phone.tel}`} className="group inline-flex items-start gap-2">
                    <Phone aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
                    <span>
                      <span dir="ltr" className="block font-medium text-white group-hover:text-gold-300">
                        {phone.display}
                      </span>
                      <span className="block text-xs text-navy-400">{phoneLabels[phone.id]}</span>
                    </span>
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={siteConfig.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whatsapp-link group inline-flex items-center gap-2.5"
                >
                  <span className="whatsapp-icon flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#25D366]">
                    <WhatsAppIcon className="h-4 w-4 fill-navy-950" />
                  </span>
                  <span className="text-navy-300 transition-colors group-hover:text-white">{t.footer.whatsapp}</span>
                </a>
              </li>
              <li className="text-navy-400">
                {t.footer.hiring}:{' '}
                <a href={`mailto:${siteConfig.careersEmail}`} className="text-white hover:text-gold-300">
                  {siteConfig.careersEmail}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 py-7 text-sm text-navy-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {formatYear()} Kavelis Solutions. {t.footer.rights}
          </p>
          <nav aria-label={t.footer.legal} className="flex gap-6">
            <Link to="/privacy" className={linkClass}>
              {t.footer.privacy}
            </Link>
            <Link to="/terms" className={linkClass}>
              {t.footer.terms}
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
