import { Link } from 'react-router-dom'
import PageMetadata from './PageMetadata.jsx'

const aboutSections = [
  {
    number: '01',
    title: 'My story',
    text: 'I am a Computer Science student interested in frontend development and practical uses of technology. I learn by building projects, exploring product ideas, and documenting what I discover.',
  },
  {
    number: '02',
    title: 'How I approach building',
    text: 'I start by understanding the problem, then break it into manageable parts. From there, I research, plan the interface, build, test, and improve.',
  },
  {
    number: '03',
    title: "What I'm learning",
    text: 'My current interests include React and frontend development, digital product thinking, accessible technology explainers, and the work that helps communities and programmes run well.',
  },
  {
    number: '04',
    title: 'What matters to me',
    text: 'Practical solutions, steady learning, collaboration, and technology that responds to real needs are important parts of how I want to work.',
  },
  {
    number: '05',
    title: 'Current direction',
    text: 'I am exploring opportunities to contribute to frontend work, product thinking, and practical digital experiences where learning, usefulness, and real-world impact matter.',
  },
]

export default function AboutPage() {
  return (
    <>
      <PageMetadata
        title="About | Itunuoluwa Adejimi"
        description="Learn about Itunuoluwa Adejimi's studies, approach to building, and current technology interests."
      />
      <section className="route-page section-wrap" aria-labelledby="about-page-title">
        <div className="route-heading">
          <p className="eyebrow">A LITTLE CONTEXT</p>
          <h1 id="about-page-title">Student. Builder.<br />Always becoming.</h1>
          <p className="route-lede">I'm Itunuoluwa Adejimi, a Computer Science student and frontend developer learning through practical projects and thoughtful questions.</p>
        </div>
        <div className="about-sections">
          {aboutSections.map((section) => (
            <section className="about-panel" key={section.number}>
              <span>{section.number}</span>
              <div>
                <h2>{section.title}</h2>
                <p>{section.text}</p>
              </div>
            </section>
          ))}
        </div>
        <div className="route-cta">
          <p>Interested in the things I'm working through?</p>
          <Link className="text-link" to="/projects">Browse project notes <span aria-hidden="true">↗</span></Link>
        </div>
      </section>
    </>
  )
}