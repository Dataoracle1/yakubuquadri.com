import React from 'react';
import { motion } from 'framer-motion';
import { experiences } from '../data/siteData';

const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl font-bold relative inline-block pb-3"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            My Work Experience
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-orange"></span>
          </motion.h2>
        </div>
        
        <div className="relative max-w-3xl mx-auto">
          {/* Timeline center line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-text-gray opacity-30"></div>
          
          {experiences.map((exp, index) => (
            <motion.div 
              key={index}
              className={`relative flex items-center mb-12 ${
                exp.position === 'left' 
                  ? 'md:flex-row-reverse' 
                  : 'md:flex-row'
              }`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              {/* Timeline dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full bg-white border-4 border-orange z-10"></div>
              
              {/* Content */}
              <div className={`md:w-1/2 ${
                exp.position === 'left' 
                  ? 'md:pl-12 md:pr-4' 
                  : 'md:pr-12 md:pl-4'
              } px-4 py-2`}>
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                  <span className="text-orange font-semibold">{exp.date}</span>
                  <h3 className="text-xl font-bold mt-2 mb-1">{exp.title}, {exp.company}</h3>
                  <p className="text-text-gray">{exp.description}</p>
                </div>
              </div>
              
              {/* Empty space for the other side */}
              <div className="hidden md:block md:w-1/2"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;