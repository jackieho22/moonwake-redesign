import { useEffect, useRef } from 'react'
import { Box, Typography } from '@mui/material'

// Big prompt at the top of each step. Takes focus when a step slides in so
// keyboard and screen reader users land on the new question.
export default function QuizHeading({ id, focusOnMount, height = 245, children }) {
  const ref = useRef(null)

  useEffect(() => {
    if (focusOnMount) ref.current?.focus({ preventScroll: true })
  }, [focusOnMount])

  return (
    <Box sx={{ height, px: '80px', display: 'flex', alignItems: 'center' }}>
      <Typography
        ref={ref}
        id={id}
        tabIndex={-1}
        variant="h2"
        sx={{ fontSize: 40, lineHeight: '48px', maxWidth: 523, outline: 'none' }}
      >
        {children}
      </Typography>
    </Box>
  )
}
