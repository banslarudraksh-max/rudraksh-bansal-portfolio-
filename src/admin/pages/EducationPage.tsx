import React, { useState } from 'react';
import { GraduationCap, Save, Plus, X, BookOpen } from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';
import { useToast } from '../context/ToastContext';
import { FormInput, FormTextarea, FormChipsInput } from '../components/FormControls';
import { EducationMilestone } from '../../types';

export const EducationPage: React.FC = () => {
  const { education, updateEducation } = useAdminData();
  const { success } = useToast();

  const [formData, setFormData] = useState<EducationMilestone>({ ...education });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateEducation(formData);
    success('Education Saved', 'Academic milestone & coursework curriculum updated.');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Education & Coursework Management</h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            Manage degree credentials, university details, current semester, and academic coursework.
          </p>
        </div>

        <button
          type="button"
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
            <GraduationCap className="w-4 h-4 text-emerald-400" />
            <span>Academic Institution & Degree</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FormInput
              label="Degree Title"
              value={formData.degree}
              onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
              placeholder="e.g. Bachelor of Technology (B.Tech)"
              required
            />
            <FormInput
              label="Specialization / Branch"
              value={formData.specialization}
              onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
              placeholder="e.g. Computer Science & Engineering (AI-ML)"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <FormInput
              label="Institution / University"
              value={formData.institution}
              onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
              placeholder="e.g. Dr. A.P.J. Abdul Kalam Technical University (AKTU)"
              required
            />
            <FormInput
              label="Current Academic Semester"
              value={formData.currentSemester}
              onChange={(e) => setFormData({ ...formData, currentSemester: e.target.value })}
              placeholder="e.g. 3rd Semester (Current)"
              required
            />
            <FormInput
              label="Academic Period"
              value={formData.period}
              onChange={(e) => setFormData({ ...formData, period: e.target.value })}
              placeholder="e.g. 2024 – 2028"
              required
            />
          </div>

          <FormTextarea
            label="Curriculum & Journey Overview"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
            placeholder="Summarize academic focus, algorithmic training, and core computer science studies."
            required
          />

          <FormChipsInput
            label="Relevant Coursework Subjects (Press Enter to add)"
            chips={formData.coursework}
            onChange={(chips) => setFormData({ ...formData, coursework: chips })}
            placeholder="e.g. Data Structures, Discrete Mathematics, Python OOP"
            helperText="Appears as interactive subject badges in the public education milestone view."
          />
        </div>
      </form>
    </div>
  );
};
