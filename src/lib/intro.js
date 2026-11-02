// Computed once at load: how long hero animations should wait for the preloader.
const seen = (() => {
  try {
    return sessionStorage.getItem('laxz-preloader-seen') === '1'
  } catch {
    return false
  }
})()

const reduced =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const INTRO_DELAY = seen || reduced ? 0.1 : 2.5
