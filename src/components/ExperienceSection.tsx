import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { experiences } from '../data/siteData';

const ExperienceSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <>
      <style>{`
        

        /* ── Section ───────────────────────────────────────── */
        .ex-section {
          font-family: 'DM Sans', sans-serif;
          background: #0d0d0d;
          color: #f5f0eb;
          padding: 7rem 0 8rem;
          position: relative;
          overflow: hidden;
        }

        /* ── Background ────────────────────────────────────── */
        .ex-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(130px);
          pointer-events: none;
        }
        .ex-blob-1 {
          width: 550px; height: 550px;
          background: radial-gradient(circle, rgba(255,107,53,0.09) 0%, transparent 70%);
          top: -180px; left: -180px;
        }
        .ex-blob-2 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(255,160,80,0.07) 0%, transparent 70%);
          bottom: -100px; right: 0;
        }
        .ex-ghost {
          position: absolute;
          top: 50%; right: -0.05em;
          transform: translateY(-50%);
          font-family: 'Playfair Display', serif;
          font-size: clamp(140px, 21vw, 320px);
          font-weight: 900;
          color: transparent;
          -webkit-text-stroke: 1px rgba(255,107,53,0.04);
          pointer-events: none;
          user-select: none;
          letter-spacing: -0.04em;
          line-height: 1;
        }

        /* ── Inner ─────────────────────────────────────────── */
        .ex-inner {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 2rem;
          position: relative;
          z-index: 1;
        }

        /* ── Header ────────────────────────────────────────── */
        .ex-eyebrow {
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
        .ex-eyebrow-line {
          width: 32px; height: 1px;
          background: #ff6b35;
          display: inline-block;
        }
        .ex-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 4vw, 3.2rem);
          font-weight: 900;
          line-height: 1.08;
          letter-spacing: -0.03em;
          color: #f5f0eb;
          margin-bottom: 4rem;
        }
        .ex-title em {
          font-style: italic;
          background: linear-gradient(135deg, #ff6b35 0%, #ffaa70 60%, #ff6b35 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: ex-shimmer 4s linear infinite;
        }
        @keyframes ex-shimmer {
          0%   { background-position: 0% center; }
          100% { background-position: 200% center; }
        }

        /* ── Timeline wrapper ──────────────────────────────── */
        .ex-timeline {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        /* The vertical spine */
        .ex-spine {
          position: absolute;
          left: 50%;
          top: 0; bottom: 0;
          width: 1px;
          transform: translateX(-50%);
          background: linear-gradient(
            to bottom,
            transparent 0%,
            rgba(255,107,53,0.3) 8%,
            rgba(255,107,53,0.3) 92%,
            transparent 100%
          );
          pointer-events: none;
        }

        /* ── Row ───────────────────────────────────────────── */
        .ex-row {
          display: grid;
          grid-template-columns: 1fr 56px 1fr;
          align-items: start;
          margin-bottom: 3rem;
          position: relative;
        }
        .ex-row:last-child { margin-bottom: 0; }

        /* ── Node (center column) ──────────────────────────── */
        .ex-node {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: 1.5rem;
          gap: 0;
          position: relative;
          z-index: 2;
        }
        .ex-dot-ring {
          width: 40px; height: 40px;
          border-radius: 50%;
          border: 1px solid rgba(255,107,53,0.25);
          display: flex; align-items: center; justify-content: center;
          background: #0d0d0d;
          transition: border-color 0.4s, box-shadow 0.4s;
        }
        .ex-row.is-active .ex-dot-ring {
          border-color: rgba(255,107,53,0.7);
          box-shadow: 0 0 20px rgba(255,107,53,0.25);
        }
        .ex-dot {
          width: 12px; height: 12px;
          border-radius: 50%;
          background: rgba(255,107,53,0.3);
          transition: background 0.4s, transform 0.4s;
        }
        .ex-row.is-active .ex-dot {
          background: #ff6b35;
          transform: scale(1.2);
          box-shadow: 0 0 10px rgba(255,107,53,0.5);
        }

        /* ── Date badge ────────────────────────────────────── */
        .ex-date-badge {
          margin-top: 10px;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,107,53,0.45);
          white-space: nowrap;
          transition: color 0.4s;
          text-align: center;
        }
        .ex-row.is-active .ex-date-badge { color: #ff9a6c; }

        /* ── Card ──────────────────────────────────────────── */
        .ex-card {
          background: #111;
          border: 1px solid rgba(255,107,53,0.08);
          border-radius: 20px;
          padding: 2rem;
          position: relative;
          overflow: hidden;
          cursor: default;
          transition: border-color 0.4s, background 0.4s, box-shadow 0.4s;
          margin-top: 0.75rem;
        }
        .ex-row.is-active .ex-card {
          border-color: rgba(255,107,53,0.22);
          background: #151515;
          box-shadow: 0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,107,53,0.06);
        }

        /* card corner triangle */
        .ex-card::before {
          content: '';
          position: absolute;
          top: 0; right: 0;
          width: 0; height: 0;
          border-style: solid;
          border-width: 0 52px 52px 0;
          border-color: transparent rgba(255,107,53,0) transparent transparent;
          transition: border-color 0.4s;
        }
        .ex-row.is-active .ex-card::before {
          border-color: transparent rgba(255,107,53,0.1) transparent transparent;
        }

        /* bottom accent bar */
        .ex-card::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          height: 2px; width: 0;
          background: linear-gradient(90deg, #ff6b35, #ffaa70);
          transition: width 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .ex-row.is-active .ex-card::after { width: 100%; }

        /* card index */
        .ex-card-index {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255,107,53,0.3);
          margin-bottom: 0.75rem;
          transition: color 0.3s;
        }
        .ex-row.is-active .ex-card-index { color: rgba(255,107,53,0.65); }

        .ex-card-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.15rem;
          font-weight: 700;
          color: #f5f0eb;
          line-height: 1.25;
          letter-spacing: -0.01em;
          margin-bottom: 0.3rem;
          transition: color 0.3s;
        }
        .ex-row.is-active .ex-card-title { color: #fff; }

        .ex-card-company {
          font-size: 0.82rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #ff9a6c;
          margin-bottom: 1rem;
          opacity: 0.7;
          transition: opacity 0.3s;
        }
        .ex-row.is-active .ex-card-company { opacity: 1; }

        .ex-card-desc {
          font-size: 0.88rem;
          line-height: 1.75;
          color: rgba(245,240,235,0.4);
          font-weight: 300;
          transition: color 0.3s;
        }
        .ex-row.is-active .ex-card-desc { color: rgba(245,240,235,0.62); }

        /* ── Left / Right placement ────────────────────────── */
        .ex-col-left  { padding-right: 1.5rem; }
        .ex-col-right { padding-left:  1.5rem; }

        /* card that belongs on the left: its arrow points RIGHT (toward spine) */
        .ex-col-left .ex-card  { }
        /* card on the right: arrow points LEFT */
        .ex-col-right .ex-card { }

        /* horizontal connector line from card to spine */
        .ex-connector {
          position: absolute;
          top: calc(1.5rem + 20px); /* aligns with dot center */
          height: 1px;
          background: rgba(255,107,53,0.15);
          transition: background 0.4s;
          pointer-events: none;
          z-index: 1;
        }
        .ex-row.is-active .ex-connector { background: rgba(255,107,53,0.35); }
        .ex-connector-left  { right: 0; width: 1.5rem; }
        .ex-connector-right { left: 0;  width: 1.5rem; }

        /* ── Empty placeholder col ─────────────────────────── */
        .ex-col-empty { }

        /* ── Divider ───────────────────────────────────────── */
        .ex-divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,107,53,0.2), transparent);
        }

        /* ── Mobile ────────────────────────────────────────── */
        @media (max-width: 768px) {
          .ex-section  { padding: 5rem 0 6rem; }
          .ex-inner    { padding: 0 1.25rem; }
          .ex-title    { font-size: clamp(1.75rem, 7.5vw, 2.4rem); margin-bottom: 2.5rem; }
          .ex-ghost    { display: none; }

          /* Collapse to single left-aligned timeline */
          .ex-spine { left: 20px; transform: none; }

          .ex-row {
            grid-template-columns: 40px 1fr;
            grid-template-rows: auto;
            gap: 0;
            margin-bottom: 2.5rem;
          }

          /* Node goes to col 1 */
          .ex-node {
            grid-column: 1;
            grid-row: 1;
            padding-top: 0.5rem;
            align-items: center;
          }
          .ex-dot-ring { width: 32px; height: 32px; }
          .ex-dot      { width: 10px; height: 10px; }
          .ex-date-badge { display: none; }

          /* Card always in col 2 */
          .ex-col-left,
          .ex-col-right,
          .ex-col-empty {
            display: none;
          }

          .ex-card-mobile {
            grid-column: 2;
            grid-row: 1;
            padding-left: 1rem;
            display: block !important;
          }

          .ex-card {
            padding: 1.5rem;
            border-radius: 14px;
          }

          .ex-connector { display: none; }
        }

        @media (max-width: 380px) {
          .ex-card-title { font-size: 1rem; }
          .ex-card-desc  { font-size: 0.83rem; }
        }
      `}</style>

      <div className="ex-divider" />

      <section id="experience" className="ex-section">
        <div className="ex-blob ex-blob-1" />
        <div className="ex-blob ex-blob-2" />
        <div className="ex-ghost">EXP</div>

        <div className="ex-inner">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            <div className="ex-eyebrow">
              <span className="ex-eyebrow-line" />
              Career journey
            </div>
            <h2 className="ex-title">
              My Work <em>Experience</em>
            </h2>
          </motion.div>

          {/* Timeline */}
          <div className="ex-timeline">
            <div className="ex-spine" />

            {experiences.map((exp, index) => {
              const isLeft = exp.position === 'left';
              const isActive = activeIndex === index;

              const Card = (
                <div className="ex-card">
                  <div className="ex-card-index">{String(index + 1).padStart(2, '0')}</div>
                  <div className="ex-card-title">{exp.title}</div>
                  <div className="ex-card-company">{exp.company}</div>
                  <div className="ex-card-desc">{exp.description}</div>
                </div>
              );

              return (
                <motion.div
                  key={index}
                  className={`ex-row${isActive ? ' is-active' : ''}`}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true, margin: '-60px' }}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                >
                  {/* ── Desktop left card or empty ── */}
                  {isLeft ? (
                    <div className="ex-col-left" style={{ position: 'relative' }}>
                      {Card}
                      <div className="ex-connector ex-connector-left" />
                    </div>
                  ) : (
                    <div className="ex-col-empty" />
                  )}

                  {/* ── Centre node ── */}
                  <div className="ex-node">
                    <div className="ex-dot-ring">
                      <div className="ex-dot" />
                    </div>
                    <div className="ex-date-badge">{exp.date}</div>
                  </div>

                  {/* ── Desktop right card or empty ── */}
                  {!isLeft ? (
                    <div className="ex-col-right" style={{ position: 'relative' }}>
                      <div className="ex-connector ex-connector-right" />
                      {Card}
                    </div>
                  ) : (
                    <div className="ex-col-empty" />
                  )}

                  {/* ── Mobile card (always visible, single col) ── */}
                  <div className="ex-card-mobile" style={{ display: 'none', paddingLeft: '1rem' }}>
                    <div className="ex-card-index">{String(index + 1).padStart(2, '0')}</div>
                    <div className="ex-card-title">{exp.title}</div>
                    <div className="ex-card-company">{exp.company} · {exp.date}</div>
                    <div className="ex-card-desc">{exp.description}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>
    </>
  );
};

export default ExperienceSection;