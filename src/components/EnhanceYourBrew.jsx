import { useRef } from 'react'
import { Box, Typography } from '@mui/material'
import { motion, useInView } from 'motion/react'
import useHoverReveal from '../hooks/useHoverReveal'
import { useCanHover } from '../hooks/useMedia'
import Container from './common/Container'
import { colors, layout, motion as m } from '../theme/tokens'
import brewGear1 from '../assets/photos/brew-gear-1.webp'
import brewGear2 from '../assets/photos/brew-gear-2.webp'
import brewGear1Small from '../assets/photos/brew-gear-1-700.webp'
import brewGear2Small from '../assets/photos/brew-gear-2-700.webp'
import merch1 from '../assets/photos/merch-1.webp'
import merch2 from '../assets/photos/merch-2.webp'

// `image` shows by default and `hoverImage` crossfades in on hover (or tap).
// `position` keeps faces in frame inside the square tile.
const categories = [
  {
    id: 'brew-gear',
    label: 'brew gear',
    image: {
      src: brewGear1,
      small: brewGear1Small,
      alt: 'A barista pouring a pour-over at the Moonwake bar',
      position: 'center 30%',
    },
    hoverImage: {
      src: brewGear2,
      small: brewGear2Small,
      alt: 'A barista brewing a row of pour-overs at once',
      position: 'center 35%',
    },
    placeholder: colors.placeholderDark,
  },
  {
    id: 'merch',
    label: 'merch',
    image: { src: merch1, alt: 'Smiling in a Moonwake crewneck at the beach, coffee in hand', position: 'center 8%' },
    hoverImage: {
      src: merch2,
      alt: 'Two friends in Moonwake sweatshirts looking out at the ocean',
      position: 'center',
    },
    placeholder: colors.placeholderDark,
  },
]

// Crossfade: slow enough to read as a dissolve, with a slight settle from 1.04
const crossfade = { duration: 0.45, ease: 'easeInOut' }

function Layer({ photo, fallback, ...props }) {
  const sx = { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }
  return photo ? (
    <Box
      component={motion.img}
      src={photo.src}
      // Phones get the 700px copy where there is one
      srcSet={photo.small ? `${photo.small} 700w, ${photo.src} 1300w` : undefined}
      sizes="(max-width: 599px) 100vw, (max-width: 1023px) 50vw, 680px"
      alt={photo.alt}
      sx={{ ...sx, objectPosition: photo.position }}
      {...props}
    />
  ) : (
    <Box component={motion.div} sx={{ ...sx, bgcolor: fallback }} {...props} />
  )
}

function CategoryTile({ category }) {
  const { active: revealed, handlers } = useHoverReveal()
  const canHover = useCanHover()
  const ref = useRef(null)
  // Touch screens: crossfade to photo 2 once most of the tile has scrolled into view (a tap also toggles it)
  const inView = useInView(ref, { amount: 0.6 })
  const active = revealed || (!canHover && inView)
  const short = category.label.length <= 5

  return (
    <Box
      component={motion.div}
      ref={ref}
      tabIndex={0}
      aria-label={category.label}
      {...handlers}
      initial={false}
      // The grow is a hover effect; on touch it would push a full-width tile past the screen edge
      animate={{ scale: active && canHover ? 1.04 : 1 }}
      transition={m.spring}
      sx={(theme) => ({
        position: 'relative',
        // Squares that grow with the container
        aspectRatio: '1',
        overflow: 'hidden',
        borderRadius: `${theme.shape.borderRadius}px`,
        boxShadow: active ? theme.customShadows.liftedHover : theme.customShadows.card,
        transition: 'box-shadow 350ms ease',
        outline: 'none',
        '&:focus-visible': { outline: `2px solid ${theme.palette.primary.main}`, outlineOffset: 3 },
      })}
    >
      <Layer photo={category.image} fallback={category.placeholder} />
      {/* Photo 2 stays mounted at opacity 0, so it is loaded and decoded before the first hover */}
      <Layer
        photo={category.hoverImage}
        fallback={colors.placeholderDarker}
        aria-hidden={!active}
        initial={false}
        animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 1.04 }}
        transition={crossfade}
      />

      {/* Soft scrim so the white label reads over any photo */}
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(315deg, rgba(4, 28, 44, 0.55) 0%, rgba(4, 28, 44, 0) 45%)',
          pointerEvents: 'none',
        }}
      />
      <Typography
        variant="label"
        aria-hidden
        sx={{ position: 'absolute', right: 24, bottom: 24, color: 'common.white', letterSpacing: short ? 3.6 : 1.2 }}
      >
        {category.label}
      </Typography>
    </Box>
  )
}

export default function EnhanceYourBrew() {
  return (
    <Container component="section" sx={{ pt: layout.sectionGap }}>
      <Typography variant="h2" sx={{ textAlign: 'center', mb: { xs: 4, md: 5 } }}>
        Enhance Your Brew
      </Typography>
      {/* Stacked on phones, side by side from tablets up */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: { xs: 4, md: 6 } }}>
        {categories.map((c) => (
          <CategoryTile key={c.id} category={c} />
        ))}
      </Box>
    </Container>
  )
}
