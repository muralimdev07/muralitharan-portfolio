import { useState, useEffect, useRef } from 'react';
import certOblivion from '../assets/certificates/cert_sns_oblivion.png';
import certIbmAi from '../assets/certificates/cert_ibm_ai_fundamentals.png';
import certCiscoData from '../assets/certificates/cert_cisco_data_analytics.png';
import certEibsMern from '../assets/certificates/cert_eibs_mern.png';
import certCscDca from '../assets/certificates/cert_csc_dca.png';

const certificates = [
  {
    id: 'cert-1',
    number: '01',
    title: "OBLIVION'26 (24-Hour National Hackathon)",
    issuer: 'SNS College of Technology (Dept. of CSE)',
    tag: 'Hackathon & Problem Solving',
    date: 'August 2026',
    image: certOblivion,
    staggerClass: 'stagger-pos-1',
    description: 'Certificate of Appreciation for active participation in the 24-hour national hackathon.',
  },
  {
    id: 'cert-2',
    number: '02',
    title: 'AI Fundamentals: Foundations for Understanding AI',
    issuer: 'IBM SkillsBuild',
    tag: 'Artificial Intelligence & ML',
    date: 'July 2026',
    image: certIbmAi,
    staggerClass: 'stagger-pos-2',
    description: 'Digital credential verifying foundational core competencies in AI systems and intelligent architectures.',
  },
  {
    id: 'cert-3',
    number: '03',
    title: 'Data Analytics Essentials',
    issuer: 'Cisco Networking Academy',
    tag: 'Data Analytics & Statistics',
    date: 'July 2026',
    image: certCiscoData,
    staggerClass: 'stagger-pos-3',
    description: 'Official credential verifying data transformation, exploratory analysis, and metrics engineering.',
  },
  {
    id: 'cert-4',
    number: '04',
    title: 'Internship in MERN Stack Development',
    issuer: 'Elysian Intelligence Business Solution (EIBS)',
    tag: 'Full-Stack Development',
    date: 'June 2026',
    image: certEibsMern,
    staggerClass: 'stagger-pos-4',
    description: 'Production internship developing full-stack applications with MongoDB, Express, React, and Node.js.',
  },
  {
    id: 'cert-5',
    number: '05',
    title: 'Diploma in Computer Application (DCA) - Grade A',
    issuer: 'CSC Computer Software College',
    tag: 'Computer Applications & OOP',
    date: 'September 2024',
    image: certCscDca,
    staggerClass: 'stagger-pos-5',
    description: 'Comprehensive diploma with Grade A covering C, C++ OOP, and system fundamentals.',
  },
];

// Clean 5 certificates (01 to 05), no repeat cards
const displayCertificates = certificates.map((cert, itemIdx) => ({
  ...cert,
  instanceKey: cert.id,
  originalIndex: itemIdx,
}));

export default function Certifications() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [lightboxCert, setLightboxCert] = useState(null);
  const [manualOffset, setManualOffset] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (containerRef.current && trackRef.current) {
            const container = containerRef.current;
            const rect = container.getBoundingClientRect();
            const totalScroll = rect.height - window.innerHeight;

            if (totalScroll > 0) {
              const scrolled = -rect.top;
              const progress = Math.min(Math.max(scrolled / totalScroll, 0), 1);
              setScrollProgress(progress);
            }
          }
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

  // Lightbox keyboard ESC lock
  useEffect(() => {
    if (lightboxCert) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setLightboxCert(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxCert]);

  // Compute horizontal scroll movement for the cards track
  // Slides smoothly from Card 01 to Card 05 as user scrolls, stops cleanly at Card 05, then scrolls down to Experience
  const effectiveProgress = Math.min(Math.max((scrollProgress - 0.04) / 0.90, 0), 1);
  const activeCardIndex = Math.min(
    Math.floor(effectiveProgress * displayCertificates.length),
    displayCertificates.length - 1
  );

  const getTrackTranslate = () => {
    if (!trackRef.current) return 0;
    const cards = trackRef.current.children;
    if (!cards || cards.length === 0) return 0;

    const firstCard = cards[0];
    const lastCard = cards[cards.length - 1];
    const viewportWidth = trackRef.current.parentElement
      ? trackRef.current.parentElement.clientWidth
      : 800;

    // Distance between first card and last card
    const cardStepDistance = lastCard.offsetLeft - firstCard.offsetLeft;
    const maxTrackTravel = Math.max(cardStepDistance, trackRef.current.scrollWidth - viewportWidth + 60);

    return -(effectiveProgress * maxTrackTravel);
  };

  const scrollToCard = (index) => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const containerTop = window.scrollY + rect.top;
    const totalScroll = container.offsetHeight - window.innerHeight;
    if (totalScroll <= 0) return;

    const targetEffectiveProgress = index / (displayCertificates.length - 1);
    const targetScrollProgress = 0.04 + targetEffectiveProgress * 0.90;
    const targetScrollY = containerTop + targetScrollProgress * totalScroll;

    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth',
    });
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    const prevIdx = Math.max(activeCardIndex - 1, 0);
    scrollToCard(prevIdx);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    const nextIdx = Math.min(activeCardIndex + 1, displayCertificates.length - 1);
    scrollToCard(nextIdx);
  };

  return (
    <>
      <section
        id="certifications"
        ref={containerRef}
        className="cert-editorial-section"
        aria-label="Certifications Editorial Showcase"
      >
        <div className="cert-editorial-sticky-stage">
          {/* LEFT PINNED TYPOGRAPHY (EDITORIAL FASHION POSTER STYLE) */}
          <div className="cert-editorial-left">
            <div className="cert-editorial-pill">
              <span className="pill-dot" />
              <span>CERTIFICATIONS</span>
            </div>

            <h2 className="cert-editorial-headline">
              CERTIFICATIONS
              <span className="headline-second-line">
                <span className="headline-amp">&amp;</span> LEARNING
              </span>
            </h2>

            <p className="cert-editorial-sub">
              A curated collection of certifications that reflects my continuous learning and hands-on growth across Full-Stack Development, AI, and modern technologies.
            </p>

            <div className="cert-editorial-bottom">
              <div className="cert-nav-actions-row">
                <span className="cert-scroll-cue-text">
                  <span className="cue-arrow">→</span> SCROLL TO SURF
                </span>

                <div className="cert-nav-arrows-group">
                  <button
                    type="button"
                    className="cert-arrow-btn"
                    onClick={handlePrev}
                    title="Slide Previous"
                    aria-label="Previous Certificate"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    className="cert-arrow-btn"
                    onClick={handleNext}
                    title="Slide Next"
                    aria-label="Next Certificate"
                  >
                    →
                  </button>
                </div>
              </div>

              <div className="cert-progress-rail">
                <div
                  className="cert-progress-fill-line"
                  style={{ width: `${Math.max(effectiveProgress * 100, 10)}%` }}
                />
              </div>

              <div className="cert-loop-status-tag">
                <span className="loop-pulse-dot" />
                <span>CREDENTIAL {displayCertificates[activeCardIndex]?.number || '01'} OF 05</span>
              </div>
            </div>
          </div>

          {/* RIGHT STAGGERED OVERLAPPING CARDS TRACK */}
          <div className="cert-editorial-right-viewport">
            <div
              ref={trackRef}
              className="cert-overlapping-track"
              style={{
                transform: `translate3d(${getTrackTranslate()}px, 0, 0)`,
              }}
            >
              {displayCertificates.map((cert, index) => {
                const isHovered = hoveredCard === index;
                const isActive = activeCardIndex === index;

                return (
                  <div
                    key={cert.instanceKey}
                    className={`cert-overlap-card ${cert.staggerClass} ${
                      isActive ? 'is-card-active' : ''
                    } ${isHovered ? 'is-card-hovered' : ''}`}
                    onMouseEnter={() => setHoveredCard(index)}
                    onMouseLeave={() => setHoveredCard(null)}
                    onClick={() => setLightboxCert(cert)}
                    style={{ zIndex: isHovered ? 40 : isActive ? 30 : (cert.originalIndex % 5) + 2 }}
                  >
                    {/* Card Inner Badge */}
                    <div className="card-top-tag-row">
                      <span className="card-number-tag">{cert.number}</span>
                      <span className="card-domain-tag">{cert.tag}</span>
                    </div>

                    {/* Certificate Image Frame */}
                    <div className="card-cert-img-wrap">
                      <img
                        src={cert.image}
                        alt={cert.title}
                        className="card-cert-img"
                        loading="lazy"
                      />
                      <div className="card-hover-overlay">
                        <span className="card-view-btn">View Certificate ↗</span>
                      </div>
                    </div>

                    {/* Card Bottom Info */}
                    <div className="card-bottom-info-row">
                      <div className="card-title-col">
                        <h3 className="card-cert-title" title={cert.title}>
                          {cert.title}
                        </h3>
                        <p className="card-cert-issuer">{cert.issuer}</p>
                      </div>

                      <button
                        type="button"
                        className="card-open-arrow-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          setLightboxCert(cert);
                        }}
                        aria-label={`Open ${cert.title}`}
                      >
                        ↗
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* FULLSCREEN LIGHTBOX PREVIEW */}
      {lightboxCert && (
        <div
          className="cert-lightbox-backdrop"
          onClick={() => setLightboxCert(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="cert-lightbox-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="lightbox-top-bar">
              <div>
                <h3 className="lightbox-title">{lightboxCert.title}</h3>
                <p className="lightbox-issuer">{lightboxCert.issuer}</p>
              </div>
              <button
                type="button"
                className="lightbox-close-btn"
                onClick={() => setLightboxCert(null)}
                aria-label="Close Preview"
              >
                ✕
              </button>
            </div>

            <div className="lightbox-image-container">
              <img
                src={lightboxCert.image}
                alt={lightboxCert.title}
                className="lightbox-full-img"
              />
            </div>

            <div className="lightbox-footer-bar">
              <span className="lightbox-desc">{lightboxCert.description}</span>
              <a
                href={lightboxCert.image}
                target="_blank"
                rel="noopener noreferrer"
                className="lightbox-original-btn"
              >
                Open Full Resolution ↗
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
