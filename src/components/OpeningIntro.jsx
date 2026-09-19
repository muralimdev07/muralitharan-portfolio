import { useState, useEffect, useRef } from 'react';
import './OpeningIntro.css';

const LINE1 = 'Welcome to My';
const LINE2 = 'Portfolio';

export default function OpeningIntro({ onStartExit, onComplete }) {
  const [line1Text, setLine1Text] = useState('');
  const [line2Text, setLine2Text] = useState('');
  const [activeLine, setActiveLine] = useState(1); // which line is typing
  const [showCursor1, setShowCursor1] = useState(true);
  const [showCursor2, setShowCursor2] = useState(false);
  const [phase, setPhase] = useState('typing');
  const isSkippedRef = useRef(false);
  const idx1 = useRef(0);
  const idx2 = useRef(0);

  const activeLineRef = useRef(1);
  const timersRef = useRef([]);
  const hasStartedExitRef = useRef(false);
  const hasCompletedRef = useRef(false);

  const onStartExitRef = useRef(onStartExit);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onStartExitRef.current = onStartExit;
    onCompleteRef.current = onComplete;
  });

  const clearAllTimers = () => {
    timersRef.current.forEach(id => {
      clearTimeout(id);
      clearInterval(id);
    });
    timersRef.current = [];
  };

  const safeSetTimeout = (fn, delay) => {
    const id = setTimeout(() => {
      timersRef.current = timersRef.current.filter(t => t !== id);
      fn();
    }, delay);
    timersRef.current.push(id);
    return id;
  };

  const safeSetInterval = (fn, delay) => {
    const id = setInterval(fn, delay);
    timersRef.current.push(id);
    return id;
  };

  const triggerStartExit = () => {
    if (hasStartedExitRef.current) return;
    hasStartedExitRef.current = true;
    setPhase('exit');
    if (onStartExitRef.current) {
      onStartExitRef.current();
    }
  };

  const triggerComplete = () => {
    if (hasCompletedRef.current) return;
    hasCompletedRef.current = true;
    clearAllTimers();
    setPhase('done');
    document.body.style.overflow = '';
    if (onCompleteRef.current) {
      onCompleteRef.current();
    }
  };

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Cursor blink interval
    safeSetInterval(() => {
      if (activeLineRef.current === 1) {
        setShowCursor1(v => !v);
      } else {
        setShowCursor2(v => !v);
      }
    }, 500);

    // Start typing line 1 after 500ms
    safeSetTimeout(() => {
      const typeLine1 = safeSetInterval(() => {
        if (isSkippedRef.current) return;
        if (idx1.current < LINE1.length) {
          idx1.current += 1;
          setLine1Text(LINE1.slice(0, idx1.current));
        } else {
          clearInterval(typeLine1);
          timersRef.current = timersRef.current.filter(t => t !== typeLine1);
          // Brief pause then start line 2
          activeLineRef.current = 2;
          setActiveLine(2);
          setShowCursor1(false);
          setShowCursor2(true);

          safeSetTimeout(() => {
            const typeLine2 = safeSetInterval(() => {
              if (isSkippedRef.current) return;
              if (idx2.current < LINE2.length) {
                idx2.current += 1;
                setLine2Text(LINE2.slice(0, idx2.current));
              } else {
                clearInterval(typeLine2);
                timersRef.current = timersRef.current.filter(t => t !== typeLine2);
                // Hold 1.5s then exit
                safeSetTimeout(() => {
                  if (!isSkippedRef.current) {
                    triggerStartExit();
                  }
                }, 1500);

                // At 2.4s (0.9s after exit), complete intro
                safeSetTimeout(() => {
                  if (!isSkippedRef.current) {
                    triggerComplete();
                  }
                }, 2400);
              }
            }, 85);
          }, 280);
        }
      }, 75);
    }, 500);

    return () => {
      clearAllTimers();
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const handleSkip = () => {
    if (isSkippedRef.current) return;
    isSkippedRef.current = true;
    clearAllTimers();
    triggerStartExit();
    triggerComplete();
  };

  if (phase === 'done') return null;

  return (
    <div className={`tw-root ${phase === 'exit' ? 'tw-exit' : ''}`}>

      {/* Light mode background */}
      <div className="tw-bg" aria-hidden="true">
        <div className="tw-bg-blob b1" />
        <div className="tw-bg-blob b2" />
        <div className="tw-bg-blob b3" />
        <div className="tw-bg-grid" />
      </div>

      {/* Center content */}
      <div className="tw-stage">

        {/* Small label above */}
        <div className="tw-label">
          <span className="tw-label-line" />
          <span className="tw-label-text">Helloo</span>
          <span className="tw-label-line" />
        </div>

        {/* Line 1 */}
        <div className="tw-line tw-line-1" role="heading" aria-level="1">
          <span className="tw-text tw-text-light">
            {line1Text}
            {activeLine === 1 && (
              <span className={`tw-cursor ${showCursor1 ? 'on' : 'off'}`}>|</span>
            )}
          </span>
        </div>

        {/* Line 2 */}
        <div className="tw-line tw-line-2">
          <span className="tw-text tw-text-accent">
            {line2Text}
            {activeLine === 2 && (
              <span className={`tw-cursor tw-cursor-accent ${showCursor2 ? 'on' : 'off'}`}>|</span>
            )}
          </span>
        </div>

        {/* Divider that appears after full text */}
        <div className={`tw-divider ${line2Text === LINE2 ? 'tw-divider-show' : ''}`} aria-hidden="true" />

      </div>

      {/* Skip */}
      <button
        type="button"
        className="tw-skip"
        onClick={handleSkip}
        aria-label="Skip intro"
      >
        skip
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="13 17 18 12 13 7" />
          <polyline points="6 17 11 12 6 7" />
        </svg>
      </button>
    </div>
  );
}
