import React from 'react';
import {
  LayoutDashboard,
  Sparkles,
  User,
  FileText,
  GraduationCap,
  Wrench,
  FolderGit2,
  Briefcase,
  Target,
  ScrollText,
  Share2,
  Mail,
  MessageSquare,
  Settings,
  LogOut,
  X,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useAdminData } from '../context/AdminDataContext';

interface AdminSidebarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  currentPath,
  onNavigate,
  isOpenMobile,
  onCloseMobile,
}) => {
  const { user, logout } = useAdminAuth();
  const { messages } = useAdminData();

  const unreadCount = messages.filter((m) => !m.isRead).length;

  const NAV_ITEMS = [
    { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { label: 'Hero Profile', path: '/admin/hero-profile', icon: Sparkles },
    { label: 'Profile', path: '/admin/profile', icon: User },
    { label: 'About', path: '/admin/about', icon: FileText },
    { label: 'Education', path: '/admin/education', icon: GraduationCap },
    { label: 'Skills', path: '/admin/skills', icon: Wrench },
    { label: 'Projects', path: '/admin/projects', icon: FolderGit2 },
    { label: 'Experience', path: '/admin/experience', icon: Briefcase },
    { label: 'Internships', path: '/admin/internships', icon: Target },
    { label: 'Resume', path: '/admin/resume', icon: ScrollText },
    { label: 'Social Links', path: '/admin/social-links', icon: Share2 },
    { label: 'Contact Info', path: '/admin/contact', icon: Mail },
    {
      label: 'Messages',
      path: '/admin/messages',
      icon: MessageSquare,
      badge: unreadCount > 0 ? unreadCount : undefined,
    },
    { label: 'Site Settings', path: '/admin/settings', icon: Settings },
  ];

  const handleNavClick = (path: string) => {
    onNavigate(path);
    onCloseMobile();
  };

  const handleLogout = async () => {
    await logout();
    onNavigate('/admin/login');
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm md:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside
        id="admin-sidebar"
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-neutral-950/95 border-r border-neutral-800/80 backdrop-blur-xl flex flex-col transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand / Header */}
        <div className="h-16 px-5 flex items-center justify-between border-b border-neutral-800/80 shrink-0">
          <div
            onClick={() => handleNavClick('/admin')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-cyan-500 p-0.5 shadow-lg shadow-emerald-950/40">
              <div className="w-full h-full bg-neutral-950 rounded-[10px] flex items-center justify-center text-emerald-400 font-mono font-bold text-xs">
                RB
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold text-white tracking-wide">PORTAL</span>
                <span className="px-1.5 py-0.5 text-[10px] font-mono font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 rounded-md">
                  ADMIN
                </span>
              </div>
              <p className="text-[11px] text-neutral-400">Rudraksh Bansal</p>
            </div>
          </div>

          <button
            onClick={onCloseMobile}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg md:hidden"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links (Scrollable) */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1 scrollbar-thin scrollbar-thumb-neutral-800">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-neutral-400 font-mono">
            Navigation Menu
          </div>

          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.path;

            return (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                  isActive
                    ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shadow-md shadow-emerald-950/20'
                    : 'text-neutral-400 hover:text-neutral-100 hover:bg-neutral-900/80 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive ? 'text-emerald-400' : 'text-neutral-400 group-hover:text-neutral-200'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>

                {item.badge !== undefined && (
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-500 text-neutral-950 font-mono shadow-sm">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          {/* Quick Exit to Public Portfolio */}
          <div className="pt-4 mt-2 border-t border-neutral-900 px-1">
            <button
              onClick={() => onNavigate('/')}
              className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-neutral-400 hover:text-cyan-300 hover:bg-cyan-500/10 rounded-xl border border-transparent hover:border-cyan-500/20 transition-colors"
            >
              <span className="flex items-center gap-2">
                <ExternalLink className="w-3.5 h-3.5" />
                <span>View Public Site</span>
              </span>
              <span className="text-[10px] font-mono text-neutral-400">Live</span>
            </button>
          </div>
        </div>

        {/* Bottom User Profile & Logout */}
        <div className="p-3 border-t border-neutral-800/80 bg-neutral-950/90 shrink-0">
          <div className="flex items-center justify-between p-2 rounded-xl bg-neutral-900/70 border border-neutral-800/80">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 text-xs font-bold shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-white truncate">
                  {user?.name || 'Rudraksh Bansal'}
                </p>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] text-neutral-400 font-mono">Superadmin</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              title="Logout from Admin Portal"
              className="p-2 text-neutral-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors shrink-0"
              aria-label="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
