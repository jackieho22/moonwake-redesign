import { useEffect, useState } from 'react'

const fit = (width, height, margin) =>
  Math.min(1, (window.innerWidth - margin * 2) / width, (window.innerHeight - margin * 2) / height)

// Shrinks a fixed-size panel to fit small viewports (height or width) without reflowing its layout.
export default function useFitScale(width, height, margin = 0) {
  const [scale, setScale] = useState(() => fit(width, height, margin))

  useEffect(() => {
    const onResize = () => setScale(fit(width, height, margin))
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [width, height, margin])

  return scale
}
