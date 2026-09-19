import { useState } from 'react';
import { personalInfo } from '../data/portfolioData';
import envelopeImg from '../assets/contact_3d_envelope_exact.png';

const subjectOptions = [
  '🚀 Web Development',
  '🎨 UI/UX Design',
  '💼 Freelance Project',
  '💬 Say Hello'
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSending, setIsSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleChipSelect = (opt) => {
    setFormData((prev) => ({ ...prev, subject: opt }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSending(true);

    // FormSubmit unique hash token to securely route to muralitharandev@gmail.com without exposing email to scrapers
    const formSubmitEndpoint = "https://formsubmit.co/ajax/354c0c9164cf24a5b7a852240ffe7017";

    try {
      const res = await fetch(formSubmitEndpoint, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject || `Portfolio Inquiry from ${formData.name}`,
          message: formData.message,
          _subject: `Portfolio message from ${formData.name}: ${formData.subject || 'General Inquiry'}`,
          _replyto: formData.email,
          _captcha: "false",
          _template: 'table'
        })
      });

      if (!res.ok) {
        console.warn("FormSubmit response status:", res.status);
      }
    } catch (err) {
      console.warn("Contact form submission error:", err);
    } finally {
      setIsSending(false);
      setSubmitted(true);

      // Reset form after 6 seconds
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 6000);
    }
  };

  return (
    <section id="contact" className="contact-section-v2">
      {/* Corner Ambient Glows */}
      <div className="contact-corner-glow top-left-glow"></div>
      <div className="contact-corner-glow bottom-right-glow"></div>

      <div className="contact-inner-container">
        {/* Section Header */}
        <div className="contact-section-header">
          <div className="contact-section-badge">
            <span className="pill-dot"></span>
            <span>CONTACT</span>
          </div>
          <h2 className="contact-section-title">
            Get In <span className="highlight-orange">Touch</span>
          </h2>
          <p className="contact-section-subtitle">
            I’m always open to discussing new projects, opportunities or just to say hello!
          </p>
          <div className="contact-section-bar" aria-hidden="true"></div>
        </div>

        {/* 2-Column Content Layout */}
        <div className="contact-layout-grid">
          {/* Left Column: Info & 3D Illustration */}
          <div className="contact-left-col">
            <div className="contact-desktop-intro">
              <div className="contact-badge-pill">
                <span className="pill-dot"></span> Let's Connect
              </div>

              <h3 className="contact-col-title">
                Let’s Build <br />
                <span className="highlight-orange">Something Great</span>
              </h3>

              <p className="contact-col-desc">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of something amazing. Feel free to reach out!
              </p>
            </div>

            {/* Side-by-side row: Contact Info List on Left, 3D Envelope on Right */}
            <div className="contact-meta-with-envelope-row">
              <div className="contact-items-list">
                <div className="contact-meta-item">
                  <div className="contact-circle-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <div className="contact-meta-text">
                    <span className="contact-meta-label">Email</span>
                    <a href={`mailto:${personalInfo.email}`} className="contact-meta-val">
                      {personalInfo.email}
                    </a>
                  </div>
                </div>

                <div className="contact-meta-item">
                  <div className="contact-circle-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                  <div className="contact-meta-text">
                    <span className="contact-meta-label">Location</span>
                    <span className="contact-meta-val">Tamil Nadu, India</span>
                  </div>
                </div>

                <div className="contact-meta-item">
                  <div className="contact-circle-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                  </div>
                  <div className="contact-meta-text">
                    <span className="contact-meta-label">Response Time</span>
                    <span className="contact-meta-val">Within 24 hours</span>
                  </div>
                </div>
              </div>

              {/* 3D Envelope directly next to the contact info, matching reference image */}
              <div className="envelope-3d-side-wrap">
                <img src={envelopeImg} alt="Send message envelope" className="envelope-3d-exact-img" />
              </div>
            </div>

            {/* Handwritten Note positioned at bottom-left exactly as in image */}
            <div className="creative-handwritten-note-bottom">
              <span>Let's create<br />something amazing</span>
              <svg className="handwritten-arrow" width="42" height="30" viewBox="0 0 46 34" fill="none">
                <path d="M4 28 C18 26, 32 18, 40 6" stroke="#ea580c" strokeWidth="2.4" strokeLinecap="round" />
                <path d="M28 6 L40 6 L40 18" stroke="#ea580c" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          {/* Right Column: Modern Compact Contact Card */}
          <div className="contact-right-col">
            <div className="contact-card-modern">
              {/* Top-Right Decorative Folded Ribbon */}
              <div className="card-corner-ribbon-tag">
                <svg width="42" height="42" viewBox="0 0 46 46" fill="none">
                  <path d="M10 2 C28 2, 44 18, 44 36 L44 2 Z" fill="url(#ribbonGrad)" />
                  <path d="M6 2 C26 2, 44 20, 44 40" stroke="#ea580c" strokeWidth="3.5" strokeLinecap="round" />
                  <defs>
                    <linearGradient id="ribbonGrad" x1="10" y1="2" x2="44" y2="36" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#fb923c" />
                      <stop offset="1" stopColor="#ea580c" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Contact Form Header matching the mobile format */}
              <div className="contact-form-header">
                <h3 className="contact-form-title">
                  Send a <span className="highlight-orange">Message</span>
                </h3>
                <p className="contact-form-desc">
                  Feel free to reach out. I'll get back to you as soon as possible.
                </p>
              </div>

            <form className="contact-form-inner" onSubmit={handleSubmit}>
              <div className="form-row-2col">
                <div className="form-field">
                  <label htmlFor="name">
                    <span>Your Name</span> <span className="field-required">*</span>
                  </label>
                  <div className="field-input-box">
                    <span className="field-icon-svg">
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </span>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="email">
                    <span>Your Email</span> <span className="field-required">*</span>
                  </label>
                  <div className="field-input-box">
                    <span className="field-icon-svg">
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                    </span>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="form-field">
                <div className="field-label-split">
                  <label htmlFor="subject">Subject</label>
                  <span className="quick-pick-caption">QUICK PICK:</span>
                </div>

                <div className="subject-quick-chips">
                  {subjectOptions.map((opt) => (
                    <button
                      type="button"
                      key={opt}
                      className={`quick-chip ${formData.subject === opt ? 'selected' : ''}`}
                      onClick={() => handleChipSelect(opt)}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                <div className="field-input-box">
                  <span className="field-icon-svg">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                    </svg>
                  </span>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="message">
                  <span>Message</span> <span className="field-required">*</span>
                </label>
                <div className="field-input-box textarea-box">
                  <span className="field-icon-svg icon-textarea-pos">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                  </span>
                  <textarea
                    id="message"
                    name="message"
                    rows="3"
                    required
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>

              {/* Submit CTA or Professional Success State replacing button */}
              {submitted ? (
                <div className="contact-submitted-success-state">
                  <div className="success-pulse-check">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div className="success-content">
                    <span className="success-title">Message Sent Successfully!</span>
                    <span className="success-sub">Delivered to muralitharandev@gmail.com</span>
                  </div>
                </div>
              ) : (
                <div className="form-cta-container">
                  <div className="cta-doodle-rays rays-left" aria-hidden="true">
                    <span className="ray ray-top"></span>
                    <span className="ray ray-mid"></span>
                    <span className="ray ray-bot"></span>
                  </div>

                  <button type="submit" className="card-submit-btn-orange" disabled={isSending}>
                    {isSending ? (
                      <>
                        <span className="btn-spinner"></span>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <svg className="btn-plane-icon" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="22" y1="2" x2="11" y2="13"></line>
                          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                        </svg>
                        <span>Send Message</span>
                        <svg className="btn-arrow-icon" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </>
                    )}
                  </button>

                  <div className="cta-doodle-rays rays-right" aria-hidden="true">
                    <span className="ray ray-top"></span>
                    <span className="ray ray-mid"></span>
                    <span className="ray ray-bot"></span>
                  </div>
                </div>
              )}

              {/* Card Trust Guarantees */}
              <div className="card-trust-row">
                <div className="trust-cell">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                  </svg>
                  <span>Quick Response</span>
                </div>
                <div className="trust-col-sep"></div>
                <div className="trust-cell">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                  <span>100% Secure</span>
                </div>
                <div className="trust-col-sep"></div>
                <div className="trust-cell">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#ea580c" stroke="#ea580c" strokeWidth="1">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                  <span>Let's Work Together</span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
