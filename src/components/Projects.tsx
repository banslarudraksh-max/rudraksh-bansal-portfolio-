import React, { useState } from 'react';
import { ExternalLink, Github, Sparkles, FolderCode, Calendar, Clock, BookOpen, Calculator, Layers, ArrowUpRight, Star } from 'lucide-react';
import { PROJECTS, PERSONAL_INFO } from '../data/portfolioData';
import { ProjectItem } from '../types';

interface ProjectsProps {
  onSelectProject: (project: ProjectItem) => void;
  githubUrl?: string;
  projects?: ProjectItem[];
}

export const Projects: React.FC<ProjectsProps> = ({
  onSelectProject,
  githubUrl = PERSONAL_INFO.links.github,
  projects,
}) => {
  const [filter, setFilter] = useState<'all' | 'python' | 'web'>('all');

  const baseProjects = (projects && projects.length > 0 ? projects : PROJECTS).filter(
    (p) => p.isVisible !== false
  );

  const filteredProjects = baseProjects.filter((p) => {
    if (filter === 'python') return p.technologies.some((t) => t.toLowerCase().includes('python'));
    if (filter === 'web') return p.technologies.some((t) => ['html5', 'css3', 'javascript', 'web', 'react'].some((w) => t.toLowerCase().includes(w)));
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
    <section id="projects" className="py-10 sm:py-14 md:py-16 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-6 sm:mb-8 md:mb-10">
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
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-1 p-1 bg-neutral-900 border border-neutral-800 rounded-xl w-full sm:w-fit">
            <button
              onClick={() => setFilter('all')}
              className={`flex-1 sm:flex-initial px-3 sm:px-3.5 py-1.5 rounded-lg text-xs font-medium text-center transition-all ${
                filter === 'all'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              All Projects ({baseProjects.length})
            </button>
            <button
              onClick={() => setFilter('python')}
              className={`flex-1 sm:flex-initial px-3 sm:px-3.5 py-1.5 rounded-lg text-xs font-medium text-center transition-all ${
                filter === 'python'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Python / Desktop
            </button>
            <button
              onClick={() => setFilter('web')}
              className={`flex-1 sm:flex-initial px-3 sm:px-3.5 py-1.5 rounded-lg text-xs font-medium text-center transition-all ${
                filter === 'web'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Web Dev
            </button>
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id}
              id={`project-card-${project.id}`}
              className="p-5 sm:p-7 rounded-2xl bg-neutral-900/40 border border-neutral-800/80 hover:border-neutral-700/80 transition-all duration-300 flex flex-col justify-between group overflow-hidden"
            >
              <div>
                {/* Optional Project Screenshot */}
                {project.imageUrl && (
                  <div className="mb-4 -mx-6 -mt-6 h-40 overflow-hidden bg-neutral-950 border-b border-neutral-800">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}

                {/* Category & Status Bar */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-neutral-800/80 border border-neutral-700/60 group-hover:scale-105 transition-transform">
                      {getProjectIcon(project.id)}
                    </div>
                    <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
                      {project.category}
                    </span>
                    {project.isFeatured && (
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium bg-amber-500/10 text-amber-300 border border-amber-500/20">
                        <Star className="w-2.5 h-2.5 fill-amber-400" />
                        Featured
                      </span>
                    )}
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
              <div className="pt-4 sm:pt-6 mt-4 sm:mt-6 border-t border-neutral-800/70 flex flex-wrap sm:flex-nowrap items-center justify-between gap-2.5 sm:gap-3">
                <button
                  onClick={() => onSelectProject(project)}
                  id={`view-project-btn-${project.id}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-medium text-white transition-all active:scale-95 cursor-pointer"
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

                  {project.demoPlaceholder && project.demoPlaceholder !== '#' && (
                    <a
                      href={project.demoPlaceholder}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Live Demo"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600/20 border border-emerald-500/30 hover:border-emerald-500/50 text-xs font-mono text-emerald-300 hover:text-white transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
