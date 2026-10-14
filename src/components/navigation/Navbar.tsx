import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ChevronDown, Menu, X } from 'lucide-react'
import { navItems } from '@/data/navigation'
import { siteConfig } from '@/lib/site'
import { cn } from '@/lib/utils'
import { Logo } from '@/components/ui/Logo'
import { Button } from '@/components/ui/Button'

function navLinkClasses({ isActive }: { isActive: boolean }): string {
  return cn(
    'rounded-md px-1 py-1 text-sm font-medium transition-colors',
    isActive ? 'text-gold-700' : 'text-charcoal-600 hover:text-navy-950',
  )
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const mobilePanelRef = useRef<HTMLDivElement>(null)
  const servicesButtonRef = useRef<HTMLButtonElement>(null)
  const servicesPanelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setServicesOpen(false)
  }, [location.pathname, location.hash])

  useEffect(() => {
    if (!mobileOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    mobilePanelRef.current?.querySelector<HTMLElement>('a, button')?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
      menuButtonRef.current?.focus()
    }
  }, [mobileOpen])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      if (servicesOpen) {
        setServicesOpen(false)
        servicesButtonRef.current?.focus()
      }
      if (mobileOpen) {
        setMobileOpen(false)
      }
    }

    const onPointerDown = (event: MouseEvent) => {
      if (!servicesOpen) return
      const target = event.target as Node
      if (
        !servicesPanelRef.current?.contains(target) &&
        !servicesButtonRef.current?.contains(target)
      ) {
        setServicesOpen(false)
      }
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('mousedown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('mousedown', onPointerDown)
    }
  }, [servicesOpen, mobileOpen])

  const toggleMobile = useCallback(() => {
    setMobileOpen((open) => !open)
  }, [])

  const servicesItem = navItems.find((item) => item.children)
  const topLevelItems = navItems.filter((item) => !item.children)

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b bg-canvas/95 backdrop-blur transition-shadow',
        scrolled ? 'border-navy-100 shadow-nav' : 'border-transparent',
      )}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Logo />

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {servicesItem ? (
            <div className="relative">
              <button
                ref={servicesButtonRef}
                type="button"
                aria-expanded={servicesOpen}
                aria-haspopup="true"
                onClick={() => setServicesOpen((open) => !open)}
                onKeyDown={(event) => {
                  if (event.key === 'ArrowDown') {
                    event.preventDefault()
                    setServicesOpen(true)
                    requestAnimationFrame(() => {
                      servicesPanelRef.current?.querySelector('a')?.focus()
                    })
                  }
                }}
                className={cn(
                  'inline-flex items-center gap-1 rounded-md text-sm font-medium transition-colors',
                  location.pathname.startsWith('/services')
                    ? 'text-gold-700'
                    : 'text-charcoal-600 hover:text-navy-950',
                )}
              >
                {servicesItem.label}
                <ChevronDown
                  aria-hidden="true"
                  className={cn('h-4 w-4 transition-transform', servicesOpen && 'rotate-180')}
                />
              </button>

              {servicesOpen ? (
                <div
                  ref={servicesPanelRef}
                  onKeyDown={(event) => {
                    const links = Array.from(
                      servicesPanelRef.current?.querySelectorAll('a') ?? [],
                    )
                    if (links.length === 0) return
                    const current = links.indexOf(document.activeElement as HTMLAnchorElement)
                    if (event.key === 'ArrowDown') {
                      event.preventDefault()
                      links[(current + 1) % links.length]?.focus()
                    } else if (event.key === 'ArrowUp') {
                      event.preventDefault()
                      links[(current - 1 + links.length) % links.length]?.focus()
                    } else if (event.key === 'Home') {
                      event.preventDefault()
                      links[0]?.focus()
                    } else if (event.key === 'End') {
                      event.preventDefault()
                      links[links.length - 1]?.focus()
                    }
                  }}
                  className="absolute left-1/2 top-full z-50 mt-3 w-[34rem] -translate-x-1/2 rounded-2xl border border-navy-100 bg-white p-3 shadow-lift"
                >
                  <div className="grid grid-cols-2 gap-1">
                    {servicesItem.children?.map((child) => (
                      <Link
                        key={child.to}
                        to={child.to}
                        className="rounded-xl p-3 transition-colors hover:bg-gold-50"
                      >
                        <span className="block text-sm font-semibold text-navy-950">
                          {child.label}
                        </span>
                        <span className="mt-0.5 block text-xs leading-relaxed text-charcoal-500">
                          {child.description}
                        </span>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-2 border-t border-navy-100 px-3 pb-1 pt-3">
                    <Link
                      to="/services"
                      className="text-sm font-semibold text-gold-700 hover:text-gold-800"
                    >
                      View all services &rarr;
                    </Link>
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}

          {topLevelItems.map((item) => (
            <NavLink key={item.to} to={item.to ?? '/'} className={navLinkClasses}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button to={siteConfig.startPath} className="hidden sm:inline-flex">
            Discuss Your Project
          </Button>

          <button
            ref={menuButtonRef}
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-navy-200 text-navy-900 lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            onClick={toggleMobile}
          >
            {mobileOpen ? <X aria-hidden="true" className="h-5 w-5" /> : <Menu aria-hidden="true" className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        ref={mobilePanelRef}
        hidden={!mobileOpen}
        className="border-t border-navy-100 bg-canvas lg:hidden"
      >
        <nav aria-label="Mobile" className="container-page flex flex-col gap-1 py-4">
          {servicesItem ? (
            <>
              <NavLink
                to={servicesItem.to ?? '/services'}
                className={({ isActive }) =>
                  cn(
                    'rounded-lg px-3 py-2.5 text-base font-medium',
                    isActive ? 'bg-gold-50 text-gold-700' : 'text-charcoal-700 hover:bg-gold-50',
                  )
                }
              >
                {servicesItem.label}
              </NavLink>
              <ul className="mb-2 ml-3 space-y-1 border-l border-navy-100 pl-3">
                {servicesItem.children?.map((child) => (
                  <li key={child.to}>
                    <Link
                      to={child.to}
                      className="block rounded-md px-2 py-1.5 text-sm text-charcoal-600 hover:bg-gold-50 hover:text-navy-950"
                    >
                      {child.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          ) : null}

          {topLevelItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to ?? '/'}
              className={({ isActive }) =>
                cn(
                  'rounded-lg px-3 py-2.5 text-base font-medium',
                  isActive ? 'bg-gold-50 text-gold-700' : 'text-charcoal-700 hover:bg-gold-50',
                )
              }
            >
              {item.label}
            </NavLink>
          ))}

          <Button to={siteConfig.startPath} className="mt-3 w-full">
            Discuss Your Project
          </Button>
        </nav>
      </div>
    </header>
  )
}
