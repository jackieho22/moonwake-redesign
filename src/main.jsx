import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { MotionConfig } from 'motion/react'
import '@fontsource/archivo/400.css'
import '@fontsource/archivo/600.css'
import '@fontsource/assistant/400.css'
import '@fontsource/assistant/600.css'
import theme from './theme/theme'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MotionConfig reducedMotion="user">
        <App />
      </MotionConfig>
    </ThemeProvider>
  </StrictMode>,
)
