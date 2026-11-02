import { Link } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import { Reveal, SplitText } from './Reveal'
import { img } from '../../data/media'

// Light page hero: text on cream with a gold-framed arched photo, used by inner pages.
export default function PageHero({ kicker, title, intro, image, back, children }) {
  return (
    <section className="glow relative isolate overflow-hidden bg-cream pb-16 pt-32 md:pb-24 md:pt-40">
      <div className="container-x grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
        <div>
          {back && (
            <Link to={back.to} className="mb-8 inline-flex items-center gap-1 text-sm font-medium text-muted transition-colors hover:text-ink">
              <ChevronLeft aria-hidden="true" className="size-4" /> {back.label}
            </Link>
          )}
          <Reveal className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.32em] text-gold-dark">
            <span aria-hidden="true" className="h-px w-10 bg-gold-dark" />
            {kicker}
          </Reveal>
          <SplitText as="h1" immediate text={title} className="text-[2.5rem] font-semibold uppercase leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-7xl" />
          {intro && <Reveal delay={0.3} className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{intro}</Reveal>}
          {children && <Reveal delay={0.4} className="mt-8">{children}</Reveal>}
        </div>

        {image && (
          <Reveal y={0} className="relative lg:-mr-10 xl:-mr-20">
            <div aria-hidden="true" className="arch-frame absolute -inset-2 hidden border border-gold-dark/50 lg:block" />
            <div className="arch-frame relative aspect-[4/3] overflow-hidden border-2 border-gold-dark/70 bg-beige shadow-[0_30px_70px_-30px_rgba(184,137,70,.55)] lg:aspect-[4/3.3] lg:border-r-0">
              <img src={img(image, 1600, 72)} alt="" fetchPriority="high" className="size-full object-cover" />
            </div>
          </Reveal>
        )}
      </div>
    </section>
  )
}
