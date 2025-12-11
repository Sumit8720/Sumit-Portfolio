import React from "react";
import { FaDatabase, FaCloud, FaChartLine } from "react-icons/fa";
import { SiApachespark, SiPython, SiAmazonaws } from "react-icons/si";
import { motion } from "framer-motion";

const services = [
  {
    id: 1,
    title: "Data Pipeline Engineering",
    description: "Designing and implementing scalable ETL/ELT pipelines using Apache Spark, Hadoop, and Kafka for real-time and batch data processing.",
    icon: <FaDatabase className="text-4xl text-accent mb-4" />,
  },
  {
    id: 2,
    title: "Cloud Data Solutions",
    description: "Building cloud-native data architectures on AWS and Azure, leveraging services like S3, Redshift, Lambda, and Azure Data Factory.",
    icon: <FaCloud className="text-4xl text-accent mb-4" />,
  },
  {
    id: 3,
    title: "Machine Learning & Analytics",
    description: "Developing predictive models and analytics solutions using Python, SQL, and ML frameworks for data-driven decision making.",
    icon: <FaChartLine className="text-4xl text-accent mb-4" />,
  },
];

const Service = () => {
  return (
    <div className="bg-secondary text-text-main py-20 transition-colors duration-300" id="service">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-16 gradient-text"
        >
          My Expertise
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-primary p-8 rounded-xl shadow-lg border border-border hover:border-accent hover:shadow-accent/20 transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="flex justify-center">{service.icon}</div>
              <h3 className="text-2xl font-bold mb-4 text-center">{service.title}</h3>
              <p className="text-text-muted text-center leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Service;
