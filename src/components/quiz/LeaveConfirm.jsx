import { Box, Typography } from '@mui/material'
import { motion } from 'motion/react'
import CtaButton from '../common/CtaButton'
import { motion as m } from '../../theme/tokens'

// Shown over the quiz panel when closing partway through.
export default function LeaveConfirm({ onStay, onLeave }) {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: m.fast }}
      onClick={onStay}
      sx={{
        position: 'absolute',
        inset: 0,
        zIndex: 10,
        display: 'grid',
        placeItems: 'center',
        bgcolor: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(2px)',
      }}
    >
      <Box
        component={motion.div}
        role="alertdialog"
        aria-labelledby="quiz-leave-title"
        aria-describedby="quiz-leave-body"
        initial={{ y: 12, scale: 0.97 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 8, scale: 0.98 }}
        transition={m.spring}
        onClick={(e) => e.stopPropagation()}
        sx={(theme) => ({
          width: { xs: 'calc(100% - 40px)', sm: 440 },
          p: { xs: 4, sm: 5 },
          textAlign: 'center',
          bgcolor: 'background.paper',
          borderRadius: `${theme.shape.borderRadius}px`,
          boxShadow: theme.customShadows.lifted,
        })}
      >
        <Typography variant="h3" id="quiz-leave-title">
          leave the quiz?
        </Typography>
        <Typography id="quiz-leave-body" sx={{ mt: 2, color: 'text.secondary' }}>
          your answers so far won’t be saved.
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 5 }}>
          <CtaButton autoFocus onClick={onStay} sx={{ width: 160, flexShrink: 1 }}>
            keep going
          </CtaButton>
          <CtaButton onClick={onLeave} sx={{ width: 160, flexShrink: 1 }}>
            leave
          </CtaButton>
        </Box>
      </Box>
    </Box>
  )
}
