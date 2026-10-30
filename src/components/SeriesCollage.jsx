import { useRef, useState } from 'react'
import { Box, Link, Typography } from '@mui/material'
import { motion, useReducedMotion } from 'motion/react'
import { series } from '../data/series'
import Container from './common/Container'
import { useCompact } from '../hooks/useMedia'
import { layout, motion as m } from '../theme/tokens'

// Desktop: 5 bars at ~109px resting height + 4 × 16px gaps.
// Compact (phones/tablets): one bar is always open by default, so the open bar gets a
// bigger share (≈288px) and the closed ones settle at ~64px.
const SIZES = {
  desktop: { rowHeight: 609, gap: 16, grow: 2.5, header: 84, inset: 16, descGrow: 1.12 },
  // Description isn't scaled here: it fills the bar's width and would be clipped
  compact: { rowHeight: 592, gap: 12, grow: 4.5, header: 64, inset: 8, descGrow: 1 },
}
// Desktop text is fixed-width so it never reflows while the bar resizes; the bar clips it.
// On phones it follows the bar's width (the open bar's width doesn't animate there).
const CONTENT = { left: { xs: 20, md: 40 }, width: { xs: 'calc(100% - 40px)', md: 560 } }
// Open bar: the series name scales up ~12%
const TEXT_GROW = 1.12

// One open bar at a time. Mouse opens on enter and only closes when the pointer
// leaves the whole stack, so crossing the gaps between bars never snaps back.
// Touch toggles on tap; keyboard focus opens the focused bar.
function useAccordion(initialId) {
  const [openId, setOpenId] = useState(initialId)
  // A tap focuses the bar before pointerup toggles it; skip that focus-open so the tap
  // doesn't open and then immediately close it
  const fromPointer = useRef(false)

  const groupHandlers = {
    onPointerLeave: (e) => e.pointerType === 'mouse' && setOpenId(null),
    onBlur: (e) => !e.currentTarget.contains(e.relatedTarget) && setOpenId(null),
  }

  const itemHandlers = (id) => ({
    onPointerEnter: (e) => e.pointerType === 'mouse' && setOpenId(id),
    onPointerDown: () => (fromPointer.current = true),
    onPointerUp: (e) => e.pointerType !== 'mouse' && setOpenId((cur) => (cur === id ? null : id)),
    onFocus: () => {
      if (!fromPointer.current) setOpenId(id)
      fromPointer.current = false
    },
  })

  return { openId, groupHandlers, itemHandlers }
}

function SeriesBar({ item, open, anyOpen, handlers, size }) {
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
  const descScale = { animate: { scale: open ? size.descGrow : 1 }, transition: growTransition }

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
      animate={{ flexGrow: open ? size.grow : 1, marginInline: anyOpen && !open ? size.inset : 0 }}
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
          // Phones get the 800px copy
          srcSet={`${item.imageSmall} 800w, ${item.image} 1800w`}
          sizes="(max-width: 1023px) 100vw, 1360px"
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
          height: size.header,
          px: { xs: `${CONTENT.left.xs}px`, md: 5 },
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
        sx={{ position: 'absolute', top: size.header - 14, ...CONTENT, color: 'common.white' }}
      >
        <Box component={motion.div} initial={false} {...descScale} sx={{ transformOrigin: 'left top' }}>
          <Typography component={motion.p} variant="body2" variants={pop}>
            {item.description}
          </Typography>
        </Box>
        <Box
          component={motion.ul}
          variants={pop}
          sx={{ m: 0, mt: 4, p: 0, display: 'flex', flexWrap: 'wrap', gap: 2, listStyle: 'none' }}
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
        sx={{ position: 'absolute', right: { xs: 20, md: 40 }, bottom: { xs: 8, md: 14 } }}
      >
        <Link
          href="#"
          tabIndex={open ? 0 : -1}
          aria-hidden={!open}
          onClick={(e) => e.preventDefault()}
          underline="hover"
          // 44px tall so it's easy to tap
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            minHeight: 44,
            fontFamily: 'Assistant',
            fontWeight: 600,
            fontSize: 16,
            color: 'common.white',
          }}
        >
          Shop series →
        </Link>
      </Box>
    </Box>
  )
}

export default function SeriesCollage() {
  const compact = useCompact()
  const size = compact ? SIZES.compact : SIZES.desktop
  // On touch layouts the first bar starts open, so it's clear the bars hold more
  const { openId, groupHandlers, itemHandlers } = useAccordion(compact ? series[0].id : null)

  return (
    <Container component="section" sx={{ pt: layout.sectionGap }}>
      <Typography variant="h3" component="h2" sx={{ mb: 3 }}>
        Shop Our Series
      </Typography>
      <Box
        {...groupHandlers}
        sx={{ display: 'flex', flexDirection: 'column', gap: `${size.gap}px`, height: size.rowHeight }}
      >
        {series.map((item) => (
          <SeriesBar
            key={item.id}
            item={item}
            open={openId === item.id}
            anyOpen={openId !== null}
            handlers={itemHandlers(item.id)}
            size={size}
          />
        ))}
      </Box>
    </Container>
  )
}
