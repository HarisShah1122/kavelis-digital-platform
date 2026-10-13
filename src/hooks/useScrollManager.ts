import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Scrolls to the top (or a hash target) on route change. */
export function useScrollManager(): void {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const target = document.querySelector(hash)
      if (target) {
        target.scrollIntoView({ behavior: 'auto', block: 'start' })
        return
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname, hash])
}
