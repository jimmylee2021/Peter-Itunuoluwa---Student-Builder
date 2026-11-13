import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PageMetadata from './PageMetadata.jsx'
import BlogStatus from './BlogStatus.jsx'
import { getSupabaseClient, isSupabaseConfigured } from '../lib/supabaseClient.js'

export default function AdminDashboardPage() {
  const navigate = useNavigate()
  const [stats, setStats] = useState({ total: 0, published: 0, draft: 0, recent: 0 })
  const [loading, setLoading] = useState(Boolean(isSupabaseConfigured))
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isSupabaseConfigured) {
      return
    }

    let cancelled = false

    async function loadStats() {
      setLoading(true)
      setError('')

      const supabase = await getSupabaseClient()

      if (!supabase || cancelled) {
        setLoading(false)
        return
      }

      const { data, error: queryError } = await supabase
        .from('posts')
        .select('id, status, updated_at, published_at')
        .order('updated_at', { ascending: false })

      if (cancelled) return

      if (queryError) {
        setError(queryError.message)
        setStats({ total: 0, published: 0, draft: 0, recent: 0 })
        setLoading(false)
        return
      }

      const records = data ?? []
      const published = records.filter((post) => post.status === 'published').length
      const draft = records.filter((post) => post.status === 'draft').length
      const recent = records.filter((post) => {
        if (!post.updated_at) return false
        const updatedAt = new Date(post.updated_at).getTime()
        const now = Date.now()
        return now - updatedAt <= 1000 * 60 * 60 * 24 * 30
      }).length

      setStats({
        total: records.length,
        published,
        draft,
        recent,
      })
      setLoading(false)
    }

    loadStats()

    return () => {
      cancelled = true
    }
  }, [])

  async function handleSignOut() {
    if (!isSupabaseConfigured) {
      navigate('/admin/login', { replace: true })
      return
    }

    const supabase = await getSupabaseClient()
    if (supabase) {
      await supabase.auth.signOut()
    }

    navigate('/admin/login', { replace: true })
  }

  return (
    <>
      <PageMetadata title="Admin dashboard | Itunuoluwa Adejimi" description="Manage your blog posts and track publishing status." />
      <section className="route-page section-wrap admin-page" aria-labelledby="admin-dashboard-title">
        <div className="admin-shell">
          <header className="admin-header">
            <div>
              <p className="eyebrow">ADMIN / OVERVIEW</p>
              <h1 id="admin-dashboard-title">Dashboard.</h1>
            </div>
            <div className="admin-actions">
              <Link className="button button-primary" to="/admin/posts/new">New post</Link>
              <button className="button admin-button-secondary" type="button" onClick={handleSignOut}>Sign out</button>
            </div>
          </header>

          {!isSupabaseConfigured ? (
            <div className="admin-panel">
              <BlogStatus message="Add the Supabase project URL and anon key to enable the admin dashboard and blog management." />
            </div>
          ) : loading ? (
            <BlogStatus message="Loading dashboard statistics…" />
          ) : error ? (
            <BlogStatus message={`Dashboard statistics couldn't be loaded: ${error}`} isError />
          ) : (
            <>
              <div className="admin-grid">
                <article className="admin-stat-card">
                  <span>Total posts</span>
                  <strong>{stats.total}</strong>
                </article>
                <article className="admin-stat-card">
                  <span>Published</span>
                  <strong>{stats.published}</strong>
                </article>
                <article className="admin-stat-card">
                  <span>Drafts</span>
                  <strong>{stats.draft}</strong>
                </article>
                <article className="admin-stat-card">
                  <span>Recent updates</span>
                  <strong>{stats.recent}</strong>
                </article>
              </div>

              <div className="admin-panel admin-quick-actions">
                <div>
                  <p className="eyebrow">QUICK ACTIONS</p>
                  <h2>Keep momentum going.</h2>
                </div>
                <div className="admin-actions inline-actions">
                  <Link className="button button-primary" to="/admin/posts">Manage posts</Link>
                  <Link className="button admin-button-secondary" to="/blog">View published blog</Link>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  )
}
