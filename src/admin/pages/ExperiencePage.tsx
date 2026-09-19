import React, { useState } from 'react';
import { Briefcase, Plus, Edit, Trash2, MapPin, Calendar, CheckCircle2 } from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';
import { useToast } from '../context/ToastContext';
import { DataTable, ColumnDef } from '../components/DataTable';
import { Modal } from '../components/Modal';
import { ConfirmationDialog } from '../components/ConfirmationDialog';
import { FormInput, FormTextarea, FormSelect, FormChipsInput, FormToggle } from '../components/FormControls';
import { ExperienceItem } from '../types';

export const ExperiencePage: React.FC = () => {
  const { experiences, addExperience, updateExperience, deleteExperience } = useAdminData();
  const { success } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Omit<ExperienceItem, 'id'>>({
    title: '',
    company: '',
    location: 'Remote',
    period: '2024 – Present',
    type: 'Open Source',
    description: '',
    technologies: ['Python', 'React', 'Git'],
    isCurrent: true,
    order: 1,
  });

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      title: '',
      company: '',
      location: 'Remote',
      period: '2024 – Present',
      type: 'Open Source',
      description: '',
      technologies: ['Python', 'React', 'Git'],
      isCurrent: true,
      order: experiences.length + 1,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (exp: ExperienceItem) => {
    setEditingId(exp.id);
    setFormData({
      title: exp.title,
      company: exp.company,
      location: exp.location,
      period: exp.period,
      type: exp.type,
      description: exp.description,
      technologies: exp.technologies || [],
      isCurrent: exp.isCurrent,
      order: exp.order,
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.company.trim()) return;

    if (editingId) {
      updateExperience(editingId, formData);
      success('Experience Updated', `Updated "${formData.title}".`);
    } else {
      addExperience(formData);
      success('Experience Added', `Added "${formData.title}" to career milestones.`);
    }
    setIsModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (deleteConfirmId) {
      deleteExperience(deleteConfirmId);
      success('Experience Deleted', 'Milestone removed.');
      setDeleteConfirmId(null);
    }
  };

  const columns: ColumnDef<ExperienceItem>[] = [
    {
      key: 'title',
      header: 'Role & Organization',
      sortable: true,
      render: (item) => (
        <div>
          <span className="font-bold text-white text-xs block">{item.title}</span>
          <span className="text-[11px] text-neutral-400 font-medium">{item.company}</span>
        </div>
      ),
    },
    {
      key: 'type',
      header: 'Engagement Type',
      render: (item) => (
        <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-neutral-800 text-neutral-300 border border-neutral-700/60">
          {item.type}
        </span>
      ),
    },
    {
      key: 'period',
      header: 'Timeline',
      render: (item) => (
        <span className="text-xs font-mono text-neutral-300 flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-emerald-400" />
          {item.period}
        </span>
      ),
    },
    {
      key: 'location',
      header: 'Location',
      render: (item) => (
        <span className="text-xs text-neutral-400 flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 text-cyan-400" />
          {item.location}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Experience & Career Milestones</h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            Manage academic projects, open-source initiatives, and practical developer engagements.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-neutral-950 bg-emerald-500 hover:bg-emerald-400 rounded-xl transition-all shadow-lg shadow-emerald-950/40 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Experience</span>
        </button>
      </div>

      <DataTable
        data={experiences}
        columns={columns}
        keyExtractor={(e) => e.id}
        searchPlaceholder="Search experience records..."
        searchFilter={(item, q) =>
          item.title.toLowerCase().includes(q) ||
          item.company.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q)
        }
        renderActions={(item) => (
          <div className="flex items-center justify-end gap-1.5">
            <button
              onClick={() => handleOpenEdit(item)}
              className="p-1.5 text-neutral-400 hover:text-emerald-300 hover:bg-emerald-500/10 rounded-lg transition-colors"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => setDeleteConfirmId(item.id)}
              className="p-1.5 text-neutral-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      />

      {/* Add / Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? 'Edit Experience' : 'Add Experience'}
        subtitle="Specify organization, duration, engagement type, and key outcomes."
        maxWidth="2xl"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormInput
              label="Role / Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Open Source Contributor"
              required
            />
            <FormInput
              label="Company / Organization"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder="e.g. Independent Developer / Tech Club"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <FormInput
              label="Period / Duration"
              value={formData.period}
              onChange={(e) => setFormData({ ...formData, period: e.target.value })}
              placeholder="e.g. 2024 – Present"
              required
            />
            <FormInput
              label="Location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="e.g. Remote / Uttar Pradesh"
              required
            />
            <FormSelect
              label="Engagement Type"
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value as ExperienceItem['type'] })
              }
              options={[
                { label: 'Open Source', value: 'Open Source' },
                { label: 'Internship', value: 'Internship' },
                { label: 'Full-time', value: 'Full-time' },
                { label: 'Part-time', value: 'Part-time' },
                { label: 'Contract', value: 'Contract' },
              ]}
            />
          </div>

          <FormTextarea
            label="Key Responsibilities & Outcomes"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
            placeholder="Outline accomplishments, software systems built, and technologies used."
            required
          />

          <FormChipsInput
            label="Technologies Used"
            chips={formData.technologies}
            onChange={(chips) => setFormData({ ...formData, technologies: chips })}
            placeholder="e.g. Python, Tkinter, React"
          />

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-800">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-neutral-300 hover:text-white bg-neutral-900 border border-neutral-800 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-neutral-950 bg-emerald-500 hover:bg-emerald-400 rounded-xl transition-all shadow-lg shadow-emerald-950/40"
            >
              Save Experience
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmationDialog
        isOpen={!!deleteConfirmId}
        onClose={() => setDeleteConfirmId(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Milestone"
        message="Are you sure you want to remove this experience item?"
      />
    </div>
  );
};
