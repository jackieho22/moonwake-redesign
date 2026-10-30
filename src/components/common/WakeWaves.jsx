import { Box } from '@mui/material'
import { motion, useReducedMotion } from 'motion/react'
import { colors } from '../../theme/tokens'

// The "wake" streaks from the Moonwake logo, as a quiet background texture.
// Drop it as the first child of any `position: relative` block; it fills the block and
// sits behind the content.
//
// The art is drawn on a wide 2400×640 canvas centred on the 1440 desktop frame and
// scaled to the block's height (`slice`), so streaks never stretch or squash: wider
// screens reveal more of the canvas instead of repeating it.

const CANVAS = { width: 2400, height: 640 }

// One logo streak: a long lens with pointed ends, a slightly uneven top edge and a
// flatter underside, like the bands under the moon.
function streak(x, y, length, thickness) {
  const t = thickness
  const at = (f) => Math.round(x + length * f)
  return [
    `M${x} ${y}`,
    `C${at(0.16)} ${y - t * 1.25} ${at(0.36)} ${y - t * 1.4} ${at(0.52)} ${y - t * 1.3}`,
    `C${at(0.68)} ${y - t * 1.2} ${at(0.86)} ${y - t * 1.1} ${x + length} ${y}`,
    `C${at(0.78)} ${y + t * 0.45} ${at(0.22)} ${y + t * 0.45} ${x} ${y}Z`,
  ].join(' ')
}

// A wake: streaks stacked downwards, each shorter than the last, like the logo's
// inverted triangle of reflections. `lengths` run top to bottom.
function wake({ cx, y, lengths, thickness = 10, gap = 22, lean = 0 }) {
  return lengths.map((length, i) => streak(Math.round(cx - length / 2 + i * lean), y + i * gap, length, thickness))
}

// Content area of the 1440 frame spans x 520–1880 on the canvas.
// Clusters avoid the heading (top left) and mostly sit where the cards leave gaps.
const groups = [
  // Beside the heading, above the cards
  {
    tone: 'light',
    drift: 18,
    duration: 28,
    paths: wake({ cx: 1560, y: 64, lengths: [560, 450, 340, 220, 80], lean: 14 }),
  },
  // One long calm line through the card row, seen between the cards
  { tone: 'dark', drift: 24, duration: 34, paths: [streak(260, 372, 1880, 12)] },
  // Under the cards
  { tone: 'dark', drift: 14, duration: 30, paths: wake({ cx: 960, y: 600, lengths: [640, 480, 280], lean: -10 }) },
  // Only visible on screens wider than the frame
  { tone: 'light', drift: 16, duration: 32, paths: wake({ cx: 420, y: 236, lengths: [380, 290, 190, 70] }) },
  { tone: 'dark', drift: 16, duration: 36, paths: wake({ cx: 1990, y: 470, lengths: [420, 320, 200, 70], lean: 10 }) },
]

const tones = {
  light: { fill: colors.paper, opacity: 0.22 },
  dark: { fill: colors.navy, opacity: 0.07 },
}

// `scale` shrinks the streaks (e.g. 0.6 on phones) without stretching them.
export default function WakeWaves({ scale = 1, sx }) {
  const reduce = useReducedMotion()

  return (
    <Box
      aria-hidden
      sx={[
        { position: 'absolute', inset: 0, overflow: 'hidden', borderRadius: 'inherit', pointerEvents: 'none' },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <svg
        width={`${100 / scale}%`}
        height={`${100 / scale}%`}
        viewBox={`0 0 ${CANVAS.width} ${CANVAS.height}`}
        preserveAspectRatio="xMidYMid slice"
        style={{ display: 'block', transform: `scale(${scale})`, transformOrigin: '0 0' }}
      >
        {groups.map(({ tone, drift, duration, paths }, i) => (
          <motion.g
            key={i}
            {...tones[tone]}
            // A slow back-and-forth, like a calm wake; each group on its own timing
            animate={reduce ? undefined : { x: [0, drift, 0] }}
            transition={{ duration, ease: 'easeInOut', repeat: Infinity }}
          >
            {paths.map((d, j) => (
              <path key={j} d={d} />
            ))}
          </motion.g>
        ))}
      </svg>
    </Box>
  )
}
