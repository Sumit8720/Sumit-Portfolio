import React from "react";
import HeroImage from "../assets/profile-pic.png";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="bg-primary text-text-main text-center py-20 md:py-32 relative overflow-hidden transition-colors duration-300">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <img
            src={HeroImage}
            alt="Sumit Kumar"
            className="mx-auto w-48 h-48 md:w-64 md:h-64 rounded-full object-cover border-4 border-accent shadow-[0_0_30px_rgba(56,189,248,0.5)]"
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl md:text-6xl font-bold mb-4"
        >
          I'm{" "}
          <span className="gradient-text">
            Sumit Kumar
          </span>
        </motion.h1>


        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-xl md:text-2xl text-text-muted mb-8"
        >
          Data Engineer & Machine Learning Enthusiast
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-text-muted max-w-2xl mx-auto mb-10 text-lg"
        >
          Specializing in designing scalable data pipelines, optimizing ETL/ELT workflows,
          and building cloud-native solutions for analytics and predictive insights.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6"
        >
          <Link
            to="/contact"
            className="bg-gradient-to-r from-accent to-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-accent/50 transition-all duration-300 transform hover:-translate-y-1"
          >
            Contact Me
          </Link>
          <a
            href="https://drive.google.com/file/d/1Uv1xiNCW7X_PGRTfvNC1z7Hp8_x-X8fQ/view?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-transparent border-2 border-accent text-accent px-8 py-3 rounded-full font-semibold hover:bg-accent hover:text-white transition-all duration-300 transform hover:-translate-y-1"
          >
            Resume
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
