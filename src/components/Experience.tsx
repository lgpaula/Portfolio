import React from 'react';
import { Calendar, MapPin, Briefcase, Award, TrendingUp } from 'lucide-react';

const Experience = () => {
  const experiences = [
    {
      id: 1,
      title: 'Senior Software Engineer',
      company: 'TechCorp Solutions',
      location: 'San Francisco, CA',
      period: '2022 - Present',
      type: 'Full-time',
      description: 'Leading a team of 6 developers in building scalable web applications. Architected microservices infrastructure that improved system performance by 40%. Mentored junior developers and established coding standards.',
      achievements: [
        'Reduced deployment time by 60% through CI/CD optimization',
        'Led migration to microservices architecture',
        'Implemented automated testing resulting in 95% code coverage',
        'Mentored 8 junior developers'
      ],
      technologies: ['React', 'Node.js', 'AWS', 'Docker', 'Kubernetes']
    },
    {
      id: 2,
      title: 'Full Stack Developer',
      company: 'StartupHub Inc.',
      location: 'Austin, TX',
      period: '2020 - 2022',
      type: 'Full-time',
      description: 'Developed and maintained multiple client applications using modern web technologies. Collaborated with designers and product managers to deliver user-centered solutions.',
      achievements: [
        'Built 12+ production applications from scratch',
        'Improved page load times by 50% through optimization',
        'Integrated payment systems processing $2M+ monthly',
        'Established component library used across all projects'
      ],
      technologies: ['Vue.js', 'Python', 'PostgreSQL', 'Stripe', 'Firebase']
    },
    {
      id: 3,
      title: 'Software Engineer',
      company: 'WebTech Agency',
      location: 'Remote',
      period: '2019 - 2020',
      type: 'Full-time',
      description: 'Focused on frontend development and user experience optimization. Worked closely with UX designers to implement pixel-perfect designs and smooth animations.',
      achievements: [
        'Delivered 20+ responsive web applications',
        'Increased user engagement by 35% through UX improvements',
        'Optimized applications for mobile-first experience',
        'Collaborated with international remote team'
      ],
      technologies: ['React', 'JavaScript', 'SASS', 'REST APIs', 'Git']
    },
    {
      id: 4,
      title: 'Junior Developer',
      company: 'Digital Solutions Ltd.',
      location: 'New York, NY',
      period: '2018 - 2019',
      type: 'Full-time',
      description: 'Started my professional journey building web applications and learning industry best practices. Contributed to various projects and gained experience in agile development.',
      achievements: [
        'Completed 6-month intensive training program',
        'Contributed to 8 major projects',
        'Learned agile development methodologies',
        'Built first production application'
      ],
      technologies: ['HTML/CSS', 'JavaScript', 'PHP', 'MySQL', 'Bootstrap']
    }
  ];

  const stats = [
    { icon: <Briefcase className="w-6 h-6" />, label: 'Years Experience', value: '5+' },
    { icon: <Award className="w-6 h-6" />, label: 'Projects Completed', value: '50+' },
    { icon: <TrendingUp className="w-6 h-6" />, label: 'Team Members Led', value: '15+' },
    { icon: <Calendar className="w-6 h-6" />, label: 'Companies Worked', value: '4' }
  ];

  return (
    <section id="experience" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Professional Experience
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            My journey through various roles and companies, building expertise and delivering impactful solutions.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-6 bg-gray-800 rounded-lg">
              <div className="text-blue-400 flex justify-center mb-2">
                {stat.icon}
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 via-purple-400 to-teal-400 transform md:-translate-x-0.5"></div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={exp.id}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } flex-col md:flex`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-blue-500 rounded-full transform -translate-x-2 md:-translate-x-2 z-10 border-2 border-gray-900"></div>

                {/* Content */}
                <div className={`w-full md:w-5/12 ml-12 md:ml-0 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                  <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors duration-300 shadow-lg">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium">
                        {exp.type}
                      </span>
                      <div className="flex items-center text-gray-400 text-sm">
                        <Calendar className="w-4 h-4 mr-1" />
                        {exp.period}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2">{exp.title}</h3>
                    
                    <div className="flex items-center gap-4 mb-4 text-gray-300">
                      <span className="font-semibold">{exp.company}</span>
                      <div className="flex items-center text-sm text-gray-400">
                        <MapPin className="w-4 h-4 mr-1" />
                        {exp.location}
                      </div>
                    </div>

                    <p className="text-gray-400 mb-4 leading-relaxed">
                      {exp.description}
                    </p>

                    <div className="mb-4">
                      <h4 className="text-white font-semibold mb-2">Key Achievements:</h4>
                      <ul className="space-y-1">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i} className="text-gray-400 text-sm flex items-start">
                            <span className="text-green-400 mr-2 mt-1">•</span>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-gray-600/50 text-gray-300 text-xs rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Spacer for larger screens */}
                <div className="hidden md:block w-2/12"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;