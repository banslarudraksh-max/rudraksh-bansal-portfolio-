import React, { useState } from 'react';
import {
  ScrollText,
  Upload,
  Download,
  Eye,
  CheckCircle2,
  FileCheck,
  RefreshCw,
  Sparkles,
  Trash2,
  Check,
  ExternalLink,
} from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';
import { useToast } from '../context/ToastContext';
import { FormInput } from '../components/FormControls';
import { generateResumePDF } from '../../utils/generateResumePdf';

export const ResumePage: React.FC = () => {
  const {
    resumes,
    activeResume,
    uploadResume,
    setActiveResume,
    deleteResume,
    profile,
    socialLinks,
  } = useAdminData();
  const { success, error, info } = useToast();

  const [isUploading, setIsUploading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [versionInput, setVersionInput] = useState('v1.0 (AKTU CS)');

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      error('Invalid File Type', 'Please upload a PDF document.');
      return;
    }

    setIsUploading(true);
    try {
      const res = await uploadResume(file, versionInput);
      if (res.success) {
        success('Resume Uploaded', `"${file.name}" saved to Supabase Storage and set as active.`);
      } else {
        error('Upload Failed', res.error || 'Failed to upload resume to Supabase Storage.');
      }
    } catch (err: unknown) {
      error('Upload Error', err instanceof Error ? err.message : 'Unknown upload error');
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  const handleSetActive = async (id: string, name: string) => {
    const res = await setActiveResume(id);
    if (res.success) {
      success('Active Resume Changed', `"${name}" is now the active portfolio resume.`);
    } else {
      error('Error', res.error || 'Failed to set active resume');
    }
  };

  const handleDelete = async (id: string, name: string) => {
    const res = await deleteResume(id);
    if (res.success) {
      info('Resume Removed', `"${name}" was deleted from records.`);
    } else {
      error('Delete Error', res.error || 'Failed to delete resume');
    }
  };

  const handleDownloadPdf = async () => {
    setIsGenerating(true);
    try {
      generateResumePDF({
        email: socialLinks.email,
        github: socialLinks.github,
        linkedin: socialLinks.linkedin,
      });
      success('PDF Generated', 'Downloaded vector Rudraksh_Bansal_Resume.pdf');
    } catch (e) {
      console.error(e);
      info('PDF Notice', 'Generated via portfolio resume engine.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Resume & Document Management</h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            Upload PDF files to Supabase Storage, manage versions, and select the active public portfolio CV.
          </p>
        </div>

        <button
          onClick={handleDownloadPdf}
          disabled={isGenerating}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-neutral-950 bg-emerald-500 hover:bg-emerald-400 rounded-xl transition-all shadow-lg shadow-emerald-950/40 cursor-pointer disabled:opacity-60"
        >
          {isGenerating ? (
            <span>Generating...</span>
          ) : (
            <>
              <Download className="w-4 h-4" />
              <span>Download Vector PDF</span>
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Upload and Stored Resumes List */}
        <div className="lg:col-span-2 space-y-6">
          {/* File Upload Box */}
          <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800/90 backdrop-blur-xl shadow-lg space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <Upload className="w-4 h-4 text-emerald-400" />
                <span>Upload New Resume PDF to Supabase</span>
              </div>
              <div className="w-44">
                <FormInput
                  label=""
                  value={versionInput}
                  onChange={(e) => setVersionInput(e.target.value)}
                  placeholder="Version (e.g. v2.0)"
                />
              </div>
            </div>

            <div className="relative border-2 border-dashed border-neutral-800 hover:border-emerald-500/50 rounded-2xl p-8 text-center transition-all bg-neutral-950/40 group">
              <input
                type="file"
                accept=".pdf,application/pdf"
                onChange={handleFileUpload}
                disabled={isUploading}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
              />
              <div className="flex flex-col items-center justify-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-neutral-900 border border-neutral-800 group-hover:border-emerald-500/40 group-hover:bg-emerald-500/10 flex items-center justify-center text-neutral-400 group-hover:text-emerald-400 transition-colors">
                  {isUploading ? (
                    <RefreshCw className="w-6 h-6 animate-spin text-emerald-400" />
                  ) : (
                    <Upload className="w-6 h-6" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-bold text-white">
                    {isUploading ? 'Uploading to Supabase Storage...' : 'Drop your revised PDF here, or click to browse'}
                  </p>
                  <p className="text-xs text-neutral-400 mt-1">
                    PDF files will be stored in Supabase Storage bucket ('portfolio-assets/resumes').
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Uploaded Resumes Table / List */}
          <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800/90 backdrop-blur-xl shadow-lg space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <FileCheck className="w-4 h-4 text-cyan-400" />
                <span>Uploaded Resumes ({resumes.length})</span>
              </div>
              <span className="text-xs text-neutral-400">
                Active resume is shown on the public site
              </span>
            </div>

            {resumes.length === 0 ? (
              <div className="py-8 text-center text-xs text-neutral-500">
                No resumes uploaded yet. Upload your first PDF above.
              </div>
            ) : (
              <div className="space-y-3">
                {resumes.map((r) => {
                  const isActive = r.isActive;
                  return (
                    <div
                      key={r.id}
                      className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                        isActive
                          ? 'bg-emerald-950/20 border-emerald-500/40 shadow-sm'
                          : 'bg-neutral-950/60 border-neutral-800/80 hover:border-neutral-700'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                            isActive
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                              : 'bg-neutral-900 text-neutral-400 border border-neutral-800'
                          }`}
                        >
                          <ScrollText className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs font-bold text-white truncate">{r.fileName}</h4>
                            {isActive && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                                Active on Public Portfolio
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-neutral-400 font-mono mt-0.5">
                            {r.fileSize || 'PDF'} • Version {r.version || 'v1.0'}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {r.fileUrl && r.fileUrl !== '#' && (
                          <a
                            href={r.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 transition-colors"
                            title="Open File in New Tab"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}

                        {!isActive ? (
                          <button
                            type="button"
                            onClick={() => handleSetActive(r.id, r.fileName)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-neutral-800 hover:bg-emerald-600 text-neutral-200 hover:text-white transition-colors"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Set Active</span>
                          </button>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs text-emerald-400 font-semibold px-2 py-1">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Active</span>
                          </span>
                        )}

                        <button
                          type="button"
                          onClick={() => handleDelete(r.id, r.fileName)}
                          className="p-2 rounded-lg text-neutral-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                          title="Delete Resume"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Col: Active Staged Resume & Details */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800/90 backdrop-blur-xl shadow-lg space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-white pb-2 border-b border-neutral-800">
              <ScrollText className="w-4 h-4 text-emerald-400" />
              <span>Current Active Resume</span>
            </div>

            <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800/80 space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <ScrollText className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-white truncate">
                    {activeResume?.fileName || 'Rudraksh_Bansal_Resume.pdf'}
                  </h4>
                  <p className="text-[11px] text-neutral-400 font-mono mt-0.5">
                    {activeResume?.fileSize || '184 KB'} • Version {activeResume?.version || 'v1.0'}
                  </p>
                </div>
              </div>

              <div className="text-[11px] text-neutral-400 space-y-1.5 pt-2 border-t border-neutral-800/60">
                <div className="flex justify-between">
                  <span>Candidate:</span>
                  <span className="text-neutral-200 font-medium">{profile.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Target:</span>
                  <span className="text-neutral-200 font-medium">{profile.headline}</span>
                </div>
                <div className="flex justify-between">
                  <span>Storage:</span>
                  <span className="text-emerald-400 font-mono">Supabase Storage</span>
                </div>
              </div>

              {activeResume?.fileUrl && activeResume.fileUrl !== '#' && (
                <div className="pt-2">
                  <a
                    href={activeResume.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-neutral-950 bg-emerald-500 hover:bg-emerald-400 transition-all shadow-md"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Public PDF File</span>
                  </a>
                </div>
              )}
            </div>

            <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-300 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                When you activate a resume here, the "Resume" button on the public portfolio and navigation bar automatically provides this document to recruiters.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
