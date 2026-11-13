export default function HeroSection() {
  return (
    <section className="hero section-wrap" id="home" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow"><span className="status-dot" />Computer Science student · Frontend developer</p>
        <h1 id="hero-title">I build, learn, and explore <span>technology</span> through practical projects.</h1>
        <p className="hero-intro">
          I'm Itunuoluwa, a Computer Science student interested in useful digital experiences,
          real-world problems, and the ideas that sit between technology and people.
        </p>
        <div className="hero-actions">
          <a className="button button-primary" href="#projects">
            View my work <span aria-hidden="true">↗</span>
          </a>
          <a className="text-link" href="#writing">
            Read the blog <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
      <div className="hero-art" aria-hidden="true">
        <div className="art-topline"><span>FIELD NOTES</span><span>NO. 001</span></div>
        <div className="art-orbit orbit-one" />
        <div className="art-orbit orbit-two" />
        <div className="art-sun">IA</div>
        <p className="art-caption">STUDENT<br />BUILDER<br />ENTREPRENEUR</p>
        <span className="art-coordinate">IDEAS → INTERFACES</span>
      </div>
      <a className="scroll-cue" href="#about">
        <span className="scroll-line" />A little about me
      </a>
    </section>
  )
}
