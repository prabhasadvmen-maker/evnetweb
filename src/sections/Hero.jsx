import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Building2, ChevronLeft, ChevronRight, Crown, Gem, PartyPopper, Play, Trophy, Users, CalendarHeart } from 'lucide-react'
import Button from '../components/ui/Button'
import { gsap, prefersReducedMotion } from '../lib/scroll'
import { INTRO_DELAY } from '../lib/intro'
import { IMAGES, img } from '../data/media'
import { useI18n } from '../i18n/useI18n'

const SLIDES = [IMAGES.ballroom, IMAGES.mandap, IMAGES.gazebo, IMAGES.dinner]
const FEATURE_ICONS = [CalendarHeart, Building2, PartyPopper, Crown]
const STAT_ICONS = [Gem, Users, Trophy]
const EASE = [0.22, 1, 0.36, 1]

// Decorative gold ribbons sweeping across the hero, echoing the brand mark.
function Ribbons() {
  return (
    <svg aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 size-full" viewBox="0 0 1440 800" preserveAspectRatio="none" fill="none">
      <defs>
        <linearGradient id="rb" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#B88946" stopOpacity="0" />
          <stop offset=".5" stopColor="#B88946" />
          <stop offset="1" stopColor="#D4AF72" stopOpacity=".25" />
        </linearGradient>
      </defs>
      <path d="M-40 120C220 150 420 60 640 -20" stroke="url(#rb)" strokeWidth="3" />
      <path d="M-40 140C230 175 440 80 670 -10" stroke="url(#rb)" strokeWidth="1" opacity=".6" />
      <path d="M-40 760C280 700 520 740 760 840" stroke="url(#rb)" strokeWidth="3" />
      <path d="M-40 785C300 725 540 770 790 850" stroke="url(#rb)" strokeWidth="1" opacity=".6" />
    </svg>
  )
}

export default function Hero() {
  const { t } = useI18n()
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)
  const root = useRef(null)
  const content = useRef(null)

  const words = t('hero.words')
  const features = t('hero.features')
  const stats = t('hero.stats')
  const go = (dir) => setIndex((i) => (i + dir + SLIDES.length) % SLIDES.length)

  useEffect(() => {
    if (reduce) return undefined
    const timer = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), 6500)
    return () => clearInterval(timer)
  }, [reduce, index])

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return undefined
    const ctx = gsap.context(() => {
      gsap.to(content.current, {
        yPercent: -8,
        opacity: 0.25,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom 30%', scrub: true },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  const d = INTRO_DELAY
  const rise = (delay) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: d + delay, duration: 0.9, ease: EASE },
  })

  return (
    <section ref={root} id="home" className="glow relative isolate overflow-hidden bg-cream max-lg:flex max-lg:flex-col lg:min-h-[100svh]">
      <Ribbons />

      {/* Arched photo panel: bleeds off the right edge on desktop */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: d + 0.2, duration: 1.2, ease: EASE }}
        className="relative mx-5 mt-8 max-lg:order-2 max-lg:mb-14 lg:absolute lg:bottom-8 lg:right-0 lg:top-[6rem] lg:z-0 lg:m-0 lg:w-[52%]"
      >
        <div aria-hidden="true" className="arch-frame absolute -inset-2 hidden border border-gold-dark/50 lg:block" />
        <div className="arch-frame relative aspect-[4/3.2] overflow-hidden border-2 border-gold-dark/70 bg-beige shadow-[0_40px_90px_-30px_rgba(184,137,70,.6)] lg:aspect-auto lg:h-full lg:border-r-0">
          <AnimatePresence mode="sync">
            <motion.img
              key={SLIDES[index]}
              src={img(SLIDES[index], 1600, 72)}
              alt=""
              fetchPriority={index === 0 ? 'high' : undefined}
              className="absolute inset-0 size-full object-cover"
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ opacity: { duration: 1.4 }, scale: { duration: 8, ease: 'easeOut' } }}
            />
          </AnimatePresence>
        </div>

        <div className="absolute -bottom-4 right-4 z-10 flex items-center gap-3 lg:bottom-6 lg:right-10">
          <div className="flex gap-2 rounded-full bg-cream/90 px-2 py-1 backdrop-blur" role="group" aria-label="Slides">
            {SLIDES.map((id, i) => (
              <button key={id} type="button" aria-label={`Slide ${i + 1}`} aria-current={i === index} onClick={() => setIndex(i)} className="grid size-5 place-items-center">
                <span className={`block size-2 rounded-full transition-all ${i === index ? 'scale-125 bg-gold-dark' : 'border border-gold-dark/70'}`} />
              </button>
            ))}
          </div>
          <button type="button" aria-label={t('hero.prev')} onClick={() => go(-1)} className="grid size-10 place-items-center rounded-full border border-gold-dark/60 bg-cream/90 text-ink backdrop-blur transition-colors hover:bg-gold hover:text-ink">
            <ChevronLeft aria-hidden="true" className="size-5" />
          </button>
          <button type="button" aria-label={t('hero.next')} onClick={() => go(1)} className="grid size-10 place-items-center rounded-full border border-gold-dark/60 bg-cream/90 text-ink backdrop-blur transition-colors hover:bg-gold hover:text-ink">
            <ChevronRight aria-hidden="true" className="size-5" />
          </button>
        </div>
      </motion.div>

      <div className="container-x relative z-10 pb-2 pt-28 max-lg:order-1 lg:flex lg:min-h-[100svh] lg:items-center lg:pb-12 lg:pt-32">
        <div ref={content}>
          <motion.p {...rise(0)} className="mb-4 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold-dark sm:text-xs">
            <span aria-hidden="true" className="h-px w-8 bg-gold-dark/70" />
            {t('hero.kicker')}
          </motion.p>

          <h1 className="font-display text-[clamp(2.6rem,11vw,3.6rem)] font-semibold leading-[1.05] tracking-tight text-ink lg:whitespace-nowrap lg:text-[clamp(2.4rem,min(4.3vw,8vh),4.4rem)]">
            <span className="sr-only">{words.join(' · ')}</span>
            <span aria-hidden="true" className="flex flex-wrap items-center gap-x-3 gap-y-1 lg:flex-nowrap lg:gap-x-4">
              {words.map((w, i) => (
                <span key={w} className="inline-flex items-center gap-x-3 lg:gap-x-4">
                  <span className="overflow-hidden pb-[0.1em]">
                    <motion.span className="block" initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 1, delay: d + 0.1 + i * 0.15, ease: EASE }}>
                      {w}
                    </motion.span>
                  </span>
                  {i < words.length - 1 && <span className="text-[0.4em] text-gold-dark">✦</span>}
                </span>
              ))}
            </span>
          </h1>

          <motion.p {...rise(0.6)} className="mt-3 font-display text-2xl font-medium italic text-gold-gradient sm:text-3xl">
            {t('hero.sub')}
          </motion.p>

          <motion.p {...rise(0.75)} className="mt-4 max-w-md text-base leading-relaxed text-muted">
            {t('hero.lead')}
          </motion.p>

          <motion.ul {...rise(0.9)} className="mt-6 grid max-w-md grid-cols-2 gap-y-4 sm:grid-cols-4">
            {features.map((f, i) => {
              const Icon = FEATURE_ICONS[i]
              return (
                <li key={f} className={`flex flex-col items-center gap-1.5 px-2 text-center ${i > 0 ? 'sm:border-l sm:border-gold-dark/30' : ''}`}>
                  <Icon aria-hidden="true" className="size-6 text-gold-dark" strokeWidth={1.4} />
                  <span className="text-[11px] leading-tight text-ink/80">{f}</span>
                </li>
              )
            })}
          </motion.ul>

          <motion.div {...rise(1.05)} className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button to="/quote" arrow={false} className="whitespace-nowrap !px-6">
              <span className="inline-flex items-center gap-2">{t('hero.ctaPlan')}<ArrowRight aria-hidden="true" className="size-4" /></span>
            </Button>
            <Button to="/gallery" variant="outline" arrow={false} className="whitespace-nowrap !px-6">
              <span className="inline-flex items-center gap-2">
                <span className="grid size-6 place-items-center rounded-full bg-gold-gradient text-ink"><Play aria-hidden="true" className="size-3 fill-current" /></span>
                {t('hero.ctaWork')}
              </span>
            </Button>
          </motion.div>

          <motion.dl {...rise(1.2)} className="card-light mt-7 grid max-w-md grid-cols-3 gap-2 rounded-2xl p-3.5 sm:p-4">
            {stats.map((s, i) => {
              const Icon = STAT_ICONS[i]
              return (
                <div key={s.l} className={`flex flex-col items-center gap-1.5 text-center sm:flex-row sm:text-left ${i > 0 ? 'border-l border-gold-dark/30 pl-2 sm:pl-4' : ''}`}>
                  <Icon aria-hidden="true" className="size-6 shrink-0 text-gold-dark" strokeWidth={1.4} />
                  <div>
                    <dt className="sr-only">{s.l}</dt>
                    <dd className="font-display text-xl font-bold leading-none text-ink sm:text-2xl" aria-hidden="true">{s.n}</dd>
                    <dd className="mt-1 text-[10px] leading-tight text-muted">{s.l}</dd>
                  </div>
                </div>
              )
            })}
          </motion.dl>
        </div>
      </div>
    </section>
  )
}
