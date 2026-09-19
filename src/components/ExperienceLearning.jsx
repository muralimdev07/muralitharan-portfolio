import { useState, useEffect, useRef } from 'react';

const milestones = [
  {
    step: '01',
    badge: 'LEARN',
    title: 'Building My Foundation',
    description:
      'Started my journey in Computer Science and built a strong foundation in programming, web development, and software fundamentals.',
  },
  {
    step: '02',
    badge: 'PRACTICE',
    title: 'From Learning to Building',
    description:
      'Started applying my knowledge through hands-on development, exploring full-stack technologies and working with modern tools to create practical solutions.',
  },
  {
    step: '03',
    badge: 'EXPLORE',
    title: 'Expanding Into AI',
    description:
      'Continued exploring AI and intelligent technologies while learning how modern applications can become smarter, more automated, and impactful.',
  },
  {
    step: '04',
    badge: 'GROW',
    title: 'Always Learning Something New',
    description:
      'Through internships, certifications, and continuous learning, I keep expanding my technical skills and preparing for the next challenge.',
  },
];

export default function ExperienceLearning() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [timelineProgress, setTimelineProgress] = useState(0);
  const [activeMilestones, setActiveMilestones] = useState([]);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
          observer.disconnect(); // Execute once: true
        }
      },
      {
        root: null,
        rootMargin: '0px 0px -12% 0px',
        threshold: 0.15,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  // Sequential Timeline Animation when visible
  useEffect(() => {
    if (!isVisible || hasAnimated) return;

    // Staged sequence:
    // 0ms: Header reveals
    // 250ms: Milestone 01 (progress to 16%)
    // 650ms: Milestone 02 (progress to 44%)
    // 1050ms: Milestone 03 (progress to 74%)
    // 1450ms: Milestone 04 (progress to 100%)
    // 1800ms: Complete animation, lock state

    const t1 = setTimeout(() => {
      setTimelineProgress(16);
      setActiveMilestones([0]);
    }, 250);

    const t2 = setTimeout(() => {
      setTimelineProgress(44);
      setActiveMilestones([0, 1]);
    }, 650);

    const t3 = setTimeout(() => {
      setTimelineProgress(74);
      setActiveMilestones([0, 1, 2]);
    }, 1050);

    const t4 = setTimeout(() => {
      setTimelineProgress(100);
      setActiveMilestones([0, 1, 2, 3]);
    }, 1450);

    const t5 = setTimeout(() => {
      setHasAnimated(true);
    }, 1800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [isVisible, hasAnimated]);

  return (
    <section
      id="journey"
      ref={sectionRef}
      className={`journey-section ${isVisible ? 'is-visible' : ''} ${
        hasAnimated ? 'has-animated' : ''
      }`}
    >
      <div className="journey-container">
        {/* SECTION HEADER */}
        <div className="journey-header">
          <div className="journey-eyebrow-pill">
            <span className="journey-pill-dot" />
            <span className="journey-pill-text">MY JOURNEY</span>
          </div>

          <h2 className="journey-main-heading">
            Learning, Building & <span className="title-orange-accent">Growing</span>
          </h2>

          <p className="journey-description">
            My journey in technology is driven by continuous learning, hands-on experience,
            and a curiosity to explore what’s next. Every course, internship, and new
            technology has helped me turn knowledge into practical skills.
          </p>
        </div>

        {/* TIMELINE & MILESTONE CARDS */}
        <div className="journey-timeline-wrapper">
          {/* Desktop/Tablet Horizontal Line Indicator */}
          <div className="journey-track-bar" aria-hidden="true">
            <div
              className="journey-track-fill"
              style={{
                width: hasAnimated ? '100%' : `${timelineProgress}%`,
              }}
            />
          </div>

          {/* 4 Milestone Cards */}
          <div className="journey-milestones-grid">
            {milestones.map((item, idx) => {
              const isActivated = hasAnimated || activeMilestones.includes(idx);
              const isHovered = hoveredCard === idx;

              return (
                <div
                  key={item.step}
                  className={`journey-milestone-item milestone-step-${item.step} ${
                    isActivated ? 'is-active' : 'is-inactive'
                  } ${isHovered ? 'is-hovered' : ''}`}
                  onMouseEnter={() => setHoveredCard(idx)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{ '--stagger-index': idx }}
                >
                  {/* Timeline Dot & Connector Stem */}
                  <div className="journey-node-wrap" aria-hidden="true">
                    <div className="journey-node-dot">
                      <span className="node-inner-dot" />
                      <span className="node-pulse-ring" />
                    </div>
                    <div className="journey-node-stem" />
                  </div>

                  {/* Milestone Card */}
                  <div className="journey-card">
                    <div className="journey-card-top">
                      <span className="journey-card-step">{item.step}</span>
                      <span className="journey-card-badge">{item.badge}</span>
                    </div>

                    <h3 className="journey-card-title">{item.title}</h3>

                    <p className="journey-card-desc">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
