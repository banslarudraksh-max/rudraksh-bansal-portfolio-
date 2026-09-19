import React, { useEffect } from 'react';
import { useAdminAuth } from './context/AdminAuthContext';
import { AdminLayout } from './components/AdminLayout';
import { AdminLogin } from './pages/AdminLogin';
import { DashboardHome } from './pages/DashboardHome';
import { ProfilePage } from './pages/ProfilePage';
import { AboutPage } from './pages/AboutPage';
import { EducationPage } from './pages/EducationPage';
import { SkillsPage } from './pages/SkillsPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ExperiencePage } from './pages/ExperiencePage';
import { InternshipsPage } from './pages/InternshipsPage';
import { ResumePage } from './pages/ResumePage';
import { SocialLinksPage } from './pages/SocialLinksPage';
import { ContactPage } from './pages/ContactPage';
import { MessagesPage } from './pages/MessagesPage';
import { SettingsPage } from './pages/SettingsPage';

interface AdminPortalProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ currentPath, onNavigate }) => {
  const { isAuthenticated, isLoading } = useAdminAuth();

  // Route protection redirect effect:
  // If not authenticated and trying to access any /admin/* page -> redirect to /admin/login
  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated && currentPath !== '/admin/login') {
        onNavigate('/admin/login');
      } else if (isAuthenticated && currentPath === '/admin/login') {
        onNavigate('/admin');
      }
    }
  }, [isAuthenticated, isLoading, currentPath, onNavigate]);

  // Loading splash while checking Supabase auth session
  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-12 h-12 rounded-2xl border-2 border-emerald-500/20 border-t-emerald-500 animate-spin mb-4" />
        <p className="text-sm font-bold text-white tracking-wide">Authenticating Admin Session...</p>
        <p className="text-xs text-neutral-500 mt-1">Rudraksh Bansal Portfolio Management Portal</p>
      </div>
    );
  }

  // If user is accessing /admin/login directly or not authenticated
  if (!isAuthenticated || currentPath === '/admin/login') {
    return (
      <AdminLogin
        onLoginSuccess={() => onNavigate('/admin')}
        onBackToSite={() => onNavigate('/')}
      />
    );
  }

  // Subpage router inside authenticated AdminLayout
  const renderCurrentPage = () => {
    switch (currentPath) {
      case '/admin/profile':
        return <ProfilePage />;
      case '/admin/about':
        return <AboutPage />;
      case '/admin/education':
        return <EducationPage />;
      case '/admin/skills':
        return <SkillsPage />;
      case '/admin/projects':
        return <ProjectsPage />;
      case '/admin/experience':
        return <ExperiencePage />;
      case '/admin/internships':
        return <InternshipsPage />;
      case '/admin/resume':
        return <ResumePage />;
      case '/admin/social-links':
        return <SocialLinksPage />;
      case '/admin/contact':
        return <ContactPage />;
      case '/admin/messages':
        return <MessagesPage />;
      case '/admin/settings':
        return <SettingsPage />;
      case '/admin':
      case '/admin/dashboard':
      default:
        return <DashboardHome onNavigate={onNavigate} />;
    }
  };

  return (
    <AdminLayout currentPath={currentPath} onNavigate={onNavigate}>
      {renderCurrentPage()}
    </AdminLayout>
  );
};
