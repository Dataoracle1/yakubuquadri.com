// import React from 'react';
// import { Link } from 'react-scroll';
// import { motion } from 'framer-motion';
// import { heroStats } from '../data/siteData';

// const HeroSection: React.FC = () => {
//   return (
//     <section id="home" className="pt-28 pb-16 md:py-32 bg-light">
//       <div className="container mx-auto px-6">
//         <div className="flex flex-col-reverse md:flex-row items-center justify-between">
//           <motion.div 
//             className="md:w-1/2 mt-12 md:mt-0"
//             initial={{ opacity: 0, x: -30 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8 }}
//           >
//             <span className="bg-gray px-4 py-1 rounded-full text-sm inline-block mb-4">Hello!</span>
//             <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
//               I'm <span className="text-orange">Yakubu Quadri</span>,<br />
//               Full-Stack Developer
//             </h1>
//             <p className="text-text-gray mb-8 max-w-lg italic">
//             Building scalable, high performance web<br/>
//                 applications with clean architecture and <br/>
//                 great user experiences.
//             </p>
            
//             <div className="flex flex-wrap gap-4">
//               <Link
//                 to="portfolio"
//                 smooth={true}
//                 duration={500}
//                 offset={-70}
//                 className="bg-orange text-white px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer inline-block"
//               >
//                 Portfolio
//               </Link>
//               <Link
//                 to="contact"
//                 smooth={true}
//                 duration={500}
//                 offset={-70}
//                 className="bg-transparent text-dark border-2 border-dark px-8 py-3 rounded-full font-semibold hover:bg-dark hover:text-white transition-all duration-300 transform hover:-translate-y-1 cursor-pointer inline-block"
//               >
//                 Hire Me
//               </Link>
//             </div>
            
//             <div className="flex gap-12 mt-12">
//               {heroStats.map((stat, index) => (
//                 <motion.div 
//                   key={index}
//                   className="text-center"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5, delay: 0.6 + (index * 0.2) }}
//                 >
//                   <span className="text-orange text-3xl font-bold block">
//                     {stat.value}
//                   </span>
//                   <span className="text-text-gray text-sm">
//                     {stat.label}
//                   </span>
//                 </motion.div>
//               ))}
//             </div>
//           </motion.div>
          
//           <motion.div 
//             className="md:w-1/2 flex justify-center"
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.8 }}
//           >
          

//             <div className="relative">
//               <img 
//               src="https://i.postimg.cc/jqnmHCsJ/Quan2.png" 
//               alt="Profile" 
//               className="w-74 h-74 md:w-80 md:h-80 rounded-full object-cover object-top shadow-hero"
//                />
//                </div>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;





import React, { useEffect, useRef } from 'react';
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';
import { heroStats } from '../data/siteData';

const HeroSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles: { x: number; y: number; r: number; dx: number; dy: number; alpha: number }[] = [];
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.5,
        dx: (Math.random() - 0.5) * 0.4,
        dy: (Math.random() - 0.5) * 0.4,
        alpha: Math.random() * 0.4 + 0.1,
      });
    }

    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 107, 53, ${p.alpha})`;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

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
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        /* Large decorative text */
        .bg-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-family: 'Playfair Display', serif;
          font-size: clamp(100px, 18vw, 260px);
          font-weight: 900;
          color: transparent;
          -webkit-text-stroke: 1px rgba(255,107,53,0.06);
          white-space: nowrap;
          pointer-events: none;
          user-select: none;
          letter-spacing: -0.04em;
          line-height: 1;
        }

        /* Glow blobs */
        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          pointer-events: none;
        }
        .blob-1 {
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(255,107,53,0.15) 0%, transparent 70%);
          top: -100px;
          right: -100px;
        }
        .blob-2 {
          width: 350px;
          height: 350px;
          background: radial-gradient(circle, rgba(255,180,100,0.08) 0%, transparent 70%);
          bottom: -50px;
          left: 10%;
        }

        /* Horizontal rule accent */
        .accent-line {
          width: 60px;
          height: 2px;
          background: linear-gradient(90deg, #ff6b35, #ffaa70);
          border-radius: 2px;
          margin-bottom: 1.5rem;
        }

        /* Badge */
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
          width: 6px;
          height: 6px;
          background: #ff6b35;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.7); }
        }

        /* Heading */
        .hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.8rem, 5vw, 4.5rem);
          font-weight: 900;
          line-height: 1.05;
          letter-spacing: -0.03em;
          color: #f5f0eb;
          margin-bottom: 1.5rem;
        }
        .hero-title .name {
          background: linear-gradient(135deg, #ff6b35 0%, #ffaa70 60%, #ff6b35 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }
        .hero-title .role {
          font-style: italic;
          color: rgba(245,240,235,0.5);
          font-size: 0.7em;
          display: block;
          font-weight: 700;
          letter-spacing: 0.02em;
          margin-top: 0.2em;
        }
        @keyframes shimmer {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }

        /* Description */
        .hero-desc {
          font-size: 1rem;
          line-height: 1.8;
          color: rgba(245,240,235,0.5);
          font-weight: 300;
          max-width: 420px;
          margin-bottom: 2.5rem;
          letter-spacing: 0.01em;
        }

        /* Buttons */
        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #ff6b35;
          color: #fff;
          padding: 14px 32px;
          border-radius: 100px;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
          text-decoration: none;
          position: relative;
          overflow: hidden;
          border: none;
          outline: none;
        }
        .btn-primary::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.15), transparent);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .btn-primary:hover { transform: translateY(-3px); box-shadow: 0 20px 60px rgba(255,107,53,0.45); }
        .btn-primary:hover::before { opacity: 1; }

        .btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: transparent;
          color: #f5f0eb;
          padding: 13px 32px;
          border-radius: 100px;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
          text-decoration: none;
          border: 1px solid rgba(245,240,235,0.25);
        }
        .btn-secondary:hover {
          background: rgba(245,240,235,0.08);
          border-color: rgba(245,240,235,0.5);
          transform: translateY(-3px);
        }

        /* Stats */
        .stats-row {
          display: flex;
          gap: 2.5rem;
          margin-top: 3rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(245,240,235,0.08);
        }
        .stat-value {
          font-family: 'Playfair Display', serif;
          font-size: 2.2rem;
          font-weight: 900;
          color: #ff6b35;
          line-height: 1;
          display: block;
          letter-spacing: -0.02em;
        }
        .stat-label {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: rgba(245,240,235,0.35);
          margin-top: 6px;
          display: block;
          font-weight: 500;
        }

        /* Image side */
        .image-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Rotating ring */
        .ring {
          position: absolute;
          border-radius: 50%;
          border: 1px dashed rgba(255,107,53,0.3);
          animation: spin 20s linear infinite;
        }
        .ring-1 { width: 360px; height: 360px; }
        .ring-2 { width: 420px; height: 420px; animation-direction: reverse; animation-duration: 30s; border-color: rgba(255,107,53,0.12); }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        .ring-dot {
          position: absolute;
          width: 8px;
          height: 8px;
          background: #ff6b35;
          border-radius: 50%;
          top: -4px;
          left: 50%;
          transform: translateX(-50%);
          box-shadow: 0 0 12px #ff6b35;
        }

        /* Image container */
        .img-container {
          width: 300px;
          height: 300px;
          border-radius: 40% 60% 55% 45% / 45% 55% 60% 40%;
          overflow: hidden;
          position: relative;
          z-index: 2;
          border: 2px solid rgba(255,107,53,0.2);
          box-shadow: 0 0 0 12px rgba(255,107,53,0.04), 0 30px 80px rgba(0,0,0,0.5);
          animation: morph 8s ease-in-out infinite;
        }
        @keyframes morph {
          0%, 100% { border-radius: 40% 60% 55% 45% / 45% 55% 60% 40%; }
          25% { border-radius: 55% 45% 40% 60% / 60% 40% 55% 45%; }
          50% { border-radius: 50% 50% 60% 40% / 40% 60% 50% 50%; }
          75% { border-radius: 45% 55% 50% 50% / 55% 45% 40% 60%; }
        }

        .img-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top;
        }

        /* Floating card */
        .float-card {
          position: absolute;
          background: rgba(20,20,20,0.85);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,107,53,0.2);
          border-radius: 16px;
          padding: 12px 18px;
          z-index: 3;
          box-shadow: 0 20px 50px rgba(0,0,0,0.4);
        }
        .float-card-1 {
          bottom: 20px;
          right: -20px;
          animation: float 4s ease-in-out infinite;
        }
        .float-card-2 {
          top: 30px;
          left: -30px;
          animation: float 5s ease-in-out infinite 1s;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .float-card .card-label {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: rgba(245,240,235,0.4);
          margin-bottom: 4px;
        }
        .float-card .card-value {
          font-family: 'Playfair Display', serif;
          font-size: 1.3rem;
          font-weight: 700;
          color: #ff6b35;
        }

        /* Layout */
        .hero-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: 4rem;
          position: relative;
          z-index: 1;
          width: 100%;
        }

        @media (max-width: 768px) {
          .hero-section {
            min-height: 100svh;
            align-items: flex-start;
            padding-top: 0;
          }

          .hero-inner {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 2rem;
            padding: 5rem 1.25rem 6rem;
          }

          /* Image comes first on mobile */
          .image-wrapper { order: -1; }

          /* Shrink rings + image to fit screen */
          .img-container {
            width: 190px;
            height: 190px;
          }
          .ring-1 { width: 230px; height: 230px; }
          .ring-2 { width: 270px; height: 270px; }

          /* Pull floating cards inward so they don't overflow */
          .float-card { padding: 8px 14px; }
          .float-card-1 {
            bottom: 6px;
            right: 4px;
          }
          .float-card-2 {
            top: 6px;
            left: 4px;
          }
          .float-card .card-value { font-size: 1.1rem; }

          /* Centre badge + accent line */
          .badge {
            margin-left: auto;
            margin-right: auto;
            margin-bottom: 1rem;
          }
          .accent-line {
            margin: 0 auto 1.25rem;
          }

          /* Smaller title on mobile */
          .hero-title {
            font-size: clamp(2rem, 8.5vw, 2.8rem);
            margin-bottom: 1rem;
          }

          .hero-desc {
            font-size: 0.9rem;
            margin: 0 auto 2rem;
          }

          /* Buttons full-width on very small screens */
          .btn-row {
            justify-content: center;
            flex-direction: column;
            align-items: center;
          }
          .btn-primary,
          .btn-secondary {
            width: 100%;
            max-width: 280px;
            justify-content: center;
            padding: 13px 24px;
          }

          /* Stats row */
          .stats-row {
            justify-content: center;
            gap: 1.75rem;
            margin-top: 2rem;
            padding-top: 1.5rem;
          }
          .stat-value { font-size: 1.8rem; }

          /* Hide scroll hint on mobile — saves space */
          .scroll-hint { display: none; }

          /* Shrink background text so it doesn't cause overflow */
          .bg-text { font-size: clamp(70px, 22vw, 120px); }
        }

        /* Extra small phones */
        @media (max-width: 380px) {
          .hero-inner { padding: 4.5rem 1rem 5rem; }
          .img-container { width: 160px; height: 160px; }
          .ring-1 { width: 195px; height: 195px; }
          .ring-2 { width: 230px; height: 230px; }
          .hero-title { font-size: clamp(1.75rem, 9vw, 2.2rem); }
          .stats-row { gap: 1.25rem; }
          .stat-value { font-size: 1.5rem; }
        }

        .btn-row {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          align-items: center;
        }

        /* Scroll indicator */
        .scroll-hint {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          opacity: 0.3;
          z-index: 2;
        }
        .scroll-hint span {
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #f5f0eb;
        }
        .scroll-arrow {
          width: 1px;
          height: 40px;
          background: linear-gradient(to bottom, #f5f0eb, transparent);
          animation: scrollDrop 1.5s ease-in-out infinite;
        }
        @keyframes scrollDrop {
          0% { transform: scaleY(0); transform-origin: top; }
          50% { transform: scaleY(1); transform-origin: top; }
          51% { transform: scaleY(1); transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; }
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
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="badge">
              <span className="badge-dot" />
              Available for work
            </div>

            <div className="accent-line" />

            <h1 className="hero-title">
              <span className="name">Yakubu Quadri</span>
              <span className="role">Full-Stack Developer</span>
            </h1>

            <p className="hero-desc">
              Building scalable, high-performance web applications with clean architecture and unforgettable user experiences.
            </p>

            <div className="btn-row">
              <Link to="portfolio" smooth duration={500} offset={-70}>
                <button className="btn-primary">
                  View Portfolio
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </Link>
              <Link to="contact" smooth duration={500} offset={-70}>
                <button className="btn-secondary">
                  Hire Me
                </button>
              </Link>
            </div>

            <div className="stats-row">
              {heroStats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.15 }}
                >
                  <span className="stat-value">{stat.value}</span>
                  <span className="stat-label">{stat.label}</span>
                </motion.div>
              ))}
            </div>
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
              <img
                src="https://i.postimg.cc/jqnmHCsJ/Quan2.png"
                alt="Yakubu Quadri"
              />
            </div>

            {/* Floating cards */}
            <div className="float-card float-card-1">
              <div className="card-label">Experience</div>
              <div className="card-value">5+ Yrs</div>
            </div>
            <div className="float-card float-card-2">
              <div className="card-label">Projects</div>
              <div className="card-value">50+</div>
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