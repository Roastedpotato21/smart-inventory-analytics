import { MotionConfig } from 'motion/react'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { ProjectOverview } from './components/ProjectOverview'
import { Metrics } from './components/Metrics'
import { DashboardShowcase } from './components/DashboardShowcase'
import { SQLAnalysis } from './components/SQLAnalysis'
import { Insights } from './components/Insights'
import { Recommendations } from './components/Recommendations'
import { Workflow } from './components/Workflow'
import { Skills } from './components/Skills'
import { Resources } from './components/Resources'
import { Footer } from './components/Footer'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#main">Skip to content</a>
      <Navbar />
      <main id="main">
        <Hero />
        <ProjectOverview />
        <Metrics />
        <DashboardShowcase />
        <SQLAnalysis />
        <Insights />
        <Recommendations />
        <Workflow />
        <Skills />
        <Resources />
      </main>
      <Footer />
    </MotionConfig>
  )
}
