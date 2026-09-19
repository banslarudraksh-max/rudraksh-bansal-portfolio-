import { ProjectItem, EducationMilestone, HighlightCard, ValueCard, ResumeRecord, SocialLinkRecord } from '../types';

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'superadmin';
  avatarUrl?: string;
  lastLogin?: string;
}

export interface SkillItemAdmin {
  id: string;
  name: string;
  category: 'Programming' | 'Web Development' | 'Tools & AI' | 'Professional Skills';
  level: 'Beginner' | 'Intermediate' | 'Core' | 'Proficient' | 'Advanced' | 'Expert' | 'Active User' | 'Strengths';
  description: string;
  order: number;
  isActive: boolean;
  icon?: string;
}

export interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  type: 'Full-time' | 'Part-time' | 'Internship' | 'Contract' | 'Open Source';
  description: string;
  technologies: string[];
  responsibilities?: string[];
  companyLogoUrl?: string;
  certificateUrl?: string;
  offerLetterUrl?: string;
  isCurrent: boolean;
  order: number;
}

export interface InternshipItem {
  id: string;
  roleTitle: string;
  organization?: string;
  targetCompanyType: string;
  status: 'Applying' | 'Interviewing' | 'Accepted' | 'Completed' | 'Open to Offers';
  preferredDomain: string;
  period: string;
  description: string;
  technologies: string[];
  responsibilities?: string[];
  certificateUrl?: string;
  offerLetterUrl?: string;
  notes?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  receivedAt: string;
  isRead: boolean;
  isStarred?: boolean;
}

export interface ProfileDataAdmin {
  id?: string;
  name: string;
  role: string;
  headline: string;
  introduction: string;
  avatarUrl: string;
  location: string;
  degree: string;
  university: string;
  currentSemester: string;
  specialization: string;
  careerDirection: string;
  availabilityStatus: string;
  resumeUrl?: string;
}

export interface AboutDataAdmin {
  id?: string;
  heading: string;
  description: string;
  careerObjective: string;
}

export interface SiteSettingsData {
  id?: string;
  siteTitle: string;
  metaDescription: string;
  maintenanceMode: boolean;
  searchEngineIndexing: boolean;
  analyticsId: string;
  publicEmail: string;
  allowPublicContact: boolean;
  enableDownloadResume: boolean;
  supabaseConfigStatus: 'ready_to_connect' | 'connected' | 'unconfigured';
  lastBackupDate?: string;
}

export interface ContactInfoAdmin {
  id?: string;
  email: string;
  phone?: string;
  location: string;
  linkedin?: string;
  github?: string;
  availability: string;
  timeZone: string;
  responseTime: string;
  preferredContactMethod: string;
}

export type { ResumeRecord, ProjectItem, HighlightCard, EducationMilestone, SocialLinkRecord } from '../types';
