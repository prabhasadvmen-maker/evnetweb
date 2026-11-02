// Concept imagery (Unsplash, licensed for free use). Labelled as inspiration in the UI
// until LAXZ supplies genuine portfolio photos. Swap IDs / URLs here to update the site.
const u = (id) => `https://images.unsplash.com/photo-${id}`

export const img = (id, w = 1200, q = 70) =>
  `${u(id)}?w=${w}&q=${q}&auto=format&fit=crop`

export const IMAGES = {
  heroStage: '1468359601543-843bfaef291a',
  heroWedding: '1519741497674-611481863552',
  heroConference: '1540575467063-178a50c2df87',
  balloons: '1530103862676-de8c9debad1d',
  weddingTable: '1519225421980-715cb0215aed',
  weddingChairs: '1522673607200-164d1b6ce486',
  weddingBouquet: '1519741497674-611481863552',
  confetti: '1492684223066-81342ee5ff30',
  concertGlow: '1470229722913-7c0e2dbbafd3',
  concertStage: '1459749411175-04bf5292ceea',
  concertColour: '1514525253161-7a46d19cd819',
  concertCrowd: '1505236858219-8359eb29e329',
  concertHearts: '1429962714451-bb934ecdc4ec',
  gala: '1531058020387-3be344556be6',
  hall: '1511578314322-379afb476865',
  dinner: '1511795409834-ef04bbd61622',
  toast: '1527529482837-4698179dc6ce',
  partyTable: '1496024840928-4c417adf211d',
  colourBurst: '1478146896981-b80fe463b330',
  reception: '1464366400600-7168b8af9bc3',
  ballroom: '1712314947761-a8d718bd8c32',
  mandap: '1587271636175-90d58cdad458',
  gazebo: '1523438885200-e635ba2c371e',
}
