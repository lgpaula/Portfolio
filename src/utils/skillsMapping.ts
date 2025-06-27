// Mapping of GitHub languages to skill categories and display names
export const languageToSkillMapping: Record<string, {
  category: string;
  displayName: string;
  level?: number; // Optional: you can set custom levels
}> = {
  // Frontend
  'JavaScript': { category: 'frontend', displayName: 'JavaScript' },
  'TypeScript': { category: 'frontend', displayName: 'TypeScript' },
  'HTML': { category: 'frontend', displayName: 'HTML/CSS' },
  'CSS': { category: 'frontend', displayName: 'HTML/CSS' },
  'Vue': { category: 'frontend', displayName: 'Vue.js' },
  'Svelte': { category: 'frontend', displayName: 'Svelte' },
  
  // Backend
  'Python': { category: 'backend', displayName: 'Python' },
  'Java': { category: 'backend', displayName: 'Java' },
  'C#': { category: 'backend', displayName: 'C#' },
  'Go': { category: 'backend', displayName: 'Go' },
  'Rust': { category: 'backend', displayName: 'Rust' },
  'PHP': { category: 'backend', displayName: 'PHP' },
  'Ruby': { category: 'backend', displayName: 'Ruby' },
  'C++': { category: 'backend', displayName: 'C++' },
  'C': { category: 'backend', displayName: 'C' },
  'Kotlin': { category: 'mobile', displayName: 'Kotlin' },
  'Swift': { category: 'mobile', displayName: 'Swift' },
  
  // Database & Data
  'SQL': { category: 'database', displayName: 'SQL' },
  'PLpgSQL': { category: 'database', displayName: 'PostgreSQL' },
  'TSQL': { category: 'database', displayName: 'SQL Server' },
  
  // DevOps & Infrastructure
  'Shell': { category: 'cloud', displayName: 'Shell Scripting' },
  'PowerShell': { category: 'cloud', displayName: 'PowerShell' },
  'Dockerfile': { category: 'cloud', displayName: 'Docker' },
  'YAML': { category: 'cloud', displayName: 'YAML/Config' },
  'HCL': { category: 'cloud', displayName: 'Terraform' },
  
  // Mobile
  'Dart': { category: 'mobile', displayName: 'Flutter/Dart' },
  'Objective-C': { category: 'mobile', displayName: 'Objective-C' },
  
  // Other
  'Jupyter Notebook': { category: 'backend', displayName: 'Data Science' },
  'R': { category: 'backend', displayName: 'R' },
  'MATLAB': { category: 'backend', displayName: 'MATLAB' },
};

// Additional skills that might not be detected from GitHub languages
export const additionalSkills = {
  frontend: [
    { name: 'React', level: 95 },
    { name: 'Next.js', level: 85 },
    { name: 'Tailwind CSS', level: 90 },
    { name: 'Sass/SCSS', level: 85 },
  ],
  backend: [
    { name: 'Node.js', level: 90 },
    { name: 'Express.js', level: 88 },
    { name: 'GraphQL', level: 82 },
    { name: 'REST APIs', level: 95 },
    { name: 'Microservices', level: 80 },
  ],
  database: [
    { name: 'PostgreSQL', level: 88 },
    { name: 'MongoDB', level: 85 },
    { name: 'Redis', level: 80 },
    { name: 'Prisma', level: 85 },
    { name: 'Supabase', level: 90 },
    { name: 'Firebase', level: 82 },
  ],
  mobile: [
    { name: 'React Native', level: 85 },
    { name: 'Expo', level: 88 },
    { name: 'Mobile UI/UX', level: 85 },
  ],
  cloud: [
    { name: 'AWS', level: 85 },
    { name: 'Docker', level: 88 },
    { name: 'Kubernetes', level: 75 },
    { name: 'CI/CD', level: 85 },
    { name: 'Monitoring', level: 82 },
  ],
  security: [
    { name: 'Jest', level: 90 },
    { name: 'Cypress', level: 85 },
    { name: 'Unit Testing', level: 95 },
    { name: 'OAuth/JWT', level: 88 },
    { name: 'Security Audits', level: 80 },
    { name: 'OWASP', level: 78 },
  ]
};

export const calculateSkillLevel = (languageBytes: number, totalBytes: number): number => {
  const percentage = (languageBytes / totalBytes) * 100;
  // Convert to a skill level between 60-95 (assuming if you use it, you're at least intermediate)
  return Math.min(95, Math.max(60, Math.round(60 + (percentage * 0.35))));
};