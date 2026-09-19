import React, { useState } from 'react';
import { Target, Plus, Edit, Trash2, CheckCircle2, Clock, Building2 } from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';
import { useToast } from '../context/ToastContext';
import { DataTable, ColumnDef } from '../components/DataTable';
import { Modal } from '../components/Modal';
import { ConfirmationDialog } from '../components/ConfirmationDialog';
import { FormInput, FormTextarea, FormSelect, FormChipsInput } from '../components/FormControls';
import { InternshipItem } from '../types';

export const InternshipsPage: React.FC = () => {
  const { internships, addInternship, updateInternship, deleteInternship } = useAdminData();
  const { success } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Omit<InternshipItem, 'id'>>({
    roleTitle: 'Software Engineering / AI Web Development Intern',
    targetCompanyType: 'Tech Startups & Fast-Growing Teams',
    status: 'Open to Offers',
    preferredDomain: 'Frontend / Full-Stack / Python & AI Tooling',
    period: 'Summer 2026 / Immediate',
    description: 'Looking to contribute clean code, learn from mentors, and build practical software products.',
    technologies: ['React', 'Python', 'TypeScript', 'Tailwind CSS'],
    notes: 'Available for both remote and in-office internship roles.',
  });

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      roleTitle: '',
      targetCompanyType: '',
      status: 'Open to Offers',
      preferredDomain: '',
      period: 'Summer 2026',
      description: '',
      technologies: ['React', 'Python'],
      notes: '',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: InternshipItem) => {
    setEditingId(item.id);
    setFormData({
      roleTitle: item.roleTitle,
      targetCompanyType: item.targetCompanyType,
      status: item.status,
      preferredDomain: item.preferredDomain,
      period: item.period,
      description: item.description,
      technologies: item.technologies || [],
      notes: item.notes || '',
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.roleTitle.trim()) return;

    if (editingId) {
      updateInternship(editingId, formData);
      success('Internship Updated', `Target role "${formData.roleTitle}" saved.`);
    } else {
      addInternship(formData);
      success('Internship Added', `New target role added.`);
    }
    setIsModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (deleteConfirmId) {
      deleteInternship(deleteConfirmId);
      success('Internship Removed', 'Target role removed.');
      setDeleteConfirmId(null);
    }
  };

  const columns: ColumnDef<InternshipItem>[] = [
    {
      key: 'roleTitle',
      header: 'Target Role',
      sortable: true,
      render: (item) => (
        <div>
          <span className="font-bold text-white text-xs block">{item.roleTitle}</span>
          <span className="text-[11px] text-neutral-400">{item.targetCompanyType}</span>
        </div>
      ),
    },
    {
      key: 'preferredDomain',
      header: 'Technical Domain',
      render: (item) => (
        <span className="text-xs font-mono text-cyan-300">{item.preferredDomain}</span>
      ),
    },
    {
      key: 'period',
      header: 'Availability',
      render: (item) => (
        <span className="text-xs font-mono text-neutral-300">{item.period}</span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (item) => (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          {item.status}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Internship Targets & Preferences</h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            Configure target internship roles, preferred technical domains, and recruiter availability details.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-neutral-950 bg-emerald-500 hover:bg-emerald-400 rounded-xl transition-all shadow-lg shadow-emerald-950/40 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Target Role</span>
        </button>
      </div>

      <DataTable
        data={internships}
        columns={columns}
        keyExtractor={(item) => item.id}
        searchPlaceholder="Search target roles or domains..."
        searchFilter={(item, q) =>
          item.roleTitle.toLowerCase().includes(q) ||
          item.preferredDomain.toLowerCase().includes(q) ||
          item.targetCompanyType.toLowerCase().includes(q)
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

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? 'Edit Internship Role' : 'Add Target Internship Role'}
        subtitle="Manage expectations, preferred technology stacks, and recruiter messaging."
        maxWidth="2xl"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormInput
              label="Target Role Title"
              value={formData.roleTitle}
              onChange={(e) => setFormData({ ...formData, roleTitle: e.target.value })}
              placeholder="e.g. Web Development Intern"
              required
            />
            <FormInput
              label="Target Company / Team Type"
              value={formData.targetCompanyType}
              onChange={(e) => setFormData({ ...formData, targetCompanyType: e.target.value })}
              placeholder="e.g. Tech Startups, Innovation Labs"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormInput
              label="Preferred Technical Domain"
              value={formData.preferredDomain}
              onChange={(e) => setFormData({ ...formData, preferredDomain: e.target.value })}
              placeholder="e.g. Frontend Engineering, AI Scripting"
              required
            />
            <FormSelect
              label="Status"
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value as InternshipItem['status'] })
              }
              options={[
                { label: 'Open to Offers', value: 'Open to Offers' },
                { label: 'Applying', value: 'Applying' },
                { label: 'Interviewing', value: 'Interviewing' },
                { label: 'Accepted', value: 'Accepted' },
                { label: 'Completed', value: 'Completed' },
              ]}
            />
          </div>

          <FormInput
            label="Availability Period"
            value={formData.period}
            onChange={(e) => setFormData({ ...formData, period: e.target.value })}
            placeholder="e.g. Summer 2026 / Immediate"
            required
          />

          <FormTextarea
            label="Objective & Value Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
            placeholder="Explain what practical value and continuous learning you bring to the team."
            required
          />

          <FormChipsInput
            label="Key Technologies Expected / Offered"
            chips={formData.technologies}
            onChange={(chips) => setFormData({ ...formData, technologies: chips })}
            placeholder="e.g. React, Python, REST APIs"
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
              Save Target Role
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmationDialog
        isOpen={!!deleteConfirmId}
        onClose={() => setDeleteConfirmId(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Internship Target"
        message="Are you sure you want to remove this internship target role?"
      />
    </div>
  );
};
