import React, { useState, useEffect } from 'react';
import { GraduationCap, Save, Plus, Trash2, Edit, BookOpen, RefreshCw } from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';
import { useToast } from '../context/ToastContext';
import { FormInput, FormTextarea, FormChipsInput } from '../components/FormControls';
import { Modal } from '../components/Modal';
import { ConfirmationDialog } from '../components/ConfirmationDialog';
import { EducationMilestone } from '../../types';

export const EducationPage: React.FC = () => {
  const {
    education,
    updateEducation,
    educationList,
    addEducation,
    deleteEducation,
  } = useAdminData();
  const { success, error, info } = useToast();

  const [formData, setFormData] = useState<EducationMilestone>({ ...education });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Secondary modal for adding extra education entry
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [newDegree, setNewDegree] = useState<Omit<EducationMilestone, 'id'>>({
    institution: '',
    degree: '',
    specialization: '',
    period: '',
    currentSemester: '',
    description: '',
    coursework: [],
    displayOrder: (educationList?.length || 1) + 1,
  });

  useEffect(() => {
    setFormData({ ...education });
  }, [education]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await updateEducation(formData);
      if (res.success) {
        success('Education Saved', 'Academic credentials & coursework saved to Supabase.');
      } else {
        error('Notice', res.error || 'Saved changes locally.');
      }
    } catch (err: unknown) {
      error('Error', err instanceof Error ? err.message : 'Failed to save');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddDegree = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDegree.institution.trim() || !newDegree.degree.trim()) return;

    try {
      const res = await addEducation(newDegree);
      if (res.success) {
        success('Degree Added', `Added "${newDegree.degree}" to academic records in Supabase.`);
        setIsAddModalOpen(false);
        setNewDegree({
          institution: '',
          degree: '',
          specialization: '',
          period: '',
          currentSemester: '',
          description: '',
          coursework: [],
          displayOrder: (educationList?.length || 1) + 2,
        });
      } else {
        error('Error', res.error || 'Failed to add education record');
      }
    } catch (err: unknown) {
      error('Error', err instanceof Error ? err.message : 'Error adding degree');
    }
  };

  const handleDeleteDegree = async () => {
    if (!deleteConfirmId) return;
    try {
      const res = await deleteEducation(deleteConfirmId);
      if (res.success) {
        info('Record Removed', 'Education entry deleted from Supabase.');
      } else {
        error('Delete Error', res.error || 'Failed to delete record');
      }
    } catch (err: unknown) {
      error('Delete Error', err instanceof Error ? err.message : 'Error deleting');
    } finally {
      setDeleteConfirmId(null);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Education & Coursework Management</h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            Manage degree credentials, university details, current semester, and academic coursework (public.education).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-700/80 rounded-xl transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-emerald-400" />
            <span>Add Additional Degree</span>
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-5 py-2 text-xs font-bold text-neutral-950 bg-emerald-500 hover:bg-emerald-400 rounded-xl transition-all shadow-lg shadow-emerald-950/40 cursor-pointer disabled:opacity-60"
          >
            {isSubmitting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>{isSubmitting ? 'Saving...' : 'Save Primary Degree'}</span>
          </button>
        </div>
      </div>

      {/* Primary Degree Form */}
      <form onSubmit={handleSave} className="space-y-6">
        <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800/90 backdrop-blur-xl shadow-lg space-y-5">
          <div className="flex items-center gap-2 text-sm font-bold text-white pb-3 border-b border-neutral-800">
            <GraduationCap className="w-4 h-4 text-emerald-400" />
            <span>Primary Degree Displayed on Portfolio</span>
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

      {/* All Education Records List if multiple */}
      {educationList && educationList.length > 1 && (
        <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800/90 backdrop-blur-xl shadow-lg space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
            <div className="flex items-center gap-2 text-sm font-bold text-white">
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span>All Stored Education Records ({educationList.length})</span>
            </div>
          </div>

          <div className="space-y-3">
            {educationList.map((edu) => (
              <div
                key={edu.id}
                className="p-4 rounded-xl bg-neutral-950/70 border border-neutral-800 flex items-center justify-between gap-4"
              >
                <div>
                  <h4 className="text-sm font-bold text-white">{edu.degree}</h4>
                  <p className="text-xs text-neutral-400">
                    {edu.institution} • <span className="font-mono text-emerald-400">{edu.period}</span>
                  </p>
                  {edu.specialization && (
                    <span className="text-[11px] text-cyan-400 font-mono">{edu.specialization}</span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...edu })}
                    className="px-3 py-1 text-xs font-semibold text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 rounded-lg transition-colors cursor-pointer"
                  >
                    Edit Primary
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleteConfirmId(edu.id)}
                    className="p-1.5 text-neutral-400 hover:text-rose-400 transition-colors cursor-pointer"
                    title="Delete Degree"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal for adding new education record */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Education Credential"
        subtitle="Add intermediate schooling, diploma, or additional degree to Supabase."
      >
        <form onSubmit={handleAddDegree} className="space-y-4">
          <FormInput
            label="Degree / Certificate Title"
            value={newDegree.degree}
            onChange={(e) => setNewDegree({ ...newDegree, degree: e.target.value })}
            placeholder="e.g. Senior Secondary School (Class XII)"
            required
          />
          <FormInput
            label="Institution / Board / University"
            value={newDegree.institution}
            onChange={(e) => setNewDegree({ ...newDegree, institution: e.target.value })}
            placeholder="e.g. Central Board of Secondary Education (CBSE)"
            required
          />
          <div className="grid grid-cols-2 gap-3">
            <FormInput
              label="Period / Year"
              value={newDegree.period}
              onChange={(e) => setNewDegree({ ...newDegree, period: e.target.value })}
              placeholder="e.g. 2022 – 2024"
              required
            />
            <FormInput
              label="Specialization / Stream"
              value={newDegree.specialization || ''}
              onChange={(e) => setNewDegree({ ...newDegree, specialization: e.target.value })}
              placeholder="e.g. Science (PCM & CS)"
            />
          </div>
          <FormTextarea
            label="Description"
            value={newDegree.description}
            onChange={(e) => setNewDegree({ ...newDegree, description: e.target.value })}
            rows={3}
            placeholder="Academic achievements, percentage/CGPA, and core highlights."
          />
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-800">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-neutral-300 hover:text-white bg-neutral-900 border border-neutral-800 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-neutral-950 bg-emerald-500 hover:bg-emerald-400 rounded-xl"
            >
              Add Degree
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete confirmation */}
      <ConfirmationDialog
        isOpen={!!deleteConfirmId}
        onClose={() => setDeleteConfirmId(null)}
        onConfirm={handleDeleteDegree}
        title="Delete Education Record"
        message="Are you sure you want to remove this education credential from Supabase?"
        confirmLabel="Delete"
      />
    </div>
  );
};
