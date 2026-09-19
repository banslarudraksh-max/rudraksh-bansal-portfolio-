import React, { useState, useEffect } from 'react';
import {
  Settings,
  Save,
  Database,
  Shield,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  RefreshCw,
  Copy,
  Check,
} from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';
import { useToast } from '../context/ToastContext';
import { FormInput, FormTextarea, FormToggle } from '../components/FormControls';
import { ConfirmationDialog } from '../components/ConfirmationDialog';
import { SiteSettingsData } from '../types';
import { isSupabaseConfigured, supabaseUrl, testAdminConnection, ConnectionTestResult } from '../../lib/supabase';

export const SettingsPage: React.FC = () => {
  const { siteSettings, updateSiteSettings, resetAllData } = useAdminData();
  const { success } = useToast();

  const [formData, setFormData] = useState<SiteSettingsData>({ ...siteSettings });
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [testResult, setTestResult] = useState<ConnectionTestResult | null>(null);
  const [isTesting, setIsTesting] = useState(false);

  const runTest = async () => {
    setIsTesting(true);
    try {
      const res = await testAdminConnection();
      setTestResult(res);
      if (res.success) {
        success('Supabase Connected', 'admin_test table query succeeded.');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsTesting(false);
    }
  };

  useEffect(() => {
    runTest();
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteSettings(formData);
    success('Settings Saved', 'Site configuration and metadata parameters updated.');
  };

  const handleConfirmReset = () => {
    resetAllData();
    setFormData({ ...siteSettings });
    success('Data Reset', 'All admin records reset to original portfolio defaults.');
    setIsResetConfirmOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Site Settings & Supabase Status</h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            Manage global portfolio behavior, SEO parameters, and Supabase integration readiness.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-5 py-2 text-xs font-bold text-neutral-950 bg-emerald-500 hover:bg-emerald-400 rounded-xl transition-all shadow-lg shadow-emerald-950/40 cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>Save Settings</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* 1. Supabase Connection & Readiness Banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/30 via-neutral-900 to-cyan-950/30 border border-emerald-500/30 backdrop-blur-xl shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Supabase PostgreSQL & Auth</h3>
                <span className="text-[11px] text-emerald-400 font-mono">
                  {testResult?.success ? 'Supabase Connected ✓' : isSupabaseConfigured ? 'Connected to Project' : 'Configuration Pending'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={runTest}
                disabled={isTesting}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-neutral-200 border border-neutral-700 transition-colors cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isTesting ? 'animate-spin text-cyan-400' : 'text-neutral-400'}`} />
                <span>{isTesting ? 'Testing...' : 'Test Connection'}</span>
              </button>

              {testResult?.success ? (
                <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500 text-neutral-950 shadow-sm">
                  Supabase Connected ✓
                </span>
              ) : (
                <span className="px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  {isSupabaseConfigured ? 'Table Check' : 'Pending Env'}
                </span>
              )}
            </div>
          </div>

          <p className="text-xs text-neutral-300 leading-relaxed">
            Connected client reads live from table <code className="text-emerald-300 font-mono">admin_test</code>.
            Authentication is powered directly by Supabase Auth with secure JWT session persistence.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3 rounded-xl bg-neutral-950/80 border border-neutral-800 text-xs font-mono space-y-1">
              <span className="text-neutral-400 block">VITE_SUPABASE_URL:</span>
              <span className="text-emerald-400 truncate block">
                {supabaseUrl || 'Not configured in environment'}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-neutral-950/80 border border-neutral-800 text-xs font-mono space-y-1">
              <span className="text-neutral-400 block">VITE_SUPABASE_ANON_KEY:</span>
              <span className="text-emerald-400 truncate block">
                {isSupabaseConfigured ? '•••••••••••••••• (Configured)' : 'Not configured in environment'}
              </span>
            </div>
          </div>

          {testResult && (
            <div className={`p-3 rounded-xl border text-xs ${
              testResult.success
                ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-300'
                : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
            }`}>
              <div className="flex items-center gap-2 font-bold mb-1">
                {testResult.success ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Database Read Succeeded (Supabase Connected ✓)</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-4 h-4 text-amber-400" />
                    <span>Connection Notice</span>
                  </>
                )}
              </div>
              <p className="text-[11px] text-neutral-300">
                {testResult.message || testResult.error}
              </p>
            </div>
          )}
        </div>

        {/* 2. General Portfolio Identity & SEO */}
        <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800/90 backdrop-blur-xl shadow-lg space-y-5">
          <div className="flex items-center gap-2 text-sm font-bold text-white pb-3 border-b border-neutral-800">
            <Settings className="w-4 h-4 text-emerald-400" />
            <span>Site Identity & Search Engine Metadata</span>
          </div>

          <FormInput
            label="Site Title Tag"
            value={formData.siteTitle}
            onChange={(e) => setFormData({ ...formData, siteTitle: e.target.value })}
            placeholder="e.g. Rudraksh Bansal - Portfolio"
            required
          />

          <FormTextarea
            label="Meta Description Tag"
            value={formData.metaDescription}
            onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
            rows={3}
            placeholder="e.g. Professional portfolio of Rudraksh Bansal, B.Tech CSE (AI-ML) student..."
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormInput
              label="Analytics Measurement ID"
              value={formData.analyticsId}
              onChange={(e) => setFormData({ ...formData, analyticsId: e.target.value })}
              placeholder="e.g. G-XXXXXXX or UA-XXXXXXX"
            />
            <FormInput
              label="Public Inbound Email"
              value={formData.publicEmail}
              onChange={(e) => setFormData({ ...formData, publicEmail: e.target.value })}
              placeholder="bansalrudrakshkumar@gmail.com"
              required
            />
          </div>
        </div>

        {/* 3. Feature Switches */}
        <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800/90 backdrop-blur-xl shadow-lg space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-white pb-3 border-b border-neutral-800">
            <Shield className="w-4 h-4 text-cyan-400" />
            <span>Feature Controls & Toggles</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormToggle
              label="Enable Public Resume Download"
              description="Allows visitors to save the official generated PDF from the website."
              checked={formData.enableDownloadResume}
              onChange={(checked) => setFormData({ ...formData, enableDownloadResume: checked })}
            />

            <FormToggle
              label="Enable Public Inbound Contact Form"
              description="Permits prospective employers to submit direct contact messages."
              checked={formData.allowPublicContact}
              onChange={(checked) => setFormData({ ...formData, allowPublicContact: checked })}
            />

            <FormToggle
              label="Search Engine Indexing"
              description="Allows Google and search engine spiders to index portfolio routes."
              checked={formData.searchEngineIndexing}
              onChange={(checked) => setFormData({ ...formData, searchEngineIndexing: checked })}
            />

            <FormToggle
              label="Maintenance Mode"
              description="Displays temporary maintenance announcement on public routes."
              checked={formData.maintenanceMode}
              onChange={(checked) => setFormData({ ...formData, maintenanceMode: checked })}
            />
          </div>
        </div>

        {/* 4. Reset / Storage Management */}
        <div className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800/60 backdrop-blur-xl shadow-sm space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-bold text-neutral-200">Reset Local Portfolio Data</h4>
              <p className="text-xs text-neutral-400 mt-0.5">
                Restore all projects, skills, profile, and settings back to original initial defaults.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsResetConfirmOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 rounded-xl transition-colors shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to Defaults</span>
            </button>
          </div>
        </div>
      </form>

      <ConfirmationDialog
        isOpen={isResetConfirmOpen}
        onClose={() => setIsResetConfirmOpen(false)}
        onConfirm={handleConfirmReset}
        title="Reset All Admin Data"
        message="This will reset all modified projects, skills, bio text, and contact messages back to the portfolio defaults. Are you sure?"
        confirmLabel="Yes, Reset Everything"
      />
    </div>
  );
};
