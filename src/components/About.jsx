import { useState, useEffect, useRef } from 'react';
import heroMuraliImage from '../assets/hero_murali_solid.png';
import { personalInfo } from '../data/portfolioData';

export default function About() {
  const sectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Dynamic Scroll Listener: Extends the cord down as the user scrolls into the About section
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!sectionRef.current) return;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!sectionRef.current) return;
          const rect = sectionRef.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;

          // When top of About enters the lower viewport (windowHeight * 0.95)
          // down to when it is comfortably in view (windowHeight * 0.3)
          const startPoint = windowHeight * 0.95;
          const endPoint = windowHeight * 0.3;

          const rawProgress = (startPoint - rect.top) / (startPoint - endPoint);
          const clamped = Math.min(1, Math.max(0, rawProgress));
          setScrollProgress(clamped);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial position calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sequenced Two-Phase Scroll Animation:
  // Phase 1 (0.0 -> 0.5): ONLY the line extends down from the stats card
  const lineProgress = Math.min(1, Math.max(0, scrollProgress / 0.5));
  const cordHeight = Math.max(4, lineProgress * 52);

  // Phase 2 (0.5 -> 1.0): ONLY after the line is fully down, the image/card reveals and drops into place
  const cardProgress = Math.min(1, Math.max(0, (scrollProgress - 0.5) / 0.5));
  const cardOpacity = cardProgress;
  const cardTranslateY = (1 - cardProgress) * -35;
  const cardScale = 0.88 + cardProgress * 0.12;
  const cardTilt = -cardProgress * 4.5;
  const cardPointerEvents = cardProgress > 0.2 ? 'auto' : 'none';

  return (
    <section id="about" ref={sectionRef} className="reference-about-section">
      {/* Subtle Tech Corner Markers (Replaced Gemini stars with clean developer crosshair & tags) */}
      <div className="about-tech-corner corner-top-right" aria-hidden="true">
        <span className="corner-cross">+</span>
        <span className="corner-tag">// ABOUT_PROFILE</span>
      </div>
      <div className="about-tech-corner corner-bottom-left" aria-hidden="true">
        <span className="corner-tag">DEV_ENGINE // v3.2</span>
        <span className="corner-cross">+</span>
      </div>

      {/* Main Container */}
      <div className="reference-about-container">
        {/* Content Columns (Left: Dynamic Hanging Card | Right: Hello + Description + Tech Badges) */}
        <div className="reference-about-layout">
          {/* ========================================================
              LEFT COLUMN: SCROLL-EXTENDING HANGING BADGE CARD
              ======================================================== */}
          <div className="hanging-card-wrapper">
            {/* Hanging Cord & Top Latch Mount (Connected directly to Hero stats card) */}
            <div className="hanging-mount" aria-hidden="true">
              {/* Anchor connecting directly to the bottom of the Hero stats card above */}
              <div className="cord-stats-anchor" title="Anchored to Hero Stats Card">
                <span className="anchor-rivet" />
              </div>

              <div
                className="hanging-cord"
                style={{ height: `${cordHeight}px` }}
              />
              <div className="hanging-clip">
                <span className="clip-rivet" />
              </div>
            </div>

            {/* The Framed Portrait Card (Reveals and drops ONLY after the line is fully down) */}
            <div
              className="hanging-card-motion"
              style={{
                transform: `translateY(${cardTranslateY}px) scale(${cardScale})`,
                opacity: cardOpacity,
                pointerEvents: cardPointerEvents,
              }}
            >
              <div
                className="hanging-portrait-card"
                style={{
                  transform: `rotate(${cardTilt}deg)`,
                }}
              >
                {/* Decorative 3-Spark Ticks (Placed directly at upper-right corner of black frame) */}
                <div className="about-portrait-doodle" aria-hidden="true">
                  <svg
                    width="44"
                    height="44"
                    viewBox="0 0 44 44"
                    fill="none"
                    className="about-portrait-doodle-svg"
                  >
                    {/* 3 Radiating Orange Accent Lines Originating Cleanly from Corner */}
                    <g className="doodle-spark-group">
                      {/* Line 1: Slanted Upward */}
                      <path d="M12 24L8 6" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
                      {/* Line 2: Diagonal Up-Right */}
                      <path d="M22 22L36 8" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
                      {/* Line 3: Diagonal Down-Right */}
                      <path d="M26 30L40 38" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
                    </g>
                  </svg>
                </div>

                <div className="card-inner-backdrop">
                  <img
                    src={heroMuraliImage}
                    alt="Muralitharan M - Full Stack Developer"
                    className="hanging-card-photo"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="reference-about-content">
            {/* Professional About Me Heading Block */}
            <div className="about-title-block">
              <div className="about-eyebrow-pill">
                <span className="about-pill-dot" />
                <span className="about-pill-text">PROFILE OVERVIEW</span>
              </div>
              <h2 className="reference-about-title">
                About <span className="title-orange-accent">Me</span>
              </h2>
            </div>

            {/* Identity Bio Paragraphs */}
            <div className="reference-bio-block">
              {/* Desktop Bio */}
              <div className="bio-desktop-version">
                <p className="reference-bio-text">
                  I’m <strong>Muralitharan M</strong>, a Computer Science student and Full Stack Developer who enjoys turning ideas into practical digital solutions.
                </p>
                <p className="reference-bio-text">
                  I work with <strong>Python</strong>, <strong>React</strong>, <strong>MERN Stack</strong>, <strong>Spring Boot</strong>, and <strong>FastAPI</strong>, while continuously exploring AI and modern web technologies. I’m focused on building clean, scalable, and user-friendly applications that solve real-world problems.
                </p>
              </div>

              {/* Mobile Bio */}
              <div className="bio-mobile-version">
                <p className="reference-bio-text">
                  I’m <strong>Muralitharan M</strong>, a Computer Science student passionate about building real-world digital solutions.
                </p>
                <p className="reference-bio-text">
                  I work with <strong className="bio-highlight-orange">Python</strong>, <strong className="bio-highlight-orange">React</strong>, <strong className="bio-highlight-orange">MERN Stack</strong>, <strong className="bio-highlight-orange">Spring Boot</strong>, and <strong className="bio-highlight-orange">FastAPI</strong>, while exploring <strong className="bio-highlight-orange">AI</strong> and modern web technologies.
                </p>
                <p className="reference-bio-text">
                  I focus on building clean, scalable, and user-friendly applications that solve real-world problems.
                </p>
              </div>
            </div>

            {/* Professional Value Pillars Cards */}
            <div className="about-pillars-grid">
              <div className="about-pillar-card">
                <div className="pillar-icon-wrapper">
                  <span className="pillar-icon-dots" aria-hidden="true" />
                  <div className="pillar-icon-circle">
                    <svg width="34" height="34" viewBox="0 0 36 36" fill="none">
                      <path
                        d="M12 18C10 17 9 14.5 9.5 12C10 9 12 7.5 14.5 8C15.2 6 17.5 4.5 20 5C22.5 5.5 24 7.5 24 9.5C26 10 27.5 12 27 14.5C26.5 17 24.5 18 23 18"
                        stroke="#1c162b"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="#ff7a18"
                      />
                      <path
                        d="M14 11C15 13 17 14 18 14M21 10C21.5 12 20.5 13.5 19.5 14"
                        stroke="#1c162b"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                      <path
                        d="M13.5 20H22.5L21.5 24H14.5L13.5 20Z"
                        fill="#ff9838"
                        stroke="#1c162b"
                        strokeWidth="1.8"
                        strokeLinejoin="round"
                      />
                      <path d="M15 27H21" stroke="#1c162b" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
                <h3 className="pillar-title">Problem Solver</h3>
                <p className="pillar-desc">Breaking down complex problems and turning them into efficient, practical solutions.</p>
                <div className="pillar-bottom-bar" aria-hidden="true" />
              </div>

              <div className="about-pillar-card">
                <div className="pillar-icon-wrapper">
                  <span className="pillar-icon-dots" aria-hidden="true" />
                  <div className="pillar-icon-circle">
                    <svg width="34" height="34" viewBox="0 0 36 36" fill="none">
                      <line x1="18" y1="5" x2="18" y2="9" stroke="#1c162b" strokeWidth="2" strokeLinecap="round" />
                      <circle cx="18" cy="4" r="2.2" fill="#ff7a18" stroke="#1c162b" strokeWidth="1.8" />
                      <rect x="7" y="13" width="3.2" height="6" rx="1.6" fill="#ff7a18" stroke="#1c162b" strokeWidth="1.8" />
                      <rect x="25.8" y="13" width="3.2" height="6" rx="1.6" fill="#ff7a18" stroke="#1c162b" strokeWidth="1.8" />
                      <rect x="9.5" y="9" width="17" height="14" rx="4" fill="#ffffff" stroke="#1c162b" strokeWidth="2" />
                      <circle cx="14" cy="15" r="1.6" fill="#1c162b" />
                      <circle cx="22" cy="15" r="1.6" fill="#1c162b" />
                      <path d="M15.5 18.5C16.5 19.8 19.5 19.8 20.5 18.5" stroke="#1c162b" strokeWidth="1.6" strokeLinecap="round" />
                      <path d="M14 23H22L20 26H16L14 23Z" fill="#ff7a18" stroke="#1c162b" strokeWidth="1.8" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
                <h3 className="pillar-title">AI & Innovation</h3>
                <p className="pillar-desc">Exploring AI to build smarter, automated solutions that create real impact.</p>
                <div className="pillar-bottom-bar" aria-hidden="true" />
              </div>

              <div className="about-pillar-card">
                <div className="pillar-icon-wrapper">
                  <span className="pillar-icon-dots" aria-hidden="true" />
                  <div className="pillar-icon-circle">
                    <svg width="34" height="34" viewBox="0 0 36 36" fill="none">
                      <rect x="7" y="8" width="22" height="19" rx="3.5" fill="#ffffff" stroke="#1c162b" strokeWidth="2" />
                      <path d="M7 11.5C7 9.57 8.57 8 10.5 8H25.5C27.43 8 29 9.57 29 11.5V13.5H7V11.5Z" fill="#ff7a18" stroke="#1c162b" strokeWidth="1.8" />
                      <circle cx="10.5" cy="10.7" r="0.9" fill="#1c162b" />
                      <circle cx="13" cy="10.7" r="0.9" fill="#1c162b" />
                      <circle cx="15.5" cy="10.7" r="0.9" fill="#1c162b" />
                      <path d="M13.5 18.5L11 20.5L13.5 22.5" stroke="#1c162b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      <line x1="16.5" y1="23" x2="18.5" y2="17.5" stroke="#1c162b" strokeWidth="1.8" strokeLinecap="round" />
                      <path d="M21.5 18.5L24 20.5L21.5 22.5" stroke="#1c162b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
                <h3 className="pillar-title">Web Development</h3>
                <p className="pillar-desc">Creating modern and responsive web applications with great user experience.</p>
                <div className="pillar-bottom-bar" aria-hidden="true" />
              </div>

              <div className="about-pillar-card">
                <div className="pillar-icon-wrapper">
                  <span className="pillar-icon-dots" aria-hidden="true" />
                  <div className="pillar-icon-circle">
                    <svg width="34" height="34" viewBox="0 0 36 36" fill="none">
                      <path d="M12 16.5V20.5C12 22.8 14.7 24.5 18 24.5C21.3 24.5 24 22.8 24 20.5V16.5" fill="#ff7a18" stroke="#1c162b" strokeWidth="1.8" strokeLinejoin="round" />
                      <polygon points="18,9 30,14.5 18,20 6,14.5" fill="#ff7a18" stroke="#1c162b" strokeWidth="2" strokeLinejoin="round" />
                      <circle cx="18" cy="14.5" r="1.3" fill="#1c162b" />
                      <path d="M18 14.5 C22 15.5, 25 17.5, 25 21.5" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
                      <circle cx="25" cy="22.2" r="1.2" fill="#ff7a18" stroke="#1c162b" strokeWidth="1.2" />
                    </svg>
                  </div>
                </div>
                <h3 className="pillar-title">Continuous Learner</h3>
                <p className="pillar-desc">Continuously learning new tools and technologies to stay adaptable and future-ready.</p>
                <div className="pillar-bottom-bar" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          SMOOTH CURVED ARCH BOTTOM (Matching User Reference)
          ======================================================== */}
      <div className="reference-bottom-wave" aria-hidden="true">
        <svg
          className="bottom-wave-svg"
          viewBox="0 0 1440 90"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 C360,78 1080,78 1440,0 L1440,90 L0,90 Z"
            fill="var(--bg-dark)"
          />
        </svg>
      </div>
    </section>
  );
}
