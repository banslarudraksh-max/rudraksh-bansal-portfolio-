import React, { useState } from 'react';
import { X, Printer, Download, Mail, ExternalLink, GraduationCap, CodeXml, Award } from 'lucide-react';
import { PERSONAL_INFO, SKILL_CATEGORIES, PROJECTS, EDUCATION_DATA } from '../data/portfolioData';
import { generateResumePDF } from '../utils/generateResumePdf';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  links?: {
    github: string;
    linkedin: string;
    email: string;
  };
}

export const ResumeModal: React.FC<ResumeModalProps> = ({
  isOpen,
  onClose,
  links = PERSONAL_INFO.links,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    try {
      window.focus();
      window.print();
    } catch (error) {
      console.error('Error invoking print dialog:', error);
    }
  };

  const handleSavePDF = () => {
    try {
      setIsGenerating(true);
      generateResumePDF(links);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div 
      id="resume-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
    >
      <div 
        id="resume-modal-container"
        className="w-full max-w-4xl max-h-[90vh] bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-neutral-100 my-auto"
      >
        {/* Modal Top Bar */}
        <div 
          id="resume-modal-top-bar"
          className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950/80 shrink-0"
        >
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span className="text-sm font-semibold tracking-wide text-neutral-200">
              Rudraksh_Bansal_Resume.pdf (Preview)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleSavePDF}
              id="resume-save-pdf-btn"
              disabled={isGenerating}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-emerald-600 hover:bg-emerald-500 active:scale-95 disabled:opacity-50 rounded-lg transition-all shadow-sm"
              title="Save Resume as PDF"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isGenerating ? 'Generating...' : 'Save PDF'}</span>
            </button>
            <button
              onClick={handlePrint}
              id="resume-print-btn"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-300 bg-neutral-800 hover:bg-neutral-700 hover:text-white active:scale-95 rounded-lg transition-all border border-neutral-700/60"
              title="Print Resume"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
            <button
              onClick={onClose}
              id="resume-close-btn"
              className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800 transition-colors ml-1"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Document View */}
        <div 
          id="resume-printable-content"
          className="overflow-y-auto p-6 sm:p-10 space-y-8 bg-neutral-950/50 print:bg-white print:text-black print:p-0"
        >
          {/* Header */}
          <div className="border-b border-neutral-800 pb-6">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              {PERSONAL_INFO.name}
            </h1>
            <p className="text-sm sm:text-base font-medium text-emerald-400 mt-1">
              {PERSONAL_INFO.role}
            </p>
            <p className="text-xs text-neutral-400 mt-2">
              {PERSONAL_INFO.location} • {EDUCATION_DATA.institution}
            </p>

            <div className="flex flex-wrap gap-4 mt-3 text-xs text-neutral-300">
              <a
                href={`mailto:${links.email}`}
                className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
                title={`Send email to ${links.email}`}
              >
                <Mail className="w-3.5 h-3.5 text-neutral-400" />
                {links.email}
              </a>
              <a 
                href={links.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
                title="Open GitHub Profile"
              >
                <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
                GitHub Profile
              </a>
              <a 
                href={links.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
                title="Open LinkedIn Profile"
              >
                <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
                LinkedIn Profile
              </a>
            </div>
          </div>

          {/* Objective / Summary */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">
              Professional Summary
            </h2>
            <p className="text-sm text-neutral-300 leading-relaxed">
              {PERSONAL_INFO.bio}
            </p>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3 flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              Education
            </h2>
            <div className="bg-neutral-900/60 border border-neutral-800/80 rounded-xl p-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <h3 className="text-sm font-semibold text-white">
                  {EDUCATION_DATA.degree} – {EDUCATION_DATA.specialization}
                </h3>
                <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full w-fit">
                  {EDUCATION_DATA.currentSemester}
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-1">
                {EDUCATION_DATA.institution} • {EDUCATION_DATA.period}
              </p>
              <div className="mt-3">
                <p className="text-xs font-medium text-neutral-300 mb-1.5">Relevant Academic Coursework:</p>
                <div className="flex flex-wrap gap-1.5">
                  {EDUCATION_DATA.coursework.map((course, i) => (
                    <span 
                      key={i} 
                      className="text-[11px] px-2 py-0.5 bg-neutral-800/80 text-neutral-300 rounded border border-neutral-700/60"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Skills Breakdown */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3 flex items-center gap-2">
              <Award className="w-4 h-4" />
              Technical & Professional Skills
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SKILL_CATEGORIES.map((cat, i) => (
                <div key={i} className="p-3 bg-neutral-900/50 border border-neutral-800 rounded-xl">
                  <span className="text-xs font-semibold text-neutral-200 block mb-1">
                    {cat.title}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.map((s, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-0.5 bg-neutral-800 text-neutral-300 rounded"
                      >
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Projects */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3 flex items-center gap-2">
              <CodeXml className="w-4 h-4" />
              Academic & Practical Projects
            </h2>
            <div className="space-y-3">
              {PROJECTS.map((proj) => (
                <div key={proj.id} className="p-4 bg-neutral-900/40 border border-neutral-800/80 rounded-xl">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <h3 className="text-sm font-semibold text-white">
                      {proj.title}
                    </h3>
                    <span className="text-xs text-neutral-400 font-mono">
                      {proj.category}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-300 mt-1.5 leading-relaxed">
                    {proj.description}
                  </p>
                  <ul className="mt-2 space-y-1 list-disc list-inside text-xs text-neutral-400">
                    {proj.keyFeatures.slice(0, 2).map((feat, idx) => (
                      <li key={idx}>{feat}</li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1.5 mt-2.5">
                    {proj.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] px-2 py-0.5 bg-neutral-800/70 text-emerald-300 rounded font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div 
          id="resume-modal-footer-bar"
          className="px-6 py-3 border-t border-neutral-800 bg-neutral-950/90 text-center text-xs text-neutral-400 shrink-0"
        >
          Professional Student Portfolio • Prepared for Internship Evaluation
        </div>
      </div>
    </div>
  );
};
