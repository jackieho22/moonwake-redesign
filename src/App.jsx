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
    <Box sx={{ minWidth: 1280 }}>
      <ConceptNotice />
      <SiteHeader />
      <Box component="main" sx={{ pt: `${layout.noticeHeight + layout.headerHeight}px` }}>
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
