import { useEffect, useState } from 'react'
import { Box, ButtonBase, Link, Typography } from '@mui/material'
import { visuallyHidden } from '@mui/utils'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import CtaButton from '../common/CtaButton'
import Fruit from '../common/Fruit'
import QuizHeading from './QuizHeading'
import { fonts, motion as m, pressable } from '../../theme/tokens'

const CARD = 251
const SIDE_OFFSET = 125 // px the peeking cards sit left/right of centre
const SIDE_SCALE = 0.7
// Let the results step finish sliding in before the first fan-out.
const FAN_DELAY = 450

// Vertical rhythm, in the step's 843px area (it starts 69px into the 1055px panel).
// The card's top sits at 333, so its middle lands on the panel's middle (527).
const HEADING_HEIGHT = 120
const CARD_TOP = 333
// Clear space above the card for the fruit fanning up, and below it for the fruit
// fanning down (which reaches ~50px under the card)
const GAP_ABOVE = 84
const GAP_BELOW = 76

function Chevron({ left }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden
      style={{ rotate: left ? '180deg' : '0deg' }}
    >
      <path
        d="M7 3.5l5.5 5.5L7 14.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ArrowButton({ left, onClick }) {
  return (
    <ButtonBase
      component={motion.button}
      {...pressable}
      aria-label={left ? 'Previous recommendation' : 'Next recommendation'}
      onClick={onClick}
      sx={{
        position: 'absolute',
        top: '50%',
        mt: '-24px',
        [left ? 'left' : 'right']: 0,
        width: 48,
        height: 48,
        borderRadius: '50%',
        bgcolor: 'brand.slate',
        color: 'common.white',
        transition: 'background-color 200ms ease',
        '&:hover, &.Mui-focusVisible': { bgcolor: 'primary.main' },
      }}
    >
      <Chevron left={left} />
    </ButtonBase>
  )
}

// offset: 0 = centre, -1 / 1 = peeking left / right
function ResultCard({ coffee, offset, fanned }) {
  const center = offset === 0

  return (
    <Box
      component={motion.div}
      initial={false}
      animate={{ x: offset * SIDE_OFFSET, scale: center ? 1 : SIDE_SCALE }}
      transition={m.spring}
      aria-hidden={!center}
      sx={{
        position: 'absolute',
        top: 0,
        left: `calc(50% - ${CARD / 2}px)`,
        width: CARD,
        height: CARD,
        // Centre card (and its fruit) sits above the peeking cards
        zIndex: center ? 3 : 1,
      }}
    >
      {coffee.fruit.map((note, i) => (
        <Fruit
          key={note.id}
          src={note.src}
          flip={note.flip}
          placement={note.feature}
          active={center && fanned}
          index={i}
        />
      ))}
      <Box
        component="img"
        src={coffee.image}
        alt={center ? `${coffee.name} label` : ''}
        sx={(theme) => ({
          position: 'relative',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'top',
          borderRadius: `${theme.shape.borderRadius}px`,
          boxShadow: theme.customShadows.lifted,
        })}
      />
    </Box>
  )
}

const swap = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: m.fast },
}

export default function ResultsStep({ picks, onRetake, focusOnMount }) {
  const [index, setIndex] = useState(0)
  const [fanned, setFanned] = useState(false)
  const reduceMotion = useReducedMotion()
  const coffee = picks[index]
  const count = picks.length

  // After arrival the fruit follows the centre slot: on each arrow click the outgoing
  // card tucks its fruit away while the incoming card fans out, both mid-rotation.
  useEffect(() => {
    if (reduceMotion) return
    const timer = setTimeout(() => setFanned(true), FAN_DELAY)
    return () => clearTimeout(timer)
  }, [reduceMotion])

  const go = (delta) => setIndex((i) => (i + delta + count) % count)

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box sx={{ alignSelf: 'stretch' }}>
        <QuizHeading id="quiz-results" focusOnMount={focusOnMount} height={HEADING_HEIGHT}>
          here’s what we recommend!
        </QuizHeading>
      </Box>

      <Box aria-live="polite" sx={visuallyHidden}>
        Recommendation {index + 1} of {count}: {coffee.name}
      </Box>

      {/* Fixed-height band, copy pinned to its bottom: the card stays put however long the note runs */}
      <Box
        sx={{
          height: CARD_TOP - HEADING_HEIGHT,
          pb: `${GAP_ABOVE}px`,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <Box component={motion.div} key={`${coffee.id}-copy`} {...swap} sx={{ textAlign: 'center' }}>
            <Typography variant="h2" component="h3">
              {coffee.name}
            </Typography>
            <Typography sx={{ mt: 2 }}>{coffee.tastingNotes}</Typography>
            <Typography variant="body2" sx={{ mt: 2, mx: 'auto', maxWidth: 470, color: 'text.secondary' }}>
              {coffee.baristaNote}
            </Typography>
          </Box>
        </AnimatePresence>
      </Box>

      <Box sx={{ position: 'relative', flexShrink: 0, width: 550, height: CARD }}>
        {picks.map((pick, i) => (
          <ResultCard
            key={`${i}-${pick.id}`}
            coffee={pick}
            // Works for the 3 slots: the one after the current pick peeks right, the one before peeks left
            offset={((i - index + count + 1) % count) - 1}
            fanned={fanned}
          />
        ))}
        {count > 1 && (
          <>
            <ArrowButton left onClick={() => go(-1)} />
            <ArrowButton onClick={() => go(1)} />
          </>
        )}
      </Box>

      <AnimatePresence mode="wait" initial={false}>
        <Typography
          component={motion.p}
          key={`${coffee.id}-price`}
          {...swap}
          sx={{
            fontFamily: fonts.ui,
            fontSize: 16,
            lineHeight: '20px',
            mt: `${GAP_BELOW}px`,
          }}
        >
          {coffee.series} | {coffee.price}
        </Typography>
      </AnimatePresence>

      <CtaButton sx={{ mt: 4 }}>view listing</CtaButton>

      <Link
        component="button"
        type="button"
        onClick={onRetake}
        underline="hover"
        sx={{
          mt: 3,
          fontFamily: fonts.ui,
          fontSize: 14,
          color: 'text.secondary',
        }}
      >
        retake quiz
      </Link>
    </Box>
  )
}
