import { useState, useEffect } from 'react';
import { Github, Linkedin, Quote } from 'lucide-react';

const Contact = () => {
  const [currentQuote, setCurrentQuote] = useState(0);

  const quotes = [
    {
      text: "Clean code always looks like it was written by someone who cares.",
      author: "Robert C. Martin (Uncle Bob)",
      role: "Software Engineer & Author"
    },
    {
      text: "C makes it easy to shoot yourself in the foot; C++ makes it harder, but when you do it blows your whole leg off.",
      author: "Bjarne Stroustrup",
      role: "Creator of C++"
    },
    {
      text: "Code is like humor. When you have to explain it, it's bad.",
      author: "Cory House",
      role: "Software Architect"
    },
    {
      text: "Programming isn't about what you know; it's about what you can figure out.",
      author: "Chris Pine",
      role: "Author & Educator"
    },
    {
      text: "The most important property of a program is whether it accomplishes the intention of its user.",
      author: "C.A.R. Hoare",
      role: "Computer Scientist"
    },
    {
      text: "Innovation distinguishes between a leader and a follower.",
      author: "Steve Jobs",
      role: "Co-founder of Apple"
    },
    {
      text: "Talk is cheap. Show me the code.",
      author: "Linus Torvalds",
      role: "Creator of Linux"
    },
    {
      text: "The function of good software is to make the complex appear to be simple.",
      author: "Grady Booch",
      role: "Software Engineer & Author"
    },
    {
      text: "First, solve the problem. Then, write the code.",
      author: "John Johnson",
      role: "Software Developer"
    },
    {
      text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
      author: "Martin Fowler",
      role: "Software Developer & Author"
    },
    {
      text: "The best way to get a project done faster is to start sooner.",
      author: "Jim Highsmith",
      role: "Software Engineer & Author"
    },
    {
      text: "Debugging is twice as hard as writing the code in the first place.",
      author: "Brian Kernighan",
      role: "Computer Scientist"
    },
    {
      text: "There are only two hard things in Computer Science: cache invalidation and naming things.",
      author: "Phil Karlton",
      role: "Computer Scientist"
    },
    {
      text: "The way to get started is to quit talking and begin doing.",
      author: "Walt Disney",
      role: "Entrepreneur & Innovator"
    },
    {
      text: "Simplicity is the ultimate sophistication.",
      author: "Leonardo da Vinci",
      role: "Renaissance Polymath"
    }
  ];

  const socialLinks = [
    {
      icon: <Github className="w-6 h-6" />,
      label: 'GitHub',
      href: 'https://github.com/lgpaula',
      color: 'hover:text-gray-300'
    },
    {
      icon: <Linkedin className="w-6 h-6" />,
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/lucasgdepaula/',
      color: 'hover:text-blue-400'
    }
  ];

  // Auto-rotate quotes every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 60000); // 60 seconds

    return () => clearInterval(interval);
  }, [quotes.length]);

  const currentQuoteData = quotes[currentQuote];

  return (
    <section id="contact" className="py-20 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            I'm always interested in new opportunities and exciting projects.
          </p>
        </div>

        {/* Quotes Carousel */}
        <div className="mb-16">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-900 rounded-2xl p-8 md:p-12 shadow-2xl border border-gray-700 relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-teal-500/10 to-blue-500/10 rounded-full blur-2xl"></div>
              
              {/* Quote icon */}
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border border-blue-500/30">
                  <Quote className="w-8 h-8 text-blue-400" />
                </div>
              </div>

              {/* Quote content with fade transition */}
              <div 
                key={currentQuote}
                className="text-center space-y-6 animate-fade-in"
              >
                <blockquote className="text-xl md:text-2xl lg:text-3xl font-medium text-white leading-relaxed italic">
                  "{currentQuoteData.text}"
                </blockquote>
                
                <div className="space-y-2">
                  <cite className="text-lg font-semibold text-blue-400 not-italic">
                    — {currentQuoteData.author}
                  </cite>
                  <p className="text-gray-400 text-sm">
                    {currentQuoteData.role}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center">
          <div>
            <div className="flex justify-center gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 bg-gray-700/50 rounded-lg text-gray-400 ${social.color} hover:bg-gray-700 transition-all duration-300 hover:scale-110`}
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;