import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';
import { whyHireStats } from '../data/siteData';

const CountUp: React.FC<{ target: string; inView: boolean }> = ({ target, inView }) => {
  const [count, setCount] = useState(0);
  const numericTarget = parseInt(target.replace(/[^0-9]/g, '')) || 0;
  const suffix = target.replace(/[0-9]/g, '');

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = 1500 / numericTarget;
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= numericTarget) clearInterval(timer);
    }, step);
    return () => clearInterval(timer);
  }, [inView, numericTarget]);

  return <>{inView ? `${count}${suffix}` : `0${suffix}`}</>;
};

const WhyHireSection: React.FC = () => {
  const [statsInView, setStatsInView] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsInView(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
       
        /* ── Section shell ─────────────────────────────────── */
        .wh-section {
          font-family: 'DM Sans', sans-serif;
          background: #0d0d0d;
          color: #f5f0eb;
          position: relative;
          overflow: hidden;
          padding: 7rem 0 8rem;
        }

        /* ── Background texture / blobs ────────────────────── */
        .wh-noise {
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
          pointer-events: none;
          opacity: 0.4;
        }
        .wh-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(130px);
          pointer-events: none;
        }
        .wh-blob-1 {
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(255,107,53,0.1) 0%, transparent 70%);
          top: -200px; left: -200px;
        }
        .wh-blob-2 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(255,170,90,0.07) 0%, transparent 70%);
          bottom: -100px; right: 5%;
        }

        /* ── Decorative large ghost number ─────────────────── */
        .wh-ghost-num {
          position: absolute;
          right: -0.05em;
          top: 50%;
          transform: translateY(-50%);
          font-family: 'Playfair Display', serif;
          font-size: clamp(180px, 22vw, 340px);
          font-weight: 900;
          color: transparent;
          -webkit-text-stroke: 1px rgba(255,107,53,0.05);
          line-height: 1;
          pointer-events: none;
          user-select: none;
        }

        /* ── Inner container ───────────────────────────────── */
        .wh-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          position: relative;
          z-index: 1;
        }

        /* ── Section header ────────────────────────────────── */
        .wh-header {
          margin-bottom: 5rem;
        }
        .wh-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #ff9a6c;
          margin-bottom: 1.25rem;
        }
        .wh-eyebrow-line {
          width: 32px;
          height: 1px;
          background: #ff6b35;
          display: inline-block;
        }
        .wh-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 4vw, 3.2rem);
          font-weight: 900;
          line-height: 1.1;
          letter-spacing: -0.03em;
          color: #f5f0eb;
          max-width: 640px;
        }
        .wh-title em {
          font-style: italic;
          background: linear-gradient(135deg, #ff6b35 0%, #ffaa70 60%, #ff6b35 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: wh-shimmer 4s linear infinite;
        }
        @keyframes wh-shimmer {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }

        /* ── Two-column body ───────────────────────────────── */
        .wh-body {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: center;
        }

        /* ── Left column ───────────────────────────────────── */
        .wh-desc {
          font-size: 1rem;
          line-height: 1.85;
          color: rgba(245,240,235,0.82); /* increased from 0.50 */
          font-weight: 300;
          margin-bottom: 2.5rem;
          max-width: 480px;
        }

        /* ── Stats grid ────────────────────────────────────── */
        .wh-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: rgba(255,107,53,0.12);
          border: 1px solid rgba(255,107,53,0.12);
          border-radius: 20px;
          overflow: hidden;
          margin-bottom: 2.5rem;
        }
        .wh-stat {
          background: rgba(15,15,15,0.95);
          padding: 1.5rem 1rem;
          text-align: center;
          position: relative;
          transition: background 0.3s;
          cursor: default;
        }
        .wh-stat:hover {
          background: rgba(255,107,53,0.08);
        }
        .wh-stat::after {
          content: '';
          position: absolute;
          bottom: 0; left: 50%;
          transform: translateX(-50%) scaleX(0);
          width: 40%; height: 2px;
          background: #ff6b35;
          border-radius: 2px;
          transition: transform 0.3s ease;
        }
        .wh-stat:hover::after { transform: translateX(-50%) scaleX(1); }

        .wh-stat-value {
          font-family: 'Playfair Display', serif;
          font-size: 2rem;
          font-weight: 900;
          color: #ff6b35;
          display: block;
          line-height: 1;
          letter-spacing: -0.02em;
          margin-bottom: 0.4rem;
        }
        .wh-stat-label {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: rgba(245,240,235,0.35);
          font-weight: 500;
          line-height: 1.4;
        }

        /* ── CTA Button ────────────────────────────────────── */
        .wh-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #ff6b35;
          color: #fff;
          padding: 14px 32px;
          border-radius: 100px;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
          border: none;
          outline: none;
          position: relative;
          overflow: hidden;
        }
        .wh-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.15), transparent);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .wh-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 20px 60px rgba(255,107,53,0.45);
        }
        .wh-btn:hover::before { opacity: 1; }

        /* ── Right column — image ──────────────────────────── */
        .wh-image-col {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .wh-image-wrap {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        /* Corner brackets */
        .wh-bracket {
          position: absolute;
          width: 56px;
          height: 56px;
          border-color: rgba(255,107,53,0.5);
          border-style: solid;
          pointer-events: none;
          z-index: 3;
        }
        .wh-bracket-tl { top: -12px; left: -12px; border-width: 2px 0 0 2px; border-radius: 4px 0 0 0; }
        .wh-bracket-tr { top: -12px; right: -12px; border-width: 2px 2px 0 0; border-radius: 0 4px 0 0; }
        .wh-bracket-bl { bottom: -12px; left: -12px; border-width: 0 0 2px 2px; border-radius: 0 0 0 4px; }
        .wh-bracket-br { bottom: -12px; right: -12px; border-width: 0 2px 2px 0; border-radius: 0 0 4px 0; }

        /* Glow ring behind image */
        .wh-glow-ring {
          position: absolute;
          inset: -20px;
          border-radius: 28px;
          background: radial-gradient(ellipse at center, rgba(255,107,53,0.15) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
          animation: wh-glow-pulse 4s ease-in-out infinite;
        }
        @keyframes wh-glow-pulse {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.04); }
        }

        .wh-img {
          width: 340px;
          height: 420px;
          object-fit: cover;
          object-position: top;
          border-radius: 24px;
          display: block;
          position: relative;
          z-index: 2;
          box-shadow: 0 40px 100px rgba(0,0,0,0.6);
          filter: grayscale(15%);
          transition: filter 0.4s;
        }
        .wh-img:hover { filter: grayscale(0%); }

        /* Overlay gradient on image bottom */
        .wh-img-overlay {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 45%;
          background: linear-gradient(to top, rgba(13,13,13,0.7), transparent);
          border-radius: 0 0 24px 24px;
          z-index: 3;
          pointer-events: none;
        }

        /* Floating tag on image */
        .wh-tag {
          position: absolute;
          bottom: -18px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 4;
          background: rgba(20,20,20,0.9);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,107,53,0.25);
          border-radius: 100px;
          padding: 10px 22px;
          display: flex;
          align-items: center;
          gap: 10px;
          white-space: nowrap;
          box-shadow: 0 10px 40px rgba(0,0,0,0.4);
          animation: wh-float 4s ease-in-out infinite;
        }
        @keyframes wh-float {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50%       { transform: translateX(-50%) translateY(-8px); }
        }
        .wh-tag-dot {
          width: 8px; height: 8px;
          background: #ff6b35;
          border-radius: 50%;
          animation: wh-pulse 2s infinite;
          flex-shrink: 0;
        }
        @keyframes wh-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(0.65); }
        }
        .wh-tag-text {
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.06em;
          color: #f5f0eb;
        }

        /* Side badge */
        .wh-side-badge {
          position: absolute;
          top: 30px;
          right: -22px;
          z-index: 4;
          background: #ff6b35;
          border-radius: 16px;
          padding: 12px 14px;
          text-align: center;
          box-shadow: 0 8px 30px rgba(255,107,53,0.4);
          animation: wh-float 5s ease-in-out infinite 1s;
        }
        .wh-side-badge-val {
          font-family: 'Playfair Display', serif;
          font-size: 1.4rem;
          font-weight: 900;
          color: #fff;
          display: block;
          line-height: 1;
        }
        .wh-side-badge-lbl {
          font-size: 9px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: rgba(255,255,255,0.75);
          margin-top: 3px;
          display: block;
        }

        /* ── Divider line top ──────────────────────────────── */
        .wh-divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,107,53,0.2), transparent);
          margin-bottom: 0;
        }

        /* ── Mobile ────────────────────────────────────────── */
        @media (max-width: 768px) {
          .wh-section { padding: 5rem 0 6rem; }

          .wh-inner { padding: 0 1.25rem; }

          .wh-header { margin-bottom: 3rem; text-align: center; }
          .wh-eyebrow { justify-content: center; }
          .wh-title { font-size: clamp(1.75rem, 7vw, 2.4rem); margin: 0 auto; text-align: center; }

          .wh-body {
            grid-template-columns: 1fr;
            gap: 3.5rem;
          }

          /* Image above text on mobile */
          .wh-image-col { order: -1; }

          .wh-desc { font-size: 0.9rem; margin: 0 auto 2rem; text-align: center; }

          .wh-stats { grid-template-columns: repeat(3, 1fr); }
          .wh-stat { padding: 1.1rem 0.6rem; }
          .wh-stat-value { font-size: 1.5rem; }
          .wh-stat-label { font-size: 9px; }

          .wh-img {
            width: 240px;
            height: 300px;
          }

          .wh-side-badge { right: -10px; top: 16px; padding: 10px 12px; }
          .wh-side-badge-val { font-size: 1.1rem; }

          .wh-btn {
            width: 100%;
            max-width: 280px;
            justify-content: center;
            display: flex;
            margin: 0 auto;
          }

          .wh-ghost-num { display: none; }
        }

        @media (max-width: 380px) {
          .wh-stats { grid-template-columns: repeat(2, 1fr); }
          .wh-img { width: 200px; height: 260px; }
          .wh-title { font-size: clamp(1.5rem, 8vw, 1.9rem); }
        }
      `}</style>

      <div className="wh-divider" />

      <section className="wh-section">
        <div className="wh-noise" />
        <div className="wh-blob wh-blob-1" />
        <div className="wh-blob wh-blob-2" />
        <div className="wh-ghost-num">WHY</div>

        <div className="wh-inner">

          {/* ── Header ── */}
          <motion.div
            className="wh-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            <div className="wh-eyebrow">
              <span className="wh-eyebrow-line" />
              The case for working together
            </div>
            <h2 className="wh-title">
              Why Hire Me for Your <em>Next Project?</em>
            </h2>
          </motion.div>

          {/* ── Body ── */}
          <div className="wh-body">

            {/* Left */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
            >
              <p className="wh-desc">
                I bring a unique blend of creative design thinking and strategic problem-solving to every project. With years of experience working with clients of all sizes, I translate business goals into beautiful, functional applications that users love.
              </p>

              {/* Stats grid */}
              <div className="wh-stats" ref={statsRef}>
                {whyHireStats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className="wh-stat"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.2 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <span className="wh-stat-value"><CountUp target={stat.value} inView={statsInView} /></span>
                    <span className="wh-stat-label">{stat.label}</span>
                  </motion.div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <Link to="contact" smooth duration={500} offset={-70}>
                  <button className="wh-btn">
                    Hire Me
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </Link>
                <a
                  href="/cv.pdf"
                  download
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    fontSize: '13px', fontWeight: 500, letterSpacing: '0.06em',
                    textTransform: 'uppercase', color: 'rgba(245,240,235,0.5)',
                    textDecoration: 'none', transition: 'color 0.3s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#ff9a6c')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(245,240,235,0.5)')}
                >
                  Download CV
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                </a>
              </div>
            </motion.div>

            {/* Right — image */}
            <motion.div
              className="wh-image-col"
              initial={{ opacity: 0, scale: 0.88 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
            >
              <div className="wh-image-wrap">
                <div className="wh-glow-ring" />

                {/* Corner brackets */}
                <div className="wh-bracket wh-bracket-tl" />
                <div className="wh-bracket wh-bracket-tr" />
                <div className="wh-bracket wh-bracket-bl" />
                <div className="wh-bracket wh-bracket-br" />

                <img
                  src="https://i.postimg.cc/1tD9YBGX/Quan1.png"
                  alt="Yakubu Quadri"
                  className="wh-img"
                />
                <div className="wh-img-overlay" />

                {/* Floating tag */}
                <div className="wh-tag">
                  <span className="wh-tag-dot" />
                  <span className="wh-tag-text">Open to opportunities</span>
                </div>

                {/* Side badge */}
                <div className="wh-side-badge">
                  <span className="wh-side-badge-val">10+</span>
                  <span className="wh-side-badge-lbl">Years Exp.</span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </>
  );
};

export default WhyHireSection;