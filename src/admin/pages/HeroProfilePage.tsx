import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Save,
  Upload,
  RefreshCw,
  Image as ImageIcon,
  Trash2,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Eye,
  User,
  Tag,
  Type,
  FileText,
  ShieldCheck,
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { portfolioService } from '../../lib/portfolioService';
import { useAdminData } from '../context/AdminDataContext';
import { useToast } from '../context/ToastContext';
import { FormInput, FormTextarea, FormToggle } from '../components/FormControls';
import { HeroProfileRecord } from '../types';

export const HeroProfilePage: React.FC = () => {
  const { heroProfile, updateHeroProfile, uploadHeroImage } = useAdminData();
  const { success, error, info } = useToast();

  const [formData, setFormData] = useState<HeroProfileRecord>({ ...heroProfile });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [previewImageLocal, setPreviewImageLocal] = useState<string | null>(null);

  useEffect(() => {
    setFormData({ ...heroProfile });
  }, [heroProfile]);

  const handleFieldChange = <K extends keyof HeroProfileRecord>(field: K, value: HeroProfileRecord[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // AUTH:
    // Before upload:
    // const { data: { session }, error } = await supabase.auth.getSession();
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (!session || sessionError) {
      error('Authentication Error', 'Admin session expired. Please login again.');
      e.target.value = '';
      return;
    }

    // Show instant local preview while uploading
    const localUrl = URL.createObjectURL(file);
    setPreviewImageLocal(localUrl);
    setIsUploadingImage(true);

    try {
      // Perform Storage upload & DB update
      const res = await uploadHeroImage(file);
      if (res.success && res.url) {
        setFormData((prev) => ({
          ...prev,
          image_url: res.url!,
          image_alt: prev.image_alt || `${prev.name} - Professional Portrait`,
        }));
        setPreviewImageLocal(null);
        success('Hero Image Uploaded', 'Stored in bucket portfolio-assets and committed to hero_profile.');
      } else {
        console.error('HERO UPLOAD error:', res);
        let errorTitle = 'Upload Failed';
        if (res.stage === 'storage_upload') {
          errorTitle = 'Storage Upload Error';
        } else if (res.stage === 'hero_profile_update') {
          errorTitle = 'Database Update Error';
        } else if (res.stage === 'auth') {
          errorTitle = 'Authentication Error';
        }

        error(errorTitle, res.error || 'Failed to complete hero image upload.');
        setPreviewImageLocal(null);
      }
    } catch (err: unknown) {
      console.error('Hero image upload exception:', err);
      const errObj = err as any;
      const formattedErr = [
        errObj?.message || 'Error uploading image',
        errObj?.code ? `Code: ${errObj.code}` : null,
        errObj?.details ? `Details: ${errObj.details}` : null,
        errObj?.hint ? `Hint: ${errObj.hint}` : null,
      ].filter(Boolean).join(' | ');
      error('Storage Upload Exception', formattedErr);
      setPreviewImageLocal(null);
    } finally {
      setIsUploadingImage(false);
      e.target.value = '';
    }
  };

  const handleRemoveImage = () => {
    setPreviewImageLocal(null);
    setFormData((prev) => ({ ...prev, image_url: null }));
    info('Image Removed', 'Hero image cleared. Click Save Changes to commit to Supabase.');
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    // AUTH: Before save
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (!session || sessionError) {
      error('Authentication Error', 'Admin session expired. Please login again.');
      return;
    }

    setIsSubmitting(true);
    try {
      // 4. When saving text/content, use update on the existing hero_profile row:
      //    Store its id: 7a6ee60a-1659-4633-996e-99b50dd561f0
      // 5. NEVER use: .insert(...)
      // 6. NEVER use: .upsert(...)
      const targetId = '7a6ee60a-1659-4633-996e-99b50dd561f0';

      const res = await updateHeroProfile({
        id: targetId,
        name: formData.name,
        badge: formData.badge,
        headline: formData.headline,
        description: formData.description,
        image_url: formData.image_url,
        image_alt: formData.image_alt,
        is_active: formData.is_active,
      });

      if (res.success) {
        success('Hero Profile Saved', 'Updated data committed directly to public.hero_profile in Supabase.');
      } else {
        console.error('Supabase error saving hero profile:', res.error);
        error('Database Update Error', res.error || 'Failed to save hero profile to Supabase.');
      }
    } catch (err: unknown) {
      console.error('Exception while saving hero profile:', err);
      const errObj = err as any;
      const formattedErr = [
        errObj?.message || 'An error occurred while saving.',
        errObj?.code ? `Code: ${errObj.code}` : null,
        errObj?.details ? `Details: ${errObj.details}` : null,
        errObj?.hint ? `Hint: ${errObj.hint}` : null,
      ].filter(Boolean).join(' | ');
      error('Database Update Exception', formattedErr);
    } finally {
      setIsSubmitting(false);
    }
  };

  const displayImage = previewImageLocal || formData.image_url;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-xl font-bold text-white tracking-tight">Hero Profile CMS</h2>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              public.hero_profile
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span>Admin Session Active</span>
            </span>
          </div>
          <p className="text-xs text-neutral-400 mt-0.5">
            Manage your headline, status badge, description, and large professional hero portrait with live Supabase storage.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <a
            href="/#hero"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-neutral-300 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-xl transition-all"
          >
            <Eye className="w-3.5 h-3.5 text-neutral-400" />
            <span>View Live Site</span>
          </a>

          <button
            onClick={handleSave}
            disabled={isSubmitting || isUploadingImage}
            className="inline-flex items-center gap-2 px-5 py-2 text-xs font-bold text-neutral-950 bg-emerald-500 hover:bg-emerald-400 rounded-xl transition-all shadow-lg shadow-emerald-950/40 cursor-pointer disabled:opacity-60"
          >
            {isSubmitting ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span>{isSubmitting ? 'Saving to Supabase...' : 'Save Changes'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Left Edit Controls & Right Live Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Form Fields */}
        <form onSubmit={handleSave} className="lg:col-span-7 space-y-6">
          {/* Status & Active Toggle Card */}
          <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800/90 backdrop-blur-xl shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                  Profile Status
                </span>
                <p className="text-xs text-neutral-300 font-medium mt-0.5">
                  Enable or disable this Hero Profile row on the public portfolio
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                    formData.is_active
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}
                >
                  {formData.is_active ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Active</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Disabled</span>
                    </>
                  )}
                </span>

                <FormToggle
                  label=""
                  checked={formData.is_active}
                  onChange={(checked) => handleFieldChange('is_active', checked)}
                />
              </div>
            </div>
          </div>

          {/* Text Content Card */}
          <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800/90 backdrop-blur-xl shadow-lg space-y-5">
            <div className="flex items-center gap-2 text-sm font-bold text-white pb-3 border-b border-neutral-800">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Hero Text Content & Identity</span>
            </div>

            <div className="space-y-4">
              <FormInput
                label="Full Name"
                value={formData.name}
                onChange={(e) => handleFieldChange('name', e.target.value)}
                placeholder="Rudraksh Bansal"
                leftIcon={<User className="w-4 h-4" />}
                required
              />

              <div>
                <FormInput
                  label="Status Badge"
                  value={formData.badge}
                  onChange={(e) => handleFieldChange('badge', e.target.value)}
                  placeholder="Available for Internships"
                  leftIcon={<Tag className="w-4 h-4" />}
                  required
                />
                <div className="flex flex-wrap gap-1.5 mt-2">
                  <span className="text-[10px] text-neutral-500 self-center">Presets:</span>
                  {[
                    'Available for Internships',
                    'Open to SDE & AI Roles',
                    'B.Tech CSE (AI-ML) Student',
                    'Seeking Summer 2025 Internship',
                  ].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => handleFieldChange('badge', preset)}
                      className="px-2 py-0.5 rounded text-[11px] font-mono bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors cursor-pointer"
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              <FormInput
                label="Headline (Role / Specialty)"
                value={formData.headline}
                onChange={(e) => handleFieldChange('headline', e.target.value)}
                placeholder="B.Tech CSE Student & Aspiring Software Developer"
                leftIcon={<Type className="w-4 h-4" />}
                required
              />

              <FormTextarea
                label="Hero Description (Mission Statement)"
                value={formData.description}
                onChange={(e) => handleFieldChange('description', e.target.value)}
                rows={4}
                placeholder="Building practical solutions with code, creativity and emerging AI technologies..."
                required
              />
            </div>
          </div>

          {/* Hero Image Management Card */}
          <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800/90 backdrop-blur-xl shadow-lg space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <ImageIcon className="w-4 h-4 text-emerald-400" />
                <span>Hero Portrait Image</span>
              </div>
              <span className="text-[11px] font-mono text-neutral-400">
                Bucket: <strong className="text-emerald-400">portfolio-assets</strong>
              </span>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                {/* Image Thumbnail Preview */}
                <div className="w-28 h-36 rounded-2xl bg-neutral-950 border border-neutral-800 overflow-hidden relative group shrink-0 flex items-center justify-center">
                  {displayImage ? (
                    <img
                      src={displayImage}
                      alt={formData.image_alt || 'Hero portrait preview'}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-neutral-600 p-2 text-center">
                      <ImageIcon className="w-8 h-8 mb-1" />
                      <span className="text-[10px] font-mono">No Image</span>
                    </div>
                  )}

                  {isUploadingImage && (
                    <div className="absolute inset-0 bg-neutral-950/80 flex flex-col items-center justify-center gap-1">
                      <RefreshCw className="w-5 h-5 text-emerald-400 animate-spin" />
                      <span className="text-[10px] text-emerald-300 font-mono">Uploading...</span>
                    </div>
                  )}
                </div>

                {/* Upload Controls */}
                <div className="flex-1 space-y-3 w-full">
                  <p className="text-xs text-neutral-400">
                    Upload a high-resolution professional portrait or developer photo. It will be uploaded to Supabase Storage and stored at{' '}
                    <code className="text-emerald-400 font-mono text-[11px]">public.hero_profile.image_url</code>.
                  </p>

                  <div className="flex flex-wrap items-center gap-2.5">
                    <label className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-neutral-950 shadow-md shadow-emerald-950/30 transition-all cursor-pointer">
                      <Upload className="w-4 h-4" />
                      <span>{displayImage ? 'Replace Image' : 'Upload Hero Portrait'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageFileSelect}
                        disabled={isUploadingImage}
                        className="hidden"
                      />
                    </label>

                    {displayImage && (
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-neutral-900 hover:bg-neutral-800 text-rose-400 border border-neutral-800 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove Image</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <FormInput
                  label="Direct Image Public URL (Optional)"
                  value={formData.image_url || ''}
                  onChange={(e) => handleFieldChange('image_url', e.target.value.trim() || null)}
                  placeholder="https://.../portfolio-assets/hero/photo.jpg"
                />
                <FormInput
                  label="Image Alt Text"
                  value={formData.image_alt || ''}
                  onChange={(e) => handleFieldChange('image_alt', e.target.value)}
                  placeholder="Rudraksh Bansal - Professional Developer Profile"
                />
              </div>
            </div>
          </div>
        </form>

        {/* Right Column: Live Interactive Preview */}
        <div className="lg:col-span-5 space-y-4">
          <div className="sticky top-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                Live Public Hero Preview
              </span>
              <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Instant Visual Simulation
              </span>
            </div>

            {/* Simulated Hero Section Card */}
            <div className="p-6 rounded-3xl bg-neutral-950 border border-neutral-800 shadow-2xl relative overflow-hidden space-y-6">
              {/* Background ambient glow */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900/90 border border-neutral-800 text-xs text-neutral-300">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="font-mono text-xs">{formData.badge || 'Available for Internships'}</span>
              </div>

              {/* Name & Headline */}
              <div>
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  Hi, I'm{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200">
                    {formData.name || 'Rudraksh Bansal'}
                  </span>
                </h3>
                <p className="text-sm font-medium text-neutral-300 mt-1">
                  {formData.headline || 'B.Tech CSE Student & Aspiring Software Developer'}
                </p>
                <p className="text-xs text-neutral-400 mt-2 line-clamp-3 leading-relaxed">
                  {formData.description || 'Building practical solutions with code, creativity and emerging AI technologies.'}
                </p>
              </div>

              {/* Right Side Image Simulation */}
              <div className="pt-2">
                <span className="block text-[11px] font-mono text-neutral-500 uppercase tracking-wider mb-2">
                  Right-Side Hero Portrait:
                </span>

                <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden border border-neutral-800/90 bg-neutral-900/70 shadow-xl group">
                  {displayImage ? (
                    <>
                      <img
                        src={displayImage}
                        alt={formData.image_alt || 'Hero portrait preview'}
                        className="w-full h-full object-cover object-top"
                      />
                      {/* Futuristic overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-transparent to-transparent pointer-events-none" />

                      {/* Floating tech badge */}
                      <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-neutral-900/90 border border-neutral-800/80 backdrop-blur-md flex items-center justify-between text-[11px] font-mono text-neutral-200">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                          <span className="truncate">{formData.name}</span>
                        </div>
                        <span className="text-[10px] text-emerald-400">LIVE HERO</span>
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center space-y-3 bg-gradient-to-br from-neutral-900/80 to-neutral-950">
                      <div className="w-16 h-16 rounded-2xl bg-neutral-800/80 border border-neutral-700/80 flex items-center justify-center text-emerald-400 shadow-inner">
                        <User className="w-8 h-8" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white">Fallback Placeholder Active</p>
                        <p className="text-[11px] text-neutral-400 mt-0.5">
                          Since image_url is NULL, public site displays futuristic developer silhouette card.
                        </p>
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        Zero Layout Breakage
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Database status footnote */}
              <div className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800/80 text-[11px] font-mono text-neutral-400 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Target: public.hero_profile ({formData.is_active ? 'Active' : 'Disabled'})</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
