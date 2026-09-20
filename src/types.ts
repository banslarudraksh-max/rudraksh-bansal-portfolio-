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
  keyFeatures?: string[];
  technologies: string[];
  githubPlaceholder: string;
  demoPlaceholder?: string;
  mainImageUrl?: string;
  imageUrl?: string;
  screenshots?: string[];
  status?: string;
  isFeatured?: boolean;
  isVisible?: boolean;
  displayOrder?: number;
  codeSnippetPreview?: {
    language: string;
    filename: string;
    code: string;
  };
}

export interface ProjectImageRecord {
  id: string;
  projectId: string;
  imageUrl: string;
  caption?: string;
  displayOrder: number;
  createdAt?: string;
}

export interface HighlightCard {
  id?: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  displayOrder?: number;
}

export interface ValueCard {
  id?: string;
  title: string;
  description: string;
  iconName: string;
}

export interface EducationMilestone {
  id?: string;
  degree: string;
  institution: string;
  university?: string;
  currentSemester: string;
  period: string;
  startYear?: string;
  endYear?: string;
  specialization: string;
  description: string;
  cgpaGrade?: string;
  coursework?: string[];
  displayOrder?: number;
}

export interface ResumeRecord {
  id: string;
  fileName: string;
  fileUrl: string;
  fileSize?: string;
  version: string;
  isActive: boolean;
  createdAt?: string;
}

export interface SocialLinkRecord {
  id: string;
  platform: string;
  url: string;
  displayText?: string;
  icon?: string;
  displayOrder?: number;
  isActive: boolean;
}

export interface HeroProfileRecord {
  id: string;
  name: string;
  badge: string;
  headline: string;
  description: string;
  image_url: string | null;
  image_alt: string | null;
  is_active: boolean;
  updated_at?: string;
  created_at?: string;
}
