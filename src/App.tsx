import React, { useEffect } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import ExperienceSection from './components/ExperienceSection';
import WhyHireSection from './components/WhyHireSection';
import PortfolioSection from './components/PortfolioSection';
import TestimonialsSection from './components/TestimonialsSection';
import ContactSection from './components/ContactSection';
import TagsSection from './components/TagsSection';
import BlogSection from './components/BlogSection';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="font-sans">
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <ExperienceSection />
        <WhyHireSection />
        <PortfolioSection />
        <TestimonialsSection />
        <ContactSection />
        <TagsSection />
        <BlogSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;