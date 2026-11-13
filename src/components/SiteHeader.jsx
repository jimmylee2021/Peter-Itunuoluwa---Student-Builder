import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="site-header" onKeyDown={(event) => event.key === 'Escape' && closeMenu()}>
      <Link className="wordmark" to="/" onClick={closeMenu} aria-label="Itunuoluwa Adejimi, home">
        IA<span>.</span>
      </Link>
      <button
        className="menu-toggle"
        type="button"
        aria-expanded={menuOpen}
        aria-controls="primary-navigation"
        aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        onClick={() => setMenuOpen((isOpen) => !isOpen)}
      >
        <span />
        <span />
      </button>
      <nav
        id="primary-navigation"
        className={menuOpen ? 'site-nav is-open' : 'site-nav'}
        aria-label="Main navigation"
      >
        <NavLink to="/" end onClick={closeMenu}>Home</NavLink>
        <NavLink to="/about" onClick={closeMenu}>About</NavLink>
        <NavLink to="/projects" onClick={closeMenu}>Projects</NavLink>
        <NavLink to="/blog" onClick={closeMenu}>Blog</NavLink>
        <NavLink className="nav-contact" to="/contact" onClick={closeMenu}>
          Let's talk <span aria-hidden="true">↗</span>
        </NavLink>
      </nav>
    </header>
  )
}
