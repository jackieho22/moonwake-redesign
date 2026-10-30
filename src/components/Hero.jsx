import { Box, Typography } from '@mui/material'
import CtaButton from './common/CtaButton'
import { motion } from 'motion/react'
import Container from './common/Container'
import { layout, motion as m } from '../theme/tokens'
import heroImage from '../assets/photos/hero.webp'

export default function Hero() {
  return (
    <Box
      component="section"
      sx={(theme) => ({
        position: 'relative',
        height: layout.heroHeight,
        // Shorter on phones and tablets so the barista prompt is close below
        [theme.breakpoints.down('md')]: { height: '70vh', minHeight: 460 },
        overflow: 'hidden',
        bgcolor: 'brand.placeholder',
      })}
    >
      <Box
        component="img"
        src={heroImage}
        alt="Pour-over coffee dripping into a glass carafe"
        sx={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          // Figma flips the photo horizontally; 35% keeps both the kettle and the carafe in frame.
          // On narrow screens the crop is mostly sides, so shift toward the pour-over
          objectPosition: { xs: '58% 35%', md: 'center 35%' },
          transform: 'scaleX(-1)',
        }}
      />
      {/* Phones/tablets: the text sits over the bright carafe, so darken the bottom of the photo */}
      <Box
        aria-hidden
        sx={{
          display: { xs: 'block', md: 'none' },
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(4, 28, 44, 0) 40%, rgba(4, 28, 44, 0.65) 100%)',
        }}
      />
      <Container
        sx={{
          position: 'relative',
          height: '100%',
          display: 'flex',
          // Phones/tablets: text and button stacked, left-aligned at the bottom
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'flex-start', md: 'flex-end' },
          justifyContent: { xs: 'flex-end', md: 'space-between' },
          gap: { xs: 4, md: 0 },
          // Content sits in the lower third, leaving the photo room above
          pb: { xs: 5, md: 'clamp(56px, 9vh, 96px)' },
        }}
      >
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: m.slow, ease: m.ease }}
          sx={{ color: 'common.white' }}
        >
          <Typography
            variant="h1"
            sx={{ fontSize: { xs: 'clamp(36px, 7vw + 10px, 52px)', md: 'clamp(48px, 4vw, 72px)' } }}
          >
            sip and reflect.
          </Typography>
          <Typography sx={{ mt: 2, maxWidth: 363, fontSize: 'clamp(16px, 1.15vw, 20px)', lineHeight: 1.55 }}>
            experience our rotating selection of obsessively curated small batch coffee
          </Typography>
        </Box>
        <CtaButton size="large">find our cafe</CtaButton>
      </Container>
    </Box>
  )
}
