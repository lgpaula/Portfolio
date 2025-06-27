import { useState, useEffect } from 'react';

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  language: string;
  languages_url: string;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
  homepage: string;
  topics: string[];
  created_at: string;
  updated_at: string;
  fork: boolean;
  archived: boolean;
  private: boolean;
}

interface LanguageStats {
  [key: string]: number;
}

interface GitHubData {
  repos: GitHubRepo[];
  featuredRepos: GitHubRepo[];
  languages: LanguageStats;
  totalStars: number;
  totalRepos: number;
  isLoading: boolean;
  error: string | null;
}

export const useGitHubData = (username: string): GitHubData => {
  const [data, setData] = useState<GitHubData>({
    repos: [],
    featuredRepos: [],
    languages: {},
    totalStars: 0,
    totalRepos: 0,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const fetchGitHubData = async () => {
      if (!username) {
        setData(prev => ({ ...prev, isLoading: false, error: 'No username provided' }));
        return;
      }

      try {
        setData(prev => ({ ...prev, isLoading: true, error: null }));

        // Fetch repositories
        const reposResponse = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
        );

        if (!reposResponse.ok) {
          throw new Error(`GitHub API error: ${reposResponse.status}`);
        }

        const repos: GitHubRepo[] = await reposResponse.json();
        
        // Filter out forks and get only original repos
        const originalRepos = repos.filter(repo => !repo.fork && !repo.archived);

        // Select featured repositories based on criteria
        const featuredRepos = selectFeaturedRepos(originalRepos);

        // Calculate total stars
        const totalStars = originalRepos.reduce((sum, repo) => sum + repo.stargazers_count, 0);

        // Aggregate languages from all repos
        const languageStats: LanguageStats = {};
        
        // Get language data for each repo (limited to avoid rate limiting)
        const languagePromises = originalRepos.slice(0, 20).map(async (repo) => {
          try {
            const langResponse = await fetch(repo.languages_url);
            if (langResponse.ok) {
              const languages = await langResponse.json();
              Object.entries(languages).forEach(([lang, bytes]) => {
                languageStats[lang] = (languageStats[lang] || 0) + (bytes as number);
              });
            }
          } catch (error) {
            console.warn(`Failed to fetch languages for ${repo.name}:`, error);
          }
        });

        await Promise.all(languagePromises);

        // Get detailed language data for featured repos
        const featuredReposWithLanguages = await Promise.all(
          featuredRepos.map(async (repo) => {
            try {
              const langResponse = await fetch(repo.languages_url);
              if (langResponse.ok) {
                const languages = await langResponse.json();
                return { ...repo, detailedLanguages: languages };
              }
            } catch (error) {
              console.warn(`Failed to fetch languages for ${repo.name}:`, error);
            }
            return { ...repo, detailedLanguages: {} };
          })
        );

        setData({
          repos: originalRepos,
          featuredRepos: featuredReposWithLanguages,
          languages: languageStats,
          totalStars,
          totalRepos: originalRepos.length,
          isLoading: false,
          error: null,
        });

      } catch (error) {
        console.error('Error fetching GitHub data:', error);
        setData(prev => ({
          ...prev,
          isLoading: false,
          error: error instanceof Error ? error.message : 'Failed to fetch GitHub data',
        }));
      }
    };

    fetchGitHubData();
  }, [username]);

  return data;
};

// Function to select featured repositories based on various criteria
const selectFeaturedRepos = (repos: GitHubRepo[]): GitHubRepo[] => {
  // Sort repositories by a combination of factors:
  // 1. Stars (popularity)
  // 2. Recent activity
  // 3. Has description
  // 4. Has homepage/demo
  // 5. Has topics/tags
  
  const scoredRepos = repos.map(repo => {
    let score = 0;
    
    // Stars weight (max 50 points)
    score += Math.min(repo.stargazers_count * 5, 50);
    
    // Recent activity (max 20 points)
    const daysSinceUpdate = (Date.now() - new Date(repo.updated_at).getTime()) / (1000 * 60 * 60 * 24);
    score += Math.max(0, 20 - (daysSinceUpdate / 30)); // Lose points for older repos
    
    // Has description (10 points)
    if (repo.description && repo.description.length > 10) score += 10;
    
    // Has homepage/demo (15 points)
    if (repo.homepage) score += 15;
    
    // Has topics (5 points)
    if (repo.topics && repo.topics.length > 0) score += 5;
    
    // Bonus for certain keywords in name or description
    const text = `${repo.name} ${repo.description || ''}`.toLowerCase();
    const bonusKeywords = ['app', 'web', 'api', 'dashboard', 'tool', 'platform', 'system'];
    bonusKeywords.forEach(keyword => {
      if (text.includes(keyword)) score += 3;
    });
    
    return { ...repo, score };
  });
  
  // Sort by score and take top 6
  return scoredRepos
    .sort((a, b) => b.score - a.score)
    .slice(0, 6);
};