import Button from '../components/ui/Button'
import PageHero from '../components/ui/PageHero'
import ParallaxImage from '../components/ui/ParallaxImage'
import { Reveal, SectionHeading } from '../components/ui/Reveal'
import { IMAGES, img } from '../data/media'
import { useI18n } from '../i18n/useI18n'

export default function AboutPage() {
  const { t } = useI18n()
  const pillars = t('intro.pillars')
  const why = t('why.items')

  return (
    <>
      <PageHero kicker={t('intro.kicker')} title={t('intro.title')} image={IMAGES.ballroom} />

      <section className="bg-cream-light py-14 md:py-28">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2">
          <ParallaxImage src={img(IMAGES.weddingTable, 1000, 70)} alt="" className="aspect-[4/5] rounded-t-[10rem] rounded-b-2xl border-2 border-gold-dark/60" />
          <div className="space-y-5 text-lg leading-relaxed text-muted">
            {t('intro.body').map((p) => <Reveal key={p}>{p}</Reveal>)}
            <Reveal className="pt-2 font-display text-3xl font-medium italic text-gold-dark">{t('intro.tagline')}</Reveal>
            <Reveal className="pt-4"><Button to="/quote">{t('cta.button')}</Button></Reveal>
          </div>
        </div>
      </section>

      <section className="bg-cream py-14 md:py-28">
        <div className="container-x">
          <SectionHeading kicker={t('how.kicker')} title={t('how.title')} />
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-gold/30 bg-gold/30 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p, i) => (
              <Reveal key={p.t} delay={i * 0.08} y={24} className="bg-cream-light p-7">
                <span className="font-display text-3xl font-semibold text-gold-dark">0{i + 1}</span>
                <h3 className="mt-3 text-2xl font-semibold uppercase tracking-wide text-ink">{p.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{p.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sand py-14 md:py-28">
        <div className="container-x">
          <SectionHeading kicker={t('why.kicker')} title={t('why.title')} />
          <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {why.map((item, i) => (
              <Reveal as="li" key={item.t} delay={i * 0.06} y={24} className="card-light rounded-2xl p-6">
                <h3 className="text-2xl font-semibold text-ink">{item.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.d}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
