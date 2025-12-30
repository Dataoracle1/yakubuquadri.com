import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { socialLinks, footerColumns } from '../data/siteData';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email && /\S+@\S+\.\S+/.test(email)) {
      // Simulate newsletter subscription
      setIsSubscribed(true);
      setEmail('');
      
      setTimeout(() => {
        setIsSubscribed(false);
      }, 3000);
    }
  };

  return (
    <footer className="bg-dark text-white pt-16 pb-6">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="text-xl font-bold mb-6 relative pb-3">
              Quadri
              <span className="absolute bottom-0 left-0 w-10 h-1 bg-orange"></span>
            </h3>
            <p className="text-gray-400 mb-6">
              Professional product designer with a passion for creating meaningful design solutions that solve real business problems.
            </p>
            
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <motion.a 
                  key={index}
                  href={link.url}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white hover:bg-orange transition-all duration-300"
                  whileHover={{ y: -3 }}
                  aria-label={link.platform}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </div>
          
          {footerColumns.map((column, index) => (
            <div key={index}>
              <h3 className="text-xl font-bold mb-6 relative pb-3">
                {column.title}
                <span className="absolute bottom-0 left-0 w-10 h-1 bg-orange"></span>
              </h3>
              <ul className="space-y-3">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a 
                      href={link.url} 
                      className="text-gray-400 hover:text-orange transition-colors duration-300"
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          <div>
            <h3 className="text-xl font-bold mb-6 relative pb-3">
              Newsletter
              <span className="absolute bottom-0 left-0 w-10 h-1 bg-orange"></span>
            </h3>
            <p className="text-gray-400 mb-6">
              Subscribe to my newsletter for design tips and insights.
            </p>
            
            {isSubscribed ? (
              <div className="text-green-400 mb-4">
                Thank you for subscribing!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email"
                  className="flex-1 px-4 py-2 rounded-l-md focus:outline-none text-yellow-400 bg-gray-800 placeholder-gray-400 border border-gray-600 font-medium"
                  style={{caretColor: 'yellow'}}
                  required
                />
                <button
                  type="submit"
                  className="bg-orange text-white px-4 py-2 rounded-r-md hover:bg-opacity-90 transition-colors duration-300"
                >
                  →
                </button>
              </form>
            )}
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            © Copyright 2025 - All Rights Reserved | Yakubu Quadri
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;