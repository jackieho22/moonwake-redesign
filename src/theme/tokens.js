// Design tokens pulled from the Figma file (4aWGMZb0FgY4q7J7GkrSnP).

export const colors = {
  navy: '#041C2C',
  slate: '#5B6770',
  stone: '#D7D1CA',
  linen: '#E8E6DF',
  ink: '#111111',
  mist: '#A5B7C0',
  sand: '#C5B59E',
  sandDeep: '#847664',
  paper: '#F4F4F4',
  white: '#FFFFFF',
  placeholder: '#DADADA',
  placeholderDark: '#B8B8B8',
  placeholderDarker: '#8A8A8A',
}

export const fonts = {
  text: '"Archivo", system-ui, sans-serif',
  ui: '"Assistant", system-ui, sans-serif',
}

// Index-based spacing: theme.spacing(1) = 4px … theme.spacing(6) = 64px
export const spacing = [0, 4, 8, 16, 24, 40, 64]

export const radius = 15

export const shadows = {
  card: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  lifted: `0px 12px 16px 2px ${colors.slate}`,
  liftedHover: `0px 18px 24px 2px ${colors.slate}`,
}

export const layout = {
  headerHeight: 74,
  // Disclaimer strip above the header (ConceptNotice)
  noticeHeight: 26,
  // Shared content frame (see common/Container): 1360 of content plus a 40px gutter
  // each side, so it fills a 1440 screen edge to gutter and stays 1360 wider than that
  content: 1360,
  gutter: 40,
  // One spacing token between every section; grows with the viewport
  // (~151px at 1440, capped at 176px on wide screens)
  sectionGap: 'clamp(96px, 10.5vw, 176px)',
  // About the footer's rendered height (909px at 1440) on big screens,
  // never shorter than a laptop-friendly 560px
  heroHeight: 'clamp(560px, 85vh, 900px)',
}

export const motion = {
  ease: [0.22, 1, 0.36, 1],
  fast: 0.2,
  base: 0.35,
  slow: 0.6,
  // Shared "playful" feel: the roast fruit and the series accordion both use this.
  // Damping ratio ≈ 0.67, so it settles with one soft overshoot.
  spring: { type: 'spring', stiffness: 220, damping: 20 },
  stagger: 0.07,
}

// Hover/press feel for every button; spread onto a motion component.
export const pressable = {
  whileHover: { scale: 1.03 },
  whileTap: { scale: 0.97 },
  transition: motion.spring,
}
