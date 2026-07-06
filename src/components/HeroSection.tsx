import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';
import { heroStats } from '../data/siteData';

const ROLES = [
  'Full-Stack Developer',
  'UI/UX Enthusiast',
  'React Specialist',
  'Problem Solver',
];

const HeroSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);
  const [charIndex, setCharIndex] = useState(0);

  /* ── Particle canvas ── */
  useEffect(() => {
    if (window.innerWidth < 768) return; // skip canvas on mobile
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
    for (let i = 0; i < 20; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.8 + 0.4,
        dx: (Math.random() - 0.5) * 0.35,
        dy: (Math.random() - 0.5) * 0.35,
        alpha: Math.random() * 0.35 + 0.05,
      });
    }

    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Draw connecting lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255,107,53,${0.06 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
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

  /* ── Typewriter ── */
  useEffect(() => {
    const current = ROLES[roleIndex];
    if (typing) {
      if (charIndex < current.length) {
        const t = setTimeout(() => {
          setDisplayed(current.slice(0, charIndex + 1));
          setCharIndex(c => c + 1);
        }, 55);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setTyping(false), 1800);
        return () => clearTimeout(t);
      }
    } else {
      if (charIndex > 0) {
        const t = setTimeout(() => {
          setDisplayed(current.slice(0, charIndex - 1));
          setCharIndex(c => c - 1);
        }, 30);
        return () => clearTimeout(t);
      } else {
        setRoleIndex(r => (r + 1) % ROLES.length);
        setTyping(true);
      }
    }
  }, [charIndex, typing, roleIndex]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500&display=swap');

        .hero-section {
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
          background: #0a0a0a;
          color: #f5f0eb;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
        }
        .hero-canvas {
          position: absolute;
          inset: 0;
          width: 100%; height: 100%;
          pointer-events: none;
        }
        .bg-text {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          font-family: 'Playfair Display', serif;
          font-size: clamp(100px, 18vw, 260px);
          font-weight: 900;
          color: transparent;
          -webkit-text-stroke: 1px rgba(255,107,53,0.05);
          white-space: nowrap;
          pointer-events: none;
          user-select: none;
          letter-spacing: -0.04em;
          line-height: 1;
        }
        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          pointer-events: none;
        }
        .blob-1 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(255,107,53,0.15) 0%, transparent 70%);
          top: -100px; right: -100px;
          animation: blobDrift1 12s ease-in-out infinite alternate;
        }
        .blob-2 {
          width: 350px; height: 350px;
          background: radial-gradient(circle, rgba(255,180,100,0.08) 0%, transparent 70%);
          bottom: -50px; left: 10%;
          animation: blobDrift2 15s ease-in-out infinite alternate;
        }
        @keyframes blobDrift1 {
          from { transform: translate(0,0) scale(1); }
          to   { transform: translate(-40px, 30px) scale(1.1); }
        }
        @keyframes blobDrift2 {
          from { transform: translate(0,0) scale(1); }
          to   { transform: translate(30px, -20px) scale(0.9); }
        }

        .hero-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 8rem 2rem 6rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
          position: relative;
          z-index: 1;
          width: 100%;
        }

        .accent-line {
          width: 60px; height: 2px;
          background: linear-gradient(90deg, #ff6b35, #ffaa70);
          border-radius: 2px;
          margin-bottom: 1.5rem;
        }
        .badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,107,53,0.1);
          border: 1px solid rgba(255,107,53,0.25);
          padding: 6px 16px;
          border-radius: 100px;
          font-size: 13px;
          font-weight: 500;
          color: #ff9a6c;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 1.5rem;
        }
        .badge-dot {
          width: 6px; height: 6px;
          background: #ff6b35;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.6); }
        }

        .hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.8rem, 5vw, 4rem);
          font-weight: 900;
          line-height: 1.05;
          letter-spacing: -0.03em;
          margin-bottom: 1.25rem;
        }
        .hero-title .name {
          display: block;
          color: #f5f0eb;
        }
        .hero-title .role-wrap {
          display: block;
          min-height: 1.15em;
        }
        .hero-title .role {
          background: linear-gradient(135deg, #ff6b35 0%, #ffaa70 60%, #ff6b35 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: titleShimmer 4s linear infinite;
        }
        .cursor {
          display: inline-block;
          width: 3px;
          height: 0.85em;
          background: #ff6b35;
          border-radius: 2px;
          margin-left: 3px;
          vertical-align: middle;
          animation: blink 0.9s step-end infinite;
        }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes titleShimmer {
          0%   { background-position: 0% center; }
          100% { background-position: 200% center; }
        }

        .hero-desc {
          font-size: 1rem;
          line-height: 1.85;
          color: rgba(245,240,235,0.82); /* ← increased from 0.48 */
          font-weight: 300;
          max-width: 440px;
          margin-bottom: 2.5rem;
        }

        .btn-row {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          align-items: center;
          margin-bottom: 3rem;
        }
        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #ff6b35;
          color: #fff;
          padding: 14px 32px;
          border-radius: 100px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.04em;
          border: none;
          cursor: pointer;
          transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
          box-shadow: 0 8px 28px rgba(255,107,53,0.35);
          position: relative;
          overflow: hidden;
        }
        .btn-primary::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.15), transparent);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 40px rgba(255,107,53,0.5);
        }
        .btn-primary:hover::before { opacity: 1; }

        .btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: transparent;
          color: rgba(245,240,235,0.7);
          padding: 14px 32px;
          border-radius: 100px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.04em;
          border: 1px solid rgba(245,240,235,0.15);
          cursor: pointer;
          transition: all 0.3s;
        }
        .btn-secondary:hover {
          border-color: rgba(255,107,53,0.4);
          color: #f5f0eb;
          background: rgba(255,107,53,0.06);
          transform: translateY(-2px);
        }

        .stats-row {
          display: flex;
          gap: 2.5rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(255,107,53,0.08);
        }
        .stat-value {
          font-family: 'Playfair Display', serif;
          font-size: 2.2rem;
          font-weight: 900;
          color: #ff6b35;
          display: block;
          line-height: 1;
          letter-spacing: -0.03em;
        }
        .stat-label {
          font-size: 12px;
          color: rgba(245,240,235,0.35);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-top: 4px;
          display: block;
        }

        /* Image side */
        .image-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(255,107,53,0.12);
          pointer-events: none;
        }
        .ring-1 {
          width: 340px; height: 340px;
          animation: spin 20s linear infinite;
        }
        .ring-2 {
          width: 400px; height: 400px;
          border-style: dashed;
          border-color: rgba(255,107,53,0.07);
          animation: spin 30s linear infinite reverse;
        }
        .ring-dot {
          position: absolute;
          top: 0; left: 50%;
          transform: translateX(-50%) translateY(-50%);
          width: 8px; height: 8px;
          border-radius: 50%;
          background: #ff6b35;
          box-shadow: 0 0 12px rgba(255,107,53,0.7);
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .img-container {
          width: 260px; height: 260px;
          border-radius: 50%;
          overflow: hidden;
          border: 3px solid rgba(255,107,53,0.2);
          position: relative;
          z-index: 2;
          box-shadow: 0 0 60px rgba(255,107,53,0.15), 0 30px 80px rgba(0,0,0,0.5);
        }
        .img-container img {
          width: 100%; height: 100%;
          object-fit: cover;
          object-position: top;
          transition: transform 0.6s ease;
        }
        .img-container:hover img { transform: scale(1.04); }

        /* Floating cards */
        .float-card {
          position: absolute;
          background: rgba(15,15,15,0.9);
          border: 1px solid rgba(255,107,53,0.2);
          border-radius: 14px;
          padding: 10px 16px;
          backdrop-filter: blur(12px);
          z-index: 3;
          box-shadow: 0 8px 32px rgba(0,0,0,0.4);
        }
        .float-card-1 {
          bottom: 20px; right: 0;
          animation: floatA 4s ease-in-out infinite;
        }
        .float-card-2 {
          top: 20px; left: 0;
          animation: floatB 5s ease-in-out infinite;
        }
        @keyframes floatA {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes floatB {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }
        .card-label {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: rgba(245,240,235,0.35);
        }
        .card-value {
          font-family: 'Playfair Display', serif;
          font-size: 1.2rem;
          font-weight: 700;
          color: #ff9a6c;
          line-height: 1.2;
        }

        /* Scroll hint */
        .scroll-hint {
          position: absolute;
          bottom: 2rem; left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          opacity: 0.25;
          z-index: 2;
        }
        .scroll-hint span {
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #f5f0eb;
        }
        .scroll-arrow {
          width: 1px; height: 40px;
          background: linear-gradient(to bottom, #f5f0eb, transparent);
          animation: scrollDrop 1.5s ease-in-out infinite;
        }
        @keyframes scrollDrop {
          0%   { transform: scaleY(0); transform-origin: top; }
          50%  { transform: scaleY(1); transform-origin: top; }
          51%  { transform: scaleY(1); transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; }
        }

        @media (max-width: 900px) {
          .hero-inner { grid-template-columns: 1fr; text-align: center; padding: 6rem 1.5rem 5rem; }
          .image-wrapper { order: -1; }
          .img-container { width: 200px; height: 200px; }
          .ring-1 { width: 245px; height: 245px; }
          .ring-2 { width: 290px; height: 290px; }
          .float-card-1 { right: 10%; }
          .float-card-2 { left: 10%; }
          .accent-line { margin: 0 auto 1.25rem; }
          .badge { margin-left: auto; margin-right: auto; }
          .hero-desc { margin: 0 auto 2rem; }
          .btn-row { justify-content: center; }
          .stats-row { justify-content: center; }
          .scroll-hint { display: none; }
        }
        @media (max-width: 480px) {
          .hero-title { font-size: clamp(2rem, 8vw, 2.8rem); }
          .img-container { width: 170px; height: 170px; }
          .ring-1 { width: 210px; height: 210px; }
          .ring-2 { width: 250px; height: 250px; }
          .btn-primary, .btn-secondary { width: 100%; max-width: 280px; justify-content: center; }
          .stats-row { gap: 1.5rem; }
          .stat-value { font-size: 1.8rem; }
        }
      `}</style>

      <section id="home" className="hero-section">
        <canvas ref={canvasRef} className="hero-canvas" />
        <div className="bg-text">DEV</div>
        <div className="blob blob-1" />
        <div className="blob blob-2" />

        <div className="hero-inner">
          {/* Left: Text */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.12 } } }}
          >
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}>
              <div className="badge">
                <span className="badge-dot" />
                Available for work
              </div>
              <div className="accent-line" />
            </motion.div>

            <motion.h1 className="hero-title" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}>
              <span className="name">Yakubu Quadri</span>
              <span className="role-wrap">
                <span className="role">{displayed}</span>
                <span className="cursor" />
              </span>
            </motion.h1>

            <motion.p className="hero-desc" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}>
              Building scalable, high-performance web applications with clean architecture and unforgettable user experiences.
            </motion.p>

            <motion.div className="btn-row" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}>
              <Link to="portfolio" smooth duration={500} offset={-70}>
                <button className="btn-primary">
                  View Portfolio
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </Link>
              <Link to="contact" smooth duration={500} offset={-70}>
                <button className="btn-secondary">Hire Me</button>
              </Link>
            </motion.div>

            <motion.div className="stats-row" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}>
              {heroStats.map((stat, i) => (
                <div key={i}>
                  <span className="stat-value">{stat.value}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Image */}
          <motion.div
            className="image-wrapper"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            <div className="ring ring-2"><div className="ring-dot" /></div>
            <div className="ring ring-1" />
            <div className="img-container">
              <img src="https://i.postimg.cc/jqnmHCsJ/Quan2.png" alt="Yakubu Quadri" loading="eager" fetchPriority="high" />
            </div>
            <div className="float-card float-card-1">
              <div className="card-label">Experience</div>
              <div className="card-value">2+ Yrs</div>
            </div>
            <div className="float-card float-card-2">
              <div className="card-label">Projects</div>
              <div className="card-value">4+</div>
            </div>
          </motion.div>
        </div>

        <div className="scroll-hint">
          <span>Scroll</span>
          <div className="scroll-arrow" />
        </div>
      </section>
    </>
  );
};

export default HeroSection;