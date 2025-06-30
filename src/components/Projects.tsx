import { useState, useEffect } from 'react';
import { Github, Calendar, Tag, Clock, ChevronLeft, ChevronRight } from 'lucide-react';

const Projects = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Manual project data - you can customize these
  const projects = [
    {
      id: 1,
      title: 'E-Commerce Dashboard',
      description: 'A comprehensive admin dashboard for managing e-commerce operations. Features real-time analytics, inventory management, order processing, and customer insights. Built with modern React patterns and optimized for performance.',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL'],
      category: 'Full Stack',
      githubUrl: 'https://github.com/yourusername/ecommerce-dashboard',
      liveUrl: 'https://ecommerce-dashboard-demo.vercel.app',
      date: '2024',
      stars: 42,
      lastUpdated: '2024-01-15T10:30:00Z',
      topics: ['dashboard', 'ecommerce', 'analytics', 'admin-panel', 'react']
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates, team collaboration features, and advanced project tracking. Includes drag-and-drop functionality, deadline management, and progress visualization.',
      image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=600',
      technologies: ['Vue.js', 'Express.js', 'MongoDB', 'Socket.io', 'Docker'],
      category: 'Web Application',
      githubUrl: 'https://github.com/yourusername/task-manager',
      liveUrl: 'https://task-manager-demo.netlify.app',
      date: '2023',
      stars: 28,
      lastUpdated: '2023-12-20T14:45:00Z',
      topics: ['productivity', 'collaboration', 'real-time', 'vue', 'task-management']
    },
    {
      id: 3,
      title: 'Weather Analytics Platform',
      description: 'An advanced weather analytics platform that aggregates data from multiple sources to provide detailed weather insights, forecasting, and climate analysis. Features interactive charts and customizable alerts.',
      image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=600',
      technologies: ['Python', 'FastAPI', 'React', 'D3.js', 'AWS'],
      category: 'Data Platform',
      githubUrl: 'https://github.com/yourusername/weather-analytics',
      liveUrl: 'https://weather-analytics-demo.herokuapp.com',
      date: '2023',
      stars: 67,
      lastUpdated: '2024-01-08T09:15:00Z',
      topics: ['weather', 'analytics', 'data-visualization', 'api', 'machine-learning']
    }
  ];

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying || projects.length === 0) return;

    const interval = setInterval(() => {
      handleSlideChange((prev) => (prev + 1) % projects.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, projects.length]);

  const handleSlideChange = (newSlideOrFunction: number | ((prev: number) => number)) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    
    setTimeout(() => {
      if (typeof newSlideOrFunction === 'function') {
        setCurrentSlide(newSlideOrFunction);
      } else {
        setCurrentSlide(newSlideOrFunction);
      }
      
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 300);
  };

  const nextSlide = () => {
    const newSlide = (currentSlide + 1) % projects.length;
    handleSlideChange(newSlide);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    const newSlide = (currentSlide - 1 + projects.length) % projects.length;
    handleSlideChange(newSlide);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    if (index === currentSlide || isTransitioning) return;
    handleSlideChange(index);
    setIsAutoPlaying(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
  };

  const currentProject = projects[currentSlide];

  return (
    <section id="projects" className="py-20 bg-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
        </div>

        {/* Main Project Display */}
        <div className="relative flex items-center gap-8">
          
          {/* Left Navigation Button */}
          <button
            onClick={prevSlide}
            disabled={isTransitioning}
            className="hidden lg:flex items-center justify-center w-16 h-16 bg-gray-800 hover:bg-gray-900 text-white rounded-full transition-all duration-300 hover:scale-110 shadow-2xl border border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 z-10"
            aria-label="Previous project"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          {/* Project Cards Container */}
          <div className="flex-1">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 transition-all duration-500 ease-in-out ${
              isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
            }`}>
              
              {/* Left Card - Project Image */}
              <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-2xl border border-gray-700">
                <div className="relative h-96 lg:h-[500px] overflow-hidden">
                  <img
                    src={currentProject.image}
                    alt={currentProject.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-900/40 via-transparent to-gray-900/60"></div>

                  {/* Category Badge */}
                  <div className="absolute top-6 right-6">
                    <div className="flex items-center gap-2 bg-blue-500/20 backdrop-blur-sm border border-blue-500/40 px-4 py-2 rounded-full text-blue-300 text-sm font-medium">
                      <Tag className="w-4 h-4" />
                      {currentProject.category}
                    </div>
                  </div>

                  {/* Mobile Navigation Arrows (only visible on mobile) */}
                  <button
                    onClick={prevSlide}
                    disabled={isTransitioning}
                    className="lg:hidden absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-gray-800/80 hover:bg-gray-900 text-white rounded-full transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    aria-label="Previous project"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextSlide}
                    disabled={isTransitioning}
                    className="lg:hidden absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-gray-800/80 hover:bg-gray-900 text-white rounded-full transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    aria-label="Next project"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Right Card - Project Information */}
              <div className="bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 p-8 lg:p-12 flex flex-col justify-center">
                <div className="space-y-8">
                  {/* Project Title and Description */}
                  <div>
                    <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight">
                      {currentProject.title}
                    </h3>
                    <p className="text-gray-400 text-lg leading-relaxed">
                      {currentProject.description}
                    </p>
                  </div>

                  {/* Topics */}
                  {currentProject.topics.length > 0 && (
                    <div>
                      <h4 className="text-white font-semibold mb-4">Project Tags:</h4>
                      <div className="flex flex-wrap gap-3">
                        {currentProject.topics.slice(0, 6).map((topic) => (
                          <span
                            key={topic}
                            className="px-3 py-2 bg-purple-500/20 text-purple-300 text-sm rounded-full border border-purple-500/40 transition-all duration-300 hover:scale-105 hover:bg-purple-500/30"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Technologies */}
                  <div>
                    <h4 className="text-white font-semibold mb-4">Technologies Used:</h4>
                    <div className="flex flex-wrap gap-3">
                      {currentProject.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-2 bg-gray-700 text-gray-300 text-sm rounded-lg border border-gray-600 transition-all duration-300 hover:bg-gray-600 hover:scale-105 hover:text-white"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Project Meta and Actions */}
                  <div className="space-y-6 pt-6 border-t border-gray-700">
                    {/* Project Meta */}
                    <div className="flex flex-wrap items-center gap-6 text-gray-400 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span className="font-medium">Created {currentProject.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span className="font-medium">Updated {formatDate(currentProject.lastUpdated)}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-4">
                      <a
                        href={currentProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-3 hover:scale-105 hover:shadow-lg border border-gray-600 hover:border-gray-500"
                      >
                        <Github className="w-5 h-5" />
                        View Code
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Navigation Button */}
          <button
            onClick={nextSlide}
            disabled={isTransitioning}
            className="hidden lg:flex items-center justify-center w-16 h-16 bg-gray-800 hover:bg-gray-900 text-white rounded-full transition-all duration-300 hover:scale-110 shadow-2xl border border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 z-10"
            aria-label="Next project"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>

        {/* Carousel Controls */}
        <div className="flex flex-col items-center gap-6 mt-12">
          {/* Carousel Indicators */}
          <div className="flex justify-center items-center gap-4">
            <div className="flex gap-3">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  disabled={isTransitioning}
                  className={`w-4 h-4 rounded-full transition-all duration-300 disabled:cursor-not-allowed border-2 ${
                    index === currentSlide
                      ? 'bg-blue-500 border-blue-400 scale-125 shadow-lg shadow-blue-500/50'
                      : 'bg-transparent border-gray-600 hover:border-gray-400 hover:scale-110'
                  }`}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>
            
            {/* Auto-play toggle */}
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className={`ml-6 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 border ${
                isAutoPlaying
                  ? 'bg-blue-500/20 text-blue-300 border-blue-500/40 shadow-lg shadow-blue-500/25'
                  : 'bg-gray-700 text-gray-400 border-gray-600 hover:bg-gray-600 hover:border-gray-500'
              }`}
            >
              {isAutoPlaying ? 'Auto Playing' : 'Manual Mode'}
            </button>
          </div>

          {/* Project Counter */}
          <div className="text-center">
            <span className="text-gray-400 text-lg font-medium">
              Project {currentSlide + 1} of {projects.length}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;