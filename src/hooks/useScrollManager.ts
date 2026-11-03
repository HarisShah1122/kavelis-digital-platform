import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Scrolls to the top (or a hash target) on route change. */
export function useScrollManager(): void {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    if (!hash) return

    // Pages are lazy-loaded, so the hash target may not exist yet. Poll for
    // it briefly instead of giving up on the first frame.
    let attempts = 0
    let timer = 0
    const tryScroll = () => {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (target) {
        target.scrollIntoView({ behavior: 'auto', block: 'start' })
      } else if (attempts++ < 30) {
        timer = window.setTimeout(tryScroll, 50)
      }
    }
    tryScroll()
    return () => window.clearTimeout(timer)
  }, [pathname, hash])
}
