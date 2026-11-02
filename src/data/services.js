import { Cake, Heart, Briefcase, Music2, Sparkles, Cpu } from 'lucide-react'
import { IMAGES } from './media'

// `key` maps to translations (services.items.<key>); `slug` is the route.
export const SERVICES = [
  { key: 'celebrations', slug: 'birthdays', icon: Cake, image: IMAGES.balloons },
  { key: 'weddings', slug: 'weddings', icon: Heart, image: IMAGES.mandap },
  { key: 'corporate', slug: 'corporate', icon: Briefcase, image: IMAGES.gala },
  { key: 'live', slug: 'live-events', icon: Music2, image: IMAGES.concertStage },
  { key: 'experiences', slug: 'experiences', icon: Sparkles, image: IMAGES.toast },
  { key: 'tech', slug: 'laxz-tech', icon: Cpu, image: IMAGES.hall },
]

export const serviceBySlug = (slug) => SERVICES.find((s) => s.slug === slug)

// Indicative pricing (from the blueprint). Always shown with a disclaimer.
export const BIRTHDAY_PACKAGES = [
  { name: 'MINI', guests: '10–20', price: '₹14,999' },
  { name: 'CLASSIC', guests: '20–40', price: '₹24,999' },
  { name: 'SIGNATURE', guests: '40–70', price: '₹44,999' },
  { name: 'ELITE', guests: '70–150', price: '₹79,999' },
  { name: 'ROYALE', guests: '150–300+', price: '₹1,49,999' },
]

export const WEDDING_PLANNING = [
  { name: 'INTIMATE', price: '₹49,999' },
  { name: 'CLASSIC', price: '₹79,999' },
  { name: 'SIGNATURE', price: '₹1,29,999' },
  { name: 'ELITE', price: '₹1,99,999' },
  { name: 'ROYALE', price: '₹2,99,999+' },
]

export const WEDDING_BUDGETS = [
  { name: 'INTIMATE', price: '₹8–12 lakh' },
  { name: 'CLASSIC', price: '₹15–22 lakh' },
  { name: 'SIGNATURE', price: '₹25–40 lakh' },
  { name: 'ELITE', price: '₹45–75 lakh' },
  { name: 'ROYALE', price: '₹75 lakh+' },
]

export const BUDGET_BANDS = [
  'Under ₹25,000',
  '₹25,000–₹50,000',
  '₹50,000–₹1 lakh',
  '₹1–5 lakh',
  '₹5–10 lakh',
  '₹10–25 lakh',
  '₹25 lakh+',
]
