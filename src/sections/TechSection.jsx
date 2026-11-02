import { Mail, ListChecks, ScanLine, Box, LayoutDashboard } from 'lucide-react'
import { Reveal, SectionHeading } from '../components/ui/Reveal'
import Button from '../components/ui/Button'
import { useI18n } from '../i18n/useI18n'

const ICONS = [Mail, ListChecks, ScanLine, Box, LayoutDashboard]

export default function TechSection() {
  const { t } = useI18n()
  const items = t('tech.items')
  return (
    <section id="tech" className="glow relative overflow-hidden bg-cream-light py-16 md:py-36">
      <div className="container-x relative grid items-start gap-16 lg:grid-cols-12">
        <div className="lg:sticky lg:top-32 lg:col-span-5">
          <SectionHeading kicker={t('tech.kicker')} title={t('tech.title')} sub={t('tech.desc')} />
          <Reveal className="mt-6 text-sm leading-relaxed text-muted">{t('tech.note')}</Reveal>
          <Reveal className="mt-8">
            <Button to="/services/laxz-tech" variant="outline">{t('services.explore')}</Button>
          </Reveal>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
          {items.map((item, i) => {
            const Icon = ICONS[i]
            return (
              <Reveal as="li" key={item.t} delay={i * 0.06} y={20} className={`card-light group relative rounded-2xl p-6 transition-colors hover:border-gold-dark ${i === 0 ? 'sm:col-span-2' : ''}`}>
                <div className="flex items-start justify-between gap-4">
                  <span className="grid size-12 place-items-center rounded-full bg-gold-gradient text-ink">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <span className="rounded-full border border-gold-dark/50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-dark">
                    {t('tech.badge')}
                  </span>
                </div>
                <p className="mt-5 font-display text-2xl font-semibold text-ink">{item.t}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.d}</p>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
