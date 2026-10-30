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
    // Phones: height follows the text so the answers sit right below it
    <Box
      sx={{
        height: { xs: 'auto', sm: height },
        px: { xs: '20px', sm: '80px' },
        py: { xs: 4, sm: 0 },
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Typography
        ref={ref}
        id={id}
        tabIndex={-1}
        variant="h2"
        sx={{ fontSize: { xs: 28, sm: 40 }, lineHeight: { xs: '34px', sm: '48px' }, maxWidth: 523, outline: 'none' }}
      >
        {children}
      </Typography>
    </Box>
  )
}
