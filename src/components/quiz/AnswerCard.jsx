import { Box, Typography } from '@mui/material'
import { motion } from 'motion/react'
import { colors, fonts, motion as m } from '../../theme/tokens'

export const ANSWER_WIDTH = 523

// Lifts on hover; on select it bounces, darkens and draws a tick in the circle.
export default function AnswerCard({ label, selected, onSelect }) {
  return (
    <Box
      component={motion.button}
      type="button"
      aria-pressed={selected}
      onClick={onSelect}
      initial={false}
      animate={{ scale: selected ? [1, 0.95, 1.03, 1] : 1 }}
      whileHover={{ y: -3 }}
      transition={{
        scale: { duration: 0.45, times: [0, 0.2, 0.6, 1], ease: 'easeInOut' },
        y: m.spring,
      }}
      sx={(theme) => ({
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        width: { xs: '100%', sm: ANSWER_WIDTH },
        // Grows if a long answer wraps on a phone
        minHeight: 64,
        py: 2,
        pl: 3,
        pr: 3,
        border: 0,
        borderRadius: `${theme.shape.borderRadius}px`,
        bgcolor: selected ? 'brand.sandDeep' : 'brand.stone',
        color: selected ? 'common.white' : 'text.primary',
        textAlign: 'left',
        cursor: 'pointer',
        transition: 'background-color 250ms ease, color 250ms ease, box-shadow 250ms ease',
        '@media (hover: hover)': { '&:hover': { boxShadow: theme.customShadows.card } },
        '&:focus-visible': { outline: `2px solid ${theme.palette.primary.main}`, outlineOffset: 3 },
      })}
    >
      <Box
        sx={{
          width: 44,
          height: 44,
          flexShrink: 0,
          borderRadius: '50%',
          bgcolor: 'common.white',
          display: 'grid',
          placeItems: 'center',
        }}
      >
        <svg width="18" height="16" viewBox="0 0 18 16" fill="none" aria-hidden>
          <motion.path
            d="M1.5 8.5l5 5.5L16.5 1.5"
            stroke={colors.sandDeep}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={false}
            animate={{ pathLength: selected ? 1 : 0, opacity: selected ? 1 : 0 }}
            transition={{ duration: 0.3, ease: m.ease, delay: selected ? 0.08 : 0 }}
          />
        </svg>
      </Box>
      <Typography component="span" sx={{ fontFamily: fonts.ui, fontSize: { xs: 18, sm: 20 }, lineHeight: '24px' }}>
        {label}
      </Typography>
    </Box>
  )
}
