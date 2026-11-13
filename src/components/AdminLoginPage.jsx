import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import PageMetadata from './PageMetadata.jsx'
import { getSupabaseClient, isSupabaseConfigured } from '../lib/supabaseClient.js'

export default function AdminLoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const redirectTo = location.state?.from?.pathname || '/admin'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [resetting, setResetting] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [error, setError] = useState('')

  async function handlePasswordReset(event) {
    const formData = new FormData(event.currentTarget.form)
    const normalizedEmail = String(formData.get('email') || email).trim()

    if (!normalizedEmail) {
      setError('Enter your email address first, then choose Forgot password.')
      return
    }

    setResetting(true)
    setError('')
    setFeedback('')

    try {
      const supabase = await getSupabaseClient()
      if (!supabase) {
        throw new Error('The password reset service is unavailable right now.')
      }

      const { error: resetError } = await supabase.auth.resetPasswordForEmail(normalizedEmail, {
        redirectTo: `${window.location.origin}/admin/reset-password`,
      })

      if (resetError) {
        throw resetError
      }

      setFeedback('If an account matches that email, a password reset link is on its way.')
    } catch (resetError) {
      setError(resetError.message || 'The password reset email could not be sent.')
    } finally {
      setResetting(false)
    }
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const submittedEmail = String(formData.get('email') || email).trim()
    const submittedPassword = String(formData.get('password') || password)

    if (!isSupabaseConfigured) {
      setError('Add your Supabase URL and anon key to enable secure admin sign-in.')
      return
    }

    if (!submittedEmail || !submittedPassword) {
      setError('Enter your email and password to sign in.')
      return
    }

    setLoading(true)
    setFeedback('')
    setError('')

    try {
      const supabase = await getSupabaseClient()

      if (!supabase) {
        setError('The admin sign-in service is unavailable right now.')
        return
      }

      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: submittedEmail,
        password: submittedPassword,
      })

      if (signInError) {
        setError(signInError.message === 'Invalid login credentials'
          ? 'Supabase rejected these credentials. Confirm the email matches the Auth user and use the new password from your latest reset.'
          : signInError.message)
        return
      }

      const { data: adminRecord, error: adminError } = await supabase
        .from('admin_users')
        .select('user_id')
        .eq('user_id', data.user.id)
        .maybeSingle()

      if (adminError) {
        throw adminError
      }

      if (!adminRecord) {
        await supabase.auth.signOut()
        setError('This account is not authorized to access the admin dashboard.')
        return
      }

      navigate(redirectTo, { replace: true })
    } catch (signInError) {
      setError(signInError.message || 'The admin sign-in service is unavailable right now.')
    } finally {
      setLoading(false)
    }
  }

  if (isSupabaseConfigured) {
    return (
      <>
        <PageMetadata title="Admin login | Itunuoluwa Adejimi" description="Secure access to the portfolio admin dashboard." />
        <section className="route-page section-wrap admin-page admin-login-page" aria-labelledby="admin-login-title">
          <div className="admin-login-layout">
            <div className="route-heading admin-intro">
              <p className="eyebrow">ADMIN / SIGN IN</p>
              <h1 id="admin-login-title">Private writing dashboard.</h1>
              <p className="route-lede">Use the first admin account created in Supabase Auth to manage published notes and drafts.</p>
            </div>

            <div className="admin-panel admin-login-panel">
              <form className="admin-form" onSubmit={handleSubmit}>
              <div className="admin-form-grid">
                <label className="form-field form-field-wide">
                  <span>Email</span>
                  <input
                    name="email"
                    type="email"
                    autoComplete="username"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
                    required
                  />
                  <button className="admin-recovery-link" type="button" onClick={handlePasswordReset} disabled={resetting}>
                    {resetting ? 'Sending reset email…' : 'Forgot password?'}
                  </button>
                </label>
                <label className="form-field form-field-wide">
                  <span>Password</span>
                  <input
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                </label>
              </div>
              <div className="form-submit-row admin-submit-row">
                <button className="button button-primary" type="submit" disabled={loading}>
                  {loading ? 'Signing in…' : 'Sign in'}
                </button>
                <Link className="text-link" to="/">Back to site <span aria-hidden="true">↗</span></Link>
              </div>
              {error && <p className="form-feedback is-error">{error}</p>}
              {!error && feedback && <p className="form-feedback">{feedback}</p>}
              </form>
            </div>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <PageMetadata title="Admin login | Itunuoluwa Adejimi" description="Admin access is unavailable until Supabase is configured." />
      <section className="route-page section-wrap admin-page" aria-labelledby="admin-login-disabled-title">
        <div className="route-heading admin-intro">
          <p className="eyebrow">ADMIN / SIGN IN</p>
          <h1 id="admin-login-disabled-title">Admin access is not configured yet.</h1>
          <p className="route-lede">Add the Supabase project URL and anon key to enable secure sign-in and the dashboard.</p>
        </div>
        <div className="admin-panel admin-login-panel">
          <p className="admin-note">The first admin account must be created in the Supabase Auth dashboard, not from a public signup page.</p>
          <Link className="button button-primary" to="/">Return home</Link>
        </div>
      </section>
    </>
  )
}
