export default function IntroSection() {
  return (
    <section className="intro-band" id="about" aria-labelledby="about-title">
      <div className="section-wrap intro-grid">
        <p className="eyebrow section-index">01 / A SHORT INTRODUCTION</p>
        <div>
          <h2 id="about-title">Curiosity is a good place to start.</h2>
          <p className="intro-text">
            I'm learning how thoughtful technology gets made: by understanding a problem, trying
            an idea, and improving it with care. Here, I share the projects, questions, and lessons
            that are part of that process.
          </p>
          <a className="text-link" href="#exploring">
            A few things on my mind <span aria-hidden="true">↘</span>
          </a>
        </div>
        <div className="intro-note">
          <span className="note-mark">“</span>
          <p>Useful first.<br />Impressive later.</p>
          <span className="note-byline">A personal working principle</span>
        </div>
      </div>
    </section>
  )
}
