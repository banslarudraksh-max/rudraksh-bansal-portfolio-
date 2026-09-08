import React, { useState } from 'react';
import { X, ExternalLink, Github, Check, Copy, Code2, Sparkles, Layers } from 'lucide-react';
import { ProjectItem } from '../types';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  githubUrl?: string;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  githubUrl = PERSONAL_INFO.links.github,
}) => {
  const [copied, setCopied] = useState(false);

  if (!project) return null;

  const handleCopyCode = () => {
    if (project.codeSnippetPreview) {
      navigator.clipboard.writeText(project.codeSnippetPreview.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div 
        id="project-detail-modal"
        className="w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-neutral-100 my-auto"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950/60">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400">
              {project.category}
            </span>
          </div>
          <button
            onClick={onClose}
            id="close-project-modal-btn"
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto max-h-[75vh] space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              {project.title}
            </h2>
            <p className="text-sm text-neutral-300 mt-2 leading-relaxed">
              {project.fullDescription}
            </p>
          </div>

          {/* Key Features */}
          <div className="p-4 bg-neutral-950/60 border border-neutral-800/80 rounded-xl">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              Core Architecture & Highlights
            </h3>
            <ul className="space-y-2">
              {project.keyFeatures.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0"></span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2 flex items-center gap-2">
              <Layers className="w-3.5 h-3.5" />
              Technologies Used
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-xs font-mono bg-neutral-800/90 text-neutral-200 border border-neutral-700/60 rounded-lg"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Code Snippet Highlight */}
          {project.codeSnippetPreview && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                  <Code2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{project.codeSnippetPreview.filename}</span>
                </div>
                <button
                  onClick={handleCopyCode}
                  className="inline-flex items-center gap-1 text-xs text-neutral-400 hover:text-white px-2 py-1 rounded bg-neutral-800/60 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy Logic'}</span>
                </button>
              </div>
              <pre className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl overflow-x-auto text-xs font-mono text-neutral-300 leading-relaxed">
                <code>{project.codeSnippetPreview.code}</code>
              </pre>
            </div>
          )}

          {/* Repository & Source Action */}
          <div className="p-4 bg-neutral-800/30 border border-neutral-700/50 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-300">
                Project Repository
              </span>
            </div>
            <p className="text-xs text-neutral-400">
              Source code, architecture details, and documentation for {project.title} are hosted on GitHub.
            </p>
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <a
                href={project.githubPlaceholder || githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-medium text-white transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>View on GitHub</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-60" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-neutral-800 bg-neutral-950/70 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-medium bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition-colors"
          >
            Close Overview
          </button>
        </div>
      </div>
    </div>
  );
};
