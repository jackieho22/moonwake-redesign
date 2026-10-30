import { useState } from 'react'
import { Box, Typography } from '@mui/material'
import CtaButton from './common/CtaButton'
import { layout } from '../theme/tokens'
import BaristaQuiz from './quiz/BaristaQuiz'

export default function BaristaPrompt() {
  const [quizOpen, setQuizOpen] = useState(false)

  return (
    <Box component="section" sx={{ pt: `calc(${layout.sectionGap} / 2)`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <Typography sx={{ lineHeight: '20px', textAlign: 'center' }}>
        new to Moonwake? tell us how you drink your coffee and we’ll pick a couple for you!
      </Typography>
      <CtaButton aria-haspopup="dialog" onClick={() => setQuizOpen(true)}>
        ask a barista
      </CtaButton>
      <BaristaQuiz open={quizOpen} onClose={() => setQuizOpen(false)} />
    </Box>
  )
}
