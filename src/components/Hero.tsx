import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const texts = ['Software Engineer', 'Problem Solver', 'Tech Enthusiast'];

  useEffect(() => {
    const timer = setTimeout(() => {
      const currentText = texts[currentIndex];
      
      if (!isDeleting) {
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timer);
  }, [displayText, currentIndex, isDeleting, texts]);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto pb-20">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold">
              <span className="block text-white mb-2">Hi, I'm</span>
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-teal-400 bg-clip-text text-transparent">
                Lucas de Paula
              </span>
            </h1>
            
            <div className="h-12 flex items-center justify-center">
              <h2 className="text-xl sm:text-2xl lg:text-3xl text-gray-300">
                I'm a <span className="text-blue-400 font-semibold">{displayText}</span>
                <span className="animate-pulse">|</span>
              </h2>
            </div>
          </div>

          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            I'm a software developer focused on building efficient, well-structured apps that work — that usually don’t catch fire. Clean code, practical design, and just enough caffeine.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <a
              href="/LucasDePaula.pdf"
              download
              className="group bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span className="flex items-center gap-2">
                Download Resume
                <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </span>
            </a>
          </div>
        </div>

        <button
          onClick={scrollToAbout}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-gray-400 hover:text-white transition-colors duration-300 animate-bounce"
        >
          <ChevronDown className="w-8 h-8" />
        </button>
      </div>
    </section>
  );
};

export default Hero;