import { useEffect, useRef, useState } from 'react'
import { Box, ButtonBase, Modal, useMediaQuery } from '@mui/material'
import { AnimatePresence, motion, useIsPresent } from 'motion/react'
import useFitScale from '../../hooks/useFitScale'
import QuestionStep from './QuestionStep'
import ResultsStep from './ResultsStep'
import LeaveConfirm from './LeaveConfirm'
import { questions } from '../../data/quiz'
import { coffees } from '../../data/coffees'
import { answerTags, recommend, rotatePicks } from '../../utils/recommend'
import { fonts, motion as m, pressable } from '../../theme/tokens'
import symbol from '../../assets/brand/symbol.png'
import wordmark from '../../assets/brand/wordmark.png'

// Panel size from the Figma frames (16:136, 20:177). On phones the panel goes full-screen instead
// and its contents flow (and scroll) rather than sitting at fixed positions.
const PANEL = { width: 792, height: 1055 }
const RESULT_SLOTS = 3
// Long enough to see the bounce and tick land before the next step slides in
const ADVANCE_DELAY = 450

// Rotation survives closing and reopening the quiz (resets on page reload).
let round = 0
let lastSet = ''
const setKey = (picks) =>
  picks
    .map((c) => c.id)
    .sort()
    .join()

// Rank the whole catalog by the answers, then rotate so each finish shows a new set of 3.
function nextPicks(answers) {
  const ranked = recommend(answerTags(questions, answers), coffees)
  let picks = rotatePicks(ranked, RESULT_SLOTS, round++)
  // Answers can reshuffle the ranking, so guard against landing on the same set twice
  if (ranked.length > RESULT_SLOTS && setKey(picks) === lastSet) picks = rotatePicks(ranked, RESULT_SLOTS, round++)
  lastSet = setKey(picks)
  return picks
}

const slide = {
  enter: (dir) => ({ x: dir * 240, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir * -240, opacity: 0 }),
}

// One step of the quiz. Goes inert while sliding out so it can't take a stray click.
function Slide({ direction, phone, children }) {
  const isPresent = useIsPresent()

  return (
    <Box
      component={motion.div}
      inert={!isPresent}
      custom={direction}
      variants={slide}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.45, ease: m.ease }}
      // On phones a long step scrolls inside the panel; close and back stay pinned above it
      sx={{ position: 'absolute', inset: 0, ...(phone && { overflowY: 'auto', pb: 5 }) }}
    >
      {children}
    </Box>
  )
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path d="M3 3l12 12M15 3L3 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function ProgressBar({ value, phone }) {
  return (
    <Box
      role="progressbar"
      aria-label="Quiz progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(value * 100)}
      sx={
        phone
          ? { position: 'absolute', top: 26, left: 20, right: 68, height: 12, bgcolor: 'brand.mist' }
          : { position: 'absolute', top: 45, left: 80, width: 632, height: 24, bgcolor: 'brand.mist' }
      }
    >
      <Box
        component={motion.div}
        initial={false}
        animate={{ width: `${value * 100}%` }}
        transition={{ duration: m.slow, ease: m.ease }}
        sx={{ height: '100%', bgcolor: 'primary.main' }}
      />
    </Box>
  )
}

function QuizDialog({ onClose }) {
  const [step, setStep] = useState(0) // questions.length = results
  const [direction, setDirection] = useState(1)
  const [answers, setAnswers] = useState({}) // question id → answer id
  const [picks, setPicks] = useState(null) // chosen once per finish so re-renders don't reshuffle
  const [confirming, setConfirming] = useState(false)
  const [navigated, setNavigated] = useState(false) // move focus only after the first step change
  const advanceTimer = useRef(null)
  const phone = useMediaQuery((theme) => theme.breakpoints.down('sm'), { noSsr: true })
  const fitScale = useFitScale(PANEL.width, PANEL.height, 24)
  const scale = phone ? 1 : fitScale

  useEffect(() => () => clearTimeout(advanceTimer.current), [])

  const done = step === questions.length
  const question = questions[step]
  const partway = !done && Object.keys(answers).length > 0
  const progress = done ? 1 : (step + (answers[question.id] ? 1 : 0)) / questions.length

  const goTo = (next) => {
    setDirection(next > step ? 1 : -1)
    setStep(next)
    setNavigated(true)
  }

  const choose = (answer) => {
    if (advanceTimer.current) return
    const next = { ...answers, [question.id]: answer.id }
    setAnswers(next)
    advanceTimer.current = setTimeout(() => {
      advanceTimer.current = null
      if (step + 1 === questions.length) setPicks(nextPicks(next))
      goTo(step + 1)
    }, ADVANCE_DELAY)
  }

  const back = () => !advanceTimer.current && goTo(step - 1)
  const retake = () => {
    setAnswers({})
    goTo(0)
  }
  const requestClose = () => (partway ? setConfirming(true) : onClose())

  return (
    <Modal open hideBackdrop onClose={() => (confirming ? setConfirming(false) : requestClose())}>
      <Box
        sx={{
          position: 'fixed',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          outline: 'none',
        }}
      >
        <Box
          component={motion.div}
          onClick={confirming ? undefined : requestClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: m.base }}
          sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(4, 28, 44, 0.6)', backdropFilter: 'blur(3px)' }}
        />

        {/* Static scale wrapper so the entrance animation can own the panel's transform */}
        <Box sx={{ flexShrink: 0, transform: `scale(${scale})` }}>
          <Box
            component={motion.div}
            role="dialog"
            aria-modal="true"
            aria-label="Ask a barista quiz"
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1, transition: m.spring }}
            exit={{ opacity: 0, y: 16, scale: 0.98, transition: { duration: m.fast, ease: m.ease } }}
            sx={(theme) => ({
              position: 'relative',
              width: phone ? '100vw' : PANEL.width,
              // dvh tracks the visible height as the phone browser's bars show and hide
              height: phone ? '100dvh' : PANEL.height,
              overflow: 'hidden',
              bgcolor: 'background.paper',
              borderRadius: phone ? 0 : `${theme.shape.borderRadius}px`,
              boxShadow: theme.customShadows.lifted,
            })}
          >
            <Box inert={confirming} sx={{ position: 'absolute', inset: 0 }}>
              <Box
                sx={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  ...(phone ? { top: 80, bottom: 0 } : { top: 69, height: 843 }),
                }}
              >
                <AnimatePresence initial={false} custom={direction}>
                  <Slide key={step} direction={direction} phone={phone}>
                    {done ? (
                      <ResultsStep picks={picks} onRetake={retake} focusOnMount={navigated} />
                    ) : (
                      <QuestionStep
                        question={question}
                        number={step + 1}
                        total={questions.length}
                        selectedId={answers[question.id]}
                        onChoose={choose}
                        focusOnMount={navigated}
                      />
                    )}
                  </Slide>
                </AnimatePresence>
              </Box>

              <ProgressBar value={progress} phone={phone} />

              <AnimatePresence>
                {step > 0 && !done && (
                  <ButtonBase
                    component={motion.button}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={back}
                    sx={{
                      position: 'absolute',
                      top: phone ? 46 : 84,
                      left: phone ? 20 : 80,
                      minHeight: 44,
                      gap: 1,
                      fontFamily: fonts.ui,
                      fontSize: 16,
                      color: 'text.secondary',
                      '&:hover, &.Mui-focusVisible': { color: 'primary.main', textDecoration: 'underline' },
                    }}
                  >
                    ← back
                  </ButtonBase>
                )}
              </AnimatePresence>

              <ButtonBase
                component={motion.button}
                {...pressable}
                aria-label="Close quiz"
                onClick={requestClose}
                sx={{
                  position: 'absolute',
                  top: phone ? 8 : 33,
                  right: phone ? 8 : 20,
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  color: 'primary.main',
                  transition: 'background-color 200ms ease',
                  '&:hover, &.Mui-focusVisible': { bgcolor: 'brand.linen' },
                }}
              >
                <CloseIcon />
              </ButtonBase>

              <Box
                role="img"
                aria-label="Moonwake Coffee Roasters"
                sx={{
                  // No room for the logo on a phone screen
                  display: phone ? 'none' : 'flex',
                  position: 'absolute',
                  top: 912,
                  left: '50%',
                  translate: '-50% 0',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <Box component="img" src={symbol} alt="" sx={{ width: 82, height: 48 }} />
                <Box component="img" src={wordmark} alt="" sx={{ width: 175, height: 36 }} />
              </Box>
            </Box>

            <AnimatePresence>
              {confirming && <LeaveConfirm onStay={() => setConfirming(false)} onLeave={onClose} />}
            </AnimatePresence>
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}

// Ask a Barista: a 5-question quiz that ends in three coffee recommendations.
// Mounting/unmounting through AnimatePresence lets the panel animate out and
// resets the quiz each time it opens.
export default function BaristaQuiz({ open, onClose }) {
  return <AnimatePresence>{open && <QuizDialog onClose={onClose} />}</AnimatePresence>
}
