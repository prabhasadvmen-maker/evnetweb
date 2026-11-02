import Button from '../components/ui/Button'
import { useI18n } from '../i18n/useI18n'

export default function NotFound() {
  const { t } = useI18n()
  return (
    <section className="grid min-h-[80svh] place-items-center bg-cream px-6 pt-24 text-center">
      <div>
        <p className="font-display text-9xl font-semibold text-gold-gradient md:text-[11rem]">404</p>
        <h1 className="mt-2 text-4xl font-semibold text-ink">{t('notFound.title')}</h1>
        <p className="mt-3 text-muted">{t('notFound.text')}</p>
        <div className="mt-8"><Button to="/">{t('notFound.back')}</Button></div>
      </div>
    </section>
  )
}
