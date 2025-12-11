import React from "react";
import AboutImage from "../assets/profile-pic.png";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="bg-secondary text-text-main py-20 transition-colors duration-300" id="about">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="md:w-1/2"
          >
            <img
              src={AboutImage}
              alt="About Me"
              className="rounded-lg shadow-2xl w-full max-w-md mx-auto transform hover:scale-105 transition-transform duration-300 border-4 border-accent/20"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="md:w-1/2 space-y-6"
          >
            <h2 className="text-4xl font-bold gradient-text">About Me</h2>
            <p className="text-text-muted text-lg leading-relaxed">
              Data Engineer with expertise in designing and optimizing ETL/ELT pipelines, data warehouses, and cloud-native solutions.
              I have hands-on experience with big data frameworks like Apache Spark, Hadoop, and Kafka, as well as cloud platforms such as AWS and Azure.
              I am skilled in SQL, Python, and Data Modeling for both structured and unstructured datasets, and passionate about building scalable solutions for analytics and predictive insights.
            </p>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-accent">Experience</h3>

              <div className="border-l-4 border-accent pl-4 py-2">
                <h4 className="text-xl font-semibold">Programmer Analyst</h4>
                <p className="text-text-muted text-sm">Sanmina | May 2023 – Nov 2023</p>
                <ul className="text-text-muted mt-2 text-sm space-y-1 list-disc list-inside">
                  <li>Designed and implemented data pipelines for RMA (Return Material Authorization) processes, improving operational efficiency by 20%</li>
                  <li>Automated ETL workflows using Python and SQL, reducing manual data processing time by 40%</li>
                  <li>Integrated machine learning predictions to optimize material return cycle time and inventory management</li>
                  <li>Collaborated with cross-functional teams to streamline data flow between manufacturing and quality assurance systems</li>
                </ul>
              </div>

              <div className="border-l-4 border-border pl-4 py-2 hover:border-accent transition-colors duration-300">
                <h4 className="text-xl font-semibold">Product & Engineering Intern</h4>
                <p className="text-text-muted text-sm">HighRadius | Jan 2023 – Apr 2023</p>
                <ul className="text-text-muted mt-2 text-sm space-y-1 list-disc list-inside">
                  <li>Enhanced data pipelines for Accounts Receivable Automation platform, processing 100K+ transactions daily</li>
                  <li>Implemented CI/CD pipelines for monitoring and deployment of 200+ machine learning models</li>
                  <li>Developed automated testing frameworks that reduced model deployment time by 30%</li>
                  <li>Optimized SQL queries and database schemas, improving query performance by 50%</li>
                </ul>
              </div>
            </div>

            <div className="space-y-4 mt-8">
              <h3 className="text-2xl font-bold text-accent">Education</h3>
              <div className="flex justify-between items-center border-b border-border pb-2">
                <div>
                  <h4 className="font-semibold">B.Tech Computer Science & Engineering</h4>
                  <p className="text-text-muted text-sm">KIIT University</p>
                </div>
                <span className="text-accent font-bold">2020 – 2024</span>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
