import { Box } from '@mui/material'
import { layout } from '../../theme/tokens'

// The shared content frame. Every section sits inside one so all edges line up.
export default function Container({ sx, ...props }) {
  return (
    <Box
      {...props}
      sx={[
        {
          width: '100%',
          maxWidth: layout.content + 2 * layout.gutter,
          mx: 'auto',
          px: { xs: `${layout.gutterPhone}px`, sm: `${layout.gutterTablet}px`, md: `${layout.gutter}px` },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    />
  )
}
