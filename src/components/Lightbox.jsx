import { useCallback, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { img } from '../data/media'
import { lockScroll, unlockScroll } from '../lib/scroll'
import { useI18n } from '../i18n/useI18n'

// Accessible lightbox: Esc closes, arrow keys navigate, focus moves into the dialog and is restored.
export default function Lightbox({ items, index, onClose, onChange }) {
  const { t } = useI18n()
  const open = index !== null
  const closeBtn = useRef(null)
  const returnFocus = useRef(null)

  const step = useCallback(
    (dir) => onChange((index + dir + items.length) % items.length),
    [index, items.length, onChange],
  )

  useEffect(() => {
    if (!open) return undefined
    returnFocus.current = document.activeElement
    lockScroll()
    document.body.style.overflow = 'hidden'
    closeBtn.current?.focus()
    return () => {
      unlockScroll()
      document.body.style.overflow = ''
      returnFocus.current?.focus?.()
    }
  }, [open])

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') step(1)
      else if (e.key === 'ArrowLeft') step(-1)
      else if (e.key === 'Tab') {
        // keep focus inside the dialog
        const focusables = [...document.querySelectorAll('[data-lightbox] button')]
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose, step])

  const item = open ? items[index] : null
  const btn = 'grid size-12 place-items-center rounded-full border border-gold-dark/60 bg-cream text-ink backdrop-blur-md transition-colors hover:bg-gold-gradient'

  return (
    <AnimatePresence>
      {open && item && (
        <motion.div
          data-lightbox
          role="dialog"
          aria-modal="true"
          aria-label={item.alt}
          className="fixed inset-0 z-[90] flex flex-col bg-cream/95 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <div className="flex items-center justify-between p-4 md:p-6" onClick={(e) => e.stopPropagation()}>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-dark">
              {t(`gallery.filters.${item.category}`)}
            </p>
            <button ref={closeBtn} type="button" onClick={onClose} aria-label={t('gallery.close')} className={btn}>
              <X className="size-5" />
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-6 md:px-20">
            <button type="button" aria-label={t('gallery.prev')} onClick={(e) => { e.stopPropagation(); step(-1) }} className={`${btn} absolute left-3 z-10 md:left-6`}>
              <ChevronLeft className="size-5" />
            </button>
            <AnimatePresence mode="wait">
              <motion.img
                key={item.id}
                src={img(item.image, 1800, 80)}
                alt={item.alt}
                onClick={(e) => e.stopPropagation()}
                className="max-h-full max-w-full rounded-xl object-contain shadow-2xl"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35 }}
              />
            </AnimatePresence>
            <button type="button" aria-label={t('gallery.next')} onClick={(e) => { e.stopPropagation(); step(1) }} className={`${btn} absolute right-3 z-10 md:right-6`}>
              <ChevronRight className="size-5" />
            </button>
          </div>
          <p className="pb-5 text-center text-xs text-muted" onClick={(e) => e.stopPropagation()}>
            {index + 1} / {items.length}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
