import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import ExperienceSection from './components/ExperienceSection';
import WhyHireSection from './components/WhyHireSection';
import PortfolioSection from './components/PortfolioSection';
// import TestimonialsSection from './components/TestimonialsSection';
import ContactSection from './components/ContactSection';
import TagsSection from './components/TagsSection';
// import BlogSection from './components/BlogSection';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import CursorAndProgress from './components/CursorAndProgress';
import WhatsAppButton from './components/WhatsAppButton';

function App() {
  const isMobile = window.innerWidth < 768;
  const [loading, setLoading] = useState(!isMobile);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <CursorAndProgress />
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      <div className="font-sans" style={{ visibility: loading ? 'hidden' : 'visible' }}>
        <Header />
        <main>
          <HeroSection />
          <ServicesSection />
          <ExperienceSection />
          <WhyHireSection />
          <PortfolioSection />
          {/* <TestimonialsSection /> */}
          <ContactSection />
          <TagsSection />
          {/* <BlogSection /> */}
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
}

export default App;