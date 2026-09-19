import certificatesBannerImg from '../assets/certificates_banner.jpg';

const freelanceServices = [
  {
    step: '01',
    badge: 'FULL-STACK',
    title: 'Custom Web Apps',
    description: 'Scalable full-stack web applications built with React, Node.js, databases, and secure APIs.',
  },
  {
    step: '02',
    badge: 'FRONTEND',
    title: 'Modern UI/UX Design',
    description: 'Pixel-perfect responsive layouts, smooth micro-interactions, and engaging user interfaces.',
  },
  {
    step: '03',
    badge: 'INTELLIGENCE',
    title: 'API & AI Solutions',
    description: 'Smart API integrations, AI workflow automation, and custom intelligent architectures.',
  },
  {
    step: '04',
    badge: 'DELIVERY',
    title: 'Clean & Practical Solutions',
    description: 'Building reliable, maintainable solutions with a focus on performance, usability, and clean implementation.',
  },
];

export default function CertificatesParallaxBanner() {
  return (
    <section id="freelance" className="srec-banner-section" aria-label="Freelance Services & Collaboration Banner">
      <div className="srec-banner-container">
        <div className="srec-banner-card wide-journey-card">
          {/* Static, Natural Sketch Illustration Layer (No extra movement/distortion effects) */}
          <div
            className="srec-banner-bg natural-sketch-bg"
            style={{ backgroundImage: `url(${certificatesBannerImg})` }}
            aria-hidden="true"
          />

          {/* Gentle, balanced translucent backdrop to guarantee readability while sketch stays clear */}
          <div className="srec-banner-overlay natural-sketch-overlay" />

          {/* Banner Inner Content: Freelance Header, Let's Connect Button & Service Cards */}
          <div className="srec-banner-content wide-journey-content">
            <div className="banner-header-block">
              {/* Pill */}
              <div className="journey-eyebrow-pill banner-journey-pill">
                <span className="journey-pill-dot" />
                <span className="journey-pill-text">FREELANCING</span>
              </div>

              {/* Main Heading */}
              <h2 className="banner-journey-title">
                Available for <span className="title-orange-accent">Freelance Work</span>
              </h2>
            </div>

            {/* 4 Freelance Service Cards Row */}
            <div className="banner-milestones-row">
              {freelanceServices.map((item) => (
                <div key={item.step} className="banner-milestone-pill-card">
                  <div className="banner-milestone-top">
                    <span className="banner-milestone-step">{item.step}</span>
                    <span className="banner-milestone-badge">{item.badge}</span>
                  </div>
                  <h3 className="banner-milestone-name">{item.title}</h3>
                  <p className="banner-milestone-desc">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
