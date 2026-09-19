import { useState, useEffect, useRef } from 'react';

const processSteps = [
  {
    id: '01',
    number: '01',
    title: 'Research',
    description:
      'I start by understanding goals, user requirements, and technical constraints to lay a rock-solid foundation for the project.',
  },
  {
    id: '02',
    number: '02',
    title: 'Design',
    description:
      'Crafting intuitive user experiences, scalable architecture, clean wireframes, and design systems tailored to users.',
  },
  {
    id: '03',
    number: '03',
    title: 'Develop',
    description:
      'Building scalable backends and responsive frontends using modern tech stacks, clean code, and best practices.',
  },
  {
    id: '04',
    number: '04',
    title: 'Deploy',
    description:
      'Rigorous testing, performance optimization, and seamless deployment to cloud infrastructure, followed by ongoing support.',
    note: 'Built to Deliver → ⭐',
  },
];

export default function Process() {
  const sectionRef = useRef(null);
  const flowTrackRef = useRef(null);
  const [drawProgress, setDrawProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  // Dynamic Scroll Progress & Synchronized Line Touch Activation
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!flowTrackRef.current) return;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!flowTrackRef.current) return;
          const cards = flowTrackRef.current.querySelectorAll('.process-step-card');
          if (!cards || cards.length < 4) return;

          const windowHeight = window.innerHeight;
          // Activation trigger line: comfortable reading zone (around 66% of viewport height)
          const triggerPoint = windowHeight * 0.66;

          const rect1 = cards[0].getBoundingClientRect();
          const rect2 = cards[1].getBoundingClientRect();
          const rect3 = cards[2].getBoundingClientRect();
          const rect4 = cards[3].getBoundingClientRect();

          // A card activates when its top area reaches the reading trigger line
          const isCard1Passed = (rect1.top + 30) <= triggerPoint;
          const isCard2Passed = (rect2.top + 30) <= triggerPoint;
          const isCard3Passed = (rect3.top + 30) <= triggerPoint;
          const isCard4Passed = (rect4.top + 30) <= triggerPoint;

          // Sequential step activation based on user scroll
          let step = 0;
          if (isCard4Passed) {
            step = 4;
          } else if (isCard3Passed) {
            step = 3;
          } else if (isCard2Passed) {
            step = 2;
          } else if (isCard1Passed) {
            step = 1;
          } else {
            step = 0;
          }
          setActiveStep(step);

          // Line drawing progress from Card 01 to Card 04
          if (!isCard1Passed) {
            setDrawProgress(0);
          } else {
            const totalTravel = rect4.top - rect1.top;
            const currentTravel = triggerPoint - (rect1.top + 30);
            const draw = totalTravel > 0 ? Math.min(1, Math.max(0, currentTravel / totalTravel)) : 0;
            setDrawProgress(draw);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleIndicatorClick = (idx) => {
    setActiveStep(idx + 1);
    const card = flowTrackRef.current?.querySelectorAll('.process-step-card')[idx];
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section id="process" ref={sectionRef} className="process-section">
      {/* Subtle Technical Corner Markers */}
      <div className="process-tech-corner corner-top-right" aria-hidden="true">
        <span className="corner-cross">+</span>
        <span className="corner-tag">// PROCESS_WORKFLOW</span>
      </div>

      <div className="process-container">
        {/* LEFT COLUMN: Header & Narrative */}
        <div className="process-left-content">
          <div className="process-eyebrow-pill">
            <span className="process-pill-dot" />
            <span className="process-pill-text">MY PROCESS</span>
          </div>

          <h2 className="process-main-heading">
            From Ideas to <br />
            <span className="title-orange-accent">Real-World Solutions</span>
          </h2>

          <div className="process-narrative-block">
            <p className="process-description">
              I believe good applications are built through a clear process, not just good code. I start by understanding the problem, exploring the right approach, and shaping ideas into meaningful solutions.
            </p>

            <p className="process-description">
              I then move through design, development, testing, and deployment with a focus on clean implementation, scalability, performance, and a smooth user experience.
            </p>
          </div>

          {/* Mini Interactive Step Indicators */}
          <div className="process-step-indicators" aria-label="Process Step Indicators">
            {processSteps.map((step, idx) => (
              <button
                key={step.id}
                type="button"
                className={`process-indicator-dot ${activeStep >= idx + 1 ? 'is-active' : ''}`}
                onClick={() => handleIndicatorClick(idx)}
                aria-label={`Jump to step ${step.number}: ${step.title}`}
              >
                <span className="indicator-num">{step.number}</span>
                <span className="indicator-label">{step.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT AREA: Flow track with Animated Connecting Curve and Cards */}
        <div ref={flowTrackRef} className="process-flow-track">
          {/* SVG Animated Connector Path */}
          <svg
            className="process-connector-svg"
            viewBox="0 0 760 900"
            fill="none"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {/* Base Background Track (dashed) - Starts directly at Card 01 */}
            <path
              d="M 500 150 C 400 160, 320 200, 280 270 C 240 335, 260 420, 340 455 C 400 480, 450 485, 470 510 C 490 550, 480 640, 400 680 C 340 710, 260 690, 220 720"
              className="process-path-bg"
            />
            {/* Active Drawing Line - Draws progressively from Card 01 towards Card 04 */}
            <path
              d="M 500 150 C 400 160, 320 200, 280 270 C 240 335, 260 420, 340 455 C 400 480, 450 485, 470 510 C 490 550, 480 640, 400 680 C 340 710, 260 690, 220 720"
              className="process-path-active"
              pathLength="100"
              style={{
                strokeDasharray: '100',
                strokeDashoffset: `${Math.max(0, 100 - drawProgress * 100)}`,
              }}
            />
          </svg>

          {/* The 4 Process Cards */}
          <div className="process-cards-scatter">
            {processSteps.map((step, idx) => {
              const isCardActive = activeStep >= idx + 1;
              const isCurrent = activeStep === idx + 1;

              return (
                <div
                  key={step.id}
                  className={`process-step-card step-card-${step.id} ${
                    isCardActive ? 'is-active' : 'is-inactive'
                  } ${isCurrent ? 'is-current' : ''}`}
                  onClick={() => setActiveStep(idx + 1)}
                  tabIndex={0}
                  role="button"
                  aria-pressed={isCardActive}
                >
                  {/* Hanging Hole Detail (from reference image) */}
                  <div className="card-hanging-hole">
                    <span className="hole-inner-ring" />
                  </div>

                  {/* Card Content */}
                  <div className="card-inner-body">
                    <span className="card-step-number">{step.number}</span>
                    <h3 className="card-step-title">{step.title}</h3>
                    <p className="card-step-desc">{step.description}</p>
                  </div>

                  {/* Optional playful note at end of Card 04 */}
                  {step.note && (
                    <div className="card-playful-note" aria-hidden="true">
                      <span>{step.note}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Smooth Curved Wave Divider Transition (Between Process & Certifications) */}
      <div className="process-bottom-wave-divider" aria-hidden="true">
        <svg
          className="process-wave-svg"
          viewBox="0 0 1440 90"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="processWaveStroke" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.3" />
              <stop offset="25%" stopColor="var(--accent-light)" stopOpacity="0.75" />
              <stop offset="55%" stopColor="var(--accent)" stopOpacity="0.9" />
              <stop offset="85%" stopColor="var(--accent-bright)" stopOpacity="0.7" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.35" />
            </linearGradient>

            <linearGradient id="processWaveFillDark" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(249, 115, 22, 0.08)" />
              <stop offset="100%" stopColor="rgba(8, 7, 11, 0.01)" />
            </linearGradient>

            <linearGradient id="processWaveFillLight" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(234, 88, 12, 0.08)" />
              <stop offset="100%" stopColor="rgba(252, 249, 245, 0.01)" />
            </linearGradient>

            <linearGradient id="processWaveBackdrop" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.02" />
              <stop offset="50%" stopColor="var(--accent)" stopOpacity="0.06" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {/* Layer 1: Gentle layered wave for depth and organic flow */}
          <path
            d="M0,45 C220,28 400,52 600,68 C800,82 1020,62 1200,32 C1310,16 1390,22 1440,34 L1440,90 L0,90 Z"
            fill="url(#processWaveBackdrop)"
            className="process-wave-back-fill"
          />

          {/* Layer 2: Main organic wave curve */}
          <path
            d="M0,32 C140,16 280,30 480,62 C600,80 740,80 900,66 C1080,50 1220,18 1320,18 C1370,18 1410,24 1440,32 L1440,90 L0,90 Z"
            className="process-wave-fill"
          />

          {/* Layer 3: Glowing wave contour line following exact crest and trough */}
          <path
            d="M0,32 C140,16 280,30 480,62 C600,80 740,80 900,66 C1080,50 1220,18 1320,18 C1370,18 1410,24 1440,32"
            className="process-wave-stroke"
          />
        </svg>
      </div>
    </section>
  );
}
