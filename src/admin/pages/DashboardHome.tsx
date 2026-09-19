import React, { useState, useEffect } from 'react';
import {
  FolderGit2,
  Wrench,
  Briefcase,
  MessageSquare,
  Plus,
  User,
  Upload,
  ExternalLink,
  CheckCircle2,
  Clock,
  Mail,
  Sparkles,
  ArrowRight,
  Database,
  RefreshCw,
  AlertCircle,
  Copy,
  Check,
  Code2,
} from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';
import { DashboardCard } from '../components/DashboardCard';
import { testAdminConnection, isSupabaseConfigured, supabaseUrl, ConnectionTestResult } from '../../lib/supabase';
import { useToast } from '../context/ToastContext';

interface DashboardHomeProps {
  onNavigate: (path: string) => void;
  onOpenAddProjectModal?: () => void;
  onOpenAddSkillModal?: () => void;
}

const SAMPLE_SQL = `-- Run this in your Supabase Dashboard -> SQL Editor:
CREATE TABLE IF NOT EXISTS admin_test (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message TEXT NOT NULL DEFAULT 'Supabase connection verified from Rudraksh Portfolio Admin',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Insert an initial verification record
INSERT INTO admin_test (message)
VALUES ('Supabase connection verified successfully from Rudraksh Portfolio Admin!');

-- Enable Row Level Security (RLS)
ALTER TABLE admin_test ENABLE ROW LEVEL SECURITY;

-- Allow SELECT access for verifying the connection
CREATE POLICY "Allow read access to admin_test"
ON admin_test FOR SELECT
USING (true);`;

export const DashboardHome: React.FC<DashboardHomeProps> = ({
  onNavigate,
  onOpenAddProjectModal,
  onOpenAddSkillModal,
}) => {
  const { projects, skills, experiences, messages } = useAdminData();
  const { success } = useToast();

  const totalProjects = projects.length;
  const totalSkills = skills.length;
  const totalExperiences = experiences.length;
  const totalMessages = messages.length;
  const unreadMessages = messages.filter((m) => !m.isRead).length;

  const recentProjects = projects.slice(0, 4);
  const recentMessages = messages.slice(0, 3);

  // Supabase Connection Test State
  const [testResult, setTestResult] = useState<ConnectionTestResult | null>(null);
  const [isTesting, setIsTesting] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);
  const [showSqlGuide, setShowSqlGuide] = useState(false);

  const runConnectionCheck = async () => {
    setIsTesting(true);
    try {
      const res = await testAdminConnection();
      setTestResult(res);
    } catch (err: unknown) {
      setTestResult({
        success: false,
        error: err instanceof Error ? err.message : 'Unknown connection error',
        checkedAt: new Date().toLocaleTimeString(),
      });
    } finally {
      setIsTesting(false);
    }
  };

  useEffect(() => {
    runConnectionCheck();
  }, []);

  const handleCopySql = async () => {
    try {
      await navigator.clipboard.writeText(SAMPLE_SQL);
      setCopiedSql(true);
      success('SQL Copied', 'Paste into Supabase SQL Editor and click Run.');
      setTimeout(() => setCopiedSql(false), 2500);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* 1. Welcome Banner & Live Connection Status */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-neutral-900 via-neutral-900/90 to-emerald-950/30 border border-neutral-800/80 p-6 sm:p-8 backdrop-blur-xl shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Portfolio Status: ● Online</span>
              </div>

              {/* Supabase Connection Pill */}
              {isTesting ? (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
                  <RefreshCw className="w-3 h-3 animate-spin" />
                  <span>Checking Supabase...</span>
                </div>
              ) : testResult?.success ? (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold shadow-sm">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Supabase Connected ✓</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono">
                  <Database className="w-3 h-3 text-amber-400" />
                  <span>Supabase Connection: Pending</span>
                </div>
              )}
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Welcome back, Rudraksh 👋
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-xl leading-relaxed">
              Portfolio management center connected with Supabase authentication and PostgreSQL database verification.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('/')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-xs font-semibold text-neutral-200 hover:text-white transition-all shadow-md cursor-pointer"
            >
              <ExternalLink className="w-4 h-4 text-cyan-400" />
              <span>Live Portfolio</span>
            </button>
            <button
              onClick={() => onNavigate('/admin/settings')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-neutral-950 font-bold text-xs transition-all shadow-lg shadow-emerald-950/40 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Settings</span>
            </button>
          </div>
        </div>

        {/* Ambient background glow */}
        <div className="absolute right-0 top-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* 2. REAL SUPABASE CONNECTION TEST STATUS CARD */}
      <div className="rounded-2xl bg-neutral-900/70 border border-neutral-800/90 backdrop-blur-xl p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800/80">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
              testResult?.success
                ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
                : 'bg-neutral-800/80 border-neutral-700 text-neutral-400'
            }`}>
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white tracking-tight">
                  Supabase Database Connection Test
                </h3>
                {testResult?.success && (
                  <span className="px-2 py-0.5 rounded-md text-[11px] font-mono font-bold bg-emerald-500 text-neutral-950">
                    Supabase Connected ✓
                  </span>
                )}
              </div>
              <p className="text-xs text-neutral-400 mt-0.5">
                Target Table: <code className="text-emerald-300 font-mono">admin_test</code> (Read test via Supabase client)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={runConnectionCheck}
              disabled={isTesting}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white border border-neutral-700 transition-colors cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isTesting ? 'animate-spin text-cyan-400' : 'text-neutral-400'}`} />
              <span>{isTesting ? 'Testing...' : 'Run Query Test'}</span>
            </button>

            <button
              onClick={() => setShowSqlGuide(!showSqlGuide)}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-neutral-900 hover:bg-neutral-850 text-neutral-300 border border-neutral-800 transition-colors cursor-pointer"
            >
              <Code2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>{showSqlGuide ? 'Hide SQL' : 'View SQL'}</span>
            </button>
          </div>
        </div>

        {/* Status Content */}
        {isTesting ? (
          <div className="py-4 flex items-center justify-center gap-3 text-xs text-neutral-400 font-mono">
            <RefreshCw className="w-4 h-4 animate-spin text-emerald-400" />
            <span>Executing query on admin_test table...</span>
          </div>
        ) : testResult?.success ? (
          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-emerald-300">Supabase Connected ✓</span>
                    <span className="text-[11px] text-neutral-400 font-mono">• Read Successful</span>
                  </div>
                  <p className="text-xs text-neutral-200 font-mono bg-neutral-950/60 px-2.5 py-1 rounded-lg border border-neutral-800 inline-block">
                    "{testResult.message}"
                  </p>
                </div>
              </div>

              <div className="text-[11px] text-neutral-400 font-mono sm:text-right shrink-0">
                <span>Verified: {testResult.checkedAt}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-amber-300">
                    {!isSupabaseConfigured ? 'Supabase Credentials Not Configured' : 'admin_test Table Notice'}
                  </h4>
                  <p className="text-xs text-neutral-300 leading-relaxed max-w-2xl">
                    {testResult?.error ||
                      'Please verify that VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set and the admin_test table is created in Supabase.'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleCopySql}
                  className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedSql ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSql ? 'Copied' : 'Copy SQL'}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SQL Guide Dropdown */}
        {showSqlGuide && (
          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3 animate-in fade-in">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-neutral-300">
                Supabase SQL Editor Script:
              </span>
              <button
                onClick={handleCopySql}
                className="inline-flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 font-medium transition-colors cursor-pointer"
              >
                {copiedSql ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSql ? 'Copied to Clipboard!' : 'Copy Script'}</span>
              </button>
            </div>
            <pre className="p-3 rounded-lg bg-neutral-900/90 border border-neutral-800 text-[11px] font-mono text-emerald-400 overflow-x-auto leading-relaxed">
              {SAMPLE_SQL}
            </pre>
          </div>
        )}
      </div>

      {/* 3. Portfolio Overview Metrics */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400">
            Portfolio Overview
          </h3>
          <span className="text-[11px] text-neutral-400 font-mono">Live Metrics</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <DashboardCard
            title="Total Projects"
            value={totalProjects}
            subtitle="Showcased on portfolio"
            icon={<FolderGit2 className="w-5 h-5 text-emerald-400" />}
            accentColor="emerald"
            actionLabel="Manage Projects"
            onClick={() => onNavigate('/admin/projects')}
          />
          <DashboardCard
            title="Total Skills"
            value={totalSkills}
            subtitle="Across 4 categories"
            icon={<Wrench className="w-5 h-5 text-cyan-400" />}
            accentColor="cyan"
            actionLabel="Manage Skills"
            onClick={() => onNavigate('/admin/skills')}
          />
          <DashboardCard
            title="Experiences"
            value={totalExperiences}
            subtitle="Academic & projects"
            icon={<Briefcase className="w-5 h-5 text-purple-400" />}
            accentColor="purple"
            actionLabel="View Experiences"
            onClick={() => onNavigate('/admin/experience')}
          />
          <DashboardCard
            title="Messages"
            value={totalMessages}
            subtitle={unreadMessages > 0 ? `${unreadMessages} unread inquiries` : 'All inquiries reviewed'}
            icon={<MessageSquare className="w-5 h-5 text-amber-400" />}
            trend={unreadMessages > 0 ? { value: `${unreadMessages} new`, isPositive: true } : undefined}
            accentColor="amber"
            actionLabel="Open Inbox"
            onClick={() => onNavigate('/admin/messages')}
          />
        </div>
      </div>

      {/* 4. Quick Actions */}
      <div>
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 mb-3">
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            onClick={onOpenAddProjectModal || (() => onNavigate('/admin/projects'))}
            className="flex flex-col items-center justify-center p-4 rounded-2xl bg-neutral-900/80 hover:bg-neutral-850 border border-neutral-800 hover:border-emerald-500/40 text-center transition-all group shadow-md cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 group-hover:bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-2 transition-colors border border-emerald-500/20">
              <Plus className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-neutral-200 group-hover:text-white">
              + Add Project
            </span>
            <span className="text-[11px] text-neutral-400 mt-0.5">New portfolio item</span>
          </button>

          <button
            onClick={onOpenAddSkillModal || (() => onNavigate('/admin/skills'))}
            className="flex flex-col items-center justify-center p-4 rounded-2xl bg-neutral-900/80 hover:bg-neutral-850 border border-neutral-800 hover:border-cyan-500/40 text-center transition-all group shadow-md cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 group-hover:bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-2 transition-colors border border-cyan-500/20">
              <Plus className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-neutral-200 group-hover:text-white">
              + Add Skill
            </span>
            <span className="text-[11px] text-neutral-400 mt-0.5">New technical capability</span>
          </button>

          <button
            onClick={() => onNavigate('/admin/profile')}
            className="flex flex-col items-center justify-center p-4 rounded-2xl bg-neutral-900/80 hover:bg-neutral-850 border border-neutral-800 hover:border-purple-500/40 text-center transition-all group shadow-md cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 group-hover:bg-purple-500/20 text-purple-400 flex items-center justify-center mb-2 transition-colors border border-purple-500/20">
              <User className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-neutral-200 group-hover:text-white">
              Edit Profile
            </span>
            <span className="text-[11px] text-neutral-400 mt-0.5">Bio, role & status</span>
          </button>

          <button
            onClick={() => onNavigate('/admin/resume')}
            className="flex flex-col items-center justify-center p-4 rounded-2xl bg-neutral-900/80 hover:bg-neutral-850 border border-neutral-800 hover:border-amber-500/40 text-center transition-all group shadow-md cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 group-hover:bg-amber-500/20 text-amber-400 flex items-center justify-center mb-2 transition-colors border border-amber-500/20">
              <Upload className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-neutral-200 group-hover:text-white">
              Upload Resume
            </span>
            <span className="text-[11px] text-neutral-400 mt-0.5">Update PDF & metadata</span>
          </button>
        </div>
      </div>

      {/* 5. Recent Projects & Recent Messages Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Projects */}
        <div className="rounded-2xl bg-neutral-900/60 border border-neutral-800/90 backdrop-blur-xl p-5 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <FolderGit2 className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold text-white">Recent Projects</h3>
              </div>
              <button
                onClick={() => onNavigate('/admin/projects')}
                className="text-xs text-emerald-400 hover:text-emerald-300 font-medium inline-flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>View All ({projects.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="divide-y divide-neutral-800/60 mt-3">
              {recentProjects.map((project) => (
                <div
                  key={project.id}
                  className="py-3 flex items-start justify-between gap-3 group hover:bg-neutral-800/30 px-2 rounded-xl transition-colors"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-white truncate group-hover:text-emerald-300 transition-colors">
                        {project.title}
                      </h4>
                      <span className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-neutral-800 text-neutral-400">
                        {project.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-400 line-clamp-1">{project.description}</p>
                    <div className="flex flex-wrap gap-1 pt-0.5">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-1.5 py-0.5 text-[9px] font-mono rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="text-[9px] text-neutral-400 self-center">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => onNavigate('/admin/projects')}
                    className="p-1.5 text-neutral-400 hover:text-white rounded-lg transition-colors shrink-0 cursor-pointer"
                    title="Edit project"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-neutral-800/80 mt-2">
            <button
              onClick={onOpenAddProjectModal || (() => onNavigate('/admin/projects'))}
              className="w-full py-2 text-xs font-semibold rounded-xl bg-neutral-800/60 hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-emerald-400" />
              <span>Create New Project</span>
            </button>
          </div>
        </div>

        {/* Recent Messages */}
        <div className="rounded-2xl bg-neutral-900/60 border border-neutral-800/90 backdrop-blur-xl p-5 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold text-white">Recent Messages</h3>
              </div>
              <button
                onClick={() => onNavigate('/admin/messages')}
                className="text-xs text-amber-400 hover:text-amber-300 font-medium inline-flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>View Inbox ({messages.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="divide-y divide-neutral-800/60 mt-3">
              {recentMessages.length === 0 ? (
                <div className="py-8 text-center text-xs text-neutral-400">
                  No contact messages received yet.
                </div>
              ) : (
                recentMessages.map((msg) => (
                  <div
                    key={msg.id}
                    onClick={() => onNavigate('/admin/messages')}
                    className="py-3 px-2 rounded-xl hover:bg-neutral-800/30 transition-colors cursor-pointer space-y-1"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        {!msg.isRead && (
                          <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                        )}
                        <span className="text-xs font-bold text-white truncate">{msg.name}</span>
                        <span className="text-[11px] text-neutral-400 truncate">&lt;{msg.email}&gt;</span>
                      </div>
                      <span className="text-[10px] text-neutral-400 font-mono shrink-0">
                        {new Date(msg.receivedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-xs font-medium text-neutral-300 truncate">{msg.subject}</p>
                    <p className="text-[11px] text-neutral-400 line-clamp-1">{msg.message}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="pt-3 border-t border-neutral-800/80 mt-2">
            <button
              onClick={() => onNavigate('/admin/messages')}
              className="w-full py-2 text-xs font-semibold rounded-xl bg-neutral-800/60 hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
              <span>Open All Messages</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
