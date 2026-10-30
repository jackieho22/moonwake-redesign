import seriesNova from '../assets/photos/series-nova.webp'
import seriesNovaSmall from '../assets/photos/series-nova-800.webp'
import seriesFruitForward from '../assets/photos/series-fruit-forward.webp'
import seriesFruitForwardSmall from '../assets/photos/series-fruit-forward-800.webp'
import seriesCocoaForward from '../assets/photos/series-cocoa-forward.webp'
import seriesCocoaForwardSmall from '../assets/photos/series-cocoa-forward-800.webp'
import seriesExploratory from '../assets/photos/series-exploratory.webp'
import seriesExploratorySmall from '../assets/photos/series-exploratory-800.webp'
import seriesDecaf from '../assets/photos/series-decaf.webp'
import seriesDecafSmall from '../assets/photos/series-decaf-800.webp'

// Ordered as in the shop menu. `imagePosition` picks the band of each photo that
// shows in the wide, short bars. `notes` are placeholder profile words drawn
// from each description — swap in Moonwake's own tasting language.
export const series = [
  {
    id: 'nova',
    image: seriesNova,
    imageSmall: seriesNovaSmall,
    imageAlt: 'A producer smiling over raised beds of drying coffee',
    imagePosition: 'center 22%',
    name: 'Nova',
    description:
      'exceptional rare harvest coffees from the world’s top award-winning producers -- curated to showcase highly brilliant and one-of-a-kind flavors',
    notes: ['brilliant', 'complex', 'rare'],
  },
  {
    id: 'fruit-forward',
    image: seriesFruitForward,
    imageSmall: seriesFruitForwardSmall,
    imageAlt: 'Ripe red and green coffee cherries on the branch',
    imagePosition: 'center 45%',
    name: 'Fruit Forward',
    description:
      'coffees curated for elevated acidity and balanced fruit-forward profiles with lower intervention processing to highlight origin',
    notes: ['bright', 'juicy', 'vibrant'],
  },
  {
    id: 'cocoa-forward',
    image: seriesCocoaForward,
    imageSmall: seriesCocoaForwardSmall,
    imageAlt: 'Coffee drying on a patio below green mountains',
    imagePosition: 'center 62%',
    name: 'Cocoa Forward',
    description: 'coffees curated for lower acidity, while maintaining complexity and sweetness',
    notes: ['chocolatey', 'sweet', 'smooth'],
  },
  {
    id: 'exploratory',
    image: seriesExploratory,
    imageSmall: seriesExploratorySmall,
    imageAlt: 'A team hand-sorting freshly picked coffee cherries',
    imagePosition: 'center 55%',
    name: 'Exploratory',
    description:
      'explore the boundaries of specialty coffee with us. featuring processing innovation and other experimentations in the world of coffee',
    notes: ['experimental', 'unexpected', 'bold'],
  },
  {
    id: 'decaf',
    image: seriesDecaf,
    imageSmall: seriesDecafSmall,
    imageAlt: 'A pour-over carafe and cup served on a wooden tray',
    imagePosition: 'center 58%',
    name: 'Decaf',
    description: 'decafs selected with the same rigor as our caffeinated offerings',
    notes: ['balanced', 'clean', 'sweet'],
  },
]
