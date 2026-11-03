import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react'
import { pillars, solutionLinks } from '@/data/home'
import { useI18n } from '@/i18n'
import { siteConfig } from '@/lib/site'
import { cn } from '@/lib/utils'
import { Logo } from '@/components/ui/Logo'
import { Button } from '@/components/ui/Button'
import { LanguageSwitch } from '@/components/navigation/LanguageSwitch'

type MenuId = 'services' | 'solutions'

const menuMatches: Record<MenuId, string[]> = {
  services: ['/services'],
  solutions: ['/solutions', '/products', '/pricing'],
}
const workMatches = ['/portfolio', '/work']

const startsWithAny = (pathname: string, prefixes: string[]) => prefixes.some((prefix) => pathname.startsWith(prefix))

const topLinkClass = (active: boolean) =>
  cn(
    'relative inline-flex items-center gap-1 py-2 text-sm font-medium transition-colors',
    'after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-center after:bg-gold-500 after:transition-transform after:duration-300',
    active
      ? 'text-navy-950 after:scale-x-100'
      : 'text-charcoal-600 after:scale-x-0 hover:text-navy-950 hover:after:scale-x-100',
  )

/** Moves focus between links inside a menu panel with arrow / Home / End keys. */
function handleMenuKeys(event: ReactKeyboardEvent<HTMLElement>) {
  const links = Array.from(event.currentTarget.querySelectorAll<HTMLAnchorElement>('a'))
  if (links.length === 0) return
  const current = links.indexOf(document.activeElement as HTMLAnchorElement)
  const focus = (index: number) => {
    event.preventDefault()
    links[(index + links.length) % links.length]?.focus()
  }
  if (event.key === 'ArrowDown') focus(current + 1)
  else if (event.key === 'ArrowUp') focus(current - 1)
  else if (event.key === 'Home') focus(0)
  else if (event.key === 'End') focus(links.length - 1)
}

export function Navbar() {
  const { t } = useI18n()
  const { pathname, hash } = useLocation()
  const [openMenu, setOpenMenu] = useState<MenuId | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const triggerRefs = useRef<Record<MenuId, HTMLButtonElement | null>>({ services: null, solutions: null })
  const panelRef = useRef<HTMLDivElement>(null)
  const drawerRef = useRef<HTMLDivElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const closeTimer = useRef<number>()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpenMenu(null)
    setMobileOpen(false)
  }, [pathname, hash])

  // Escape closes whatever is open; clicking outside closes the mega menu.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      if (openMenu) {
        triggerRefs.current[openMenu]?.focus()
        setOpenMenu(null)
      }
      setMobileOpen(false)
    }
    const onPointerDown = (event: MouseEvent) => {
      if (openMenu && !headerRef.current?.contains(event.target as Node)) setOpenMenu(null)
    }
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('mousedown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('mousedown', onPointerDown)
    }
  }, [openMenu])

  // Mobile drawer: lock page scroll, move focus in, restore focus on close.
  useEffect(() => {
    if (!mobileOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    drawerRef.current?.querySelector<HTMLElement>('a, button')?.focus()
    const menuButton = menuButtonRef.current
    return () => {
      document.body.style.overflow = previousOverflow
      menuButton?.focus()
    }
  }, [mobileOpen])

  const trapDrawerFocus = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Tab') return
    const focusable = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('a, button:not([disabled])'))
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last?.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first?.focus()
    }
  }

  // Hover intent: open immediately, close after a short grace period.
  const openOnHover = (id: MenuId) => {
    window.clearTimeout(closeTimer.current)
    setOpenMenu(id)
  }
  const closeOnLeave = () => {
    window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => setOpenMenu(null), 160)
  }

  const menuTrigger = (id: MenuId, label: string) => (
    <button
      ref={(node) => {
        triggerRefs.current[id] = node
      }}
      type="button"
      aria-expanded={openMenu === id}
      aria-controls="mega-menu"
      // Mouse users already opened the menu on hover, so a click keeps it open;
      // keyboard activation (detail === 0) toggles.
      onClick={(event) => {
        const keyboard = event.detail === 0
        setOpenMenu((current) => (keyboard && current === id ? null : id))
      }}
      onMouseEnter={() => openOnHover(id)}
      onKeyDown={(event) => {
        if (event.key === 'ArrowDown') {
          event.preventDefault()
          setOpenMenu(id)
          requestAnimationFrame(() => panelRef.current?.querySelector('a')?.focus())
        }
      }}
      className={topLinkClass(startsWithAny(pathname, menuMatches[id]))}
    >
      {label}
      <ChevronDown
        aria-hidden="true"
        className={cn('h-3.5 w-3.5 transition-transform duration-250', openMenu === id && 'rotate-180')}
      />
    </button>
  )

  const isActive = {
    home: pathname === '/',
    work: startsWithAny(pathname, workMatches),
    about: pathname.startsWith('/about'),
    contact: pathname.startsWith('/contact'),
  }

  return (
    <>
      <header
        ref={headerRef}
        onMouseLeave={closeOnLeave}
        className={cn(
          'sticky top-0 z-nav border-b backdrop-blur-md transition-[background-color,box-shadow,border-color] duration-400',
          scrolled || openMenu ? 'border-navy-100 bg-canvas/95 shadow-nav' : 'border-transparent bg-canvas/80',
        )}
      >
        <div
          className={cn(
            'container-page flex items-center justify-between gap-4 transition-[height] duration-400 ease-out-expo',
            scrolled ? 'h-16' : 'h-16 lg:h-20',
          )}
        >
          <Logo />

          <nav aria-label={t.nav.primary} className="hidden items-center gap-7 lg:flex">
            <Link to="/" className={topLinkClass(isActive.home)} aria-current={isActive.home ? 'page' : undefined}>
              {t.nav.home}
            </Link>
            {menuTrigger('services', t.nav.services)}
            {menuTrigger('solutions', t.nav.solutions)}
            <NavLink to="/portfolio" className={() => topLinkClass(isActive.work)} onMouseEnter={closeOnLeave}>
              {t.nav.work}
            </NavLink>
            <NavLink to="/about" className={() => topLinkClass(isActive.about)} onMouseEnter={closeOnLeave}>
              {t.nav.about}
            </NavLink>
            <NavLink to="/contact" className={() => topLinkClass(isActive.contact)} onMouseEnter={closeOnLeave}>
              {t.nav.contact}
            </NavLink>
          </nav>

          <div className="flex items-center gap-2">
            <LanguageSwitch className="hidden sm:inline-flex" />
            <Button to={siteConfig.startPath} className="group hidden sm:inline-flex">
              {t.common.startProject}
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5"
              />
            </Button>
            <button
              ref={menuButtonRef}
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-navy-200 text-navy-900 lg:hidden"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? t.nav.closeMenu : t.nav.openMenu}
              onClick={() => setMobileOpen((open) => !open)}
            >
              {mobileOpen ? (
                <X aria-hidden="true" className="h-5 w-5" />
              ) : (
                <Menu aria-hidden="true" className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Desktop mega menu — full width under the header */}
        {openMenu ? (
          <div
            id="mega-menu"
            ref={panelRef}
            onMouseEnter={() => window.clearTimeout(closeTimer.current)}
            onKeyDown={handleMenuKeys}
            className="menu-pop absolute inset-x-0 top-full z-menu hidden border-b border-navy-100 bg-white shadow-lift lg:block"
          >
            <div className="container-page grid grid-cols-12 gap-10 py-10">
              {openMenu === 'services' ? (
                <>
                  <div className="col-span-3">
                    <p className="eyebrow">{t.nav.services}</p>
                    <p className="mt-4 font-display text-2xl leading-snug text-navy-950">{t.nav.servicesIntro}</p>
                    <Link
                      to="/services"
                      className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-700 hover:text-gold-800"
                    >
                      {t.nav.allServices}
                      <ArrowRight aria-hidden="true" className="h-4 w-4 rtl:-scale-x-100" />
                    </Link>
                  </div>
                  <div className="col-span-9 grid grid-cols-4 gap-6">
                    {pillars.map((pillar, index) => (
                      <div key={pillar.id} className="border-s border-navy-100 ps-5">
                        <p className="text-xs font-semibold text-gold-700">0{index + 1}</p>
                        <Link
                          to={pillar.to}
                          className="mt-2 block text-sm font-bold leading-snug text-navy-950 hover:text-gold-700"
                        >
                          {t.home.whatWeDo.pillars[pillar.id].title}
                        </Link>
                        <ul className="mt-3 space-y-2">
                          {pillar.serviceIds.map((serviceId) => (
                            <li key={serviceId}>
                              <Link
                                to={`/services/${serviceId}`}
                                className="block text-sm leading-snug text-charcoal-600 transition-colors hover:text-navy-950"
                              >
                                {t.services[serviceId].title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <div className="col-span-3">
                    <p className="eyebrow">{t.nav.solutions}</p>
                    <p className="mt-4 font-display text-2xl leading-snug text-navy-950">{t.nav.solutionsIntro}</p>
                  </div>
                  <div className="col-span-6 grid grid-cols-2 gap-2">
                    {solutionLinks.map((link) => (
                      <Link
                        key={link.id}
                        to={link.to}
                        className="group rounded-xl p-4 transition-colors hover:bg-gold-50"
                      >
                        <span className="flex items-center justify-between gap-2 text-sm font-bold text-navy-950">
                          {t.nav.solutionLinks[link.id].title}
                          <ArrowRight
                            aria-hidden="true"
                            className="h-4 w-4 text-gold-600 opacity-0 transition-all group-hover:opacity-100 rtl:-scale-x-100"
                          />
                        </span>
                        <span className="mt-1 block text-sm leading-relaxed text-charcoal-500">
                          {t.nav.solutionLinks[link.id].description}
                        </span>
                      </Link>
                    ))}
                  </div>
                  <ul className="col-span-3 space-y-3 border-s border-navy-100 ps-6">
                    {[
                      { to: '/products', label: t.nav.solutionsFooter.catalog },
                      { to: '/solutions', label: t.nav.solutionsFooter.industries },
                      { to: '/pricing', label: t.nav.solutionsFooter.pricing },
                    ].map((link) => (
                      <li key={link.to}>
                        <Link
                          to={link.to}
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900 hover:text-gold-700"
                        >
                          {link.label}
                          <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 rtl:-scale-x-100" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        ) : null}
      </header>

      {/* Mobile drawer — outside <header>: its backdrop-filter would otherwise
          become the containing block and collapse this fixed panel. */}
      <div
        id="mobile-menu"
        ref={drawerRef}
        hidden={!mobileOpen}
        onKeyDown={trapDrawerFocus}
        className="fixed inset-x-0 bottom-0 top-16 z-menu overflow-y-auto border-t border-navy-100 bg-canvas lg:hidden"
      >
        <nav aria-label={t.nav.mobile} className="container-page flex flex-col gap-1 py-5">
          <Link to="/" className="rounded-lg px-3 py-3 text-base font-semibold text-navy-950 hover:bg-gold-50">
            {t.nav.home}
          </Link>

          <p className="mt-3 px-3 text-xs font-semibold uppercase tracking-[0.16em] text-gold-700">{t.nav.services}</p>
          {pillars.map((pillar) => (
            <Link
              key={pillar.id}
              to={pillar.to}
              className="rounded-lg px-3 py-2.5 text-[15px] text-charcoal-700 hover:bg-gold-50"
            >
              {t.home.whatWeDo.pillars[pillar.id].title}
            </Link>
          ))}
          <Link
            to="/services"
            className="rounded-lg px-3 py-2.5 text-[15px] font-semibold text-gold-700 hover:bg-gold-50"
          >
            {t.nav.allServices}
          </Link>

          <p className="mt-3 px-3 text-xs font-semibold uppercase tracking-[0.16em] text-gold-700">{t.nav.solutions}</p>
          {solutionLinks.map((link) => (
            <Link
              key={link.id}
              to={link.to}
              className="rounded-lg px-3 py-2.5 text-[15px] text-charcoal-700 hover:bg-gold-50"
            >
              {t.nav.solutionLinks[link.id].title}
            </Link>
          ))}
          <Link to="/products" className="rounded-lg px-3 py-2.5 text-[15px] text-charcoal-700 hover:bg-gold-50">
            {t.nav.solutionsFooter.catalog}
          </Link>

          <div className="mt-3 border-t border-navy-100 pt-3">
            {[
              { to: '/portfolio', label: t.nav.work },
              { to: '/about', label: t.nav.about },
              { to: '/contact', label: t.nav.contact },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="block rounded-lg px-3 py-3 text-base font-semibold text-navy-950 hover:bg-gold-50"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="mt-4 flex gap-3">
            <LanguageSwitch />
            <Button to={siteConfig.startPath} className="flex-1">
              {t.common.startProject}
            </Button>
          </div>
        </nav>
      </div>
    </>
  )
}
