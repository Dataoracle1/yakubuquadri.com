import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const NotFound: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles: { x: number; y: number; r: number; dx: number; dy: number; alpha: number }[] = [];
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.4,
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.3 + 0.05,
      });
    }

    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,107,53,${p.alpha})`;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500&display=swap');

        .nf-root {
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
          background: #0a0a0a;
          color: #f5f0eb;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }
        .nf-canvas {
          position: absolute;
          inset: 0;
          width: 100%; height: 100%;
          pointer-events: none;
        }
        .nf-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          pointer-events: none;
        }
        .nf-blob-1 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(255,107,53,0.12) 0%, transparent 70%);
          top: -150px; right: -100px;
        }
        .nf-blob-2 {
          width: 350px; height: 350px;
          background: radial-gradient(circle, rgba(255,150,80,0.07) 0%, transparent 70%);
          bottom: -80px; left: 5%;
        }
        .nf-ghost {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          font-family: 'Playfair Display', serif;
          font-size: clamp(180px, 35vw, 420px);
          font-weight: 900;
          color: transparent;
          -webkit-text-stroke: 1px rgba(255,107,53,0.05);
          pointer-events: none;
          user-select: none;
          letter-spacing: -0.04em;
          line-height: 1;
          white-space: nowrap;
        }
        .nf-content {
          position: relative;
          z-index: 1;
          text-align: center;
          padding: 2rem;
          max-width: 600px;
        }
        .nf-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #ff9a6c;
          margin-bottom: 1.5rem;
          justify-content: center;
        }
        .nf-eyebrow-line {
          width: 32px; height: 1px;
          background: #ff6b35;
          display: inline-block;
        }
        .nf-code {
          font-family: 'Playfair Display', serif;
          font-size: clamp(5rem, 18vw, 10rem);
          font-weight: 900;
          line-height: 1;
          letter-spacing: -0.04em;
          background: linear-gradient(135deg, #ff6b35 0%, #ffaa70 60%, #ff6b35 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: nf-shimmer 4s linear infinite;
          margin-bottom: 1rem;
          display: block;
        }
        @keyframes nf-shimmer {
          0%   { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        .nf-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.5rem, 4vw, 2.2rem);
          font-weight: 700;
          color: #f5f0eb;
          letter-spacing: -0.02em;
          margin-bottom: 1rem;
        }
        .nf-desc {
          font-size: 1rem;
          line-height: 1.8;
          color: rgba(245,240,235,0.42);
          font-weight: 300;
          margin-bottom: 2.5rem;
          max-width: 400px;
          margin-left: auto;
          margin-right: auto;
        }
        .nf-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #ff6b35;
          color: #fff;
          padding: 14px 36px;
          border-radius: 100px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          text-decoration: none;
          cursor: pointer;
          border: none;
          transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
          box-shadow: 0 8px 28px rgba(255,107,53,0.35);
          position: relative;
          overflow: hidden;
        }
        .nf-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.15), transparent);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .nf-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 40px rgba(255,107,53,0.5);
        }
        .nf-btn:hover::before { opacity: 1; }
        .nf-btn span, .nf-btn svg { position: relative; z-index: 1; }
        .nf-logo {
          position: fixed;
          top: 1.5rem; left: 2rem;
          font-family: 'Playfair Display', serif;
          font-size: 1.4rem;
          font-weight: 900;
          font-style: italic;
          color: #f5f0eb;
          letter-spacing: -0.03em;
          text-decoration: none;
          z-index: 10;
        }
        .nf-logo em {
          background: linear-gradient(135deg, #ff6b35, #ffaa70);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-style: normal;
        }
        @media (max-width: 480px) {
          .nf-ghost { display: none; }
          .nf-content { padding: 1.5rem; }
        }
      `}</style>

      <div className="nf-root">
        <canvas ref={canvasRef} className="nf-canvas" />
        <div className="nf-blob nf-blob-1" />
        <div className="nf-blob nf-blob-2" />
        <div className="nf-ghost">404</div>

        <a href="/" className="nf-logo">Q<em>dev</em></a>

        <motion.div
          className="nf-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="nf-eyebrow">
            <span className="nf-eyebrow-line" />
            Page not found
          </div>

          <span className="nf-code">404</span>

          <h1 className="nf-title">Looks like you're lost</h1>

          <p className="nf-desc">
            The page you're looking for doesn't exist or has been moved. Let's get you back on track.
          </p>

          <motion.a
            href="/"
            className="nf-btn"
            whileHover={{ y: -3 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <span>Back to Home</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </>
  );
};

export default NotFound;