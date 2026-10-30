import { Box, Typography } from '@mui/material'
import { motion } from 'motion/react'
import { fonts, layout, motion as m } from '../theme/tokens'

// Thin disclaimer strip pinned above the header; drops in on load.
export default function ConceptNotice() {
  return (
    <Box
      component={motion.aside}
      aria-label="Disclaimer"
      initial={{ y: '-100%' }}
      animate={{ y: 0 }}
      transition={{ ...m.spring, delay: 0.3 }}
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        // Above the header (AppBar is 1100), below the quiz dialog (1300)
        zIndex: 1101,
        height: layout.noticeHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'brand.slate',
      }}
    >
      <Typography sx={{ fontFamily: fonts.ui, fontSize: 12, letterSpacing: 0.4, color: 'common.white' }}>
        Concept redesign. Not affiliated with Moonwake Coffee Roasters.
      </Typography>
    </Box>
  )
}
