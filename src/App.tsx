import React, { useState, useEffect, useCallback } from 'react';
import { ArrowUp } from 'lucide-react';
import { PERSONAL_INFO } from './data/portfolioData';
import { ProjectItem, EducationMilestone, HighlightCard } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Education } from './components/Education';
import { WhatIBring } from './components/WhatIBring';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { ProjectModal } from './components/ProjectModal';

// Admin Portal System
import { ToastProvider } from './admin/context/ToastContext';
import { AdminAuthProvider } from './admin/context/AdminAuthContext';
import { AdminDataProvider } from './admin/context/AdminDataContext';
import { AdminPortal } from './admin/AdminPortal';
import { portfolioService } from './lib/portfolioService';
import {
  ProfileDataAdmin,
  AboutDataAdmin,
  SkillItemAdmin,
  ContactInfoAdmin,
  ResumeRecord,
} from './admin/types';

const getInitialPath = (): string => {
  if (typeof window === 'undefined') return '/';
  const pathname = window.location.pathname;
  if (pathname.startsWith('/admin')) {
    return pathname;
  }
  if (window.location.hash.startsWith('#/admin')) {
    return window.location.hash.slice(1);
  }
  const params = new URLSearchParams(window.location.search);
  const adminParam = params.get('admin') || params.get('page');
  if (adminParam && adminParam.includes('admin')) {
    return adminParam.startsWith('/') ? adminParam : `/${adminParam}`;
  }
  return '/';
};

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(getInitialPath);
  const [isDark, setIsDark] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  // Live portfolio states fetched from Supabase (falling back to initial data)
  const [profile, setProfile] = useState<ProfileDataAdmin | undefined>(undefined);
  const [about, setAbout] = useState<AboutDataAdmin | undefined>(undefined);
  const [highlights, setHighlights] = useState<HighlightCard[] | undefined>(undefined);
  const [skills, setSkills] = useState<SkillItemAdmin[] | undefined>(undefined);
  const [projects, setProjects] = useState<ProjectItem[] | undefined>(undefined);
  const [education, setEducation] = useState<EducationMilestone | undefined>(undefined);
  const [contactInfo, setContactInfo] = useState<ContactInfoAdmin | undefined>(undefined);
  const [activeResume, setActiveResume] = useState<ResumeRecord | undefined>(undefined);

  // Fallback links
  const links = {
    github: contactInfo?.github || PERSONAL_INFO.links.github,
    linkedin: contactInfo?.linkedin || PERSONAL_INFO.links.linkedin,
    email: contactInfo?.email || PERSONAL_INFO.links.email,
  };

  const loadPublicData = useCallback(async () => {
    try {
      const [
        profileData,
        aboutData,
        highlightsData,
        skillsData,
        projectsData,
        educationData,
        contactData,
        resumeData,
      ] = await Promise.all([
        portfolioService.getProfile(),
        portfolioService.getAbout(),
        portfolioService.getHighlights(),
        portfolioService.getSkills(),
        portfolioService.getProjects(false), // only visible projects for public
        portfolioService.getEducation(),
        portfolioService.getContactInfo(),
        portfolioService.getActiveResume(),
      ]);

      if (profileData) setProfile(profileData);
      if (aboutData) setAbout(aboutData);
      if (highlightsData) setHighlights(highlightsData);
      if (skillsData) setSkills(skillsData);
      if (projectsData) setProjects(projectsData);
      if (educationData) setEducation(educationData);
      if (contactData) setContactInfo(contactData);
      if (resumeData) setActiveResume(resumeData);
    } catch (err) {
      console.warn('Initial data load notice (using defaults):', err);
    }
  }, []);

  useEffect(() => {
    // Clear any previous legacy custom link storage if present
    localStorage.removeItem('rb_portfolio_links');

    loadPublicData();

    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    const handleLocationChange = () => {
      setCurrentPath(getInitialPath());
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, [loadPublicData]);

  const navigateTo = (newPath: string) => {
    setCurrentPath(newPath);
    if (window.location.pathname !== newPath) {
      window.history.pushState(null, '', newPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If URL points to Admin Portal (/admin or /admin/login or /admin/*)
  if (currentPath.startsWith('/admin')) {
    return (
      <ToastProvider>
        <AdminAuthProvider>
          <AdminDataProvider>
            <AdminPortal currentPath={currentPath} onNavigate={navigateTo} />
          </AdminDataProvider>
        </AdminAuthProvider>
      </ToastProvider>
    );
  }

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-neutral-950 text-neutral-100' : 'bg-slate-50 text-slate-900 light'}`}>
      {/* Navigation */}
      <Navbar
        onOpenResume={() => setIsResumeOpen(true)}
        isDark={isDark}
        onToggleTheme={toggleTheme}
        name={profile?.name}
        roleTag={`${profile?.currentSemester || '3rd Sem'} • ${profile?.specialization || 'CSE (AI-ML)'}`}
      />

      <main className="relative">
        {/* 1. Hero Section */}
        <Hero
          onOpenResume={() => setIsResumeOpen(true)}
          profile={profile}
          resumeUrl={activeResume?.fileUrl || profile?.resumeUrl}
        />

        {/* 2. About Me Section */}
        <About
          profile={profile}
          about={about}
          highlights={highlights}
        />

        {/* 3. Skills Section */}
        <Skills skills={skills} />

        {/* 4. Projects Section */}
        <Projects
          projects={projects}
          onSelectProject={(project) => setSelectedProject(project)}
          githubUrl={links.github}
        />

        {/* 5. Education Section */}
        <Education education={education} />

        {/* 6. What I Bring Section */}
        <WhatIBring />

        {/* 7. Contact Section */}
        <Contact
          links={links}
          contactInfo={contactInfo}
          onSubmitMessage={portfolioService.submitContactMessage}
        />
      </main>

      {/* Footer */}
      <Footer links={links} onNavigateAdmin={() => navigateTo('/admin/login')} />

      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          id="floating-back-to-top"
          className="fixed bottom-6 right-6 z-30 p-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl shadow-black/40 transition-all duration-200 active:scale-90 hover:scale-105 cursor-pointer"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* Interactive Modals */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        profile={profile}
        resumeUrl={activeResume?.fileUrl || profile?.resumeUrl}
        activeResumeName={activeResume?.fileName}
        links={links}
      />

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        githubUrl={links.github}
      />
    </div>
  );
}
