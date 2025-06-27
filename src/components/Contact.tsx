import { Github, Linkedin } from 'lucide-react';

const Contact = () => {
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