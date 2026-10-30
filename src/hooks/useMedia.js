import { useMediaQuery } from '@mui/material'

// Below the desktop breakpoint (phones and tablets): menu icon, carousels, stacked sections.
export const useCompact = () => useMediaQuery((theme) => theme.breakpoints.down('md'), { noSsr: true })

// True on devices with a real hovering pointer. Touch devices get tap / scroll-in versions instead.
export const useCanHover = () => useMediaQuery('(hover: hover)', { noSsr: true })
