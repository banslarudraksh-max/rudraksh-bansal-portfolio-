import React, { useState } from 'react';
import { Mail, Save, Clock, MapPin, MessageSquare, Globe } from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';
import { useToast } from '../context/ToastContext';
import { FormInput, FormSelect } from '../components/FormControls';

export const ContactPage: React.FC = () => {
  const { contactInfo, updateContactInfo } = useAdminData();
  const { success } = useToast();

  const [formData, setFormData] = useState({ ...contactInfo });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateContactInfo(formData);
    success('Contact Info Saved', 'Public communication parameters updated.');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Contact Information</h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            Configure direct contact channels, availability guarantees, and geographic timezone.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-5 py-2 text-xs font-bold text-neutral-950 bg-emerald-500 hover:bg-emerald-400 rounded-xl transition-all shadow-lg shadow-emerald-950/40 cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800/90 backdrop-blur-xl shadow-lg space-y-5">
          <div className="flex items-center gap-2 text-sm font-bold text-white pb-3 border-b border-neutral-800">
            <Mail className="w-4 h-4 text-emerald-400" />
            <span>Direct Channels & Geographic Availability</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FormInput
              label="Contact Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="e.g. bansalrudrakshkumar@gmail.com"
              leftIcon={<Mail className="w-4 h-4" />}
              required
            />
            <FormInput
              label="Location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="e.g. Uttar Pradesh, India"
              leftIcon={<MapPin className="w-4 h-4" />}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <FormInput
              label="Timezone"
              value={formData.timeZone}
              onChange={(e) => setFormData({ ...formData, timeZone: e.target.value })}
              placeholder="e.g. IST (UTC +5:30)"
              leftIcon={<Globe className="w-4 h-4" />}
              required
            />
            <FormInput
              label="Typical Response Time"
              value={formData.responseTime}
              onChange={(e) => setFormData({ ...formData, responseTime: e.target.value })}
              placeholder="e.g. < 24 Hours"
              leftIcon={<Clock className="w-4 h-4" />}
              required
            />
            <FormInput
              label="Preferred Contact Method"
              value={formData.preferredContactMethod}
              onChange={(e) => setFormData({ ...formData, preferredContactMethod: e.target.value })}
              placeholder="e.g. Email & LinkedIn"
              leftIcon={<MessageSquare className="w-4 h-4" />}
              required
            />
          </div>

          <FormInput
            label="Current Public Status Pill"
            value={formData.availability}
            onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
            placeholder="e.g. Open to AI & Web Development Internships"
            helperText="Appears on the contact card in the public portfolio."
            required
          />
        </div>
      </form>
    </div>
  );
};
