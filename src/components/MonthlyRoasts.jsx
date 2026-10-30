import { useLayoutEffect, useRef, useState } from 'react'
import { Box, ButtonBase, Typography } from '@mui/material'
import { motion, useInView } from 'motion/react'
import useHoverReveal from '../hooks/useHoverReveal'
import useElementWidth from '../hooks/useElementWidth'
import { useCompact } from '../hooks/useMedia'
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

// The outer cards sit at the container edge, so fanned fruit is nudged
// to stay this far inside the viewport instead of being cut off.
const SCREEN_MARGIN = 16

// Clamp a fruit's fanned-out x (card units) to the visible range. `bleed` is the share of
// a fruit allowed past that edge, so it still reads as fanning out.
const keepOnScreen = (placement, bounds, bleed) =>
  bounds
    ? {
        ...placement,
        out: {
          ...placement.out,
          x: Math.min(
            Math.max(placement.out.x, bounds.min - placement.width * bleed),
            bounds.max - placement.width * (1 - bleed),
          ),
        },
      }
    : placement

// Compare the two band edges with ?edge=wave. Drop once one is chosen.
const EDGE = new URLSearchParams(window.location.search).get('edge') === 'wave' ? 'wave' : 'straight'

function RoastCard({ roast, carousel }) {
  const { active: revealed, handlers } = useHoverReveal()
  const [ref, width] = useElementWidth()
  // In the phone/tablet carousel the card plays its fruit and farmer reveal once it's
  // (almost) fully in view, i.e. after it snaps into place
  const inView = useInView(ref, { root: carousel, amount: 0.85 })
  const active = revealed || (Boolean(carousel) && inView)
  const scale = width ? width / CARD_WIDTH : 1
  const [bounds, setBounds] = useState(null)

  // Measure where the card sits each time it opens. Not needed in the carousel: the card is
  // still sliding when it opens there, and the carousel clips the fruit at the screen edge anyway
  useLayoutEffect(() => {
    if (carousel || !active || !ref.current) return
    const { left } = ref.current.getBoundingClientRect()
    const view = document.documentElement.clientWidth
    setBounds({ min: (SCREEN_MARGIN - left) / scale, max: (view - SCREEN_MARGIN - left) / scale })
  }, [carousel, active, scale, ref])

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
        // Carousel: one card ~72% of a phone (two and a peek on tablets), snapping to centre
        ...(carousel && { flex: '0 0 auto', width: { xs: '72%', sm: '42%' }, scrollSnapAlign: 'center' }),
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
          <Fruit
            key={note.id}
            src={note.src}
            flip={note.flip}
            placement={carousel ? note.card : keepOnScreen(note.card, bounds, 0.3)}
            active={active}
            index={i}
          />
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
        <Box
          sx={{
            position: 'relative',
            aspectRatio: `${CARD_WIDTH} / ${IMAGE_HEIGHT}`,
            flexShrink: 0,
            bgcolor: 'brand.placeholder',
          }}
        >
          <Box
            component="img"
            src={roast.image}
            alt={`${roast.fullName} label`}
            sx={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'top',
            }}
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
          <Typography sx={{ fontSize: { xs: 16, md: 13 }, lineHeight: { xs: '22px', md: '18px' } }}>
            {roast.fullName}
          </Typography>
          <Typography sx={{ fontFamily: 'Assistant', fontSize: 16, mt: 'auto', pt: 3 }}>{roast.price} USD</Typography>
        </Box>
      </Box>
    </Box>
  )
}

// Position dots under the carousel. Each dot has a 44px tap area around an 8px mark.
function CarouselDots({ count, current, labels, onSelect }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
      {Array.from({ length: count }, (_, i) => (
        <ButtonBase
          key={labels[i]}
          aria-label={`Show ${labels[i]}`}
          aria-current={i === current ? 'true' : undefined}
          onClick={() => onSelect(i)}
          sx={{ width: 44, height: 44, borderRadius: '50%' }}
        >
          <Box
            component={motion.span}
            initial={false}
            animate={{ width: i === current ? 20 : 8 }}
            transition={m.spring}
            sx={{
              height: 8,
              borderRadius: 4,
              bgcolor: i === current ? 'primary.main' : 'rgba(244, 244, 244, 0.7)',
              transition: 'background-color 200ms ease',
            }}
          />
        </ButtonBase>
      ))}
    </Box>
  )
}

export default function MonthlyRoasts() {
  const compact = useCompact()
  const track = useRef(null)
  const [current, setCurrent] = useState(0)

  // The card whose centre is closest to the carousel's centre
  const onScroll = () => {
    const t = track.current
    const mid = t.scrollLeft + t.clientWidth / 2
    const distances = [...t.children].map((c) => Math.abs(c.offsetLeft + c.offsetWidth / 2 - mid))
    setCurrent(distances.indexOf(Math.min(...distances)))
  }

  const scrollToCard = (i) => {
    const t = track.current
    const card = t.children[i]
    t.scrollTo({ left: card.offsetLeft - (t.clientWidth - card.offsetWidth) / 2, behavior: 'smooth' })
  }

  return (
    <Box
      component="section"
      sx={[
        (theme) => ({
          position: 'relative',
          mt: layout.sectionGap,
          bgcolor: 'brand.mist',
          borderRadius: `${theme.shape.borderRadius}px`,
          py: { xs: '48px', md: EDGE === 'wave' ? '96px' : '70px' },
        }),
        EDGE === 'wave' && wakeEdge,
      ]}
    >
      {/* Smaller streaks on phones and tablets so they stay texture */}
      <WakeWaves scale={compact ? 0.6 : 1} />
      <Container sx={{ position: 'relative' }}>
        <Typography variant="h3" component="h2" sx={{ color: 'brand.paper', mb: { xs: 0, md: 5 } }}>
          This Month’s Roasts
        </Typography>
        {!compact && (
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', columnGap: 'clamp(40px, 4.5vw, 72px)' }}>
            {roasts.map((roast) => (
              <RoastCard key={roast.id} roast={roast} />
            ))}
          </Box>
        )}
      </Container>
      {compact && (
        // Swipe carousel, full bleed so the next card peeks in from the screen edge.
        // Its own scroll area also contains the fanned fruit, so nothing can push the page sideways.
        // Top padding leaves room for the fruit that fans up above the card.
        <Box
          ref={track}
          onScroll={onScroll}
          aria-label="This month’s roasts, swipe for more"
          sx={{
            position: 'relative',
            display: 'flex',
            gap: 4,
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            px: { xs: `${layout.gutterPhone}px`, sm: `${layout.gutterTablet}px` },
            scrollPaddingInline: { xs: `${layout.gutterPhone}px`, sm: `${layout.gutterTablet}px` },
            pt: '88px',
            pb: 3,
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
          }}
        >
          {roasts.map((roast) => (
            <RoastCard key={roast.id} roast={roast} carousel={track} />
          ))}
        </Box>
      )}
      {compact && (
        <CarouselDots
          count={roasts.length}
          current={current}
          labels={roasts.map((r) => r.name)}
          onSelect={scrollToCard}
        />
      )}
    </Box>
  )
}
