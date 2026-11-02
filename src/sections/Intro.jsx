import { motion } from 'framer-motion'
import ParallaxImage from '../components/ui/ParallaxImage'
import { Reveal, SplitText } from '../components/ui/Reveal'
import { IMAGES, img } from '../data/media'
import { useI18n } from '../i18n/useI18n'

function Marquee() {
  const words = ['IDEAS', 'EVENTS', 'EXPERIENCES', 'PLAN', 'DESIGN', 'EXECUTE', 'CELEBRATE']
  const row = (
    <div className="flex shrink-0 items-center" aria-hidden="true">
      {words.map((w) => (
        <span key={w} className="flex items-center">
          <span className="px-5 font-display text-4xl font-semibold uppercase text-transparent [-webkit-text-stroke:1px_rgba(184,137,70,.55)] md:px-10 md:text-7xl">{w}</span>
          <span className="size-2 rotate-45 bg-gold-dark" />
        </span>
      ))}
    </div>
  )
  return (
    <div className="overflow-hidden border-y border-gold/30 py-6" aria-hidden="true">
      <div className="marquee-track">
        {row}
        {row}
      </div>
    </div>
  )
}

export default function Intro() {
  const { t } = useI18n()
  const body = t('intro.body')
  const pillars = t('intro.pillars')

  return (
    <section id="intro" className="relative overflow-hidden bg-cream pt-16 md:pt-36">
      <div aria-hidden="true" className="orb pointer-events-none absolute -right-40 top-20 size-[30rem] rounded-full bg-gold/20 blur-[120px]" />
      <div className="container-x relative grid items-center gap-14 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Reveal className="mb-6 text-xs font-semibold uppercase tracking-[0.32em] text-gold-dark">{t('intro.kicker')}</Reveal>
          <SplitText
            text={t('intro.title')}
            gradientFrom={Math.floor(t('intro.title').split(' ').length / 2)}
            className="text-4xl font-semibold uppercase leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-7xl"
          />
          <div className="mt-8 max-w-xl space-y-5 text-base leading-relaxed text-muted md:text-lg">
            {body.map((p, i) => (
              <Reveal key={i} delay={0.15 + i * 0.1}>{p}</Reveal>
            ))}
          </div>
          <Reveal delay={0.4} className="mt-8 inline-flex items-center gap-4 text-sm font-semibold uppercase tracking-[0.25em] text-ink">
            <span aria-hidden="true" className="h-px w-12 bg-gold-dark" />
            {t('intro.tagline')}
          </Reveal>
        </div>

        <div className="relative lg:col-span-5">
          <motion.div
            initial={{ clipPath: 'inset(100% 0 0 0)' }}
            whileInView={{ clipPath: 'inset(0% 0 0 0)' }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.3, ease: [0.76, 0, 0.24, 1] }}
          >
            <ParallaxImage src={img(IMAGES.gazebo, 900, 70)} alt="Garden wedding ceremony set-up" className="aspect-[4/5] rounded-t-[10rem] rounded-b-2xl" />
          </motion.div>
          <div aria-hidden="true" className="absolute -bottom-5 -left-5 -z-10 size-full rounded-t-[10rem] rounded-b-2xl border border-gold-dark/50" />
        </div>
      </div>

      <div className="container-x relative mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-gold/30 bg-gold/30 lg:grid-cols-4">
        {pillars.map((p, i) => (
          <Reveal key={p.t} delay={i * 0.08} y={24} className="group bg-cream-light p-5 sm:p-7 transition-colors hover:bg-beige">
            <span className="font-display text-3xl font-semibold text-gold-dark">0{i + 1}</span>
            <h3 className="mt-3 text-2xl font-semibold uppercase tracking-wide text-ink ">{p.t}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{p.d}</p>
            <span aria-hidden="true" className="mt-6 block h-0.5 w-8 bg-gold-dark transition-all duration-500 group-hover:w-20 group-hover:bg-gold-dark" />
          </Reveal>
        ))}
      </div>

      <div className="mt-16 md:mt-32">
        <Marquee />
      </div>
    </section>
  )
}
