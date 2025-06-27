// Mapping of GitHub languages to project categories
export const languageToCategory: Record<string, string> = {
  'JavaScript': 'frontend',
  'TypeScript': 'frontend',
  'React': 'frontend',
  'Vue': 'frontend',
  'Angular': 'frontend',
  'Svelte': 'frontend',
  'HTML': 'frontend',
  'CSS': 'frontend',
  'SCSS': 'frontend',
  
  'Python': 'backend',
  'Node.js': 'backend',
  'Java': 'backend',
  'C#': 'backend',
  'Go': 'backend',
  'Rust': 'backend',
  'PHP': 'backend',
  'Ruby': 'backend',
  'C++': 'backend',
  'C': 'backend',
  
  'Swift': 'mobile',
  'Kotlin': 'mobile',
  'Dart': 'mobile',
  'Objective-C': 'mobile',
  'React Native': 'mobile',
  'Flutter': 'mobile',
  
  'Shell': 'devops',
  'Dockerfile': 'devops',
  'YAML': 'devops',
  'HCL': 'devops',
  'PowerShell': 'devops',
  
  'Jupyter Notebook': 'data',
  'R': 'data',
  'MATLAB': 'data',
  'SQL': 'data',
};

// Function to determine project category based on languages and topics
export const determineProjectCategory = (
  languages: Record<string, number>,
  topics: string[] = []
): string => {
  // Check topics first for more accurate categorization
  const topicCategories: Record<string, string> = {
    'react': 'frontend',
    'vue': 'frontend',
    'angular': 'frontend',
    'frontend': 'frontend',
    'web': 'frontend',
    'ui': 'frontend',
    'dashboard': 'frontend',
    
    'api': 'backend',
    'backend': 'backend',
    'server': 'backend',
    'microservice': 'backend',
    'database': 'backend',
    
    'mobile': 'mobile',
    'ios': 'mobile',
    'android': 'mobile',
    'react-native': 'mobile',
    'flutter': 'mobile',
    
    'devops': 'devops',
    'docker': 'devops',
    'kubernetes': 'devops',
    'ci-cd': 'devops',
    'deployment': 'devops',
    
    'machine-learning': 'data',
    'data-science': 'data',
    'ai': 'data',
    'analytics': 'data',
  };

  // Check topics first
  for (const topic of topics) {
    const category = topicCategories[topic.toLowerCase()];
    if (category) return category;
  }

  // If no topic match, use primary language
  const sortedLanguages = Object.entries(languages)
    .sort(([, a], [, b]) => b - a);
  
  if (sortedLanguages.length > 0) {
    const primaryLanguage = sortedLanguages[0][0];
    return languageToCategory[primaryLanguage] || 'fullstack';
  }

  return 'fullstack';
};

// Function to extract tech stack from languages
export const extractTechStack = (languages: Record<string, number>): string[] => {
  const totalBytes = Object.values(languages).reduce((sum, bytes) => sum + bytes, 0);
  
  return Object.entries(languages)
    .filter(([, bytes]) => bytes / totalBytes > 0.05) // Only include languages that make up >5% of the codebase
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5) // Top 5 languages
    .map(([language]) => language);
};

// Function to generate project image based on category and languages
export const getProjectImage = (category: string, languages: string[]): string => {
  const imageMap: Record<string, string> = {
    'frontend': 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600',
    'backend': 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=600',
    'mobile': 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=600',
    'devops': 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=600',
    'data': 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=600',
    'fullstack': 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=600',
  };

  // Special cases based on languages
  if (languages.includes('JavaScript') || languages.includes('TypeScript')) {
    return 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=600';
  }
  if (languages.includes('Python')) {
    return 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=600';
  }
  if (languages.includes('React') || languages.includes('Vue')) {
    return 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600';
  }

  return imageMap[category] || imageMap['fullstack'];
};