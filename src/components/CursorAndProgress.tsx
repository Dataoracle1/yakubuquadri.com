import React, { useEffect, useRef, useState } from 'react';

const CursorAndProgress: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    // Only show custom cursor on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setHidden(false);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
      }

      // Check if hovering interactive element
      const target = e.target as HTMLElement;
      const isInteractive = !!(
        target.closest('a, button, [role="button"], input, textarea, select, label, .tg-tag, .tm-mini, .pf-filter-btn, .sv-card, .ex-row, .bl-card')
      );
      setHovering(isInteractive);
    };

    const onLeave = () => setHidden(true);
    const onEnter = () => setHidden(false);
    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);

    // Smooth ring follow
    const animate = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      }
      rafId = requestAnimationFrame(animate);
    };
    animate();

    // Scroll progress
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup', onUp);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <>
      <style>{`
        /* Hide default cursor on desktop */
        @media (pointer: fine) {
          * { cursor: none !important; }
        }

        /* ── Scroll progress bar ── */
        .cp-progress {
          position: fixed;
          top: 0; left: 0;
          height: 2px;
          background: linear-gradient(90deg, #ff6b35, #ffaa70);
          z-index: 9999;
          pointer-events: none;
          transform-origin: left;
          transition: width 0.1s linear;
          box-shadow: 0 0 8px rgba(255,107,53,0.6);
        }

        /* ── Dot ── */
        .cp-dot {
          position: fixed;
          top: 0; left: 0;
          width: 6px; height: 6px;
          background: #ff6b35;
          border-radius: 50%;
          pointer-events: none;
          z-index: 9998;
          transition: opacity 0.2s, transform 0.05s, width 0.2s, height 0.2s, background 0.2s;
          will-change: transform;
        }
        .cp-dot.is-hidden { opacity: 0; }
        .cp-dot.is-clicking {
          width: 10px; height: 10px;
          background: #ffaa70;
        }
        .cp-dot.is-hovering {
          width: 4px; height: 4px;
          background: #ffaa70;
        }

        /* ── Ring ── */
        .cp-ring {
          position: fixed;
          top: 0; left: 0;
          width: 36px; height: 36px;
          border: 1.5px solid rgba(255, 107, 53, 0.45);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9997;
          transition: opacity 0.2s, width 0.25s, height 0.25s, border-color 0.25s, border-width 0.25s;
          will-change: transform;
        }
        .cp-ring.is-hidden { opacity: 0; }
        .cp-ring.is-clicking {
          width: 28px; height: 28px;
          border-color: rgba(255,107,53,0.8);
        }
        .cp-ring.is-hovering {
          width: 52px; height: 52px;
          border-color: rgba(255,107,53,0.25);
          border-width: 1px;
          background: rgba(255,107,53,0.04);
        }

        @media (pointer: coarse) {
          .cp-dot, .cp-ring { display: none; }
        }
      `}</style>

      {/* Scroll progress */}
      <div className="cp-progress" style={{ width: `${progress}%` }} />

      {/* Cursor dot */}
      <div
        ref={dotRef}
        className={[
          'cp-dot',
          hidden ? 'is-hidden' : '',
          clicking ? 'is-clicking' : '',
          hovering && !clicking ? 'is-hovering' : '',
        ].filter(Boolean).join(' ')}
      />

      {/* Cursor ring */}
      <div
        ref={ringRef}
        className={[
          'cp-ring',
          hidden ? 'is-hidden' : '',
          clicking ? 'is-clicking' : '',
          hovering && !clicking ? 'is-hovering' : '',
        ].filter(Boolean).join(' ')}
      />
    </>
  );
};

export default CursorAndProgress;