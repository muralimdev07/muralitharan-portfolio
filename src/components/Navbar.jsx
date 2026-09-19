import { useState, useEffect } from 'react';
import { personalInfo } from '../data/portfolioData';

export default function Navbar({ theme, toggleTheme, currentView = 'home', navigateTo }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      if (currentView !== 'home') return;

      const sections = ['hero', 'about', 'skills', 'certifications', 'achievements', 'experience', 'freelance', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentView]);

  const handleNavClick = (e, view, sectionId) => {
    e.preventDefault();
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    if (navigateTo) {
      navigateTo(view, sectionId);
    } else if (view === 'projects') {
      window.location.hash = '#/projects';
    } else if (view === 'achievements') {
      window.location.hash = '#/achievements';
    } else if (sectionId) {
      window.location.hash = `#${sectionId}`;
    }
  };

  return (
    <header className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="nav-container">
        {/* Brand Logo */}
        <a
          href="#hero"
          className="nav-logo"
          onClick={(e) => handleNavClick(e, 'home', 'hero')}
        >
          <span className="logo-emblem">M</span>
          <span className="logo-text">Muralitharan</span>
        </a>

        {/* Centered Navigation */}
        <nav className="nav-links-centered">
          <a
            href="#hero"
            className={`nav-link ${currentView === 'home' && activeSection === 'hero' ? 'active' : ''}`}
            onClick={(e) => handleNavClick(e, 'home', 'hero')}
          >
            Home
          </a>

          <a
            href="#about"
            className={`nav-link ${currentView === 'home' && activeSection === 'about' ? 'active' : ''}`}
            onClick={(e) => handleNavClick(e, 'home', 'about')}
          >
            About
          </a>

          {/* Skills with Horizontal Dropdown (Projects, Achievements, Certificates) */}
          <div
            className={`nav-dropdown-wrapper ${dropdownOpen ? 'is-open' : ''}`}
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <a
              href="#skills"
              className={`nav-link nav-dropdown-trigger ${
                currentView === 'projects' ||
                currentView === 'achievements' ||
                (currentView === 'home' && (activeSection === 'skills' || activeSection === 'certifications' || activeSection === 'achievements'))
                  ? 'active'
                  : ''
              }`}
              onClick={(e) => handleNavClick(e, 'home', 'skills')}
            >
              <span>Skills</span>
              <svg
                className="dropdown-chevron"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </a>

            {/* Horizontal Dropdown Menu */}
            <div className="nav-dropdown-menu">
              <a
                href="#/projects"
                className={`nav-dropdown-item ${currentView === 'projects' ? 'active-item' : ''}`}
                onClick={(e) => handleNavClick(e, 'projects')}
              >
                Projects
              </a>

              <span className="dropdown-divider-vert" aria-hidden="true" />

              <a
                href="#/achievements"
                className={`nav-dropdown-item ${currentView === 'achievements' ? 'active-item' : ''}`}
                onClick={(e) => handleNavClick(e, 'achievements')}
              >
                Achievements
              </a>

              <span className="dropdown-divider-vert" aria-hidden="true" />

              <a
                href="#certifications"
                className={`nav-dropdown-item ${currentView === 'home' && activeSection === 'certifications' ? 'active-item' : ''}`}
                onClick={(e) => handleNavClick(e, 'home', 'certifications')}
              >
                Certificates
              </a>
            </div>
          </div>

          <a
            href="#experience"
            className={`nav-link ${currentView === 'home' && activeSection === 'experience' ? 'active' : ''}`}
            onClick={(e) => handleNavClick(e, 'home', 'experience')}
          >
            Experience
          </a>

          <a
            href="#contact"
            className={`nav-link ${currentView === 'home' && activeSection === 'contact' ? 'active' : ''}`}
            onClick={(e) => handleNavClick(e, 'home', 'contact')}
          >
            Contact
          </a>
        </nav>

        {/* Right Actions: Theme Switcher & Download CV */}
        <div className="nav-actions-right">
          {/* Theme Toggle Button */}
          <button
            className="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="theme-icon sun-icon">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="theme-icon moon-icon">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            )}
          </button>

          {/* Direct Resume Download Link */}
          <a
            href="/Muthaiya_Muralitharan_Resume.pdf"
            download="Muthaiya_Muralitharan_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-cv-btn"
            title="Download Muthaiya Muralitharan Resume"
          >
            Download CV
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </a>

          {/* Mobile Drawer Hamburger */}
          <button
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu Drawer */}
        <div className={`mobile-menu ${mobileMenuOpen ? 'show' : ''}`}>
          <a
            href="#hero"
            className={`mobile-nav-link ${currentView === 'home' && activeSection === 'hero' ? 'active' : ''}`}
            onClick={(e) => handleNavClick(e, 'home', 'hero')}
          >
            Home
          </a>
          <a
            href="#about"
            className={`mobile-nav-link ${currentView === 'home' && activeSection === 'about' ? 'active' : ''}`}
            onClick={(e) => handleNavClick(e, 'home', 'about')}
          >
            About
          </a>
          <a
            href="#skills"
            className={`mobile-nav-link ${currentView === 'home' && activeSection === 'skills' ? 'active' : ''}`}
            onClick={(e) => handleNavClick(e, 'home', 'skills')}
          >
            Skills
          </a>
          <div className="mobile-dropdown-sublinks">
            <a
              href="#/projects"
              className={`mobile-sub-link ${currentView === 'projects' ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, 'projects')}
            >
              Projects
            </a>
            <a
              href="#/achievements"
              className={`mobile-sub-link ${currentView === 'achievements' ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, 'achievements')}
            >
              Achievements
            </a>
            <a
              href="#certifications"
              className={`mobile-sub-link ${currentView === 'home' && activeSection === 'certifications' ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, 'home', 'certifications')}
            >
              Certificates
            </a>
          </div>
          <a
            href="#experience"
            className={`mobile-nav-link ${currentView === 'home' && activeSection === 'experience' ? 'active' : ''}`}
            onClick={(e) => handleNavClick(e, 'home', 'experience')}
          >
            Experience
          </a>
          <a
            href="#contact"
            className={`mobile-nav-link ${currentView === 'home' && activeSection === 'contact' ? 'active' : ''}`}
            onClick={(e) => handleNavClick(e, 'home', 'contact')}
          >
            Contact
          </a>
          <a
            href="/Muthaiya_Muralitharan_Resume.pdf"
            download="Muthaiya_Muralitharan_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mobile-cta"
            onClick={() => setMobileMenuOpen(false)}
          >
            Download CV 📄
          </a>
        </div>
      </div>
    </header>
  );
}
