import { useState, useEffect } from 'react';
import { projectsData } from '../data/portfolioData';

const projectSlides = [
  {
    id: 'hero',
    image: '/projects/portfolio_slide_hero.png',
    title: 'Hero View • Modern Web Experiences',
    badge: '01 / HERO'
  },
  {
    id: 'about',
    image: '/projects/portfolio_slide_about.png',
    title: 'About Me • Skills & Profile Overview',
    badge: '02 / ABOUT'
  },
  {
    id: 'achievements',
    image: '/projects/portfolio_slide_achievements.png',
    title: 'Achievements • Key Milestones & Launch',
    badge: '03 / ACHIEVEMENTS'
  }
];

export default function ProjectsPage({ onBackHome }) {
  const project = projectsData[0];
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % projectSlides.length);
    }, 3800);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div className="projects-page-container">
      {/* Top Navigation Bar / Breadcrumb */}
      <div className="projects-page-nav-bar">
        <button
          type="button"
          onClick={() => onBackHome('hero')}
          className="projects-back-btn"
          aria-label="Back to Home Page"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          <span>Back to Home</span>
        </button>

        <div className="projects-breadcrumbs">
          <span className="crumb-link" onClick={() => onBackHome('hero')}>Home</span>
          <span className="crumb-sep">/</span>
          <span className="crumb-current">Projects</span>
        </div>
      </div>

      {/* Page Header */}
      <div className="projects-page-header">
        <div className="projects-page-badge">
          <span className="badge-pulse-dot" />
          <span>PORTFOLIO SHOWCASE</span>
        </div>
        <h1 className="projects-page-title">
          Featured <span className="title-accent-glow">Project</span>
        </h1>
        <p className="projects-page-subtitle">
          An interactive showcase of my personal developer portfolio, crafted with modern web standards and smooth interactive experiences.
        </p>
      </div>

      {/* Featured Project Showcase Card */}
      {project && (
        <article className="project-showcase-card glass-card">
          <div className="showcase-card-grid">
            {/* Left: Crossfading Image Slideshow */}
            <div className="showcase-media-side">
              <div
                className="showcase-img-wrap showcase-crossfade-container"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                {projectSlides.map((slide, idx) => (
                  <div
                    key={slide.id}
                    className={`showcase-slide-layer ${idx === currentSlideIndex ? 'is-active' : 'is-inactive'}`}
                    aria-hidden={idx !== currentSlideIndex}
                  >
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="showcase-img"
                      loading={idx === 0 ? 'eager' : 'lazy'}
                    />
                  </div>
                ))}

                <div className="showcase-media-overlay" />

                {/* Live Pill on Top Left */}
                <div className="showcase-live-pill">
                  <span className="live-dot" />
                  <span>LIVE & ACTIVE</span>
                </div>

                {/* Current Slide Tag on Top Right */}
                <div className="showcase-slide-pill">
                  <span>{projectSlides[currentSlideIndex].badge}</span>
                </div>

                {/* Slider Navigation Dots & Controls on Bottom */}
                <div className="showcase-slider-controls" onClick={(e) => e.stopPropagation()}>
                  <button
                    type="button"
                    className="slider-arrow-btn prev"
                    onClick={() => setCurrentSlideIndex((prev) => (prev - 1 + projectSlides.length) % projectSlides.length)}
                    aria-label="Previous image"
                    title="Previous image"
                  >
                    ‹
                  </button>

                  <div className="slider-dots-group">
                    {projectSlides.map((slide, idx) => (
                      <button
                        key={slide.id}
                        type="button"
                        className={`slider-dot ${idx === currentSlideIndex ? 'is-active' : ''}`}
                        onClick={() => setCurrentSlideIndex(idx)}
                        aria-label={`Switch to slide ${idx + 1}`}
                        title={slide.title}
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    className="slider-arrow-btn next"
                    onClick={() => setCurrentSlideIndex((prev) => (prev + 1) % projectSlides.length)}
                    aria-label="Next image"
                    title="Next image"
                  >
                    ›
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Clean, Simple & Punchy Project Details */}
            <div className="showcase-info-side">
              <div className="showcase-cat-row">
                <span className="showcase-category">{project.category}</span>
                <span className="showcase-featured-tag">Primary Highlight</span>
              </div>

              <h2 className="showcase-title">{project.title}</h2>

              {/* Simplified & concise description */}
              <p className="showcase-desc-simple">
                A modern, responsive developer portfolio built with React, Vite, and custom CSS. Designed with rich micro-interactions, smooth scroll storytelling, and a persistent dark/light theme engine.
              </p>

              {/* Tech Stack Pills */}
              <div className="showcase-tech-box">
                <span className="tech-box-label">Technologies & Tools:</span>
                <div className="tech-tags-list">
                  {project.tags.map((tag, idx) => (
                    <span key={idx} className="showcase-tech-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Call to Actions */}
              <div className="showcase-actions-row">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="showcase-btn btn-github"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  <span>View GitHub</span>
                </a>

                <button
                  type="button"
                  onClick={() => onBackHome('hero')}
                  className="showcase-btn btn-live-explore"
                >
                  <span>Explore Live Site</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </article>
      )}

    </div>
  );
}
