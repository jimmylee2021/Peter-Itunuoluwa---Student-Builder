import PageMetadata from './PageMetadata.jsx'
import ContactForm from './ContactForm.jsx'

export default function ContactPage() {
  return (
    <>
      <PageMetadata
        title="Contact | Itunuoluwa Adejimi"
        description="Contact information for opportunities, projects, and collaboration with Itunuoluwa Adejimi."
      />
      <section className="route-page section-wrap contact-page" aria-labelledby="contact-page-title">
        <div className="route-heading">
          <p className="eyebrow">CONTACT</p>
          <h1 id="contact-page-title">Let's start a conversation.</h1>
          <p className="route-lede">I'm interested in learning, building, and collaborating with people working on useful problems.</p>
        </div>
        <ContactForm />
      </section>
    </>
  )
}