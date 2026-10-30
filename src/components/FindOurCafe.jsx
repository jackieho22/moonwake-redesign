import { Box, Typography } from '@mui/material'
import CtaButton from './common/CtaButton'
import Container from './common/Container'
import Photo from './common/Photo'
import cafePhoto from '../assets/photos/cafe.webp'
import cafePhotoSmall from '../assets/photos/cafe-700.webp'
import { layout } from '../theme/tokens'

export default function FindOurCafe() {
  return (
    <Container
      component="section"
      sx={{
        pt: `calc(${layout.sectionGap} - 14px)`,
        pb: { xs: layout.sectionGap, md: `calc(${layout.sectionGap} + 94px)` },
        display: 'grid',
        // Mirrors Join the Moonwake Family so the two photos share an edge rhythm.
        // Stacked (copy, then photo) on phones and tablets
        gridTemplateColumns: { xs: '1fr', md: '360px 1fr' },
        rowGap: 5,
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
        srcSet={`${cafePhotoSmall} 700w, ${cafePhoto} 1300w`}
        sizes="(max-width: 1023px) 100vw, 940px"
        alt="Two lattes with leaf art on a concrete counter at the Moonwake cafe"
        // Portrait photo in a landscape frame: centre on the two cups
        position="center 70%"
        sx={{ width: '100%', aspectRatio: '3 / 2' }}
      />
    </Container>
  )
}
