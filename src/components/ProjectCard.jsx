import { useState } from 'react'
import { Link } from 'react-router-dom'

function ProjectArtwork({ project }) {
  const [previewFailed, setPreviewFailed] = useState(false)
  const { art: type, previewImageUrl, title } = project

  if (previewImageUrl && !previewFailed) {
    return (
      <div className="project-art project-image-art">
        <img
          className="project-preview-image"
          src={previewImageUrl}
          alt={`${title} website preview`}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() => setPreviewFailed(true)}
        />
      </div>
    )
  }

  if (type === 'buybetter') {
    return (
      <div className="project-art buybetter-art" aria-hidden="true">
        <span className="art-label">ONLINE STORE / LEARNING BUILD</span>
        <div className="buybetter-storefront">
          <span className="buybetter-brand">buybetter</span>
          <span className="buybetter-product product-one" />
          <span className="buybetter-product product-two" />
          <span className="buybetter-product product-three" />
          <span className="buybetter-store-line" />
        </div>
      </div>
    )
  }

  if (type === 'builderslog') {
    return (
      <div className="project-art builderslog-art" aria-hidden="true">
        <span className="art-label">WRITING / PLATFORM</span>
        <div className="builderslog-shell">
          <span className="builderslog-heading">Builders.log</span>
          <span className="builderslog-bar bar-one" />
          <span className="builderslog-bar bar-two" />
          <span className="builderslog-bar bar-three" />
        </div>
      </div>
    )
  }

  if (type === 'kanban') {
    return (
      <div className="project-art kanban-art" aria-hidden="true">
        <span className="art-label">TASKS / IN MOTION</span>
        <div className="kanban-columns"><i /><i /><i /></div>
        <div className="kanban-ticket ticket-one" />
        <div className="kanban-ticket ticket-two" />
      </div>
    )
  }

  if (type === 'todo') {
    return (
      <div className="project-art todo-art" aria-hidden="true">
        <span className="todo-check">✓</span>
        <span className="todo-rule rule-one" />
        <span className="todo-rule rule-two" />
        <span className="todo-rule rule-three" />
        <span className="todo-spark">DO<br />ONE<br />THING</span>
      </div>
    )
  }

  if (type === 'market') {
    return (
      <div className="project-art market-art" aria-hidden="true">
        <span className="market-stamp">NEXT<br />STEP</span>
        <span className="market-line line-one" />
        <span className="market-line line-two" />
        <span className="market-line line-three" />
      </div>
    )
  }

  if (type === 'kolekto') {
    return (
      <div className="project-art kolekto-art" aria-hidden="true">
        <span className="kolekto-word">KO<span>LEKTO</span></span>
        <span className="kolekto-shape shape-one" />
        <span className="kolekto-shape shape-two" />
        <span className="kolekto-shape shape-three" />
      </div>
    )
  }

  return null
}

export default function ProjectCard({ project }) {
  return (
    <article className="project-card">
      <ProjectArtwork project={project} />
      <div className="project-meta">
        <span>{project.status}</span>
        <span>{project.number}</span>
      </div>
      <h3><Link to={`/projects/${project.slug}`}>{project.title}</Link></h3>
      <p>{project.description}</p>
      <ul className="tag-list" aria-label={`${project.title} topics`}>
        {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
      </ul>
      {(project.liveUrl || project.sourceUrl) && (
        <div className="project-external-links">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noreferrer">
              Live site <span aria-hidden="true">↗</span>
            </a>
          )}
          {project.sourceUrl && (
            <a href={project.sourceUrl} target="_blank" rel="noreferrer">
              Source code <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      )}
      <Link className="project-more" to={`/projects/${project.slug}`}>
        Read project notes <span aria-hidden="true">↗</span>
      </Link>
    </article>
  )
}
