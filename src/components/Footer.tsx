import { ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 text-gray-400 mb-4 md:mb-0">
            <span>© {currentYear} Lucas de Paula</span>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-gray-400 text-sm">
              Vibecoded using React, TypeScript & Tailwind CSS
            </div>
            
            <button
              onClick={scrollToTop}
              className="p-2 bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white rounded-lg transition-all duration-300 hover:scale-110"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;