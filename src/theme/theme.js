import { createTheme } from '@mui/material/styles'
import { colors, fonts, layout, radius, shadows, spacing } from './tokens'

// Phone < 600, tablet 600–1023, desktop ≥ 1024
const breakpoints = { values: { xs: 0, sm: 600, md: 1024, lg: 1280, xl: 1536 } }
const compact = '@media (max-width: 1023.95px)'
const phone = '@media (max-width: 599.95px)'
// Hover styles only where a real pointer can hover, so taps don't leave them stuck on
const canHover = '@media (hover: hover)'

const theme = createTheme({
  breakpoints,
  palette: {
    primary: { main: colors.navy, contrastText: colors.white },
    secondary: { main: colors.slate, contrastText: colors.white },
    background: { default: colors.paper, paper: colors.white },
    text: { primary: colors.ink, secondary: colors.slate },
    brand: colors,
  },
  spacing,
  shape: { borderRadius: radius },
  customShadows: shadows,
  typography: {
    fontFamily: fonts.text,
    h1: { fontFamily: fonts.text, fontWeight: 600, fontSize: 48, lineHeight: 1.2 },
    h2: {
      fontFamily: fonts.text,
      fontWeight: 600,
      fontSize: 32,
      lineHeight: '50px',
      [compact]: { fontSize: 'clamp(26px, 4vw + 10px, 32px)', lineHeight: 1.3 },
    },
    h3: { fontFamily: fonts.text, fontWeight: 600, fontSize: 24, lineHeight: '32px', [phone]: { fontSize: 22 } },
    h4: {
      fontFamily: fonts.text,
      fontWeight: 600,
      fontSize: 14,
      lineHeight: '20px',
      [compact]: { fontSize: 16, lineHeight: '22px' },
    },
    lead: { fontFamily: fonts.text, fontSize: 24, lineHeight: '50px', [compact]: { fontSize: 20, lineHeight: 1.7 } },
    body1: { fontFamily: fonts.text, fontSize: 16, lineHeight: '25px' },
    body2: {
      fontFamily: fonts.ui,
      fontSize: 14,
      lineHeight: '20px',
      letterSpacing: 0.7,
      [compact]: { fontSize: 16, lineHeight: '22px', letterSpacing: 0.3 },
    },
    caption: { fontFamily: fonts.text, fontSize: 12, lineHeight: '30px', [compact]: { fontSize: 16 } },
    button: { fontFamily: fonts.ui, fontSize: 16, lineHeight: '20px', textTransform: 'none' },
    nav: { fontFamily: fonts.ui, fontSize: 18, lineHeight: 1, textTransform: 'uppercase' },
    label: { fontFamily: fonts.ui, fontWeight: 600, fontSize: 24, lineHeight: '20px' },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ':root': {
          '--notice-h': `${layout.noticeHeight}px`,
          '--header-h': `${layout.headerHeight}px`,
          [compact]: { '--header-h': `${layout.headerHeightCompact}px` },
          [phone]: { '--notice-h': `${layout.noticeHeightPhone}px` },
        },
        body: { WebkitFontSmoothing: 'antialiased' },
        img: { display: 'block', maxWidth: '100%' },
      },
    },
    MuiTypography: {
      defaultProps: {
        variantMapping: { lead: 'p', nav: 'span', label: 'span' },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true, disableRipple: true, variant: 'outlined' },
      styleOverrides: {
        root: {
          borderRadius: 0,
          transition: 'background-color 200ms ease, color 200ms ease, border-color 200ms ease',
          '&.Mui-focusVisible': { outline: `2px solid ${colors.navy}`, outlineOffset: 3 },
        },
        outlined: {
          backgroundColor: colors.paper,
          color: colors.ink,
          border: `1px solid ${colors.ink}`,
          [canHover]: {
            '&:hover': {
              backgroundColor: colors.navy,
              borderColor: colors.navy,
              color: colors.white,
            },
          },
          // Touch: show the navy state while pressed instead
          '&:active': { backgroundColor: colors.navy, borderColor: colors.navy, color: colors.white },
        },
        sizeLarge: { width: 262, height: 69 },
        sizeMedium: { width: 216, height: 51 },
      },
    },
    MuiAppBar: {
      defaultProps: { elevation: 0 },
    },
  },
})

export default theme
