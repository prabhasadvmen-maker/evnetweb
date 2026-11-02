import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]

// Fade + rise on scroll into view. `as` lets it render any element.
export function Reveal({ children, delay = 0, y = 32, className = '', as = 'div', ...rest }) {
  const reduce = useReducedMotion()
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

// Staggered word-by-word masked reveal for headings.
export function SplitText({ text, as = 'h2', className = '', delay = 0, immediate = false, gradientFrom }) {
  const reduce = useReducedMotion()
  const Tag = motion[as]
  const words = String(text).split(' ')
  const trigger = immediate
    ? { animate: 'show' }
    : { whileInView: 'show', viewport: { once: true, margin: '-80px' } }

  return (
    <Tag
      className={className}
      aria-label={text}
      initial={reduce ? 'show' : 'hidden'}
      {...trigger}
      transition={{ staggerChildren: 0.07, delayChildren: delay }}
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`} aria-hidden="true" className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <motion.span
            className={`inline-block ${gradientFrom !== undefined && i >= gradientFrom ? 'text-gold-gradient' : ''}`}
            variants={{ hidden: { y: '110%' }, show: { y: 0 } }}
            transition={{ duration: 0.85, ease: EASE }}
          >
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}

// tone: 'light' for cream surfaces, 'dark' for black ones.
export function SectionHeading({ kicker, title, sub, align = 'left', tone = 'light', className = '' }) {
  const dark = tone === 'dark'
  return (
    <div className={`${align === 'center' ? 'mx-auto text-center' : ''} max-w-3xl ${className}`}>
      {kicker && (
        <Reveal className={`mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.32em] ${dark ? 'text-gold' : 'text-gold-dark'} ${align === 'center' ? 'justify-center' : ''}`}>
          <span aria-hidden="true" className="h-px w-10 bg-current" />
          {kicker}
          {align === 'center' && <span aria-hidden="true" className="h-px w-10 bg-current" />}
        </Reveal>
      )}
      <SplitText
        text={title}
        className={`text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl ${dark ? 'text-cream' : 'text-ink'} ${align === 'center' ? 'justify-center' : ''}`}
      />
      {sub && (
        <Reveal delay={0.2} className={`mt-6 text-base leading-relaxed md:text-lg ${dark ? 'text-cream/75' : 'text-muted'}`}>
          {sub}
        </Reveal>
      )}
    </div>
  )
}
