// Optional wavy top and bottom edges for a section, instead of straight edges with
// rounded corners. Spread into the section's `sx`. The edge is one gentle swell
// across the full width, so it is never tiled.
const EDGE = 40
const edgeSvg = (d) =>
  `url("data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 ${EDGE}' preserveAspectRatio='none'><path d='${d}'/></svg>`,
  )}")`
const topEdge = edgeSvg(`M0 ${EDGE}V20C260 2 520 4 760 16S1220 34 1440 12V${EDGE}Z`)
const bottomEdge = edgeSvg('M0 0V18C240 36 520 34 760 22S1200 6 1440 26V0Z')
const mask = [
  `${topEdge} top / 100% ${EDGE}px no-repeat`,
  `linear-gradient(#000 0 0) center / 100% calc(100% - ${2 * EDGE - 2}px) no-repeat`,
  `${bottomEdge} bottom / 100% ${EDGE}px no-repeat`,
].join(', ')

export const wakeEdge = { mask, WebkitMask: mask, borderRadius: 0 }
