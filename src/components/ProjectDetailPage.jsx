import { Link, useParams } from 'react-router-dom'
import { projects } from '../data/projects.js'
import PageMetadata from './PageMetadata.jsx'
import ProjectCard from './ProjectCard.jsx'

export default function ProjectDetailPage() {
  const { slug } = useParams()
  const project = projects.find((item) => item.slug === slug)

  if (!project) {
    return (
      <section className="route-page section-wrap not-found" aria-labelledby="project-not-found-title">
        <p className="eyebrow">PROJECT NOT FOUND</p>
        <h1 id="project-not-found-title">That project isn't here.</h1>
        <Link className="text-link" to="/projects">Back to projects <span aria-hidden="true">↗</span></Link>
      </section>
    )
  }

  return (
    <>
      <PageMetadata
        title={`${project.title} | Itunuoluwa Adejimi`}
        description={project.description}
      />
      <article className="route-page section-wrap project-detail">
        <Link className="back-link" to="/projects"><span aria-hidden="true">←</span> All projects</Link>
        <div className="project-detail-heading">
          <p className="eyebrow">{project.status}</p>
          <h1>{project.title}</h1>
          <p className="route-lede">{project.description}</p>
        </div>
        <div className="project-detail-layout">
          <section className="project-detail-notes" aria-labelledby="project-notes-title">
            <p className="eyebrow">PROJECT NOTES</p>
            <h2 id="project-notes-title">Where it stands</h2>
            <p>{project.details}</p>
          </section>
          <aside className="project-facts" aria-label="Project details">
            <div><span>Status</span><strong>{project.status}</strong></div>
            <div>
              <span>Topics</span>
              <ul className="tag-list">
                {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
              </ul>
            </div>
          </aside>
        </div>
        <div className="project-detail-preview"><ProjectCard project={project} /></div>
      </article>
    </>
  )
}