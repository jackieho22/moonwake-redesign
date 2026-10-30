import { useState } from 'react'

// Hover for mouse, tap-to-toggle for touch, focus for keyboard.
export default function useHoverReveal() {
  const [hovered, setHovered] = useState(false)
  const [pinned, setPinned] = useState(false)
  const [focused, setFocused] = useState(false)

  const handlers = {
    onPointerEnter: (e) => e.pointerType === 'mouse' && setHovered(true),
    onPointerLeave: (e) => e.pointerType === 'mouse' && setHovered(false),
    onPointerUp: (e) => e.pointerType !== 'mouse' && setPinned((p) => !p),
    onFocus: () => setFocused(true),
    onBlur: () => {
      setFocused(false)
      setPinned(false)
    },
  }

  return { active: hovered || pinned || focused, handlers }
}
