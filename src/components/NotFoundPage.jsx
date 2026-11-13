import { Link } from 'react-router-dom'
import PageMetadata from './PageMetadata.jsx'

export default function NotFoundPage() {
  return (
    <>
      <PageMetadata
        title="Page not found | Itunuoluwa Adejimi"
        description="The page you requested could not be found."
      />
      <section className="route-page section-wrap not-found" aria-labelledby="not-found-title">
        <p className="eyebrow">404 / PAGE NOT FOUND</p>
        <h1 id="not-found-title">This page wandered off.</h1>
        <Link className="text-link" to="/">Return home <span aria-hidden="true">↗</span></Link>
      </section>
    </>
  )
}