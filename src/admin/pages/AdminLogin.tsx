import React, { useState } from 'react';
import { Shield, Eye, EyeOff, ArrowRight, ArrowLeft, Lock, Mail, Sparkles, CheckCircle2, AlertTriangle, KeyRound } from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useToast } from '../context/ToastContext';

interface AdminLoginProps {
  onNavigate?: (path: string) => void;
  onLoginSuccess?: () => void;
  onBackToSite?: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onNavigate, onLoginSuccess, onBackToSite }) => {
  const { login, error: authError, clearError, isAuthenticated, isConfigured } = useAdminAuth();
  const { success } = useToast();

  const handleNavigate = (path: string) => {
    if (path === '/' && onBackToSite) {
      onBackToSite();
    } else if (onNavigate) {
      onNavigate(path);
    }
  };

  const handleSuccess = () => {
    if (onLoginSuccess) {
      onLoginSuccess();
    } else if (onNavigate) {
      onNavigate('/admin');
    }
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // If already authenticated, allow direct entrance
  const handleDirectEntrance = () => {
    handleSuccess();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setValidationError(null);

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setValidationError('Please enter your admin email address.');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(trimmedEmail)) {
      setValidationError('Please provide a valid email format (e.g. admin@portfolio.dev).');
      return;
    }

    if (!password) {
      setValidationError('Please enter your admin password.');
      return;
    }

    if (password.length < 6) {
      setValidationError('Password must be at least 6 characters long.');
      return;
    }

    setIsLoading(true);
    try {
      const ok = await login(trimmedEmail, password);
      if (ok) {
        success('Authentication Successful', 'Supabase session verified. Welcome to the Admin Portal.');
        handleSuccess();
      }
    } catch (err: unknown) {
      console.error(err);
      setValidationError('An unexpected error occurred during login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const activeError = validationError || authError;

  return (
    <div className="min-h-screen w-full bg-neutral-950 text-neutral-100 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden font-sans selection:bg-emerald-500/20 selection:text-emerald-300">
      {/* Futuristic Background Accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 sm:w-[600px] h-96 sm:h-[600px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Futuristic Grid Line overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Back to Public Site Link */}
      <div className="absolute top-6 left-6 z-10">
        <button
          onClick={() => handleNavigate('/')}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-neutral-900/80 border border-neutral-800 text-xs font-medium text-neutral-400 hover:text-white hover:border-neutral-700 transition-all backdrop-blur-md"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Portfolio</span>
        </button>
      </div>

      <div className="w-full max-w-md relative z-10 space-y-6">
        {/* Portal Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-neutral-900 border border-emerald-500/30 text-emerald-400 shadow-xl shadow-emerald-950/40 mb-2 relative">
            <Shield className="w-7 h-7" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-neutral-950" />
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight uppercase">
            ADMIN PORTAL
          </h1>
          <p className="text-xs text-neutral-400 max-w-xs mx-auto leading-relaxed">
            Secure Supabase authentication for Rudraksh Bansal's portfolio management
          </p>
        </div>

        {/* Login Glassmorphic Card */}
        <div className="rounded-2xl bg-neutral-900/70 border border-neutral-800/90 backdrop-blur-xl p-6 sm:p-8 shadow-2xl shadow-black/80 space-y-6">
          {/* Active session detected */}
          {isAuthenticated && (
            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Active Supabase session</span>
              </div>
              <button
                type="button"
                onClick={handleDirectEntrance}
                className="px-2.5 py-1 bg-emerald-500 text-neutral-950 font-bold rounded-lg hover:bg-emerald-400 transition-colors shrink-0"
              >
                Go to Dashboard
              </button>
            </div>
          )}

          {/* Config Status Notice */}
          {!isConfigured ? (
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs space-y-2">
              <div className="flex items-center gap-2 font-semibold">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Supabase Configuration Pending</span>
              </div>
              <p className="text-[11px] text-neutral-300 leading-relaxed">
                Add <code className="text-amber-300 font-mono">VITE_SUPABASE_URL</code> and{' '}
                <code className="text-amber-300 font-mono">VITE_SUPABASE_ANON_KEY</code> to your environment settings to enable live authentication.
              </p>
            </div>
          ) : (
            <div className="px-3 py-2 rounded-xl bg-neutral-950/60 border border-neutral-800/80 text-[11px] flex items-center justify-between text-neutral-400">
              <div className="flex items-center gap-1.5 text-emerald-400 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Supabase Auth Ready</span>
              </div>
              <span className="text-[10px] font-mono text-neutral-400">Email/Password</span>
            </div>
          )}

          {/* Error Message Area */}
          {activeError && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5 animate-in fade-in">
              <div className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
              <div className="flex-1 leading-relaxed">{activeError}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label
                htmlFor="admin-email"
                className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider"
              >
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="admin-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  autoComplete="email"
                  required
                  className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl bg-neutral-950/80 border border-neutral-800 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-neutral-100 placeholder:text-neutral-500 outline-none transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="admin-password"
                  className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider"
                >
                  Password
                </label>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  required
                  className="w-full pl-10 pr-11 py-2.5 text-sm rounded-xl bg-neutral-950/80 border border-neutral-800 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-neutral-100 placeholder:text-neutral-500 outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-neutral-400 hover:text-neutral-200 transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-teal-400 text-neutral-950 font-bold text-sm tracking-wide shadow-lg shadow-emerald-950/50 hover:shadow-emerald-900/60 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin" />
                  <span>Signing in with Supabase...</span>
                </>
              ) : (
                <>
                  <span>Login</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Setup Guidance Info */}
          <div className="pt-4 border-t border-neutral-800/80 text-[11px] text-neutral-400 space-y-2">
            <div className="flex items-center gap-1.5 text-cyan-400 font-mono font-semibold">
              <KeyRound className="w-3.5 h-3.5" />
              <span>Admin Account Creation</span>
            </div>
            <p className="leading-relaxed">
              Create your admin user in <span className="text-neutral-200 font-medium">Supabase Dashboard → Authentication → Users → Add User</span> with your email & password.
            </p>
          </div>
        </div>

        {/* Footer info */}
        <p className="text-center text-[11px] text-neutral-400 font-mono">
          Portfolio Security Management • AKTU CS Student Admin
        </p>
      </div>
    </div>
  );
};
