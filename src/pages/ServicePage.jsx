import { useParams } from 'react-router-dom'
import { Check, Info } from 'lucide-react'
import Button from '../components/ui/Button'
import PageHero from '../components/ui/PageHero'
import ServiceCard from '../components/ServiceCard'
import { Reveal } from '../components/ui/Reveal'
import { SERVICES, serviceBySlug, BIRTHDAY_PACKAGES, WEDDING_PLANNING, WEDDING_BUDGETS } from '../data/services'
import { useI18n } from '../i18n/useI18n'
import NotFound from './NotFound'

const CATEGORY_FOR_SLUG = {
  birthdays: 'birthday',
  weddings: 'wedding',
  corporate: 'corporate',
  'live-events': 'live',
  experiences: 'experience',
  'laxz-tech': 'other',
}

function PriceTable({ title, caption, columns, rows }) {
  return (
    <Reveal className="card-light overflow-x-auto rounded-2xl">
      <table className="w-full text-left text-sm md:text-base">
        <caption className="px-4 py-4 text-left font-sans sm:px-5 text-xs font-semibold uppercase tracking-[0.22em] text-gold-dark">{title}{caption && <span className="sr-only"> – {caption}</span>}</caption>
        <thead className="bg-beige text-xs uppercase tracking-wider text-ink">
          <tr>{columns.map((c) => <th key={c} scope="col" className="px-4 py-3 font-medium sm:px-5">{c}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[0]} className="border-b border-gold-dark/15 transition-colors last:border-0 hover:bg-beige/50">
              {row.map((cell, i) => (
                <td key={i} className={`px-4 py-4 sm:px-5 ${i === 0 ? 'font-semibold tracking-wider text-ink' : i === row.length - 1 ? 'font-display text-xl font-semibold text-gold-dark' : 'text-muted'}`}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Reveal>
  )
}

export default function ServicePage() {
  const { slug } = useParams()
  const { t } = useI18n()
  const service = serviceBySlug(slug)
  if (!service) return <NotFound />

  const base = `service.pages.${slug}`
  const includes = t(`${base}.includes`)
  const others = SERVICES.filter((s) => s.slug !== slug).slice(0, 3)
  const hasPricing = slug === 'birthdays' || slug === 'weddings'

  return (
    <>
      <PageHero
        kicker={t(`${base}.eyebrow`)}
        title={t(`${base}.title`)}
        intro={t(`${base}.intro`)}
        image={service.image}
        back={{ to: '/#services', label: t('service.back') }}
      >
        <Button to={`/quote?category=${CATEGORY_FOR_SLUG[slug]}`}>{t('service.quoteFor')}</Button>
      </PageHero>

      <section className="bg-cream py-14 md:py-28">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <h2 className="mb-8 text-3xl font-semibold text-ink md:text-4xl">{t('service.includes')}</h2>
              <ul className="space-y-4">
                {includes.map((item, i) => (
                  <Reveal as="li" key={item} delay={i * 0.05} y={16} className="flex gap-3 text-muted md:text-lg">
                    <span className="mt-1 grid size-6 shrink-0 place-items-center rounded-full bg-gold-gradient text-ink">
                      <Check aria-hidden="true" className="size-3.5" />
                    </span>
                    {item}
                  </Reveal>
                ))}
              </ul>
              {slug === 'live-events' && <p className="mt-6 text-sm text-muted">{t('service.liveNote')}</p>}
              {slug === 'laxz-tech' && <p className="mt-6 flex gap-2 text-sm text-muted"><Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-gold-dark" />{t('service.techNote')}</p>}
              <div className="mt-10">
                <Button to={`/quote?category=${CATEGORY_FOR_SLUG[slug]}`}>{t('service.quoteFor')}</Button>
              </div>
            </div>
          </div>

          <div className="space-y-8 lg:col-span-7">
            {slug === 'birthdays' && (
              <>
                <h2 className="text-3xl font-semibold text-ink md:text-4xl">{t('service.pricing')}</h2>
                <PriceTable title="Birthday packages" columns={[t('service.package'), t('service.guests'), t('service.startingFrom')]} rows={BIRTHDAY_PACKAGES.map((p) => [p.name, p.guests, p.price])} />
              </>
            )}
            {slug === 'weddings' && (
              <>
                <h2 className="text-3xl font-semibold text-ink md:text-4xl">{t('service.pricing')}</h2>
                <PriceTable title={t('service.planningTier')} columns={[t('service.package'), t('service.planningFee')]} rows={WEDDING_PLANNING.map((p) => [p.name, p.price])} />
                <PriceTable title={t('service.allInclusive')} columns={[t('service.package'), t('service.totalBudget')]} rows={WEDDING_BUDGETS.map((p) => [p.name, p.price])} />
                <p className="text-sm text-muted">{t('service.weddingNote')}</p>
              </>
            )}
            {hasPricing && (
              <p className="flex gap-3 rounded-xl border border-gold-dark/30 bg-cream-light p-4 text-sm leading-relaxed text-muted">
                <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-gold-dark" />
                {t('service.disclaimer')}
              </p>
            )}
            {!hasPricing && (
              <div className="grid gap-5 sm:grid-cols-2">
                {others.slice(0, 2).map((s, i) => <ServiceCard key={s.key} service={s} index={i} />)}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="bg-sand py-14 md:py-28">
        <div className="container-x">
          <h2 className="mb-10 text-3xl font-semibold text-ink md:text-4xl">{t('service.other')}</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((s, i) => <ServiceCard key={s.key} service={s} index={i} />)}
          </div>
        </div>
      </section>
    </>
  )
}
