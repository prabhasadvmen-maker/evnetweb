import { memo } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { img } from '../data/media'
import { useI18n } from '../i18n/useI18n'

function ServiceCard({ service, index }) {
  const { t } = useI18n()
  const reduce = useReducedMotion()
  const Icon = service.icon
  const base = `services.items.${service.key}`

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="card-light group relative flex flex-col overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-1.5 hover:border-gold-dark hover:shadow-[0_30px_60px_-30px_rgba(184,137,70,.6)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={img(service.image, 800, 68)}
          alt=""
          decoding="async"
          className="size-full object-cover transition-transform duration-[1200ms] ease-[var(--ease-premium)] group-hover:scale-110"
        />
        <span className="absolute left-4 top-4 grid size-12 place-items-center rounded-full bg-gold-gradient text-ink shadow-lg">
          <Icon aria-hidden="true" className="size-5" />
        </span>
        <span className="absolute right-4 top-4 rounded-full bg-cream/90 px-3 py-1 font-display text-lg font-semibold text-gold-dark backdrop-blur">0{index + 1}</span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-3xl font-semibold leading-tight text-ink">
          <Link to={`/services/${service.slug}`} className="after:absolute after:inset-0 after:content-['']">
            {t(`${base}.title`)}
          </Link>
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{t(`${base}.desc`)}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark transition-all duration-500 group-hover:gap-3 group-hover:text-ink">
          {t('services.explore')}
          <ArrowUpRight aria-hidden="true" className="size-4" />
        </span>
      </div>
    </motion.article>
  )
}

export default memo(ServiceCard)
