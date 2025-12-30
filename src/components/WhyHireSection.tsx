import React from 'react';
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';
import { whyHireStats } from '../data/siteData';

const WhyHireSection: React.FC = () => {
  return (
    <section className="py-20 bg-gray">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl font-bold relative inline-block pb-3"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Why Hire Me for Your Next Project?
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-orange"></span>
          </motion.h2>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-16">
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-text-gray mb-8">
              I bring a unique blend of creative design thinking and strategic problem-solving to every project. With a decade of experience working with clients of all sizes, I understand how to translate business goals into beautiful, functional designs that users love.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-10">
              {whyHireStats.map((stat, index) => (
                <motion.div 
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
                  viewport={{ once: true }}
                >
                  <span className="text-orange text-3xl font-bold block mb-1">
                    {stat.value}
                  </span>
                  <span className="text-text-gray text-sm">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>
            
            <Link
              to="contact"
              smooth={true}
              duration={500}
              offset={-70}
              className="bg-orange text-white px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer inline-block"
            >
              Hire Me
            </Link>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2 flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <img 
                src="https://i.postimg.cc/1tD9YBGX/Quan1.png" 
                alt="Profile" 
                className="w-64 h-64 md:w-72 md:h-72 rounded-full object-cover object-top border-8 border-orange"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyHireSection;