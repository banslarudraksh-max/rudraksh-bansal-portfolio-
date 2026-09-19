import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  portfolioService,
  DEFAULT_PROFILE,
  DEFAULT_ABOUT,
  DEFAULT_HIGHLIGHTS,
  DEFAULT_EDUCATION_LIST,
  DEFAULT_SKILLS_LIST,
  DEFAULT_EXPERIENCES_LIST,
  DEFAULT_INTERNSHIPS_LIST,
  DEFAULT_SOCIAL_LINKS,
  DEFAULT_CONTACT_INFO,
  DEFAULT_RESUMES,
  DEFAULT_SITE_SETTINGS,
} from '../../lib/portfolioService';
import {
  ProfileDataAdmin,
  AboutDataAdmin,
  SkillItemAdmin,
  ExperienceItem,
  InternshipItem,
  ContactMessage,
  SiteSettingsData,
  ContactInfoAdmin,
} from '../types';
import { ProjectItem, HighlightCard, ValueCard, EducationMilestone, ResumeRecord, SocialLinkRecord } from '../../types';
import { WHAT_I_BRING } from '../../data/portfolioData';

interface AdminDataContextType {
  isLoading: boolean;
  refreshData: () => Promise<void>;

  // Profile
  profile: ProfileDataAdmin;
  updateProfile: (data: Partial<ProfileDataAdmin>) => Promise<{ success: boolean; error?: string }>;

  // Projects
  projects: ProjectItem[];
  addProject: (project: Omit<ProjectItem, 'id'>) => Promise<{ success: boolean; id?: string; error?: string }>;
  updateProject: (id: string, project: Partial<ProjectItem>) => Promise<{ success: boolean; error?: string }>;
  deleteProject: (id: string) => Promise<{ success: boolean; error?: string }>;
  duplicateProject: (id: string) => Promise<{ success: boolean; id?: string; error?: string }>;

  // Skills
  skills: SkillItemAdmin[];
  addSkill: (skill: Omit<SkillItemAdmin, 'id'>) => Promise<{ success: boolean; id?: string; error?: string }>;
  updateSkill: (id: string, skill: Partial<SkillItemAdmin>) => Promise<{ success: boolean; error?: string }>;
  deleteSkill: (id: string) => Promise<{ success: boolean; error?: string }>;
  toggleSkillStatus: (id: string) => Promise<{ success: boolean }>;
  reorderSkills: (orderedIds: string[]) => Promise<{ success: boolean }>;

  // About & Highlights
  about: AboutDataAdmin;
  bio: string;
  updateBio: (newBio: string) => Promise<{ success: boolean; error?: string }>;
  updateAbout: (data: Partial<AboutDataAdmin>) => Promise<{ success: boolean; error?: string }>;
  highlights: HighlightCard[];
  updateHighlights: (cards: HighlightCard[]) => Promise<{ success: boolean; error?: string }>;
  values: ValueCard[];
  updateValues: (vals: ValueCard[]) => void;

  // Education
  education: EducationMilestone;
  educationList: EducationMilestone[];
  updateEducation: (edu: EducationMilestone) => Promise<{ success: boolean; error?: string }>;
  addEducation: (edu: Omit<EducationMilestone, 'id'>) => Promise<{ success: boolean; id?: string; error?: string }>;
  deleteEducation: (id: string) => Promise<{ success: boolean; error?: string }>;

  // Experience
  experiences: ExperienceItem[];
  addExperience: (exp: Omit<ExperienceItem, 'id'>) => Promise<{ success: boolean; id?: string; error?: string }>;
  updateExperience: (id: string, exp: Partial<ExperienceItem>) => Promise<{ success: boolean; error?: string }>;
  deleteExperience: (id: string) => Promise<{ success: boolean; error?: string }>;

  // Internships
  internships: InternshipItem[];
  addInternship: (item: Omit<InternshipItem, 'id'>) => Promise<{ success: boolean; id?: string; error?: string }>;
  updateInternship: (id: string, item: Partial<InternshipItem>) => Promise<{ success: boolean; error?: string }>;
  deleteInternship: (id: string) => Promise<{ success: boolean; error?: string }>;

  // Resume
  resumes: ResumeRecord[];
  activeResume: ResumeRecord;
  resumeSettings: {
    fileName: string;
    lastUpdated: string;
    fileSize: string;
    version: string;
    fileUrl?: string;
  };
  updateResumeSettings: (settings: Partial<{ fileName: string; lastUpdated: string; fileSize: string; version: string; fileUrl?: string }>) => void;
  uploadResume: (file: File, version?: string) => Promise<{ success: boolean; url?: string; error?: string }>;
  setActiveResume: (id: string) => Promise<{ success: boolean; error?: string }>;
  deleteResume: (id: string) => Promise<{ success: boolean; error?: string }>;

  // Social Links
  socialLinksList: SocialLinkRecord[];
  socialLinks: {
    github: string;
    githubDisplay: string;
    linkedin: string;
    linkedinDisplay: string;
    email: string;
    twitter?: string;
    leetcode?: string;
    codeforces?: string;
  };
  updateSocialLinks: (links: Partial<{
    github: string;
    githubDisplay: string;
    linkedin: string;
    linkedinDisplay: string;
    email: string;
    twitter?: string;
    leetcode?: string;
    codeforces?: string;
  }>) => Promise<{ success: boolean; error?: string }>;

  // Contact Info
  contactInfo: ContactInfoAdmin;
  updateContactInfo: (info: Partial<ContactInfoAdmin>) => Promise<{ success: boolean; error?: string }>;

  // Messages
  messages: ContactMessage[];
  markMessageRead: (id: string) => Promise<{ success: boolean }>;
  toggleStarMessage: (id: string) => Promise<{ success: boolean }>;
  deleteMessage: (id: string) => Promise<{ success: boolean; error?: string }>;
  submitPublicMessage: (msg: { name: string; email: string; subject: string; message: string }) => Promise<{ success: boolean; error?: string }>;

  // Site Settings
  siteSettings: SiteSettingsData;
  updateSiteSettings: (settings: Partial<SiteSettingsData>) => Promise<{ success: boolean; error?: string }>;

  // File Upload Helper
  uploadAsset: (file: File, folder?: string) => Promise<{ success: boolean; url?: string; error?: string }>;

  // Reset to Defaults
  resetAllData: () => void;
}

const AdminDataContext = createContext<AdminDataContextType | null>(null);

export const AdminDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  // States
  const [profile, setProfile] = useState<ProfileDataAdmin>(DEFAULT_PROFILE);
  const [about, setAbout] = useState<AboutDataAdmin>(DEFAULT_ABOUT);
  const [highlights, setHighlights] = useState<HighlightCard[]>(DEFAULT_HIGHLIGHTS);
  const [values, setValues] = useState<ValueCard[]>(WHAT_I_BRING);
  const [educationList, setEducationList] = useState<EducationMilestone[]>(DEFAULT_EDUCATION_LIST);
  const [skills, setSkills] = useState<SkillItemAdmin[]>(DEFAULT_SKILLS_LIST);
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [experiences, setExperiences] = useState<ExperienceItem[]>(DEFAULT_EXPERIENCES_LIST);
  const [internships, setInternships] = useState<InternshipItem[]>(DEFAULT_INTERNSHIPS_LIST);
  const [resumes, setResumes] = useState<ResumeRecord[]>(DEFAULT_RESUMES);
  const [socialLinksList, setSocialLinksList] = useState<SocialLinkRecord[]>(DEFAULT_SOCIAL_LINKS);
  const [contactInfo, setContactInfo] = useState<ContactInfoAdmin>(DEFAULT_CONTACT_INFO);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSettingsData>(DEFAULT_SITE_SETTINGS);

  // Helper active resume
  const activeResume = resumes.find((r) => r.isActive) || resumes[0] || DEFAULT_RESUMES[0];

  // Helper resumeSettings object for backward compatibility
  const resumeSettings = {
    fileName: activeResume?.fileName || 'Rudraksh_Bansal_Resume.pdf',
    lastUpdated: activeResume?.createdAt ? new Date(activeResume.createdAt).toLocaleDateString() : 'Current',
    fileSize: activeResume?.fileSize || '184 KB',
    version: activeResume?.version || 'v1.0',
    fileUrl: activeResume?.fileUrl || '#',
  };

  // Helper social links object for backward compatibility
  const githubLink = socialLinksList.find((s) => s.platform === 'github')?.url || DEFAULT_SOCIAL_LINKS[0].url;
  const linkedinLink = socialLinksList.find((s) => s.platform === 'linkedin')?.url || DEFAULT_SOCIAL_LINKS[1].url;
  const emailLink = socialLinksList.find((s) => s.platform === 'email')?.url.replace('mailto:', '') || DEFAULT_SOCIAL_LINKS[2].url.replace('mailto:', '');
  const twitterLink = socialLinksList.find((s) => s.platform === 'twitter')?.url || '';

  const socialLinks = {
    github: githubLink,
    githubDisplay: githubLink.replace('https://', ''),
    linkedin: linkedinLink,
    linkedinDisplay: linkedinLink.replace('https://', ''),
    email: emailLink,
    twitter: twitterLink,
    leetcode: 'https://leetcode.com',
    codeforces: 'https://codeforces.com',
  };

  // Load all data from Supabase
  const loadAllData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [
        p,
        ab,
        hl,
        edu,
        sk,
        proj,
        exp,
        intern,
        res,
        soc,
        con,
        msg,
        site,
      ] = await Promise.all([
        portfolioService.getProfile(),
        portfolioService.getAbout(),
        portfolioService.getHighlights(),
        portfolioService.getEducation(),
        portfolioService.getSkills(),
        portfolioService.getProjects(true),
        portfolioService.getExperiences(),
        portfolioService.getInternships(),
        portfolioService.getResumes(),
        portfolioService.getSocialLinks(),
        portfolioService.getContactInfo(),
        portfolioService.getMessages(),
        portfolioService.getSiteSettings(),
      ]);

      if (p) setProfile(p);
      if (ab) setAbout(ab);
      if (hl && hl.length > 0) setHighlights(hl);
      if (edu && edu.length > 0) setEducationList(edu);
      if (sk && sk.length > 0) setSkills(sk);
      if (proj && proj.length > 0) setProjects(proj);
      if (exp && exp.length > 0) setExperiences(exp);
      if (intern && intern.length > 0) setInternships(intern);
      if (res && res.length > 0) setResumes(res);
      if (soc && soc.length > 0) setSocialLinksList(soc);
      if (con) setContactInfo(con);
      if (msg) setMessages(msg);
      if (site) setSiteSettings(site);
    } catch (err) {
      console.error('Error loading Supabase portfolio data:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAllData();
  }, [loadAllData]);

  // Profile
  const updateProfile = async (data: Partial<ProfileDataAdmin>) => {
    setProfile((prev) => ({ ...prev, ...data }));
    const res = await portfolioService.updateProfile(data);
    return res;
  };

  // About
  const updateBio = async (newBio: string) => {
    setAbout((prev) => ({ ...prev, description: newBio }));
    return await portfolioService.updateAbout({ description: newBio });
  };

  const updateAbout = async (data: Partial<AboutDataAdmin>) => {
    setAbout((prev) => ({ ...prev, ...data }));
    return await portfolioService.updateAbout(data);
  };

  const updateHighlights = async (cards: HighlightCard[]) => {
    setHighlights(cards);
    return await portfolioService.saveHighlights(cards);
  };

  const updateValues = (vals: ValueCard[]) => {
    setValues(vals);
  };

  // Education
  const education = educationList[0] || DEFAULT_EDUCATION_LIST[0];

  const updateEducation = async (edu: EducationMilestone) => {
    setEducationList((prev) =>
      prev.map((e) => (e.id === edu.id || (!e.id && !edu.id) ? { ...e, ...edu } : e))
    );
    if (edu.id) {
      return await portfolioService.updateEducation(edu.id, edu);
    } else {
      const res = await portfolioService.addEducation(edu);
      if (res.id) {
        setEducationList((prev) => [{ ...edu, id: res.id }]);
      }
      return res;
    }
  };

  const addEducation = async (edu: Omit<EducationMilestone, 'id'>) => {
    const res = await portfolioService.addEducation(edu);
    if (res.success && res.id) {
      setEducationList((prev) => [...prev, { ...edu, id: res.id }]);
    }
    return res;
  };

  const deleteEducation = async (id: string) => {
    setEducationList((prev) => prev.filter((e) => e.id !== id));
    return await portfolioService.deleteEducation(id);
  };

  // Skills
  const addSkill = async (skill: Omit<SkillItemAdmin, 'id'>) => {
    const tempId = `sk-${Date.now()}`;
    const newSkill: SkillItemAdmin = { ...skill, id: tempId };
    setSkills((prev) => [...prev, newSkill]);

    const res = await portfolioService.addSkill(skill);
    if (res.success && res.id) {
      setSkills((prev) => prev.map((s) => (s.id === tempId ? { ...s, id: res.id } : s)));
    }
    return res;
  };

  const updateSkill = async (id: string, skill: Partial<SkillItemAdmin>) => {
    setSkills((prev) => prev.map((s) => (s.id === id ? { ...s, ...skill } : s)));
    return await portfolioService.updateSkill(id, skill);
  };

  const deleteSkill = async (id: string) => {
    setSkills((prev) => prev.filter((s) => s.id !== id));
    return await portfolioService.deleteSkill(id);
  };

  const toggleSkillStatus = async (id: string) => {
    const current = skills.find((s) => s.id === id);
    if (!current) return { success: false };
    const nextStatus = !current.isActive;
    setSkills((prev) => prev.map((s) => (s.id === id ? { ...s, isActive: nextStatus } : s)));
    return await portfolioService.updateSkill(id, { isActive: nextStatus });
  };

  const reorderSkills = async (orderedIds: string[]) => {
    const reordered = [...skills].sort((a, b) => orderedIds.indexOf(a.id) - orderedIds.indexOf(b.id));
    setSkills(reordered);
    return await portfolioService.reorderSkills(orderedIds);
  };

  // Projects
  const addProject = async (project: Omit<ProjectItem, 'id'>) => {
    const tempId = `proj-${Date.now()}`;
    const newItem: ProjectItem = { ...project, id: tempId };
    setProjects((prev) => [newItem, ...prev]);

    const res = await portfolioService.addProject(project);
    if (res.success && res.id) {
      setProjects((prev) => prev.map((p) => (p.id === tempId ? { ...p, id: res.id } : p)));
    }
    return res;
  };

  const updateProject = async (id: string, project: Partial<ProjectItem>) => {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, ...project } : p)));
    return await portfolioService.updateProject(id, project);
  };

  const deleteProject = async (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    return await portfolioService.deleteProject(id);
  };

  const duplicateProject = async (id: string) => {
    const res = await portfolioService.duplicateProject(id);
    if (res.success) {
      const refreshed = await portfolioService.getProjects(true);
      setProjects(refreshed);
    }
    return res;
  };

  // Experience
  const addExperience = async (exp: Omit<ExperienceItem, 'id'>) => {
    const tempId = `exp-${Date.now()}`;
    setExperiences((prev) => [{ ...exp, id: tempId }, ...prev]);
    const res = await portfolioService.addExperience(exp);
    if (res.success && res.id) {
      setExperiences((prev) => prev.map((e) => (e.id === tempId ? { ...e, id: res.id } : e)));
    }
    return res;
  };

  const updateExperience = async (id: string, exp: Partial<ExperienceItem>) => {
    setExperiences((prev) => prev.map((e) => (e.id === id ? { ...e, ...exp } : e)));
    return await portfolioService.updateExperience(id, exp);
  };

  const deleteExperience = async (id: string) => {
    setExperiences((prev) => prev.filter((e) => e.id !== id));
    return await portfolioService.deleteExperience(id);
  };

  // Internships
  const addInternship = async (item: Omit<InternshipItem, 'id'>) => {
    const tempId = `int-${Date.now()}`;
    setInternships((prev) => [{ ...item, id: tempId }, ...prev]);
    const res = await portfolioService.addInternship(item);
    if (res.success && res.id) {
      setInternships((prev) => prev.map((i) => (i.id === tempId ? { ...i, id: res.id } : i)));
    }
    return res;
  };

  const updateInternship = async (id: string, item: Partial<InternshipItem>) => {
    setInternships((prev) => prev.map((i) => (i.id === id ? { ...i, ...item } : i)));
    return await portfolioService.updateInternship(id, item);
  };

  const deleteInternship = async (id: string) => {
    setInternships((prev) => prev.filter((i) => i.id !== id));
    return await portfolioService.deleteInternship(id);
  };

  // Resume
  const updateResumeSettings = (settings: Partial<{ fileName: string; lastUpdated: string; fileSize: string; version: string; fileUrl?: string }>) => {
    if (activeResume?.id) {
      setResumes((prev) =>
        prev.map((r) =>
          r.id === activeResume.id
            ? {
                ...r,
                fileName: settings.fileName || r.fileName,
                fileSize: settings.fileSize || r.fileSize,
                version: settings.version || r.version,
                fileUrl: settings.fileUrl || r.fileUrl,
              }
            : r
        )
      );
    }
  };

  const uploadResume = async (file: File, version = 'v1.0') => {
    const uploadRes = await portfolioService.uploadFile(file, 'resumes');
    if (!uploadRes.success || !uploadRes.url) {
      return { success: false, error: uploadRes.error || 'Failed to upload PDF to Supabase Storage' };
    }

    const addRes = await portfolioService.addResume({
      fileName: file.name,
      fileUrl: uploadRes.url,
      fileSize: `${(file.size / 1024).toFixed(0)} KB`,
      version,
      isActive: true,
    });

    if (addRes.success) {
      const refreshed = await portfolioService.getResumes();
      setResumes(refreshed);
      setProfile((prev) => ({ ...prev, resumeUrl: uploadRes.url }));
    }

    return { success: true, url: uploadRes.url };
  };

  const setActiveResume = async (id: string) => {
    setResumes((prev) => prev.map((r) => ({ ...r, isActive: r.id === id })));
    const selected = resumes.find((r) => r.id === id);
    if (selected) {
      setProfile((prev) => ({ ...prev, resumeUrl: selected.fileUrl }));
    }
    return await portfolioService.setActiveResume(id);
  };

  const deleteResume = async (id: string) => {
    setResumes((prev) => prev.filter((r) => r.id !== id));
    return await portfolioService.deleteResume(id);
  };

  // Social Links
  const updateSocialLinks = async (links: Partial<{
    github: string;
    githubDisplay: string;
    linkedin: string;
    linkedinDisplay: string;
    email: string;
    twitter?: string;
    leetcode?: string;
    codeforces?: string;
  }>) => {
    const updatedList: SocialLinkRecord[] = socialLinksList.map((item) => {
      if (item.platform === 'github' && links.github) {
        return { ...item, url: links.github, displayText: links.githubDisplay || links.github };
      }
      if (item.platform === 'linkedin' && links.linkedin) {
        return { ...item, url: links.linkedin, displayText: links.linkedinDisplay || links.linkedin };
      }
      if (item.platform === 'email' && links.email) {
        const mailto = links.email.startsWith('mailto:') ? links.email : `mailto:${links.email}`;
        return { ...item, url: mailto, displayText: links.email };
      }
      if (item.platform === 'twitter' && links.twitter !== undefined) {
        return { ...item, url: links.twitter, isActive: Boolean(links.twitter) };
      }
      return item;
    });

    setSocialLinksList(updatedList);
    return await portfolioService.updateSocialLinks(updatedList);
  };

  // Contact Info
  const updateContactInfo = async (info: Partial<ContactInfoAdmin>) => {
    setContactInfo((prev) => ({ ...prev, ...info }));
    return await portfolioService.updateContactInfo(info);
  };

  // Messages
  const markMessageRead = async (id: string) => {
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, isRead: true } : m)));
    return await portfolioService.markMessageRead(id, true);
  };

  const toggleStarMessage = async (id: string) => {
    const current = messages.find((m) => m.id === id);
    if (!current) return { success: false };
    const nextVal = !current.isStarred;
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, isStarred: nextVal } : m)));
    return await portfolioService.toggleStarMessage(id, nextVal);
  };

  const deleteMessage = async (id: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
    return await portfolioService.deleteMessage(id);
  };

  const submitPublicMessage = async (msg: { name: string; email: string; subject: string; message: string }) => {
    const res = await portfolioService.submitContactMessage(msg);
    if (res.success) {
      // If admin is active in the same tab, also refresh messages
      const updatedMessages = await portfolioService.getMessages();
      setMessages(updatedMessages);
    }
    return res;
  };

  // Site Settings
  const updateSiteSettings = async (settings: Partial<SiteSettingsData>) => {
    setSiteSettings((prev) => ({ ...prev, ...settings }));
    return await portfolioService.updateSiteSettings(settings);
  };

  // Asset Upload
  const uploadAsset = async (file: File, folder = 'general') => {
    return await portfolioService.uploadFile(file, folder);
  };

  // Reset
  const resetAllData = () => {
    setProfile(DEFAULT_PROFILE);
    setAbout(DEFAULT_ABOUT);
    setHighlights(DEFAULT_HIGHLIGHTS);
    setSkills(DEFAULT_SKILLS_LIST);
    setEducationList(DEFAULT_EDUCATION_LIST);
    setExperiences(DEFAULT_EXPERIENCES_LIST);
    setInternships(DEFAULT_INTERNSHIPS_LIST);
    setResumes(DEFAULT_RESUMES);
    setSocialLinksList(DEFAULT_SOCIAL_LINKS);
    setContactInfo(DEFAULT_CONTACT_INFO);
    setSiteSettings(DEFAULT_SITE_SETTINGS);
  };

  return (
    <AdminDataContext.Provider
      value={{
        isLoading,
        refreshData: loadAllData,
        profile,
        updateProfile,
        projects,
        addProject,
        updateProject,
        deleteProject,
        duplicateProject,
        skills,
        addSkill,
        updateSkill,
        deleteSkill,
        toggleSkillStatus,
        reorderSkills,
        about,
        bio: about.description,
        updateBio,
        updateAbout,
        highlights,
        updateHighlights,
        values,
        updateValues,
        education,
        educationList,
        updateEducation,
        addEducation,
        deleteEducation,
        experiences,
        addExperience,
        updateExperience,
        deleteExperience,
        internships,
        addInternship,
        updateInternship,
        deleteInternship,
        resumes,
        activeResume,
        resumeSettings,
        updateResumeSettings,
        uploadResume,
        setActiveResume,
        deleteResume,
        socialLinksList,
        socialLinks,
        updateSocialLinks,
        contactInfo,
        updateContactInfo,
        messages,
        markMessageRead,
        toggleStarMessage,
        deleteMessage,
        submitPublicMessage,
        siteSettings,
        updateSiteSettings,
        uploadAsset,
        resetAllData,
      }}
    >
      {children}
    </AdminDataContext.Provider>
  );
};

export const useAdminData = (): AdminDataContextType => {
  const context = useContext(AdminDataContext);
  if (!context) {
    throw new Error('useAdminData must be used within an AdminDataProvider');
  }
  return context;
};
