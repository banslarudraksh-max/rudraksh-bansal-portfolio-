import React, { useState } from 'react';
import { ArrowDown, Send, Code, Terminal, Check, Copy, ExternalLink, Sparkles, FolderGit2 } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ProfileDataAdmin } from '../admin/types';

interface HeroProps {
  onOpenResume: () => void;
  profile?: ProfileDataAdmin;
  resumeUrl?: string;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume, profile, resumeUrl }) => {
  const [activeTab, setActiveTab] = useState<'python' | 'json' | 'cli'>('python');
  const [copied, setCopied] = useState(false);

  const name = profile?.name || PERSONAL_INFO.name;
  const role = profile?.role || 'B.Tech CSE Student & Aspiring Software Developer';
  const headline = profile?.headline || 'Building practical solutions with code, creativity and emerging AI technologies.';
  const intro = profile?.introduction || PERSONAL_INFO.tagline;
  const semester = profile?.currentSemester || PERSONAL_INFO.currentSemester;
  const specialization = profile?.specialization || 'CSE (AI-ML)';
  const university = profile?.university ? 'AKTU' : 'AKTU';
  const availability = profile?.availabilityStatus || 'Seeking Internships';

  const pythonCode = `# developer_profile.py
class DeveloperProfile:
    def __init__(self):
        self.name = "${name}"
        self.education = "B.Tech in ${specialization}"
        self.university = "${university} (${semester})"
        self.focus_areas = [
            "Python Programming",
            "Web Development",
            "Emerging AI Tools"
        ]
        self.status = "${availability}"
        self.mindset = "Practical Solutions & Continuous Growth"

    def get_mission(self) -> str:
        return "${intro}"

dev = DeveloperProfile()
print(f"Status: {dev.status}")`;

  const jsonCode = `{
  "developer": "${name}",
  "role": "${role}",
  "academic": {
    "program": "B.Tech ${specialization}",
    "institution": "${profile?.university || 'Dr. A.P.J. Abdul Kalam Technical University'}",
    "semester": "${semester}",
    "timeline": "2024-2028"
  },
  "coreCompetencies": [
    "Python",
    "JavaScript",
    "HTML5/CSS3",
    "Data Structures",
    "Prompt Engineering"
  ],
  "availability": "${availability}"
}`;

  const cliCode = `$ whoami
${name.toLowerCase().replace(/\s+/g, '-')}

$ cat ~/status.txt
Enthusiastic computer science undergraduate with proven 
curiosity for real-world software creation. Actively seeking 
meaningful internship and development roles.

$ echo $SPECIALIZATION
${specialization} (${semester})

$ ping -c 1 opportunity.status
64 bytes from opportunity: status=READY_FOR_INTERNSHIP time=0.042 ms`;

  const getCurrentCode = () => {
    switch (activeTab) {
      case 'python':
        return pythonCode;
      case 'json':
        return jsonCode;
      case 'cli':
        return cliCode;
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getCurrentCode());
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
      className="relative pt-24 sm:pt-28 pb-8 sm:pb-12 overflow-hidden"
    >
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-teal-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* Left Column: Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900/80 border border-neutral-800 text-xs text-neutral-300 backdrop-blur-sm shadow-sm max-w-full">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-mono text-[11px] sm:text-xs truncate">
                {semester} {specialization} @ {university} • {availability}
              </span>
            </div>

            {/* Main Headings */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
                Hi, I'm{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200">
                  {name}
                </span>
              </h1>
              <h2 className="text-lg sm:text-2xl font-medium text-neutral-300">
                {headline || role}
              </h2>
            </div>

            {/* Short Introduction */}
            <p className="text-base sm:text-lg text-neutral-400 max-w-xl leading-relaxed">
              {intro}
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

          {/* Right Column: Interactive Code Card */}
          <div className="lg:col-span-5 w-full">
            <div 
              id="hero-code-card"
              className="w-full rounded-2xl bg-neutral-900/90 border border-neutral-800 shadow-2xl backdrop-blur-xl overflow-hidden transition-all duration-300 hover:border-neutral-700/80 group"
            >
              {/* Window Titlebar */}
              <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 bg-neutral-950/80 border-b border-neutral-800/80">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500/80" />
                  <span className="text-xs font-mono text-neutral-400 ml-1.5 hidden sm:inline-block">
                    {activeTab === 'python' ? 'profile.py' : activeTab === 'json' ? 'developer.json' : 'terminal.sh'}
                  </span>
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-1 bg-neutral-900/80 p-0.5 rounded-lg border border-neutral-800 text-xs font-mono">
                  <button
                    onClick={() => setActiveTab('python')}
                    id="tab-python"
                    className={`px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md text-[11px] sm:text-xs transition-all ${
                      activeTab === 'python'
                        ? 'bg-neutral-800 text-emerald-400 shadow-sm font-semibold'
                        : 'text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    Python
                  </button>
                  <button
                    onClick={() => setActiveTab('json')}
                    id="tab-json"
                    className={`px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md text-[11px] sm:text-xs transition-all ${
                      activeTab === 'json'
                        ? 'bg-neutral-800 text-emerald-400 shadow-sm font-semibold'
                        : 'text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    JSON
                  </button>
                  <button
                    onClick={() => setActiveTab('cli')}
                    id="tab-cli"
                    className={`px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md text-[11px] sm:text-xs transition-all ${
                      activeTab === 'cli'
                        ? 'bg-neutral-800 text-emerald-400 shadow-sm font-semibold'
                        : 'text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    CLI
                  </button>
                </div>

                {/* Copy Button */}
                <button
                  onClick={handleCopy}
                  id="copy-code-btn"
                  title="Copy code snippet"
                  className="p-1.5 text-neutral-400 hover:text-white rounded-md hover:bg-neutral-800 transition-colors ml-1 sm:ml-2"
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              {/* Code Editor Body */}
              <div className="p-3.5 sm:p-5 font-mono text-[11px] sm:text-xs overflow-x-auto max-h-[290px] sm:max-h-[350px] text-neutral-300 leading-relaxed scrollbar-thin scrollbar-thumb-neutral-800">
                <pre className="select-text whitespace-pre font-mono">
                  <code>{getCurrentCode()}</code>
                </pre>
              </div>

              {/* Footer info strip */}
              <div className="px-3 sm:px-4 py-1.5 sm:py-2 bg-neutral-950/60 border-t border-neutral-800/60 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-neutral-500">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>Interactive Live Environment</span>
                </div>
                <span>UTF-8 • LF</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
