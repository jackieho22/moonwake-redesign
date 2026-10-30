import { Box } from '@mui/material'
import ConceptNotice from './components/ConceptNotice'
import SiteHeader from './components/SiteHeader'
import Hero from './components/Hero'
import BaristaPrompt from './components/BaristaPrompt'
import SeriesCollage from './components/SeriesCollage'
import MonthlyRoasts from './components/MonthlyRoasts'
import EnhanceYourBrew from './components/EnhanceYourBrew'
import JoinFamily from './components/JoinFamily'
import FindOurCafe from './components/FindOurCafe'
import SiteFooter from './components/SiteFooter'
import NoiseBackground from './components/common/NoiseBackground'
import { layout } from './theme/tokens'

export default function App() {
  return (
    // `clip` is a safety net against stray horizontal overflow (it doesn't create a scroll container)
    <Box sx={{ overflowX: 'clip' }}>
      <ConceptNotice />
      <SiteHeader />
      <Box component="main" sx={{ pt: `calc(${layout.vars.notice} + ${layout.vars.header})` }}>
        <Hero />
        <NoiseBackground>
          <BaristaPrompt />
          <SeriesCollage />
          <MonthlyRoasts />
          <EnhanceYourBrew />
          <JoinFamily />
          <FindOurCafe />
          <SiteFooter />
        </NoiseBackground>
      </Box>
    </Box>
  )
}
