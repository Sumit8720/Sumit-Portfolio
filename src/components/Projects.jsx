import React, { useEffect, useState } from "react";
import projectAI from "../assets/project_ai.png";
import projectWeb from "../assets/project_web.png";
import { motion } from "framer-motion";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("https://api.github.com/users/sumit8720/repos");
        const data = await response.json();
        // Filter out forked repos if desired, or sort by stars/updated
        const filteredData = data.filter(repo => !repo.fork).sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
        setProjects(filteredData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const getProjectImage = (project) => {
    // Generate unique image based on project name via Pollinations.ai
    // Using professional, minimalist keywords to match the new light-hearted theme
    const basePrompt = "minimalist clean tech illustration corporate blue white professional high quality soft lighting";
    const projectSpecific = project.name.replace(/-/g, " ");
    return `https://image.pollinations.ai/prompt/${encodeURIComponent(projectSpecific + " " + basePrompt)}?width=800&height=600&nologo=true`;
  };

  const getProjectDescription = (project) => {
    // Return GitHub description if available
    if (project.description) return project.description;

    // Generate intelligent fallback based on project name
    const name = project.name.toLowerCase();

    if (name.includes('spam') && name.includes('detection')) {
      return 'Machine learning model using LSTM neural networks to classify SMS messages as spam or legitimate.';
    }
    if (name.includes('bike') && name.includes('classification')) {
      return 'Deep learning project using CNN to classify different types of motorcycles from images.';
    }
    if (name.includes('kidney') && name.includes('disease')) {
      return 'Predictive model for early detection of kidney disease using machine learning algorithms.';
    }
    if (name.includes('portfolio')) {
      return 'Personal portfolio website showcasing projects and skills.';
    }

    // Generic fallback
    return `${project.language || 'Software'} project - ${project.name.replace(/-/g, ' ')}`;
  };

  const handleImageError = (e) => {
    // Fallback to a generic professional tech image in the same style
    e.target.src = "https://image.pollinations.ai/prompt/minimalist%20corporate%20software%20development%20clean?width=800&height=600&nologo=true";
  };

  return (
    <div className="bg-primary text-text-main py-20 transition-colors duration-300" id="projects">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-16 gradient-text"
        >
          My Projects
        </motion.h2>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-secondary rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-accent/20 transition-all duration-300 border border-border hover:border-accent group flex flex-col h-full"
              >
                <div className="relative overflow-hidden h-48">
                  <img
                    src={getProjectImage(project)}
                    alt={project.name}
                    onError={handleImageError}
                    loading="lazy"
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white font-semibold text-lg">View Details</span>
                  </div>
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors duration-300 break-words">
                    {project.name.replace(/-/g, " ")}
                  </h3>
                  <p className="text-text-muted text-sm mb-4 line-clamp-3">
                    {getProjectDescription(project)}
                  </p>
                  <div className="mt-auto flex justify-between items-center">
                    <span className="text-xs text-text-muted bg-primary px-2 py-1 rounded border border-border">
                      {project.language || "Code"}
                    </span>
                    <a
                      href={project.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-accent hover:text-text-main font-medium transition-colors"
                    >
                      GitHub &rarr;
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
