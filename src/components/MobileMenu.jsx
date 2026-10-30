import { useState } from 'react'
import { Box, ButtonBase, Modal, Typography } from '@mui/material'
import { AnimatePresence, motion } from 'motion/react'
import { fonts, layout, motion as m } from '../theme/tokens'
import { menuLinks } from '../data/navigation'
import symbol from '../assets/brand/symbol.png'
import wordmark from '../assets/brand/wordmark.png'
import searchIcon from '../assets/brand/icon-search.svg'
import profileIcon from '../assets/brand/icon-profile.svg'

// Full-screen navy menu for phones and tablets. Items with a `menu` open in place.

const list = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04, delayChildren: 0.08 } },
}
const rise = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: m.spring },
}

const row = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  minHeight: 60,
  color: 'common.white',
  textAlign: 'left',
  '&.Mui-focusVisible': { outline: '2px solid currentColor', outlineOffset: 2 },
}

function Chevron({ open }) {
  return (
    <Box
      component={motion.svg}
      animate={{ rotate: open ? 180 : 0 }}
      transition={m.spring}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
    >
      <path d="M5 7.5l5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </Box>
  )
}

function Group({ label, menu }) {
  const [open, setOpen] = useState(false)
  const id = `mobile-menu-${label.toLowerCase()}`

  return (
    <>
      <ButtonBase aria-expanded={open} aria-controls={id} onClick={() => setOpen((o) => !o)} sx={row}>
        <Typography sx={{ fontSize: 24 }}>{label}</Typography>
        <Chevron open={open} />
      </ButtonBase>
      <AnimatePresence initial={false}>
        {open && (
          <Box
            component={motion.ul}
            id={id}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ ...m.spring, opacity: { duration: m.fast } }}
            sx={{ listStyle: 'none', m: 0, p: 0, pl: 3, overflow: 'hidden' }}
          >
            {menuLinks(menu).map((item) => (
              <li key={item}>
                <Box
                  component="a"
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    minHeight: 44,
                    fontFamily: fonts.ui,
                    fontSize: 18,
                    color: 'brand.stone',
                    textDecoration: 'none',
                  }}
                >
                  {item}
                  {item === menu.all && <span aria-hidden>&nbsp;→</span>}
                </Box>
              </li>
            ))}
          </Box>
        )}
      </AnimatePresence>
    </>
  )
}

function MenuPanel({ items, onClose }) {
  return (
    <Box
      component={motion.div}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0, transition: { ...m.spring, opacity: { duration: m.fast } } }}
      exit={{ opacity: 0, y: -12, transition: { duration: m.fast, ease: m.ease } }}
      sx={{
        position: 'fixed',
        inset: 0,
        overflowY: 'auto',
        bgcolor: 'primary.main',
        color: 'common.white',
        outline: 'none',
      }}
    >
      {/* Mirrors the header bar so the close button lands where the menu icon was */}
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          height: layout.vars.header,
          px: { xs: `${layout.gutterPhone - 10}px`, sm: `${layout.gutterTablet - 10}px` },
          bgcolor: 'primary.main',
        }}
      >
        <ButtonBase
          aria-label="Close menu"
          onClick={onClose}
          sx={{ width: 44, height: 44, borderRadius: '50%', color: 'common.white' }}
        >
          <svg width="20" height="20" viewBox="0 0 18 18" fill="none" aria-hidden>
            <path d="M3 3l12 12M15 3L3 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </ButtonBase>
        <Box
          role="img"
          aria-label="Moonwake Coffee Roasters"
          sx={{ mx: 'auto', pr: '44px', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Box component="img" src={symbol} alt="" sx={{ width: 52, height: 30, objectFit: 'cover' }} />
          <Box component="img" src={wordmark} alt="" sx={{ width: 118, height: 24, objectFit: 'cover' }} />
        </Box>
      </Box>

      <Box
        component={motion.ul}
        variants={list}
        initial="hidden"
        animate="visible"
        sx={{ listStyle: 'none', m: 0, px: { xs: `${layout.gutterPhone}px`, sm: `${layout.gutterTablet}px` }, py: 4 }}
      >
        {items.map(({ label, menu }) => (
          <Box
            component={motion.li}
            variants={rise}
            key={label}
            sx={{ borderBottom: '1px solid rgba(244, 244, 244, 0.15)' }}
          >
            {menu ? (
              <Group label={label} menu={menu} />
            ) : (
              <ButtonBase sx={row}>
                <Typography sx={{ fontSize: 24 }}>{label}</Typography>
              </ButtonBase>
            )}
          </Box>
        ))}
        <Box component={motion.li} variants={rise} sx={{ display: 'flex', gap: 4, pt: 5 }}>
          {[
            { label: 'Search', src: searchIcon },
            { label: 'Account', src: profileIcon },
          ].map(({ label, src }) => (
            <ButtonBase
              key={label}
              sx={{ gap: 3, minHeight: 44, color: 'common.white', fontFamily: fonts.ui, fontSize: 18 }}
            >
              <img src={src} alt="" width={22} height={22} />
              {label}
            </ButtonBase>
          ))}
        </Box>
      </Box>
    </Box>
  )
}

// Menu icon + overlay. Modal gives the scroll lock, focus trap and Esc to close.
export default function MobileMenu({ items }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <ButtonBase
        aria-label="Open menu"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        sx={{ width: 44, height: 44, ml: '-10px', borderRadius: '50%', color: 'common.white' }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M3 7h18M3 12h18M3 17h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </ButtonBase>
      <Modal open={open} onClose={() => setOpen(false)} hideBackdrop keepMounted={false}>
        <Box sx={{ outline: 'none' }}>
          <AnimatePresence>{open && <MenuPanel items={items} onClose={() => setOpen(false)} />}</AnimatePresence>
        </Box>
      </Modal>
    </>
  )
}
