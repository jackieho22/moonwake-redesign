import { useLayoutEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import { motion } from 'motion/react'
import useHoverReveal from '../hooks/useHoverReveal'
import useElementWidth from '../hooks/useElementWidth'
import Container from './common/Container'
import WakeWaves from './common/WakeWaves'
import { wakeEdge } from './common/wakeEdge'
import Fruit from './common/Fruit'
import { roasts } from '../data/roasts'
import { layout, motion as m } from '../theme/tokens'

// Design size of a card. Cards now grow with the container; the image keeps this
// ratio and the fruit (placed in coffees.js against this size) scales with the card.
const CARD_WIDTH = 253
const IMAGE_HEIGHT = 223

// Compare the two band edges with ?edge=wave. Drop once one is chosen.
// The outer cards now sit at the container edge, so fanned fruit is nudged
// to stay this far inside the viewport instead of being cut off.
const SCREEN_MARGIN = 16
// Share of a fruit allowed past that edge, so it still reads as fanning out
const BLEED = 0.3

// Clamp a fruit's fanned-out x (card units) to the visible range.
const keepOnScreen = (placement, bounds) =>
  bounds
    ? { ...placement, out: { ...placement.out, x: Math.min(Math.max(placement.out.x, bounds.min - placement.width * BLEED), bounds.max - placement.width * (1 - BLEED)) } }
    : placement

const EDGE = new URLSearchParams(window.location.search).get('edge') === 'wave' ? 'wave' : 'straight'

function RoastCard({ roast }) {
  const { active, handlers } = useHoverReveal()
  const [ref, width] = useElementWidth()
  const scale = width ? width / CARD_WIDTH : 1
  const [bounds, setBounds] = useState(null)

  // Measure where the card sits each time it opens
  useLayoutEffect(() => {
    if (!active || !ref.current) return
    const { left } = ref.current.getBoundingClientRect()
    const view = document.documentElement.clientWidth
    setBounds({ min: (SCREEN_MARGIN - left) / scale, max: (view - SCREEN_MARGIN - left) / scale })
  }, [active, scale, ref])

  return (
    <Box
      ref={ref}
      tabIndex={0}
      aria-label={`${roast.series}: ${roast.fullName}, ${roast.price} USD`}
      {...handlers}
      sx={{
        position: 'relative',
        // Lift the hovered card's stacking context so its fruit clears neighbours
        zIndex: active ? 2 : 1,
        outline: 'none',
      }}
    >
      {/* Tasting notes live behind the card and fan out on hover */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: CARD_WIDTH,
          height: IMAGE_HEIGHT,
          transformOrigin: '0 0',
          transform: `scale(${scale})`,
        }}
      >
        {roast.fruit.map((note, i) => (
          <Fruit key={note.id} src={note.src} flip={note.flip} placement={keepOnScreen(note.card, bounds)} active={active} index={i} />
        ))}
      </Box>

      <Box
        component={motion.article}
        initial={false}
        animate={{ y: active ? -4 : 0 }}
        transition={{ duration: m.base, ease: m.ease }}
        sx={(theme) => ({
          position: 'relative',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          bgcolor: 'background.paper',
          borderRadius: `${theme.shape.borderRadius}px`,
          boxShadow: active ? theme.customShadows.liftedHover : theme.customShadows.lifted,
          transition: 'box-shadow 350ms ease',
          '[tabindex]:focus-visible > &': {
            outline: `2px solid ${theme.palette.primary.main}`,
            outlineOffset: 3,
          },
        })}
      >
        <Box sx={{ position: 'relative', aspectRatio: `${CARD_WIDTH} / ${IMAGE_HEIGHT}`, flexShrink: 0, bgcolor: 'brand.placeholder' }}>
          <Box
            component="img"
            src={roast.image}
            alt={`${roast.fullName} label`}
            sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
          />
          {/* Farmer photo: stays mounted (so it's loaded before the first hover) and
              settles in on the same spring and stagger rhythm as the fruit */}
          {roast.farmerImage && (
            <Box
              component={motion.img}
              src={roast.farmerImage}
              alt={active ? roast.farmerAlt : ''}
              aria-hidden={!active}
              initial={false}
              animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 1.06 }}
              transition={{ ...m.spring, opacity: { duration: m.base, ease: m.ease } }}
              sx={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                // Faces sit in the upper part of these portraits
                objectPosition: roast.farmerPosition ?? 'center 30%',
              }}
            />
          )}
        </Box>
        {/* Height follows the content; cards in the row stretch to match */}
        <Box sx={{ flex: 1, px: 3, pt: 4, pb: 4, display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography variant="h4" component="h3">
            {roast.series}
          </Typography>
          <Typography sx={{ fontSize: 13, lineHeight: '18px' }}>{roast.fullName}</Typography>
          <Typography sx={{ fontFamily: 'Assistant', fontSize: 16, mt: 'auto', pt: 3 }}>{roast.price} USD</Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default function MonthlyRoasts() {
  return (
    <Box
      component="section"
      sx={[
        (theme) => ({
          position: 'relative',
          mt: layout.sectionGap,
          bgcolor: 'brand.mist',
          borderRadius: `${theme.shape.borderRadius}px`,
          py: EDGE === 'wave' ? '96px' : '70px',
        }),
        EDGE === 'wave' && wakeEdge,
      ]}
    >
      <WakeWaves />
      <Container sx={{ position: 'relative' }}>
        <Typography variant="h3" component="h2" sx={{ color: 'brand.paper', mb: 5 }}>
          This Month’s Roasts
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', columnGap: 'clamp(40px, 4.5vw, 72px)' }}>
          {roasts.map((roast) => (
            <RoastCard key={roast.id} roast={roast} />
          ))}
        </Box>
      </Container>
    </Box>
  )
}
