import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

// `tone` is the surface the button sits on: 'light' (cream) or 'dark' (black).
const VARIANTS = {
  primary:
    'bg-gold-gradient text-ink shadow-[0_12px_30px_-12px_rgba(184,137,70,.7)] hover:shadow-[0_16px_36px_-10px_rgba(184,137,70,.85)]',
  solid: 'bg-beige text-ink hover:bg-gold-soft',
  outline: {
    light: 'border border-ink/60 text-ink hover:border-gold-dark hover:bg-gold-gradient',
    dark: 'border border-ink/60 text-ink hover:border-gold-dark hover:bg-gold-gradient',
  },
  ghost: { light: 'text-gold-dark hover:text-ink', dark: 'text-gold-dark hover:text-ink' },
}

const MotionLink = motion.create(Link)

// Magnetic-style CTA: the button gently follows the cursor on hover (fine pointers only).
export default function Button({
  children,
  to,
  href,
  onClick,
  variant = 'primary',
  tone = 'light',
  arrow = true,
  className = '',
  type = 'button',
  disabled,
  ...rest
}) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 })

  const onMove = (e) => {
    if (reduce || e.pointerType === 'touch' || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * 0.25)
    y.set((e.clientY - (r.top + r.height / 2)) * 0.35)
  }
  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  const classes = `group relative inline-flex min-h-12 items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.16em] transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-60 ${typeof VARIANTS[variant] === 'string' ? VARIANTS[variant] : VARIANTS[variant][tone]} ${className}`
  const style = { x: sx, y: sy }
  const inner = (
    <>
      <span className="relative z-10">{children}</span>
      {arrow && (
        <ArrowRight
          aria-hidden="true"
          className="relative z-10 size-4 transition-transform duration-300 group-hover:translate-x-1"
        />
      )}
      {variant === 'primary' && (
        <span
          aria-hidden="true"
          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 group-hover:translate-x-full"
        />
      )}
    </>
  )

  const common = { ref, style, onPointerMove: onMove, onPointerLeave: onLeave, className: classes, ...rest }

  if (to) return <MotionLink to={to} onClick={onClick} {...common}>{inner}</MotionLink>
  if (href)
    return (
      <motion.a href={href} onClick={onClick} {...common}>
        {inner}
      </motion.a>
    )
  return (
    <motion.button type={type} onClick={onClick} disabled={disabled} {...common}>
      {inner}
    </motion.button>
  )
}
