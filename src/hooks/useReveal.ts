import { useEffect, useState } from 'react'

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Reveals content when it enters the viewport.
 *
 * The hidden state is only applied when JavaScript is available (the `has-reveal`
 * class on <html> — see index.css), so content is never invisible because a
 * script failed to load. Elements already inside the viewport at mount are
 * revealed immediately rather than waiting for the observer's first callback.
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

    // Already on screen at mount: reveal without waiting for a paint cycle.
    const rect = node.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) {
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
