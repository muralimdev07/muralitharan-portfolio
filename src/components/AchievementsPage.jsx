import { useState, useRef } from 'react';
import { achievementsData, achievementShowcaseItems } from '../data/portfolioData';
import './AchievementsPage.css';

function TabIcon({ type, className = '' }) {
  switch (type) {
    case 'stage':
      return (
        <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
          <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
          <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
          <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
        </svg>
      );
    case 'screen':
      return (
        <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
        </svg>
      );
    case 'team':
      return (
        <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      );
    default:
      return (
        <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
      );
  }
}

export default function AchievementsPage({ onBackHome, onNavigate }) {
  const achievement = achievementsData[0];
  const items = achievementShowcaseItems;
  const [expandedAchievements, setExpandedAchievements] = useState({
    [achievement.id]: false,
  });
  const [activeItemIndex, setActiveItemIndex] = useState(null);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const showcaseRef = useRef(null);

  if (!achievement || !items.length) return null;

  const currentItem = items[selectedPhotoIndex] || items[0];
  const isExpanded = !!expandedAchievements[achievement.id];

  const handleToggleExpand = (id) => {
    setExpandedAchievements(prev => {
      const nextVal = !prev[id];
      if (nextVal) {
        setTimeout(() => {
          showcaseRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 120);
      }
      return { ...prev, [id]: nextVal };
    });
  };

  const handleAccordionClick = (idx) => {
    setSelectedPhotoIndex(idx);
    setActiveItemIndex(prev => (prev === idx ? null : idx));
  };

  return (
    <div className="achievements-page-container clean-layout">
      {/* Top Navigation Bar / Breadcrumb */}
      <div className="achievements-page-nav-bar">
        <button
          type="button"
          onClick={() => onBackHome('hero')}
          className="achievements-back-btn"
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

        <div className="achievements-breadcrumbs">
          <span className="crumb-link" onClick={() => onBackHome('hero')}>Home</span>
          <span className="crumb-sep">/</span>
          <span className="crumb-current">Achievements</span>
        </div>
      </div>

      {/* Page Header */}
      <div className="achievements-section-header">
        <span className="ach-page-eyebrow">HONORS & RECOGNITION</span>
        <h1 className="ach-page-title">
          Achievements
        </h1>
      </div>

      {/* Achievements List (Modular Architecture: ready for multiple achievements) */}
      <div className="achievements-cards-list">
        {achievementsData.map((item) => {
          const itemExpanded = !!expandedAchievements[item.id];

          return (
            <article key={item.id} className="achievement-single-item-card">
              {/* Heading Area (On Top) */}
              <div className="ach-entry-top">
                <div className="ach-entry-badge">
                  <span className="badge-pulse-dot" />
                  <span>{item.badge}</span>
                </div>
                <h2 className="ach-entry-title">
                  {item.title} <span className="title-orange-glow">{item.highlightTitle || 'Re-Architecture'}</span>
                </h2>
              </div>

              {/* Description & View More button directly underneath the heading */}
              <div className="ach-entry-desc-row">
                <p className="ach-entry-description">
                  {item.shortDescription}
                </p>

                {/* View More Button with Arrow */}
                <button
                  type="button"
                  onClick={() => handleToggleExpand(item.id)}
                  className={`ach-view-more-btn ${itemExpanded ? 'is-expanded' : ''}`}
                  aria-expanded={itemExpanded}
                >
                  <span>{itemExpanded ? 'View Less' : 'View More'}</span>
                  <svg
                    className="ach-view-more-arrow"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <polyline points="19 12 12 19 5 12"></polyline>
                  </svg>
                </button>
              </div>

              {/* Expanded Showcase (Revealed right under this achievement on clicking View More) */}
              {itemExpanded && (
                <div
                  ref={showcaseRef}
                  className="ach-coe-showcase-section animate-expand-in"
                >
                  {/* Left Column: Interactive Accordion Topics with Dropdowns */}
                  <aside className="ach-tabs-sidebar" aria-label="Official Launch Topics">
                    <div className="ach-tabs-heading-label">
                      <span>OFFICIAL STAGE TOPICS</span>
                      <span className="ach-tab-count">3 Milestones</span>
                    </div>

                    <div className="ach-accordion-list">
                      {items.map((subItem, idx) => {
                        const isActive = activeItemIndex === idx;
                        return (
                          <div
                            key={subItem.id}
                            className={`ach-accordion-item ${isActive ? 'is-active' : ''}`}
                          >
                            {/* Clickable Tab Header */}
                            <button
                              type="button"
                              className="ach-accordion-header"
                              onClick={() => handleAccordionClick(idx)}
                              aria-expanded={isActive}
                            >
                              <div className="ach-tab-icon-wrapper">
                                <TabIcon type={subItem.iconType} className="ach-tab-icon" />
                              </div>
                              <div className="ach-tab-text-wrap">
                                <span className="ach-tab-title">{subItem.tabLabel}</span>
                                <span className="ach-tab-sub">Photo 0{idx + 1}</span>
                              </div>
                              <div className="ach-accordion-chevron">
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <polyline points="6 9 12 15 18 9"></polyline>
                                </svg>
                              </div>
                            </button>

                            {/* Dropdown Content under this Tab (Only shown for active tab) */}
                            {isActive && (
                              <div className="ach-accordion-dropdown animate-dropdown-fade">
                                <div className="dropdown-badge">
                                  {subItem.categoryBadge}
                                </div>

                                <p className="dropdown-desc">
                                  {subItem.description}
                                </p>

                                {subItem.techStack && subItem.techStack.length > 0 && (
                                  <div className="dropdown-tech-row">
                                    <span className="dropdown-tech-label">Tech Stack:</span>
                                    <div className="dropdown-tech-pills">
                                      {subItem.techStack.map((tech, tIdx) => (
                                        <span key={tIdx} className="dropdown-tech-pill">{tech}</span>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                <div className="dropdown-action-row">
                                  <a
                                    href={subItem.actionUrl || item.collegeUrl || "https://www.nscet.org/"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="dropdown-link-btn"
                                  >
                                    <span>Visit Live Website</span>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                      <polyline points="15 3 21 3 21 9"></polyline>
                                      <line x1="10" y1="14" x2="21" y2="3"></line>
                                    </svg>
                                  </a>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </aside>

                  {/* Right Column: Clean, Unobstructed Full Photo Showcase */}
                  <div className="ach-showcase-display">
                    <div
                      className="ach-showcase-frame unobstructed-frame"
                      onClick={() => setLightboxOpen(true)}
                      title="Click to zoom image"
                    >
                      <img
                        key={currentItem.image}
                        src={currentItem.image}
                        alt={currentItem.title}
                        className="ach-showcase-img"
                        loading="eager"
                      />

                      <div className="ach-showcase-ambient-shade" />

                      <div className="ach-top-right-badge">
                        <span className="badge-pulse-indicator" />
                        <span>{currentItem.badgeTopRight}</span>
                      </div>

                      {/* Compact Bottom Bar on Image (Shows Institution/Date/Role by default, or Active Milestone info) */}
                      <div
                        className="ach-minimal-bottom-bar"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {activeItemIndex === null ? (
                          /* By Default: Compact Institutional Metadata directly on the image with Elaborate on Hover */
                          <div className="minimal-bar-meta-row animate-dropdown-fade">
                            {/* 1. Institution Item */}
                            <div className="compact-img-meta-item elaborate-hover-trigger institution-meta-item" tabIndex={0}>
                              <span className="compact-meta-icon">🏛️</span>
                              <div className="compact-meta-text">
                                <span className="compact-meta-label">INSTITUTION</span>
                                <span className="compact-meta-val" title={item.institution}>
                                  NSCET College
                                </span>
                              </div>
                              {/* Elaborate Popover on Hover */}
                              <div className="meta-elaborate-popover popover-left" role="tooltip">
                                <span className="popover-badge">🏛️ OFFICIAL INSTITUTION</span>
                                <span className="popover-title">Nadar Saraswathi College of Engineering & Technology</span>
                                <span className="popover-desc">Autonomous Institution • Theni • TNEA Code 5865</span>
                              </div>
                            </div>

                            <div className="compact-img-meta-divider" />

                            {/* 2. Launch Date Item */}
                            <div className="compact-img-meta-item elaborate-hover-trigger date-meta-item" tabIndex={0}>
                              <span className="compact-meta-icon">📅</span>
                              <div className="compact-meta-text">
                                <span className="compact-meta-label">LAUNCH DATE</span>
                                <span className="compact-meta-val">{item.launchDate}</span>
                              </div>
                              {/* Elaborate Popover on Hover */}
                              <div className="meta-elaborate-popover popover-center" role="tooltip">
                                <span className="popover-badge">📅 OFFICIAL LAUNCH DATE</span>
                                <span className="popover-title">{item.launchDate}</span>
                                <span className="popover-desc">17th Induction & Freshers Day Official Stage Launch</span>
                              </div>
                            </div>

                            <div className="compact-img-meta-divider" />

                            {/* 3. Role Item */}
                            <div className="compact-img-meta-item elaborate-hover-trigger role-meta-item" tabIndex={0}>
                              <span className="compact-meta-icon">⚡</span>
                              <div className="compact-meta-text">
                                <span className="compact-meta-label">ROLE</span>
                                <span className="compact-meta-val" title={item.myRole}>Backend & DB Lead</span>
                              </div>
                              {/* Elaborate Popover on Hover */}
                              <div className="meta-elaborate-popover popover-right" role="tooltip">
                                <span className="popover-badge">⚡ ENGINEERING ROLE</span>
                                <span className="popover-title">{item.myRole}</span>
                                <span className="popover-desc">REST APIs, Node.js & MySQL Integration Lead</span>
                              </div>
                            </div>
                          </div>
                        ) : (
                          /* When a Milestone is Selected: Active Milestone Badge & Title with mini Institution chip */
                          <div className="minimal-bar-left animate-dropdown-fade">
                            <span className="minimal-bar-badge">{currentItem.categoryBadge}</span>
                            <span className="minimal-bar-title">{currentItem.title}</span>
                            <div className="active-bar-meta-chip">
                              <span className="chip-mini-icon">🏛️</span>
                              <span>NSCET • {item.launchDate}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="ach-lightbox-overlay" onClick={() => setLightboxOpen(false)}>
          <div className="ach-lightbox-modal" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="ach-lightbox-close"
              onClick={() => setLightboxOpen(false)}
              aria-label="Close image preview"
            >
              ✕
            </button>
            <img
              src={currentItem.image}
              alt={currentItem.title}
              className="ach-lightbox-img"
            />
            <div className="ach-lightbox-caption">
              <span className="lightbox-badge">{currentItem.categoryBadge}</span>
              <p>{currentItem.title}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
