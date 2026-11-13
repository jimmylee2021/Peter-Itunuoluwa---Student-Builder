import { Link, useParams } from 'react-router-dom'
import PageMetadata from './PageMetadata.jsx'
import BlogStatus from './BlogStatus.jsx'
import usePublishedPost from '../hooks/usePublishedPost.js'
import { isSupabaseConfigured } from '../lib/supabaseClient.js'

function formatDate(value) {
  if (!value) return ''

  return new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(value))
}

function ArticleBody({ content }) {
  const paragraphs = (content ?? '').split(/\n\s*\n/).map((paragraph) => paragraph.trim()).filter(Boolean)

  if (paragraphs.length === 0) {
    return <p className="article-missing-content">This article doesn't have any published content yet.</p>
  }

  return paragraphs.map((paragraph, index) => {
    if (paragraph.startsWith('### ')) {
      return <h3 key={index}>{paragraph.slice(4)}</h3>
    }

    if (paragraph.startsWith('## ')) {
      return <h2 key={index}>{paragraph.slice(3)}</h2>
    }

    return <p key={index}>{paragraph}</p>
  })
}

export default function BlogPostPage() {
  const { slug } = useParams()
  const { post, loading, error } = usePublishedPost(slug)

  if (!isSupabaseConfigured) {
    return (
      <section className="route-page section-wrap" aria-labelledby="article-state-title">
        <BlogStatus message="The blog database isn't configured yet, so published articles can't be loaded." />
        <Link className="text-link" to="/blog">Back to writing <span aria-hidden="true">↗</span></Link>
      </section>
    )
  }

  if (loading) {
    return <section className="route-page section-wrap"><BlogStatus message="Loading article…" /></section>
  }

  if (error) {
    return (
      <section className="route-page section-wrap">
        <BlogStatus message="This article couldn't be loaded right now. Please try again later." isError />
        <Link className="text-link" to="/blog">Back to writing <span aria-hidden="true">↗</span></Link>
      </section>
    )
  }

  if (!post) {
    return (
      <section className="route-page section-wrap not-found" aria-labelledby="article-not-found-title">
        <p className="eyebrow">ARTICLE NOT FOUND</p>
        <h1 id="article-not-found-title">That note isn't published.</h1>
        <p className="route-lede">Only published articles are available here.</p>
        <Link className="text-link" to="/blog">Back to writing <span aria-hidden="true">↗</span></Link>
      </section>
    )
  }

  const wordCount = `${post.title} ${post.content ?? ''}`.trim().split(/\s+/).filter(Boolean).length
  const readingTime = Math.max(1, Math.ceil(wordCount / 220))
  const wasUpdated = post.updated_at && post.published_at
    && new Date(post.updated_at).getTime() - new Date(post.published_at).getTime() > 60_000

  return (
    <>
      <PageMetadata
        title={post.seo_title || `${post.title} | Itunuoluwa Adejimi`}
        description={post.seo_description || post.excerpt || `A note by ${post.author_name || 'Itunuoluwa Adejimi'}.`}
      />
      <article className="route-page section-wrap article-page">
        <Link className="back-link" to="/blog"><span aria-hidden="true">←</span> All writing</Link>
        <header className="article-header">
          {post.category && <p className="eyebrow">{post.category}</p>}
          <h1>{post.title}</h1>
          {post.excerpt && <p className="article-excerpt">{post.excerpt}</p>}
          <div className="article-byline">
            <span>By {post.author_name || 'Itunuoluwa Adejimi'}</span>
            <time dateTime={post.published_at}>{formatDate(post.published_at)}</time>
            {wasUpdated && <span>Updated {formatDate(post.updated_at)}</span>}
            <span>{readingTime} min read</span>
          </div>
          {post.tags?.length > 0 && (
            <ul className="tag-list article-tags" aria-label="Article tags">
              {post.tags.map((tag) => <li key={tag}>{tag}</li>)}
            </ul>
          )}
        </header>
        {post.cover_image_url && <img className="article-cover" src={post.cover_image_url} alt="" />}
        <div className="article-body"><ArticleBody content={post.content} /></div>
      </article>
    </>
  )
}
