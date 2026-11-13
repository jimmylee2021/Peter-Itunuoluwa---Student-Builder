import HeroSection from './HeroSection.jsx'
import IntroSection from './IntroSection.jsx'
import ProjectsSection from './ProjectsSection.jsx'
import ExploringSection from './ExploringSection.jsx'
import WritingSection from './WritingSection.jsx'
import ContactSection from './ContactSection.jsx'
import PageMetadata from './PageMetadata.jsx'

export default function HomePage() {
  return (
    <>
      <PageMetadata
        title="Itunuoluwa Adejimi | Student, Builder, Learner"
        description="Computer Science student and frontend developer learning by building practical digital projects."
      />
      <HeroSection />
      <IntroSection />
      <ProjectsSection />
      <ExploringSection />
      <WritingSection />
      <ContactSection />
    </>
  )
}