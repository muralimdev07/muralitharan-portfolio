import { useState, useEffect, useRef } from 'react';

const milestones = [
  {
    number: '01',
    category: 'INTERNSHIP',
    title: 'Real-World Exposure',
    description:
      'Applying my technical knowledge in a professional environment and gaining practical development experience.',
  },
  {
    number: '02',
    category: 'TECHNICAL DEVELOPMENT',
    title: 'Learning by Building',
    description:
      'Strengthening my skills through hands-on development, experimentation, and building practical solutions.',
  },
  {
    number: '03',
    category: 'HACKATHONS & CHALLENGES',
    title: 'Solving Real Problems',
    description:
      'Exploring ideas, collaborating on solutions, and challenging myself through technical competitions and problem-solving.',
  },
  {
    number: '04',
    category: 'CONTINUOUS LEARNING',
    title: 'Always Improving',
    description:
      'Continuously learning new technologies and strengthening my skills through hands-on practice and experimentation.',
  },
];

export default function Experience({ onNavigate }) {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const milestoneRefs = useRef([]);
  const [activeIndices, setActiveIndices] = useState(new Set([0]));
  const [currentActive, setCurrentActive] = useState(0);
  const [lineProgress, setLineProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!sectionRef.current || !timelineRef.current) {
            ticking = false;
            return;
          }

          const sectionRect = sectionRef.current.getBoundingClientRect();
          const timelineRect = timelineRef.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;

          // Calculate how far the center of the viewport has progressed through the timeline
          const triggerPoint = windowHeight * 0.6;
          const timelineTop = timelineRect.top;
          const timelineHeight = timelineRect.height;

          if (timelineHeight > 0) {
            const rawProgress = ((triggerPoint - timelineTop) / timelineHeight) * 100;
            const clamped = Math.max(0, Math.min(100, rawProgress));
            setLineProgress(clamped);
          }

          // Determine which milestones are active/reached
          const newActive = new Set();
          let latestActive = 0;

          milestoneRefs.current.forEach((ref, idx) => {
            if (ref) {
              const rect = ref.getBoundingClientRect();
              // Node lights up as it reaches 65% of viewport
              if (rect.top <= windowHeight * 0.65) {
                newActive.add(idx);
                latestActive = idx;
              }
            }
          });

          setActiveIndices(newActive);
          setCurrentActive(latestActive);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="exp-timeline-section"
      aria-label="Achievements and Experience Journey"
    >
      {/* Faint ambient decorative background glow */}
      <div className="exp-ambient-glow" aria-hidden="true" />
      <div className="exp-subtle-grid-pattern" aria-hidden="true" />

      <div className="exp-max-container">
        {/* =========================================================
            1. ACHIEVEMENTS SECTION (1st image)
            ========================================================= */}
        <div id="achievements" className="exp-achievements-block">
          <div className="exp-header-wrap">
            <div className="exp-badge">
              <span className="exp-badge-dot" />
              <span>ACHIEVEMENTS</span>
            </div>

            <h2 className="exp-main-heading">Key Milestones & Achievements</h2>

            <p className="exp-main-desc">
              A journey of building real-world solutions through engineering, innovation, and hands-on experience.
            </p>
          </div>

          {/* CROWNING ACHIEVEMENT SHOWCASE BANNER */}
          <div className="exp-featured-achievement-card">
            <div className="ach-card-inner">
              <div className="ach-card-media">
                <img
                  src="/achievements/nscet_stage_handover.jpg"
                  alt="NSCET Official Website Launch"
                  className="ach-card-thumb"
                />
                <span className="ach-card-live-pill">
                  <span className="live-dot" /> LIVE STAGE LAUNCH
                </span>
              </div>

              <div className="ach-card-content">
                <div className="ach-card-tag-row">
                  <span className="ach-card-badge">★ CORE MILESTONE & RECOGNITION</span>
                  <span className="ach-card-date">09.09.2026</span>
                </div>
                <h3 className="ach-card-title">
                  NSCET Official College Website Re-Architecture
                </h3>
                <p className="ach-card-desc">
                  Re-engineered the Nadar Saraswathi College of Engineering & Technology website with a 6-member team,
                  migrating legacy PHP to React, Node.js & MySQL. Led <strong>Backend Architecture & Database Engineering</strong>.
                </p>
                <div className="ach-card-footer">
                  <div className="ach-card-stack">
                    <span>Node.js</span>
                    <span>MySQL</span>
                    <span>React</span>
                    <span>PHP Migrated</span>
                  </div>
                  {onNavigate && (
                    <button
                      type="button"
                      onClick={() => onNavigate('achievements')}
                      className="ach-card-cta-btn"
                    >
                      <span>View Achievement Story</span>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Elegant Subtle Section Divider */}
        <div className="exp-sub-divider" aria-hidden="true" />

        {/* =========================================================
            2. EXPERIENCE SECTION (2nd image)
            ========================================================= */}
        <div id="experience" className="exp-experience-block">
          <div className="exp-header-wrap exp-section-divider-header">
            <div className="exp-badge">
              <span className="exp-badge-dot" />
              <span>EXPERIENCE</span>
            </div>

            <h2 className="exp-main-heading">Work Experience & Practical Journey</h2>

            <p className="exp-main-desc">
              Applying technical knowledge in professional environments, building practical solutions, and growing through hands-on development and real-world challenges.
            </p>
          </div>

          {/* INTERACTIVE SCROLL-DRIVEN VERTICAL TIMELINE */}
          <div className="exp-timeline-wrapper" ref={timelineRef}>
            {/* Neutral background rail */}
            <div className="exp-timeline-rail" aria-hidden="true">
              {/* Active orange line that draws down as user scrolls */}
              <div
                className="exp-timeline-fill"
                style={{ height: `${lineProgress}%` }}
              />
            </div>

            {/* Alternating Zig-Zag Milestones */}
            <div className="exp-milestones-list">
              {milestones.map((item, index) => {
                const isReached = activeIndices.has(index);
                const isCurrent = currentActive === index && isReached;
                const isLeft = index % 2 === 0;

                return (
                  <div
                    key={item.number}
                    ref={(el) => (milestoneRefs.current[index] = el)}
                    className={`exp-milestone-row ${isLeft ? 'row-left' : 'row-right'} ${isReached ? 'is-reached' : 'is-unreached'
                      } ${isCurrent ? 'is-current-active' : ''}`}
                  >
                    {/* Content Container (Alternates left/right on desktop) */}
                    <div className="exp-content-side">
                      <div className="exp-content-panel">
                        {/* Milestone Header Pill & Number */}
                        <div className="exp-milestone-top">
                          <span className="exp-number-tag">{item.number}</span>
                          <span className="exp-category-pill">{item.category}</span>
                        </div>

                        {/* Title & Tagline */}
                        <h3 className="exp-milestone-title">
                          &ldquo;{item.title}&rdquo;
                        </h3>

                        {/* Primary Description */}
                        <p className="exp-milestone-desc">{item.description}</p>
                      </div>
                    </div>

                    {/* Center Node on the Timeline */}
                    <div className="exp-node-side" aria-hidden="true">
                      <div className={`exp-timeline-node ${isReached ? 'node-active' : 'node-idle'}`}>
                        <div className="node-inner-core" />
                        {isCurrent && <div className="node-live-pulse" />}
                      </div>
                    </div>

                    {/* Empty Spacer Side for Desktop Zig-Zag Alignment */}
                    <div className="exp-spacer-side" aria-hidden="true" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
