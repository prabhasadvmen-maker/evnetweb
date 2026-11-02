import { useLayoutEffect, useRef } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../../lib/scroll'

// Image with a subtle GSAP ScrollTrigger parallax. The image is oversized vertically
// so it can drift inside its overflow-hidden frame without exposing edges.
export default function ParallaxImage({ src, alt = '', amount = 12, className = '', imgClassName = '', loading = 'lazy', fetchPriority }) {
  const frame = useRef(null)
  const image = useRef(null)

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return undefined
    const ctx = gsap.context(() => {
      gsap.fromTo(
        image.current,
        { yPercent: -amount / 2 },
        {
          yPercent: amount / 2,
          ease: 'none',
          scrollTrigger: { trigger: frame.current, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      )
    }, frame)
    return () => ctx.revert()
  }, [amount])

  useLayoutEffect(() => {
    const t = setTimeout(() => ScrollTrigger.refresh(), 600)
    return () => clearTimeout(t)
  }, [])

  const scale = 1 + amount / 100 + 0.03
  return (
    <div ref={frame} className={`overflow-hidden ${className}`}>
      <img
        ref={image}
        src={src}
        alt={alt}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding="async"
        style={{ scale }}
        className={`size-full object-cover will-change-transform ${imgClassName}`}
      />
    </div>
  )
}
