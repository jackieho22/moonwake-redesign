import { Box, ButtonBase, Divider, InputBase, Typography } from '@mui/material'
import { motion } from 'motion/react'
import { colors, pressable } from '../theme/tokens'
import Container from './common/Container'
import symbol from '../assets/brand/symbol.png'
import wordmark from '../assets/brand/wordmark.png'
import { aboutMenu, menuLinks, shopMenu } from '../data/navigation'

const shopLinks = menuLinks(shopMenu)
const aboutLinks = menuLinks(aboutMenu)

// White squares invert to navy with a white outline, like the outlined CTA buttons.
const squareButton = (size) => ({
  width: size,
  height: size,
  flexShrink: 0,
  borderRadius: `${15}px`,
  bgcolor: 'common.white',
  color: 'primary.main',
  border: '1px solid transparent',
  transition: 'background-color 200ms ease, color 200ms ease, border-color 200ms ease',
  '&:hover, &.Mui-focusVisible': {
    bgcolor: 'primary.main',
    color: 'common.white',
    borderColor: 'common.white',
  },
})

function Arrow({ up }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden style={{ rotate: up ? '-90deg' : '0deg' }}>
      <path d="M3 9h12M10 4l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// Outline social glyphs (Feather icon shapes) drawn in the current text colour.
const socials = [
  {
    name: 'Facebook',
    icon: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
  },
  {
    name: 'Instagram',
    icon: (
      <>
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
      </>
    ),
  },
]

function Column({ title, children, width }) {
  return (
    <Box sx={{ width }}>
      <Typography sx={{ lineHeight: '50px', mb: 2 }}>{title}</Typography>
      {children}
    </Box>
  )
}

function LinkList({ items }) {
  return (
    <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0 }}>
      {items.map((item) => (
        <Typography component="li" variant="caption" key={item} sx={{ display: 'block' }}>
          {item}
        </Typography>
      ))}
    </Box>
  )
}

export default function SiteFooter() {
  return (
    <Box
      component="footer"
      sx={(theme) => ({
        bgcolor: 'primary.main',
        color: 'brand.paper',
        borderTopLeftRadius: theme.shape.borderRadius,
        borderTopRightRadius: theme.shape.borderRadius,
        pt: '82px',
        pb: 6,
      })}
    >
      <Container>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', pl: '2px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: '17px' }} role="img" aria-label="Moonwake Coffee Roasters">
            <Box component="img" src={symbol} alt="" sx={{ width: 209, height: 122, objectFit: 'cover' }} />
            <Box component="img" src={wordmark} alt="" sx={{ width: 439, height: 90, objectFit: 'cover' }} />
          </Box>

          <Box component="form" onSubmit={(e) => e.preventDefault()} sx={{ width: 362 }}>
            <Typography sx={{ fontSize: 24, lineHeight: '50px' }}>Get 10% Off your first order!</Typography>
            <Typography sx={{ lineHeight: '30px', maxWidth: 360 }}>
              Also get the latest updates on new and exclusive product releases and more
            </Typography>
            <Box sx={{ display: 'flex', gap: 4, mt: 5 }}>
              <InputBase
                type="email"
                placeholder="email address"
                inputProps={{ 'aria-label': 'Email address' }}
                sx={{
                  flex: 1,
                  height: 52,
                  px: 4,
                  bgcolor: 'common.white',
                  borderRadius: '15px',
                  color: 'text.primary',
                }}
              />
              <ButtonBase component={motion.button} {...pressable} type="submit" aria-label="Sign up" sx={squareButton(52)}>
                <Arrow />
              </ButtonBase>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ mt: '119px', mb: '38px', borderColor: colors.paper }} />

        <Box sx={{ display: 'flex' }}>
          <Column title="Socials" width={286}>
            <Box sx={{ display: 'flex', gap: '22px' }}>
              {socials.map(({ name, icon }) => (
                <ButtonBase
                  component={motion.button}
                  {...pressable}
                  key={name}
                  aria-label={name}
                  sx={{
                    width: 51,
                    height: 51,
                    color: 'common.white',
                    transition: 'opacity 200ms ease',
                    '&:hover, &.Mui-focusVisible': { opacity: 0.75 },
                    '&.Mui-focusVisible': { outline: '2px solid currentColor', outlineOffset: 3, borderRadius: '50%' },
                  }}
                >
                  <svg
                    width="34"
                    height="34"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    {icon}
                  </svg>
                </ButtonBase>
              ))}
            </Box>
          </Column>
          <Column title="Shop" width={196}>
            <LinkList items={shopLinks} />
          </Column>
          <Column title="About" width={286}>
            <LinkList items={aboutLinks} />
          </Column>
          <Column title="Address">
            <Typography sx={{ fontWeight: 600, lineHeight: '30px' }}>San Jose</Typography>
            <Typography sx={{ lineHeight: '30px' }}>1412 saratoga avenue</Typography>
            <Typography sx={{ lineHeight: '30px' }}>san jose, ca</Typography>
            <Typography sx={{ fontWeight: 600, lineHeight: '30px', mt: 5 }}>Opening Hours</Typography>
            <Typography sx={{ lineHeight: '30px' }}>monday-friday 7a-5p</Typography>
            <Typography sx={{ lineHeight: '30px' }}>saturday &amp; sunday 8a-5p</Typography>
          </Column>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 6 }}>
          <Typography variant="caption">© 2026, Moonwake Coffee Roasters Powered by Shopify</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography>Back To Top</Typography>
            <ButtonBase
              component={motion.button}
              {...pressable}
              aria-label="Back to top"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              sx={squareButton(41)}
            >
              <Arrow up />
            </ButtonBase>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
