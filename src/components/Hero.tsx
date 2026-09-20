import React, { useState } from 'react';
import {
  ArrowDown,
  Send,
  ExternalLink,
  Sparkles,
  User,
  Terminal,
  Code,
  Check,
  Copy,
  FolderGit2,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ProfileDataAdmin } from '../admin/types';
import { HeroProfileRecord } from '../types';

interface HeroProps {
  onOpenResume: () => void;
  profile?: ProfileDataAdmin;
  heroProfile?: HeroProfileRecord | null;
  resumeUrl?: string;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume, profile, heroProfile, resumeUrl }) => {
  const [activePlaceholderTab, setActivePlaceholderTab] = useState<'avatar' | 'code'>('avatar');
  const [copied, setCopied] = useState(false);

  // Read dynamically from public.hero_profile, falling back gracefully to profile / constants
  const name = heroProfile?.name || profile?.name || PERSONAL_INFO.name;
  const badge = heroProfile?.badge || profile?.availabilityStatus || 'Available for Internships';
  const headline = heroProfile?.headline || profile?.headline || 'B.Tech CSE Student(AI-ML) & Aspiring Software Developer';
  const description =
    heroProfile?.description ||
    profile?.introduction ||
    'Building practical solutions with code, creativity and emerging AI technologies.';
  const imageUrl = heroProfile?.image_url || null;
  const imageAlt = heroProfile?.image_alt || `${name} - Professional Developer Portrait`;

  const semester = profile?.currentSemester || PERSONAL_INFO.currentSemester;
  const specialization = profile?.specialization || 'CSE (AI-ML)';
  const university = profile?.university ? 'AKTU' : 'AKTU';

  const codeSnippet = `# developer_profile.py
class DeveloperProfile:
    def __init__(self):
        self.name = "${name}"
        self.role = "B.Tech ${specialization}"
        self.status = "${badge}"
        self.focus_areas = ["Python", "Full Stack", "Emerging AI"]

    def mission(self) -> str:
        return "${description}"

dev = DeveloperProfile()
print(f"Status: {dev.status}")`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative pt-24 sm:pt-28 pb-10 sm:pb-16 overflow-hidden"
    >
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-teal-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-left order-1">
            {/* Status Pill / Badge from public.hero_profile */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900/90 border border-neutral-800 text-xs text-neutral-300 backdrop-blur-sm shadow-sm max-w-full">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-mono text-[11px] sm:text-xs truncate text-neutral-200">
                {badge}
              </span>
            </div>

            {/* Dynamic Name & Headline */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
                Hi, I'm{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200">
                  {name}
                </span>
              </h1>
              <h2 className="text-lg sm:text-2xl font-medium text-neutral-300 leading-snug">
                {headline}
              </h2>
            </div>

            {/* Dynamic Description */}
            <p className="text-base sm:text-lg text-neutral-400 max-w-xl leading-relaxed">
              {description}
            </p>

            {/* Key Quick Facts Pills */}
            <div className="flex flex-wrap gap-2 pt-1 text-xs text-neutral-400 font-mono">
              <span className="px-2.5 py-1 rounded-md bg-neutral-900 border border-neutral-800/80">
                🐍 Python
              </span>
              <span className="px-2.5 py-1 rounded-md bg-neutral-900 border border-neutral-800/80">
                ⚡ JavaScript
              </span>
              <span className="px-2.5 py-1 rounded-md bg-neutral-900 border border-neutral-800/80">
                🌐 Web Tech
              </span>
              <span className="px-2.5 py-1 rounded-md bg-neutral-900 border border-neutral-800/80">
                🤖 Emerging AI
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3.5 pt-2 sm:pt-3">
              <button
                onClick={() => scrollToSection('projects')}
                id="hero-view-projects-btn"
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs sm:text-sm font-semibold text-white transition-all shadow-lg shadow-emerald-950/40 active:scale-95 group cursor-pointer"
              >
                <span>View My Projects</span>
                <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
              </button>

              <button
                onClick={() => scrollToSection('contact')}
                id="hero-contact-me-btn"
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-xs sm:text-sm font-semibold text-neutral-200 border border-neutral-800 transition-all hover:border-neutral-700 active:scale-95 cursor-pointer"
              >
                <span>Contact Me</span>
                <Send className="w-4 h-4 text-neutral-400" />
              </button>

              <button
                onClick={onOpenResume}
                id="hero-view-resume-btn"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 sm:py-3 rounded-xl text-xs font-medium text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>View Resume</span>
              </button>
            </div>
          </div>

          {/* Right Column: Large Professional Hero Image OR Professional Fallback Placeholder */}
          <div className="lg:col-span-5 w-full flex justify-center lg:justify-end order-2">
            <div className="w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[400px]">
              {imageUrl ? (
                /* Dynamic Professional Hero Image Card */
                <div
                  id="hero-portrait-card"
                  className="relative w-full rounded-3xl p-2.5 bg-neutral-900/80 border border-neutral-800/90 shadow-2xl backdrop-blur-xl group hover:border-emerald-500/40 transition-all duration-500"
                >
                  {/* Outer emerald ambient aura */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-cyan-500/15 rounded-3xl blur-xl opacity-70 group-hover:opacity-100 transition duration-700 -z-10" />

                  {/* Main Portrait Frame */}
                  <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800/60 shadow-inner">
                    <img
                      src={imageUrl}
                      alt={imageAlt}
                      className="w-full h-full object-cover object-top filter contrast-[1.02] group-hover:scale-[1.02] transition-transform duration-700"
                      loading="eager"
                    />

                    {/* Gradient Overlay for Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/15 to-transparent pointer-events-none" />

                    {/* Top Right Floating Status Pill */}
                    <div className="absolute top-3.5 right-3.5 px-3 py-1.5 rounded-full bg-neutral-950/80 border border-neutral-800/80 backdrop-blur-md shadow-lg flex items-center gap-2 text-[11px] font-mono text-emerald-400">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      <span>Verified Profile</span>
                    </div>

                    {/* Bottom Floating Info Pill */}
                    <div className="absolute bottom-3.5 left-3.5 right-3.5 p-3 rounded-xl bg-neutral-950/85 border border-neutral-800/80 backdrop-blur-md shadow-xl flex items-center justify-between">
                      <div className="truncate pr-2">
                        <div className="text-xs font-bold text-white tracking-wide truncate">{name}</div>
                        <div className="text-[10px] font-mono text-emerald-400 flex items-center gap-1.5 mt-0.5">
                          <Sparkles className="w-3 h-3 shrink-0" />
                          <span className="truncate">Software Engineering & AI-ML</span>
                        </div>
                      </div>
                      <div className="px-2 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-[10px] font-mono text-neutral-300 shrink-0">
                        AKTU '29
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Professional Fallback Placeholder (when image_url is NULL) */
                <div
                  id="hero-fallback-card"
                  className="relative w-full rounded-3xl p-3 bg-neutral-900/90 border border-neutral-800/90 shadow-2xl backdrop-blur-xl overflow-hidden group hover:border-neutral-700 transition-all duration-500"
                >
                  {/* Outer emerald ambient aura */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-3xl blur-xl opacity-60 group-hover:opacity-90 transition duration-700 -z-10" />

                  {/* Fallback Container (exact same aspect ratio: 4/5) */}
                  <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800/60 p-5 flex flex-col justify-between">
                    {/* Header: Toggle between sleek Dev Silhouette & Terminal Snippet */}
                    <div className="flex items-center justify-between pb-3 border-b border-neutral-800/80">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                        <span className="text-[11px] font-mono text-neutral-400 ml-1">
                          {activePlaceholderTab === 'avatar' ? 'profile.id' : 'terminal.py'}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 bg-neutral-900 p-0.5 rounded-lg border border-neutral-800 text-[10px] font-mono">
                        <button
                          onClick={() => setActivePlaceholderTab('avatar')}
                          className={`px-2 py-0.5 rounded-md transition-all cursor-pointer ${
                            activePlaceholderTab === 'avatar'
                              ? 'bg-neutral-800 text-emerald-400 font-semibold'
                              : 'text-neutral-400 hover:text-neutral-200'
                          }`}
                        >
                          Identity
                        </button>
                        <button
                          onClick={() => setActivePlaceholderTab('code')}
                          className={`px-2 py-0.5 rounded-md transition-all cursor-pointer ${
                            activePlaceholderTab === 'code'
                              ? 'bg-neutral-800 text-emerald-400 font-semibold'
                              : 'text-neutral-400 hover:text-neutral-200'
                          }`}
                        >
                          Code
                        </button>
                      </div>
                    </div>

                    {/* Body: Identity Avatar View OR Code Terminal View */}
                    {activePlaceholderTab === 'avatar' ? (
                      <div className="flex-1 flex flex-col items-center justify-center text-center py-4 space-y-4">
                        {/* High-tech Geometric Monogram Avatar */}
                        <div className="relative">
                          <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-emerald-500/20 via-neutral-900 to-teal-500/20 border-2 border-emerald-500/40 p-1 flex items-center justify-center shadow-xl shadow-emerald-950/50">
                            <div className="w-full h-full rounded-2xl bg-neutral-900 flex flex-col items-center justify-center">
                              <span className="text-2xl font-black font-mono tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">
                                RB
                              </span>
                              <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest mt-0.5">
                                CSE • AI
                              </span>
                            </div>
                          </div>
                          <span className="absolute -bottom-1 -right-1 p-1 rounded-full bg-emerald-500 text-neutral-950 shadow-md">
                            <Sparkles className="w-3 h-3" />
                          </span>
                        </div>

                        {/* Developer Title & Highlights */}
                        <div className="space-y-1 max-w-[240px]">
                          <div className="text-sm font-bold text-white tracking-tight">{name}</div>
                          <p className="text-[11px] text-neutral-400 leading-tight">
                            B.Tech Computer Science & Engineering (AI-ML)
                          </p>
                        </div>

                        {/* Badges strip */}
                        <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-neutral-900 border border-neutral-800 text-emerald-400">
                            Dr. APJ Abdul Kalam Tech Univ
                          </span>
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-neutral-900 border border-neutral-800 text-neutral-300">
                            3rd Semester
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex-1 overflow-hidden flex flex-col justify-center py-2">
                        <div className="relative font-mono text-[11px] text-neutral-300 bg-neutral-900/60 p-3 rounded-xl border border-neutral-800/80 overflow-x-auto leading-relaxed">
                          <button
                            onClick={handleCopyCode}
                            className="absolute top-2 right-2 p-1 rounded text-neutral-400 hover:text-white bg-neutral-800/80 transition-colors"
                            title="Copy code"
                          >
                            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          </button>
                          <pre className="whitespace-pre">
                            <code>{codeSnippet}</code>
                          </pre>
                        </div>
                      </div>
                    )}

                    {/* Footer strip */}
                    <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between text-[10px] font-mono text-neutral-400">
                      <div className="flex items-center gap-1.5 text-emerald-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span>Ready for Internships</span>
                      </div>
                      <span>Open to Work</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
