import React, { useRef, useState } from "react";
import { FaEnvelope, FaMapMarkedAlt, FaPhone, FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";

const Contact = () => {
  const form = useRef();
  const [status, setStatus] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus("sending");

    // Using environment variables for security
    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, form.current, {
        publicKey: PUBLIC_KEY,
      })
      .then(
        () => {
          setStatus("success");
          form.current.reset();
          setTimeout(() => setStatus(""), 5000);
        },
        (error) => {
          console.error("FAILED...", error.text);
          setStatus("error");
          setTimeout(() => setStatus(""), 5000);
        }
      );
  };

  return (
    <div className="bg-primary text-text-main py-20 transition-colors duration-300" id="contact">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-16 gradient-text"
        >
          Contact Me
        </motion.h2>

        <div className="flex flex-col md:flex-row gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1 space-y-8"
          >
            <h3 className="text-3xl font-bold text-accent">Let's Talk</h3>
            <p className="text-text-muted text-lg leading-relaxed">
              I'm open to discussing web development projects or partnership
              opportunities. Whether you have a question or just want to connect,
              reach out!
            </p>
            <div className="space-y-6">
              <div className="flex items-center space-x-4 text-text-muted hover:text-accent transition-colors duration-300">
                <FaEnvelope className="text-2xl text-accent" />
                <a href="mailto:sk87208720@gmail.com" className="text-lg">
                  sk87208720@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-4 text-text-muted hover:text-accent transition-colors duration-300">
                <FaPhone className="text-2xl text-accent" />
                <span className="text-lg">+91-9931111373</span>
              </div>
              <div className="flex items-center space-x-4 text-text-muted hover:text-accent transition-colors duration-300">
                <FaMapMarkedAlt className="text-2xl text-accent" />
                <span className="text-lg">Chennai, India</span>
              </div>
            </div>

            <div className="flex space-x-6 mt-8">
              <a href="https://github.com/sumit8720" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-text-main transition-colors duration-300 transform hover:scale-110">
                <FaGithub size={30} />
              </a>
              <a href="https://www.linkedin.com/in/sumit8720/" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-text-main transition-colors duration-300 transform hover:scale-110">
                <FaLinkedin size={30} />
              </a>
              <a href="https://www.instagram.com/nevertheless_sumit" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-text-main transition-colors duration-300 transform hover:scale-110">
                <FaInstagram size={30} />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1"
          >
            <form ref={form} onSubmit={sendEmail} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-text-muted mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="user_name"
                  id="name"
                  required
                  className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all duration-300 text-text-main placeholder-text-muted"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-text-muted mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="user_email"
                  id="email"
                  required
                  className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all duration-300 text-text-main placeholder-text-muted"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-text-muted mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows="5"
                  required
                  className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all duration-300 text-text-main placeholder-text-muted resize-none"
                  placeholder="Write your message here..."
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={status === "sending"}
                className={`w-full py-3 px-6 rounded-lg font-bold text-white transition-all duration-300 transform hover:-translate-y-1 ${status === "sending"
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-gradient-to-r from-accent to-blue-600 hover:shadow-lg hover:shadow-accent/50"
                  }`}
              >
                {status === "sending" ? "Sending..." : "Send Message"}
              </button>
              {status === "success" && (
                <p className="text-green-400 text-center mt-4">
                  Message sent successfully!
                </p>
              )}
              {status === "error" && (
                <p className="text-red-400 text-center mt-4">
                  Failed to send message. Please try again.
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;