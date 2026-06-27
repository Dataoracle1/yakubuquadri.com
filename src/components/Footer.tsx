import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { socialLinks, footerColumns } from '../data/siteData';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && /\S+@\S+\.\S+/.test(email)) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 4000);
    }
  };

  const year = new Date().getFullYear();

  return (
    <>
      <style>{`


        .ft-root {
          font-family: 'DM Sans', sans-serif;
          background: #060606;
          color: #f5f0eb;
          position: relative;
          overflow: hidden;
        }

        /* Top orange gradient rule */
        .ft-top-rule {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,107,53,0.35), transparent);
        }

        .ft-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(140px);
          pointer-events: none;
        }
        .ft-blob-1 {
          width: 600px; height: 400px;
          background: radial-gradient(circle, rgba(255,107,53,0.07) 0%, transparent 70%);
          top: -100px; left: -100px;
        }
        .ft-blob-2 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(255,150,70,0.05) 0%, transparent 70%);
          bottom: 0; right: 10%;
        }

        .ft-ghost {
          position: absolute;
          bottom: -0.08em; right: -0.04em;
          font-family: 'Playfair Display', serif;
          font-size: clamp(100px, 16vw, 240px);
          font-weight: 900;
          color: transparent;
          -webkit-text-stroke: 1px rgba(255,107,53,0.04);
          pointer-events: none;
          user-select: none;
          letter-spacing: -0.04em;
          line-height: 1;
        }

        .ft-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 5rem 2rem 2rem;
          position: relative;
          z-index: 1;
        }

        /* ── Big logo band ── */
        .ft-brand {
          margin-bottom: 4rem;
          padding-bottom: 4rem;
          border-bottom: 1px solid rgba(255,107,53,0.08);
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 2rem;
        }
        .ft-logo {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          font-weight: 900;
          letter-spacing: -0.04em;
          line-height: 1;
          color: #f5f0eb;
          font-style: italic;
        }
        .ft-logo em {
          background: linear-gradient(135deg, #ff6b35 0%, #ffaa70 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .ft-tagline {
          font-size: 0.9rem;
          color: rgba(245,240,235,0.55);
          font-weight: 300;
          max-width: 320px;
          line-height: 1.7;
          text-align: right;
        }

        /* ── Columns ── */
        .ft-cols {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.4fr;
          gap: 3rem;
          margin-bottom: 4rem;
        }

        .ft-col-heading {
          font-family: 'Playfair Display', serif;
          font-size: 1rem;
          font-weight: 700;
          color: #f5f0eb;
          margin-bottom: 1.5rem;
          position: relative;
          padding-bottom: 0.75rem;
        }
        .ft-col-heading::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 24px; height: 1px;
          background: #ff6b35;
        }

        /* About col */
        .ft-about-text {
          font-size: 0.88rem;
          line-height: 1.8;
          color: rgba(245,240,235,0.6);
          font-weight: 300;
          margin-bottom: 1.5rem;
        }
        .ft-socials {
          display: flex;
          gap: 0.6rem;
        }
        .ft-social {
          width: 38px; height: 38px;
          border-radius: 50%;
          border: 1px solid rgba(255,107,53,0.15);
          background: rgba(255,107,53,0.05);
          display: flex; align-items: center; justify-content: center;
          color: rgba(245,240,235,0.45);
          cursor: pointer;
          transition: all 0.3s;
          text-decoration: none;
        }
        .ft-social:hover {
          border-color: rgba(255,107,53,0.45);
          background: rgba(255,107,53,0.12);
          color: #ff9a6c;
          transform: translateY(-2px);
        }

        /* Links cols */
        .ft-links {
          list-style: none;
          padding: 0; margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .ft-link {
          font-size: 0.88rem;
          color: rgba(245,240,235,0.6);
          text-decoration: none;
          cursor: pointer;
          transition: color 0.3s;
          font-weight: 300;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .ft-link::before {
          content: '';
          width: 0;
          height: 1px;
          background: #ff6b35;
          transition: width 0.3s;
          display: inline-block;
        }
        .ft-link:hover {
          color: rgba(245,240,235,0.8);
        }
        .ft-link:hover::before { width: 12px; }

        /* Newsletter col */
        .ft-nl-text {
          font-size: 0.88rem;
          line-height: 1.75;
          color: rgba(245,240,235,0.6);
          font-weight: 300;
          margin-bottom: 1.25rem;
        }
        .ft-nl-form {
          display: flex;
          gap: 0;
          border: 1px solid rgba(255,107,53,0.2);
          border-radius: 100px;
          overflow: hidden;
          background: rgba(255,107,53,0.04);
          transition: border-color 0.3s;
        }
        .ft-nl-form:focus-within {
          border-color: rgba(255,107,53,0.45);
        }
        .ft-nl-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          padding: 11px 18px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          color: #f5f0eb;
          min-width: 0;
        }
        .ft-nl-input::placeholder { color: rgba(245,240,235,0.25); }
        .ft-nl-btn {
          background: #ff6b35;
          border: none;
          padding: 0 18px;
          cursor: pointer;
          color: #fff;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.3s;
          flex-shrink: 0;
        }
        .ft-nl-btn:hover { background: #ff8555; }
        .ft-success {
          font-size: 13px;
          color: rgba(34,197,94,0.8);
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 11px 0;
        }

        /* ── Bottom bar ── */
        .ft-bottom {
          border-top: 1px solid rgba(255,107,53,0.06);
          padding: 1.5rem 0 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .ft-copy {
          font-size: 12px;
          color: rgba(245,240,235,0.4);
          letter-spacing: 0.04em;
        }
        .ft-copy em {
          color: rgba(255,107,53,0.5);
          font-style: normal;
        }
        .ft-back-top {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(245,240,235,0.3);
          cursor: pointer;
          border: none;
          background: transparent;
          transition: color 0.3s;
          padding: 0;
        }
        .ft-back-top:hover { color: #ff9a6c; }
        .ft-back-top svg { transition: transform 0.3s; }
        .ft-back-top:hover svg { transform: translateY(-3px); }

        @media (max-width: 900px) {
          .ft-cols { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 768px) {
          .ft-inner { padding: 4rem 1.25rem 1.5rem; }
          .ft-brand { flex-direction: column; align-items: flex-start; margin-bottom: 3rem; padding-bottom: 3rem; }
          .ft-tagline { text-align: left; }
          .ft-cols { grid-template-columns: 1fr; gap: 2rem; margin-bottom: 3rem; }
          .ft-ghost { display: none; }
          .ft-bottom { flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      <div className="ft-root">
        <div className="ft-top-rule" />
        <div className="ft-blob ft-blob-1" />
        <div className="ft-blob ft-blob-2" />
        <div className="ft-ghost">QDEV</div>

        <div className="ft-inner">
          {/* Brand band */}
          <motion.div
            className="ft-brand"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            <div className="ft-logo">
              Q<em>dev</em>
            </div>
            <p className="ft-tagline">
              Building scalable, high-performance web applications with clean architecture and great user experiences.
            </p>
          </motion.div>

          {/* Columns */}
          <motion.div
            className="ft-cols"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
            }}
          >
            {/* About */}
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}>
              <div className="ft-col-heading">About</div>
              <p className="ft-about-text">
                Professional full-stack developer with a passion for creating meaningful digital experiences that solve real business problems.
              </p>
              <div className="ft-socials">
                {socialLinks.map((link, i) => (
                  <motion.a
                    key={i}
                    href={link.url}
                    className="ft-social"
                    aria-label={link.platform}
                    whileHover={{ y: -2 }}
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Link columns */}
            {footerColumns.map((col, i) => (
              <motion.div key={i} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}>
                <div className="ft-col-heading">{col.title}</div>
                <ul className="ft-links">
                  {col.links.map((link, j) => (
                    <li key={j}>
                      <a href={link.url} className="ft-link">{link.text}</a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}

            {/* Newsletter */}
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}>
              <div className="ft-col-heading">Newsletter</div>
              <p className="ft-nl-text">
                Design tips, project updates, and insights — straight to your inbox.
              </p>
              {isSubscribed ? (
                <div className="ft-success">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                  You're subscribed!
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="ft-nl-form">
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="ft-nl-input"
                    required
                  />
                  <button type="submit" className="ft-nl-btn" aria-label="Subscribe">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13"/>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                    </svg>
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>

          {/* Bottom bar */}
          <div className="ft-bottom">
            <p className="ft-copy">
              © {year} — All rights reserved | <em>Yakubu Quadri</em>
            </p>
            <button
              className="ft-back-top"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Back to top
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 12V2M2 7l5-5 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;