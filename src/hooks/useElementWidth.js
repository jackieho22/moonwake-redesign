import { useLayoutEffect, useRef, useState } from 'react'

// Tracks an element's rendered width. Returns [ref, width]; width is 0 until measured.
export default function useElementWidth() {
  const ref = useRef(null)
  const [width, setWidth] = useState(0)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return undefined
    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width))
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return [ref, width]
}
