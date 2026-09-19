import React, { useState } from 'react';
import { Wrench, Plus, Edit, Trash2, CheckCircle2, XCircle, Filter, Layers } from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';
import { useToast } from '../context/ToastContext';
import { DataTable, ColumnDef } from '../components/DataTable';
import { Modal } from '../components/Modal';
import { ConfirmationDialog } from '../components/ConfirmationDialog';
import { FormInput, FormSelect, FormTextarea, FormToggle } from '../components/FormControls';
import { SkillItemAdmin } from '../types';

const CATEGORIES: SkillItemAdmin['category'][] = [
  'Programming',
  'Web Development',
  'Tools & AI',
  'Professional Skills',
];

const LEVELS: SkillItemAdmin['level'][] = [
  'Core',
  'Proficient',
  'Intermediate',
  'Beginner',
  'Advanced',
  'Expert',
  'Active User',
  'Strengths',
];

export const SkillsPage: React.FC = () => {
  const { skills, addSkill, updateSkill, deleteSkill, toggleSkillStatus } = useAdminData();
  const { success } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Omit<SkillItemAdmin, 'id'>>({
    name: '',
    category: 'Programming',
    level: 'Core',
    description: '',
    order: 1,
    isActive: true,
  });

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      name: '',
      category: 'Programming',
      level: 'Core',
      description: '',
      order: skills.length + 1,
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (skill: SkillItemAdmin) => {
    setEditingId(skill.id);
    setFormData({
      name: skill.name,
      category: skill.category,
      level: skill.level,
      description: skill.description,
      order: skill.order,
      isActive: skill.isActive,
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (editingId) {
      updateSkill(editingId, formData);
      success('Skill Updated', `Skill "${formData.name}" has been updated.`);
    } else {
      addSkill(formData);
      success('Skill Added', `Skill "${formData.name}" added to portfolio.`);
    }

    setIsModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (deleteConfirmId) {
      const target = skills.find((s) => s.id === deleteConfirmId);
      deleteSkill(deleteConfirmId);
      success('Skill Deleted', `Removed "${target?.name || 'skill'}" from portfolio.`);
      setDeleteConfirmId(null);
    }
  };

  const columns: ColumnDef<SkillItemAdmin>[] = [
    {
      key: 'name',
      header: 'Skill Name',
      sortable: true,
      render: (item) => (
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-mono text-xs font-bold shrink-0">
            {item.name.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <span className="font-bold text-white text-xs block">{item.name}</span>
            <span className="text-[11px] text-neutral-400 block line-clamp-1">{item.description}</span>
          </div>
        </div>
      ),
    },
    {
      key: 'category',
      header: 'Category',
      sortable: true,
      render: (item) => (
        <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-neutral-800 text-neutral-300 border border-neutral-700/60">
          {item.category}
        </span>
      ),
    },
    {
      key: 'level',
      header: 'Level',
      render: (item) => (
        <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
          {item.level}
        </span>
      ),
    },
    {
      key: 'order',
      header: 'Order',
      sortable: true,
      render: (item) => <span className="font-mono text-xs text-neutral-400">#{item.order}</span>,
    },
    {
      key: 'isActive',
      header: 'Active/Inactive',
      render: (item) => (
        <button
          onClick={() => toggleSkillStatus(item.id)}
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
            item.isActive
              ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/25'
              : 'bg-neutral-800 text-neutral-400 border border-neutral-700 hover:bg-neutral-750'
          }`}
        >
          {item.isActive ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Active</span>
            </>
          ) : (
            <>
              <XCircle className="w-3.5 h-3.5 text-neutral-400" />
              <span>Inactive</span>
            </>
          )}
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Skills Management</h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            Manage programming languages, web technologies, developer tools, and professional competencies.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-neutral-950 bg-emerald-500 hover:bg-emerald-400 rounded-xl transition-all shadow-lg shadow-emerald-950/40 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Skill</span>
        </button>
      </div>

      {/* Category Overview Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {CATEGORIES.map((cat) => {
          const count = skills.filter((s) => s.category === cat).length;
          return (
            <div
              key={cat}
              className="p-3.5 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 backdrop-blur-xl"
            >
              <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-neutral-400 block">
                {cat}
              </span>
              <span className="text-xl font-mono font-extrabold text-white mt-1 block">
                {count} <span className="text-xs font-normal text-neutral-400">skills</span>
              </span>
            </div>
          );
        })}
      </div>

      {/* Skills Table */}
      <DataTable
        data={skills}
        columns={columns}
        keyExtractor={(s) => s.id}
        searchPlaceholder="Search skills by name, level, or description..."
        searchFilter={(item, q) =>
          item.name.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.level.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q)
        }
        filterTabs={[
          { label: 'All Skills', value: 'all', count: skills.length, filterFn: () => true },
          {
            label: 'Programming',
            value: 'Programming',
            filterFn: (s) => s.category === 'Programming',
          },
          {
            label: 'Web Dev',
            value: 'Web Development',
            filterFn: (s) => s.category === 'Web Development',
          },
          {
            label: 'Tools & AI',
            value: 'Tools & AI',
            filterFn: (s) => s.category === 'Tools & AI',
          },
          {
            label: 'Professional',
            value: 'Professional Skills',
            filterFn: (s) => s.category === 'Professional Skills',
          },
        ]}
        renderActions={(skill) => (
          <div className="flex items-center justify-end gap-1.5">
            <button
              onClick={() => handleOpenEdit(skill)}
              className="p-1.5 text-neutral-400 hover:text-emerald-300 hover:bg-emerald-500/10 rounded-lg transition-colors"
              title="Edit Skill"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => setDeleteConfirmId(skill.id)}
              className="p-1.5 text-neutral-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
              title="Delete Skill"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      />

      {/* Add/Edit Skill Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? 'Edit Skill' : 'Add New Skill'}
        subtitle="Configure skill name, category, mastery level, and portfolio description."
        maxWidth="lg"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <FormInput
            label="Skill Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Python, React, Git, Problem Solving"
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormSelect
              label="Category"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value as SkillItemAdmin['category'] })
              }
              options={CATEGORIES.map((c) => ({ label: c, value: c }))}
            />

            <FormSelect
              label="Level"
              value={formData.level}
              onChange={(e) =>
                setFormData({ ...formData, level: e.target.value as SkillItemAdmin['level'] })
              }
              options={LEVELS.map((l) => ({ label: l, value: l }))}
            />
          </div>

          <FormTextarea
            label="Description / Context Note"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
            placeholder="e.g. Data structures, scripting, GUI modules, automation"
            helperText="Provides context on practical application and coursework."
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center pt-2">
            <FormInput
              label="Display Order"
              type="number"
              value={formData.order}
              onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 1 })}
            />

            <div className="pt-5">
              <FormToggle
                label="Active on Portfolio"
                checked={formData.isActive}
                onChange={(checked) => setFormData({ ...formData, isActive: checked })}
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-800">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-neutral-300 hover:text-white bg-neutral-900 border border-neutral-800 rounded-xl transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-neutral-950 bg-emerald-500 hover:bg-emerald-400 rounded-xl transition-all shadow-lg shadow-emerald-950/40 cursor-pointer"
            >
              {editingId ? 'Save Changes' : 'Add Skill'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmationDialog
        isOpen={!!deleteConfirmId}
        onClose={() => setDeleteConfirmId(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Skill"
        message="Are you sure you want to remove this skill from the portfolio?"
        confirmLabel="Delete Skill"
      />
    </div>
  );
};
