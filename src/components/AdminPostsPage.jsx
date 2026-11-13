import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import BlogStatus from './BlogStatus.jsx'
import PageMetadata from './PageMetadata.jsx'
import { getSupabaseClient, isSupabaseConfigured } from '../lib/supabaseClient.js'

export default function AdminPostsPage() {
  const navigate = useNavigate()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(Boolean(isSupabaseConfigured))
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  useEffect(() => {
    if (!isSupabaseConfigured) {
      return
    }

    let cancelled = false

    async function loadPosts() {
      setLoading(true)
      setError('')

      const supabase = await getSupabaseClient()

      if (!supabase || cancelled) {
        setLoading(false)
        return
      }

      const { data, error: queryError } = await supabase
        .from('posts')
        .select('id, title, slug, status, category, excerpt, updated_at, published_at')
        .order('updated_at', { ascending: false })

      if (cancelled) return

      if (queryError) {
        setError(queryError.message)
        setPosts([])
      } else {
        setPosts(data ?? [])
      }

      setLoading(false)
    }

    loadPosts()

    return () => {
      cancelled = true
    }
  }, [])

  const filteredPosts = useMemo(() => {
    const normalized = search.trim().toLowerCase()

    return posts.filter((post) => {
      const matchesSearch = !normalized || `${post.title} ${post.slug} ${post.excerpt ?? ''}`.toLowerCase().includes(normalized)
      const matchesStatus = statusFilter === 'all' || post.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [posts, search, statusFilter])

  async function handleDelete(postId, title) {
    if (!window.confirm(`Delete “${title}”? This action cannot be undone.`)) {
      return
    }

    const supabase = await getSupabaseClient()
    if (!supabase) {
      setError('The blog database is unavailable right now.')
      return
    }

    const { error: deleteError } = await supabase.from('posts').delete().eq('id', postId)

    if (deleteError) {
      setError(deleteError.message)
      return
    }

    setPosts((currentPosts) => currentPosts.filter((post) => post.id !== postId))
  }

  return (
    <>
      <PageMetadata title="Manage blog posts | Itunuoluwa Adejimi" description="Create, edit, publish, and manage the writing archive." />
      <section className="route-page section-wrap admin-page" aria-labelledby="admin-posts-title">
        <div className="admin-shell">
          <header className="admin-header admin-header-compact">
            <div>
              <p className="eyebrow">ADMIN / POSTS</p>
              <h1 id="admin-posts-title">Manage writing.</h1>
            </div>
            <div className="admin-actions">
              <Link className="button button-primary" to="/admin/posts/new">Create post</Link>
              <Link className="button admin-button-secondary" to="/admin">Back to dashboard</Link>
            </div>
          </header>

          {!isSupabaseConfigured ? (
            <div className="admin-panel">
              <BlogStatus message="Add the Supabase project URL and anon key to manage posts in the admin dashboard." />
            </div>
          ) : loading ? (
            <BlogStatus message="Loading posts…" />
          ) : error ? (
            <BlogStatus message={`Posts couldn't be loaded: ${error}`} isError />
          ) : (
            <>
              <div className="admin-panel admin-toolbar">
                <label className="form-field admin-search-field">
                  <span>Search</span>
                  <input
                    type="search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search posts"
                  />
                </label>
                <label className="form-field admin-status-field">
                  <span>Status</span>
                  <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
                    <option value="all">All statuses</option>
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </label>
              </div>

              {filteredPosts.length === 0 ? (
                <div className="admin-panel empty-admin-list">
                  <p>No posts match those filters yet.</p>
                </div>
              ) : (
                <div className="admin-list" role="list" aria-label="Blog post list">
                  {filteredPosts.map((post) => (
                    <article className="admin-row" key={post.id} role="listitem">
                      <div className="admin-row-copy">
                        <div className="admin-row-heading">
                          <p className="admin-label">{post.status}</p>
                          <h2>{post.title}</h2>
                        </div>
                        <p>{post.excerpt || 'No excerpt for this draft yet.'}</p>
                        <div className="admin-meta">
                          <span>{post.category || 'General'}</span>
                          <span>{post.slug}</span>
                          <span>{post.updated_at || post.published_at ? new Date(post.updated_at || post.published_at).toLocaleDateString() : 'Not dated'}</span>
                        </div>
                      </div>
                      <div className="admin-row-actions">
                        <Link className="text-link" to={`/admin/posts/${post.id}/edit`}>Edit <span aria-hidden="true">↗</span></Link>
                        <button className="button admin-button-secondary" type="button" onClick={() => navigate('/blog/' + post.slug)}>View</button>
                        <button className="button admin-button-danger" type="button" onClick={() => handleDelete(post.id, post.title)}>Delete</button>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  )
}
