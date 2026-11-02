import { Link } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import { Reveal, SplitText } from '../components/ui/Reveal'
import { useI18n } from '../i18n/useI18n'

export default function LegalPage({ kind }) {
  const { t } = useI18n()
  const sections = t(`legal.${kind}.sections`)
  return (
    <section className="bg-cream pb-28 pt-36 md:pt-44">
      <div className="container-x max-w-3xl">
        <Link to="/" className="mb-8 inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-ink">
          <ChevronLeft aria-hidden="true" className="size-4" /> {t('legal.back')}
        </Link>
        <SplitText as="h1" immediate text={t(`legal.${kind}.title`)} className="text-5xl font-semibold uppercase tracking-tight text-ink md:text-7xl" />
        <div aria-hidden="true" className="ornament mt-6"><i /></div>
        <div className="mt-12 space-y-6">
          {sections.map((s, i) => (
            <Reveal key={s.h} delay={i * 0.05} className="card-light rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-ink">{s.h}</h2>
              <p className="mt-3 leading-relaxed text-muted">{s.p}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
