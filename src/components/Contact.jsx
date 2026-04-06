import { useRef, useState } from "react";
import { FaEnvelope, FaMapMarkedAlt, FaPhone, FaGithub, FaLinkedin, FaInstagram, FaPaperPlane, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "framer-motion";

const Contact = () => {
    const form = useRef();
    const [status, setStatus] = useState(""); // "", "sending", "success", "error"
    const [errorMessage, setErrorMessage] = useState("");

    const sendEmail = (e) => {
        e.preventDefault();
        
        const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        console.log("Attempting to send email with:", { SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY_LENGTH: PUBLIC_KEY?.length });

        if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
            const errorMsg = "Email service is not configured! Make sure VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY are set in your .env file.";
            console.error(errorMsg);
            setErrorMessage(errorMsg);
            setStatus("error");
            return;
        }

        setStatus("sending");

        // Initialization is cleaner for modern versions
        emailjs.init(PUBLIC_KEY);

        emailjs
            .sendForm(SERVICE_ID, TEMPLATE_ID, form.current)
            .then(
                (result) => {
                    console.log("EmailJS SUCCESS:", result.text);
                    setStatus("success");
                    form.current.reset();
                    setTimeout(() => setStatus(""), 5000);
                },
                (error) => {
                    console.error("EmailJS ERROR:", error);
                    setErrorMessage(`Failed to send: ${error.text || "Check console for details."}`);
                    setStatus("error");
                }
            );
    };

    return (
        <section className="bg-primary text-text-main py-24 relative overflow-hidden transition-colors duration-300" id="contact">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -z-10 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl -z-10 animate-pulse"></div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Get In Touch</h2>
                    <p className="text-text-muted max-w-2xl mx-auto text-lg italic">
                        "Your thoughts and collaborations are always welcome."
                    </p>
                </motion.div>

                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="lg:w-2/5 space-y-10"
                    >
                        <div className="bg-secondary p-8 rounded-2xl border border-border/50 shadow-xl">
                            <h3 className="text-3xl font-bold text-accent mb-6">Contact Information</h3>
                            <p className="text-text-muted text-lg leading-relaxed mb-8">
                                Connect with me for project collaborations, job opportunities, or just a friendly chat.
                            </p>
                            
                            <div className="space-y-8">
                                <div className="flex items-center group">
                                    <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300 mr-4 shadow-lg shadow-accent/5">
                                        <FaEnvelope size={24} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-text-muted font-medium mb-1">Email Me</p>
                                        <a href="mailto:sk87208720@gmail.com" className="text-lg hover:text-accent transition-colors font-semibold">
                                            sk87208720@gmail.com
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-center group">
                                    <div className="w-14 h-14 bg-blue-600/10 rounded-xl flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 mr-4 shadow-lg shadow-blue-500/5">
                                        <FaPhone size={24} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-text-muted font-medium mb-1">Call Me</p>
                                        <span className="text-lg font-semibold">+91-9931111373</span>
                                    </div>
                                </div>

                                <div className="flex items-center group">
                                    <div className="w-14 h-14 bg-purple-600/10 rounded-xl flex items-center justify-center text-purple-500 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300 mr-4 shadow-lg shadow-purple-500/5">
                                        <FaMapMarkedAlt size={24} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-text-muted font-medium mb-1">Our Location</p>
                                        <span className="text-lg font-semibold">Chennai, India</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex space-x-5 mt-12 pt-8 border-t border-border/50">
                                {[
                                    { icon: <FaGithub />, link: "https://github.com/sumit8720", color: "hover:bg-gray-800" },
                                    { icon: <FaLinkedin />, link: "https://www.linkedin.com/in/sumit8720/", color: "hover:bg-blue-700" },
                                    { icon: <FaInstagram />, link: "https://www.instagram.com/nevertheless_sumit", color: "hover:bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]" }
                                ].map((social, i) => (
                                    <a
                                        key={i}
                                        href={social.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`w-12 h-12 bg-primary rounded-full flex items-center justify-center text-2xl transition-all duration-300 hover:text-white hover:-translate-y-2 border border-border ${social.color}`}
                                    >
                                        {social.icon}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="lg:w-3/5"
                    >
                        <form ref={form} onSubmit={sendEmail} className="bg-secondary p-8 md:p-10 rounded-2xl border border-border/50 shadow-2xl space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-semibold text-text-muted px-1">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        name="user_name"
                                        id="name"
                                        required
                                        className="w-full px-5 py-4 bg-primary/50 border border-border rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all duration-300 text-text-main placeholder-text-muted/50"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-semibold text-text-muted px-1">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        name="user_email"
                                        id="email"
                                        required
                                        className="w-full px-5 py-4 bg-primary/50 border border-border rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all duration-300 text-text-main placeholder-text-muted/50"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-semibold text-text-muted px-1">
                                    Your Message
                                </label>
                                <textarea
                                    name="message"
                                    id="message"
                                    rows="6"
                                    required
                                    className="w-full px-5 py-4 bg-primary/50 border border-border rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all duration-300 text-text-main placeholder-text-muted/50 resize-none"
                                    placeholder="Tell me about your project or inquiry..."
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={status === "sending"}
                                className={`w-full py-4 px-8 rounded-xl font-bold text-white transition-all duration-500 flex items-center justify-center space-x-3 group relative overflow-hidden ${
                                    status === "sending"
                                        ? "bg-gray-600 cursor-not-allowed"
                                        : "bg-accent hover:shadow-2xl hover:shadow-accent/40 active:scale-95"
                                }`}
                            >
                                <span className={`transition-all duration-300 ${status === "sending" ? "opacity-0" : "opacity-100"}`}>
                                    Send Message
                                </span>
                                {status === "sending" ? (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    </div>
                                ) : (
                                    <FaPaperPlane className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                )}
                            </button>

                            {/* Notifications */}
                            <AnimatePresence>
                                {status === "success" && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl flex items-center text-green-500"
                                    >
                                        <FaCheckCircle className="mr-3 text-xl" />
                                        <p className="font-medium">Message sent successfully! I'll get back to you soon.</p>
                                    </motion.div>
                                )}
                                {status === "error" && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center text-red-500"
                                    >
                                        <FaExclamationCircle className="mr-3 text-xl" />
                                        <p className="font-medium">{errorMessage}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};


export default Contact;