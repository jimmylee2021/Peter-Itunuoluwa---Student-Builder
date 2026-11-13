import ProjectCard from './ProjectCard.jsx'
import PageMetadata from './PageMetadata.jsx'
import { projects } from '../data/projects.js'

export default function ProjectsPage() {
  return (
    <>
      <PageMetadata
        title="Projects | Itunuoluwa Adejimi"
        description="Learning builds and early product ideas from Itunuoluwa Adejimi."
      />
      <section className="route-page section-wrap" aria-labelledby="projects-page-title">
        <div className="route-heading">
          <p className="eyebrow">SELECTED WORK / NOTES</p>
          <h1 id="projects-page-title">Projects and explorations.</h1>
          <p className="route-lede">A collection of learning builds and early ideas. Status and available details are called out clearly; no demos or outcomes are implied.</p>
        </div>
        <div className="project-grid route-project-grid">
          {projects.map((project) => <ProjectCard key={project.slug} project={project} />)}
        </div>
      </section>
    </>
  )
}