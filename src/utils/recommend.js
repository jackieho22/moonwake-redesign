// Collect the tags behind each chosen answer. `answers` maps question id → answer id.
export function answerTags(questions, answers) {
  return questions.flatMap((q) => q.answers.find((a) => a.id === answers[q.id])?.tags ?? [])
}

// Score each coffee by how many of the shopper's tags it shares; ties keep catalog order.
export function recommend(tags, catalog, count = catalog.length) {
  const wanted = new Set(tags)
  return catalog
    .map((coffee, order) => ({ coffee, order, score: coffee.tags.filter((t) => wanted.has(t)).length }))
    .sort((a, b) => b.score - a.score || a.order - b.order)
    .slice(0, count)
    .map(({ coffee }) => coffee)
}

// Repeat matches to fill every slot when the catalog is smaller than the slot count.
export function fillSlots(list, count) {
  return Array.from({ length: count }, (_, i) => list[i % list.length])
}

// Portfolio demo: slide a window of `count` along the ranked list each round, wrapping,
// so consecutive finishes show a different set. Swap for `ranked.slice(0, count)`
// once the scoring should decide the results on its own.
export function rotatePicks(ranked, count, round) {
  if (ranked.length <= count) return fillSlots(ranked, count)
  return Array.from({ length: count }, (_, i) => ranked[(round + i) % ranked.length])
}
