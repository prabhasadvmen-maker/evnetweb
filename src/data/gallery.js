import { IMAGES } from './media'

// category: wedding | birthday | corporate | live
// `span` controls the editorial grid layout on large screens.
export const GALLERY = [
  { id: 'g1', image: IMAGES.weddingChairs, category: 'wedding', span: 'tall', alt: 'Two decorated wedding chairs on a lawn' },
  { id: 'g2', image: IMAGES.concertStage, category: 'live', span: 'wide', alt: 'Stage lights over a cheering crowd' },
  { id: 'g3', image: IMAGES.balloons, category: 'birthday', span: 'tall', alt: 'Colourful balloons for a birthday celebration' },
  { id: 'g4', image: IMAGES.gala, category: 'corporate', span: 'wide', alt: 'Corporate gala audience in a hall with a stage screen' },
  { id: 'g5', image: IMAGES.weddingTable, category: 'wedding', span: 'normal', alt: 'Long wedding banquet table with floral decor' },
  { id: 'g6', image: IMAGES.confetti, category: 'live', span: 'normal', alt: 'Confetti falling over a festival crowd' },
  { id: 'g7', image: IMAGES.colourBurst, category: 'birthday', span: 'normal', alt: 'Colour-powder burst at a party' },
  { id: 'g8', image: IMAGES.hall, category: 'corporate', span: 'normal', alt: 'Conference hall with projector screens' },
  { id: 'g9', image: IMAGES.weddingBouquet, category: 'wedding', span: 'tall', alt: 'Bride holding a bouquet in warm light' },
  { id: 'g10', image: IMAGES.concertColour, category: 'live', span: 'wide', alt: 'Colourful laser lights at a live concert' },
  { id: 'g11', image: IMAGES.toast, category: 'birthday', span: 'normal', alt: 'Guests toasting at a celebration dinner' },
  { id: 'g13', image: IMAGES.ballroom, category: 'wedding', span: 'wide', alt: 'Grand banquet hall with chandeliers and styled tables' },
  { id: 'g14', image: IMAGES.mandap, category: 'wedding', span: 'tall', alt: 'Floral mandap for an Indian wedding ceremony' },
  { id: 'g15', image: IMAGES.gazebo, category: 'wedding', span: 'tall', alt: 'Garden gazebo ceremony with white chairs and florals' },
  { id: 'g12', image: IMAGES.dinner, category: 'wedding', span: 'normal', alt: 'Elegant dinner table with flowers and glassware' },
]

export const GALLERY_FILTERS = ['all', 'wedding', 'birthday', 'corporate', 'live']
