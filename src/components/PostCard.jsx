import { Link } from 'react-router-dom'

function formatDate(value) {
  if (!value) return 'Date unavailable'

  return new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(value))
}

function estimateReadingTime(post) {
  const wordCount = `${post.title} ${post.excerpt ?? ''} ${post.content ?? ''}`
    .trim()
    .split(/\s+/)
    .filter(Boolean).length

  return Math.max(1, Math.ceil(wordCount / 220))
}

export default function PostCard({ post }) {
  return (
    <article className="post-card">
      {post.cover_image_url && (
        <Link className="post-cover-link" to={`/blog/${post.slug}`} tabIndex={-1} aria-hidden="true">
          <img className="post-cover" src={post.cover_image_url} alt="" loading="lazy" />
        </Link>
      )}
      <div className="post-card-meta">
        <span>{post.category || 'Notes'}</span>
        <time dateTime={post.published_at}>{formatDate(post.published_at)}</time>
      </div>
      <h3><Link to={`/blog/${post.slug}`}>{post.title}</Link></h3>
      {post.excerpt && <p>{post.excerpt}</p>}
      <div className="post-card-footer">
        <span>{estimateReadingTime(post)} min read</span>
        <Link to={`/blog/${post.slug}`} aria-label={`Read ${post.title}`}>Read article <span aria-hidden="true">↗</span></Link>
      </div>
    </article>
  )
}
