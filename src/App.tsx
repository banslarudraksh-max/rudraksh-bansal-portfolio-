import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { PERSONAL_INFO } from './data/portfolioData';
import { ProjectItem } from './types';
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

export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  // Fixed links stored in configuration
  const links = PERSONAL_INFO.links;

  useEffect(() => {
    // Clear any previous legacy custom link storage if present
    localStorage.removeItem('rb_portfolio_links');

    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      />

      <main className="relative">
        {/* 1. Hero Section */}
        <Hero onOpenResume={() => setIsResumeOpen(true)} />

        {/* 2. About Me Section */}
        <About />

        {/* 3. Skills Section */}
        <Skills />

        {/* 4. Projects Section */}
        <Projects
          onSelectProject={(project) => setSelectedProject(project)}
          githubUrl={links.github}
        />

        {/* 5. Education Section */}
        <Education />

        {/* 6. What I Bring Section */}
        <WhatIBring />

        {/* 7. Contact Section */}
        <Contact links={links} />
      </main>

      {/* Footer */}
      <Footer links={links} />

      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          id="floating-back-to-top"
          className="fixed bottom-6 right-6 z-30 p-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl shadow-black/40 transition-all duration-200 active:scale-90 hover:scale-105"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* Interactive Modals */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
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
