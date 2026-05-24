import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { tags as initialTags } from '../data/siteData';
import { Tag } from '../types';

const TagsSection: React.FC = () => {
  const [tags, setTags] = useState<Tag[]>(initialTags);

  const handleTagClick = (tagId: number) => {
    setTags(tags.map(tag => ({
      ...tag,
      isActive: tag.id === tagId
    })));
  };

  return (
    <>
      <style>{`
       
        .tg-section {
          font-family: 'DM Sans', sans-serif;
          background: #0d0d0d;
          color: #f5f0eb;
          padding: 6rem 0 7rem;
          position: relative;
          overflow: hidden;
        }

        .tg-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(130px);
          pointer-events: none;
        }
        .tg-blob-1 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(255,107,53,0.08) 0%, transparent 70%);
          top: -150px; left: 50%;
          transform: translateX(-50%);
        }

        .tg-inner {
          max-width: 1000px;
          margin: 0 auto;
          padding: 0 2rem;
          position: relative;
          z-index: 1;
          text-align: center;
        }

        .tg-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #ff9a6c;
          margin-bottom: 1.25rem;
          justify-content: center;
        }
        .tg-eyebrow-line {
          width: 32px; height: 1px;
          background: #ff6b35;
          display: inline-block;
        }
        .tg-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 4vw, 3.2rem);
          font-weight: 900;
          line-height: 1.08;
          letter-spacing: -0.03em;
          color: #f5f0eb;
          margin-bottom: 3.5rem;
        }
        .tg-title em {
          font-style: italic;
          background: linear-gradient(135deg, #ff6b35 0%, #ffaa70 60%, #ff6b35 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: tg-shimmer 4s linear infinite;
        }
        @keyframes tg-shimmer {
          0%   { background-position: 0% center; }
          100% { background-position: 200% center; }
        }

        .tg-cloud {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.75rem;
          align-items: center;
        }

        .tg-tag {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.06em;
          padding: 9px 20px;
          border-radius: 100px;
          cursor: pointer;
          border: 1px solid rgba(255,107,53,0.15);
          background: rgba(255,107,53,0.05);
          color: rgba(245,240,235,0.55);
          transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
          position: relative;
          overflow: hidden;
          user-select: none;
        }
        .tg-tag::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #ff6b35, #ffaa70);
          opacity: 0;
          transition: opacity 0.3s;
          border-radius: 100px;
        }
        .tg-tag span {
          position: relative;
          z-index: 1;
        }
        .tg-tag:hover {
          border-color: rgba(255,107,53,0.4);
          color: rgba(245,240,235,0.85);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(255,107,53,0.15);
        }
        .tg-tag.is-active {
          border-color: transparent;
          color: #fff;
          box-shadow: 0 8px 28px rgba(255,107,53,0.35);
        }
        .tg-tag.is-active::before { opacity: 1; }

        /* Size variation for visual interest */
        .tg-tag:nth-child(3n+1) { font-size: 14px; }
        .tg-tag:nth-child(5n+2) { font-size: 12px; }

        .tg-divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,107,53,0.2), transparent);
        }

        @media (max-width: 768px) {
          .tg-section { padding: 5rem 0 6rem; }
          .tg-inner { padding: 0 1.25rem; }
          .tg-title { font-size: clamp(1.75rem, 7.5vw, 2.4rem); margin-bottom: 2.5rem; }
        }
      `}</style>

      <div className="tg-divider" />

      <section className="tg-section">
        <div className="tg-blob tg-blob-1" />

        <div className="tg-inner">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            <div className="tg-eyebrow">
              <span className="tg-eyebrow-line" />
              Skills & tools
            </div>
            <h2 className="tg-title">
              My <em>Expertise</em>
            </h2>
          </motion.div>

          <motion.div
            className="tg-cloud"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {tags.map((tag, index) => (
              <motion.button
                key={tag.id}
                className={`tg-tag${tag.isActive ? ' is-active' : ''}`}
                onClick={() => handleTagClick(tag.id)}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                whileHover={{ y: -2 }}
              >
                <span>{tag.name}</span>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default TagsSection;