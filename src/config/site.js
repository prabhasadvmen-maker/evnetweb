// Central, editable site configuration.
// Fill in the verified business details; empty values are hidden from the UI automatically.
export const SITE = {
  name: 'LAXZ EVENTS',
  // Digits only, with country code (e.g. 919876543210).
  whatsappNumber: '',
  whatsappMessage: 'Hello LAXZ EVENTS, I would like to plan an event.',
  email: '',
  phone: '',
  instagram: '',
  facebook: '',
  linkedin: '',
  youtube: '',
}

export const hasWhatsapp = /^\d{10,15}$/.test(SITE.whatsappNumber) && !/^(\d)\1+$/.test(SITE.whatsappNumber)

export const whatsappLink = (message = SITE.whatsappMessage) =>
  `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`

export const LOGO_SRC = '/LAXZ logo.png'
