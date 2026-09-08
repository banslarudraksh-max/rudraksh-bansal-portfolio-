import React, { useState } from 'react';
import { ExternalLink, Github, Sparkles, FolderCode, Calendar, Clock, BookOpen, Calculator, Layers, ArrowUpRight } from 'lucide-react';
import { PROJECTS, PERSONAL_INFO } from '../data/portfolioData';
import { ProjectItem } from '../types';

interface ProjectsProps {
  onSelectProject: (project: ProjectItem) => void;
  githubUrl?: string;
}

export const Projects: React.FC<ProjectsProps> = ({
  onSelectProject,
  githubUrl = PERSONAL_INFO.links.github,
}) => {
  const [filter, setFilter] = useState<'all' | 'python' | 'web'>('all');

  const filteredProjects = PROJECTS.filter((p) => {
    if (filter === 'python') return p.technologies.some(t => t.toLowerCase().includes('python'));
    if (filter === 'web') return p.technologies.some(t => ['html5', 'css3', 'javascript', 'web'].some(w => t.toLowerCase().includes(w)));
    return true;
  });

  const getProjectIcon = (id: string) => {
    switch (id) {
      case 'calendar-reminder-app':
        return <Calendar className="w-5 h-5 text-emerald-400" />;
      case 'alarm-clock':
        return <Clock className="w-5 h-5 text-teal-400" />;
      case 'personal-blog-website':
        return <BookOpen className="w-5 h-5 text-emerald-400" />;
      case 'basic-calculator':
        return <Calculator className="w-5 h-5 text-teal-400" />;
      default:
        return <FolderCode className="w-5 h-5 text-emerald-400" />;
    }
  };

  return (
    <section id="projects" className="py-20 sm:py-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="text-xs font-mono tracking-widest text-emerald-400 uppercase">
                Work & Implementations
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
              Featured Projects
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 max-w-2xl">
              Practical software applications built with Python and modern web technologies to solve everyday utility needs.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 bg-neutral-900 border border-neutral-800 rounded-xl w-fit">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                filter === 'all'
                  ? 'bg-neutral-800 text-emerald-400 font-semibold shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              All ({PROJECTS.length})
            </button>
            <button
              onClick={() => setFilter('python')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                filter === 'python'
                  ? 'bg-neutral-800 text-emerald-400 font-semibold shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Python ({PROJECTS.filter(p => p.technologies.some(t => t.toLowerCase().includes('python'))).length})
            </button>
            <button
              onClick={() => setFilter('web')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                filter === 'web'
                  ? 'bg-neutral-800 text-emerald-400 font-semibold shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Web Dev ({PROJECTS.filter(p => p.technologies.some(t => ['html5', 'css3', 'javascript', 'web'].some(w => t.toLowerCase().includes(w)))).length})
            </button>
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id}
              id={`project-card-${project.id}`}
              className="p-6 sm:p-7 rounded-2xl bg-neutral-900/40 border border-neutral-800/80 hover:border-neutral-700/80 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Category & Status Bar */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-neutral-800/80 border border-neutral-700/60 group-hover:scale-105 transition-transform">
                      {getProjectIcon(project.id)}
                    </div>
                    <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
                      {project.category}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-neutral-500">
                    0{idx + 1}
                  </span>
                </div>

                {/* Project Title */}
                <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-neutral-300 mt-2.5 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 mt-5">
                  {project.technologies.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 text-xs font-mono bg-neutral-950/80 text-neutral-300 border border-neutral-800 rounded-lg"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 mt-6 border-t border-neutral-800/70 flex items-center justify-between gap-3">
                <button
                  onClick={() => onSelectProject(project)}
                  id={`view-project-btn-${project.id}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-medium text-white transition-all active:scale-95"
                >
                  <span>View Project</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
                </button>

                <div className="flex items-center gap-2">
                  <a
                    href={project.githubPlaceholder || githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="View Source Repository"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-xs font-mono text-neutral-300 hover:text-white transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>Code</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
