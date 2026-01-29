import React from 'react';
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';
import { heroStats } from '../data/siteData';

const HeroSection: React.FC = () => {
  return (
    <section id="home" className="pt-28 pb-16 md:py-32 bg-light">
      <div className="container mx-auto px-6">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between">
          <motion.div 
            className="md:w-1/2 mt-12 md:mt-0"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="bg-gray px-4 py-1 rounded-full text-sm inline-block mb-4">Hello!</span>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              I'm <span className="text-orange">Yakubu Quadri</span>,<br />
              Full-Stack Developer
            </h1>
            <p className="text-text-gray mb-8 max-w-lg italic">
            Building scalable, high performance web<br/>
                applications with clean architecture and <br/>
                great user experiences.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link
                to="portfolio"
                smooth={true}
                duration={500}
                offset={-70}
                className="bg-orange text-white px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer inline-block"
              >
                Portfolio
              </Link>
              <Link
                to="contact"
                smooth={true}
                duration={500}
                offset={-70}
                className="bg-transparent text-dark border-2 border-dark px-8 py-3 rounded-full font-semibold hover:bg-dark hover:text-white transition-all duration-300 transform hover:-translate-y-1 cursor-pointer inline-block"
              >
                Hire Me
              </Link>
            </div>
            
            <div className="flex gap-12 mt-12">
              {heroStats.map((stat, index) => (
                <motion.div 
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + (index * 0.2) }}
                >
                  <span className="text-orange text-3xl font-bold block">
                    {stat.value}
                  </span>
                  <span className="text-text-gray text-sm">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2 flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
          

            <div className="relative">
              <img 
              src="https://i.postimg.cc/jqnmHCsJ/Quan2.png" 
              alt="Profile" 
              className="w-74 h-74 md:w-80 md:h-80 rounded-full object-cover object-top shadow-hero"
               />
               </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;