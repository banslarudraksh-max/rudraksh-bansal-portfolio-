import React, { useState, useEffect } from 'react';
import { Share2, Save, ExternalLink, Github, Linkedin, Mail, Twitter, Code2, RefreshCw } from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';
import { useToast } from '../context/ToastContext';
import { FormInput } from '../components/FormControls';

export const SocialLinksPage: React.FC = () => {
  const { socialLinks, updateSocialLinks } = useAdminData();
  const { success, info, error } = useToast();

  const [formData, setFormData] = useState({ ...socialLinks });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setFormData({ ...socialLinks });
  }, [socialLinks]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await updateSocialLinks(formData);
      if (res.success) {
        success('Links Updated', 'Developer profiles & social links saved to Supabase.');
      } else {
        error('Notice', res.error || 'Saved changes locally.');
      }
    } catch (err: unknown) {
      error('Save Error', err instanceof Error ? err.message : 'Failed to save');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTestLink = (url?: string) => {
    if (!url || url === '#') {
      info('Notice', 'No valid link provided.');
      return;
    }
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Social & Developer Links</h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            Configure external profiles, competitive programming profiles, and developer networks.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 px-5 py-2 text-xs font-bold text-neutral-950 bg-emerald-500 hover:bg-emerald-400 rounded-xl transition-all shadow-lg shadow-emerald-950/40 cursor-pointer disabled:opacity-60"
        >
          {isSubmitting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>{isSubmitting ? 'Saving...' : 'Save Changes'}</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Primary Platforms */}
        <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800/90 backdrop-blur-xl shadow-lg space-y-5">
          <div className="flex items-center gap-2 text-sm font-bold text-white pb-3 border-b border-neutral-800">
            <Share2 className="w-4 h-4 text-emerald-400" />
            <span>Primary Developer & Career Profiles</span>
          </div>

          {/* GitHub */}
          <div className="space-y-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                label="GitHub Profile URL"
                value={formData.github}
                onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                placeholder="https://github.com/banslarudraksh-max"
                leftIcon={<Github className="w-4 h-4" />}
                required
              />
              <FormInput
                label="GitHub Display Label"
                value={formData.githubDisplay}
                onChange={(e) => setFormData({ ...formData, githubDisplay: e.target.value })}
                placeholder="https://github.com/banslarudraksh-max"
                required
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => handleTestLink(formData.github)}
                className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:underline pt-1"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Test GitHub Link</span>
              </button>
            </div>
          </div>

          {/* LinkedIn */}
          <div className="space-y-2 pt-2 border-t border-neutral-800/60">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                label="LinkedIn Profile URL"
                value={formData.linkedin}
                onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                placeholder="https://www.linkedin.com/in/rudraksh-bansal-..."
                leftIcon={<Linkedin className="w-4 h-4" />}
                required
              />
              <FormInput
                label="LinkedIn Display Label"
                value={formData.linkedinDisplay}
                onChange={(e) => setFormData({ ...formData, linkedinDisplay: e.target.value })}
                placeholder="linkedin.com/in/rudraksh-bansal"
                required
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => handleTestLink(formData.linkedin)}
                className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:underline pt-1"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Test LinkedIn Link</span>
              </button>
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2 pt-2 border-t border-neutral-800/60">
            <FormInput
              label="Primary Contact Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="bansalrudrakshkumar@gmail.com"
              leftIcon={<Mail className="w-4 h-4" />}
              required
            />
          </div>
        </div>

        {/* Coding Platforms */}
        <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800/90 backdrop-blur-xl shadow-lg space-y-5">
          <div className="flex items-center gap-2 text-sm font-bold text-white pb-3 border-b border-neutral-800">
            <Code2 className="w-4 h-4 text-cyan-400" />
            <span>Competitive Programming & Community Accounts</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormInput
              label="LeetCode Profile"
              value={formData.leetcode || ''}
              onChange={(e) => setFormData({ ...formData, leetcode: e.target.value })}
              placeholder="https://leetcode.com/banslarudraksh"
            />
            <FormInput
              label="Codeforces Profile"
              value={formData.codeforces || ''}
              onChange={(e) => setFormData({ ...formData, codeforces: e.target.value })}
              placeholder="https://codeforces.com/profile/..."
            />
            <FormInput
              label="Twitter / X Profile"
              value={formData.twitter || ''}
              onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
              placeholder="https://twitter.com/..."
            />
          </div>
        </div>
      </form>
    </div>
  );
};
