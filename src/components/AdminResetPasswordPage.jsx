import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageMetadata from './PageMetadata.jsx'
import { getSupabaseClient, isSupabaseConfigured } from '../lib/supabaseClient.js'

export default function AdminResetPasswordPage() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [saving, setSaving] = useState(false)
  const [updated, setUpdated] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()

    if (password !== confirmPassword) {
      setError('The passwords do not match.')
      return
    }

    setSaving(true)
    setError('')

    try {
      const supabase = await getSupabaseClient()
      if (!supabase) {
        throw new Error('The password reset service is unavailable right now.')
      }

      const { error: updateError } = await supabase.auth.updateUser({ password })
      if (updateError) {
        throw updateError
      }

      setUpdated(true)
      setPassword('')
      setConfirmPassword('')
    } catch (updateError) {
      setError(/session/i.test(updateError.message)
        ? 'This reset link is invalid or expired. Request a new password reset email.'
        : updateError.message || 'The password could not be updated. Request a new reset email and try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <PageMetadata title="Reset admin password | Itunuoluwa Adejimi" description="Set a new password for the portfolio admin account." />
      <section className="route-page section-wrap admin-page admin-login-page" aria-labelledby="admin-reset-title">
        <div className="admin-login-layout">
          <div className="route-heading admin-intro">
            <p className="eyebrow">ADMIN / ACCOUNT RECOVERY</p>
            <h1 id="admin-reset-title">Set a new password.</h1>
            <p className="route-lede">Open this page from the password reset email, then choose a new password for your admin account.</p>
          </div>

          <div className="admin-panel admin-login-panel">
            {!isSupabaseConfigured ? (
              <p className="form-feedback is-error">Password recovery is unavailable until Supabase is configured.</p>
            ) : updated ? (
              <div className="admin-recovery-result" role="status">
                <p className="form-feedback">Your password has been updated.</p>
                <Link className="button button-primary" to="/admin/login">Return to sign in</Link>
              </div>
            ) : (
              <form className="admin-form" onSubmit={handleSubmit}>
                <label className="form-field">
                  <span>New password</span>
                  <input
                    type="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                  />
                </label>
                <label className="form-field">
                  <span>Confirm new password</span>
                  <input
                    type="password"
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    required
                  />
                </label>
                <div className="form-submit-row admin-submit-row">
                  <button className="button button-primary" type="submit" disabled={saving}>
                    {saving ? 'Updating…' : 'Update password'}
                  </button>
                  <Link className="text-link" to="/admin/login">Back to sign in</Link>
                </div>
                {error && <p className="form-feedback is-error" role="alert">{error}</p>}
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
