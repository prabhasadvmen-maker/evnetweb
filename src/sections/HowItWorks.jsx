import { useLayoutEffect, useRef } from 'react'
import { SectionHeading } from '../components/ui/Reveal'
import { gsap, prefersReducedMotion } from '../lib/scroll'
import { useI18n } from '../i18n/useI18n'

// Vertical timeline: a GSAP ScrollTrigger scrubs the progress line and lights up each step.
export default function HowItWorks() {
  const { t } = useI18n()
  const steps = t('how.steps')
  const root = useRef(null)
  const line = useRef(null)

  useLayoutEffect(() => {
    const items = root.current.querySelectorAll('[data-step]')
    if (prefersReducedMotion()) {
      gsap.set(line.current, { scaleY: 1 })
      items.forEach((el) => el.classList.add('is-active'))
      return undefined
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(
        line.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: { trigger: root.current.querySelector('[data-track]'), start: 'top 65%', end: 'bottom 70%', scrub: 0.5 },
        },
      )
      items.forEach((el) => {
        gsap.from(el.querySelector('[data-card]'), {
          opacity: 0,
          y: 50,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 82%',
            onEnter: () => el.classList.add('is-active'),
            onLeaveBack: () => el.classList.remove('is-active'),
          },
        })
      })
    }, root)
    return () => ctx.revert()
  }, [steps.length])

  return (
    <section id="how" ref={root} className="relative bg-cream py-16 md:py-36">
      <div className="container-x">
        <SectionHeading kicker={t('how.kicker')} title={t('how.title')} align="center" />

        <div data-track className="relative mx-auto mt-20 max-w-4xl">
          <div aria-hidden="true" className="absolute bottom-0 left-5 top-0 w-px bg-gold-dark/25 md:left-1/2" />
          <div ref={line} aria-hidden="true" className="absolute bottom-0 left-5 top-0 w-px origin-top bg-gradient-to-b from-gold to-gold-dark md:left-1/2" />

          <ol className="space-y-12 md:space-y-20">
            {steps.map((step, i) => {
              const right = i % 2 === 1
              return (
                <li key={step.t} data-step className="group relative pl-16 md:grid md:grid-cols-2 md:gap-24 md:pl-0">
                  <span
                    aria-hidden="true"
                    className="absolute left-5 top-6 grid size-11 -translate-x-1/2 place-items-center rounded-full border border-gold-dark/50 bg-cream font-display text-lg font-semibold text-gold-dark transition-all duration-500 group-[.is-active]:scale-110 group-[.is-active]:border-gold-dark group-[.is-active]:bg-gold-gradient group-[.is-active]:text-ink group-[.is-active]:shadow-[0_0_0_6px_rgba(212,175,114,.28)] md:left-1/2"
                  >
                    {i + 1}
                  </span>
                  <div data-card className={`card-light rounded-2xl p-6 transition-colors duration-500 group-[.is-active]:border-gold-dark/60 md:p-8 ${right ? 'md:col-start-2' : 'md:col-start-1 md:text-right'}`}>
                    <h3 className="text-2xl font-semibold text-ink md:text-3xl">{step.t}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">{step.d}</p>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
