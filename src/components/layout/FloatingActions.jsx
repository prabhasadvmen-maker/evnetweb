import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MessageCircle, FileText } from 'lucide-react'
import { hasWhatsapp, whatsappLink } from '../../config/site'
import { useI18n } from '../../i18n/useI18n'

// Persistent enquiry actions: a WhatsApp button on desktop and an action bar on mobile.
export default function FloatingActions() {
  const { t } = useI18n()
  return (
    <>
      {hasWhatsapp && (
        <motion.a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t('nav.whatsapp')}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 2.4, type: 'spring', stiffness: 260, damping: 18 }}
          whileHover={{ scale: 1.08 }}
          className="fixed bottom-6 right-6 z-40 hidden size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-6px_rgba(37,211,102,.6)] md:grid"
        >
          <MessageCircle className="size-6" />
        </motion.a>
      )}

      <div className={`fixed inset-x-0 bottom-0 z-40 grid gap-2 border-t border-gold/30 bg-cream/95 p-2.5 backdrop-blur-xl md:hidden ${hasWhatsapp ? 'grid-cols-2' : 'grid-cols-1'}`}>
        <Link to="/quote" className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-gold-gradient text-sm font-semibold uppercase tracking-wider text-ink">
          <FileText aria-hidden="true" className="size-4" />
          {t('nav.quote')}
        </Link>
        {hasWhatsapp && (
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#25D366] text-sm font-semibold text-white">
            <MessageCircle aria-hidden="true" className="size-4" />
            WhatsApp
          </a>
        )}
      </div>
    </>
  )
}
