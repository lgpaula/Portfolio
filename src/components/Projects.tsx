import { useState, useEffect } from 'react';
import { Github, Tag, ChevronLeft, ChevronRight } from 'lucide-react';

const Projects = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const projects = [
    {
      id: 1,
      title: 'FireAI',
      description: `A drone-based firefighter assistance tool designed to transform wildfire management. FireAI enables real-time fire detection and mapping, allowing for rapid, informed decision-making in critical scenarios.
I developed the autonomous mission backend for drones equipped with DJI M300 and NVIDIA Jetson, achieving early fire detection with over 90% accuracy across diverse terrains.`,
      image: 'fireai.png',
      technologies: ['C++', 'Ubuntu', 'Git'],
      category: 'Backend',
      githubUrl: '',
      isOpenSource: false
    },
    {
      id: 2,
      title: 'Omnisight',
      description: `Aerial search-and-rescue system leveraging drones to detect and locate people in real time from altitudes over 100 meters. The project emphasized autonomous navigation, terrain-aware flight, and AI-driven object recognition.
I created embedded modules for autonomous drone navigation and integrated feedback from real-world operators including GRAF firefighters and WWF personnel.`,
      image: 'omnisight.png',
      technologies: ['C++', 'Ubuntu', 'Git'],
      category: 'Backend',
      githubUrl: '',
      isOpenSource: false
    },
    {
      id: 3,
      title: 'Android Ground Control App',
      description: `An Android application used as the ground control interface for both FireAI and OmniSight. The app handles communication with the drone, displays real-time telemetry, and allows direct control.
I contributed to UI design and regularly shipped quality-of-life updates based on feedback from field operators.`,
      image: 'fireai.png',
      technologies: ['Java', 'Mobile', 'Android', 'Git'],
      category: 'Mobile Application',
      githubUrl: '',
      isOpenSource: false
    },
    {
      id: 4,
      title: 'CineLog',
      description: `A personal desktop app for tracking and organizing movies and TV shows. It features API integration, a custom backend/frontend architecture, and a scraper to gather metadata from the web. Built to be fully cross-platform and extensible.`,
      image: 'cinelog.png',
      technologies: ['C#', 'Python', 'Avalonia', 'SQLite', 'Flask', 'Cross-Platform', 'REST API'],
      category: 'Fullstack Desktop Application',
      githubUrl: 'https://github.com/lgpaula/CineLogUI',
      isOpenSource: true
    },
    {
      id: 5,
      title: 'BuffSnake',
      description: 'A modern take on the classic Snake game, featuring singleplayer and local multiplayer, with planned support for LAN multiplayer. The project showcases modular design, clean architecture, and strong OOP principles.',
      image: 'snake.png',
      technologies: ['C++', 'OpenCV', 'Multiplayer LAN', 'Fedora'],
      category: 'Desktop Game',
      githubUrl: 'https://github.com/lgpaula/BuffSnake',
      isOpenSource: true
    },
    {
      id: 6,
      title: 'Touchpad Volume Control',
      description: `A minimalist utility for controlling system volume using touchpad gestures on Fedora-based laptops. Lightweight and efficient, this tool adds gesture-based control for improved ergonomics and usability.`,
      image: 'touchpad.png',
      technologies: ['Fedora', 'Git'],
      category: 'Desktop Utility',
      githubUrl: 'https://github.com/lgpaula/TouchpadVolumeControl',
      isOpenSource: true
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
      setCurrentSlide(newSlideOrFunction);

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
        <div className="flex items-center gap-8">

          {/* Left Navigation Button */}
          <button
            onClick={prevSlide}
            disabled={isTransitioning}
            className="hidden lg:flex absolute left-4 items-center justify-center w-16 h-16 bg-gray-800 hover:bg-gray-900 text-white rounded-full transition-all duration-300 hover:scale-110 shadow-2xl border border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 z-10"
            aria-label="Previous project"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          {/* Project Cards Container */}
          <div className="flex-1">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 transition-all duration-500 ease-in-out ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
              }`}>

              {/* Left Card - Project Image */}
              <div className="self-center relative h-[500px] overflow-hidden rounded-2xl shadow-2xl border border-gray-700">
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

                  {/* Technologies */}
                  <div>
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
                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-4">
                      {currentProject.isOpenSource ? (
                        <a
                          href={currentProject.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-3 hover:scale-105 hover:shadow-lg border border-gray-600 hover:border-gray-500"
                        >
                          <Github className="w-5 h-5" />
                          View Code
                        </a>
                      ) : (
                        <button
                          disabled
                          className="bg-gray-800 text-gray-400 px-6 py-3 rounded-lg font-semibold flex items-center gap-3 border border-gray-700 cursor-not-allowed"
                        >
                          <Github className="w-5 h-5 opacity-50" />
                          Closed Source
                        </button>
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
            className="hidden lg:flex absolute right-4 items-center justify-center w-16 h-16 bg-gray-800 hover:bg-gray-900 text-white rounded-full transition-all duration-300 hover:scale-110 shadow-2xl border border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 z-10"
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
                  className={`w-4 h-4 rounded-full transition-all duration-300 disabled:cursor-not-allowed border-2 ${index === currentSlide
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
              className={`ml-6 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 border ${isAutoPlaying
                  ? 'bg-blue-500/20 text-blue-300 border-blue-500/40 shadow-lg shadow-blue-500/25'
                  : 'bg-gray-700 text-gray-400 border-gray-600 hover:bg-gray-600 hover:border-gray-500'
                }`}
            >
              {isAutoPlaying ? 'Auto Playing' : 'Manual Mode'}
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Projects;