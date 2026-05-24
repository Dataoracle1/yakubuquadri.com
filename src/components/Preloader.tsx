import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Count up from 0 to 100
    const duration = 1800; // ms
    const interval = 18;
    const steps = duration / interval;
    let current = 0;

    const timer = setInterval(() => {
      current += 1;
      // Ease: fast at start, slow in middle, fast at end
      const t = current / steps;
      const eased = t < 0.5
        ? 2 * t * t
        : 1 - Math.pow(-2 * t + 2, 2) / 2;
      setCount(Math.min(100, Math.round(eased * 100)));

      if (current >= steps) {
        clearInterval(timer);
        setTimeout(() => {
          setDone(true);
          setTimeout(onComplete, 700);
        }, 300);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="pl-root"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
        >
          <style>{`
           

            .pl-root {
              position: fixed;
              inset: 0;
              z-index: 99999;
              background: #060606;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              overflow: hidden;
            }

            /* Background accent */
            .pl-blob {
              position: absolute;
              width: 600px; height: 600px;
              border-radius: 50%;
              background: radial-gradient(circle, rgba(255,107,53,0.08) 0%, transparent 65%);
              filter: blur(80px);
              top: 50%; left: 50%;
              transform: translate(-50%, -50%);
              pointer-events: none;
              animation: plPulse 2s ease-in-out infinite alternate;
            }
            @keyframes plPulse {
              from { transform: translate(-50%, -50%) scale(0.9); opacity: 0.6; }
              to   { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
            }

            /* Grid lines for texture */
            .pl-grid {
              position: absolute;
              inset: 0;
              background-image:
                linear-gradient(rgba(255,107,53,0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,107,53,0.03) 1px, transparent 1px);
              background-size: 60px 60px;
              pointer-events: none;
            }

            .pl-content {
              position: relative;
              z-index: 1;
              text-align: center;
            }

            /* Logo */
            .pl-logo {
              font-family: 'Playfair Display', serif;
              font-size: clamp(3rem, 8vw, 5rem);
              font-weight: 900;
              font-style: italic;
              letter-spacing: -0.04em;
              color: #f5f0eb;
              line-height: 1;
              margin-bottom: 2.5rem;
            }
            .pl-logo em {
              background: linear-gradient(135deg, #ff6b35, #ffaa70);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
              font-style: normal;
            }

            /* Count */
            .pl-count {
              font-family: 'Playfair Display', serif;
              font-size: clamp(3.5rem, 10vw, 6rem);
              font-weight: 900;
              color: transparent;
              -webkit-text-stroke: 1px rgba(255,107,53,0.3);
              letter-spacing: -0.04em;
              line-height: 1;
              margin-bottom: 2rem;
              display: block;
              min-width: 4ch;
              text-align: center;
            }

            /* Progress track */
            .pl-track {
              width: min(320px, 80vw);
              height: 1px;
              background: rgba(255,107,53,0.12);
              border-radius: 1px;
              overflow: hidden;
              position: relative;
            }
            .pl-fill {
              height: 100%;
              background: linear-gradient(90deg, #ff6b35, #ffaa70);
              border-radius: 1px;
              transition: width 0.05s linear;
              box-shadow: 0 0 10px rgba(255,107,53,0.5);
            }

            /* Tagline */
            .pl-tagline {
              font-family: 'DM Sans', sans-serif;
              font-size: 11px;
              font-weight: 500;
              letter-spacing: 0.22em;
              text-transform: uppercase;
              color: rgba(245,240,235,0.2);
              margin-top: 1.5rem;
            }

            /* Corner decorations */
            .pl-corner {
              position: absolute;
              width: 40px; height: 40px;
              pointer-events: none;
            }
            .pl-corner::before,
            .pl-corner::after {
              content: '';
              position: absolute;
              background: rgba(255,107,53,0.25);
            }
            .pl-corner::before { width: 100%; height: 1px; top: 0; left: 0; }
            .pl-corner::after  { width: 1px; height: 100%; top: 0; left: 0; }
            .pl-corner.tl { top: 2rem; left: 2rem; }
            .pl-corner.tr { top: 2rem; right: 2rem; transform: scaleX(-1); }
            .pl-corner.bl { bottom: 2rem; left: 2rem; transform: scaleY(-1); }
            .pl-corner.br { bottom: 2rem; right: 2rem; transform: scale(-1); }
          `}</style>

          <div className="pl-blob" />
          <div className="pl-grid" />

          <div className="pl-corner tl" />
          <div className="pl-corner tr" />
          <div className="pl-corner bl" />
          <div className="pl-corner br" />

          <motion.div
            className="pl-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="pl-logo">Q<em>dev</em></div>

            <span className="pl-count">{String(count).padStart(2, '0')}</span>

            <div className="pl-track">
              <div className="pl-fill" style={{ width: `${count}%` }} />
            </div>

            <p className="pl-tagline">Loading experience</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;