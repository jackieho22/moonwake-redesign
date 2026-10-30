import { Box, Typography } from '@mui/material'
import CtaButton from './common/CtaButton'
import Container from './common/Container'
import Photo from './common/Photo'
import cafePhoto from '../assets/photos/cafe.webp'
import { layout } from '../theme/tokens'

export default function FindOurCafe() {
  return (
    <Container
      component="section"
      sx={{
        pt: `calc(${layout.sectionGap} - 14px)`,
        pb: `calc(${layout.sectionGap} + 94px)`,
        display: 'grid',
        // Mirrors Join the Moonwake Family so the two photos share an edge rhythm
        gridTemplateColumns: '360px 1fr',
        alignItems: 'center',
        columnGap: 6,
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <Typography variant="h2">Find Our Cafe!</Typography>
        <Box sx={{ mt: '27px', mb: 5 }}>
          <Typography variant="lead">1412 saratoga avenue</Typography>
          <Typography variant="lead">san jose, ca</Typography>
          <Typography variant="lead">M-F 7a-5p | weekend 8a-5p</Typography>
        </Box>
        <CtaButton>view our menu</CtaButton>
      </Box>
      <Photo
        src={cafePhoto}
        alt="Two lattes with leaf art on a concrete counter at the Moonwake cafe"
        // Portrait photo in a landscape frame: centre on the two cups
        position="center 70%"
        sx={{ width: '100%', aspectRatio: '3 / 2' }}
      />
    </Container>
  )
}
