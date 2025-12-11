import React from 'react';
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-secondary text-text-main py-8 border-t border-border transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <h3 className="text-2xl font-bold gradient-text mb-2">Sumit Kumar</h3>
            <p className="text-text-muted text-sm">
              Full-Stack Developer & Machine Learning Enthusiast
            </p>
            <p className="text-text-muted text-xs mt-1">
              &copy; {new Date().getFullYear()} Sumit Kumar. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="https://www.instagram.com/nevertheless_sumit" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-accent transition-colors duration-300 transform hover:scale-110">
              <FaInstagram size={24} />
            </a>
            <a href="https://www.linkedin.com/in/sumit8720/" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-accent transition-colors duration-300 transform hover:scale-110">
              <FaLinkedin size={24} />
            </a>
            <a href="https://github.com/sumit8720" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-accent transition-colors duration-300 transform hover:scale-110">
              <FaGithub size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
