import { memo } from 'react'
import { useI18n } from '../../i18n/useI18n'

const OPTIONS = [
  { code: 'en', label: 'EN', full: 'English' },
  { code: 'hi', label: 'हिं', full: 'हिन्दी' },
]

function LanguageSwitch({ className = '' }) {
  const { lang, setLang, t } = useI18n()
  return (
    <div role="group" aria-label={t('nav.language')} className={`inline-flex rounded-full border p-0.5 border-ink/30 ${className}`}>
      {OPTIONS.map((o) => (
        <button
          key={o.code}
          type="button"
          lang={o.code}
          aria-pressed={lang === o.code}
          aria-label={o.full}
          onClick={() => setLang(o.code)}
          className={`min-w-10 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
            lang === o.code ? 'bg-gold-gradient text-ink' : 'text-muted hover:text-ink'
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

export default memo(LanguageSwitch)
