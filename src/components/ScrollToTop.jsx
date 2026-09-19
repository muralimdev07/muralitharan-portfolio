import { useState, useEffect } from 'react';
import './ScrollToTop.css';

export default function ScrollToTop({ currentView = 'home' }) {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

      // Track scroll progress from 0% to 100%
      if (scrollHeight > 0) {
        const progress = Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100));
        setScrollProgress(progress);
      }

      // Reveal button once scrolled down past 320px
      if (scrollTop > 320) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Circle radius r = 21, circumference = 2 * PI * 21 ~= 131.95
  const circumference = 131.95;
  const strokeOffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <div
      className={`scroll-to-top-wrapper ${isVisible ? 'is-visible' : ''}`}
      aria-hidden={!isVisible}
    >
      <button
        type="button"
        onClick={scrollToTop}
        className="scroll-to-top-btn"
        aria-label="Scroll back to top"
        title="Scroll to top"
      >
        {/* Animated Circular SVG Progress Ring */}
        <svg
          className="scroll-progress-ring"
          viewBox="0 0 50 50"
          aria-hidden="true"
        >
          {/* Subtle background track */}
          <circle
            className="progress-track"
            cx="25"
            cy="25"
            r="21"
            fill="none"
            strokeWidth="2.5"
          />
          {/* Dynamic orange fill tracking scroll depth */}
          <circle
            className="progress-fill"
            cx="25"
            cy="25"
            r="21"
            fill="none"
            strokeWidth="2.5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeOffset}
          />
        </svg>

        {/* Crisp Up Arrow Icon */}
        <div className="scroll-arrow-icon">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 15l-6-6-6 6" />
          </svg>
        </div>

        {/* Hover Tooltip */}
        <span className="scroll-top-tooltip">Back to Top</span>
      </button>
    </div>
  );
}
