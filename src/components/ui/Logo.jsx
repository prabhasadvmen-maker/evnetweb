import { LOGO_SRC } from '../../config/site'

// Transparent logo artwork (black + gold). The source image has generous transparent padding,
// so it is scaled up to trim it.
export default function Logo({ className = '', size = 'md' }) {
  const heights = { sm: 'h-11 md:h-14', md: 'h-12 md:h-14', lg: 'h-16 md:h-24' }
  return (
    <span role="img" aria-label="LAXZ EVENTS – Plan, Create, Celebrate" className={`block aspect-[2/1] shrink-0 overflow-hidden ${heights[size]} ${className}`}>
      <img src={LOGO_SRC} alt="" decoding="async" fetchPriority="high" draggable="false" className="size-full origin-center scale-[1.45] select-none object-contain" />
    </span>
  )
}
