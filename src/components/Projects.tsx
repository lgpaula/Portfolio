import { useState, useEffect } from 'react';
import { Github, Eye, Calendar, Tag, Star, GitFork, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { useGitHubData } from '../hooks/useGitHubData';
import { determineProjectCategory, extractTechStack, getProjectImage } from '../utils/projectsMapping';

const Projects = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Replace 'your-github-username' with your actual GitHub username
  const githubUsername = 'lgpaula'; // Change this to your GitHub username
  const { featuredRepos, isLoading, error } = useGitHubData(githubUsername);

  // Process GitHub repos into project format
  const processedProjects = featuredRepos.map(repo => {
    const languages = (repo as any).detailedLanguages || {};
    const techStack = extractTechStack(languages);
    const category = determineProjectCategory(languages, repo.topics);
    const image = getProjectImage(category, techStack);
    
    return {
      id: repo.id,
      title: repo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      description: repo.description || 'A project built with modern technologies and best practices.',
      image,
      technologies: techStack.length > 0 ? techStack : [repo.language].filter(Boolean),
      category,
      githubUrl: repo.html_url,
      liveUrl: repo.homepage || repo.html_url,
      date: new Date(repo.created_at).getFullYear().toString(),
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      lastUpdated: repo.updated_at,
      topics: repo.topics || []
    };
  });

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying || processedProjects.length === 0) return;

    const interval = setInterval(() => {
      handleSlideChange((prev) => (prev + 1) % processedProjects.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, processedProjects.length]);

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
    const newSlide = (currentSlide + 1) % processedProjects.length;
    handleSlideChange(newSlide);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    const newSlide = (currentSlide - 1 + processedProjects.length) % processedProjects.length;
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

  if (isLoading) {
    return (
      <section id="projects" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Featured Projects
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
          </div>
          <div className="text-center py-12">
            <div className="inline-flex items-center gap-2 text-blue-400">
              <div className="w-5 h-5 border-2 border-blue-400/30 border-t-blue-400 rounded-full animate-spin"></div>
              Loading projects from GitHub...
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Featured Projects
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
          </div>
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-8 text-center">
            <p className="text-red-400">
              {error.includes('username') 
                ? 'Please update your GitHub username in the Projects component to see your repositories.'
                : `Error loading GitHub projects: ${error}`
              }
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (processedProjects.length === 0) {
    return (
      <section id="projects" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Featured Projects
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
          </div>
          <div className="text-center py-12 text-gray-400">
            No projects found. Make sure your GitHub repositories are public.
          </div>
        </div>
      </section>
    );
  }

  const currentProject = processedProjects[currentSlide];

  return (
    <section id="projects" className="py-20 bg-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            My latest and most impactful projects, automatically curated from my GitHub repositories.
          </p>
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
                  
                  {/* Project Stats Overlay */}
                  <div className="absolute top-6 left-6 flex gap-3">
                    {currentProject.stars > 0 && (
                      <div className="flex items-center gap-1 bg-gray-800/90 backdrop-blur-sm px-4 py-2 rounded-full text-yellow-400 text-sm font-medium border border-yellow-400/20">
                        <Star className="w-4 h-4" />
                        {currentProject.stars}
                      </div>
                    )}
                    {currentProject.forks > 0 && (
                      <div className="flex items-center gap-1 bg-gray-800/90 backdrop-blur-sm px-4 py-2 rounded-full text-blue-400 text-sm font-medium border border-blue-400/20">
                        <GitFork className="w-4 h-4" />
                        {currentProject.forks}
                      </div>
                    )}
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-6 right-6">
                    <div className="flex items-center gap-2 bg-blue-500/20 backdrop-blur-sm border border-blue-500/40 px-4 py-2 rounded-full text-blue-300 text-sm font-medium">
                      <Tag className="w-4 h-4" />
                      {currentProject.category.charAt(0).toUpperCase() + currentProject.category.slice(1)}
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
                      {currentProject.liveUrl && currentProject.liveUrl !== currentProject.githubUrl && (
                        <a
                          href={currentProject.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-3 hover:scale-105 hover:shadow-xl"
                        >
                          <Eye className="w-5 h-5" />
                          Live Demo
                        </a>
                      )}
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
              {processedProjects.map((_, index) => (
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
              Project {currentSlide + 1} of {processedProjects.length}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;