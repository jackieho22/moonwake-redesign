import { Box, Typography } from '@mui/material'
import CtaButton from './common/CtaButton'
import Container from './common/Container'
import Photo from './common/Photo'
import familyPhoto from '../assets/photos/moonwake-family.webp'
import { layout } from '../theme/tokens'

export default function JoinFamily() {
  return (
    <Container
      component="section"
      sx={{
        pt: `calc(${layout.sectionGap} - 14px)`,
        display: 'grid',
        // The photo is capped at its native 678px so it stays sharp; the copy takes the rest
        gridTemplateColumns: 'minmax(0, 678px) 1fr',
        alignItems: 'center',
        columnGap: 6,
      }}
    >
      <Photo
        src={familyPhoto}
        alt="Two members of the Moonwake team smiling inside the cafe"
        // Keep both faces clear of the top edge
        position="center 30%"
        sx={{ width: '100%', aspectRatio: '3 / 2' }}
      />
      <Box sx={{ maxWidth: 360 }}>
        <Typography variant="h2" sx={{ maxWidth: 292 }}>
          Join the Moonwake Family.
        </Typography>
        <Box sx={{ mt: '30px', mb: 5 }}>
          <Typography variant="lead">Choose your coffee expression.</Typography>
          <Typography variant="lead">Manage your deliveries.</Typography>
          <Typography variant="lead">Leave the rest to us.</Typography>
        </Box>
        <CtaButton size="large">subscribe!</CtaButton>
      </Box>
    </Container>
  )
}
