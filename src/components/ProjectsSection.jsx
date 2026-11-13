import ProjectCard from './ProjectCard.jsx'
import { Link } from 'react-router-dom'
import { projects } from '../data/projects.js'

export default function ProjectsSection() {
  return (
    <section className="projects-section section-wrap" id="projects" aria-labelledby="projects-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow section-index">02 / SELECTED WORK</p>
          <h2 id="projects-title">Things I've been exploring.</h2>
        </div>
        <p className="section-aside">
          A mix of learning builds and early product ideas. Each one is a work in progress in its own way.
          {' '}<Link className="inline-route-link" to="/projects">Browse all project notes <span aria-hidden="true">↗</span></Link>
        </p>
      </div>
      <div className="project-grid">
        {projects.map((project) => <ProjectCard key={project.number} project={project} />)}
      </div>
    </section>
  )
}
