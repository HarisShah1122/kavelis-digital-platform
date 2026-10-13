import { useEffect, useState } from 'react'

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Reveals content when it enters the viewport.
 * Falls back to an immediate reveal when reduced motion is requested.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.12) {
  const [visible, setVisible] = useState(false)
  const [node, setNode] = useState<T | null>(null)

  useEffect(() => {
    if (!node) return

    if (prefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.disconnect()
          }
        }
      },
      { threshold, rootMargin: '0px 0px -40px 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [node, threshold])

  return { visible, setNode }
}
