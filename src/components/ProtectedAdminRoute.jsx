import { useEffect, useState } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { getSupabaseClient, isSupabaseConfigured } from '../lib/supabaseClient.js'

export default function ProtectedAdminRoute({ children }) {
  const location = useLocation()
  const [access, setAccess] = useState(isSupabaseConfigured ? 'checking' : 'signed-out')
  const [error, setError] = useState('')
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    let cancelled = false

    async function checkSession() {
      if (!isSupabaseConfigured) {
        return
      }

      setAccess('checking')
      setError('')

      try {
        const supabase = await getSupabaseClient()
        if (!supabase) {
          throw new Error('The Supabase client could not be initialized.')
        }

        const { data: { session } = {}, error: sessionError } = await supabase.auth.getSession()

        if (sessionError) {
          throw sessionError
        }

        if (cancelled) return
        if (!session) {
          setAccess('signed-out')
          return
        }

        const { data: adminRecord, error: adminError } = await supabase
          .from('admin_users')
          .select('user_id')
          .eq('user_id', session.user.id)
          .maybeSingle()

        if (adminError) {
          throw adminError
        }

        if (!cancelled) {
          setAccess(adminRecord ? 'authorized' : 'unauthorized')
        }
      } catch (checkError) {
        if (!cancelled) {
          setError(checkError.message || 'The admin session could not be verified.')
          setAccess('error')
        }
      }
    }

    checkSession()

    return () => {
      cancelled = true
    }
  }, [retryCount])

  if (!isSupabaseConfigured) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />
  }

  if (access === 'checking') {
    return (
      <section className="route-page section-wrap" aria-live="polite">
        <div className="blog-status">
          <span className="empty-writing-mark" aria-hidden="true">✳</span>
          <p>Checking your session…</p>
        </div>
      </section>
    )
  }

  if (access === 'error') {
    return (
      <section className="route-page section-wrap not-found" aria-labelledby="admin-check-error-title">
        <p className="eyebrow">ADMIN / CONNECTION ISSUE</p>
        <h1 id="admin-check-error-title">We couldn't verify admin access.</h1>
        <p className="route-lede">{error}</p>
        <div className="admin-actions">
          <button className="button button-primary" type="button" onClick={() => setRetryCount((count) => count + 1)}>Try again</button>
          <Link className="text-link" to="/admin/login" state={{ from: location }}>Return to sign in</Link>
        </div>
      </section>
    )
  }

  if (access === 'signed-out') {
    return <Navigate to="/admin/login" replace state={{ from: location }} />
  }

  if (access === 'unauthorized') {
    return (
      <section className="route-page section-wrap not-found" aria-labelledby="admin-access-denied-title">
        <p className="eyebrow">ADMIN / ACCESS DENIED</p>
        <h1 id="admin-access-denied-title">This account is not authorized.</h1>
        <p className="route-lede">Sign in with the account explicitly added to the admin allowlist in Supabase.</p>
        <Link className="text-link" to="/">Return to the public site <span aria-hidden="true">↗</span></Link>
      </section>
    )
  }

  return children
}
