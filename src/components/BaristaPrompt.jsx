import { useState } from 'react'
import { Typography } from '@mui/material'
import CtaButton from './common/CtaButton'
import Container from './common/Container'
import { layout } from '../theme/tokens'
import BaristaQuiz from './quiz/BaristaQuiz'

export default function BaristaPrompt() {
  const [quizOpen, setQuizOpen] = useState(false)

  return (
    <Container
      component="section"
      sx={{
        pt: `calc(${layout.sectionGap} / 2)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
      }}
    >
      <Typography
        sx={{ maxWidth: 520, lineHeight: { xs: '24px', md: '20px' }, textAlign: 'center', textWrap: 'balance' }}
      >
        new to Moonwake? tell us how you drink your coffee and we’ll pick a couple for you!
      </Typography>
      {/* Full width on phones */}
      <CtaButton aria-haspopup="dialog" onClick={() => setQuizOpen(true)} sx={{ width: { xs: '100%', sm: 216 } }}>
        ask a barista
      </CtaButton>
      <BaristaQuiz open={quizOpen} onClose={() => setQuizOpen(false)} />
    </Container>
  )
}
