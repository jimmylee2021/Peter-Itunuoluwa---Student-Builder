import { Link } from 'react-router-dom'

export default function ContactSection() {
  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-title">
      <div className="section-wrap contact-inner">
        <p className="eyebrow section-index">05 / OPEN TO GOOD CONVERSATIONS</p>
        <h2 id="contact-title">Have a thoughtful project<br />or idea in mind?</h2>
        <p>
          I'm interested in learning, building, and working with people who care about solving useful problems.
        </p>
        <Link className="contact-note" to="/contact">See contact information <span aria-hidden="true">↗</span></Link>
      </div>
    </section>
  )
}
