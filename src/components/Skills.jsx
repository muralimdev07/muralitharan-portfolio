import { useEffect, useRef, useState } from 'react';

const skillCategories = [
  {
    id: '01',
    numTag: 'CLIENT_UI',
    title: 'Frontend',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    skills: [
      { name: 'HTML', color: '#E34F26', textLight: '#c93b14' },
      { name: 'CSS', color: '#1572B6', textLight: '#1572B6' },
      { name: 'JavaScript', color: '#F7DF1E', textLight: '#a16207', textDark: '#F7DF1E' },
      { name: 'React', color: '#00D8FE', textLight: '#0284c7', textDark: '#38bdf8' },
    ],
  },
  {
    id: '02',
    numTag: 'SERVER_RUNTIME',
    title: 'Backend',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
        <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
        <line x1="6" y1="6" x2="6.01" y2="6" strokeWidth="2.5" />
        <line x1="6" y1="18" x2="6.01" y2="18" strokeWidth="2.5" />
      </svg>
    ),
    skills: [
      { name: 'Node.js', color: '#5FA04E', textLight: '#468337' },
      { name: 'Express.js', color: '#64748b', textLight: '#334155', textDark: '#e2e8f0' },
      { name: 'Python', color: '#3776AB', textLight: '#2b5b84' },
      { name: 'FastAPI', color: '#009688', textLight: '#00796b' },
      { name: 'Spring Boot', color: '#6DB33F', textLight: '#55942f' },
    ],
  },
  {
    id: '03',
    numTag: 'DATA_PERSISTENCE',
    title: 'Database',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
    skills: [
      { name: 'MongoDB', color: '#47A248', textLight: '#388339' },
      { name: 'MySQL', color: '#4479A1', textLight: '#005a84' },
    ],
  },
  {
    id: '04',
    numTag: 'WORKFLOW_AI',
    title: 'Tools & AI',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <rect x="9" y="9" width="6" height="6" />
        <line x1="9" y1="1" x2="9" y2="4" />
        <line x1="15" y1="1" x2="15" y2="4" />
        <line x1="9" y1="20" x2="9" y2="23" />
        <line x1="15" y1="20" x2="15" y2="23" />
        <line x1="20" y1="9" x2="23" y2="9" />
        <line x1="20" y1="14" x2="23" y2="14" />
        <line x1="1" y1="9" x2="4" y2="9" />
        <line x1="1" y1="14" x2="4" y2="14" />
      </svg>
    ),
    skills: [
      { name: 'Git', color: '#F05032', textLight: '#d43a1d' },
      { name: 'GitHub', color: '#8957e5', textLight: '#6e5494', textDark: '#a371f7' },
      { name: 'REST APIs', color: '#0284c7', textLight: '#0369a1' },
      { name: 'AI Technologies', color: '#8b5cf6', textLight: '#7c3aed' },
    ],
  },
];

export default function Skills() {
  const sectionRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect(); // once: true
        }
      },
      {
        threshold: 0.2, // Trigger when ~20% of section enters viewport
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleScrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className={`skills-section ${isInView ? 'is-in-view' : ''}`}
    >
      {/* Subtle Visual Transition Connector from About Me into Skills */}
      <div className="skills-scroll-connector" aria-hidden="true">
        <div className="connector-stem-line" />
        <span className="connector-dot" />
        <div className="connector-dotted-path" />
      </div>

      {/* Subtle Technical Corner Markers */}
      <div className="skills-tech-corner corner-top-right" aria-hidden="true">
        <span className="corner-cross">+</span>
        <span className="corner-tag">// STACK_REGISTRY</span>
      </div>
      <div className="skills-tech-corner corner-bottom-left" aria-hidden="true">
        <span className="corner-tag">DEV_ENGINE // TECH_STACK</span>
        <span className="corner-cross">+</span>
      </div>

      <div className="skills-container skills-two-column-layout">
        {/* LEFT COLUMN: Clean Two-Column Layout Content */}
        <div className="skills-left-content">
          <span className="section-tag skills-section-tag">My Skills</span>

          <div className="skills-eyebrow-pill">
            <span className="skills-pill-dot" />
            <span className="skills-pill-text">TECH STACK</span>
          </div>

          <h2 className="skills-main-heading">
            <span className="heading-line-nowrap">Turning Ideas Into Digital</span> <br />
            <span className="title-orange-accent">Solutions</span>
          </h2>

          <p className="skills-description">
            My toolkit combines modern frontend, backend, database, and AI technologies to create scalable applications and solve real-world problems.
          </p>

          <div className="skills-cta-left">
            <button
              type="button"
              className="skills-explore-btn"
              onClick={handleScrollToProjects}
              aria-label="View My Projects"
            >
              <span className="btn-text">View My Projects</span>
              <span className="btn-arrow" aria-hidden="true">→</span>
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: 2-Column Staggered Grid (Matching Reference Image Offset) */}
        <div className="skills-right-grid">
          <div className="skills-cards-grid">
            <div className="skills-cards-col skills-col-left">
              {[skillCategories[0], skillCategories[2]].map((category) => (
                <div
                  key={category.id}
                  className={`skill-category-card skill-card-${category.id}`}
                >
                  {/* Subtle Oversized Watermark Background Number */}
                  <span className="card-watermark-num" aria-hidden="true">
                    {category.id}
                  </span>

                  {/* Top Row: Tag + Minimal Line Icon */}
                  <div className="card-top-row">
                    <div className="card-num-badge">
                      <span className="card-num-tag">{category.id} / {category.numTag}</span>
                    </div>
                    <div className="card-icon-box" aria-hidden="true">
                      {category.icon}
                    </div>
                  </div>

                  {/* Main Title & Thin Orange Accent Line */}
                  <div className="card-title-group">
                    <h3 className="card-category-title">{category.title}</h3>
                    <div className="card-accent-line" aria-hidden="true" />
                  </div>

                  {/* Technology Pills */}
                  <div className="card-pills-wrap">
                    {category.skills.map((skill, sIdx) => (
                      <span
                        key={skill.name}
                        className="skill-pill-tag"
                        style={{
                          '--pill-idx': sIdx,
                          '--brand-color': skill.color,
                          '--brand-text-light': skill.textLight || skill.color,
                          '--brand-text-dark': skill.textDark || skill.color,
                        }}
                      >
                        <span className="tag-dot" aria-hidden="true" />
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="skills-cards-col skills-col-right">
              {[skillCategories[1], skillCategories[3]].map((category) => (
                <div
                  key={category.id}
                  className={`skill-category-card skill-card-${category.id}`}
                >
                  {/* Subtle Oversized Watermark Background Number */}
                  <span className="card-watermark-num" aria-hidden="true">
                    {category.id}
                  </span>

                  {/* Top Row: Tag + Minimal Line Icon */}
                  <div className="card-top-row">
                    <div className="card-num-badge">
                      <span className="card-num-tag">{category.id} / {category.numTag}</span>
                    </div>
                    <div className="card-icon-box" aria-hidden="true">
                      {category.icon}
                    </div>
                  </div>

                  {/* Main Title & Thin Orange Accent Line */}
                  <div className="card-title-group">
                    <h3 className="card-category-title">{category.title}</h3>
                    <div className="card-accent-line" aria-hidden="true" />
                  </div>

                  {/* Technology Pills */}
                  <div className="card-pills-wrap">
                    {category.skills.map((skill, sIdx) => (
                      <span
                        key={skill.name}
                        className="skill-pill-tag"
                        style={{
                          '--pill-idx': sIdx,
                          '--brand-color': skill.color,
                          '--brand-text-light': skill.textLight || skill.color,
                          '--brand-text-dark': skill.textDark || skill.color,
                        }}
                      >
                        <span className="tag-dot" aria-hidden="true" />
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Call-to-Action Button Placed Cleanly Below the 4 Cards */}
          <div className="skills-cta-bottom">
            <button
              type="button"
              className="skills-explore-btn"
              onClick={handleScrollToProjects}
              aria-label="View My Projects"
            >
              <span className="btn-text">View My Projects</span>
              <span className="btn-arrow" aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
