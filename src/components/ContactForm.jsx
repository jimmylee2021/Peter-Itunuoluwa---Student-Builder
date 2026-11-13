import { useState } from 'react'

const contactEmail = import.meta.env.VITE_CONTACT_EMAIL?.trim()

export default function ContactForm() {
  const [feedback, setFeedback] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    if (!contactEmail) return

    const formData = new FormData(event.currentTarget)
    const name = formData.get('name').toString().trim()
    const email = formData.get('email').toString().trim()
    const subject = formData.get('subject').toString().trim()
    const message = formData.get('message').toString().trim()
    const body = `From: ${name}\nReply to: ${email}\n\n${message}`
    const draftUrl = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

    setFeedback('Your email app should open with this draft. Review it and press Send there; this site has not sent the message.')
    window.location.href = draftUrl
  }

  if (!contactEmail) {
    return (
      <div className="contact-readiness" role="status">
        <span className="readiness-mark" aria-hidden="true">↗</span>
        <div>
          <h2>The contact form needs a recipient email.</h2>
          <p>Set <code>VITE_CONTACT_EMAIL</code> in your local environment to enable the email draft form. No message is sent or stored by this site.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="contact-form-layout">
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="contact-name">Your name</label>
          <input id="contact-name" name="name" type="text" autoComplete="name" maxLength={100} required />
        </div>
        <div className="form-field">
          <label htmlFor="contact-email">Your email</label>
          <input id="contact-email" name="email" type="email" autoComplete="email" maxLength={254} required />
        </div>
        <div className="form-field form-field-wide">
          <label htmlFor="contact-subject">Subject</label>
          <input id="contact-subject" name="subject" type="text" maxLength={160} required />
        </div>
        <div className="form-field form-field-wide">
          <label htmlFor="contact-message">Message</label>
          <textarea id="contact-message" name="message" rows="7" maxLength={5000} required />
        </div>
        <div className="form-submit-row">
          <button className="button button-primary" type="submit">Open email draft <span aria-hidden="true">↗</span></button>
          <p>You'll review and send the message from your own email app.</p>
        </div>
        <p className="form-feedback" role="status" aria-live="polite">{feedback}</p>
      </form>
    </div>
  )
}