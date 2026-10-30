import novaLabel from '../assets/photos/nova-label.webp'
import novaFarmers from '../assets/photos/nova-farmers.webp'
import chavezFarmers from '../assets/photos/chavez-farmers.webp'
import juanMartinFarmers from '../assets/photos/juan-martin-farmers.webp'
import gp92Farmers from '../assets/photos/gp92-farmers.webp'
import chavezLabel from '../assets/photos/chavez-label.webp'
import juanMartinLabel from '../assets/photos/juan-martin-label.webp'
import wushWushLabel from '../assets/photos/gp92-wush-wush-label.webp'
import plumcot from '../assets/fruit/plumcot.png'
import mandarinOrange from '../assets/fruit/mandarin-orange.png'
import raspberry from '../assets/fruit/raspberry.png'
import mangosteen from '../assets/fruit/mangosteen.webp'
import orangeBlossom from '../assets/fruit/orange-blossom.webp'
import sakura from '../assets/fruit/sakura.webp'
import sugarPear from '../assets/fruit/sugar-pear.webp'
import pomelo from '../assets/fruit/pomelo.webp'
import whiteFlorals from '../assets/fruit/white-florals.webp'
import lemon from '../assets/fruit/lemon.webp'
import cranberry from '../assets/fruit/cranberry.webp'
import plum from '../assets/fruit/plum.webp'

// The coffee catalog. Add a coffee here and it shows up in This Month's Roasts and the
// barista quiz automatically: `tags` are matched against the tags each quiz answer adds (see quiz.js).
//
// Each fruit has two placements (px, relative to the card's top-left):
// `card` for the 253px This Month's Roasts card, `feature` for the 251px quiz result card.
// `rest` sits hidden behind the card, `out` is where the fruit lands when it fans out.
// Tune per-fruit size and `out` here; the components stay the same.

const CARD_BOX = { width: 253, height: 223 } // roast card image area
const FEATURE_BOX = { width: 251, height: 251 }

// Tucks the fruit behind the middle of the card, so only size and `out` need tuning.
const place = (box, [width, height], out) => ({
  width,
  height,
  rest: { x: Math.round((box.width - width) / 2), y: Math.round((box.height - height) / 2), rotate: 0 },
  out,
})

export const coffees = [
  {
    id: 'esmeralda-guabo-gesha',
    name: 'Hacienda La Esmeralda',
    fullName: 'Hacienda La Esmeralda - The Peterson Family - Guabo 4 Natural Gesha',
    series: 'Nova Series',
    price: '$71.00',
    tastingNotes: 'plumcot, mandarin orange, raspberry, complex florals',
    baristaNote: 'If you love a juicy cup, the plumcot and mandarin orange in this one taste like summer fruit, with a raspberry finish.',
    image: novaLabel,
    farmerImage: novaFarmers,
    farmerAlt: 'The Peterson family at their drying beds',
    fruit: [
      {
        id: 'plumcot',
        label: 'plumcot',
        src: plumcot,
        card: { width: 111, height: 136, rest: { x: 24, y: 24, rotate: 0 }, out: { x: -88, y: -72, rotate: -14 } },
        feature: { width: 124, height: 152, rest: { x: 63, y: 50, rotate: 0 }, out: { x: -78, y: -38, rotate: -14 } },
      },
      {
        id: 'mandarin-orange',
        label: 'mandarin orange',
        src: mandarinOrange,
        flip: true,
        card: { width: 106, height: 77, rest: { x: 120, y: 70, rotate: 0 }, out: { x: 212, y: 40, rotate: 14 } },
        feature: { width: 117, height: 85, rest: { x: 70, y: 80, rotate: 0 }, out: { x: 218, y: 48, rotate: 14 } },
      },
      {
        id: 'raspberry',
        label: 'raspberry',
        src: raspberry,
        card: { width: 128, height: 86, rest: { x: 40, y: 120, rotate: 0 }, out: { x: -92, y: 196, rotate: -10 } },
        feature: { width: 144, height: 97, rest: { x: 55, y: 80, rotate: 0 }, out: { x: -90, y: 186, rotate: -10 } },
      },
    ],
    tags: ['pour-over', 'aeropress', 'drip', 'black', 'fruity', 'floral', 'tea-like', 'adventurous', 'regular'],
  },
  {
    id: 'chavez-estate-lot-3',
    name: 'Chavez Estate',
    fullName: 'Chavez Estate Lot #3 - Jhenrri Chavez - Washed SL9 - Peru',
    series: 'Nova Series',
    price: '$32.00',
    tastingNotes: 'mangosteen, orange blossom, sakura',
    baristaNote: 'If you like your coffee floral, the orange blossom and sakura in this one are delicate and sweet, with a soft mangosteen center.',
    image: chavezLabel,
    farmerImage: chavezFarmers,
    farmerAlt: 'A Chavez Estate producer raking coffee on raised drying beds',
    // His hat sits at the very top of the photo
    farmerPosition: 'center 8%',
    fruit: [
      {
        id: 'mangosteen',
        label: 'mangosteen',
        src: mangosteen,
        card: place(CARD_BOX, [106, 110], { x: -84, y: -70, rotate: -12 }),
        feature: place(FEATURE_BOX, [117, 121], { x: -76, y: -36, rotate: -12 }),
      },
      {
        id: 'orange-blossom',
        label: 'orange blossom',
        src: orangeBlossom,
        // Wide, delicate sprig: larger and further out so it reads past the card edge
        card: place(CARD_BOX, [136, 108], { x: 210, y: 26, rotate: 12 }),
        feature: place(FEATURE_BOX, [144, 114], { x: 214, y: 36, rotate: 12 }),
      },
      {
        id: 'sakura',
        label: 'sakura',
        src: sakura,
        card: place(CARD_BOX, [117, 104], { x: -92, y: 184, rotate: -10 }),
        feature: place(FEATURE_BOX, [129, 114], { x: -88, y: 176, rotate: -10 }),
      },
    ],
    tags: ['pour-over', 'aeropress', 'black', 'floral', 'tea-like', 'adventurous', 'regular'],
  },
  {
    id: 'finca-juan-martin',
    name: 'Finca Juan Martin',
    fullName: 'Finca Juan Martin - Banexport Project - Washed Gesha - Colombia',
    series: 'Fruit Forward Series',
    price: '$32.00',
    tastingNotes: 'lemon, cranberry, plum',
    baristaNote: 'If you like bright citrus, the lemon and cranberry in this one will wake you up, with a deep plum sweetness underneath.',
    image: juanMartinLabel,
    farmerImage: juanMartinFarmers,
    farmerAlt: 'A Finca Juan Martin producer smiling among the coffee plants',
    fruit: [
      {
        id: 'lemon',
        label: 'lemon',
        src: lemon,
        card: place(CARD_BOX, [102, 105], { x: -80, y: -66, rotate: -14 }),
        feature: place(FEATURE_BOX, [112, 115], { x: -72, y: -34, rotate: -14 }),
      },
      {
        id: 'cranberry',
        label: 'cranberry',
        src: cranberry,
        card: place(CARD_BOX, [122, 80], { x: 208, y: 44, rotate: 12 }),
        feature: place(FEATURE_BOX, [134, 88], { x: 214, y: 50, rotate: 12 }),
      },
      {
        id: 'plum',
        label: 'plum',
        src: plum,
        card: place(CARD_BOX, [108, 105], { x: -88, y: 190, rotate: -10 }),
        feature: place(FEATURE_BOX, [119, 116], { x: -86, y: 180, rotate: -10 }),
      },
    ],
    tags: ['espresso', 'aeropress', 'black', 'milk', 'fruity', 'chocolatey', 'adventurous', 'regular'],
  },
  {
    id: 'gp92-wush-wush',
    name: 'GP92 Wush Wush',
    fullName: 'Granja Paraiso 92 - Wush Wush - Colombia',
    series: 'Exploratory Series',
    // Placeholder: price not set yet
    price: '$30.00',
    tastingNotes: 'sugar pear, pomelo, white floral',
    baristaNote: 'If you want something bright but gentle, the sugar pear and pomelo keep this one crisp, with white florals throughout.',
    image: wushWushLabel,
    farmerImage: gp92Farmers,
    farmerAlt: 'The Granja Paraiso 92 producer holding a coffee cherry in the field',
    fruit: [
      {
        id: 'sugar-pear',
        label: 'sugar pear',
        src: sugarPear,
        card: place(CARD_BOX, [104, 108], { x: -82, y: -68, rotate: -10 }),
        feature: place(FEATURE_BOX, [114, 119], { x: -74, y: -36, rotate: -10 }),
      },
      {
        id: 'pomelo',
        label: 'pomelo',
        src: pomelo,
        card: place(CARD_BOX, [118, 119], { x: 204, y: 30, rotate: 10 }),
        feature: place(FEATURE_BOX, [130, 131], { x: 210, y: 38, rotate: 10 }),
      },
      {
        id: 'white-floral',
        label: 'white floral',
        src: whiteFlorals,
        // Flat sprig: pushed further left so more of it clears the card
        card: place(CARD_BOX, [152, 96], { x: -116, y: 190, rotate: -8 }),
        feature: place(FEATURE_BOX, [162, 103], { x: -110, y: 180, rotate: -8 }),
      },
    ],
    tags: ['drip', 'french-press', 'milk', 'fruity', 'floral', 'classic', 'regular'],
  },
]
