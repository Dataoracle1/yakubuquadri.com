// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { portfolioItems } from '../data/siteData';

// const PortfolioSection: React.FC = () => {
//   const [hoveredItem, setHoveredItem] = useState<number | null>(null);

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.5 }
//     }
//   };

//   return (
//     <section id="portfolio" className="py-20 bg-white">
//       <div className="container mx-auto px-6">
//         <div className="text-center mb-16">
//           <motion.h2 
//             className="text-3xl font-bold relative inline-block pb-3"
//             initial={{ opacity: 0, y: -20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             viewport={{ once: true }}
//           >
//             Let's Have a Look at my Portfolio
//             <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-orange"></span>
//           </motion.h2>
//         </div>
        
//         <motion.div 
//           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
//           variants={containerVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//         >
//           {portfolioItems.map((item) => (
//             <motion.div 
//               key={item.id}
//               className="relative overflow-hidden rounded-lg shadow-md cursor-pointer group"
//               variants={itemVariants}
//               onMouseEnter={() => setHoveredItem(item.id)}
//               onMouseLeave={() => setHoveredItem(null)}
//             >
//               <img 
//                 src={item.image} 
//                 alt={item.title}
//                 className="w-full h-64 object-cover transition-all duration-300 group-hover:scale-110"
//               />
              
//               <motion.div 
//                 className="absolute inset-0 bg-orange bg-opacity-80 flex items-center justify-center p-6"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: hoveredItem === item.id ? 1 : 0 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <div className="text-center">
//                   <h3 className="text-white text-xl font-bold mb-2">{item.title}</h3>
//                   <span className="text-white text-sm px-4 py-1 border border-white rounded-full inline-block">
//                     {item.category}
//                   </span>
//                 </div>
//               </motion.div>
//             </motion.div>
//           ))}
//         </motion.div>
        
//         <div className="text-center mt-12">
//           <motion.button 
//             className="bg-orange text-white px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all duration-300 transform hover:-translate-y-1"
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             transition={{ duration: 0.5, delay: 0.5 }}
//             viewport={{ once: true }}
//           >
//             See More
//           </motion.button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default PortfolioSection;






import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioItems } from '../data/siteData';

const PortfolioSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  // Build filter tabs from unique categories
  const categories = ['All', ...Array.from(new Set(portfolioItems.map(i => i.category)))];

  const filtered = activeFilter === 'All'
    ? portfolioItems
    : portfolioItems.filter(i => i.category === activeFilter);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500&display=swap');

        /* ── Section ───────────────────────────────────────── */
        .pf-section {
          font-family: 'DM Sans', sans-serif;
          background: #0a0a0a;
          color: #f5f0eb;
          padding: 7rem 0 8rem;
          position: relative;
          overflow: hidden;
        }

        /* ── Background ────────────────────────────────────── */
        .pf-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(140px);
          pointer-events: none;
        }
        .pf-blob-1 {
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(255,107,53,0.09) 0%, transparent 70%);
          top: -200px; right: -150px;
        }
        .pf-blob-2 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(255,150,70,0.06) 0%, transparent 70%);
          bottom: -80px; left: 0;
        }
        .pf-ghost {
          position: absolute;
          bottom: -0.1em; left: -0.05em;
          font-family: 'Playfair Display', serif;
          font-size: clamp(130px, 20vw, 300px);
          font-weight: 900;
          color: transparent;
          -webkit-text-stroke: 1px rgba(255,107,53,0.04);
          pointer-events: none;
          user-select: none;
          letter-spacing: -0.04em;
          line-height: 1;
        }

        /* ── Inner ─────────────────────────────────────────── */
        .pf-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          position: relative;
          z-index: 1;
        }

        /* ── Header ────────────────────────────────────────── */
        .pf-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 3rem;
          flex-wrap: wrap;
          gap: 2rem;
        }
        .pf-eyebrow {
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
        .pf-eyebrow-line {
          width: 32px; height: 1px;
          background: #ff6b35;
        }
        .pf-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 4vw, 3.2rem);
          font-weight: 900;
          line-height: 1.08;
          letter-spacing: -0.03em;
          color: #f5f0eb;
        }
        .pf-title em {
          font-style: italic;
          background: linear-gradient(135deg, #ff6b35 0%, #ffaa70 60%, #ff6b35 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: pf-shimmer 4s linear infinite;
        }
        @keyframes pf-shimmer {
          0%   { background-position: 0% center; }
          100% { background-position: 200% center; }
        }

        /* ── Filter tabs ───────────────────────────────────── */
        .pf-filters {
          display: flex;
          align-items: flex-end;
          gap: 0.5rem;
          flex-wrap: wrap;
          padding-bottom: 0.25rem;
        }
        .pf-filter-btn {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 8px 18px;
          border-radius: 100px;
          border: 1px solid rgba(255,107,53,0.2);
          background: transparent;
          color: rgba(245,240,235,0.45);
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
        }
        .pf-filter-btn:hover {
          border-color: rgba(255,107,53,0.5);
          color: rgba(245,240,235,0.8);
        }
        .pf-filter-btn.active {
          background: #ff6b35;
          border-color: #ff6b35;
          color: #fff;
          box-shadow: 0 8px 25px rgba(255,107,53,0.35);
        }

        /* ── Grid ──────────────────────────────────────────── */
        .pf-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin-bottom: 3.5rem;
        }

        /* ── Card ──────────────────────────────────────────── */
        .pf-card {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          cursor: pointer;
          background: #111;
          border: 1px solid rgba(255,107,53,0.08);
          transition: border-color 0.4s, box-shadow 0.4s, transform 0.4s cubic-bezier(0.22,1,0.36,1);
          aspect-ratio: 4/3;
        }
        .pf-card:hover {
          border-color: rgba(255,107,53,0.3);
          box-shadow: 0 30px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,107,53,0.08);
          transform: translateY(-6px) scale(1.01);
        }

        /* Image */
        .pf-card-img {
          width: 100%; height: 100%;
          object-fit: cover;
          object-position: top;
          display: block;
          transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1), filter 0.5s;
          filter: grayscale(20%) brightness(0.85);
        }
        .pf-card:hover .pf-card-img {
          transform: scale(1.08);
          filter: grayscale(0%) brightness(0.65);
        }

        /* Permanent bottom gradient */
        .pf-card-grad {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(10,10,10,0.9) 0%,
            rgba(10,10,10,0.3) 40%,
            transparent 70%
          );
          pointer-events: none;
          z-index: 1;
          transition: opacity 0.4s;
        }
        .pf-card:hover .pf-card-grad {
          background: linear-gradient(
            to top,
            rgba(10,10,10,0.85) 0%,
            rgba(10,10,10,0.5) 50%,
            rgba(255,107,53,0.08) 100%
          );
        }

        /* Bottom info (always visible, slides up on hover) */
        .pf-card-info {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: 1.5rem;
          z-index: 2;
          transform: translateY(6px);
          transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .pf-card:hover .pf-card-info { transform: translateY(0); }

        .pf-card-cat {
          display: inline-block;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #ff9a6c;
          margin-bottom: 0.4rem;
          opacity: 0.8;
          transition: opacity 0.3s;
        }
        .pf-card:hover .pf-card-cat { opacity: 1; }

        .pf-card-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.05rem;
          font-weight: 700;
          color: #f5f0eb;
          line-height: 1.25;
          letter-spacing: -0.01em;
          transition: color 0.3s;
        }
        .pf-card:hover .pf-card-title { color: #fff; }

        /* Arrow that appears on hover */
        .pf-card-arrow {
          position: absolute;
          top: 1.25rem; right: 1.25rem;
          width: 36px; height: 36px;
          border-radius: 50%;
          background: #ff6b35;
          display: flex; align-items: center; justify-content: center;
          z-index: 2;
          opacity: 0;
          transform: scale(0.7) rotate(-45deg);
          transition: opacity 0.35s, transform 0.35s cubic-bezier(0.34,1.56,0.64,1);
          box-shadow: 0 6px 20px rgba(255,107,53,0.45);
        }
        .pf-card:hover .pf-card-arrow {
          opacity: 1;
          transform: scale(1) rotate(0deg);
        }

        /* Index number top-left */
        .pf-card-num {
          position: absolute;
          top: 1.25rem; left: 1.25rem;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.12em;
          color: rgba(245,240,235,0.3);
          z-index: 2;
          transition: color 0.3s;
        }
        .pf-card:hover .pf-card-num { color: rgba(245,240,235,0.6); }

        /* ── See More button ───────────────────────────────── */
        .pf-footer {
          display: flex;
          justify-content: center;
        }
        .pf-btn {
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
        .pf-btn::before {
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
        .pf-btn:hover {
          border-color: #ff6b35;
          color: #fff;
          transform: translateY(-3px);
          box-shadow: 0 20px 50px rgba(255,107,53,0.35);
        }
        .pf-btn:hover::before { transform: scaleX(1); }
        .pf-btn span, .pf-btn svg { position: relative; z-index: 1; }

        /* ── Divider ───────────────────────────────────────── */
        .pf-divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,107,53,0.2), transparent);
        }

        /* ── Mobile ────────────────────────────────────────── */
        @media (max-width: 900px) {
          .pf-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 768px) {
          .pf-section  { padding: 5rem 0 6rem; }
          .pf-inner    { padding: 0 1.25rem; }
          .pf-header   { flex-direction: column; align-items: flex-start; gap: 1.5rem; margin-bottom: 2rem; }
          .pf-title    { font-size: clamp(1.75rem, 7.5vw, 2.4rem); }
          .pf-ghost    { display: none; }
          .pf-filters  { align-items: flex-start; }
          .pf-grid     { grid-template-columns: 1fr; gap: 1rem; }
          .pf-card     { aspect-ratio: 16/10; }
          .pf-card-arrow { opacity: 1; transform: scale(1) rotate(0deg); }
          .pf-card-info  { transform: translateY(0); }
        }

        @media (max-width: 380px) {
          .pf-card-title { font-size: 0.95rem; }
          .pf-filter-btn { font-size: 11px; padding: 7px 14px; }
        }
      `}</style>

      <div className="pf-divider" />

      <section id="portfolio" className="pf-section">
        <div className="pf-blob pf-blob-1" />
        <div className="pf-blob pf-blob-2" />
        <div className="pf-ghost">WORK</div>

        <div className="pf-inner">

          {/* Header + filters */}
          <motion.div
            className="pf-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            <div>
              <div className="pf-eyebrow">
                <span className="pf-eyebrow-line" />
                Selected work
              </div>
              <h2 className="pf-title">
                My <em>Portfolio</em>
              </h2>
            </div>

            <div className="pf-filters">
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`pf-filter-btn${activeFilter === cat ? ' active' : ''}`}
                  onClick={() => setActiveFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Grid */}
          <motion.div
            className="pf-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
            }}
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="pf-card"
                  layout
                  initial={{ opacity: 0, y: 24, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.45, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  onMouseEnter={() => setHovered(item.id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <span className="pf-card-num">{String(index + 1).padStart(2, '0')}</span>

                  <img
                    src={item.image}
                    alt={item.title}
                    className="pf-card-img"
                  />

                  <div className="pf-card-grad" />

                  <div className="pf-card-info">
                    <span className="pf-card-cat">{item.category}</span>
                    <div className="pf-card-title">{item.title}</div>
                  </div>

                  <div className="pf-card-arrow">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 7h10M7 2l5 5-5 5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Footer CTA */}
          <motion.div
            className="pf-footer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <button className="pf-btn">
              <span>See More Projects</span>
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

export default PortfolioSection;