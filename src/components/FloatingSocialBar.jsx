import { useState, useEffect } from 'react';
import { personalInfo } from '../data/portfolioData';

export default function FloatingSocialBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroEl = document.getElementById('hero');
      const certEl = document.getElementById('certifications');
      const footerEl = document.getElementById('footer') || document.querySelector('.footer-wrapper');

      // 1. Check if user is in Hero (Home) section
      let inHero = false;
      if (heroEl) {
        const rect = heroEl.getBoundingClientRect();
        // While bottom of hero is visible in the upper viewport
        if (rect.bottom > 120) {
          inHero = true;
        }
      }

      // 2. Check if user is in Certifications section
      let inCert = false;
      if (certEl) {
        const rect = certEl.getBoundingClientRect();
        // If certifications section is currently active / visible on screen
        if (rect.top <= window.innerHeight * 0.7 && rect.bottom >= window.innerHeight * 0.25) {
          inCert = true;
        }
      }

      // 3. Check if user reached Footer section (disappear when footer enters view)
      let inFooter = false;
      if (footerEl) {
        const rect = footerEl.getBoundingClientRect();
        if (rect.top <= window.innerHeight - 20) {
          inFooter = true;
        }
      }

      const scrolledToBottom = window.innerHeight + window.scrollY >= (document.documentElement.scrollHeight - 60);

      // Hide in Hero, Certifications, and Footer; show in all other sections (About, Skills, Process, Experience, Freelance, Contact)
      if (inHero || inCert || inFooter || scrolledToBottom) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <aside
      className={`floating-social-sidebar ${isVisible ? 'is-visible' : ''}`}
      aria-label="Social media links"
    >
      <div className="floating-social-track">
        {/* 1. GitHub Link */}
        <a
          href={personalInfo.github}
          target="_blank"
          rel="noreferrer"
          className="floating-social-link social-link-github"
          aria-label="GitHub Profile"
        >
          <svg width="21" height="21" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
        </a>

        {/* 2. LinkedIn Link */}
        <a
          href={personalInfo.linkedin}
          target="_blank"
          rel="noreferrer"
          className="floating-social-link social-link-linkedin"
          aria-label="LinkedIn Profile"
        >
          <svg width="21" height="21" viewBox="0 0 24 24" fill="currentColor">
            <rect width="16" height="16" x="4" y="4" rx="2" className="linkedin-cutout-bg" />
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.2a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28z" />
          </svg>
        </a>

        {/* 3. Instagram Link */}
        <a
          href={personalInfo.instagram}
          target="_blank"
          rel="noreferrer"
          className="floating-social-link social-link-instagram"
          aria-label="Instagram Profile"
        >
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
        </a>
      </div>
    </aside>
  );
}
