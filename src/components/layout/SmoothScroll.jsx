import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import { gsap, ScrollTrigger, prefersReducedMotion, scrollToId, scrollToTop, setLenis } from '../../lib/scroll'

// Lenis smooth scrolling wired into GSAP ScrollTrigger, plus route-aware scroll restoration
// (top on navigation, smooth scroll to #hash targets).
export default function SmoothScroll() {
  const { pathname, hash, key } = useLocation()

  useEffect(() => {
    if (prefersReducedMotion()) return undefined
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true })
    setLenis(lenis)
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      setLenis(null)
    }
  }, [])

  useEffect(() => {
    if (!hash) {
      scrollToTop(true)
      return undefined
    }
    // Wait for the incoming route to mount before scrolling to its section.
    const id = hash.slice(1)
    const timer = setTimeout(() => {
      ScrollTrigger.refresh()
      scrollToId(id)
    }, 500)
    return () => clearTimeout(timer)
  }, [pathname, hash, key])

  return null
}
