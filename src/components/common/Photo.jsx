import { Box } from '@mui/material'

// A content photo with the site's card radius and shadow. `position` sets the crop.
export default function Photo({ src, alt, position = 'center', sx }) {
  return (
    <Box
      component="img"
      src={src}
      alt={alt}
      sx={[
        (theme) => ({
          display: 'block',
          objectFit: 'cover',
          objectPosition: position,
          bgcolor: 'brand.placeholder',
          borderRadius: `${theme.shape.borderRadius}px`,
          boxShadow: theme.customShadows.card,
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    />
  )
}
