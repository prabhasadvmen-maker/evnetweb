import { useCallback, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Expand } from 'lucide-react'
import Lightbox from './Lightbox'
import { GALLERY, GALLERY_FILTERS } from '../data/gallery'
import { img } from '../data/media'
import { useI18n } from '../i18n/useI18n'

const SPAN = { tall: 'row-span-2', wide: 'col-span-2', normal: '' }

// Filterable editorial grid with hover effects and a lightbox. `limit` trims the list on the homepage.
export default function GalleryGrid({ limit }) {
  const { t } = useI18n()
  const [filter, setFilter] = useState('all')
  const [active, setActive] = useState(null)

  const items = useMemo(() => {
    const list = filter === 'all' ? GALLERY : GALLERY.filter((g) => g.category === filter)
    return limit ? list.slice(0, limit) : list
  }, [filter, limit])

  const close = useCallback(() => setActive(null), [])

  return (
    <div>
      <div role="group" aria-label="Filter" className="mb-10 flex flex-wrap gap-2">
        {GALLERY_FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className={`min-h-10 rounded-full border px-5 text-xs font-semibold uppercase tracking-[0.15em] transition-colors ${
              filter === f ? 'border-ink bg-gold-gradient text-ink' : 'border-gold-dark/50 text-muted hover:border-ink hover:text-ink'
            }`}
          >
            {t(`gallery.filters.${f}`)}
          </button>
        ))}
      </div>

      <motion.ul layout className="grid auto-rows-[200px] grid-cols-2 gap-3 [grid-auto-flow:dense] sm:auto-rows-[220px] md:grid-cols-3 md:gap-4 lg:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {items.map((item, i) => (
            <motion.li
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: Math.min(i * 0.04, 0.3), ease: [0.22, 1, 0.36, 1] }}
              className={filter === 'all' ? SPAN[item.span] : ''}
            >
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`${t('gallery.view')}: ${item.alt}`}
                className="group relative block size-full overflow-hidden rounded-xl bg-beige"
              >
                <img
                  src={img(item.image, 900, 65)}
                  alt={item.alt}
                  loading="lazy"
                  decoding="async"
                  className="size-full object-cover transition-transform duration-[1100ms] ease-[var(--ease-premium)] group-hover:scale-110"
                />
                <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-cream/90 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span aria-hidden="true" className="absolute inset-0 border border-gold/80 m-2 rounded-lg opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="absolute inset-x-0 bottom-0 m-2 flex translate-y-3 items-center justify-between rounded-lg bg-cream/90 p-3 text-left backdrop-blur opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-ink">{t(`gallery.filters.${item.category}`)}</span>
                  <span className="grid size-9 place-items-center rounded-full bg-gold-gradient text-ink">
                    <Expand aria-hidden="true" className="size-4" />
                  </span>
                </span>
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      <Lightbox items={items} index={active} onClose={close} onChange={setActive} />
    </div>
  )
}
