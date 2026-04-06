import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";

const ProjectDetails = () => {
    const { projectName } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    // Spam Detection Demo State
    const [message, setMessage] = useState("");
    const [prediction, setPrediction] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    useEffect(() => {
        const fetchProjectDetails = async () => {
            try {
                // Fetch all repos to find the matching one, or fetch specific if we knew the exact name structure.
                // For now, fetching all and filtering genericizes the fallback.
                const response = await fetch(`https://api.github.com/repos/sumit8720/${projectName}`);
                if (response.ok) {
                    const data = await response.json();
                    setProject(data);
                } else {
                    // Fallback for demo purposes if API limit hit or not found
                    setProject({
                        name: projectName,
                        description: "Project details not found or API limit reached.",
                        html_url: `https://github.com/sumit8720/${projectName}`
                    });
                }
                setLoading(false);
            } catch (error) {
                console.error("Error fetching project:", error);
                setProject({ name: projectName }); // Minimal fallback
                setLoading(false);
            }
        };

        fetchProjectDetails();
    }, [projectName]);

    const isSpamProject = () => {
        if (!projectName) return false;
        const name = projectName.toLowerCase();
        return (name.includes('spam') && name.includes('detection')) ||
            (name.includes('lstm') && name.includes('spam')); // Catch "LSTM" as user mentioned
    };

    const checkSpam = () => {
        if (!message) return;
        setIsAnalyzing(true);
        setPrediction(null);

        // Simulated LSTM Model Delay
        setTimeout(() => {
            const lowerMsg = message.toLowerCase();
            // Simple heuristic keywords for demo purposes as requested
            const spamKeywords = ['free', 'winner', 'prize', 'urgent', 'cash', 'loan', 'congratulations', 'click here'];

            const isSpam = spamKeywords.some(keyword => lowerMsg.includes(keyword));
            setPrediction(isSpam ? 'Spam' : 'Ham');
            setIsAnalyzing(false);
        }, 1500);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-primary">
                <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="bg-primary min-h-screen pt-24 pb-20 text-text-main">
            <div className="container mx-auto px-4">

                {/* Back Navigation */}
                <Link to="/projects" className="inline-flex items-center text-accent hover:text-text-main transition-colors mb-8">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Projects
                </Link>

                {/* Project Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-secondary rounded-xl p-8 border border-border mb-12 shadow-lg"
                >
                    <h1 className="text-4xl font-bold mb-4 gradient-text capitalize">
                        {project?.name?.replace(/-/g, " ")}
                    </h1>
                    <p className="text-text-muted text-lg leading-relaxed mb-6">
                        {project?.description || "A software development project."}
                    </p>

                    <div className="flex flex-wrap gap-4">
                        {project?.language && (
                            <span className="px-4 py-2 bg-primary rounded-lg border border-border text-sm font-semibold">
                                {project.language}
                            </span>
                        )}
                        <a
                            href={project?.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-2 bg-accent text-white rounded-lg hover:bg-accent/80 transition-colors font-medium flex items-center"
                        >
                            View on GitHub
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </a>
                    </div>
                </motion.div>

                {/* Interactive Demo Section */}
                {isSpamProject() && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="bg-secondary rounded-xl p-8 border border-accent/30 shadow-2xl relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-64 w-64 text-accent" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                        </div>

                        <div className="relative z-10 max-w-2xl mx-auto text-center">
                            <h2 className="text-3xl font-bold mb-2">Live Demo</h2>
                            <p className="text-text-muted mb-8">
                                Try the LSTM Spam Detection model right here. Enter a message to see if it's classified as Spam or Ham.
                            </p>

                            <div className="bg-primary p-6 rounded-lg shadow-inner text-left mb-8 border border-border">
                                <label className="block text-sm font-medium mb-2 text-text-muted">Enter Message</label>
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Type a message (e.g., 'You won a free prize!' or 'Hey, how are you?')"
                                    className="w-full h-32 bg-secondary border border-border rounded-lg p-4 focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all resize-none text-text-main"
                                ></textarea>

                                <div className="mt-4 flex justify-end">
                                    <button
                                        onClick={checkSpam}
                                        disabled={!message || isAnalyzing}
                                        className={`px-8 py-3 rounded-lg font-bold text-white shadow-lg transition-all transform hover:-translate-y-1 ${!message || isAnalyzing ? 'bg-gray-500 cursor-not-allowed' : 'bg-gradient-to-r from-accent to-purple-600 hover:shadow-accent/50'
                                            }`}
                                    >
                                        {isAnalyzing ? 'Analyzing...' : 'Analyze Message'}
                                    </button>
                                </div>
                            </div>

                            {/* Result Display */}
                            {prediction && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`p-6 rounded-lg border-2 ${prediction === 'Spam'
                                            ? 'bg-red-500/10 border-red-500 text-red-500'
                                            : 'bg-green-500/10 border-green-500 text-green-500'
                                        }`}
                                >
                                    <h3 className="text-2xl font-bold mb-2">
                                        Result: {prediction}
                                    </h3>
                                    <p className="text-text-muted">
                                        {prediction === 'Spam'
                                            ? 'This message appears to be unsolicited spam.'
                                            : 'This message appears to be legitimate (Ham).'}
                                    </p>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default ProjectDetails;
