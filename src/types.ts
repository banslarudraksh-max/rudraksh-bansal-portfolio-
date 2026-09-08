export interface NavItem {
  label: string;
  href: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  icon: string;
  skills: {
    name: string;
    level?: string;
    note?: string;
  }[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  fullDescription: string;
  keyFeatures: string[];
  technologies: string[];
  githubPlaceholder: string;
  demoPlaceholder?: string;
  codeSnippetPreview?: {
    language: string;
    filename: string;
    code: string;
  };
}

export interface HighlightCard {
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
}

export interface ValueCard {
  title: string;
  description: string;
  iconName: string;
}

export interface EducationMilestone {
  degree: string;
  institution: string;
  currentSemester: string;
  period: string;
  specialization: string;
  description: string;
  coursework: string[];
}
