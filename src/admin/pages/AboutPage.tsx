import React, { useState } from 'react';
import { FileText, Save, Sparkles, Plus, Trash2, Edit, Target } from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';
import { useToast } from '../context/ToastContext';
import { FormInput, FormTextarea } from '../components/FormControls';
import { HighlightCard, ValueCard } from '../../types';

export const AboutPage: React.FC = () => {
  const { about, updateAbout, highlights, updateHighlights, values, updateValues } = useAdminData();
  const { success, error } = useToast();

  const [headingInput, setHeadingInput] = useState(about.heading || 'About Me');
  const [bioInput, setBioInput] = useState(about.description || '');
  const [careerObjectiveInput, setCareerObjectiveInput] = useState(about.careerObjective || '');
  const [highlightCards, setHighlightCards] = useState<HighlightCard[]>([...highlights]);
  const [valueCards, setValueCards] = useState<ValueCard[]>([...values]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSaveAbout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const resAbout = await updateAbout({
        heading: headingInput,
        description: bioInput,
        careerObjective: careerObjectiveInput,
      });

      const resHl = await updateHighlights(highlightCards);
      updateValues(valueCards);

      if (resAbout.success && resHl.success) {
        success('About Section Updated', 'Biography, career objective, and highlights saved to Supabase.');
      } else {
        error('Notice', resAbout.error || resHl.error || 'Saved changes locally. Run SQL schema in Supabase if tables not yet created.');
      }
    } catch (err: unknown) {
      error('Save Error', err instanceof Error ? err.message : 'Failed to save');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleHighlightChange = (index: number, field: keyof HighlightCard, val: string) => {
    setHighlightCards((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: val };
      return next;
    });
  };

  const handleValueChange = (index: number, field: keyof ValueCard, val: string) => {
    setValueCards((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: val };
      return next;
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">About & Narrative Management</h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            Configure heading, personal story, career objective, and technical pillars.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSaveAbout}
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 px-5 py-2 text-xs font-bold text-neutral-950 bg-emerald-500 hover:bg-emerald-400 rounded-xl transition-all shadow-lg shadow-emerald-950/40 cursor-pointer disabled:opacity-60"
        >
          <Save className="w-4 h-4" />
          <span>{isSubmitting ? 'Saving...' : 'Save All Changes'}</span>
        </button>
      </div>

      <form onSubmit={handleSaveAbout} className="space-y-6">
        {/* 1. Main Heading & Story */}
        <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800/90 backdrop-blur-xl shadow-lg space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-white pb-3 border-b border-neutral-800">
            <FileText className="w-4 h-4 text-emerald-400" />
            <span>Section Heading & Core Narrative</span>
          </div>

          <FormInput
            label="Section Heading"
            value={headingInput}
            onChange={(e) => setHeadingInput(e.target.value)}
            placeholder="e.g. About Me"
            required
          />

          <FormTextarea
            label="About Description (Personal Narrative)"
            value={bioInput}
            onChange={(e) => setBioInput(e.target.value)}
            rows={5}
            placeholder="Write a clear narrative explaining who you are, what motivates you, and your engineering trajectory."
            helperText="Directly displayed on the main About Me section on the public website."
            required
          />
        </div>

        {/* 2. Career Objective */}
        <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800/90 backdrop-blur-xl shadow-lg space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-white pb-3 border-b border-neutral-800">
            <Target className="w-4 h-4 text-amber-400" />
            <span>Career Objective</span>
          </div>

          <FormTextarea
            label="Professional Career Objective"
            value={careerObjectiveInput}
            onChange={(e) => setCareerObjectiveInput(e.target.value)}
            rows={3}
            placeholder="State your clear goal for internships, technical roles, or engineering contributions."
            helperText="Stored in Supabase about table and displayed across portfolio summaries."
            required
          />
        </div>

        {/* 3. Highlight Cards */}
        <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800/90 backdrop-blur-xl shadow-lg space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-white pb-3 border-b border-neutral-800">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Highlights & Academic Pillars (3 Cards)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {highlightCards.map((card, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-neutral-950/70 border border-neutral-800 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold">
                    Pillar #{idx + 1}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400">{card.iconName}</span>
                </div>

                <FormInput
                  label="Title"
                  value={card.title}
                  onChange={(e) => handleHighlightChange(idx, 'title', e.target.value)}
                  placeholder="e.g. Computer Science Student"
                />

                <FormInput
                  label="Subtitle"
                  value={card.subtitle}
                  onChange={(e) => handleHighlightChange(idx, 'subtitle', e.target.value)}
                  placeholder="e.g. Core Focus"
                />

                <FormTextarea
                  label="Description"
                  value={card.description}
                  onChange={(e) => handleHighlightChange(idx, 'description', e.target.value)}
                  rows={3}
                  placeholder="Explanation of this academic or engineering pillar."
                />
              </div>
            ))}
          </div>
        </div>

        {/* 4. Values / What I Bring */}
        <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800/90 backdrop-blur-xl shadow-lg space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-white pb-3 border-b border-neutral-800">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>"What I Bring" Values & Strengths</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {valueCards.map((val, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-neutral-950/70 border border-neutral-800 space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold">
                    Value #{idx + 1}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400">{val.iconName}</span>
                </div>

                <FormInput
                  label="Value Title"
                  value={val.title}
                  onChange={(e) => handleValueChange(idx, 'title', e.target.value)}
                  placeholder="e.g. Strong Willingness to Learn"
                />

                <FormTextarea
                  label="Description"
                  value={val.description}
                  onChange={(e) => handleValueChange(idx, 'description', e.target.value)}
                  rows={2}
                />
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};
