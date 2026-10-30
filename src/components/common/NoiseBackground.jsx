import { Box } from '@mui/material'
import { colors } from '../../theme/tokens'

// Rebuilds the Figma gradient + grain panel in CSS so it scales with page height.
const grain = encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240">
  <filter id="n"><feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="2" stitchTiles="stitch"/>
    <feColorMatrix values="0 0 0 0 0.36  0 0 0 0 0.45  0 0 0 0 0.5  0 0 0 0.55 0"/></filter>
  <rect width="100%" height="100%" filter="url(#n)"/>
</svg>`)

export default function NoiseBackground({ children }) {
  return (
    <Box sx={{ position: 'relative', bgcolor: colors.paper, isolation: 'isolate' }}>
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: -1,
          pointerEvents: 'none',
          background: `
            radial-gradient(ellipse 55% 30% at 22% 12%, ${colors.paper} 0%, transparent 100%),
            radial-gradient(ellipse 60% 25% at 30% 55%, ${colors.paper} 0%, transparent 100%),
            linear-gradient(180deg, ${colors.paper} 0%, #E3E8EB 45%, #D2DCE1 100%),
            radial-gradient(ellipse 50% 100% at 100% 50%, ${colors.mist} 0%, transparent 100%)`,
          '&::after': {
            content: '""',
            position: 'absolute',
            inset: 0,
            backgroundImage: `url("data:image/svg+xml,${grain}")`,
            opacity: 0.35,
            mixBlendMode: 'multiply',
            maskImage: 'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, #000 70%)',
          },
        }}
      />
      {children}
    </Box>
  )
}
