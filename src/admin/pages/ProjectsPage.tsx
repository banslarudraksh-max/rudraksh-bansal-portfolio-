import React, { useState } from 'react';
import {
  FolderGit2,
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  Github,
  Star,
  CheckCircle2,
  Clock,
  Layers,
  Sparkles,
  Copy,
  Eye,
  EyeOff,
  Upload,
  Image as ImageIcon,
  RefreshCw,
} from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';
import { useToast } from '../context/ToastContext';
import { DataTable, ColumnDef } from '../components/DataTable';
import { Modal } from '../components/Modal';
import { ConfirmationDialog } from '../components/ConfirmationDialog';
import { FormInput, FormTextarea, FormSelect, FormToggle, FormChipsInput } from '../components/FormControls';
import { ProjectItem } from '../../types';

interface ProjectFormData {
  id?: string;
  title: string;
  category: string;
  description: string;
  fullDescription: string;
  technologies: string[];
  githubPlaceholder: string;
  demoPlaceholder: string;
  imageUrl?: string;
  status: string;
  isFeatured: boolean;
  isVisible: boolean;
  displayOrder: number;
}

const DEFAULT_FORM: ProjectFormData = {
  title: '',
  category: 'Web Development',
  description: '',
  fullDescription: '',
  technologies: ['React', 'TypeScript', 'Tailwind CSS'],
  githubPlaceholder: 'https://github.com/banslarudraksh-max/',
  demoPlaceholder: '#',
  imageUrl: '',
  status: 'Active',
  isFeatured: false,
  isVisible: true,
  displayOrder: 1,
};

export const ProjectsPage: React.FC = () => {
  const {
    projects,
    addProject,
    updateProject,
    deleteProject,
    duplicateProject,
    uploadAsset,
  } = useAdminData();
  const { success, error, info } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [formData, setFormData] = useState<ProjectFormData>(DEFAULT_FORM);
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      ...DEFAULT_FORM,
      displayOrder: projects.length + 1,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (project: ProjectItem) => {
    setEditingId(project.id);
    setFormData({
      id: project.id,
      title: project.title,
      category: project.category,
      description: project.description,
      fullDescription: project.fullDescription,
      technologies: project.technologies || [],
      githubPlaceholder: project.githubPlaceholder || '',
      demoPlaceholder: project.demoPlaceholder || '',
      imageUrl: project.imageUrl || '',
      status: project.status || 'Active',
      isFeatured: project.isFeatured ?? true,
      isVisible: project.isVisible ?? true,
      displayOrder: project.displayOrder || 1,
    });
    setIsModalOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    try {
      const res = await uploadAsset(file, 'projects');
      if (res.success && res.url) {
        setFormData((prev) => ({ ...prev, imageUrl: res.url }));
        success('Image Uploaded', 'Project screenshot stored in Supabase Storage.');
      } else {
        error('Upload Failed', res.error || 'Failed to upload image.');
      }
    } catch (err: unknown) {
      error('Upload Error', err instanceof Error ? err.message : 'Error uploading file');
    } finally {
      setIsUploadingImage(false);
      e.target.value = '';
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    if (editingId) {
      await updateProject(editingId, {
        title: formData.title,
        category: formData.category,
        description: formData.description,
        fullDescription: formData.fullDescription,
        technologies: formData.technologies,
        githubPlaceholder: formData.githubPlaceholder,
        demoPlaceholder: formData.demoPlaceholder,
        imageUrl: formData.imageUrl,
        status: formData.status,
        isFeatured: formData.isFeatured,
        isVisible: formData.isVisible,
        displayOrder: formData.displayOrder,
      });
      success('Project Updated', `"${formData.title}" has been updated.`);
    } else {
      await addProject({
        title: formData.title,
        category: formData.category,
        description: formData.description,
        fullDescription: formData.fullDescription,
        technologies: formData.technologies,
        githubPlaceholder: formData.githubPlaceholder,
        demoPlaceholder: formData.demoPlaceholder,
        imageUrl: formData.imageUrl,
        status: formData.status,
        isFeatured: formData.isFeatured,
        isVisible: formData.isVisible,
        displayOrder: formData.displayOrder,
        keyFeatures: [
          'Modular code architecture',
          'Responsive user interface',
          'High performance algorithms',
        ],
      });
      success('Project Created', `"${formData.title}" added to portfolio projects.`);
    }

    setIsModalOpen(false);
  };

  const handleDeleteConfirm = async () => {
    if (deleteConfirmId) {
      const target = projects.find((p) => p.id === deleteConfirmId);
      await deleteProject(deleteConfirmId);
      success('Project Deleted', `Removed "${target?.title || 'project'}" from portfolio.`);
      setDeleteConfirmId(null);
    }
  };

  const handleToggleVisibility = async (project: ProjectItem) => {
    const nextVis = !(project.isVisible ?? true);
    await updateProject(project.id, { isVisible: nextVis });
    info('Visibility Updated', `Project "${project.title}" is now ${nextVis ? 'visible' : 'hidden'} on public site.`);
  };

  const handleToggleFeatured = async (project: ProjectItem) => {
    const nextFeat = !(project.isFeatured ?? false);
    await updateProject(project.id, { isFeatured: nextFeat });
    info('Featured Status', `Project "${project.title}" is ${nextFeat ? 'featured' : 'standard'}.`);
  };

  const handleDuplicate = async (project: ProjectItem) => {
    const res = await duplicateProject(project.id);
    if (res.success) {
      success('Project Duplicated', `Created copy of "${project.title}".`);
    } else {
      error('Duplicate Error', res.error || 'Failed to duplicate project');
    }
  };

  // Table Columns Definition
  const columns: ColumnDef<ProjectItem>[] = [
    {
      key: 'title',
      header: 'Project Name',
      sortable: true,
      render: (item) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-neutral-800 border border-neutral-700/80 flex items-center justify-center text-emerald-400 font-mono font-bold text-xs shrink-0 overflow-hidden">
            {item.imageUrl ? (
              <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
            ) : (
              item.title.charAt(0)
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-xs">{item.title}</span>
              {item.isFeatured && (
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  <Star className="w-2.5 h-2.5 fill-amber-400" />
                  Featured
                </span>
              )}
              {item.isVisible === false && (
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono bg-neutral-800 text-neutral-400 border border-neutral-700">
                  <EyeOff className="w-2.5 h-2.5" />
                  Hidden
                </span>
              )}
            </div>
            <span className="text-[11px] text-neutral-400 block line-clamp-1">
              {item.description}
            </span>
          </div>
        </div>
      ),
    },
    {
      key: 'category',
      header: 'Category',
      sortable: true,
      render: (item) => (
        <span className="px-2.5 py-1 rounded-full text-[11px] font-mono bg-neutral-900 border border-neutral-800 text-neutral-300">
          {item.category}
        </span>
      ),
    },
    {
      key: 'technologies',
      header: 'Tech Stack',
      render: (item) => (
        <div className="flex flex-wrap gap-1 max-w-xs">
          {item.technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
            >
              {tech}
            </span>
          ))}
          {item.technologies.length > 3 && (
            <span className="px-1.5 py-0.5 rounded text-[10px] font-mono text-neutral-400">
              +{item.technologies.length - 3}
            </span>
          )}
        </div>
      ),
    },
    {
      key: 'id',
      header: 'Quick Controls',
      render: (item) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleToggleFeatured(item)}
            className={`p-1.5 rounded-lg transition-colors ${
              item.isFeatured ? 'text-amber-400 bg-amber-500/10' : 'text-neutral-500 hover:text-neutral-300'
            }`}
            title={item.isFeatured ? 'Unmark Featured' : 'Mark Featured'}
          >
            <Star className={`w-3.5 h-3.5 ${item.isFeatured ? 'fill-amber-400' : ''}`} />
          </button>
          <button
            onClick={() => handleToggleVisibility(item)}
            className={`p-1.5 rounded-lg transition-colors ${
              item.isVisible !== false ? 'text-emerald-400' : 'text-neutral-500'
            }`}
            title={item.isVisible !== false ? 'Hide from Public' : 'Show on Public'}
          >
            {item.isVisible !== false ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Projects Management</h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            Add, update, reorder, and showcase your software engineering projects on the public site.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="flex items-center bg-neutral-900 border border-neutral-800 rounded-xl p-1">
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                viewMode === 'table'
                  ? 'bg-neutral-800 text-white'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Table View
            </button>
            <button
              onClick={() => setViewMode('cards')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                viewMode === 'cards'
                  ? 'bg-neutral-800 text-white'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Cards View
            </button>
          </div>

          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-neutral-950 bg-emerald-500 hover:bg-emerald-400 rounded-xl transition-all shadow-lg shadow-emerald-950/40 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Project</span>
          </button>
        </div>
      </div>

      {/* Main Content: Table or Cards */}
      {viewMode === 'table' ? (
        <DataTable
          data={projects}
          columns={columns}
          keyExtractor={(p) => p.id}
          searchPlaceholder="Search projects by name, technology, or category..."
          searchFilter={(item, q) =>
            item.title.toLowerCase().includes(q) ||
            item.category.toLowerCase().includes(q) ||
            item.technologies.some((t) => t.toLowerCase().includes(q))
          }
          filterTabs={[
            { label: 'All Projects', value: 'all', count: projects.length, filterFn: () => true },
            {
              label: 'Python / Desktop',
              value: 'python',
              filterFn: (p) => p.category.toLowerCase().includes('python'),
            },
            {
              label: 'Web / Apps',
              value: 'web',
              filterFn: (p) => p.category.toLowerCase().includes('web'),
            },
          ]}
          renderActions={(project) => (
            <div className="flex items-center justify-end gap-1.5">
              <button
                onClick={() => handleDuplicate(project)}
                className="p-1.5 text-neutral-400 hover:text-cyan-300 hover:bg-cyan-500/10 rounded-lg transition-colors"
                title="Duplicate Project"
              >
                <Copy className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleOpenEdit(project)}
                className="p-1.5 text-neutral-400 hover:text-emerald-300 hover:bg-emerald-500/10 rounded-lg transition-colors"
                title="Edit Project"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDeleteConfirmId(project.id)}
                className="p-1.5 text-neutral-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                title="Delete Project"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group rounded-2xl bg-neutral-900/60 border border-neutral-800/90 hover:border-emerald-500/40 p-5 backdrop-blur-xl shadow-lg transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-neutral-800 text-neutral-300 border border-neutral-700/60">
                    {project.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleDuplicate(project)}
                      className="p-1.5 text-neutral-400 hover:text-cyan-300 rounded-lg hover:bg-neutral-800 transition-colors"
                      title="Duplicate"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleOpenEdit(project)}
                      className="p-1.5 text-neutral-400 hover:text-emerald-300 rounded-lg hover:bg-neutral-800 transition-colors"
                      title="Edit"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(project.id)}
                      className="p-1.5 text-neutral-400 hover:text-rose-400 rounded-lg hover:bg-neutral-800 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1 pt-1">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400">
                <span className="inline-flex items-center gap-1 text-emerald-400 text-[11px]">
                  <CheckCircle2 className="w-3 h-3" /> {project.status || 'Active'}
                </span>
                <span className="font-mono text-[10px] text-neutral-400">
                  {project.isFeatured ? 'Featured' : 'Standard'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Project Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? 'Edit Project' : 'Add New Project'}
        subtitle="Specify project parameters, source code repositories, and feature descriptions."
        maxWidth="3xl"
      >
        <form onSubmit={handleSave} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormInput
              label="Project Name"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. AI-Powered Code Reviewer"
              required
            />
            <FormInput
              label="Category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              placeholder="e.g. Desktop Application / Python"
              required
            />
          </div>

          <FormInput
            label="Short Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="One-sentence overview displayed on cards."
            required
          />

          <FormTextarea
            label="Full Description"
            value={formData.fullDescription}
            onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
            rows={4}
            placeholder="Detailed overview explaining architecture, problem solved, and technical depth."
            required
          />

          <FormChipsInput
            label="Technologies (Press Enter to add)"
            chips={formData.technologies}
            onChange={(techs) => setFormData({ ...formData, technologies: techs })}
            placeholder="e.g. Python, Tkinter, React, Node.js"
            helperText="Enter technical skills, libraries, or frameworks utilized in this project."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormInput
              label="GitHub Repository URL"
              value={formData.githubPlaceholder}
              onChange={(e) => setFormData({ ...formData, githubPlaceholder: e.target.value })}
              placeholder="https://github.com/banslarudraksh-max/project-repo"
              leftIcon={<Github className="w-4 h-4" />}
            />
            <FormInput
              label="Live Demo URL"
              value={formData.demoPlaceholder}
              onChange={(e) => setFormData({ ...formData, demoPlaceholder: e.target.value })}
              placeholder="https://... or #"
              leftIcon={<ExternalLink className="w-4 h-4" />}
            />
          </div>

          {/* Screenshot / Cover Image */}
          <div className="p-4 rounded-xl bg-neutral-950/70 border border-neutral-800 space-y-3">
            <label className="block text-xs font-semibold text-neutral-300">
              Project Cover Image / Screenshot (Supabase Storage)
            </label>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="w-24 h-16 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center overflow-hidden shrink-0">
                {formData.imageUrl ? (
                  <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon className="w-6 h-6 text-neutral-600" />
                )}
              </div>
              <div className="flex-1 w-full space-y-2">
                <FormInput
                  label=""
                  value={formData.imageUrl || ''}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="https://... or upload file"
                />
                <div className="relative inline-block">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUploadingImage}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                  />
                  <button
                    type="button"
                    disabled={isUploadingImage}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-700"
                  >
                    {isUploadingImage ? <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-400" /> : <Upload className="w-3.5 h-3.5" />}
                    <span>{isUploadingImage ? 'Uploading...' : 'Upload Image to Storage'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <FormSelect
              label="Status"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              options={[
                { label: 'Active', value: 'Active' },
                { label: 'In Progress', value: 'In Progress' },
                { label: 'Archived', value: 'Archived' },
              ]}
            />
            <FormInput
              label="Display Order"
              type="number"
              value={formData.displayOrder}
              onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 1 })}
            />
            <div className="pt-6 flex flex-col gap-2">
              <FormToggle
                label="Featured Project"
                checked={formData.isFeatured}
                onChange={(checked) => setFormData({ ...formData, isFeatured: checked })}
              />
              <FormToggle
                label="Visible on Portfolio"
                checked={formData.isVisible}
                onChange={(checked) => setFormData({ ...formData, isVisible: checked })}
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
              Save Project
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={!!deleteConfirmId}
        onClose={() => setDeleteConfirmId(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Project"
        message="Are you sure you want to delete this project? This will remove it from the public portfolio presentation."
        confirmLabel="Delete Project"
      />
    </div>
  );
};
