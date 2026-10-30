import { useEffect, useState } from 'react'

const fit = (height, margin) => Math.min(1, (window.innerHeight - margin * 2) / height)

// Shrinks a fixed-height panel to fit short viewports without reflowing its layout.
export default function useFitScale(height, margin = 0) {
  const [scale, setScale] = useState(() => fit(height, margin))

  useEffect(() => {
    const onResize = () => setScale(fit(height, margin))
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [height, margin])

  return scale
}
