import { Box } from '@mui/material'
import { motion } from 'motion/react'
import { motion as m } from '../../theme/tokens'

// A tasting-note fruit that hides behind its card at `rest` and fans out to `out`.
// Render it before the card so it stays behind it.
export default function Fruit({ src, flip, placement, active, index }) {
  const { width, height, rest, out } = placement
  const pose = active ? out : rest
  const scale = active ? 1 : 0.7

  return (
    <Box
      component={motion.img}
      src={src}
      alt=""
      aria-hidden
      initial={false}
      animate={{
        x: pose.x,
        y: pose.y,
        rotate: pose.rotate,
        // Figma mirrors the orange slice
        scaleX: flip ? -scale : scale,
        scaleY: scale,
      }}
      transition={{ ...m.spring, delay: active ? index * m.stagger : 0 }}
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width,
        height,
        maxWidth: 'none',
        objectFit: 'contain',
        pointerEvents: 'none',
        filter: 'drop-shadow(0 6px 8px rgba(4, 28, 44, 0.25))',
      }}
    />
  )
}
