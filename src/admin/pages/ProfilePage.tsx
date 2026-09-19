import React, { useState } from 'react';
import {
  User,
  Save,
  RotateCcw,
  Check,
  Image as ImageIcon,
  MapPin,
  GraduationCap,
  Briefcase,
  Upload,
  RefreshCw,
  FileText,
} from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';
import { useToast } from '../context/ToastContext';
import { FormInput, FormTextarea } from '../components/FormControls';
import { ProfileDataAdmin } from '../types';

export const ProfilePage: React.FC = () => {
  const { profile, updateProfile, uploadAsset } = useAdminData();
  const { success, info, error } = useToast();

  const [formData, setFormData] = useState<ProfileDataAdmin>({ ...profile });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);

  const handleChange = (field: keyof ProfileDataAdmin, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingAvatar(true);
    try {
      const res = await uploadAsset(file, 'avatars');
      if (res.success && res.url) {
        setFormData((prev) => ({ ...prev, avatarUrl: res.url }));
        success('Avatar Uploaded', 'New profile image uploaded to Supabase Storage.');
      } else {
        error('Upload Failed', res.error || 'Failed to upload image.');
      }
    } catch (err: unknown) {
      error('Upload Error', err instanceof Error ? err.message : 'Error uploading');
    } finally {
      setIsUploadingAvatar(false);
      e.target.value = '';
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await updateProfile(formData);
      if (res.success) {
        success('Profile Updated', 'Portfolio profile changes saved to Supabase database.');
      } else {
        error('Notice', res.error || 'Saved changes locally. Run SQL schema in Supabase if table not yet created.');
      }
    } catch (err: unknown) {
      error('Save Error', err instanceof Error ? err.message : 'Failed to save');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFormData({ ...profile });
    info('Changes Reverted', 'Profile form reset to last saved state.');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Profile Management</h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            Configure primary identity, academic background, and career status for public display.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 text-xs font-semibold text-neutral-300 hover:text-white bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-xl transition-all"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-neutral-950 bg-emerald-500 hover:bg-emerald-400 rounded-xl transition-all shadow-lg shadow-emerald-950/40 cursor-pointer disabled:opacity-60"
          >
            {isSubmitting ? (
              <span>Saving...</span>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Basic Identity & Headline */}
        <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800/90 backdrop-blur-xl shadow-lg space-y-5">
          <div className="flex items-center gap-2 text-sm font-bold text-white pb-3 border-b border-neutral-800">
            <User className="w-4 h-4 text-emerald-400" />
            <span>Primary Identity & Branding</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FormInput
              label="Full Name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="e.g. Rudraksh Bansal"
              required
            />
            <FormInput
              label="Professional Role"
              value={formData.role}
              onChange={(e) => handleChange('role', e.target.value)}
              placeholder="e.g. B.Tech CSE (AI-ML) Student"
              required
            />
          </div>

          <FormInput
            label="Professional Headline"
            value={formData.headline}
            onChange={(e) => handleChange('headline', e.target.value)}
            placeholder="e.g. Building practical solutions with code, creativity and emerging AI technologies."
            helperText="Appears as primary sub-heading in portfolio hero section."
            required
          />

          <FormTextarea
            label="Introduction & Biography"
            value={formData.introduction}
            onChange={(e) => handleChange('introduction', e.target.value)}
            rows={4}
            placeholder="Comprehensive summary of student background, passions, and core engineering philosophy."
            helperText="Used in the About section and metadata description."
            required
          />

          {/* Profile Image & Avatar */}
          <div className="p-4 rounded-xl bg-neutral-950/70 border border-neutral-800 space-y-3">
            <label className="block text-xs font-semibold text-neutral-300">
              Profile Image / Avatar
            </label>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center overflow-hidden shrink-0">
                {formData.avatarUrl ? (
                  <img src={formData.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-emerald-400 font-bold font-mono text-lg">
                    {formData.name.slice(0, 2).toUpperCase()}
                  </div>
                )}
              </div>
              <div className="flex-1 w-full space-y-2">
                <FormInput
                  label=""
                  value={formData.avatarUrl || ''}
                  onChange={(e) => handleChange('avatarUrl', e.target.value)}
                  placeholder="https://... or upload to Supabase Storage"
                  leftIcon={<ImageIcon className="w-4 h-4" />}
                />
                <div className="relative inline-block">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    disabled={isUploadingAvatar}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                  />
                  <button
                    type="button"
                    disabled={isUploadingAvatar}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-700"
                  >
                    {isUploadingAvatar ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-400" />
                    ) : (
                      <Upload className="w-3.5 h-3.5" />
                    )}
                    <span>{isUploadingAvatar ? 'Uploading...' : 'Upload Avatar to Supabase'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FormInput
              label="Location"
              value={formData.location}
              onChange={(e) => handleChange('location', e.target.value)}
              placeholder="e.g. Uttar Pradesh, India"
              leftIcon={<MapPin className="w-4 h-4" />}
              required
            />
            <FormInput
              label="Resume Direct URL"
              value={formData.resumeUrl || ''}
              onChange={(e) => handleChange('resumeUrl', e.target.value)}
              placeholder="https://... or auto-linked from active resume"
              leftIcon={<FileText className="w-4 h-4" />}
              helperText="Managed also via Resume management tab."
            />
          </div>
        </div>

        {/* Academic Details */}
        <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800/90 backdrop-blur-xl shadow-lg space-y-5">
          <div className="flex items-center gap-2 text-sm font-bold text-white pb-3 border-b border-neutral-800">
            <GraduationCap className="w-4 h-4 text-cyan-400" />
            <span>Academic Background</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FormInput
              label="Degree"
              value={formData.degree}
              onChange={(e) => handleChange('degree', e.target.value)}
              placeholder="e.g. B.Tech in Computer Science & Engineering"
              required
            />
            <FormInput
              label="University / Institution"
              value={formData.university}
              onChange={(e) => handleChange('university', e.target.value)}
              placeholder="e.g. Dr. A.P.J. Abdul Kalam Technical University (AKTU)"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FormInput
              label="Current Semester"
              value={formData.currentSemester}
              onChange={(e) => handleChange('currentSemester', e.target.value)}
              placeholder="e.g. 3rd Semester (Current)"
              required
            />
            <FormInput
              label="Specialization"
              value={formData.specialization}
              onChange={(e) => handleChange('specialization', e.target.value)}
              placeholder="e.g. Artificial Intelligence & Machine Learning (AI-ML)"
              required
            />
          </div>
        </div>

        {/* Career & Status */}
        <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800/90 backdrop-blur-xl shadow-lg space-y-5">
          <div className="flex items-center gap-2 text-sm font-bold text-white pb-3 border-b border-neutral-800">
            <Briefcase className="w-4 h-4 text-purple-400" />
            <span>Career Direction & Availability</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FormInput
              label="Career Direction"
              value={formData.careerDirection}
              onChange={(e) => handleChange('careerDirection', e.target.value)}
              placeholder="e.g. Software Engineering & AI Tools"
              required
            />
            <FormInput
              label="Availability Status"
              value={formData.availabilityStatus}
              onChange={(e) => handleChange('availabilityStatus', e.target.value)}
              placeholder="e.g. Open to AI & Web Development Internships"
              helperText="Displayed with an animated pulse badge across header & contact cards."
              required
            />
          </div>
        </div>

        {/* Action Buttons at bottom */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={handleCancel}
            className="px-5 py-2.5 text-xs font-semibold text-neutral-300 hover:text-white bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-xl transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold text-neutral-950 bg-emerald-500 hover:bg-emerald-400 rounded-xl transition-all shadow-lg shadow-emerald-950/40 cursor-pointer disabled:opacity-60"
          >
            <Save className="w-4 h-4" />
            <span>{isSubmitting ? 'Saving...' : 'Save Changes'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
