import { useState, useEffect } from 'react';
import heroMuraliImage from '../assets/hero_murali_solid.png';
import { personalInfo } from '../data/portfolioData';

const roles = [
  'Problem Solver',
  'AI Enthusiast',
  'Python Developer',
  'FastAPI',
  'Full Stack Developer'
];

export default function Hero({ theme, onNavigate }) {
  const isLight = theme === 'light';

  const [roleIndex, setRoleIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  // Blinking cursor
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 500);
    return () => clearInterval(blinkInterval);
  }, []);

  // Typewriter typing and deleting logic
  useEffect(() => {
    const currentWord = roles[roleIndex];

    if (!isDeleting && subIndex === currentWord.length) {
      // Pause at complete word
      const pauseTimeout = setTimeout(() => {
        setIsDeleting(true);
      }, 1600);
      return () => clearTimeout(pauseTimeout);
    }

    if (isDeleting && subIndex === 0) {
      // Move to next word after deleting
      setIsDeleting(false);
      setRoleIndex(prev => (prev + 1) % roles.length);
      return;
    }

    const typingSpeed = isDeleting ? 40 : 85;
    const timeout = setTimeout(() => {
      setSubIndex(prev => prev + (isDeleting ? -1 : 1));
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [subIndex, isDeleting, roleIndex]);

  return (
    <section id="hero" className="hero-section">
      {/* Background Organic Blobs */}
      <div className="hero-blob hero-blob-1" />
      <div className="hero-blob hero-blob-2" />
      <div className="hero-ambient-glow" />

      <div className="hero-container">
        {/* Left Column */}
        <div className="hero-text-col">
          <h1 className="hero-main-title">
            Building Modern <span className="hero-break-desktop"><br /></span>
            <span className="title-accent">Web Experiences</span> <span className="hero-break-desktop"><br /></span>
            That Make an Impact.
          </h1>
          <div className="hero-title-accent-bar" />

          <div className="hello-pill">
            <span className="pill-dot" />
            <span className="pill-typing-text">{roles[roleIndex].substring(0, subIndex)}</span>
            <span className={`typing-cursor ${cursorVisible ? 'visible' : ''}`}>|</span>
          </div>

          <p className="hero-tagline">
            Hi, I’m Muralitharan M, a Full Stack Developer focused on building modern and scalable web applications using{' '}
            <span className="hero-highlight">Python</span>,{' '}
            <span className="hero-highlight">React</span>, and intelligent technologies.
          </p>

          {/* CTA Buttons */}
          <div className="hero-action-buttons">
            <a
              href="#/projects"
              className="btn-primary hero-cta-glow"
              onClick={(e) => {
                if (onNavigate) {
                  e.preventDefault();
                  onNavigate('projects');
                }
              }}
            >
              View My Projects
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>

            <a href="#contact" className="btn-ghost btn-hero-connect">
              Let's Connect
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </a>
          </div>

          {/* Social Links Row */}
          <div className="hero-socials-row">
            <span className="hero-socials-label">Find me on</span>
            <div className="hero-social-links">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noreferrer"
                className="hero-social-icon-btn"
                aria-label="GitHub"
                title="GitHub"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                className="hero-social-icon-btn"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.2a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28z" />
                </svg>
              </a>
              <a
                href={personalInfo.instagram}
                target="_blank"
                rel="noreferrer"
                className="hero-social-icon-btn"
                aria-label="Instagram"
                title="Instagram"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="hero-social-icon-btn"
                aria-label="Email"
                title="Email"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Developer Custom Showcase */}
        <div className="hero-centerpiece-col">
          {/* Developer Portrait Showcase */}
          <div className="developer-cutout-wrapper">
            {/* Soft Warm Orange Radial Glow & Orange-to-Cream Halo */}
            <div className="developer-ambient-aura" />

            {/* Orbit Rings with Connected Nodes & Delicate Accent Dots */}
            <div className="developer-orbit-container" aria-hidden="true">
              <svg className="developer-orbit-svg" viewBox="0 0 600 600">
                {/* Inner Orbit */}
                <circle cx="300" cy="300" r="170" fill="none" className="orbit-line-inner" />
                {/* Middle Orbit with dashed line */}
                <circle cx="300" cy="300" r="230" fill="none" className="orbit-line-middle" />
                {/* Outer Orbit */}
                <circle cx="300" cy="300" r="280" fill="none" className="orbit-line-outer" />

                {/* Delicate Mini Accent Dots */}
                <circle cx="130" cy="275" r="3" className="orbit-dot-core" />
                <circle cx="130" cy="275" r="6" className="orbit-dot-glow" />

                <circle cx="155" cy="175" r="3" className="orbit-dot-core" />
                <circle cx="155" cy="175" r="6" className="orbit-dot-glow" />

                <circle cx="475" cy="220" r="2.8" className="orbit-dot-core" />
                <circle cx="475" cy="220" r="5.5" className="orbit-dot-glow" />
              </svg>

              {/* Dot Grid Matrix Patterns (Left & Right) */}
              <div className="dot-matrix-grid dot-matrix-left">
                {[...Array(20)].map((_, i) => (
                  <span key={`dl-${i}`} className="matrix-dot" />
                ))}
              </div>
              <div className="dot-matrix-grid dot-matrix-right">
                {[...Array(20)].map((_, i) => (
                  <span key={`dr-${i}`} className="matrix-dot" />
                ))}
              </div>
            </div>

            {/* Untouched Original Developer Portrait */}
            <div className="developer-cutout-frame">
              <img
                src={heroMuraliImage}
                alt="Murali - Full Stack Developer"
                className="developer-img"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Stats Bar */}
      <div className="hero-bottom-stats-container">
        <div className="bottom-stats-glass-bar">
          <div className="stat-block">
            <div className="stat-icon-box">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
            </div>
            <div>
              <div className="stat-number">3+</div>
              <div className="stat-text-label">Years Coding</div>
            </div>
          </div>
          <div className="stat-divider" />

          <div className="stat-block">
            <div className="stat-icon-box">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
              </svg>
            </div>
            <div>
              <div className="stat-number">5+</div>
              <div className="stat-text-label">Core Technologies</div>
            </div>
          </div>
          <div className="stat-divider" />

          <div className="stat-block">
            <div className="stat-icon-box">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="7" />
                <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
              </svg>
            </div>
            <div>
              <div className="stat-number">5+</div>
              <div className="stat-text-label">Certifications</div>
            </div>
          </div>
          <div className="stat-divider" />

          <div className="stat-block">
            <div className="stat-icon-box">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </div>
            <div>
              <div className="stat-number">100%</div>
              <div className="stat-text-label">Passion</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
