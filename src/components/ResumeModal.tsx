import React, { useState } from 'react';
import { X, Printer, Download, ExternalLink, FileText, CheckCircle2 } from 'lucide-react';
import { PERSONAL_INFO, EDUCATION_DATA, SKILL_CATEGORIES, PROJECTS } from '../data/portfolioData';
import { ProfileDataAdmin } from '../admin/types';
import { generateResumePDF } from '../utils/generateResumePdf';

interface ResumeModalProps {
  isOpen?: boolean;
  onClose: () => void;
  profile?: ProfileDataAdmin;
  resumeUrl?: string;
  activeResumeName?: string;
  links?: Record<string, string>;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({
  isOpen = true,
  onClose,
  profile,
  resumeUrl,
  activeResumeName,
  links,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen) return null;

  const name = profile?.name || PERSONAL_INFO.name;
  const role = profile?.role || PERSONAL_INFO.role;
  const location = profile?.location || PERSONAL_INFO.location;
  const email = links?.email || PERSONAL_INFO.links.email;
  const degree = profile?.degree || EDUCATION_DATA.degree;
  const institution = profile?.university || EDUCATION_DATA.institution;
  const currentSemester = profile?.currentSemester || EDUCATION_DATA.currentSemester;
  const activeUrl = resumeUrl || profile?.resumeUrl;

  const hasRemoteAsset = Boolean(
    activeUrl &&
      activeUrl !== '#' &&
      (activeUrl.startsWith('http://') ||
        activeUrl.startsWith('https://') ||
        activeUrl.startsWith('blob:') ||
        activeUrl.startsWith('data:'))
  );

  const handlePrint = () => {
    window.print();
  };

  const handleSavePDF = async () => {
    // 1. If a real PDF file is uploaded to Supabase Storage, download it directly!
    if (hasRemoteAsset && activeUrl) {
      const a = document.createElement('a');
      a.href = activeUrl;
      a.download = activeResumeName || `${name.replace(/\s+/g, '_')}_Resume.pdf`;
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      return;
    }

    // 2. Generate clean vector A4 PDF using jsPDF
    setIsGenerating(true);
    try {
      generateResumePDF({
        profile: {
          name,
          role,
          location,
          degree,
          university: institution,
          currentSemester,
          bio: PERSONAL_INFO.bio,
        },
        links: {
          email,
          github: links?.github || PERSONAL_INFO.links.github,
          linkedin: links?.linkedin || PERSONAL_INFO.links.linkedin,
        },
        filename: activeResumeName || `${name.replace(/\s+/g, '_')}_Resume.pdf`,
      });
    } catch (err) {
      console.error('PDF generation failed, falling back to print:', err);
      window.print();
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
          className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-neutral-800 bg-neutral-950/80 shrink-0"
        >
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span className="text-sm font-semibold tracking-wide text-neutral-200">
              {activeResumeName || `${name.replace(/\s+/g, '_')}_Resume.pdf`}
            </span>
            {hasRemoteAsset && (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Live Supabase Asset
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {hasRemoteAsset && activeUrl && (
              <a
                href={activeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-emerald-300 bg-emerald-950/50 hover:bg-emerald-900/50 rounded-lg transition-all border border-emerald-500/40"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open Direct PDF</span>
              </a>
            )}
            <button
              onClick={handleSavePDF}
              id="resume-save-pdf-btn"
              disabled={isGenerating}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-emerald-600 hover:bg-emerald-500 active:scale-95 disabled:opacity-50 rounded-lg transition-all shadow-sm cursor-pointer"
              title="Download Resume as PDF"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isGenerating ? 'Generating...' : 'Download Resume'}</span>
            </button>
            <button
              onClick={handlePrint}
              id="resume-print-btn"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-300 bg-neutral-800 hover:bg-neutral-700 hover:text-white active:scale-95 rounded-lg transition-all border border-neutral-700/60 cursor-pointer"
              title="Print Resume"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
            <button
              onClick={onClose}
              id="resume-close-btn"
              className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800 transition-colors ml-1 cursor-pointer"
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
              {name}
            </h1>
            <p className="text-sm sm:text-base font-medium text-emerald-400 mt-1">
              {role}
            </p>
            <p className="text-xs text-neutral-400 mt-2">
              {location} • {institution}
            </p>
            <div className="flex flex-wrap gap-4 mt-3 text-xs text-neutral-300 font-mono">
              <span>{email}</span>
              <span>•</span>
              <a href={PERSONAL_INFO.links.github} className="hover:text-emerald-400">
                github.com/Rudraksh-Bansal
              </a>
              <span>•</span>
              <a href={PERSONAL_INFO.links.linkedin} className="hover:text-emerald-400">
                linkedin.com/in/rudraksh-bansal
              </a>
            </div>
          </div>

          {/* Education */}
          <div className="space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-400 font-mono">
              Education
            </h2>
            <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800/80 space-y-1.5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                <h3 className="text-sm font-semibold text-white">
                  {degree}
                </h3>
                <span className="text-xs font-mono text-neutral-400">
                  {EDUCATION_DATA.period}
                </span>
              </div>
              <p className="text-xs font-medium text-emerald-300">
                {institution}
              </p>
              <p className="text-xs text-neutral-400 pt-1">
                Current Standing: <strong>{currentSemester}</strong> • AI & ML Specialization
              </p>
            </div>
          </div>

          {/* Technical Skills */}
          <div className="space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-400 font-mono">
              Technical Competencies
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {SKILL_CATEGORIES.map((cat, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800/80">
                  <span className="text-xs font-mono text-neutral-400 block mb-1.5">
                    {cat.title}
                  </span>
                  <p className="text-xs text-neutral-200">
                    {cat.skills.map((s) => s.name).join(', ')}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div className="space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-400 font-mono">
              Featured Projects
            </h2>
            <div className="space-y-3">
              {PROJECTS.map((proj) => (
                <div key={proj.id} className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800/80 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-white">
                      {proj.title}
                    </h3>
                    <span className="text-[11px] font-mono text-emerald-400">
                      {proj.category}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-300">
                    {proj.description}
                  </p>
                  <p className="text-[11px] font-mono text-neutral-400 pt-1">
                    Tech: {proj.technologies.join(' • ')}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom statement */}
          <div className="pt-4 border-t border-neutral-800 text-[11px] text-neutral-500 font-mono flex items-center justify-between">
            <span>Portfolio & CMS verified profile</span>
            <span>Available for technical internships</span>
          </div>
        </div>
      </div>
    </div>
  );
};
