import { Link } from 'react-router-dom'

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="section-wrap footer-inner">
        <Link className="wordmark footer-wordmark" to="/">IA<span>.</span></Link>
        <p>Student. Builder. Always learning.</p>
        <nav aria-label="Footer navigation">
          <Link to="/about">About</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/contact">Contact</Link>
        </nav>
        <span className="copyright">© {new Date().getFullYear()} Itunuoluwa Adejimi</span>
      </div>
    </footer>
  )
}
