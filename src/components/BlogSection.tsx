import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { blogPosts } from '../data/siteData';

const BlogSection: React.FC = () => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500&display=swap');

        .bl-section {
          font-family: 'DM Sans', sans-serif;
          background: #0a0a0a;
          color: #f5f0eb;
          padding: 7rem 0 8rem;
          position: relative;
          overflow: hidden;
        }

        .bl-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(130px);
          pointer-events: none;
        }
        .bl-blob-1 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(255,107,53,0.09) 0%, transparent 70%);
          top: -150px; right: -100px;
        }
        .bl-blob-2 {
          width: 350px; height: 350px;
          background: radial-gradient(circle, rgba(255,150,80,0.06) 0%, transparent 70%);
          bottom: -60px; left: 5%;
        }
        .bl-ghost {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          font-family: 'Playfair Display', serif;
          font-size: clamp(120px, 20vw, 280px);
          font-weight: 900;
          color: transparent;
          -webkit-text-stroke: 1px rgba(255,107,53,0.03);
          white-space: nowrap;
          pointer-events: none;
          user-select: none;
          letter-spacing: -0.04em;
          line-height: 1;
        }

        .bl-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          position: relative;
          z-index: 1;
        }

        .bl-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 3.5rem;
          flex-wrap: wrap;
          gap: 1.5rem;
        }
        .bl-eyebrow {
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
        .bl-eyebrow-line {
          width: 32px; height: 1px;
          background: #ff6b35;
          display: inline-block;
        }
        .bl-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 4vw, 3.2rem);
          font-weight: 900;
          line-height: 1.08;
          letter-spacing: -0.03em;
          color: #f5f0eb;
        }
        .bl-title em {
          font-style: italic;
          background: linear-gradient(135deg, #ff6b35 0%, #ffaa70 60%, #ff6b35 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: bl-shimmer 4s linear infinite;
        }
        @keyframes bl-shimmer {
          0%   { background-position: 0% center; }
          100% { background-position: 200% center; }
        }

        /* View all link */
        .bl-viewall {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(245,240,235,0.45);
          text-decoration: none;
          cursor: pointer;
          transition: color 0.3s;
          white-space: nowrap;
          align-self: flex-end;
          padding-bottom: 0.3rem;
          border: none;
          background: transparent;
        }
        .bl-viewall:hover { color: #ff9a6c; }
        .bl-viewall svg { transition: transform 0.3s; }
        .bl-viewall:hover svg { transform: translateX(4px); }

        /* ── Grid ── */
        .bl-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        /* ── Card ── */
        .bl-card {
          background: #0f0f0f;
          border: 1px solid rgba(255,107,53,0.08);
          border-radius: 20px;
          overflow: hidden;
          cursor: pointer;
          transition: border-color 0.4s, box-shadow 0.4s;
          position: relative;
        }
        .bl-card.is-hovered {
          border-color: rgba(255,107,53,0.22);
          box-shadow: 0 24px 64px rgba(0,0,0,0.5);
        }
        .bl-card::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          height: 2px; width: 0;
          background: linear-gradient(90deg, #ff6b35, #ffaa70);
          transition: width 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .bl-card.is-hovered::after { width: 100%; }

        /* Image */
        .bl-img-wrap {
          position: relative;
          overflow: hidden;
          aspect-ratio: 16/10;
        }
        .bl-img {
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
          display: block;
        }
        .bl-card.is-hovered .bl-img { transform: scale(1.06); }

        /* Image overlay */
        .bl-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent 40%, rgba(10,10,10,0.7) 100%);
        }

        /* Category badge on image */
        .bl-cat {
          position: absolute;
          top: 1rem; left: 1rem;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #fff;
          background: rgba(255,107,53,0.85);
          padding: 4px 12px;
          border-radius: 100px;
          z-index: 1;
          backdrop-filter: blur(4px);
        }

        /* Body */
        .bl-body {
          padding: 1.5rem;
        }
        .bl-date {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,107,53,0.55);
          margin-bottom: 0.75rem;
          transition: color 0.3s;
        }
        .bl-card.is-hovered .bl-date { color: #ff9a6c; }

        .bl-post-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.1rem;
          font-weight: 700;
          color: #f5f0eb;
          line-height: 1.3;
          letter-spacing: -0.01em;
          margin-bottom: 0.75rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          transition: color 0.3s;
        }
        .bl-card.is-hovered .bl-post-title { color: #fff; }

        .bl-excerpt {
          font-size: 0.87rem;
          line-height: 1.75;
          color: rgba(245,240,235,0.38);
          font-weight: 300;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          margin-bottom: 1.25rem;
          transition: color 0.3s;
        }
        .bl-card.is-hovered .bl-excerpt { color: rgba(245,240,235,0.56); }

        .bl-read {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(255,107,53,0.5);
          transition: color 0.3s, gap 0.3s;
        }
        .bl-card.is-hovered .bl-read {
          color: #ff9a6c;
          gap: 10px;
        }
        .bl-read svg { transition: transform 0.3s; }
        .bl-card.is-hovered .bl-read svg { transform: translateX(3px); }

        /* ── Footer CTA ── */
        .bl-footer {
          display: flex;
          justify-content: center;
          margin-top: 3.5rem;
        }
        .bl-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: transparent;
          color: #f5f0eb;
          padding: 14px 36px;
          border-radius: 100px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          cursor: pointer;
          border: 1px solid rgba(245,240,235,0.2);
          transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
          overflow: hidden;
        }
        .bl-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #ff6b35;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          z-index: 0;
          border-radius: 100px;
        }
        .bl-btn:hover {
          border-color: #ff6b35;
          color: #fff;
          transform: translateY(-3px);
          box-shadow: 0 20px 50px rgba(255,107,53,0.35);
        }
        .bl-btn:hover::before { transform: scaleX(1); }
        .bl-btn span, .bl-btn svg { position: relative; z-index: 1; }

        .bl-divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,107,53,0.2), transparent);
        }

        @media (max-width: 900px) {
          .bl-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .bl-section { padding: 5rem 0 6rem; }
          .bl-inner { padding: 0 1.25rem; }
          .bl-header { flex-direction: column; align-items: flex-start; gap: 1rem; margin-bottom: 2.5rem; }
          .bl-title { font-size: clamp(1.75rem, 7.5vw, 2.4rem); }
          .bl-ghost { display: none; }
          .bl-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 380px) {
          .bl-post-title { font-size: 1rem; }
          .bl-excerpt { font-size: 0.82rem; }
        }
      `}</style>

      <div className="bl-divider" />

      <section className="bl-section">
        <div className="bl-blob bl-blob-1" />
        <div className="bl-blob bl-blob-2" />
        <div className="bl-ghost">BLOG</div>

        <div className="bl-inner">
          <motion.div
            className="bl-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            <div>
              <div className="bl-eyebrow">
                <span className="bl-eyebrow-line" />
                Thoughts & insights
              </div>
              <h2 className="bl-title">
                From my <em>Blog</em>
              </h2>
            </div>
            <button className="bl-viewall">
              View all posts
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </motion.div>

          <motion.div
            className="bl-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
            }}
          >
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.id}
                className={`bl-card${hovered === post.id ? ' is-hovered' : ''}`}
                onMouseEnter={() => setHovered(post.id)}
                onMouseLeave={() => setHovered(null)}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
                }}
              >
                <div className="bl-img-wrap">
                  <img src={post.image} alt={post.title} className="bl-img" />
                  <div className="bl-img-overlay" />
                  <span className="bl-cat">Article</span>
                </div>
                <div className="bl-body">
                  <div className="bl-date">{post.date}</div>
                  <h3 className="bl-post-title">{post.title}</h3>
                  <p className="bl-excerpt">{post.excerpt}</p>
                  <div className="bl-read">
                    Read more
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M1 6h10M6 1l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="bl-footer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <button className="bl-btn">
              <span>View All Posts</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default BlogSection;