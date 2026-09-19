import { useState, useEffect, useRef, useCallback } from 'react';
import OpeningIntro from './components/OpeningIntro';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Process from './components/Process';
import ProjectsPage from './components/ProjectsPage';
import AchievementsPage from './components/AchievementsPage';
import CertificatesParallaxBanner from './components/CertificatesParallaxBanner';
import Certifications from './components/Certifications';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingSocialBar from './components/FloatingSocialBar';
import ScrollToTop from './components/ScrollToTop';
import './App.css';

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [introState, setIntroState] = useState('waiting');
  const exitTimerRef = useRef(null);
  const hasStartedExitRef = useRef(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('portfolio-theme') || 'dark';
  });

  const [currentView, setCurrentView] = useState(() => {
    const hash = window.location.hash;
    if (hash === '#/projects' || hash === '#projects') return 'projects';
    if (hash === '#/achievements' || hash === '#achievements') return 'achievements';
    return 'home';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  useEffect(() => {
    if (currentView === 'projects') {
      document.title = 'Projects | Portfolio - Muthaiya Muralitharan M';
    } else if (currentView === 'achievements') {
      document.title = 'Achievements | Portfolio - Muthaiya Muralitharan M';
    } else {
      document.title = 'Portfolio - Muthaiya Muralitharan M';
    }
  }, [currentView]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#/projects' || hash === '#projects') {
        setCurrentView('projects');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#/achievements' || hash === '#achievements') {
        setCurrentView('achievements');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setCurrentView('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleIntroStartExit = useCallback(() => {
    if (hasStartedExitRef.current) return;
    hasStartedExitRef.current = true;
    setIntroState('entering');
    if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
    exitTimerRef.current = setTimeout(() => {
      setIntroState('entered');
    }, 1900);
  }, []);

  const handleIntroComplete = useCallback(() => {
    setShowIntro(false);
    if (!hasStartedExitRef.current) {
      hasStartedExitRef.current = true;
      setIntroState('entering');
      if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
      exitTimerRef.current = setTimeout(() => {
        setIntroState('entered');
      }, 1200);
    }
  }, []);

  const handleReplayIntro = useCallback(() => {
    if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
    hasStartedExitRef.current = false;
    setIntroState('waiting');
    setShowIntro(true);
  }, []);

  useEffect(() => {
    return () => {
      if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
    };
  }, []);

  const navigateTo = (view, sectionId) => {
    if (view === 'projects') {
      setCurrentView('projects');
      window.location.hash = '#/projects';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (view === 'achievements') {
      setCurrentView('achievements');
      window.location.hash = '#/achievements';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCurrentView('home');
      if (sectionId) {
        window.location.hash = `#${sectionId}`;
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 80);
      } else {
        window.location.hash = '#';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className={`portfolio-app theme-${theme} ${showIntro ? 'has-cinematic-intro' : ''} intro-${introState}`}>
      {showIntro && (
        <OpeningIntro
          onStartExit={handleIntroStartExit}
          onComplete={handleIntroComplete}
        />
      )}
      {/* Background Ambient Lights */}
      <div className="bg-ambient-lights">
        <div className="ambient-orb orb-1"></div>
        <div className="ambient-orb orb-2"></div>
        <div className="ambient-orb orb-3"></div>
      </div>
      <div className="bg-grid-overlay"></div>

      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        currentView={currentView}
        navigateTo={navigateTo}
      />
      <FloatingSocialBar />
      <ScrollToTop currentView={currentView} />

      <main>
        {currentView === 'projects' ? (
          <ProjectsPage onBackHome={(sectionId) => navigateTo('home', sectionId)} />
        ) : currentView === 'achievements' ? (
          <AchievementsPage
            onBackHome={(sectionId) => navigateTo('home', sectionId)}
            onNavigate={navigateTo}
          />
        ) : (
          <>
            <Hero theme={theme} onNavigate={navigateTo} />
            <About />
            <Skills />
            <Process />
            <Certifications />
            <Experience onNavigate={navigateTo} />
            <CertificatesParallaxBanner />
            <Contact />
          </>
        )}
      </main>

      <Footer
        onReplayIntro={handleReplayIntro}
        navigateTo={navigateTo}
      />
    </div>
  );
}

export default App;

