import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { SectionHeading } from '../components/ui/Reveal'
import { useI18n } from '../i18n/useI18n'

function FaqItem({ q, a, open, onToggle }) {
  const id = useId()
  return (
    <div className="border-b border-gold-dark/30">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          id={`${id}-btn`}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-6 py-6 text-left font-display text-xl font-semibold text-ink transition-colors hover:text-gold-dark md:text-2xl"
        >
          {q}
          <span className={`grid size-9 shrink-0 place-items-center rounded-full border transition-all duration-300 ${open ? 'rotate-45 border-gold-dark bg-gold-gradient text-ink' : 'border-gold-dark/60 text-gold-dark'}`}>
            <Plus aria-hidden="true" className="size-4" />
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`${id}-panel`}
            role="region"
            aria-labelledby={`${id}-btn`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="max-w-3xl pb-6 leading-relaxed text-muted">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Faq() {
  const { t } = useI18n()
  const items = t('faq.items')
  const [openIndex, setOpenIndex] = useState(0)
  return (
    <section id="faq" className="bg-cream py-16 md:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading kicker={t('faq.kicker')} title={t('faq.title')} />
        </div>
        <div className="border-t border-gold-dark/30 lg:col-span-8">
          {items.map((item, i) => (
            <FaqItem key={item.q} q={item.q} a={item.a} open={openIndex === i} onToggle={() => setOpenIndex(openIndex === i ? -1 : i)} />
          ))}
        </div>
      </div>
    </section>
  )
}
