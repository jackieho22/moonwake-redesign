import { Button } from '@mui/material'
import { motion } from 'motion/react'
import { pressable } from '../../theme/tokens'

const MotionButton = motion.create(Button)

// Outlined CTA with the shared springy hover/press scale.
export default function CtaButton(props) {
  return <MotionButton {...pressable} {...props} />
}
