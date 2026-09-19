import React from 'react';
import { Menu, ExternalLink, MessageSquare, Plus, LogOut } from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useAdminData } from '../context/AdminDataContext';

interface AdminHeaderProps {
  currentPath: string;
  onOpenMobileSidebar: () => void;
  onNavigate: (path: string) => void;
  onQuickAddProject?: () => void;
  onQuickAddSkill?: () => void;
}

const PAGE_TITLES: Record<string, { title: string; category: string }> = {
  '/admin': { title: 'Dashboard Overview', category: 'General' },
  '/admin/profile': { title: 'Profile Management', category: 'Personal Data' },
  '/admin/about': { title: 'About & Highlights', category: 'Story & Values' },
  '/admin/education': { title: 'Education & Coursework', category: 'Academic' },
  '/admin/skills': { title: 'Skills & Capabilities', category: 'Technical' },
  '/admin/projects': { title: 'Project Management', category: 'Portfolio Works' },
  '/admin/experience': { title: 'Experience & Background', category: 'Career' },
  '/admin/internships': { title: 'Internships & Target Roles', category: 'Opportunities' },
  '/admin/resume': { title: 'Resume & Documents', category: 'Media & Files' },
  '/admin/social-links': { title: 'Social & Developer Links', category: 'Presence' },
  '/admin/contact': { title: 'Contact Information', category: 'Channels' },
  '/admin/messages': { title: 'Messages & Inquiries', category: 'Communications' },
  '/admin/settings': { title: 'Site & Supabase Settings', category: 'System Configuration' },
};

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  currentPath,
  onOpenMobileSidebar,
  onNavigate,
  onQuickAddProject,
  onQuickAddSkill,
}) => {
  const { user, logout } = useAdminAuth();
  const { messages } = useAdminData();

  const handleLogout = async () => {
    await logout();
    onNavigate('/admin/login');
  };

  const pageInfo = PAGE_TITLES[currentPath] || {
    title: 'Admin Portal',
    category: 'System',
  };

  const unreadCount = messages.filter((m) => !m.isRead).length;

  return (
    <header className="sticky top-0 z-30 h-16 bg-neutral-950/80 border-b border-neutral-800/80 backdrop-blur-xl px-4 sm:px-8 flex items-center justify-between gap-4">
      {/* Left: Mobile Toggle & Page Title */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onOpenMobileSidebar}
          className="p-2 text-neutral-400 hover:text-white rounded-xl bg-neutral-900 border border-neutral-800 md:hidden shrink-0"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-neutral-400 hidden sm:inline">
              Admin / {pageInfo.category}
            </span>
          </div>
          <h1 className="text-sm sm:text-base font-bold text-white truncate tracking-tight">
            {pageInfo.title}
          </h1>
        </div>
      </div>

      {/* Right: Portfolio Status, Actions, Profile */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Portfolio Status Badge */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-mono">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="font-semibold tracking-wide">Online</span>
        </div>

        {/* Quick Add Project Shortcut */}
        {onQuickAddProject && (
          <button
            onClick={onQuickAddProject}
            className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 text-xs font-medium text-neutral-200 transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-emerald-400" />
            <span>Add Project</span>
          </button>
        )}

        {/* Messages Shortcut */}
        <button
          onClick={() => onNavigate('/admin/messages')}
          className="relative p-2 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-white transition-colors"
          title="View Messages"
        >
          <MessageSquare className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 text-neutral-950 font-mono text-[10px] font-bold flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>

        {/* View Public Site Button */}
        <button
          onClick={() => onNavigate('/')}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600/20 to-cyan-600/20 border border-emerald-500/30 hover:border-emerald-500/60 text-xs font-semibold text-emerald-300 hover:text-white transition-all shadow-sm cursor-pointer"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">View Public Site</span>
          <span className="sm:hidden">Site</span>
        </button>

        {/* Header Logout Button */}
        <button
          onClick={handleLogout}
          title="Sign out of Supabase Admin"
          className="p-2 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-rose-500/40 text-neutral-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
          aria-label="Logout"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
