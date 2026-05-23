import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { testimonials } from '../data/siteData';

const TestimonialsSection: React.FC = () => {
  const [active, setActive] = useState(0);
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef(0);
  const total = testimonials.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setActive(p => (p + 1) % total);
    }, 5000);
    return () => clearInterval(timer);
  }, [total]);

  const prev = () => setActive(p => (p - 1 + total) % total);
  const next = () => setActive(p => (p + 1) % total);

  const renderStars = (rating: number) =>
    Array(5).fill(0).map((_, i) => (
      <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i < rating ? '#ff6b35' : 'none'} stroke={i < rating ? '#ff6b35' : 'rgba(255,107,53,0.25)'} strokeWidth="1.5">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500&display=swap');

        .tm-section {
          font-family: 'DM Sans', sans-serif;
          background: #080808;
          color: #f5f0eb;
          padding: 7rem 0 8rem;
          position: relative;
          overflow: hidden;
        }

        .tm-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(130px);
          pointer-events: none;
        }
        .tm-blob-1 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(255,107,53,0.1) 0%, transparent 70%);
          top: -100px; left: -100px;
        }
        .tm-blob-2 {
          width: 380px; height: 380px;
          background: radial-gradient(circle, rgba(255,160,80,0.07) 0%, transparent 70%);
          bottom: -80px; right: 5%;
        }
        .tm-ghost {
          position: absolute;
          bottom: -0.05em; right: -0.05em;
          font-family: 'Playfair Display', serif;
          font-size: clamp(120px, 18vw, 280px);
          font-weight: 900;
          color: transparent;
          -webkit-text-stroke: 1px rgba(255,107,53,0.04);
          pointer-events: none;
          user-select: none;
          letter-spacing: -0.04em;
          line-height: 1;
        }

        .tm-inner {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 2rem;
          position: relative;
          z-index: 1;
        }

        .tm-eyebrow {
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
        .tm-eyebrow-line {
          width: 32px; height: 1px;
          background: #ff6b35;
          display: inline-block;
        }
        .tm-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 4vw, 3.2rem);
          font-weight: 900;
          line-height: 1.08;
          letter-spacing: -0.03em;
          color: #f5f0eb;
          margin-bottom: 4rem;
        }
        .tm-title em {
          font-style: italic;
          background: linear-gradient(135deg, #ff6b35 0%, #ffaa70 60%, #ff6b35 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: tm-shimmer 4s linear infinite;
        }
        @keyframes tm-shimmer {
          0%   { background-position: 0% center; }
          100% { background-position: 200% center; }
        }

        /* ── Carousel ── */
        .tm-stage {
          position: relative;
          user-select: none;
        }

        .tm-track {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          align-items: start;
        }

        /* Main featured card */
        .tm-card-main {
          background: #111;
          border: 1px solid rgba(255,107,53,0.15);
          border-radius: 24px;
          padding: 2.5rem;
          position: relative;
          overflow: hidden;
          min-height: 280px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .tm-card-main::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          height: 2px; width: 100%;
          background: linear-gradient(90deg, #ff6b35, #ffaa70);
        }
        .tm-quote-icon {
          font-family: 'Playfair Display', serif;
          font-size: 5rem;
          line-height: 0.6;
          color: rgba(255,107,53,0.12);
          margin-bottom: 1rem;
          display: block;
        }
        .tm-text {
          font-size: 1.05rem;
          line-height: 1.8;
          color: rgba(245,240,235,0.72);
          font-weight: 300;
          font-style: italic;
          flex: 1;
          margin-bottom: 2rem;
        }
        .tm-author-row {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .tm-avatar {
          width: 48px; height: 48px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid rgba(255,107,53,0.3);
          flex-shrink: 0;
        }
        .tm-author-name {
          font-family: 'Playfair Display', serif;
          font-size: 1rem;
          font-weight: 700;
          color: #f5f0eb;
        }
        .tm-author-pos {
          font-size: 0.8rem;
          color: #ff9a6c;
          opacity: 0.7;
          margin-top: 2px;
        }
        .tm-stars {
          display: flex;
          gap: 3px;
          margin-top: 0.6rem;
        }

        /* Right column: mini cards + controls */
        .tm-side {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .tm-mini {
          background: #0f0f0f;
          border: 1px solid rgba(255,107,53,0.07);
          border-radius: 16px;
          padding: 1.25rem 1.5rem;
          cursor: pointer;
          transition: border-color 0.3s, background 0.3s;
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .tm-mini:hover, .tm-mini.is-active {
          border-color: rgba(255,107,53,0.25);
          background: #141414;
        }
        .tm-mini-avatar {
          width: 38px; height: 38px;
          border-radius: 50%;
          object-fit: cover;
          flex-shrink: 0;
          border: 1.5px solid rgba(255,107,53,0.2);
        }
        .tm-mini-name {
          font-size: 0.88rem;
          font-weight: 500;
          color: #f5f0eb;
        }
        .tm-mini-pos {
          font-size: 0.75rem;
          color: rgba(245,240,235,0.38);
          margin-top: 2px;
        }
        .tm-mini-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: rgba(255,107,53,0);
          margin-left: auto;
          flex-shrink: 0;
          transition: background 0.3s;
        }
        .tm-mini.is-active .tm-mini-dot { background: #ff6b35; }

        /* Controls */
        .tm-controls {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-top: 1rem;
          padding-left: 0.25rem;
        }
        .tm-btn {
          width: 44px; height: 44px;
          border-radius: 50%;
          border: 1px solid rgba(255,107,53,0.2);
          background: transparent;
          color: #f5f0eb;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.3s;
        }
        .tm-btn:hover {
          background: rgba(255,107,53,0.12);
          border-color: rgba(255,107,53,0.4);
        }
        .tm-pips {
          display: flex;
          gap: 6px;
          align-items: center;
        }
        .tm-pip {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: rgba(255,107,53,0.2);
          cursor: pointer;
          transition: all 0.3s;
        }
        .tm-pip.is-active {
          background: #ff6b35;
          width: 20px;
          border-radius: 3px;
        }

        .tm-divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,107,53,0.2), transparent);
        }

        @media (max-width: 900px) {
          .tm-track { grid-template-columns: 1fr; }
          .tm-side { flex-direction: row; flex-wrap: wrap; }
          .tm-mini { flex: 1; min-width: 160px; }
        }
        @media (max-width: 768px) {
          .tm-section { padding: 5rem 0 6rem; }
          .tm-inner { padding: 0 1.25rem; }
          .tm-title { font-size: clamp(1.75rem, 7.5vw, 2.4rem); margin-bottom: 2.5rem; }
          .tm-ghost { display: none; }
          .tm-card-main { padding: 1.75rem; }
          .tm-text { font-size: 0.93rem; }
          .tm-mini { padding: 1rem 1.25rem; }
        }
      `}</style>

      <div className="tm-divider" />

      <section className="tm-section">
        <div className="tm-blob tm-blob-1" />
        <div className="tm-blob tm-blob-2" />
        <div className="tm-ghost">LOVE</div>

        <div className="tm-inner">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            <div className="tm-eyebrow">
              <span className="tm-eyebrow-line" />
              Social proof
            </div>
            <h2 className="tm-title">
              Results that <em>Speak</em> for Themselves
            </h2>
          </motion.div>

          <div className="tm-track">
            {/* Main card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  className="tm-card-main"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="tm-quote-icon">"</span>
                  <p className="tm-text">{testimonials[active].text}</p>
                  <div className="tm-author-row">
                    <img
                      src={testimonials[active].author.image}
                      alt={testimonials[active].author.name}
                      className="tm-avatar"
                    />
                    <div>
                      <div className="tm-author-name">{testimonials[active].author.name}</div>
                      <div className="tm-author-pos">{testimonials[active].author.position}</div>
                      <div className="tm-stars">{renderStars(testimonials[active].rating)}</div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Side panel */}
            <motion.div
              className="tm-side"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
            >
              {testimonials.map((t, i) => (
                <div
                  key={t.id}
                  className={`tm-mini${i === active ? ' is-active' : ''}`}
                  onClick={() => setActive(i)}
                >
                  <img src={t.author.image} alt={t.author.name} className="tm-mini-avatar" />
                  <div>
                    <div className="tm-mini-name">{t.author.name}</div>
                    <div className="tm-mini-pos">{t.author.position}</div>
                  </div>
                  <div className="tm-mini-dot" />
                </div>
              ))}

              <div className="tm-controls">
                <button className="tm-btn" onClick={prev} aria-label="Previous">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <div className="tm-pips">
                  {testimonials.map((_, i) => (
                    <div key={i} className={`tm-pip${i === active ? ' is-active' : ''}`} onClick={() => setActive(i)} />
                  ))}
                </div>
                <button className="tm-btn" onClick={next} aria-label="Next">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TestimonialsSection;