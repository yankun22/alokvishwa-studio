export type ProjectCategory = 
  | 'All'
  | 'Web3D & Web Audio'
  | 'Fintech & Data Systems'
  | 'Commercial & Platforms';

export interface Project {
  id: string;
  title: string;
  url: string;
  category: ProjectCategory;
  stack: string[];
  summary: string;
  highlights: string[];
  status: 'Live on Vercel' | 'Production Ready' | 'Active Engine';
  metrics?: string;
  numberPrefix: string; // e.g. "01", "02"
  architectureDetails: {
    frontendStack: string;
    engineOrRuntime: string;
    stateAndData: string;
    performanceWins: string;
    keyFeatures: string[];
  };
}

export interface ArchitecturePillar {
  id: string;
  title: string;
  badge: string;
  description: string;
  iconName: string;
  stats: string;
  statLabel: string;
  tags: string[];
  interactiveType: 'webgl' | 'viewport' | 'compute' | 'vitals';
}

export interface TechSkillCategory {
  title: string;
  iconName: string;
  skills: {
    name: string;
    level: number;
    experience: string;
    highlight?: boolean;
  }[];
}
