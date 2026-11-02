import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let lenisInstance = null

export const setLenis = (instance) => {
  lenisInstance = instance
}

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const lockScroll = () => lenisInstance?.stop()
export const unlockScroll = () => lenisInstance?.start()

export const scrollToTop = (immediate = true) => {
  if (lenisInstance) lenisInstance.scrollTo(0, { immediate })
  else window.scrollTo(0, 0)
}

export const scrollToId = (id) => {
  const el = document.getElementById(id)
  if (!el) return false
  const offset = -72
  if (lenisInstance) lenisInstance.scrollTo(el, { offset, duration: 1.2 })
  else el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  return true
}

export { gsap, ScrollTrigger }
