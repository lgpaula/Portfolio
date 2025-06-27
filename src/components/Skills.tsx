import React, { useState } from 'react';
import { Database, Globe, Server, Smartphone, Cloud, Shield, Github, Star, GitBranch } from 'lucide-react';
import { useGitHubData } from '../hooks/useGitHubData';
import { languageToSkillMapping, additionalSkills, calculateSkillLevel } from '../utils/skillsMapping';

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('frontend');
  
  const githubUsername = 'lgpaula';
  const { languages, totalStars, totalRepos, isLoading, error } = useGitHubData(githubUsername);

  // Process GitHub languages into skills
  const processGitHubSkills = () => {
    const totalBytes = Object.values(languages).reduce((sum, bytes) => sum + bytes, 0);
    const processedSkills: Record<string, Array<{ name: string; level: number; fromGitHub: boolean }>> = {
      frontend: [],
      backend: [],
      database: [],
      mobile: [],
      cloud: [],
      security: []
    };

    // Add GitHub-detected skills
    Object.entries(languages).forEach(([language, bytes]) => {
      const mapping = languageToSkillMapping[language];
      if (mapping) {
        const level = mapping.level || calculateSkillLevel(bytes, totalBytes);
        const category = mapping.category as keyof typeof processedSkills;
        
        // Avoid duplicates
        const existingSkill = processedSkills[category].find(skill => skill.name === mapping.displayName);
        if (!existingSkill) {
          processedSkills[category].push({
            name: mapping.displayName,
            level,
            fromGitHub: true
          });
        }
      }
    });

    // Add additional skills (frameworks, tools, etc.)
    Object.entries(additionalSkills).forEach(([category, skills]) => {
      const categoryKey = category as keyof typeof processedSkills;
      skills.forEach(skill => {
        // Avoid duplicates
        const existingSkill = processedSkills[categoryKey].find(s => s.name === skill.name);
        if (!existingSkill) {
          processedSkills[categoryKey].push({
            name: skill.name,
            level: skill.level,
            fromGitHub: false
          });
        }
      });
    });

    // Sort skills by level (highest first)
    Object.keys(processedSkills).forEach(category => {
      const categoryKey = category as keyof typeof processedSkills;
      processedSkills[categoryKey].sort((a, b) => b.level - a.level);
    });

    return processedSkills;
  };

  const skillCategories = {
    frontend: {
      title: 'Frontend Development',
      icon: <Globe className="w-6 h-6" />,
      skills: processGitHubSkills().frontend
    },
    backend: {
      title: 'Backend Development',
      icon: <Server className="w-6 h-6" />,
      skills: processGitHubSkills().backend
    },
    database: {
      title: 'Database & Storage',
      icon: <Database className="w-6 h-6" />,
      skills: processGitHubSkills().database
    },
    mobile: {
      title: 'Mobile Development',
      icon: <Smartphone className="w-6 h-6" />,
      skills: processGitHubSkills().mobile
    },
    cloud: {
      title: 'Cloud & DevOps',
      icon: <Cloud className="w-6 h-6" />,
      skills: processGitHubSkills().cloud
    },
    security: {
      title: 'Security & Testing',
      icon: <Shield className="w-6 h-6" />,
      skills: processGitHubSkills().security
    }
  };

  return (
    <section id="skills" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Skills & Technologies
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            My technical expertise across different domains, automatically updated from my GitHub repositories.
          </p>
        </div>

        {/* GitHub Stats */}
        {!isLoading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gray-800 rounded-lg p-6 text-center">
              <div className="flex items-center justify-center mb-2">
                <Github className="w-6 h-6 text-blue-400 mr-2" />
                <span className="text-2xl font-bold text-white">{totalRepos}</span>
              </div>
              <p className="text-gray-400">Public Repositories</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-6 text-center">
              <div className="flex items-center justify-center mb-2">
                <Star className="w-6 h-6 text-yellow-400 mr-2" />
                <span className="text-2xl font-bold text-white">{totalStars}</span>
              </div>
              <p className="text-gray-400">Total Stars</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-6 text-center">
              <div className="flex items-center justify-center mb-2">
                <GitBranch className="w-6 h-6 text-green-400 mr-2" />
                <span className="text-2xl font-bold text-white">{Object.keys(languages).length}</span>
              </div>
              <p className="text-gray-400">Languages Used</p>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-flex items-center gap-2 text-blue-400">
              <div className="w-5 h-5 border-2 border-blue-400/30 border-t-blue-400 rounded-full animate-spin"></div>
              Loading GitHub data...
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-8">
            <p className="text-red-400 text-center">
              {error.includes('username') 
                ? 'Please update your GitHub username in the Skills component to see your data.'
                : `Error loading GitHub data: ${error}`
              }
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Category Tabs */}
          <div className="lg:col-span-1">
            <div className="space-y-2">
              {Object.entries(skillCategories).map(([key, category]) => (
                <button
                  key={key}
                  onClick={() => setActiveCategory(key)}
                  className={`w-full p-4 rounded-lg text-left transition-all duration-300 flex items-center gap-3 ${
                    activeCategory === key
                      ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <span className={activeCategory === key ? 'text-blue-400' : 'text-gray-500'}>
                    {category.icon}
                  </span>
                  <div>
                    <span className="font-medium block">{category.title}</span>
                    <span className="text-xs text-gray-500">
                      {category.skills.length} skills
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Skills Content */}
          <div className="lg:col-span-3">
            <div className="bg-gray-800 rounded-lg p-8">
              <div className="flex items-center gap-3 mb-8">
                <span className="text-blue-400">
                  {skillCategories[activeCategory as keyof typeof skillCategories].icon}
                </span>
                <h3 className="text-2xl font-bold text-white">
                  {skillCategories[activeCategory as keyof typeof skillCategories].title}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {skillCategories[activeCategory as keyof typeof skillCategories].skills.map((skill, index) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-300 font-medium">{skill.name}</span>
                        {skill.fromGitHub && (
                          <Github className="w-3 h-3 text-blue-400" title="Detected from GitHub" />
                        )}
                      </div>
                      <span className="text-blue-400 text-sm font-semibold">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-400 to-purple-400 h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{ 
                          width: `${skill.level}%`,
                          animationDelay: `${index * 100}ms`
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              {skillCategories[activeCategory as keyof typeof skillCategories].skills.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  No skills detected for this category yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;