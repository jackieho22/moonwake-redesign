// Ask a Barista quiz. Every question renders with the same template, so adding,
// removing or reordering questions here is all it takes to change the quiz.
// Each answer adds its `tags` to the shopper's profile; recommend() scores coffees
// by how many of those tags they share (see coffees.js).

export const questions = [
  {
    id: 'brew',
    prompt: 'how do you enjoy your brews?',
    answers: [
      { id: 'espresso', label: 'espresso-based', tags: ['espresso'] },
      { id: 'pour-over', label: 'pour-over', tags: ['pour-over'] },
      { id: 'drip', label: 'drip machine', tags: ['drip'] },
      { id: 'french-press', label: 'french press', tags: ['french-press'] },
      { id: 'aeropress', label: 'aero press', tags: ['aeropress'] },
      { id: 'unsure', label: 'I’m not sure', tags: [] },
    ],
  },
  {
    id: 'milk',
    prompt: 'black or with milk?',
    answers: [
      { id: 'black', label: 'black', tags: ['black'] },
      { id: 'milk', label: 'with milk', tags: ['milk'] },
    ],
  },
  {
    id: 'flavor',
    prompt: 'which sounds better?',
    answers: [
      { id: 'fruity', label: 'bright and fruity, like berries and citrus', tags: ['fruity'] },
      { id: 'chocolatey', label: 'rich and chocolatey, like cocoa and nuts', tags: ['chocolatey'] },
      { id: 'floral', label: 'floral and smooth, like tea', tags: ['floral', 'tea-like'] },
    ],
  },
  {
    id: 'adventure',
    prompt: 'how adventurous are you feeling?',
    answers: [
      { id: 'classic', label: 'classic and comforting', tags: ['classic'] },
      { id: 'adventurous', label: 'something you’ve never tasted', tags: ['adventurous'] },
    ],
  },
  {
    id: 'caffeine',
    prompt: 'caffeine?',
    answers: [
      { id: 'regular', label: 'regular', tags: ['regular'] },
      { id: 'decaf', label: 'decaf', tags: ['decaf'] },
    ],
  },
]
