import React, { useState } from 'react';
import { ArrowDown, Send, Code, Terminal, Check, Copy, ExternalLink, Sparkles, FolderGit2 } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroProps {
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  const [activeTab, setActiveTab] = useState<'python' | 'json' | 'cli'>('python');
  const [copied, setCopied] = useState(false);

  const pythonCode = `# developer_profile.py
class DeveloperProfile:
    def __init__(self):
        self.name = "${PERSONAL_INFO.name}"
        self.education = "B.Tech in CSE (AI-ML)"
        self.university = "AKTU (3rd Semester)"
        self.focus_areas = [
            "Python Programming",
            "Web Development",
            "Emerging AI Tools"
        ]
        self.status = "Open to Internship Opportunities"
        self.mindset = "Practical Solutions & Continuous Growth"

    def get_mission(self) -> str:
        return "${PERSONAL_INFO.tagline}"

dev = DeveloperProfile()
print(f"Status: {dev.status}")`;

  const jsonCode = `{
  "developer": "${PERSONAL_INFO.name}",
  "role": "Aspiring Software Developer",
  "academic": {
    "program": "B.Tech CSE (AI-ML)",
    "institution": "Dr. A.P.J. Abdul Kalam Technical University",
    "semester": "3rd Semester",
    "timeline": "2024-2028"
  },
  "technical_toolkit": {
    "languages": ["Python", "JavaScript", "HTML5", "CSS3"],
    "version_control": ["Git", "GitHub"],
    "competencies": ["Responsive Design", "AI Tools", "Problem Solving"]
  },
  "open_to": ["Internships", "Collaborations", "Mentorship"]
}`;

  const cliOutput = `$ python -m rudraksh.check_status
[OK] Environment: Python 3.11 / React 19 / Modern Web
[OK] University: AKTU (B.Tech CSE AI-ML, 3rd Sem)
[OK] Projects Loaded: 4 practical implementations
[OK] Core Focus: Clean software architecture & AI workflows
[STATUS] Candidate ready for software development internships!
$ _`;

  const getActiveCode = () => {
    switch (activeTab) {
      case 'python':
        return pythonCode;
      case 'json':
        return jsonCode;
      case 'cli':
        return cliOutput;
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getActiveCode());
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
      className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden"
    >
      {/* Subtle background ambient mesh */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/5 blur-[120px] pointer-events-none rounded-full"></div>
      <div className="absolute top-1/3 right-10 w-[300px] h-[250px] bg-teal-500/5 blur-[100px] pointer-events-none rounded-full"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900/80 border border-neutral-800 text-xs text-neutral-300 backdrop-blur-sm shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-mono text-[11px] sm:text-xs">
                3rd Semester CSE (AI-ML) @ AKTU • Seeking Internships
              </span>
            </div>

            {/* Main Headings */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
                Hi, I'm{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200">
                  Rudraksh Bansal
                </span>
              </h1>
              <h2 className="text-lg sm:text-2xl font-medium text-neutral-300">
                B.Tech CSE Student & Aspiring Software Developer
              </h2>
            </div>

            {/* Short Introduction */}
            <p className="text-base sm:text-lg text-neutral-400 max-w-xl leading-relaxed">
              {PERSONAL_INFO.tagline}
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
            <div className="flex flex-wrap items-center gap-3.5 pt-3">
              <button
                onClick={() => scrollToSection('projects')}
                id="hero-view-projects-btn"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-sm font-semibold text-white transition-all shadow-lg shadow-emerald-950/40 active:scale-95 group"
              >
                <span>View My Projects</span>
                <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
              </button>

              <button
                onClick={() => scrollToSection('contact')}
                id="hero-contact-me-btn"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-sm font-semibold text-neutral-200 border border-neutral-800 transition-all hover:border-neutral-700 active:scale-95"
              >
                <span>Contact Me</span>
                <Send className="w-4 h-4 text-neutral-400" />
              </button>

              <button
                onClick={onOpenResume}
                id="hero-view-resume-btn"
                className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl text-xs font-medium text-neutral-400 hover:text-white transition-colors"
              >
                <span>View Resume</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: Developer-themed visual element */}
          <div className="lg:col-span-5">
            <div 
              id="hero-code-terminal"
              className="w-full bg-neutral-900/90 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-md"
            >
              {/* Window Header with Unix control buttons and tabs */}
              <div className="flex items-center justify-between px-4 py-3 bg-neutral-950 border-b border-neutral-800">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
                    <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
                  </div>
                  <div className="h-4 w-[1px] bg-neutral-800 mx-1"></div>
                  {/* File Tabs */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setActiveTab('python')}
                      className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${
                        activeTab === 'python'
                          ? 'bg-neutral-800 text-emerald-400 font-medium'
                          : 'text-neutral-400 hover:text-neutral-200'
                      }`}
                    >
                      profile.py
                    </button>
                    <button
                      onClick={() => setActiveTab('json')}
                      className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${
                        activeTab === 'json'
                          ? 'bg-neutral-800 text-emerald-400 font-medium'
                          : 'text-neutral-400 hover:text-neutral-200'
                      }`}
                    >
                      spec.json
                    </button>
                    <button
                      onClick={() => setActiveTab('cli')}
                      className={`px-2.5 py-1 rounded text-xs font-mono transition-colors flex items-center gap-1 ${
                        activeTab === 'cli'
                          ? 'bg-neutral-800 text-emerald-400 font-medium'
                          : 'text-neutral-400 hover:text-neutral-200'
                      }`}
                    >
                      <Terminal className="w-3 h-3" />
                      <span>status</span>
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleCopy}
                  title="Copy Code"
                  className="p-1 rounded text-neutral-400 hover:text-white transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Code / Terminal Content Area */}
              <div className="p-4 sm:p-5 bg-neutral-950/60 font-mono text-xs text-neutral-300 overflow-x-auto min-h-[290px] flex flex-col justify-between">
                <pre className="leading-relaxed selection:bg-emerald-500/30">
                  <code>{getActiveCode()}</code>
                </pre>

                <div className="pt-4 mt-4 border-t border-neutral-800/80 flex items-center justify-between text-[11px] text-neutral-500">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span>UTF-8 • Python 3.11</span>
                  </div>
                  <span>Rudraksh Bansal Portfolio</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
