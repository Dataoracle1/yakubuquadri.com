import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { motion, AnimatePresence } from 'framer-motion';
import { navLinks } from '../data/siteData';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500&display=swap');

        .hd-root {
          font-family: 'DM Sans', sans-serif;
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }

        /* Scrolled state: glass pill */
        .hd-root.is-scrolled {
          padding: 0.5rem 1rem;
        }

        .hd-bar {
          background: rgba(6,6,6,0.0);
          transition: background 0.4s, backdrop-filter 0.4s, box-shadow 0.4s, border-radius 0.4s, margin 0.4s, padding 0.4s;
          padding: 1.25rem 2rem;
          border-radius: 0;
          border: 1px solid transparent;
        }
        .hd-root.is-scrolled .hd-bar {
          background: rgba(10,10,10,0.85);
          backdrop-filter: blur(20px) saturate(1.4);
          -webkit-backdrop-filter: blur(20px) saturate(1.4);
          box-shadow: 0 8px 40px rgba(0,0,0,0.5), 0 1px 0 rgba(255,107,53,0.1);
          border-radius: 100px;
          border-color: rgba(255,107,53,0.08);
          padding: 0.65rem 1.5rem;
          max-width: 900px;
          margin: 0 auto;
        }

        .hd-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        /* Logo */
        .hd-logo {
          font-family: 'Playfair Display', serif;
          font-size: 1.5rem;
          font-weight: 900;
          font-style: italic;
          color: #f5f0eb;
          letter-spacing: -0.03em;
          cursor: pointer;
          text-decoration: none;
          line-height: 1;
        }
        .hd-logo em {
          background: linear-gradient(135deg, #ff6b35, #ffaa70);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-style: normal;
        }

        /* Desktop nav */
        .hd-nav {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          list-style: none;
          padding: 0; margin: 0;
        }

        .hd-nav-link {
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.04em;
          color: rgba(245,240,235,0.5);
          cursor: pointer;
          padding: 7px 14px;
          border-radius: 100px;
          transition: color 0.3s, background 0.3s;
          white-space: nowrap;
        }
        .hd-nav-link:hover {
          color: #f5f0eb;
          background: rgba(255,107,53,0.08);
        }
        .hd-nav-link.is-active {
          color: #ff9a6c;
        }

        /* Hire Me CTA */
        .hd-cta {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.06em;
          color: #fff;
          background: #ff6b35;
          border: none;
          padding: 9px 22px;
          border-radius: 100px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          box-shadow: 0 4px 20px rgba(255,107,53,0.3);
          white-space: nowrap;
        }
        .hd-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(255,107,53,0.45);
          background: #ff8050;
        }

        /* Hamburger */
        .hd-hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
          padding: 6px;
          border: none;
          background: transparent;
          border-radius: 8px;
          transition: background 0.3s;
        }
        .hd-hamburger:hover { background: rgba(255,107,53,0.08); }
        .hd-hamburger span {
          width: 22px; height: 1.5px;
          background: rgba(245,240,235,0.7);
          border-radius: 2px;
          display: block;
          transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
          transform-origin: center;
        }
        .hd-hamburger.is-open span:nth-child(1) {
          transform: translateY(6.5px) rotate(45deg);
        }
        .hd-hamburger.is-open span:nth-child(2) {
          opacity: 0; transform: scaleX(0);
        }
        .hd-hamburger.is-open span:nth-child(3) {
          transform: translateY(-6.5px) rotate(-45deg);
        }

        /* Mobile menu */
        .hd-mobile {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(6,6,6,0.97);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          z-index: 99;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }
        .hd-mobile-link {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.8rem, 6vw, 2.5rem);
          font-weight: 700;
          font-style: italic;
          color: rgba(245,240,235,0.5);
          cursor: pointer;
          padding: 0.5rem 1.5rem;
          transition: color 0.3s;
          letter-spacing: -0.02em;
        }
        .hd-mobile-link:hover { color: #f5f0eb; }
        .hd-mobile-cta {
          margin-top: 1.5rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 1rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #fff;
          background: #ff6b35;
          border: none;
          padding: 14px 40px;
          border-radius: 100px;
          cursor: pointer;
          box-shadow: 0 8px 30px rgba(255,107,53,0.4);
        }
        .hd-mobile-close {
          position: absolute;
          top: 1.5rem; right: 1.5rem;
          background: transparent;
          border: 1px solid rgba(255,107,53,0.2);
          color: rgba(245,240,235,0.5);
          width: 44px; height: 44px;
          border-radius: 50%;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.3s;
        }
        .hd-mobile-close:hover {
          border-color: rgba(255,107,53,0.5);
          color: #f5f0eb;
        }

        @media (max-width: 767px) {
          .hd-nav, .hd-cta { display: none; }
          .hd-hamburger { display: flex; }
          .hd-root.is-scrolled .hd-bar { border-radius: 20px; }
        }
      `}</style>

      <div className={`hd-root${scrolled ? ' is-scrolled' : ''}`}>
        <div className="hd-bar">
          <div className="hd-inner">
            <Link to="home" smooth duration={500}>
              <span className="hd-logo">Q<em>dev</em></span>
            </Link>

            {/* Desktop */}
            <ul className="hd-nav">
              {navLinks.map((link, i) => (
                <li key={i}>
                  <Link
                    to={link.url}
                    smooth
                    duration={500}
                    offset={-70}
                    className="hd-nav-link"
                    activeClass="is-active"
                    spy
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>

            <Link to="contact" smooth duration={500} offset={-70}>
              <button className="hd-cta">Hire Me</button>
            </Link>

            {/* Hamburger */}
            <button
              className={`hd-hamburger${isOpen ? ' is-open' : ''}`}
              onClick={() => setIsOpen(o => !o)}
              aria-label="Toggle menu"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="hd-mobile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button className="hd-mobile-close" onClick={() => setIsOpen(false)} aria-label="Close menu">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>

            {navLinks.map((link, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.07 }}
              >
                <Link
                  to={link.url}
                  smooth
                  duration={500}
                  offset={-70}
                  className="hd-mobile-link"
                  onClick={() => setIsOpen(false)}
                >
                  {link.text}
                </Link>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: navLinks.length * 0.07 }}
            >
              <Link to="contact" smooth duration={500} offset={-70} onClick={() => setIsOpen(false)}>
                <button className="hd-mobile-cta">Hire Me</button>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;