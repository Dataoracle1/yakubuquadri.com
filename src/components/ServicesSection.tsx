import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { services } from '../data/siteData';

const ServicesSection: React.FC = () => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <>
      <style>{`
       

        /* ── Section shell ─────────────────────────────────── */
        .sv-section {
          font-family: 'DM Sans', sans-serif;
          background: #0a0a0a;
          color: #f5f0eb;
          padding: 7rem 0 8rem;
          position: relative;
          overflow: hidden;
        }

        /* ── Background elements ───────────────────────────── */
        .sv-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(130px);
          pointer-events: none;
        }
        .sv-blob-1 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(255,107,53,0.1) 0%, transparent 70%);
          top: -150px; right: -100px;
        }
        .sv-blob-2 {
          width: 350px; height: 350px;
          background: radial-gradient(circle, rgba(255,150,80,0.07) 0%, transparent 70%);
          bottom: -80px; left: 5%;
        }

        .sv-ghost {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          font-family: 'Playfair Display', serif;
          font-size: clamp(120px, 20vw, 300px);
          font-weight: 900;
          color: transparent;
          -webkit-text-stroke: 1px rgba(255,107,53,0.04);
          white-space: nowrap;
          pointer-events: none;
          user-select: none;
          letter-spacing: -0.04em;
          line-height: 1;
        }

        /* ── Inner container ───────────────────────────────── */
        .sv-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          position: relative;
          z-index: 1;
        }

        /* ── Header ────────────────────────────────────────── */
        .sv-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 4rem;
          gap: 2rem;
          flex-wrap: wrap;
        }
        .sv-eyebrow {
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
        .sv-eyebrow-line {
          width: 32px; height: 1px;
          background: #ff6b35;
          display: inline-block;
        }
        .sv-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 4vw, 3.2rem);
          font-weight: 900;
          line-height: 1.08;
          letter-spacing: -0.03em;
          color: #f5f0eb;
        }
        .sv-title em {
          font-style: italic;
          background: linear-gradient(135deg, #ff6b35 0%, #ffaa70 60%, #ff6b35 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: sv-shimmer 4s linear infinite;
        }
        @keyframes sv-shimmer {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        .sv-header-count {
          font-family: 'Playfair Display', serif;
          font-size: clamp(3.5rem, 6vw, 5rem);
          font-weight: 900;
          color: transparent;
          -webkit-text-stroke: 1px rgba(255,107,53,0.3);
          line-height: 1;
          letter-spacing: -0.04em;
          white-space: nowrap;
          align-self: flex-start;
          padding-top: 0.2em;
        }

        /* ── Grid ──────────────────────────────────────────── */
        .sv-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: rgba(255,107,53,0.1);
          border: 1px solid rgba(255,107,53,0.1);
          border-radius: 24px;
          overflow: hidden;
        }

        /* ── Card ──────────────────────────────────────────── */
        .sv-card {
          background: #0f0f0f;
          padding: 2.5rem 2rem;
          position: relative;
          cursor: default;
          transition: background 0.4s ease;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .sv-card.is-hovered {
          background: #141414;
        }

        /* animated corner accent */
        .sv-card-corner {
          position: absolute;
          top: 0; right: 0;
          width: 60px; height: 60px;
          overflow: hidden;
          pointer-events: none;
        }
        .sv-card-corner::before {
          content: '';
          position: absolute;
          top: 0; right: 0;
          width: 0; height: 0;
          border-style: solid;
          border-width: 0 60px 60px 0;
          border-color: transparent rgba(255,107,53,0) transparent transparent;
          transition: border-color 0.4s ease;
        }
        .sv-card.is-hovered .sv-card-corner::before {
          border-color: transparent rgba(255,107,53,0.12) transparent transparent;
        }

        /* bottom border reveal */
        .sv-card::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 0; height: 2px;
          background: linear-gradient(90deg, #ff6b35, #ffaa70);
          transition: width 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .sv-card.is-hovered::after { width: 100%; }

        /* index number */
        .sv-card-index {
          font-family: 'Playfair Display', serif;
          font-size: 0.8rem;
          font-weight: 700;
          color: rgba(255,107,53,0.35);
          letter-spacing: 0.1em;
          margin-bottom: 0.25rem;
          transition: color 0.3s;
        }
        .sv-card.is-hovered .sv-card-index { color: rgba(255,107,53,0.7); }

        /* icon */
        .sv-icon-wrap {
          width: 52px; height: 52px;
          border-radius: 14px;
          background: rgba(255,107,53,0.08);
          border: 1px solid rgba(255,107,53,0.15);
          display: flex; align-items: center; justify-content: center;
          font-size: 1.6rem;
          transition: all 0.4s ease;
          flex-shrink: 0;
        }
        .sv-card.is-hovered .sv-icon-wrap {
          background: rgba(255,107,53,0.15);
          border-color: rgba(255,107,53,0.35);
          transform: scale(1.08) rotate(-4deg);
          box-shadow: 0 8px 30px rgba(255,107,53,0.2);
        }

        /* title */
        .sv-card-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.15rem;
          font-weight: 700;
          color: #f5f0eb;
          line-height: 1.2;
          letter-spacing: -0.01em;
          transition: color 0.3s;
        }
        .sv-card.is-hovered .sv-card-title { color: #fff; }

        /* description */
        .sv-card-desc {
          font-size: 0.9rem;
          line-height: 1.75;
          color: rgba(245,240,235,0.42);
          font-weight: 300;
          flex: 1;
          transition: color 0.3s;
        }
        .sv-card.is-hovered .sv-card-desc { color: rgba(245,240,235,0.6); }

        /* arrow */
        .sv-card-arrow {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,107,53,0);
          transition: color 0.3s, gap 0.3s;
        }
        .sv-card.is-hovered .sv-card-arrow {
          color: #ff9a6c;
          gap: 10px;
        }
        .sv-card-arrow svg {
          transition: transform 0.3s ease;
        }
        .sv-card.is-hovered .sv-card-arrow svg {
          transform: translateX(4px);
        }

        /* ── Divider ───────────────────────────────────────── */
        .sv-divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,107,53,0.2), transparent);
        }

        /* ── Mobile ────────────────────────────────────────── */
        @media (max-width: 900px) {
          .sv-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 768px) {
          .sv-section { padding: 5rem 0 6rem; }
          .sv-inner { padding: 0 1.25rem; }
          .sv-header { flex-direction: column; align-items: flex-start; margin-bottom: 2.5rem; }
          .sv-header-count { display: none; }
          .sv-title { font-size: clamp(1.75rem, 7.5vw, 2.4rem); }
          .sv-grid { grid-template-columns: 1fr; border-radius: 16px; }
          .sv-card { padding: 2rem 1.5rem; }
          .sv-ghost { display: none; }
        }

        @media (max-width: 380px) {
          .sv-card { padding: 1.75rem 1.25rem; }
          .sv-card-title { font-size: 1.05rem; }
          .sv-card-desc { font-size: 0.85rem; }
        }
      `}</style>

      <div className="sv-divider" />

      <section id="services" className="sv-section">
        <div className="sv-blob sv-blob-1" />
        <div className="sv-blob sv-blob-2" />
        <div className="sv-ghost">WORK</div>

        <div className="sv-inner">

          {/* Header */}
          <motion.div
            className="sv-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            <div>
              <div className="sv-eyebrow">
                <span className="sv-eyebrow-line" />
                What I bring to the table
              </div>
              <h2 className="sv-title">
                My <em>Services</em>
              </h2>
            </div>
            <div className="sv-header-count">
              0{services.length}
            </div>
          </motion.div>

          {/* Cards grid */}
          <motion.div
            className="sv-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
            }}
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                className={`sv-card${hovered === index ? ' is-hovered' : ''}`}
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
                variants={{
                  hidden: { opacity: 0, y: 30, scale: 0.96 },
                  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }
                }}
                whileHover={{ y: -4, transition: { duration: 0.3 } }}
              >
                <div className="sv-card-corner" />
                <div className="sv-card-index">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div className="sv-icon-wrap">{service.icon}</div>
                <h3 className="sv-card-title">{service.title}</h3>
                <p className="sv-card-desc">{service.description}</p>
                <div className="sv-card-arrow">
                  Learn more
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M1 6h10M6 1l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>
    </>
  );
};

export default ServicesSection;