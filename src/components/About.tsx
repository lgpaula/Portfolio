import { Code, Coffee, Lightbulb, Users } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="prose prose-lg text-gray-300">
              <p className="leading-relaxed">
                I'm a passionate software engineer with over 5 years of experience building 
                scalable web applications and leading development teams. My journey started 
                with a Computer Science degree, but my real education came from countless 
                hours of coding, debugging, and shipping products that users love.
              </p>
              
              <p className="leading-relaxed">
                I thrive on turning complex problems into elegant solutions, whether it's 
                architecting microservices, optimizing database queries, or crafting 
                intuitive user interfaces. I believe great code is not just functional—it's 
                readable, maintainable, and tells a story.
              </p>
              
              <p className="leading-relaxed">
                When I'm not coding, you'll find me contributing to open source projects, 
                mentoring junior developers, or exploring the latest technologies. I'm 
                always eager to learn and share knowledge with the community.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 mt-8">
              <span className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium">
                Problem Solver
              </span>
              <span className="px-4 py-2 bg-purple-500/20 text-purple-300 rounded-full text-sm font-medium">
                Team Leader
              </span>
              <span className="px-4 py-2 bg-teal-500/20 text-teal-300 rounded-full text-sm font-medium">
                Continuous Learner
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="group bg-gray-700/50 p-6 rounded-lg hover:bg-gray-700 transition-all duration-300 hover:scale-105">
              <div className="text-blue-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                <Code className="w-8 h-8" />
              </div>
              <h3 className="text-white font-semibold mb-2">Clean Code</h3>
              <p className="text-gray-400 text-sm">
                Writing maintainable, well-documented code that stands the test of time.
              </p>
            </div>

            <div className="group bg-gray-700/50 p-6 rounded-lg hover:bg-gray-700 transition-all duration-300 hover:scale-105">
              <div className="text-purple-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                <Lightbulb className="w-8 h-8" />
              </div>
              <h3 className="text-white font-semibold mb-2">Innovation</h3>
              <p className="text-gray-400 text-sm">
                Always exploring new technologies and approaches to solve challenges.
              </p>
            </div>

            <div className="group bg-gray-700/50 p-6 rounded-lg hover:bg-gray-700 transition-all duration-300 hover:scale-105">
              <div className="text-teal-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-white font-semibold mb-2">Collaboration</h3>
              <p className="text-gray-400 text-sm">
                Building strong relationships and fostering teamwork for better results.
              </p>
            </div>

            <div className="group bg-gray-700/50 p-6 rounded-lg hover:bg-gray-700 transition-all duration-300 hover:scale-105">
              <div className="text-orange-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                <Coffee className="w-8 h-8" />
              </div>
              <h3 className="text-white font-semibold mb-2">Dedication</h3>
              <p className="text-gray-400 text-sm">
                Committed to delivering high-quality solutions with attention to detail.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;