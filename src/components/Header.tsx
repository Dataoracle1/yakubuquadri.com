import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { Menu, X } from 'lucide-react';
import { navLinks } from '../data/siteData';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header 
      className={`bg-dark py-4 fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled ? 'shadow-md' : ''
      }`}
    >
      <div className="container mx-auto px-6">
        <nav className="flex justify-between items-center">
          <div className="text-light font-bold text-2xl italic">Qdev</div>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          {/* Desktop navigation */}
          <ul className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <li key={index}>
                <Link
                  to={link.url}
                  smooth={true}
                  duration={500}
                  offset={-70}
                  className="text-light hover:text-orange transition-colors duration-300 cursor-pointer"
                >
                  {link.text}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="contact"
                smooth={true}
                duration={500}
                offset={-70}
                className="bg-orange text-light px-6 py-2 rounded-full font-semibold hover:bg-opacity-80 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
              >
                Hire Me
              </Link>
            </li>
          </ul>
        </nav>
        
        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden bg-dark mt-4 rounded-lg animate-slide-down">
            <ul className="py-2">
              {navLinks.map((link, index) => (
                <li key={index} className="px-4 py-2">
                  <Link
                    to={link.url}
                    smooth={true}
                    duration={500}
                    offset={-70}
                    className="text-light block hover:text-orange transition-colors duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
              <li className="px-4 py-2">
                <Link
                  to="contact"
                  smooth={true}
                  duration={500}
                  offset={-70}
                  className="bg-orange text-light px-6 py-2 rounded-full font-semibold block text-center hover:bg-opacity-80 transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  Hire Me
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;




