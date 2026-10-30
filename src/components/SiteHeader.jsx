import { Fragment, useState } from 'react'
import { AppBar, Box, ButtonBase, Divider, Toolbar, Typography } from '@mui/material'
import { AnimatePresence, motion } from 'motion/react'
import { fonts, layout, motion as m } from '../theme/tokens'
import { aboutMenu, shopMenu } from '../data/navigation'
import symbol from '../assets/brand/symbol.png'
import wordmark from '../assets/brand/wordmark.png'
import searchIcon from '../assets/brand/icon-search.svg'
import profileIcon from '../assets/brand/icon-profile.svg'
import bagIcon from '../assets/brand/icon-bag.png'
import MobileMenu from './MobileMenu'

const navItems = [
  { label: 'Shop', menu: shopMenu },
  { label: 'Cafe' },
  { label: 'Wholesale' },
  { label: 'Events' },
  { label: 'Info', menu: aboutMenu },
]

// `desktop` actions move into the mobile menu below the md breakpoint; the cart always stays
const actions = [
  { label: 'Search', src: searchIcon, width: 33, height: 33, desktop: true },
  { label: 'Account', src: profileIcon, width: 25, height: 32, desktop: true },
  { label: 'Cart', src: bagIcon, width: 40, height: 40 },
]

// Snappier than the shared spring: menus should feel instant (settles in ~0.2s)
const quickSpring = { type: 'spring', stiffness: 500, damping: 32 }

const panel = {
  hidden: { opacity: 0, y: -8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ...quickSpring, staggerChildren: 0.02 },
  },
  exit: { opacity: 0, y: -6, transition: { duration: m.fast, ease: m.ease } },
}

const rise = {
  hidden: { opacity: 0, y: 4 },
  visible: { opacity: 1, y: 0, transition: quickSpring },
}

// Sand underline that slides between hovered items (tabs and dropdown links share the look).
function Underline({ layoutId }) {
  return (
    <Box
      component={motion.span}
      layoutId={layoutId}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: m.base, ease: m.ease }}
      sx={{ position: 'absolute', left: 0, right: 0, bottom: 2, height: 2, bgcolor: 'brand.sand' }}
    />
  )
}

function MenuLink({ label, arrow, active, onHover, underlineId }) {
  return (
    <Box component={motion.li} variants={rise}>
      <Box
        component="a"
        href="#"
        onClick={(e) => e.preventDefault()}
        onPointerEnter={onHover}
        onFocus={onHover}
        sx={(theme) => ({
          position: 'relative',
          display: 'inline-flex',
          gap: 2,
          py: '6px',
          fontFamily: fonts.ui,
          fontSize: 16,
          lineHeight: '20px',
          color: active ? 'primary.main' : 'text.primary',
          textDecoration: 'none',
          transition: 'color 200ms ease',
          outline: 'none',
          '&:focus-visible': { outline: `2px solid ${theme.palette.primary.main}`, outlineOffset: 3 },
        })}
      >
        {label}
        {arrow && <span aria-hidden>→</span>}
        <AnimatePresence>{active && <Underline layoutId={underlineId} />}</AnimatePresence>
      </Box>
    </Box>
  )
}

function NavMenu({ id, label, menu }) {
  const [hovered, setHovered] = useState(null)
  const underlineId = `${id}-underline`
  const link = (item, arrow) => (
    <MenuLink
      key={item}
      label={item}
      arrow={arrow}
      active={hovered === item}
      onHover={() => setHovered(item)}
      underlineId={underlineId}
    />
  )

  return (
    <Box
      component={motion.div}
      id={id}
      variants={panel}
      initial="hidden"
      animate="visible"
      exit="exit"
      // Transparent top padding bridges the gap to the card so the pointer can cross it
      sx={{ position: 'absolute', top: '100%', left: -24, pt: '28px' }}
    >
      <Box
        component="ul"
        aria-label={`${label} menu`}
        onPointerLeave={() => setHovered(null)}
        sx={(theme) => ({
          listStyle: 'none',
          m: 0,
          minWidth: 240,
          py: 4,
          px: 4,
          bgcolor: 'brand.paper',
          borderRadius: `${theme.shape.borderRadius}px`,
          boxShadow: theme.customShadows.card,
        })}
      >
        {menu.groups.map((group, i) => (
          <Fragment key={group[0]}>
            {i > 0 && <Divider component="li" role="presentation" sx={{ my: 2, borderColor: 'brand.stone' }} />}
            {group.map((item) => link(item))}
          </Fragment>
        ))}
        {menu.all && link(menu.all, true)}
      </Box>
    </Box>
  )
}

function NavItem({ label, menu, active, onActivate }) {
  const menuId = `nav-menu-${label.toLowerCase()}`

  return (
    <Box data-nav-item sx={{ position: 'relative', display: 'flex' }} onPointerEnter={onActivate}>
      <ButtonBase
        disableRipple
        onFocus={onActivate}
        onClick={onActivate}
        aria-expanded={menu ? active : undefined}
        aria-controls={menu && active ? menuId : undefined}
        sx={{ position: 'relative', height: 35, color: 'common.white' }}
      >
        <Typography variant="nav">{label}</Typography>
        <AnimatePresence>{active && <Underline layoutId="nav-underline" />}</AnimatePresence>
      </ButtonBase>
      {menu && <AnimatePresence>{active && <NavMenu id={menuId} label={label} menu={menu} />}</AnimatePresence>}
    </Box>
  )
}

export default function SiteHeader() {
  const [hovered, setHovered] = useState(null)

  const onKeyDown = (e) => {
    if (e.key !== 'Escape' || !hovered) return
    // Return focus to the tab, then close (the close wins since both updates batch)
    e.target.closest('[data-nav-item]')?.querySelector('button')?.focus()
    setHovered(null)
  }

  return (
    <AppBar position="fixed" color="primary" sx={{ top: layout.vars.notice }}>
      <Toolbar
        disableGutters
        sx={{
          height: layout.vars.header,
          minHeight: `${layout.vars.header} !important`,
          px: { xs: `${layout.gutterPhone}px`, sm: `${layout.gutterTablet}px`, md: 5 },
        }}
      >
        {/* Menu icon (phones/tablets) or the nav (desktop). flex: 1 on both sides keeps the logo centred */}
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <MobileMenu items={navItems} />
          </Box>
          <Box
            component="nav"
            aria-label="Main"
            onPointerLeave={() => setHovered(null)}
            onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setHovered(null)}
            onKeyDown={onKeyDown}
            sx={{ display: { xs: 'none', md: 'flex' }, gap: 5 }}
          >
            {navItems.map(({ label, menu }) => (
              <NavItem
                key={label}
                label={label}
                menu={menu}
                active={hovered === label}
                onActivate={() => setHovered(label)}
              />
            ))}
          </Box>
        </Box>

        <Box
          aria-label="Moonwake Coffee Roasters"
          role="img"
          sx={{ display: 'flex', alignItems: 'center', gap: { xs: '6px', md: '10px' } }}
        >
          <Box
            component="img"
            src={symbol}
            alt=""
            sx={{ width: { xs: 52, md: 82 }, height: { xs: 30, md: 48 }, objectFit: 'cover' }}
          />
          <Box
            component="img"
            src={wordmark}
            alt=""
            sx={{ width: { xs: 118, md: 187 }, height: { xs: 24, md: 38 }, objectFit: 'cover' }}
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '33px', flex: 1 }}>
          {actions.map(({ label, src, width, height, desktop }) => (
            <ButtonBase
              key={label}
              aria-label={label}
              sx={{
                display: desktop ? { xs: 'none', md: 'inline-flex' } : 'inline-flex',
                // At least 44×44 to tap on touch screens
                minWidth: { xs: 44, md: 0 },
                minHeight: { xs: 44, md: 0 },
                transition: 'opacity 200ms ease, transform 200ms ease',
                '@media (hover: hover)': { '&:hover': { opacity: 0.75, transform: 'translateY(-1px)' } },
              }}
            >
              <Box
                component="img"
                src={src}
                alt=""
                width={width}
                height={height}
                sx={{ width: { xs: width * 0.8, md: width }, height: 'auto' }}
              />
            </ButtonBase>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  )
}
