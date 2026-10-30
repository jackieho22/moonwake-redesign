import { useState } from 'react'
import { Box, Link, Typography } from '@mui/material'
import { motion, useReducedMotion } from 'motion/react'
import { series } from '../data/series'
import Container from './common/Container'
import { layout, motion as m } from '../theme/tokens'

// 5 bars at ~109px resting height + 4 × 16px gaps
const ROW_HEIGHT = 609
const EXPANDED_GROW = 2.5
// Height of the name strip; equals a collapsed bar (~84px) so names sit centred there.
const HEADER_HEIGHT = 84
// Fixed so text never reflows while the bar resizes; the bar clips it.
const CONTENT_WIDTH = 560
// Open bar: name and description scale up ~12%
const TEXT_GROW = 1.12
// How far the other bars step in at each side while one is open
const SIDE_INSET = 16

// One open bar at a time. Mouse opens on enter and only closes when the pointer
// leaves the whole stack, so crossing the gaps between bars never snaps back.
// Touch toggles on tap; keyboard focus opens the focused bar.
function useAccordion() {
  const [openId, setOpenId] = useState(null)

  const groupHandlers = {
    onPointerLeave: (e) => e.pointerType === 'mouse' && setOpenId(null),
    onBlur: (e) => !e.currentTarget.contains(e.relatedTarget) && setOpenId(null),
  }

  const itemHandlers = (id) => ({
    onPointerEnter: (e) => e.pointerType === 'mouse' && setOpenId(id),
    onPointerUp: (e) => e.pointerType !== 'mouse' && setOpenId((cur) => (cur === id ? null : id)),
    onFocus: () => setOpenId(id),
  })

  return { openId, groupHandlers, itemHandlers }
}

function SeriesBar({ item, open, anyOpen, handlers }) {
  const reduce = useReducedMotion()

  const growTransition = reduce ? { duration: m.base, ease: m.ease } : m.spring
  const content = {
    hidden: { transition: { staggerChildren: 0 } },
    visible: {
      transition: reduce ? {} : { delayChildren: 0.1, staggerChildren: m.stagger },
    },
  }
  const pop = {
    hidden: { opacity: 0, y: 10, transition: { duration: 0.12 } },
    visible: {
      opacity: 1,
      y: 0,
      transition: reduce ? { duration: m.fast } : { ...m.spring, opacity: { duration: m.fast } },
    },
  }
  // Lands after the description and notes
  const linkPop = {
    hidden: pop.hidden,
    visible: { ...pop.visible, transition: { ...pop.visible.transition, delay: reduce ? 0 : 0.1 + 2 * m.stagger } },
  }
  // Text grows with the bar on the same spring (scaled, so it never reflows)
  const textScale = { animate: { scale: open ? TEXT_GROW : 1 }, transition: growTransition }

  return (
    <Box
      component={motion.div}
      tabIndex={0}
      role="group"
      aria-label={`${item.name} series`}
      {...handlers}
      initial={false}
      // The open bar grows taller; the others give up height and step in at the sides,
      // so the open one reads as growing both ways while the stack keeps its frame
      animate={{ flexGrow: open ? EXPANDED_GROW : 1, marginInline: anyOpen && !open ? SIDE_INSET : 0 }}
      transition={growTransition}
      sx={(theme) => ({
        flexBasis: 0,
        minHeight: 0,
        position: 'relative',
        overflow: 'hidden',
        bgcolor: 'brand.placeholder',
        borderRadius: `${theme.shape.borderRadius}px`,
        boxShadow: theme.customShadows.card,
        outline: 'none',
        '&:focus-visible': { outline: `2px solid ${theme.palette.primary.main}`, outlineOffset: 3 },
      })}
    >
      {item.image && (
        <Box
          component="img"
          src={item.image}
          alt={item.imageAlt}
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: item.imagePosition,
          }}
        />
      )}
      {/* Navy scrim from the left so the white text reads over any photo */}
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(90deg, rgba(4, 28, 44, 0.78) 0%, rgba(4, 28, 44, 0.45) 40%, rgba(4, 28, 44, 0.12) 100%)',
        }}
      />
      {/* Deepens the open bar so the description and link stay readable; dims the others slightly */}
      <Box
        component={motion.div}
        aria-hidden
        initial={false}
        animate={{ opacity: open ? 1 : anyOpen ? 0.3 : 0 }}
        transition={{ duration: m.base, ease: m.ease }}
        sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(4, 28, 44, 0.5)' }}
      />

      <Box
        sx={{
          position: 'relative',
          height: HEADER_HEIGHT,
          px: 5,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Typography
          component={motion.span}
          variant="label"
          initial={false}
          {...textScale}
          sx={{ display: 'inline-block', transformOrigin: 'left center', color: 'common.white', letterSpacing: 1.2 }}
        >
          {item.name}
        </Typography>
      </Box>

      <Box
        component={motion.div}
        aria-hidden={!open}
        initial={false}
        animate={open ? 'visible' : 'hidden'}
        variants={content}
        sx={{ position: 'absolute', top: HEADER_HEIGHT - 14, left: 40, width: CONTENT_WIDTH, color: 'common.white' }}
      >
        <Box component={motion.div} initial={false} {...textScale} sx={{ transformOrigin: 'left top' }}>
          <Typography component={motion.p} variant="body2" variants={pop}>
            {item.description}
          </Typography>
        </Box>
        <Box
          component={motion.ul}
          variants={pop}
          sx={{ m: 0, mt: 4, p: 0, display: 'flex', gap: 2, listStyle: 'none' }}
        >
          {item.notes.map((note) => (
            <Typography
              component="li"
              key={note}
              variant="body2"
              sx={{ px: 2, border: '1px solid', borderColor: 'brand.sand', color: 'brand.sand', borderRadius: '15px' }}
            >
              {note}
            </Typography>
          ))}
        </Box>
      </Box>

      {/* Pinned to the bottom-right corner, so it rides down as the bar opens */}
      <Box
        component={motion.div}
        initial={false}
        animate={open ? 'visible' : 'hidden'}
        variants={linkPop}
        sx={{ position: 'absolute', right: 40, bottom: 24 }}
      >
        <Link
          href="#"
          tabIndex={open ? 0 : -1}
          aria-hidden={!open}
          onClick={(e) => e.preventDefault()}
          underline="hover"
          sx={{ fontFamily: 'Assistant', fontWeight: 600, fontSize: 16, color: 'common.white' }}
        >
          Shop series →
        </Link>
      </Box>
    </Box>
  )
}

export default function SeriesCollage() {
  const { openId, groupHandlers, itemHandlers } = useAccordion()

  return (
    <Container component="section" sx={{ pt: layout.sectionGap }}>
      <Typography variant="h3" component="h2" sx={{ mb: 3 }}>
        Shop Our Series
      </Typography>
      <Box {...groupHandlers} sx={{ display: 'flex', flexDirection: 'column', gap: 3, height: ROW_HEIGHT }}>
        {series.map((item) => (
          <SeriesBar
            key={item.id}
            item={item}
            open={openId === item.id}
            anyOpen={openId !== null}
            handlers={itemHandlers(item.id)}
          />
        ))}
      </Box>
    </Container>
  )
}
