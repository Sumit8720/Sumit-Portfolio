import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close menu when location changes or screen resizes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navLinks = [
    { title: 'Home', path: '/', id: '#home' },
    { title: 'About', path: '/about', id: '#about' },
    { title: 'Services', path: '/', id: '#service' },
    { title: 'Projects', path: '/projects', id: '#projects' },
    { title: 'Contact', path: '/contact', id: '#contact' },
  ];

  const handleNavClick = (link) => {
    setIsOpen(false);
    if (location.pathname === '/' && link.id.startsWith('#')) {
      const element = document.querySelector(link.id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="fixed w-full top-0 z-50 bg-primary/80 backdrop-blur-xl border-b border-border/40 transition-all duration-300">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link 
          to="/" 
          onClick={() => handleNavClick({ id: '#home' })}
          className="text-2xl font-bold gradient-text tracking-tighter hover:scale-105 transition-transform"
        >
          Sumit Kumar
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <Link
              key={link.title}
              to={link.id.startsWith('#') && location.pathname === '/' ? link.id : link.path}
              onClick={() => handleNavClick(link)}
              className={`relative text-sm font-semibold tracking-wide transition-colors duration-300 group ${
                (location.pathname === link.path || (location.pathname === '/' && link.id === '#home')) 
                ? 'text-accent' : 'text-text-muted hover:text-accent'
              }`}
            >
              {link.title}
              <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full ${
                (location.pathname === link.path) ? 'w-full' : ''
              }`}></span>
            </Link>
          ))}
          <button
            onClick={toggleTheme}
            className="w-10 h-10 flex items-center justify-center text-text-muted hover:text-accent transition-all duration-300 focus:outline-none rounded-xl hover:bg-secondary border border-border/50 shadow-sm"
          >
            {theme === 'dark' ? <FaSun size={18} /> : <FaMoon size={18} />}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-3">
          <button
            onClick={toggleTheme}
            className="w-9 h-9 flex items-center justify-center text-text-muted hover:text-accent focus:outline-none rounded-lg bg-secondary border border-border/20"
          >
            {theme === 'dark' ? <FaSun size={16} /> : <FaMoon size={16} />}
          </button>
          <button
            onClick={toggleMenu}
            className="w-9 h-9 flex items-center justify-center text-text-muted hover:text-accent focus:outline-none rounded-lg bg-secondary border border-border/20"
          >
            {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-secondary/95 backdrop-blur-md overflow-hidden border-b border-border/40"
          >
            <div className="px-6 pt-4 pb-8 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.title}
                  to={link.id.startsWith('#') && location.pathname === '/' ? link.id : link.path}
                  onClick={() => handleNavClick(link)}
                  className={`block px-4 py-3 rounded-xl text-lg font-medium transition-all duration-300 ${
                    location.pathname === link.path
                      ? 'bg-accent text-white shadow-lg shadow-accent/20 translate-x-2'
                      : 'text-text-muted hover:bg-primary/50 hover:text-text-main'
                  }`}
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;